/**
 * DigiFinex Exchange - General Documentation Extraction
 * Extracts core documentation sections from DigiFinex API docs
 */
"use strict"

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { launchBrowser, configurePage } from "../../shared/puppeteer.js"
import { createTurndownBuilder } from "../../shared/turndown.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BASE_URL = "https://docs.digifinex.com/en-ww/spot/v3/rest.html"
const OUTPUT_DIR = path.resolve(__dirname, "../../../docs/digifinex")

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
  console.log(`Writing ${path.basename(filePath)}...`)
  fs.writeFileSync(filePath, content, "utf8")
  console.log(`✅ Written ${path.basename(filePath)}`)
}

/**
 * Extract content between two header IDs
 */
const extractSectionById = async (page, startId, endId, turndownService) => {
  const html = await page.evaluate(
    (start, end) => {
      const startElement = document.getElementById(start)
      if (!startElement) return ""

      const content = document.createElement("div")
      let currentElement = startElement

      // Add the start element
      content.appendChild(currentElement.cloneNode(true))

      // Collect all elements until we hit the end ID or another H1
      currentElement = currentElement.nextElementSibling
      while (currentElement) {
        // Stop if we hit the end ID
        if (end && currentElement.id === end) {
          break
        }

        // Stop if we hit another H1 (except if it's the start element)
        if (
          currentElement.tagName === "H1" &&
          currentElement.id !== start &&
          !end
        ) {
          break
        }

        content.appendChild(currentElement.cloneNode(true))
        currentElement = currentElement.nextElementSibling
      }

      return content.innerHTML
    },
    startId,
    endId
  )

  return turndownService.turndown(html)
}

/**
 * Extract Network Connectivity information
 */
const extractNetworkConnectivity = async (page, turndownService) => {
  console.log("Extracting network connectivity information...")

  // Extract Address section
  const addressContent = await extractSectionById(
    page,
    "address",
    "signature-authentication-amp-verification",
    turndownService
  )

  return `# Network Connectivity\n\n${addressContent}`
}

/**
 * Extract Authentication documentation
 */
const extractAuthentication = async (page, turndownService) => {
  console.log("Extracting authentication information...")

  // Extract Signature Authentication section
  const signatureContent = await extractSectionById(
    page,
    "signature-authentication-amp-verification",
    "authentication",
    turndownService
  )

  // Extract Authentication section
  const authContent = await extractSectionById(
    page,
    "authentication",
    "error-codes",
    turndownService
  )

  return `# Authentication\n\n${signatureContent}\n\n${authContent}`
}

/**
 * Extract Rate Limits documentation
 */
const extractRateLimits = async (page, turndownService) => {
  console.log("Extracting rate limits information...")

  // Extract Trading Rules section which contains rate limiting info
  const tradingRulesContent = await extractSectionById(
    page,
    "digifinex-api-trading-rules",
    "trading-interface-list",
    turndownService
  )

  return `# Rate Limits\n\n${tradingRulesContent}`
}

/**
 * Extract Error Codes documentation
 */
const extractErrorCodes = async (page, turndownService) => {
  console.log("Extracting error codes information...")

  const errorCodesContent = await extractSectionById(
    page,
    "error-codes",
    "common",
    turndownService
  )

  return `# Error Codes\n\n${errorCodesContent}`
}

/**
 * Extract Response Formats documentation
 */
const extractResponseFormats = async () => {
  console.log("Extracting response formats information...")

  // DigiFinex doesn't have a dedicated response format section
  // We'll create a basic one from the structure we see
  const content = `# Response Formats

All API responses from DigiFinex follow a consistent JSON format.

## Successful Response

All successful responses include:
- \`code\`: Status code (0 for success)
- Data fields specific to the endpoint

Example:
\`\`\`json
{
  "code": 0,
  "data": {}
}
\`\`\`

## Error Response

Error responses include:
- \`code\`: Non-zero error code
- \`msg\`: Error message description

Example:
\`\`\`json
{
  "code": 10001,
  "msg": "Error description"
}
\`\`\`

For detailed error codes, see the Error Codes documentation.
`

  return content
}

/**
 * Extract Change Log - DigiFinex doesn't have a changelog section
 */
const extractChangeLog = async () => {
  console.log("Creating placeholder for change log...")
  return `# Change Log

DigiFinex does not maintain a public changelog in their API documentation.

Please refer to their official documentation for any updates:
${BASE_URL}
`
}

/**
 * Main extraction function
 */
const main = async () => {
  console.log("🚀 Starting DigiFinex general documentation extraction...")
  console.log(`📍 Source: ${BASE_URL}`)
  console.log(`📁 Output: ${OUTPUT_DIR}`)

  const browser = await launchBrowser()

  try {
    const page = await browser.newPage()
    await configurePage(page)

    console.log(`Navigating to ${BASE_URL}...`)
    await page.goto(BASE_URL, { waitUntil: "networkidle2", timeout: 30000 })
    console.log("✅ Page loaded")

    // Wait for content to render
    await page.waitForSelector("h1", { timeout: 10000 })
    await new Promise(resolve => setTimeout(resolve, 2000))

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

    const changelog = await extractChangeLog()
    writeFile(path.join(OUTPUT_DIR, "change_log.md"), changelog)

    console.log("\n✅ General documentation extraction completed successfully!")
    console.log(`📁 Files written to: ${OUTPUT_DIR}`)
  } catch (error) {
    console.error("❌ Error during extraction:", error)
    console.error("Stack trace:", error.stack)
    process.exit(1)
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
