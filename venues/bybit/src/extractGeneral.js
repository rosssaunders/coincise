/**
 * Bybit - General Documentation Extraction
 * Extracts core documentation sections from Bybit V5 API docs
 */
"use strict"

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { launchBrowser, configurePage } from "../../shared/puppeteer.js"
import { createTurndownBuilder } from "../../shared/turndown.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BASE_URL = "https://bybit-exchange.github.io/docs/v5"
const OUTPUT_DIR = path.resolve(__dirname, "../../../docs/bybit")

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
 * Extract main content from page
 */
const extractPageContent = async (page, turndownService) => {
  const html = await page.evaluate(() => {
    // Get the main content area (excluding navigation)
    const main = document.querySelector('main, article, .main-content, [role="main"]')
    if (!main) {
      return document.body.innerHTML
    }
    return main.innerHTML
  })

  return turndownService.turndown(html)
}

/**
 * Extract Network Connectivity section from intro page
 */
const extractNetworkConnectivity = async (page, turndownService) => {
  console.log("Extracting network connectivity information...")

  await page.goto(`${BASE_URL}/intro`, {
    waitUntil: "networkidle0",
    timeout: 30000
  })

  const markdown = await extractPageContent(page, turndownService)
  return markdown || "# Network Connectivity\n\nPlease refer to the Bybit API documentation for network connectivity information.\n"
}

/**
 * Extract Authentication section
 */
const extractAuthentication = async (page, turndownService) => {
  console.log("Extracting authentication information...")

  // Bybit has authentication info in the guide page
  await page.goto(`${BASE_URL}/guide`, {
    waitUntil: "networkidle0",
    timeout: 30000
  })

  const html = await page.evaluate(() => {
    const content = document.createElement("div")
    const main = document.querySelector('main, article, .main-content, [role="main"]')
    
    if (!main) {
      return "<h1>Authentication</h1><p>Please refer to the Bybit API documentation for authentication details.</p>"
    }

    // Get all elements from main content
    const elements = Array.from(main.querySelectorAll('*'))
    let capturing = false

    for (const element of elements) {
      const text = element.textContent.toLowerCase()
      
      // Start capturing when we find authentication-related content
      if (
        (element.tagName === "H1" || 
         element.tagName === "H2" || 
         element.tagName === "H3") &&
        (text.includes("authentication") || 
         text.includes("api key") || 
         text.includes("signature"))
      ) {
        capturing = true
        content.appendChild(element.cloneNode(true))
        continue
      }

      // Stop at major section changes
      if (capturing && (element.tagName === "H1" || element.tagName === "H2")) {
        const nextText = element.textContent.toLowerCase()
        if (!nextText.includes("authentication") && 
            !nextText.includes("api key") && 
            !nextText.includes("signature") &&
            !nextText.includes("request") &&
            !nextText.includes("header")) {
          break
        }
      }

      if (capturing) {
        content.appendChild(element.cloneNode(true))
      }
    }

    return content.innerHTML || "<h1>Authentication</h1><p>Please refer to the Bybit API documentation for authentication details.</p>"
  })

  const markdown = turndownService.turndown(html)
  return markdown
}

/**
 * Extract Rate Limits section
 */
const extractRateLimits = async (page, turndownService) => {
  console.log("Extracting rate limits...")

  await page.goto(`${BASE_URL}/rate-limit`, {
    waitUntil: "networkidle0",
    timeout: 30000
  })

  const markdown = await extractPageContent(page, turndownService)
  return markdown || "# Rate Limits\n\nPlease refer to the Bybit API documentation for rate limit information.\n"
}

/**
 * Extract Error Codes section
 */
const extractErrorCodes = async (page, turndownService) => {
  console.log("Extracting error codes...")

  await page.goto(`${BASE_URL}/error`, {
    waitUntil: "networkidle0",
    timeout: 30000
  })

  const markdown = await extractPageContent(page, turndownService)
  return markdown || "# Error Codes\n\nPlease refer to the Bybit API documentation for error code information.\n"
}

/**
 * Extract Response Formats section
 */
const extractResponseFormats = async (page, turndownService) => {
  console.log("Extracting response formats...")

  // Bybit has enum definitions which include response formats
  await page.goto(`${BASE_URL}/enum`, {
    waitUntil: "networkidle0",
    timeout: 30000
  })

  const html = await page.evaluate(() => {
    const content = document.createElement("div")
    const main = document.querySelector('main, article, .main-content, [role="main"]')
    
    if (!main) {
      return "<h1>Response Formats</h1><p>All responses from the Bybit API follow standard JSON format.</p>"
    }

    // Get the first few sections which typically describe response structure
    const elements = Array.from(main.querySelectorAll('h1, h2, h3, p, ul, ol, pre, code, table'))
    let count = 0
    
    for (const element of elements.slice(0, 20)) {
      content.appendChild(element.cloneNode(true))
      count++
    }

    return content.innerHTML || "<h1>Response Formats</h1><p>All responses from the Bybit API follow standard JSON format.</p>"
  })

  const markdown = turndownService.turndown(html)
  return markdown
}

/**
 * Extract Changelog section
 */
const extractChangelog = async (page, turndownService) => {
  console.log("Extracting changelog...")

  await page.goto("https://bybit-exchange.github.io/docs/changelog/v5", {
    waitUntil: "networkidle0",
    timeout: 30000
  })

  const markdown = await extractPageContent(page, turndownService)
  return markdown || "# Changelog\n\nNo changelog information available.\n"
}

/**
 * Main extraction function
 */
const main = async () => {
  console.log("🚀 Starting Bybit general documentation extraction...")
  console.log(`📍 Source: ${BASE_URL}`)
  console.log(`📁 Output: ${OUTPUT_DIR}`)

  const browser = await launchBrowser()

  try {
    const page = await browser.newPage()
    await configurePage(page)

    const turndownService = createTurndownBuilder().build()

    // Ensure output directory exists
    ensureDir(OUTPUT_DIR)

    // Extract each section
    const networkConnectivity = await extractNetworkConnectivity(
      page,
      turndownService
    )
    writeFile(
      path.join(OUTPUT_DIR, "network_connectivity.md"),
      networkConnectivity
    )

    const authentication = await extractAuthentication(page, turndownService)
    writeFile(path.join(OUTPUT_DIR, "authentication.md"), authentication)

    const rateLimits = await extractRateLimits(page, turndownService)
    writeFile(path.join(OUTPUT_DIR, "rate_limits.md"), rateLimits)

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
