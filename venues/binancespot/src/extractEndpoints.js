/**
 * Binance Spot - Endpoint Documentation Extraction
 * Extracts individual endpoint documentation and saves as separate files
 */
"use strict"

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { JSDOM } from "jsdom"
import { launchBrowser } from "../../shared/puppeteer.js"
import { createTurndownBuilder } from "../../shared/turndown.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BASE_URL = "https://developers.binance.com/docs"
const DOCS_ROOT = path.resolve(__dirname, "../../../docs/binance/spot")

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
 * Sanitize filename by removing special characters
 */
const sanitizeFilename = name => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .replace(/_+/g, "_")
}

/**
 * Generate filename from HTTP method and endpoint path
 */
const generateFilename = (method, endpointPath) => {
  const methodLower = method ? method.toLowerCase() : "endpoint"
  const pathPart = sanitizeFilename(
    endpointPath.replace(/^\//, "").replace(/\//g, "_")
  )
  return `${methodLower}_${pathPart}.md`
}

/**
 * Extract HTTP method and path from code block
 */
const extractMethodAndPath = html => {
  // Look for patterns like "GET /api/v3/ticker"
  const match = html.match(/(GET|POST|PUT|DELETE|PATCH)\s+(\/[^\s\n<>]+)/i)
  if (match) {
    return {
      method: match[1].toUpperCase(),
      path: match[2]
    }
  }
  return null
}

/**
 * Adjust heading levels down by one (h1->h2, h2->h3, etc.)
 */
const adjustHeadingLevels = document => {
  const cleanHeadingContent = element => {
    const anchors = element.querySelectorAll("a")
    for (const anchor of anchors) {
      if (
        anchor.getAttribute("href")?.includes("#") ||
        anchor.classList.contains("hash-link") ||
        anchor.textContent.trim() === "" ||
        anchor.textContent === "\u200B"
      ) {
        anchor.parentNode.removeChild(anchor)
      } else {
        const text = anchor.textContent
        const textNode = document.createTextNode(text)
        anchor.parentNode.replaceChild(textNode, anchor)
      }
    }
    return element.innerHTML
  }

  ;["h5", "h4", "h3", "h2", "h1"].forEach((tag, index) => {
    const nextTag = `h${6 - index}`
    const elements = document.querySelectorAll(tag)
    for (const element of elements) {
      const newElement = document.createElement(nextTag)
      newElement.innerHTML = cleanHeadingContent(element)
      element.parentNode.replaceChild(newElement, element)
    }
  })
}

/**
 * Split page content into individual endpoints based on H4 headings
 */
const splitIntoEndpoints = (html, sourceUrl, isPrivate) => {
  const dom = new JSDOM(html)
  const document = dom.window.document

  const endpoints = []

  // Try H3 first (used on most pages), fallback to H4
  let headingElements = document.querySelectorAll("h3")
  if (headingElements.length === 0) {
    headingElements = document.querySelectorAll("h4")
  }

  // Determine what heading level we're using
  const headingLevel =
    headingElements.length > 0 ? headingElements[0].tagName : "H3"

  for (let i = 0; i < headingElements.length; i++) {
    const heading = headingElements[i]
    const title = heading.textContent.trim()

    // Create a container for this endpoint's content
    const endpointContent = []
    let currentElement = heading.nextElementSibling

    // Collect all content until the next heading of same or higher level
    while (currentElement) {
      const tagName = currentElement.tagName
      // Stop at same heading level or higher (H2 is higher than H3)
      if (tagName === headingLevel || tagName === "H2" || tagName === "H1") {
        break
      }
      endpointContent.push(currentElement.cloneNode(true))
      currentElement = currentElement.nextElementSibling
    }

    if (endpointContent.length > 0) {
      // Create a new document for this endpoint
      const endpointDom = new JSDOM("<!DOCTYPE html><html><body></body></html>")
      const endpointDoc = endpointDom.window.document
      const body = endpointDoc.querySelector("body")

      // Add the title as h1
      const h1 = endpointDoc.createElement("h1")
      h1.textContent = title
      body.appendChild(h1)

      // Add all content
      endpointContent.forEach(el => {
        body.appendChild(endpointDoc.adoptNode(el))
      })

      // Try to extract method and path
      const contentHtml = body.innerHTML
      const methodPath = extractMethodAndPath(contentHtml)

      if (methodPath) {
        endpoints.push({
          title,
          method: methodPath.method,
          path: methodPath.path,
          html: contentHtml,
          isPrivate,
          sourceUrl
        })
      } else {
        // If we can't find method/path, skip this endpoint or use a generic name
        console.log(
          `  Skipping endpoint "${title}" - no HTTP method/path found`
        )
      }
    }
  }

  return endpoints
}

/**
 * Extract endpoints from a specific page
 */
const extractEndpointsFromPage = async (
  page,
  endpoint,
  isPrivate
) => {
  const url = `${BASE_URL}/${endpoint}`
  console.log(`  Extracting from ${url}...`)

  await page.goto(url, {
    waitUntil: "networkidle2",
    timeout: 30000
  })

  const html = await page.evaluate(() => {
    const content = document.querySelector(".theme-doc-markdown.markdown")
    return content ? content.innerHTML : ""
  })

  if (!html) {
    console.log(`  No content found for ${endpoint}`)
    return []
  }

  return splitIntoEndpoints(html, url, isPrivate)
}

/**
 * Process and save endpoints
 */
const processEndpoints = (endpoints, turndownService) => {
  const publicDir = path.join(DOCS_ROOT, "endpoints", "public")
  const privateDir = path.join(DOCS_ROOT, "endpoints", "private")

  ensureDir(publicDir)
  ensureDir(privateDir)

  let publicCount = 0
  let privateCount = 0

  for (const endpoint of endpoints) {
    const outputDir = endpoint.isPrivate ? privateDir : publicDir
    const filename = generateFilename(endpoint.method, endpoint.path)
    const filepath = path.join(outputDir, filename)

    // Create a DOM for adjusting headings
    const dom = new JSDOM(endpoint.html)
    adjustHeadingLevels(dom.window.document)
    const adjustedHtml = dom.serialize()

    // Convert to markdown
    const markdown = turndownService.turndown(adjustedHtml)

    // Add source attribution
    const content = `${markdown}\n\n> Source: [${endpoint.sourceUrl}](${endpoint.sourceUrl})\n`

    writeFile(filepath, content)

    if (endpoint.isPrivate) {
      privateCount++
    } else {
      publicCount++
    }
  }

  console.log(`\n✅ Extracted ${publicCount} public endpoints`)
  console.log(`✅ Extracted ${privateCount} private endpoints`)
}

/**
 * Configure Turndown for HTML to Markdown conversion
 */
const configureTurndown = () => {
  return createTurndownBuilder().withTablesWithoutHeaders().build()
}

/**
 * Main extraction function
 */
const main = async () => {
  console.log("Starting endpoint extraction for Binance Spot...")

  const browser = await launchBrowser()
  const page = await browser.newPage()
  const turndownService = configureTurndown()

  try {
    const allEndpoints = []

    // Public REST endpoints configuration
    const publicRestEndpoints = [
      "binance-spot-api-docs/rest-api/general-endpoints",
      "binance-spot-api-docs/rest-api/market-data-endpoints"
    ]

    // Private REST endpoints configuration
    const privateRestEndpoints = [
      "binance-spot-api-docs/rest-api/trading-endpoints",
      "binance-spot-api-docs/rest-api/account-endpoints"
    ]

    // Public WebSocket endpoints
    const publicWsEndpoints = ["binance-spot-api-docs/web-socket-streams"]

    // Private WebSocket endpoints
    const privateWsEndpoints = ["binance-spot-api-docs/user-data-stream"]

    console.log("\nExtracting public REST endpoints...")
    for (const endpoint of publicRestEndpoints) {
      const endpoints = await extractEndpointsFromPage(
        page,
        endpoint,
        false,
        turndownService
      )
      allEndpoints.push(...endpoints)
    }

    console.log("\nExtracting private REST endpoints...")
    for (const endpoint of privateRestEndpoints) {
      const endpoints = await extractEndpointsFromPage(
        page,
        endpoint,
        true,
        turndownService
      )
      allEndpoints.push(...endpoints)
    }

    console.log("\nExtracting public WebSocket endpoints...")
    for (const endpoint of publicWsEndpoints) {
      const endpoints = await extractEndpointsFromPage(
        page,
        endpoint,
        false,
        turndownService
      )
      allEndpoints.push(...endpoints)
    }

    console.log("\nExtracting private WebSocket endpoints...")
    for (const endpoint of privateWsEndpoints) {
      const endpoints = await extractEndpointsFromPage(
        page,
        endpoint,
        true,
        turndownService
      )
      allEndpoints.push(...endpoints)
    }

    console.log(`\n Total endpoints found: ${allEndpoints.length}`)

    if (allEndpoints.length > 0) {
      console.log("\nProcessing and saving endpoints...")
      processEndpoints(allEndpoints, turndownService)
    } else {
      console.log("\n⚠️  No endpoints were extracted")
    }

    console.log("\n✅ Endpoint extraction completed successfully")
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
