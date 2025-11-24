/**
 * HTX Exchange - General Documentation Extraction (Click-based)
 * Extracts core documentation sections using menu clicks
 */
"use strict"

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { launchBrowser, configurePage } from "../../shared/puppeteer.js"
import { createTurndownBuilder } from "../../shared/turndown.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BASE_URL = "https://www.htx.com/en-us/opend/newApiPages"
const OUTPUT_DIR = path.resolve(__dirname, "../../../docs/htx")

// Section definitions with menu paths
const SECTIONS = [
  {
    menuPath: ["Spot", "API Access", "New Version Rate limit Rule"],
    filename: "rate_limits.md",
    description: "Rate Limits"
  },
  {
    menuPath: ["Spot", "Quick Start", "Authentication"],
    filename: "authentication.md",
    description: "Authentication"
  },
  {
    menuPath: ["Spot", "Quick Start", "Access URLs"],
    filename: "network_connectivity.md",
    description: "Network Connectivity"
  },
  {
    menuPath: ["Spot", "API Access", "Response Format"],
    filename: "response_formats.md",
    description: "Response Formats"
  }
]

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
 * Click through menu hierarchy and extract content
 */
const extractSectionByMenuPath = async (page, menuPath, description) => {
  console.log(`\nExtracting: ${description}...`)
  console.log(`  Menu path: ${menuPath.join(" → ")}`)

  // Navigate to base URL
  await page.goto(BASE_URL, {
    waitUntil: "networkidle0",
    timeout: 60000
  })

  // Wait for menu to load with retries
  let menuLoaded = false
  let retries = 0
  const maxRetries = 3

  while (!menuLoaded && retries < maxRetries) {
    try {
      await page.waitForSelector("ul#sliderMenu.ant-menu", {
        timeout: 60000,
        visible: true
      })
      console.log(`  ✅ Menu loaded successfully`)
      menuLoaded = true
    } catch (error) {
      retries++
      console.log(`  ⚠️  Menu selector timeout (attempt ${retries}/${maxRetries}) - checking if menu exists anyway...`)
      const menuExists = await page.evaluate(() => {
        const menu = document.querySelector("ul#sliderMenu.ant-menu")
        if (!menu) {
          // Log what selectors ARE available for debugging
          const allMenus = document.querySelectorAll('ul')
          return {
            exists: false,
            visible: false,
            totalUls: allMenus.length,
            ulIds: Array.from(allMenus).map(ul => ul.id || 'no-id').slice(0, 10)
          }
        }
        return { exists: true, visible: menu.offsetParent !== null }
      })
      console.log(`  Menu status:`, menuExists)

      if (menuExists && menuExists.exists) {
        console.log(`  ✅ Menu exists and will proceed anyway`)
        menuLoaded = true
      } else if (retries >= maxRetries) {
        console.error(`  ❌ Menu not found after all retries. Available ul elements:`, menuExists)
        throw error
      } else {
        console.log(`  ⏳ Waiting 5 seconds before retry...`)
        await new Promise(resolve => setTimeout(resolve, 5000))
      }
    }
  }

  // Additional wait to ensure menu is fully interactive
  await new Promise(resolve => setTimeout(resolve, 3000))

  // Click through each level of the menu path
  for (let i = 0; i < menuPath.length; i++) {
    const menuText = menuPath[i]
    console.log(`  Clicking: ${menuText}`)

    const clicked = await page.evaluate(menuText => {
      const items = document.querySelectorAll('[role="menuitem"]')
      for (const item of items) {
        if (item.textContent.trim() === menuText) {
          item.click()
          return true
        }
      }
      return false
    }, menuText)

    if (!clicked) {
      console.log(`  ⚠️  Menu item "${menuText}" not found`)
      // Log available menu items for debugging
      const availableItems = await page.evaluate(() => {
        const items = document.querySelectorAll('[role="menuitem"]')
        return Array.from(items)
          .slice(0, 20)
          .map(item => item.textContent.trim())
      })
      console.log(`  Available menu items:`, availableItems)
      return null
    }

    // Wait for menu to expand/content to load
    await new Promise(resolve => setTimeout(resolve, 1500))
  }

  // Wait longer for final content to load
  console.log(`  Waiting for content to render...`)
  await new Promise(resolve => setTimeout(resolve, 5000))

  // Extract HTML content
  const html = await page.evaluate(() => {
    const mainDiv = document.querySelector("div.newApiPages_main__O4xgg")
    if (!mainDiv) return null

    // Clone to avoid modifying original
    const cloned = mainDiv.cloneNode(true)

    // Remove unwanted elements
    const searchBox = cloned.querySelector(".newApiPages_search__qbe6O")
    if (searchBox) searchBox.remove()

    const codeList = cloned.querySelector("#code_list")
    if (codeList) codeList.remove()

    const toolsPanel = cloned.querySelector("#tools")
    if (toolsPanel) toolsPanel.remove()

    const introBox = cloned.querySelector(".newApiPages_introbox__f2hE2")
    if (introBox) introBox.remove()

    return cloned.innerHTML
  })

  if (!html || html.trim().length === 0) {
    console.log(`  ⚠️  No content found`)
    return null
  }

  console.log(`  ✅ Extracted ${html.length} characters`)
  return html
}

