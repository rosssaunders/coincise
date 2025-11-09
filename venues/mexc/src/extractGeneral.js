/**
 * MEXC Exchange - General Documentation Extraction
 * Extracts core documentation sections from single-page API docs
 */
"use strict"

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { launchBrowser, configurePage } from "../../shared/puppeteer.js"
import { createTurndownBuilder } from "../../shared/turndown.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BASE_URL = "https://mexcdevelop.github.io/apidocs/spot_v3_en"
const OUTPUT_DIR = path.resolve(__dirname, "../../../docs/mexc")

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
 * Extract a section by H1 title
 */
const extractSectionByTitle = async (page, sectionTitle) => {
  const html = await page.evaluate(title => {
    const contentNode = document.querySelector(".content")
    if (!contentNode) return ""

    const h1Elements = Array.from(contentNode.querySelectorAll("h1"))
    const targetH1 = h1Elements.find(h1 =>
      h1.textContent.trim().toLowerCase().includes(title.toLowerCase())
    )

    if (!targetH1) return ""

    // Collect all content until the next H1
    const content = document.createElement("div")
    let currentNode = targetH1.nextElementSibling

    while (currentNode && currentNode.nodeName !== "H1") {
      content.appendChild(currentNode.cloneNode(true))
      currentNode = currentNode.nextElementSibling
    }

    return content.innerHTML
  }, sectionTitle)

  return html
}

/**
 * Extract Rate Limits documentation
 */
const extractRateLimits = async (page, turndownService) => {
  console.log("Extracting rate limits information...")

  const html = await extractSectionByTitle(page, "General Info")
  if (!html) {
    return "# Rate Limits\n\nNo rate limits documentation found.\n"
  }

  // Extract only the LIMITS section
  const limitsHtml = await page.evaluate(() => {
    const contentNode = document.querySelector(".content")
    if (!contentNode) return ""

    // Find the LIMITS h2 heading
    const h2Elements = Array.from(contentNode.querySelectorAll("h2"))
    const limitsH2 = h2Elements.find(h2 =>
      h2.textContent.trim().toUpperCase().includes("LIMITS")
    )

    if (!limitsH2) return ""

    // Collect content until next h2 or h1
    const content = document.createElement("div")
    let currentNode = limitsH2.nextElementSibling

    while (
      currentNode &&
      currentNode.nodeName !== "H1" &&
      currentNode.nodeName !== "H2"
    ) {
      content.appendChild(currentNode.cloneNode(true))
      currentNode = currentNode.nextElementSibling
    }

    return `<h1>Rate Limits</h1>${content.innerHTML}`
  })

  const markdown = turndownService.turndown(limitsHtml || html)
  return markdown || "# Rate Limits\n\nNo rate limits documentation found.\n"
}

/**
 * Extract Authentication documentation
 */
const extractAuthentication = async (page, turndownService) => {
  console.log("Extracting authentication information...")

  // Extract SIGNED and Header sections from General Info
  const authHtml = await page.evaluate(() => {
    const contentNode = document.querySelector(".content")
    if (!contentNode) return ""

    const content = document.createElement("div")

    // Find Header section
    const h2Elements = Array.from(contentNode.querySelectorAll("h2"))
    const headerH2 = h2Elements.find(h2 =>
      h2.textContent.trim().toUpperCase().includes("HEADER")
    )

    if (headerH2) {
      content.appendChild(document.createElement("h2")).textContent = "Header"
      let currentNode = headerH2.nextElementSibling
      while (
        currentNode &&
        currentNode.nodeName !== "H1" &&
        currentNode.nodeName !== "H2"
      ) {
        content.appendChild(currentNode.cloneNode(true))
        currentNode = currentNode.nextElementSibling
      }
    }

    // Find SIGNED section
    const signedH2 = h2Elements.find(h2 =>
      h2.textContent.trim().toUpperCase().includes("SIGNED")
    )

    if (signedH2) {
      content.appendChild(document.createElement("h2")).textContent = "SIGNED"
      let currentNode = signedH2.nextElementSibling
      while (
        currentNode &&
        currentNode.nodeName !== "H1" &&
        currentNode.nodeName !== "H2"
      ) {
        content.appendChild(currentNode.cloneNode(true))
        currentNode = currentNode.nextElementSibling
      }
    }

    return `<h1>Authentication</h1>${content.innerHTML}`
  })

  const markdown = turndownService.turndown(authHtml)
  return (
    markdown || "# Authentication\n\nNo authentication documentation found.\n"
  )
}

/**
 * Extract Network Connectivity documentation
 */
