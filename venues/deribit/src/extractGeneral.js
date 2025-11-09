/**
 * Deribit Exchange - General Documentation Extraction
 * Extracts core documentation sections from Deribit API docs
 */
"use strict"

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { launchBrowser, configurePage } from "../../shared/puppeteer.js"
import { createTurndownBuilder } from "../../shared/turndown.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BASE_URL = "https://docs.deribit.com"
const OUTPUT_DIR = path.resolve(__dirname, "../../../docs/deribit")

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
 * Extract Network Connectivity section (Overview)
 */
const extractNetworkConnectivity = async (page, turndownService) => {
  console.log("Extracting network connectivity information...")

  const html = await page.evaluate(() => {
    // Clean up unwanted elements from the entire document first
    const removeElements = selectors => {
      selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => el.remove())
      })
    }

    removeElements([
      "button",
      ".highlight",
      'a[href*="api_console"]',
      "blockquote.open"
    ])

    const content = document.createElement("div")

    // Find the Overview section
    const h1Sections = document.querySelectorAll("h1")

    for (const h1 of h1Sections) {
      if (h1.textContent.trim() === "Overview") {
        content.appendChild(h1.cloneNode(true))

        let currentElement = h1
        while ((currentElement = currentElement.nextElementSibling) !== null) {
          if (currentElement.tagName === "H1") break
          content.appendChild(currentElement.cloneNode(true))
        }
        break
      }
    }

    return content.innerHTML
  })

  const markdown = turndownService.turndown(html)
  return (
    markdown ||
    "# Network Connectivity\n\nThe API is available at https://www.deribit.com and the test environment at https://test.deribit.com\n"
  )
}

/**
 * Extract Authentication section
 */
const extractAuthentication = async (page, turndownService) => {
  console.log("Extracting authentication information...")

  const html = await page.evaluate(() => {
    // Clean up unwanted elements from the entire document first
    const removeElements = selectors => {
      selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => el.remove())
      })
    }

    removeElements([
      "button",
      ".highlight",
      'a[href*="api_console"]',
      "blockquote.open"
    ])

    const content = document.createElement("div")

    // Find Authentication section
    const h1Sections = document.querySelectorAll("h1")

    for (const h1 of h1Sections) {
      if (h1.textContent.trim() === "Authentication") {
        content.appendChild(h1.cloneNode(true))

        let currentElement = h1
        while ((currentElement = currentElement.nextElementSibling) !== null) {
          if (currentElement.tagName === "H1") break
          content.appendChild(currentElement.cloneNode(true))
        }
        break
      }
    }

    return content.innerHTML
  })

  const markdown = turndownService.turndown(html)
  return (
    markdown ||
    "# Authentication\n\nPlease refer to the API documentation for authentication details.\n"
  )
}

/**
 * Extract Rate Limits section
 */
const extractRateLimits = async (page, turndownService) => {
  console.log("Extracting rate limits...")

  const html = await page.evaluate(() => {
    const content = document.createElement("div")

    // Find Rate Limits section or reference to it
    const elements = Array.from(document.querySelectorAll("h1, h2, p, a"))

    for (const element of elements) {
      const text = element.textContent.toLowerCase()

      if (text.includes("rate limit")) {
        // Check if this is in the Overview section
        if (element.tagName === "H2" && text.includes("rate limits")) {
          content.appendChild(document.createElement("h1")).textContent =
            "Rate Limits"

          // Get the paragraph with the link
          let currentElement = element
          while (
            (currentElement = currentElement.nextElementSibling) !== null
          ) {
            if (
              currentElement.tagName === "H1" ||
              currentElement.tagName === "H2"
            )
              break
            if (currentElement.tagName === "P") {
              content.appendChild(currentElement.cloneNode(true))
            }
          }
          break
        }
      }
    }

    return content.innerHTML
  })

  const markdown = turndownService.turndown(html)
  return (
    markdown ||
    "# Rate Limits\n\nRate limits are described at https://support.deribit.com/hc/en-us/articles/25944617523357-Rate-Limits\n"
  )
}

/**
 * Extract Error Codes section (RPC Error Codes)
 */
const extractErrorCodes = async (page, turndownService) => {
  console.log("Extracting error codes...")

  const html = await page.evaluate(() => {
    const content = document.createElement("div")

    // Find RPC Error Codes section
    const h1Sections = document.querySelectorAll("h1")

    for (const h1 of h1Sections) {
      const text = h1.textContent.trim()
      if (text === "RPC Error Codes" || text.includes("Error Codes")) {
        content.appendChild(h1.cloneNode(true))

        let currentElement = h1
        while ((currentElement = currentElement.nextElementSibling) !== null) {
          if (currentElement.tagName === "H1") break
          content.appendChild(currentElement.cloneNode(true))
        }
        break
      }
    }

    return content.innerHTML
  })

  const markdown = turndownService.turndown(html)
  return (
    markdown ||
    "# Error Codes\n\nPlease refer to the API documentation for error codes.\n"
  )
}

/**
 * Extract Response Formats section (JSON-RPC)
 */
const extractResponseFormats = async (page, turndownService) => {
  console.log("Extracting response formats...")

  const html = await page.evaluate(() => {
    const content = document.createElement("div")

    // Find JSON-RPC section
    const h1Sections = document.querySelectorAll("h1")

    for (const h1 of h1Sections) {
      if (h1.textContent.trim() === "JSON-RPC") {
        content.appendChild(h1.cloneNode(true))

        let currentElement = h1
        while ((currentElement = currentElement.nextElementSibling) !== null) {
          if (currentElement.tagName === "H1") break
          content.appendChild(currentElement.cloneNode(true))
        }
        break
      }
    }

    return content.innerHTML
  })

  const markdown = turndownService.turndown(html)
  return (
    markdown ||
    "# Response Formats\n\nAll responses follow JSON-RPC 2.0 format.\n"
  )
}

/**
 * Extract Changelog (will be empty placeholder as Deribit doesn't have a visible changelog)
 */
const extractChangelog = async (page, turndownService) => {
  console.log("Extracting changelog...")

  const html = await page.evaluate(() => {
    const content = document.createElement("div")

    // Look for Changelog section
    const h1Sections = document.querySelectorAll("h1")

    for (const h1 of h1Sections) {
      if (
        h1.textContent.toLowerCase().includes("changelog") ||
        h1.textContent.toLowerCase().includes("change log")
      ) {
        content.appendChild(h1.cloneNode(true))

        let currentElement = h1
        while ((currentElement = currentElement.nextElementSibling) !== null) {
          if (currentElement.tagName === "H1") break
          content.appendChild(currentElement.cloneNode(true))
        }
        break
      }
    }

    return content.innerHTML
  })

  const markdown = turndownService.turndown(html)
  return (
    markdown ||
    "# Change Log\n\nAPI version: v2.1.1\n\nPlease refer to the API documentation for the latest changes.\n"
  )
}

/**
 * Main extraction function
 */
const main = async () => {
  console.log("🚀 Starting Deribit general documentation extraction...")
  console.log(`📍 Source: ${BASE_URL}`)
  console.log(`📁 Output: ${OUTPUT_DIR}`)

  const browser = await launchBrowser()

  try {
    const page = await browser.newPage()
    await configurePage(page)

    console.log(`Navigating to ${BASE_URL}...`)
    await page.goto(BASE_URL, { waitUntil: "networkidle0", timeout: 60000 })
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
