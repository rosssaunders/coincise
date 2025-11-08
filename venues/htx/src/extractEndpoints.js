/**
 * HTX Exchange - Endpoint Documentation Extraction
 * Extracts individual endpoint documentation from HTX API docs
 */
"use strict"

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { launchBrowser, configurePage } from "../../shared/puppeteer.js"
import { createTurndownBuilder } from "../../shared/turndown.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BASE_URL = "https://www.htx.com/en-us/opend/newApiPages/"
const OUTPUT_DIR = path.resolve(__dirname, "../../../docs/htx/endpoints")

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
  console.log(`  Writing ${path.basename(filePath)}...`)
  fs.writeFileSync(filePath, content, "utf8")
}

/**
 * Sanitize filename by removing special characters
 */
const sanitizeFilename = name => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .replace(/_+/g, "_")
}

/**
 * Generate filename from HTTP method and endpoint path
 */
const generateFilename = (method, path) => {
  const methodLower = method.toLowerCase()
  const pathPart = sanitizeFilename(path.replace(/^\//, "").replace(/\//g, "_"))
  return `${methodLower}_${pathPart}.md`
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
 * Extract all endpoint menu items
 */
const extractEndpointMenuItems = async page => {
  return await page.evaluate(() => {
    const listItems = document.querySelectorAll('li[role="menuitem"]')
    const endpoints = []

    for (const item of listItems) {
      const keys = item.getAttribute("keys")
      if (!keys) continue

      const keyParts = keys.split(",")
      const lastKey = keyParts[keyParts.length - 1]?.trim()

      // GUID format indicates an endpoint (contains hyphens)
      if (lastKey && lastKey.includes("-")) {
        const categoryElement =
          item.parentElement?.parentElement?.firstElementChild
        const categoryText = categoryElement
          ? categoryElement.textContent.trim()
          : "Unknown Category"

        endpoints.push({
          text: item.textContent.trim(),
          guid: lastKey,
          category: categoryText
        })
      }
    }

    return endpoints
  })
}

/**
 * Click menu item by GUID and extract content
 */
const extractEndpointContent = async (page, guid) => {
  // Click the menu item
  await page.evaluate(guid => {
    const listItems = document.querySelectorAll('li[role="menuitem"]')
    for (const item of listItems) {
      const keys = item.getAttribute("keys")
      if (keys && keys.includes(guid)) {
        item.click()
        return
      }
    }
  }, guid)

  // Wait for content to load
  await page.waitForTimeout(2000)

  const html = await page.evaluate(async () => {
    const contentDiv = document.querySelector(
      "div.newApiPages_posR__RKd5D.newApiPages_posDetail__SmN2h"
    )
    if (!contentDiv) return null

    // Clone the content div to avoid modifying the original
    const clonedContent = contentDiv.cloneNode(true)

    // Remove unwanted elements
    const toolsPanel = clonedContent.querySelector("#tools")
    if (toolsPanel) toolsPanel.remove()

    const codeList = clonedContent.querySelector("#code_list")
    if (codeList) codeList.remove()

    // Remove Failure Example sections
    const failureTitles = clonedContent.querySelectorAll("h2")
    for (const title of failureTitles) {
      if (title.textContent.trim() === "Failure Example") {
        title.parentElement?.remove()
      }
    }

    // Remove empty icons and table rows
    const emptyIcons = clonedContent.querySelectorAll("img.empty__icon")
    emptyIcons.forEach(icon => icon.remove())

    const emptyTableRows = clonedContent.querySelectorAll(
      "tr.ant-table-placeholder"
    )
    emptyTableRows.forEach(tr => tr.remove())

    // Convert h3 panel titles
    const panelTitles = clonedContent.querySelectorAll(
      "h3.newApiPages_panelWrapTitle__kLXE_"
    )
    panelTitles.forEach(title => {
      const h3 = document.createElement("h3")
      h3.innerHTML = title.innerHTML
      h3.className = title.className
      title.parentNode.replaceChild(h3, title)
    })

    // Convert h2 titles to h4
    const requestAddressTitles = clonedContent.querySelectorAll(
      "h2.newApiPages_wrapTitle__UqglL"
    )
    requestAddressTitles.forEach(title => {
      const h4 = document.createElement("h4")
      h4.innerHTML = title.innerHTML
      h4.className = title.className
      title.parentNode.replaceChild(h4, title)
    })

    // Convert Success Example h2 to h5
    const h2Titles = clonedContent.querySelectorAll("h2")
    h2Titles.forEach(title => {
      if (title.textContent.trim() === "Success Example") {
        const h5 = document.createElement("h5")
        h5.innerHTML = title.innerHTML
        h5.className = title.className
        title.parentNode.replaceChild(h5, title)
      }
    })

    // Strip <data> tags from table cells
    const dataCells = clonedContent.querySelectorAll("td.ant-table-cell")
    dataCells.forEach(cell => {
      if (cell.textContent.startsWith("</")) {
        const strippedContents = cell.textContent.substring(
          2,
          cell.textContent.length - 1
        )
        cell.textContent = strippedContents.toUpperCase() + "_END"
        return
      }

      if (cell.textContent.startsWith("<")) {
        const strippedContents = cell.textContent.substring(
          1,
          cell.textContent.length - 1
        )
        cell.textContent = strippedContents.toUpperCase() + "_START"
      }
    })

    // Convert react-json-view blocks to code blocks
    const jsonViews = clonedContent.querySelectorAll(".react-json-view")
    for (const jsonView of jsonViews) {
      const h2 = jsonView.previousElementSibling
      if (h2 && h2.tagName.toLowerCase() === "h2") {
        const h3 = document.createElement("h3")
        h3.innerHTML = h2.innerHTML
        h3.className = h2.className
        h2.parentNode.replaceChild(h3, h2)
      }

      // Try to get JSON from clipboard
      const copyContainer = jsonView.querySelector(
        ".copy-to-clipboard-container"
      )
      if (copyContainer) {
        const copyButton = copyContainer.firstElementChild
        if (copyButton) {
          try {
            copyButton.click()
            await new Promise(resolve => setTimeout(resolve, 100))

            const jsonText = await navigator.clipboard.readText()
            if (jsonText) {
              const codeBlock = document.createElement("pre")
              const code = document.createElement("code")
              code.textContent = jsonText
              codeBlock.appendChild(code)
              jsonView.parentNode.replaceChild(codeBlock, jsonView)
            }
          } catch (e) {
            console.warn("Could not copy JSON from clipboard:", e)
          }
        }
      }
    }

    return clonedContent.innerHTML
  })

  return html
}

/**
 * Extract HTTP method and path from endpoint title
 */
const parseEndpointTitle = title => {
  // Try to extract method and path from title
  // Common patterns: "GET /v1/account", "POST /v1/order", etc.
  const methodMatch = title.match(/^(GET|POST|PUT|DELETE|PATCH)\s+(.+)/i)
  if (methodMatch) {
    return {
      method: methodMatch[1].toUpperCase(),
      path: methodMatch[2].trim()
    }
  }

  // If no method found, check if title contains a path
  if (title.includes("/")) {
    return {
      method: "GET", // Default to GET
      path: title.trim()
    }
  }

  // Otherwise, use the title as-is
  return {
    method: "GET",
    path: title.trim()
  }
}

/**
 * Determine if endpoint is public or private
 */
const isPublicEndpoint = (content, title, category) => {
  if (!content) return true

  const contentLower = content.toLowerCase()

  // Check for authentication requirements in content
  const hasApiKey =
    contentLower.includes("api-key") ||
    contentLower.includes("apikey") ||
    contentLower.includes("accesskey")
  const hasSignature =
    contentLower.includes("signature") || contentLower.includes("sign")
  const hasTimestamp = contentLower.includes("timestamp")

  // If content mentions authentication requirements, it's private
  if (hasApiKey || hasSignature || hasTimestamp) {
    return false
  }

  // Check category name
  const categoryLower = category.toLowerCase()
  if (
    categoryLower.includes("private") ||
    categoryLower.includes("account") ||
    categoryLower.includes("trading") ||
    categoryLower.includes("order") ||
    categoryLower.includes("wallet")
  ) {
    return false
  }

  if (
    categoryLower.includes("public") ||
    categoryLower.includes("market") ||
    categoryLower.includes("reference")
  ) {
    return true
  }

  // Check title
  const titleLower = title.toLowerCase()
  if (
    titleLower.includes("public") ||
    titleLower.includes("market") ||
    titleLower.includes("ticker") ||
    titleLower.includes("orderbook") ||
    titleLower.includes("trades") ||
    titleLower.includes("kline") ||
    titleLower.includes("depth")
  ) {
    return true
  }

  if (
    titleLower.includes("order") ||
    titleLower.includes("balance") ||
    titleLower.includes("account") ||
    titleLower.includes("withdraw") ||
    titleLower.includes("deposit")
  ) {
    return false
  }

  // Default to public if unclear
  return true
}

/**
 * Process and save endpoint documentation
 */
const processEndpoint = (endpoint, content, turndownService) => {
  const { method, path: endpointPath } = parseEndpointTitle(endpoint.text)
  const isPublic = isPublicEndpoint(content, endpoint.text, endpoint.category)

  // Convert HTML to Markdown
  let markdown = turndownService.turndown(content || "")

  // Add standard template header
  const sourceUrl = `${BASE_URL}?id=${endpoint.guid}`
  const header = `# ${method} ${endpointPath}\n\n**Source:** [${endpoint.text}](${sourceUrl})\n\n**Category:** ${endpoint.category}\n\n## Authentication\n\n${isPublic ? "Not Required (Public Endpoint)" : "Required (Private Endpoint)"}\n\n`

  markdown = header + markdown

  // Generate filename
  const filename = generateFilename(method, endpointPath)
  const folder = isPublic ? "public" : "private"
  const filePath = path.join(OUTPUT_DIR, folder, filename)

  // Write file
  writeFile(filePath, markdown)

  return { filename, isPublic }
}

/**
 * Main extraction function
 */
const main = async () => {
  console.log("🚀 Starting HTX endpoint documentation extraction...")
  console.log(`📍 Source: ${BASE_URL}`)
  console.log(`📁 Output: ${OUTPUT_DIR}`)

  const browser = await launchBrowser()

  try {
    const page = await browser.newPage()

    // Set a realistic user agent (important for HTX)
    await page.setUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"
    )

    // Set viewport to a realistic size
    await page.setViewport({ width: 1280, height: 800 })

    // Enable clipboard permissions
    const context = browser.defaultBrowserContext()
    await context.overridePermissions(BASE_URL, [
      "clipboard-read",
      "clipboard-write",
      "clipboard-sanitized-write"
    ])

    console.log(`Navigating to ${BASE_URL}...`)
    await page.goto(BASE_URL, { waitUntil: "networkidle0", timeout: 60000 })
    console.log("✅ Page loaded")

    // Wait for menu to render
    await waitForMenu(page)

    const turndownService = createTurndownBuilder().build()

    // Ensure output directories exist
    ensureDir(path.join(OUTPUT_DIR, "public"))
    ensureDir(path.join(OUTPUT_DIR, "private"))

    // Extract all endpoint menu items
    console.log("Extracting endpoint menu items...")
    const endpoints = await extractEndpointMenuItems(page)
    console.log(`\n📊 Found ${endpoints.length} endpoint menu items`)

    if (endpoints.length === 0) {
      console.warn(
        "\n⚠️  Warning: No endpoints were found. The documentation structure may have changed."
      )
      process.exit(0)
    }

    let publicCount = 0
    let privateCount = 0

    // Process each endpoint
    console.log("\n📝 Processing endpoints...")
    for (let i = 0; i < endpoints.length; i++) {
      const endpoint = endpoints[i]
      console.log(
        `\n[${i + 1}/${endpoints.length}] Processing: ${endpoint.text}`
      )

      try {
        const content = await extractEndpointContent(page, endpoint.guid)

        if (!content) {
          console.warn(`  ⚠️  No content found for ${endpoint.text}`)
          continue
        }

        const result = processEndpoint(endpoint, content, turndownService)

        if (result.isPublic) {
          publicCount++
        } else {
          privateCount++
        }

        // Add a small delay between requests
        await page.waitForTimeout(500)
      } catch (error) {
        console.error(`  ❌ Error processing ${endpoint.text}:`, error.message)
      }
    }

    const totalEndpoints = publicCount + privateCount

    console.log(
      `\n✅ Endpoint documentation extraction completed successfully!`
    )
    console.log(`📁 Files written to: ${OUTPUT_DIR}`)
    console.log(`   - Public endpoints: ${publicCount}`)
    console.log(`   - Private endpoints: ${privateCount}`)
    console.log(`   - Total: ${totalEndpoints}`)
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
