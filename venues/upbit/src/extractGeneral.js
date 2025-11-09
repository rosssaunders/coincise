/**
 * Upbit Exchange - General Documentation Extraction
 * Extracts core documentation sections from Upbit API docs
 */
"use strict"

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { launchBrowser, configurePage } from "../../shared/puppeteer.js"
import { createTurndownBuilder } from "../../shared/turndown.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BASE_URL = "https://global-docs.upbit.com"
const OUTPUT_DIR = path.resolve(__dirname, "../../../docs/upbit")

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
 * Extract content from a page
 */
const extractPageContent = async (page, url, turndownService) => {
  console.log(`Navigating to ${url}...`)
  await page.goto(url, {
    waitUntil: "networkidle2",
    timeout: 30000
  })

  // Wait for content to load
  await page.waitForSelector('main, [role="main"], .main-content', {
    timeout: 10000
  })

  // Add a delay for dynamic content
  await new Promise(resolve => setTimeout(resolve, 2000))

  const html = await page.evaluate(() => {
    const mainElement =
      document.querySelector("main") ||
      document.querySelector('[role="main"]') ||
      document.querySelector(".main-content") ||
      document.body

    const clonedElement = mainElement.cloneNode(true)

    // Remove unwanted elements
    const elementsToRemove = clonedElement.querySelectorAll(
      [
        "nav",
        "header",
        ".navigation",
        ".nav",
        ".header",
        ".sidebar",
        ".footer",
        ".breadcrumb",
        ".toc",
        ".table-of-contents",
        ".menu",
        ".search",
        ".search-box",
        '[class*="nav"]',
        '[class*="menu"]',
        '[class*="sidebar"]',
        "script",
        "style",
        "noscript"
      ].join(", ")
    )

    elementsToRemove.forEach(el => el.remove())

    // Remove navigation lists
    const lists = clonedElement.querySelectorAll("ul, ol")
    lists.forEach(list => {
      const links = list.querySelectorAll("a")
      const listItems = list.querySelectorAll("li")
      if (links.length > 5 && links.length / listItems.length > 0.7) {
        list.remove()
      }
    })

    return clonedElement.innerHTML
  })

  return turndownService.turndown(html)
}

/**
 * Extract Rate Limits documentation
 */
const extractRateLimits = async (page, turndownService) => {
  console.log("Extracting rate limits information...")

  try {
    // Upbit has rate limit information in the docs section
    const url = `${BASE_URL}/docs/rate-limiting`
    const content = await extractPageContent(page, url, turndownService)
    return (
      content ||
      "# Rate Limits\n\nPlease refer to the API documentation for rate limiting details.\n"
    )
  } catch (error) {
    console.log(`Note: Could not extract rate limits: ${error.message}`)
    return "# Rate Limits\n\nPlease refer to the API documentation for rate limiting details.\n"
  }
}

/**
 * Extract Authentication documentation
 */
const extractAuthentication = async (page, turndownService) => {
  console.log("Extracting authentication information...")

  try {
    // Extract REST API authentication
    const restAuthUrl = `${BASE_URL}/docs/authorization`
    const restAuthContent = await extractPageContent(
      page,
      restAuthUrl,
      turndownService
    )

    // Also extract WebSocket authentication which has additional details
    const wsAuthUrl = `${BASE_URL}/docs/authentication`
    const wsAuthContent = await extractPageContent(
      page,
      wsAuthUrl,
      turndownService
    )

    return (
      "# Authentication\n\n" +
      "## REST API Authentication\n\n" +
      restAuthContent +
      "\n\n## WebSocket Authentication\n\n" +
      wsAuthContent
    )
  } catch (error) {
    console.log(`Note: Could not extract full authentication: ${error.message}`)
    return "# Authentication\n\nPlease refer to the API documentation for authentication details.\n"
  }
}

/**
 * Extract Network Connectivity documentation
 */
const extractNetworkConnectivity = async (page, turndownService) => {
  console.log("Extracting network connectivity information...")

  try {
    // Extract general information about the API
    const generalUrl = `${BASE_URL}/docs/general-information`
    const content = await extractPageContent(page, generalUrl, turndownService)

    return (
      "# Network Connectivity\n\n" +
      "**Base URL:** https://api.upbit.com\n\n" +
      "**WebSocket URL:** wss://api.upbit.com/websocket/v1\n\n" +
      content
    )
  } catch (error) {
    console.log(
      `Note: Could not extract network connectivity: ${error.message}`
    )
    return (
      "# Network Connectivity\n\n" +
      "**Base URL:** https://api.upbit.com\n\n" +
      "**WebSocket URL:** wss://api.upbit.com/websocket/v1\n\n" +
      "Please refer to the API documentation for detailed connectivity information.\n"
    )
  }
}

/**
 * Extract Error Codes documentation
 */
const extractErrorCodes = async (page, turndownService) => {
  console.log("Extracting error codes information...")

  try {
    // Extract REST API error codes
    const restErrorUrl = `${BASE_URL}/docs/error-codes`
    const restContent = await extractPageContent(
      page,
      restErrorUrl,
      turndownService
    )

    // Also extract WebSocket errors
    const wsErrorUrl = `${BASE_URL}/docs/websocket-error`
    const wsContent = await extractPageContent(
      page,
      wsErrorUrl,
      turndownService
    )

    return (
      "# Error Codes\n\n" +
      "## REST API Error Codes\n\n" +
      restContent +
      "\n\n## WebSocket Error Codes\n\n" +
      wsContent
    )
  } catch (error) {
    console.log(`Note: Could not extract error codes: ${error.message}`)
    return "# Error Codes\n\nPlease refer to the API documentation for error code details.\n"
  }
}

/**
 * Extract Response Formats documentation
 */
const extractResponseFormats = async (page, turndownService) => {
  console.log("Extracting response formats information...")

  try {
    // Extract request/response format information
    const formatUrl = `${BASE_URL}/docs/request-format`
    const content = await extractPageContent(page, formatUrl, turndownService)

    return "# Response Formats\n\n" + content
  } catch (error) {
    console.log(`Note: Could not extract response formats: ${error.message}`)
    return "# Response Formats\n\nPlease refer to the API documentation for response format details.\n"
  }
}

/**
 * Extract Change Log documentation
 */
const extractChangeLog = async (page, turndownService) => {
  console.log("Extracting change log information...")

  try {
    const changelogUrl = `${BASE_URL}/changelog`
    const content = await extractPageContent(
      page,
      changelogUrl,
      turndownService
    )
    return "# Change Log\n\n" + content
  } catch (error) {
    console.log(`Note: Could not extract change log: ${error.message}`)
    return "# Change Log\n\nPlease refer to the API documentation for change log details.\n"
  }
}

/**
 * Main extraction function
 */
const main = async () => {
  console.log("Starting general documentation extraction for Upbit...")

  const browser = await launchBrowser()
  const page = await browser.newPage()
  await configurePage(page)

  const turndownService = createTurndownBuilder().build()

  try {
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

    const changeLog = await extractChangeLog(page, turndownService)
    writeFile(path.join(OUTPUT_DIR, "change_log.md"), changeLog)

    console.log("✅ General documentation extraction completed successfully")
  } catch (error) {
    console.error("Error during general documentation extraction:", error)
    throw error
  } finally {
    await browser.close()
  }
}

// Standard entry point with error handling
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error("Fatal error:", error)
    console.error(error.stack)
    process.exit(1)
  })
}

export { main }