const extractNetworkConnectivity = async (page, turndownService) => {
  console.log("Extracting network connectivity information...")

  const html = await page.evaluate(() => {
    const contentNode = document.querySelector(".content")
    if (!contentNode) return ""

    const content = document.createElement("div")

    // Find Base endpoint and HTTP Return Codes sections
    const h2Elements = Array.from(contentNode.querySelectorAll("h2"))

    // Get Base endpoint section
    const baseH2 = h2Elements.find(h2 =>
      h2.textContent.trim().toLowerCase().includes("base endpoint")
    )

    if (baseH2) {
      content.appendChild(document.createElement("h2")).textContent =
        "Base Endpoint"
      let currentNode = baseH2.nextElementSibling
      while (
        currentNode &&
        currentNode.nodeName !== "H1" &&
        currentNode.nodeName !== "H2"
      ) {
        content.appendChild(currentNode.cloneNode(true))
        currentNode = currentNode.nextElementSibling
      }
    }

    // Get HTTP Return Codes section
    const httpH2 = h2Elements.find(h2 =>
      h2.textContent.trim().toLowerCase().includes("http return codes")
    )

    if (httpH2) {
      content.appendChild(document.createElement("h2")).textContent =
        "HTTP Return Codes"
      let currentNode = httpH2.nextElementSibling
      while (
        currentNode &&
        currentNode.nodeName !== "H1" &&
        currentNode.nodeName !== "H2"
      ) {
        content.appendChild(currentNode.cloneNode(true))
        currentNode = currentNode.nextElementSibling
      }
    }

    // Get General Information on Endpoints section
    const generalH2 = h2Elements.find(h2 =>
      h2.textContent.trim().toLowerCase().includes("general information")
    )

    if (generalH2) {
      content.appendChild(document.createElement("h2")).textContent =
        "General Information on Endpoints"
      let currentNode = generalH2.nextElementSibling
      while (
        currentNode &&
        currentNode.nodeName !== "H1" &&
        currentNode.nodeName !== "H2"
      ) {
        content.appendChild(currentNode.cloneNode(true))
        currentNode = currentNode.nextElementSibling
      }
    }

    return `<h1>Network Connectivity</h1>${content.innerHTML}`
  })

  const markdown = turndownService.turndown(html)
  return (
    markdown ||
    "# Network Connectivity\n\nNo network connectivity documentation found.\n"
  )
}

/**
 * Extract Error Codes documentation
 */
const extractErrorCodes = async (page, turndownService) => {
  console.log("Extracting error codes information...")

  // MEXC doesn't have a dedicated error codes section in spot docs
  // We'll extract from FAQs or create a placeholder
  const html = await extractSectionByTitle(page, "FAQs")

  if (html) {
    const markdown = turndownService.turndown(html)
    return `# Error Codes\n\n${markdown}`
  }

  return `# Error Codes\n\nFor error codes and troubleshooting, please refer to the HTTP Return Codes section in Network Connectivity documentation.\n\nCommon error codes:\n- HTTP 4XX: Client-side errors (malformed requests)\n- HTTP 403: WAF limit violated\n- HTTP 429: Rate limit exceeded\n- HTTP 5XX: Server-side errors\n`
}

/**
 * Extract Response Formats documentation
 */
const extractResponseFormats = async (page, turndownService) => {
  console.log("Extracting response formats information...")

  // Extract Public API Definitions section
  const html = await extractSectionByTitle(page, "Public API Definitions")

  if (html) {
    const markdown = turndownService.turndown(html)
    return `# Response Formats\n\n${markdown}`
  }

  return "# Response Formats\n\nNo response formats documentation found.\n"
}

/**
 * Extract Change Log documentation
 */
const extractChangeLog = async (page, turndownService) => {
  console.log("Extracting change log information...")

  const html = await extractSectionByTitle(page, "Change Log")

  if (html) {
    const markdown = turndownService.turndown(html)
    return `# Change Log\n\n${markdown}`
  }

  return "# Change Log\n\nNo change log documentation found.\n"
}

/**
 * Main extraction function
 */
const main = async () => {
  console.log("Starting MEXC general documentation extraction...")

  let browser = null
  try {
    // Launch browser and navigate
    browser = await launchBrowser()
    const page = await browser.newPage()
    await configurePage(page)

    console.log(`Navigating to ${BASE_URL}...`)
    await page.goto(BASE_URL, {
      waitUntil: "networkidle2",
      timeout: 60000
    })

    // Wait for content to load
    await page.waitForSelector(".content", { timeout: 30000 })

    // Create turndown service
    const turndownService = createTurndownBuilder().build()

    // Ensure output directory exists
    ensureDir(OUTPUT_DIR)

    // Extract all core documentation
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

    const changeLog = await extractChangeLog(page, turndownService)
    writeFile(path.join(OUTPUT_DIR, "change_log.md"), changeLog)

    console.log("\n✅ General documentation extraction completed successfully!")
  } catch (error) {
    console.error("Error during extraction:", error)
    throw error
  } finally {
    if (browser) {
      await browser.close()
    }
  }
}

// Execute main function if this script is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error("Fatal error:", error)
    process.exit(1)
  })
}

export { main }
