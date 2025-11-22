/**
 * OKX Exchange - Endpoint Documentation Extraction
 * Extracts individual endpoint documentation from OKX API docs
 */
"use strict"

import fs from "fs"
import path from "path"
import process from "process"
import { fileURLToPath } from "url"
import { launchBrowser, configurePage } from "../../shared/puppeteer.js"
import { createTurndownBuilder } from "../../shared/turndown.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BASE_URL = "https://www.okx.com/docs-v5/en/#overview"
const OUTPUT_DIR = path.resolve(__dirname, "../../../docs/okx/endpoints")

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
const generateFilename = (method, path) => {
  const methodLower = method.toLowerCase()
  const pathPart = sanitizeFilename(path.replace(/^\//, "").replace(/\//g, "_"))
  return `${methodLower}_${pathPart}.md`
}

/**
 * Extract all endpoints from the documentation
 */
const extractEndpoints = async page => {
  console.log("Extracting endpoint information...")

  const endpoints = await page.evaluate(() => {
    const results = {
      public: [],
      private: []
    }

    // OKX uses H3 headings for endpoints
    const h3Elements = document.querySelectorAll("h3")

    h3Elements.forEach(h3 => {
      const text = h3.textContent.trim()
      const id = h3.id

      // Skip if not an endpoint heading (endpoints typically have method in heading)
      const methodMatch = text.match(/^(GET|POST|PUT|DELETE|PATCH)\s+(.+)/i)
      if (!methodMatch) return

      const method = methodMatch[1].toUpperCase()

      // Get content until next H3 or major heading
      let content = h3.outerHTML
      let sibling = h3.nextElementSibling

      while (sibling) {
        if (["H1", "H2", "H3"].includes(sibling.tagName)) {
          break
        }
        content += sibling.outerHTML
        sibling = sibling.nextElementSibling
      }

      // Extract actual API path from HTTP Request section
      let endpointPath = methodMatch[2].trim() // fallback to H3 text
      let currentSibling = h3.nextElementSibling

      while (currentSibling) {
        if (["H1", "H2", "H3"].includes(currentSibling.tagName)) {
          break
        }

        // Look for "HTTP Request" heading (H4)
        if (currentSibling.tagName === "H4" && currentSibling.textContent.includes("HTTP Request")) {
          // The next element should contain the actual path
          const pathElement = currentSibling.nextElementSibling
          if (pathElement && pathElement.tagName === "P") {
            const code = pathElement.querySelector("code")
            if (code) {
              const httpRequestText = code.textContent.trim()
              // Extract path from "GET /api/v5/market/books" format
              const pathMatch = httpRequestText.match(/^(GET|POST|PUT|DELETE|PATCH)\s+(.+)$/i)
              if (pathMatch) {
                endpointPath = pathMatch[2].trim()
              }
            }
          }
          break
        }

        currentSibling = currentSibling.nextElementSibling
      }

      // Remove dark boxes, highlights, and example blockquotes
      const tempDiv = document.createElement("div")
      tempDiv.innerHTML = content

      const darkBoxes = tempDiv.querySelectorAll("div.dark-box")
      darkBoxes.forEach(box => box.remove())

      const highlights = tempDiv.querySelectorAll("div.highlight")
      highlights.forEach(highlight => highlight.remove())

      const blockquotes = tempDiv.querySelectorAll("blockquote")
      blockquotes.forEach(blockquote => {
        const text = blockquote.textContent.trim().toLowerCase()
        if (text.includes("example") || text.includes("format description")) {
          blockquote.remove()
        }
      })

      content = tempDiv.innerHTML

      // Determine if public or private based on authentication requirements
      // Private endpoints typically mention API keys or signatures
      const hasApiKey =
        content.includes("OK-ACCESS-KEY") ||
        content.includes("apiKey") ||
        content.includes("API-KEY")
      const hasSignature =
        content.includes("OK-ACCESS-SIGN") ||
        content.includes("signature") ||
        content.includes("SIGN")
      const hasTimestamp =
        content.includes("OK-ACCESS-TIMESTAMP") ||
        content.includes("timestamp") ||
        content.includes("TIMESTAMP")
      const hasPassphrase =
        content.includes("OK-ACCESS-PASSPHRASE") ||
        content.includes("passphrase") ||
        content.includes("PASSPHRASE")

      const requiresAuth =
        hasApiKey || hasSignature || hasTimestamp || hasPassphrase
      const isPublic = !requiresAuth

      // Build source URL
      const sourceUrl = id ? `https://www.okx.com/docs-v5/en/#${id}` : BASE_URL

      const endpoint = {
        method,
        path: endpointPath,
        operationId: id,
        sourceUrl,
        content,
        isPublic
      }

      if (isPublic) {
        results.public.push(endpoint)
      } else {
        results.private.push(endpoint)
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
  console.log("🚀 Starting OKX endpoint documentation extraction...")
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

    // Extract endpoints
    const endpoints = await extractEndpoints(page)

    console.log(
      `\nFound ${endpoints.public.length} public and ${endpoints.private.length} private endpoints`
    )

    // Ensure output directories exist
    ensureDir(path.join(OUTPUT_DIR, "public"))
    ensureDir(path.join(OUTPUT_DIR, "private"))

    // Write public endpoints
    console.log("\nWriting public endpoints...")
    let publicCount = 0
    for (const endpoint of endpoints.public) {
      const filename = generateFilename(endpoint.method, endpoint.path)
      const filePath = path.join(OUTPUT_DIR, "public", filename)

      const markdown = `# ${endpoint.method} ${endpoint.path}

Source: [${endpoint.sourceUrl}](${endpoint.sourceUrl})

${turndownService.turndown(endpoint.content)}
`

      writeFile(filePath, markdown)
      publicCount++
    }
    console.log(`✅ Wrote ${publicCount} public endpoint files`)

    // Write private endpoints
    console.log("\nWriting private endpoints...")
    let privateCount = 0
    for (const endpoint of endpoints.private) {
      const filename = generateFilename(endpoint.method, endpoint.path)
      const filePath = path.join(OUTPUT_DIR, "private", filename)

      const markdown = `# ${endpoint.method} ${endpoint.path}

Source: [${endpoint.sourceUrl}](${endpoint.sourceUrl})

${turndownService.turndown(endpoint.content)}
`

      writeFile(filePath, markdown)
      privateCount++
    }
    console.log(`✅ Wrote ${privateCount} private endpoint files`)

    console.log(
      "\n✅ Endpoint documentation extraction completed successfully!"
    )
    console.log(`📁 Public endpoints: ${OUTPUT_DIR}/public`)
    console.log(`📁 Private endpoints: ${OUTPUT_DIR}/private`)
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
