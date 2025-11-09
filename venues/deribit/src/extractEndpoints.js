/**
 * Deribit Exchange - Endpoint Documentation Extraction
 * Extracts individual endpoint documentation files
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
const OUTPUT_DIR = path.resolve(__dirname, "../../../docs/deribit/endpoints")

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
  fs.writeFileSync(filePath, content, "utf8")
}

/**
 * Convert endpoint path to filename
 * e.g., /public/get_time -> get_get_time.md
 * e.g., /private/buy -> post_buy.md
 */
const endpointToFilename = endpointPath => {
  // Remove leading slash and split
  const parts = endpointPath.replace(/^\//, "").split("/")

  // For JSON-RPC endpoints, determine method based on endpoint type
  // Most endpoints are GET-like (retrieve data) but some are POST-like (modify data)
  const endpointName = parts[1]

  // Determine HTTP method based on endpoint name patterns
  const postPatterns = [
    "buy",
    "sell",
    "edit",
    "cancel",
    "close",
    "set",
    "enable",
    "disable",
    "subscribe",
    "unsubscribe"
  ]
  const isPost = postPatterns.some(pattern => endpointName.startsWith(pattern))
  const method = isPost ? "post" : "get"

  return `${method}_${endpointName}.md`
}

/**
 * Extract all endpoints from the page
 */
const extractEndpoints = async (page) => {
  console.log("Extracting endpoints...")

  const endpoints = await page.evaluate(() => {
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

    const results = { public: [], private: [] }

    // Find all H2 elements that represent endpoints
    const h2Elements = document.querySelectorAll("h2")

    h2Elements.forEach(h2 => {
      const endpointText = h2.textContent.trim()

      // Check if this is an endpoint (starts with /public/ or /private/)
      if (
        endpointText.startsWith("/public/") ||
        endpointText.startsWith("/private/")
      ) {
        const isPublic = endpointText.startsWith("/public/")

        // Extract the content for this endpoint
        const content = document.createElement("div")
        content.appendChild(h2.cloneNode(true))

        let currentElement = h2
        while ((currentElement = currentElement.nextElementSibling) !== null) {
          // Stop at next H1 or H2
          if (
            currentElement.tagName === "H1" ||
            currentElement.tagName === "H2"
          ) {
            break
          }
          content.appendChild(currentElement.cloneNode(true))
        }

        const endpoint = {
          path: endpointText,
          content: content.innerHTML,
          isPublic
        }

        if (isPublic) {
          results.public.push(endpoint)
        } else {
          results.private.push(endpoint)
        }
      }
    })

    return results
  })

  return endpoints
}

/**
 * Main extraction function
 */
const main = async () => {
  console.log("🚀 Starting Deribit endpoint documentation extraction...")
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

    // Ensure output directories exist
    ensureDir(path.join(OUTPUT_DIR, "public"))
    ensureDir(path.join(OUTPUT_DIR, "private"))

    // Extract all endpoints
    const endpoints = await extractEndpoints(page, turndownService)

    console.log(`\n📊 Found ${endpoints.public.length} public endpoints`)
    console.log(`📊 Found ${endpoints.private.length} private endpoints`)

    // Write public endpoints
    console.log("\n📝 Writing public endpoint files...")
    endpoints.public.forEach(endpoint => {
      const markdown = turndownService.turndown(endpoint.content)
      const filename = endpointToFilename(endpoint.path)
      const filepath = path.join(OUTPUT_DIR, "public", filename)
      writeFile(filepath, markdown)
    })
    console.log(`✅ Written ${endpoints.public.length} public endpoint files`)

    // Write private endpoints
    console.log("\n📝 Writing private endpoint files...")
    endpoints.private.forEach(endpoint => {
      const markdown = turndownService.turndown(endpoint.content)
      const filename = endpointToFilename(endpoint.path)
      const filepath = path.join(OUTPUT_DIR, "private", filename)
      writeFile(filepath, markdown)
    })
    console.log(`✅ Written ${endpoints.private.length} private endpoint files`)

    console.log(
      "\n✅ Endpoint documentation extraction completed successfully!"
    )
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
