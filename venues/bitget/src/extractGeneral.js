/**
 * Bitget Exchange - General Documentation Extraction
 * Extracts core documentation sections from Bitget API docs
 */
"use strict"

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { launchBrowser } from "../../shared/puppeteer.js"
import { createTurndownBuilder } from "../../shared/turndown.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BASE_URL = "https://www.bitget.com/api-doc"
const OUTPUT_DIR = path.resolve(__dirname, "../../../docs/bitget")

/**
 * Add delay between requests
 */
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Retry function with exponential backoff
 */
async function retryWithBackoff(fn, maxRetries = 3, initialDelay = 5000) {
  let lastError

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error
      if (attempt === maxRetries) {
        throw error
      }

      const delayTime = initialDelay * Math.pow(2, attempt - 1)
      console.log(
        `Attempt ${attempt} failed. Retrying in ${delayTime / 1000} seconds...`
      )
      await delay(delayTime)
    }
  }

  throw lastError
}

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
 * Extract content from a specific page
 */
const extractPageContent = async (page, url, turndownService) => {
  return retryWithBackoff(
    async () => {
      console.log(`Navigating to: ${url}`)

      // Set a standard user agent to avoid blocking
      await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
      )

      await page.goto(url, {
        waitUntil: "networkidle2",
        timeout: 30000
      })

      // Wait for content to load
      await page.waitForSelector("body", { timeout: 15000 })

      // Give the page a moment to fully render
      await delay(2000)

      const html = await page.evaluate(() => {
        const selectors = [
          ".theme-doc-markdown.markdown",
          "main",
          ".content",
          ".documentation",
          ".doc-content",
          ".main-content",
          "#content",
          "article",
          ".article-content"
        ]

        for (const selector of selectors) {
          const element = document.querySelector(selector)
          if (element && element.innerHTML.trim()) {
            // Clone the element to avoid modifying the DOM
            const clone = element.cloneNode(true)

            // Remove unwanted elements
            const unwanted = clone.querySelectorAll(
              'button, .copy-button, [class*="copy"]'
            )
            unwanted.forEach(el => el.remove())

            return clone.innerHTML
          }
        }

        return document.body.innerHTML
      })

      if (!html || html.trim() === "") {
        throw new Error(`No content found on ${url}`)
      }

      // Clean up the HTML content
      let cleanHtml = html.replace(/(Copy Success|Copy to Clipboard)/gi, "")

      // Convert to markdown
      let markdown = turndownService.turndown(cleanHtml)

      // Add source URL
      markdown += `\n\n> **Source:** ${url}\n`

      console.log(`Successfully scraped content from: ${url}`)

      return markdown
    },
    3,
    5000
  )
}

/**
 * Extract Network Connectivity documentation
 */
const extractNetworkConnectivity = async (page, turndownService) => {
  console.log("Extracting network connectivity information...")

  const urls = [`${BASE_URL}/common/intro`, `${BASE_URL}/common/domain`]

  let content = "# Network Connectivity\n\n"

  for (const url of urls) {
    const pageContent = await extractPageContent(page, url, turndownService)
    content += pageContent + "\n\n---\n\n"
  }

  return content
}

/**
 * Extract Authentication documentation
 */
const extractAuthentication = async (page, turndownService) => {
  console.log("Extracting authentication information...")

  const urls = [
    `${BASE_URL}/common/quick-start`,
    `${BASE_URL}/common/signature`
  ]

  let content = "# Authentication\n\n"

  for (const url of urls) {
    const pageContent = await extractPageContent(page, url, turndownService)
    content += pageContent + "\n\n---\n\n"
  }

  return content
}

/**
 * Extract Rate Limits documentation
 */
const extractRateLimits = async (page, turndownService) => {
  console.log("Extracting rate limits...")

  return retryWithBackoff(
    async () => {
      // Rate limits are mentioned in quick-start
      const url = `${BASE_URL}/common/quick-start`

      // Set a standard user agent to avoid blocking
      await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
      )

      await page.goto(url, {
        waitUntil: "networkidle2",
        timeout: 30000
      })

      await page.waitForSelector("body", { timeout: 15000 })

      // Give the page a moment to fully render
      await delay(2000)

      const html = await page.evaluate(() => {
        const content = document.createElement("div")

        // Find the Access Restriction section
        const headings = Array.from(
          document.querySelectorAll("h1, h2, h3, p, ul, li")
        )
        let capturing = false

        for (const element of headings) {
          if (
            (element.tagName === "H2" || element.tagName === "H3") &&
            element.textContent.includes("Access Restriction")
          ) {
            capturing = true
            content.appendChild(element.cloneNode(true))
            continue
          }

          if (
            capturing &&
            (element.tagName === "H1" || element.tagName === "H2")
          ) {
            break
          }

          if (capturing) {
            content.appendChild(element.cloneNode(true))
          }
        }

        return content.innerHTML
      })

      let markdown = turndownService.turndown(html)

      if (!markdown || markdown.trim().length < 50) {
        markdown =
          "# Rate Limits\n\n" +
          "The rate limit of interfaces is based on UID or IP. Rate limits are specified on each individual endpoint.\n\n" +
          "General rules:\n" +
          "- The overall rate limit is 6000/IP/Min\n" +
          "- Each API endpoint has its own rate limit marked on the doc page\n" +
          "- Rate limits are calculated independently for each endpoint\n" +
          "- Rest API will return 429 status when the access exceeds the frequency limit\n\n"
      } else {
        markdown = "# Rate Limits\n\n" + markdown
      }

      markdown += `\n\n> **Source:** ${url}\n`

      return markdown
    },
    3,
    5000
  )
}

