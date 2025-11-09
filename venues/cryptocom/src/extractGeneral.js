/**
 * Crypto.com Exchange - General Documentation Extraction
 * Extracts core documentation sections from Crypto.com API docs
 */
"use strict"

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { launchBrowser, configurePage } from "../../shared/puppeteer.js"
import { createTurndownBuilder } from "../../shared/turndown.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BASE_URL =
  "https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#introduction"
const OUTPUT_DIR = path.resolve(__dirname, "../../../docs/cryptocom")

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
 * Extract content between two H1 sections
 */
const extractH1Section = async (page, sectionTitle) => {
  const html = await page.evaluate(title => {
    const content = document.createElement("div")
    const h1Elements = Array.from(document.querySelectorAll("h1"))

    let capturing = false
    let currentH1 = null

    for (const h1 of h1Elements) {
      const h1Text = h1.textContent.trim()

      if (h1Text === title) {
        capturing = true
        currentH1 = h1
        content.appendChild(h1.cloneNode(true))

        let sibling = h1.nextElementSibling
        while (sibling && sibling.tagName !== "H1") {
          content.appendChild(sibling.cloneNode(true))
          sibling = sibling.nextElementSibling
        }
        break
      }
    }

    return content.innerHTML
  }, sectionTitle)

  return html
}

/**
 * Extract content for specific H2 sections within a page
 */
const extractH2Sections = async (page, sectionTitles) => {
  const html = await page.evaluate(titles => {
    const content = document.createElement("div")
    const h2Elements = Array.from(document.querySelectorAll("h2"))

    for (const h2 of h2Elements) {
      const h2Text = h2.textContent.trim()

      if (titles.includes(h2Text)) {
        content.appendChild(h2.cloneNode(true))

        let sibling = h2.nextElementSibling
        while (sibling && !["H1", "H2"].includes(sibling.tagName)) {
          content.appendChild(sibling.cloneNode(true))
          sibling = sibling.nextElementSibling
        }
      }
    }

    return content.innerHTML
  }, sectionTitles)

  return html
}

/**
 * Extract Network Connectivity section
 */
const extractNetworkConnectivity = async (page, turndownService) => {
  console.log("Extracting network connectivity information...")

  const html = await extractH2Sections(page, [
    "REST API Root Endpoint",
    "Websocket Root Endpoints"
  ])

  const markdown = turndownService.turndown(html)
  return (
    markdown ||
    "# Network Connectivity\n\nPlease refer to the API documentation for network connectivity information.\n"
  )
}

/**
 * Extract Authentication section
 */
const extractAuthentication = async (page, turndownService) => {
  console.log("Extracting authentication information...")

  const html = await extractH2Sections(page, [
    "Generating the API Key",
    "Digital Signature",
    "Request Format"
  ])

  const markdown = turndownService.turndown(html)
  return (
    markdown ||
    "# Authentication\n\nPlease refer to the API documentation for authentication information.\n"
  )
}

/**
 * Extract Change Log section
 */
const extractChangelog = async (page, turndownService) => {
  console.log("Extracting changelog...")

  const html = await extractH2Sections(page, [
    "Breaking Change Schedule",
    "Change Logs"
  ])

  const markdown = turndownService.turndown(html)
  return markdown || "# Change Log\n\nNo changelog information available.\n"
}

/**
 * Extract Rate Limits section
 */
const extractRateLimits = async (page, turndownService) => {
  console.log("Extracting rate limits...")

  const html = await extractH2Sections(page, [
    "Rate Limits",
    "Open Order Limit"
  ])

  const markdown = turndownService.turndown(html)
  return (
    markdown ||
    "# Rate Limits\n\nPlease refer to the API documentation for rate limit information.\n"
  )
}

/**
 * Extract Error Codes section
 */
const extractErrorCodes = async (page, turndownService) => {
  console.log("Extracting error codes...")

  const html = await extractH2Sections(page, [
    "Response and Reason Codes",
    "Websocket Termination Codes",
    "Error Response Format"
  ])

  const markdown = turndownService.turndown(html)
  return (
    markdown ||
    "# Error Codes\n\nPlease refer to the API documentation for error code information.\n"
  )
}

/**
 * Extract Response Formats section
 */
const extractResponseFormats = async (page, turndownService) => {
  console.log("Extracting response formats...")

  const html = await extractH2Sections(page, ["Response Format"])

  const markdown = turndownService.turndown(html)
  return (
    markdown ||
    "# Response Formats\n\nAll responses from the Crypto.com Exchange API follow standard JSON format.\n"
  )
}

/**
 * Main extraction function
 */
const main = async () => {
  console.log("🚀 Starting Crypto.com general documentation extraction...")
  console.log(`📍 Source: ${BASE_URL}`)
  console.log(`📁 Output: ${OUTPUT_DIR}`)

  const browser = await launchBrowser()

  try {
    const page = await browser.newPage()
    await configurePage(page)

    console.log(`Navigating to ${BASE_URL}...`)
    await page.goto(BASE_URL, { waitUntil: "networkidle0", timeout: 30000 })
    console.log("✅ Page loaded")

    // Wait for content to render
    await page.waitForSelector("h1", { timeout: 10000 })

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

    const changelog = await extractChangelog(page, turndownService)
    writeFile(path.join(OUTPUT_DIR, "change_log.md"), changelog)

    const rateLimits = await extractRateLimits(page, turndownService)
    writeFile(path.join(OUTPUT_DIR, "rate_limits.md"), rateLimits)

    const errorCodes = await extractErrorCodes(page, turndownService)
    writeFile(path.join(OUTPUT_DIR, "error_codes.md"), errorCodes)

    const responseFormats = await extractResponseFormats(page, turndownService)
    writeFile(path.join(OUTPUT_DIR, "response_formats.md"), responseFormats)

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
