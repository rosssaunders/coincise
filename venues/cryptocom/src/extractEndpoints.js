/**
 * Crypto.com Exchange - Endpoint Documentation Extraction
 * Extracts individual endpoint documentation from Crypto.com API docs
 */
"use strict"

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { launchBrowser, configurePage } from "../../shared/puppeteer.js"
import { createTurndownBuilder } from "../../shared/turndown.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BASE_URL =
  "https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#introduction"
const OUTPUT_DIR = path.resolve(__dirname, "../../../docs/cryptocom/endpoints")

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

    // Find all H2 sections that look like endpoint documentation
    const h2Elements = Array.from(document.querySelectorAll("h2"))

    for (const h2 of h2Elements) {
      const h2Text = h2.textContent.trim()

      // Check if this is an endpoint (contains public/ or private/)
      if (h2Text.includes("public/") || h2Text.includes("private/")) {
        const isPublic = h2Text.includes("public/")
        const endpointPath = h2Text

        // Extract content until next H2 or H1
        let content = h2.outerHTML
        let sibling = h2.nextElementSibling

        while (sibling && !["H1", "H2"].includes(sibling.tagName)) {
          content += sibling.outerHTML
          sibling = sibling.nextElementSibling
        }

        // Determine HTTP method by looking at content
        // Default to POST for most endpoints
        let method = "POST"

        // Check if content mentions specific HTTP methods
        const contentLower = content.toLowerCase()
        if (
          contentLower.includes("method: get") ||
          contentLower.includes('"method":"get"')
        ) {
          method = "GET"
        } else if (
          contentLower.includes("method: put") ||
          contentLower.includes('"method":"put"')
        ) {
          method = "PUT"
        } else if (
          contentLower.includes("method: delete") ||
          contentLower.includes('"method":"delete"')
        ) {
          method = "DELETE"
        }

        // Build source URL with anchor
        const anchorId = h2Text
          .toLowerCase()
          .replace(/\//g, "-")
          .replace(/\./g, "-")
        const sourceUrl = `https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#${anchorId}`

        const endpoint = {
          method,
          path: endpointPath,
          operationId: endpointPath,
          sourceUrl,
          content,
          isPublic
        }

        if (isPublic) {
          results.public.push(endpoint)
        } else {
          results.private.push(endpoint)
        }
      }
    }

    return results
  })

  return endpoints
}

/**
 * Process and save endpoint documentation
 */
const processEndpoint = (endpoint, turndownService, isPublic) => {
  const { method, path: endpointPath, content, sourceUrl } = endpoint

  // Convert HTML to Markdown
  let markdown = turndownService.turndown(content)

  // Add metadata section with source URL
  const header = `# ${method} ${endpointPath}\n\n**Source:** [${endpointPath}](${sourceUrl})\n\n## Authentication\n\n${isPublic ? "Not Required (Public Endpoint)" : "Required (Private Endpoint)"}\n\n`

  // Ensure proper header structure
  if (!markdown.startsWith("# ")) {
    markdown = header + markdown
  } else {
    // Replace the first heading with our header
    markdown = header + markdown.substring(markdown.indexOf("\n") + 1)
  }

  // Generate filename
  const filename = generateFilename(method, endpointPath)
  const folder = isPublic ? "public" : "private"
  const filePath = path.join(OUTPUT_DIR, folder, filename)

  // Write file
  writeFile(filePath, markdown)

  return filename
}

/**
 * Main extraction function
 */
const main = async () => {
  console.log("🚀 Starting Crypto.com endpoint documentation extraction...")
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

    // Ensure output directories exist
    ensureDir(path.join(OUTPUT_DIR, "public"))
    ensureDir(path.join(OUTPUT_DIR, "private"))

    // Extract endpoints
    const endpoints = await extractEndpoints(page)

    console.log(
      `\n📊 Found ${endpoints.public.length} public endpoints and ${endpoints.private.length} private endpoints`
    )

    // Process public endpoints
    if (endpoints.public.length > 0) {
      console.log("\n📝 Processing public endpoints...")
      endpoints.public.forEach(endpoint => {
        processEndpoint(endpoint, turndownService, true)
      })
    }

    // Process private endpoints
    if (endpoints.private.length > 0) {
      console.log("\n📝 Processing private endpoints...")
      endpoints.private.forEach(endpoint => {
        processEndpoint(endpoint, turndownService, false)
      })
    }

    const totalEndpoints = endpoints.public.length + endpoints.private.length

    if (totalEndpoints === 0) {
      console.warn(
        "\n⚠️  Warning: No endpoints were extracted. The documentation structure may have changed."
      )
      console.warn("Please review the extraction logic or extract manually.")
    } else {
      console.log(
        `\n✅ Endpoint documentation extraction completed successfully!`
      )
      console.log(`📁 Files written to: ${OUTPUT_DIR}`)
      console.log(`   - Public endpoints: ${endpoints.public.length}`)
      console.log(`   - Private endpoints: ${endpoints.private.length}`)
    }
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
