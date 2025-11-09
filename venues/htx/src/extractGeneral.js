/**
 * HTX Exchange - General Documentation Extraction
 * Extracts core documentation sections from HTX API docs
 */
"use strict"

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { launchBrowser } from "../../shared/puppeteer.js"
import { createTurndownBuilder } from "../../shared/turndown.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BASE_URL = "https://www.htx.com/en-us/opend/newApiPages/"
const OUTPUT_DIR = path.resolve(__dirname, "../../../docs/htx")

/**
 * Ensure directory exists
 */
const ensureDir = dirPath => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

/**
 * Write content to file
 */
const writeFile = (filePath, content) => {
  console.log(`Writing ${filePath}...`)
  fs.writeFileSync(filePath, content, "utf8")
  console.log(`✅ Written ${filePath}`)
}

/**
 * Wait for menu to load
 */
const waitForMenu = async page => {
  console.log("Waiting for menu element to load...")
  await page.waitForSelector("ul#sliderMenu.ant-menu", { timeout: 30000 })
  console.log("✅ Menu element loaded successfully")
}

/**
 * Expand all menus to make all menu items visible
 */
const expandAllMenus = async page => {
  console.log("Expanding all menus...")

  await page.evaluate(async () => {
    // Find and click Spot menu to expand it
    const menus = document.querySelectorAll('div[role="menuitem"]')
    for (const menu of menus) {
      const text = menu.textContent.trim()
      if (text === "Spot") {
        menu.click()
        await new Promise(resolve => setTimeout(resolve, 500))
        break
      }
    }

    // Now expand all submenus
    let changed = true
    let iterations = 0

    while (changed && iterations < 20) {
      changed = false
      iterations++

      const allMenus = document.querySelectorAll('div[role="menuitem"]')

      for (const menu of allMenus) {
        if (menu.getAttribute("aria-expanded") === "false") {
          menu.click()
          changed = true
          await new Promise(resolve => setTimeout(resolve, 300))
        }
      }
    }
  })

  console.log("✅ All menus expanded")
}

/**
 * Extract content by numeric ID
 */
const extractContentById = async (page, ids) => {
  return await page.evaluate(ids => {
    const listItems = document.querySelectorAll('li[role="menuitem"]')
    const items = Array.from(listItems).map(item => {
      const categoryElement =
        item.parentElement?.parentElement?.firstElementChild
      const categoryText = categoryElement
        ? categoryElement.textContent.trim()
        : "Unknown Category"

      return {
        menuIds: item.getAttribute("keys"),
        text: item.textContent.trim(),
        category: categoryText
      }
    })

    // Filter items by IDs
    const idsStr = ids.map(id => id.toString())
    const filteredItems = items.filter(item => {
      const keyParts = item.menuIds ? item.menuIds.split(",") : []
      return keyParts.some(keyPart => idsStr.includes(keyPart.trim()))
    })

    return filteredItems
  }, ids)
}

/**
 * Extract section content by simulating real browser click and waiting for content to render
 */