/**
 * Extract Error Codes documentation
 */
const extractErrorCodes = async (page, turndownService) => {
  console.log("Extracting error codes...")

  // Error codes are typically in spot/future documentation
  const urls = [
    `${BASE_URL}/spot/error-code/restapi`,
    `${BASE_URL}/contract/error-code`
  ]

  let content = "# Error Codes\n\n"

  for (const url of urls) {
    try {
      const pageContent = await extractPageContent(page, url, turndownService)
      content += pageContent + "\n\n---\n\n"
    } catch (error) {
      console.log(`Could not extract from ${url}: ${error.message}`)
    }
  }

  // If no content was extracted, provide a default
  if (content.trim() === "# Error Codes") {
    content =
      "# Error Codes\n\n" +
      "Error codes are returned in the response body when an API call fails.\n\n" +
      "Please refer to individual endpoint documentation for specific error codes.\n\n"
  }

  return content
}

/**
 * Extract Response Formats documentation
 */
const extractResponseFormats = async (page, turndownService) => {
  console.log("Extracting response formats...")

  return retryWithBackoff(
    async () => {
      const url = `${BASE_URL}/common/intro`

      // Set a standard user agent to avoid blocking
      await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
      )

      await page.goto(url, {
        waitUntil: "networkidle2",
        timeout: 30000
      })

      await page.waitForSelector("body", { timeout: 15000 })

      // Give the page a moment to fully render
      await delay(2000)

      const html = await page.evaluate(() => {
        const content = document.createElement("div")

        // Look for response format related content
        const elements = Array.from(
          document.querySelectorAll("h1, h2, h3, p, pre, code")
        )

        for (const element of elements) {
          if (
            element.textContent.toLowerCase().includes("response") ||
            element.textContent.toLowerCase().includes("format")
          ) {
            content.appendChild(element.cloneNode(true))
          }
        }

        return content.innerHTML
      })

      let markdown = turndownService.turndown(html)

      if (!markdown || markdown.trim().length < 50) {
        markdown =
          "# Response Formats\n\n" +
          "All API responses follow a standard JSON format:\n\n" +
          "```json\n" +
          "{\n" +
          '  "code": "00000",\n' +
          '  "msg": "success",\n' +
          '  "requestTime": 1688008631614,\n' +
          '  "data": { ... }\n' +
          "}\n" +
          "```\n\n" +
          "- `code`: Response code (00000 indicates success)\n" +
          "- `msg`: Response message\n" +
          "- `requestTime`: Server timestamp\n" +
          "- `data`: Response data payload\n\n"
      } else {
        markdown = "# Response Formats\n\n" + markdown
      }

      markdown += `\n\n> **Source:** ${url}\n`

      return markdown
    },
    3,
    5000
  )
}

/**
 * Extract Change Log documentation
 */
const extractChangeLog = async (page, turndownService) => {
  console.log("Extracting change log...")

  const url = `${BASE_URL}/common/changelog`

  try {
    const markdown = await extractPageContent(page, url, turndownService)
    return markdown
  } catch (error) {
    console.log(`Could not extract changelog: ${error.message}`)
    return (
      "# Change Log\n\n" +
      "API version history and breaking changes are tracked by Bitget.\n\n" +
      "Please visit the official documentation for the latest updates.\n\n" +
      `> **Source:** ${url}\n`
    )
  }
}

/**
 * Main extraction function
 */
const main = async () => {
  console.log("Starting general documentation extraction for Bitget...")

  const browser = await launchBrowser()

  try {
    const page = await browser.newPage()

    const turndownService = createTurndownBuilder().build()

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

    const changeLog = await extractChangeLog(page, turndownService)
    writeFile(path.join(OUTPUT_DIR, "change_log.md"), changeLog)

    console.log("✅ General documentation extraction completed successfully")
  } catch (error) {
    console.error("Error during extraction:", error)
    throw error
  } finally {
    await browser.close()
  }
}

// Standard entry point
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error("Extraction failed:", error)
    console.error("Stack trace:", error.stack)
    process.exit(1)
  })
}

export { main }
