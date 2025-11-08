/**
 * Backpack Exchange - General Documentation Extraction
 * Extracts core documentation sections from Redocly-based API docs
 */
"use strict"

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { launchBrowser, configurePage } from "../../shared/puppeteer.js"
import { createTurndownBuilder } from "../../shared/turndown.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BASE_URL = "https://docs.backpack.exchange"
const OUTPUT_DIR = path.resolve(__dirname, "../../../docs/backpack")

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
 * Extract Introduction and Network Connectivity section
 */
const extractNetworkConnectivity = async (page, turndownService) => {
  console.log("Extracting network connectivity information...")

  const html = await page.evaluate(() => {
    const content = document.createElement("div")

    // Find the Introduction section
    const sections = Array.from(document.querySelectorAll("h1, h2, p"))
    let capturing = false

    for (const element of sections) {
      if (
        element.tagName === "H1" &&
        element.textContent.includes("Introduction")
      ) {
        capturing = true
        content.appendChild(element.cloneNode(true))
        continue
      }

      if (
        capturing &&
        element.tagName === "H1" &&
        !element.textContent.includes("Introduction")
      ) {
        break
      }

      if (capturing) {
        content.appendChild(element.cloneNode(true))
      }
    }

    return content.innerHTML
  })

  const markdown = turndownService.turndown(html)
  return (
    markdown ||
    "# Network Connectivity\n\nThe API is hosted at https://api.backpack.exchange/ and the WS API is hosted at wss://ws.backpack.exchange/.\n"
  )
}

/**
 * Extract Authentication section
 */
const extractAuthentication = async (page, turndownService) => {
  console.log("Extracting authentication information...")

  const html = await page.evaluate(() => {
    const content = document.createElement("div")

    // Find Authentication section
    const headings = Array.from(
      document.querySelectorAll("h1, h2, h3, h4, p, ul, ol, pre, code")
    )
    let capturing = false

    for (const element of headings) {
      // Start capturing at Authentication heading
      if (
        (element.tagName === "H1" || element.tagName === "H2") &&
        element.textContent.toLowerCase().includes("authentication")
      ) {
        capturing = true
        content.appendChild(element.cloneNode(true))
        continue
      }

      // Stop at Changelog or other major sections (H1 or H2)
      if (capturing && (element.tagName === "H1" || element.tagName === "H2")) {
        const text = element.textContent.toLowerCase()
        // Stop at changelog or any non-authentication H2
        if (
          text.includes("changelog") ||
          text.includes("public endpoints") ||
          text.includes("streams") ||
          text.includes("websocket")
        ) {
          break
        }

        // Also check if this H2 has a link that indicates a different section
        const link = element.querySelector("a[href]")
        if (link) {
          const href = link.getAttribute("href")
          // Stop if we're no longer in the authentication section
          if (
            href &&
            !href.includes("Authentication") &&
            href.startsWith("#section/")
          ) {
            break
          }
        }
      }

      if (capturing) {
        content.appendChild(element.cloneNode(true))
      }
    }

    return content.innerHTML
  })

  const markdown = turndownService.turndown(html)
  return (
    markdown ||
    "# Authentication\n\nSigned requests are required for API calls. Please refer to the documentation for details.\n"
  )
}

/**
 * Extract Changelog section
 */
const extractChangelog = async (page, turndownService) => {
  console.log("Extracting changelog...")

  const html = await page.evaluate(() => {
    const content = document.createElement("div")

    // Find Changelog section
    const elements = Array.from(document.querySelectorAll("*"))
    let capturing = false

    for (const element of elements) {
      if (
        (element.tagName === "H1" || element.tagName === "H2") &&
        element.textContent.toLowerCase().includes("changelog")
      ) {
        capturing = true
        content.appendChild(element.cloneNode(true))
        continue
      }

      // Stop at next major section (H1) or API endpoint sections (H2 with [](#tag/ pattern)
      if (
        capturing &&
        element.tagName === "H1" &&
        !element.textContent.toLowerCase().includes("changelog")
      ) {
        break
      }

      // Stop at API endpoint/tag sections (these start with [](#tag/ in Redocly)
      if (capturing && element.tagName === "H2") {
        const firstLink = element.querySelector("a")
        if (
          firstLink &&
          firstLink.getAttribute("href") &&
          firstLink.getAttribute("href").startsWith("#tag/")
        ) {
          break
        }
      }

      if (
        capturing &&
        (element.tagName === "H2" ||
          element.tagName === "H3" ||
          element.tagName === "P" ||
          element.tagName === "UL" ||
          element.tagName === "OL")
      ) {
        content.appendChild(element.cloneNode(true))
      }
    }

    return content.innerHTML
  })

  const markdown = turndownService.turndown(html)
  return markdown || "# Changelog\n\nNo changelog information available.\n"
}

/**
 * Extract Rate Limits section
 */
const extractRateLimits = async (page, turndownService) => {
  console.log("Extracting rate limits...")

  const html = await page.evaluate(() => {
    const content = document.createElement("div")

    // Search for rate limit information
    const elements = Array.from(
      document.querySelectorAll("h1, h2, h3, p, table, ul, ol")
    )
    let capturing = false

    for (const element of elements) {
      const text = element.textContent.toLowerCase()

      if (
        (element.tagName === "H1" ||
          element.tagName === "H2" ||
          element.tagName === "H3") &&
        (text.includes("rate limit") || text.includes("ratelimit"))
      ) {
        capturing = true
        content.appendChild(element.cloneNode(true))
        continue
      }

      if (capturing && element.tagName === "H1") {
        break
      }

      if (capturing) {
        content.appendChild(element.cloneNode(true))
      }
    }

    return content.innerHTML
  })

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

  const html = await page.evaluate(() => {
    const content = document.createElement("div")

    // Search for error code information
    const elements = Array.from(
      document.querySelectorAll("h1, h2, h3, p, table, ul, ol, pre")
    )
    let capturing = false

    for (const element of elements) {
      const text = element.textContent.toLowerCase()

      if (
        (element.tagName === "H1" || element.tagName === "H2") &&
        text.includes("error") &&
        (text.includes("code") || text.includes("response"))
      ) {
        capturing = true
        content.appendChild(element.cloneNode(true))
        continue
      }

      if (
        capturing &&
        element.tagName === "H1" &&
        !(text.includes("error") && text.includes("code"))
      ) {
        break
      }

      if (capturing) {
        content.appendChild(element.cloneNode(true))
      }
    }

    return content.innerHTML
  })

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

  const html = await page.evaluate(() => {
    const content = document.createElement("div")

    // For Redocly docs, response formats are typically shown in schemas or examples
    // We'll extract a general response format description
    content.innerHTML =
      "<h1>Response Formats</h1><p>All responses from the Backpack Exchange API follow standard JSON format.</p>"

    return content.innerHTML
  })

  const markdown = turndownService.turndown(html)
  return markdown
}

/**
 * Main extraction function
 */
const main = async () => {
  console.log("🚀 Starting Backpack general documentation extraction...")
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