const extractSectionContent = async (page, menuKey, sectionName) => {
  console.log(`  Looking for menu item with key: ${menuKey}`)

  // Try to use Puppeteer's real click on the element
  const clickResult = await page.evaluate(menuKey => {
    const listItems = document.querySelectorAll('li[role="menuitem"]')
    for (const item of listItems) {
      const keys = item.getAttribute("keys")
      if (keys && keys === menuKey) {
        return {
          found: true,
          text: item.textContent.trim(),
          keys: keys
        }
      }
    }
    return { found: false }
  }, menuKey)

  if (!clickResult.found) {
    console.log(`  ⚠️  Menu item with key '${menuKey}' not found`)
    return ""
  }

  console.log(`  Found menu item: ${clickResult.text}`)

  // Use Puppeteer's click() method for realistic interaction
  const elementHandle = await page.evaluateHandle(menuKey => {
    const listItems = document.querySelectorAll('li[role="menuitem"]')
    for (const item of listItems) {
      const keys = item.getAttribute("keys")
      if (keys && keys === menuKey) {
        return item
      }
    }
    return null
  }, menuKey)

  const element = elementHandle.asElement()
  if (element) {
    console.log(`  Clicking menu item...`)
    await element.click()
    await elementHandle.dispose()

    // Wait longer for SPA to update
    console.log(`  Waiting for content to render...`)
    await new Promise(resolve => setTimeout(resolve, 3000))

    // Try to detect content change by checking for specific text related to the section
    const contentAppeared = await page.evaluate(sectionText => {
      const body = document.body.textContent
      // Check if section-specific content appeared
      return body.includes(sectionText) || body.length > 20000
    }, clickResult.text)

    console.log(`  Content appeared: ${contentAppeared}`)
  }

  // Now try to extract content from various possible locations
  console.log("  Attempting to extract content...")

  const html = await page.evaluate(() => {
    // Try multiple selectors in order of preference
    const selectors = [
      "div.newApiPages_posR__RKd5D.newApiPages_posDetail__SmN2h", // Endpoint content
      "div.newApiPages_wrap__hJes6", // General docs wrapper
      "div.newApiPages_main__O4xgg > div:last-child", // Last div in main (might be content)
      "div.newApiPages_main__O4xgg" // Entire main area as fallback
    ]

    for (const selector of selectors) {
      const contentDiv = document.querySelector(selector)
      if (contentDiv && contentDiv.innerHTML.trim().length > 500) {
        console.log(`Found content with selector: ${selector}`)

        // Clone to avoid modifying original
        const cloned = contentDiv.cloneNode(true)

        // Remove unwanted elements
        const toolsPanel = cloned.querySelector("#tools")
        if (toolsPanel) toolsPanel.remove()

        const codeList = cloned.querySelector("#code_list")
        if (codeList) codeList.remove()

        const searchBox = cloned.querySelector(".newApiPages_search__qbe6O")
        if (searchBox) searchBox.remove()

        const introBox = cloned.querySelector(".newApiPages_introbox__f2hE2")
        if (introBox) introBox.remove()

        return cloned.innerHTML
      }
    }

    return ""
  })

  console.log(`  Content length: ${html.length} characters`)
  return html
}

/**
 * Extract Rate Limits section
 */
const extractRateLimits = async (page, turndownService) => {
  console.log("Extracting rate limits...")

  // HTX rate limits - hierarchical key
  const html = await extractSectionContent(page, "5,234,423")

  if (!html || html.trim().length === 0) {
    throw new Error(
      "Failed to extract rate limits content. Menu key '5,234,423' returned empty content. " +
        "Possible causes: (1) Menu structure changed, (2) Content selector is incorrect, " +
        "(3) HTX anti-bot protection is blocking access, (4) Page did not fully load."
    )
  }

  const markdown = turndownService.turndown(html)
  if (!markdown || markdown.trim().length === 0) {
    throw new Error(
      "Failed to convert rate limits HTML to markdown. HTML was present but conversion failed."
    )
  }

  return markdown
}

/**
 * Extract Authentication section
 */
const extractAuthentication = async (page, turndownService) => {
  console.log("Extracting authentication information...")

  // HTX authentication - hierarchical key
  const html = await extractSectionContent(page, "5,235,419")

  if (!html || html.trim().length === 0) {
    throw new Error(
      "Failed to extract authentication content. Menu key '5,235,419' returned empty content. " +
        "Possible causes: (1) Menu structure changed, (2) Content selector is incorrect, " +
        "(3) HTX anti-bot protection is blocking access, (4) Page did not fully load."
    )
  }

  const markdown = turndownService.turndown(html)
  if (!markdown || markdown.trim().length === 0) {
    throw new Error(
      "Failed to convert authentication HTML to markdown. HTML was present but conversion failed."
    )
  }

  return markdown
}

/**
 * Extract Network Connectivity section
 */
const extractNetworkConnectivity = async (page, turndownService) => {
  console.log("Extracting network connectivity information...")

  // HTX network connectivity - hierarchical key
  const html = await extractSectionContent(page, "5,235,418")

  if (!html || html.trim().length === 0) {
    throw new Error(
      "Failed to extract network connectivity content. Menu key '5,235,418' returned empty content. " +
        "Possible causes: (1) Menu structure changed, (2) Content selector is incorrect, " +
        "(3) HTX anti-bot protection is blocking access, (4) Page did not fully load."
    )
  }

  const markdown = turndownService.turndown(html)
  if (!markdown || markdown.trim().length === 0) {
    throw new Error(
      "Failed to convert network connectivity HTML to markdown. HTML was present but conversion failed."
    )
  }

  return markdown
}

/**
 * Extract Error Codes section
 */