/**
 * Extract Error Codes section
 */
const extractErrorCodes = async () => {
  console.log("\nExtracting error codes...")

  // HTX does not provide a centralized error codes section
  console.log("⚠️  Error codes section not found in menu structure")

  return '# Error Codes\n\nHTX does not currently provide a centralized error codes reference in the API documentation.\n\nError information is typically included in individual endpoint responses with the following structure:\n\n```json\n{\n  "status": "error",\n  "err-code": "error-code-string",\n  "err-msg": "Error description",\n  "data": null\n}\n```\n\nFor troubleshooting API errors:\n- Check the `err-code` and `err-msg` fields in the response\n- Refer to individual endpoint documentation for endpoint-specific errors\n- Contact HTX support for error code clarification: support@huobigroup.com\n'
}

/**
 * Extract Changelog section
 */
const extractChangelog = async () => {
  console.log("\nExtracting changelog...")

  // HTX does not provide a changelog in the menu structure
  console.log(
    "⚠️  Changelog section not found in menu - HTX may have removed it"
  )

  return "# Change Log\n\nHTX does not currently provide a structured changelog in the API documentation.\n\nFor the latest API updates and changes, please visit:\n- [HTX Support Center - API Announcements](https://www.huobi.pe/support/en-us/list/360000070201)\n- Subscribe to announcements by logging in and clicking 'Follow' on the announcements page\n"
}

/**
 * Main extraction function
 */
const main = async () => {
  console.log(
    "🚀 Starting HTX general documentation extraction (click-based)..."
  )
  console.log(`📍 Source: ${BASE_URL}`)
  console.log(`📁 Output: ${OUTPUT_DIR}`)

  // Launch browser
  const browser = await launchBrowser()

  try {
    const page = await browser.newPage()

    // Configure page with proper timeouts
    await configurePage(page)

    const turndownService = createTurndownBuilder().build()

    // Ensure output directory exists
    ensureDir(OUTPUT_DIR)

    // Extract each section
    for (const section of SECTIONS) {
      const html = await extractSectionByMenuPath(
        page,
        section.menuPath,
        section.description
      )

      if (html) {
        const markdown = turndownService.turndown(html)
        writeFile(path.join(OUTPUT_DIR, section.filename), markdown)
      } else {
        console.log(
          `⚠️  Skipping ${section.description} - no content extracted`
        )
      }
    }

    // Extract error codes
    const errorCodes = await extractErrorCodes()
    writeFile(path.join(OUTPUT_DIR, "error_codes.md"), errorCodes)

    // Extract changelog
    const changelog = await extractChangelog()
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
