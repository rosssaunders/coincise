/**
 * Coinbase Exchange - General Documentation Extraction
 * Extracts core documentation files like rate limits, authentication, etc.
 */
"use strict"

import { launchBrowser, configurePage } from "../../../shared/puppeteer.js"
import { createTurndownBuilder } from "../../../shared/turndown.js"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BASE_URL = "https://docs.cdp.coinbase.com/exchange"
const OUTPUT_DIR = path.join(__dirname, "../../../../docs/coinbase")

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
 * Extract content from #content div and convert to markdown
 */
const extractContent = async (page, turndownService, url) => {
  await page.goto(url, {
    waitUntil: "networkidle2",
    timeout: 90000
  })

  await page.waitForSelector("#content", { timeout: 90000 })

  const html = await page.evaluate(() => {
    const content = document.querySelector("#content")
    return content ? content.innerHTML : ""
  })

  const markdown = turndownService.turndown(html)
  return markdown
}

/**
 * Extract authentication documentation
 */
const extractAuthentication = async (page, turndownService) => {
  console.log("  Extracting authentication documentation...")
  const url = `${BASE_URL}/rest-api/authentication`
  return await extractContent(page, turndownService, url)
}

/**
 * Extract rate limits documentation
 */
const extractRateLimits = async (page, turndownService) => {
  console.log("  Extracting rate limits documentation...")
  const url = `${BASE_URL}/rest-api/rate-limits`
  return await extractContent(page, turndownService, url)
}

/**
 * Extract network connectivity documentation
 */
const extractNetworkConnectivity = async (page, turndownService) => {
  console.log("  Extracting network connectivity documentation...")
  const url = `${BASE_URL}/rest-api/requests`
  return await extractContent(page, turndownService, url)
}

/**
 * Extract error codes documentation
 */
const extractErrorCodes = async (page, turndownService) => {
  console.log("  Extracting error codes documentation...")
  // Coinbase doesn't have a dedicated error codes page, extract from welcome
  const url = `${BASE_URL}/introduction/welcome`
  const fullContent = await extractContent(page, turndownService, url)

  // Extract only the errors section
  const lines = fullContent.split("\n")
  const startIdx = lines.findIndex(
    line => line.includes("Errors") || line.includes("Error Codes")
  )
  const endIdx = lines.findIndex(
    (line, idx) => idx > startIdx && line.startsWith("##")
  )

  if (startIdx !== -1 && endIdx !== -1) {
    return lines.slice(startIdx, endIdx).join("\n")
  } else if (startIdx !== -1) {
    return lines.slice(startIdx).join("\n")
  }

  return "# Error Codes\n\nSee the API documentation for error code information."
}

/**
 * Extract response formats documentation
 */
const extractResponseFormats = async (page, turndownService) => {
  console.log("  Extracting response formats documentation...")
  const url = `${BASE_URL}/rest-api/types`
  return await extractContent(page, turndownService, url)
}

/**
 * Extract change log documentation
 */
const extractChangeLog = async (page, turndownService) => {
  console.log("  Extracting change log documentation...")
  // Try to find a changelog page, otherwise return placeholder
  try {
    const url = `${BASE_URL}/docs/changelog`
    return await extractContent(page, turndownService, url)
  } catch (error) {
    console.log("    No dedicated changelog found, using placeholder")
    return "# Change Log\n\nSee the main Coinbase Exchange documentation for version history and updates."
  }
}

/**
 * Main extraction function
 */
const main = async () => {
  console.log(
    "Starting general documentation extraction for Coinbase Exchange..."
  )

  const browser = await launchBrowser()
  const page = await browser.newPage()
  await configurePage(page)

  // Set longer timeouts for Coinbase
  await page.setDefaultNavigationTimeout(90000)
  await page.setDefaultTimeout(90000)

  const turndownBuilder = createTurndownBuilder()
  const turndownService = turndownBuilder.build()

  try {
    await ensureDir(OUTPUT_DIR)

    // Extract authentication
    const authentication = await extractAuthentication(page, turndownService)
    await writeFile(path.join(OUTPUT_DIR, "authentication.md"), authentication)

    // Extract rate limits
    const rateLimits = await extractRateLimits(page, turndownService)
    await writeFile(path.join(OUTPUT_DIR, "rate_limits.md"), rateLimits)

    // Extract network connectivity
    const networkConnectivity = await extractNetworkConnectivity(
      page,
      turndownService
    )
    await writeFile(
      path.join(OUTPUT_DIR, "network_connectivity.md"),
      networkConnectivity
    )

    // Extract error codes
    const errorCodes = await extractErrorCodes(page, turndownService)
    await writeFile(path.join(OUTPUT_DIR, "error_codes.md"), errorCodes)

    // Extract response formats
    const responseFormats = await extractResponseFormats(page, turndownService)
    await writeFile(
      path.join(OUTPUT_DIR, "response_formats.md"),
      responseFormats
    )

    // Extract change log
    const changeLog = await extractChangeLog(page, turndownService)
    await writeFile(path.join(OUTPUT_DIR, "change_log.md"), changeLog)

    console.log("✅ General documentation extraction completed successfully")
  } finally {
    await browser.close()
  }
}

// Standard entry point
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error("Unhandled error in main:", error)
    console.error("Stack trace:", error.stack)
    process.exit(1)
  })
}

export { main }
