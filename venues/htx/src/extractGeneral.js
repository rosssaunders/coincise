/**
 * HTX Exchange - General Documentation Extraction
 * Extracts core documentation sections from HTX API docs
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
 * Click menu item and extract content
 */
const extractSectionContent = async (page, menuId) => {
  await page.evaluate(menuId => {
    const listItems = document.querySelectorAll('li[role="menuitem"]')
    for (const item of listItems) {
      const keys = item.getAttribute("keys")
      if (keys && keys.split(",").includes(menuId.toString())) {
        item.click()
        return
      }
    }
  }, menuId)

  // Wait for content to load
  await page.waitForTimeout(1000)

  const html = await page.evaluate(() => {
    const contentDiv = document.querySelector(
      "div.newApiPages_posR__RKd5D.newApiPages_posDetail__SmN2h"
    )
    if (!contentDiv) return ""

    // Remove unwanted elements
    const toolsPanel = contentDiv.querySelector("#tools")
    if (toolsPanel) toolsPanel.remove()

    const codeList = contentDiv.querySelector("#code_list")
    if (codeList) codeList.remove()

    return contentDiv.innerHTML
  })

  return html
}

/**
 * Extract Rate Limits section
 */
const extractRateLimits = async (page, turndownService) => {
  console.log("Extracting rate limits...")

  // HTX rate limits are typically in numeric ID 668 (REST API Rate Limit)
  const html = await extractSectionContent(page, 668)

  if (!html) {
    return "# Rate Limits\n\nPlease refer to the HTX API documentation for rate limit information.\n"
  }

  const markdown = turndownService.turndown(html)
  return markdown || "# Rate Limits\n\nNo rate limit information available.\n"
}

/**
 * Extract Authentication section
 */
const extractAuthentication = async (page, turndownService) => {
  console.log("Extracting authentication information...")

  // HTX authentication is typically in numeric ID 666 (Quick Start -> Preparation)
  const html = await extractSectionContent(page, 666)

  if (!html) {
    return "# Authentication\n\nPlease refer to the HTX API documentation for authentication information.\n"
  }

  const markdown = turndownService.turndown(html)
  return (
    markdown || "# Authentication\n\nNo authentication information available.\n"
  )
}

/**
 * Extract Network Connectivity section
 */
const extractNetworkConnectivity = async (page, turndownService) => {
  console.log("Extracting network connectivity information...")

  // HTX network connectivity is typically in numeric ID 669 (Access URLs)
  const html = await extractSectionContent(page, 669)

  if (!html) {
    return "# Network Connectivity\n\nPlease refer to the HTX API documentation for network connectivity information.\n"
  }

  const markdown = turndownService.turndown(html)
  return (
    markdown ||
    "# Network Connectivity\n\nNo network connectivity information available.\n"
  )
}

/**
 * Extract Error Codes section
 */
const extractErrorCodes = async (page, turndownService) => {
  console.log("Extracting error codes...")

  // HTX error codes are typically in numeric ID 427 (Error Codes)
  const html = await extractSectionContent(page, 427)

  if (!html) {
    return "# Error Codes\n\nPlease refer to the HTX API documentation for error code information.\n"
  }

  const markdown = turndownService.turndown(html)
  return markdown || "# Error Codes\n\nNo error code information available.\n"
}

/**
 * Extract Response Formats section
 */
const extractResponseFormats = async (page, turndownService) => {
  console.log("Extracting response formats...")

  // HTX response formats are typically in numeric ID 415 (Response Format)
  const html = await extractSectionContent(page, 415)

  if (!html) {
    return "# Response Formats\n\nAll responses from the HTX API follow standard JSON format.\n"
  }

  const markdown = turndownService.turndown(html)
  return (
    markdown ||
    "# Response Formats\n\nNo response format information available.\n"
  )
}

/**
 * Extract Changelog section
 */
const extractChangelog = async (page, turndownService) => {
  console.log("Extracting changelog...")

  // HTX changelog is typically in numeric ID 5401 (Change Log)
  const html = await extractSectionContent(page, 5401)

  if (!html) {
    return "# Changelog\n\nPlease refer to the HTX API documentation for changelog information.\n"
  }

  const markdown = turndownService.turndown(html)
  return markdown || "# Changelog\n\nNo changelog information available.\n"
}

/**
 * Main extraction function
 */
const main = async () => {
  console.log("🚀 Starting HTX general documentation extraction...")
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

    console.log(`Navigating to ${BASE_URL}...`)
    await page.goto(BASE_URL, { waitUntil: "networkidle0", timeout: 60000 })
    console.log("✅ Page loaded")

    // Wait for menu to render
    await waitForMenu(page)

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