const extractErrorCodes = async (page, turndownService) => {
  console.log("Extracting error codes...")

  // HTX error codes - hierarchical key
  const html = await extractSectionContent(page, "5,127,5401")

  if (!html || html.trim().length === 0) {
    throw new Error(
      "Failed to extract error codes content. Menu key '5,127,5401' returned empty content. " +
        "Possible causes: (1) Menu structure changed, (2) Content selector is incorrect, " +
        "(3) HTX anti-bot protection is blocking access, (4) Page did not fully load."
    )
  }

  const markdown = turndownService.turndown(html)
  if (!markdown || markdown.trim().length === 0) {
    throw new Error(
      "Failed to convert error codes HTML to markdown. HTML was present but conversion failed."
    )
  }

  return markdown
}

/**
 * Extract Response Formats section
 */
const extractResponseFormats = async (page, turndownService) => {
  console.log("Extracting response formats...")

  // HTX response formats - hierarchical key
  const html = await extractSectionContent(page, "5,234,425")

  if (!html || html.trim().length === 0) {
    throw new Error(
      "Failed to extract response formats content. Menu key '5,234,425' returned empty content. " +
        "Possible causes: (1) Menu structure changed, (2) Content selector is incorrect, " +
        "(3) HTX anti-bot protection is blocking access, (4) Page did not fully load."
    )
  }

  const markdown = turndownService.turndown(html)
  if (!markdown || markdown.trim().length === 0) {
    throw new Error(
      "Failed to convert response formats HTML to markdown. HTML was present but conversion failed."
    )
  }

  return markdown
}

/**
 * Extract Changelog section
 */
const extractChangelog = async (page, turndownService) => {
  console.log("Extracting changelog...")

  // Note: HTX appears to have removed the changelog from the API menu structure
  // Returning a placeholder message
  console.log(
    "⚠️  Changelog section not found in menu - HTX may have removed it"
  )

  return "# Change Log\n\nHTX does not currently provide a structured changelog in the API documentation.\n\nFor the latest API updates and changes, please visit:\n- [HTX Support Center - API Announcements](https://www.huobi.pe/support/en-us/list/360000070201)\n- Subscribe to announcements by logging in and clicking 'Follow' on the announcements page\n"
}

/**
 * Main extraction function
 */
const main = async () => {
  console.log("🚀 Starting HTX general documentation extraction...")
  console.log(`📍 Source: ${BASE_URL}`)
  console.log(`📁 Output: ${OUTPUT_DIR}`)

  // Launch browser using shared utility
  const browser = await launchBrowser()

  try {
    const page = await browser.newPage()

    // Set a realistic user agent (important for HTX)
    await page.setUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"
    )

    // Set viewport to a realistic size
    await page.setViewport({ width: 1280, height: 800 })

    console.log(`Navigating to ${BASE_URL}...`)
    await page.goto(BASE_URL, { waitUntil: "networkidle0", timeout: 60000 })
    console.log("✅ Page loaded")

    // Wait for menu to render
    await waitForMenu(page)

    // Expand all menus to make items clickable
    await expandAllMenus(page)

    const turndownService = createTurndownBuilder().build()

    // Ensure output directory exists
    ensureDir(OUTPUT_DIR)

    // Extract each section
    const rateLimits = await extractRateLimits(page, turndownService)
    writeFile(path.join(OUTPUT_DIR, "rate_limits.md"), rateLimits)

    const authentication = await extractAuthentication(page, turndownService)
    writeFile(path.join(OUTPUT_DIR, "authentication.md"), authentication)

    const networkConnectivity = await extractNetworkConnectivity(
      page,
      turndownService
    )
    writeFile(
      path.join(OUTPUT_DIR, "network_connectivity.md"),
      networkConnectivity
    )

    const errorCodes = await extractErrorCodes(page, turndownService)
    writeFile(path.join(OUTPUT_DIR, "error_codes.md"), errorCodes)

    const responseFormats = await extractResponseFormats(page, turndownService)
    writeFile(path.join(OUTPUT_DIR, "response_formats.md"), responseFormats)

    const changelog = await extractChangelog(page, turndownService)
    writeFile(path.join(OUTPUT_DIR, "change_log.md"), changelog)

    console.log("\n✅ General documentation extraction completed successfully!")
    console.log(`📁 Files written to: ${OUTPUT_DIR}`)
  } finally {
    await browser.close()
  }
}

// Standard entry point
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error("❌ Unhandled error in main:", error)
    console.error("Stack trace:", error.stack)
    process.exit(1)
  })
}

export { main }
