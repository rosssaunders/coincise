/**
 * DigiFinex Exchange - Endpoint Documentation Extraction
 * Extracts individual endpoint documentation
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
const OUTPUT_DIR = path.resolve(__dirname, "../../../docs/digifinex/endpoints")

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
const extractEndpoints = async (page) => {
  console.log("Extracting endpoint information...")

  const endpoints = await page.evaluate(baseUrl => {
    const results = {
      public: [],
      private: []
    }

    // Find all H2 elements that represent endpoints
    const h2Elements = Array.from(document.querySelectorAll("h2"))

    // Skip non-endpoint sections
    const skipSections = [
      "api introduction",
      "market making program",
      "contact us",
      "digifinex api trading rules",
      "trading interface list",
      "address",
      "signature authentication",
      "authentication",
      "error codes"
    ]

    h2Elements.forEach(h2 => {
      const title = h2.textContent.trim().toLowerCase()

      // Skip general documentation sections
      if (skipSections.some(skip => title.includes(skip))) {
        return
      }

      // Check if this is an endpoint section by looking for HTTP Request in the following elements
      let currentElement = h2.nextElementSibling
      let hasHttpRequest = false
      let method = ""
      let endpointPath = ""
      let content = h2.outerHTML

      // Collect content until the next H1 or H2
      while (currentElement && !["H1", "H2"].includes(currentElement.tagName)) {
        content += currentElement.outerHTML

        // Look for HTTP Request section
        if (
          currentElement.tagName === "H3" &&
          currentElement.textContent.toLowerCase().includes("http request")
        ) {
          hasHttpRequest = true

          // Try to find the method and path in the next elements
          let nextEl = currentElement.nextElementSibling
          while (nextEl && nextEl.tagName !== "H3") {
            // Look for text like "GET https://..." or "POST https://..."
            const text = nextEl.textContent
            const methodMatch = text.match(
              /(GET|POST|PUT|DELETE|PATCH)\s+`?(https?:\/\/[^\s`]+)`?/i
            )
            if (methodMatch) {
              method = methodMatch[1].toUpperCase()
              const fullUrl = methodMatch[2]
              // Extract just the path part
              try {
                const url = new URL(fullUrl)
                endpointPath = url.pathname
              } catch {
                endpointPath = fullUrl.split(".com")[1] || fullUrl
              }
              break
            }

            // Also check for code blocks
            if (nextEl.tagName === "PRE") {
              const codeText = nextEl.textContent
              const methodMatch = codeText.match(
                /(GET|POST|PUT|DELETE|PATCH)\s+`?(https?:\/\/[^\s`]+)`?/i
              )
              if (methodMatch) {
                method = methodMatch[1].toUpperCase()
                const fullUrl = methodMatch[2]
                try {
                  const url = new URL(fullUrl)
                  endpointPath = url.pathname
                } catch {
                  endpointPath = fullUrl.split(".com")[1] || fullUrl
                }
                break
              }
            }

            nextEl = nextEl.nextElementSibling
          }
        }

        currentElement = currentElement.nextElementSibling
      }

      // If we found an HTTP request section, create an endpoint entry
      if (hasHttpRequest && method && endpointPath) {
        // Determine if public or private based on authentication requirements and endpoint characteristics
        const contentLower = content.toLowerCase()
        const titleLower = title.toLowerCase()

        // Check for explicit authentication headers
        const hasAccessKey =
          contentLower.includes("access-key") ||
          contentLower.includes("access_key") ||
          contentLower.includes("accesskey")
        const hasSignature =
          contentLower.includes("signature") ||
          contentLower.includes("sign-type")
        const hasTimestamp = contentLower.includes("access-timestamp")

        // Keywords that indicate private endpoints (account/trading operations)
        const privateKeywords = [
          "assets",
          "balance",
          "financelog",
          "myorder",
          "mytrade",
          "order_new",
          "order_cancel",
          "order_current",
          "order_history",
          "order_detail",
          "transfer",
          "position",
          "withdraw",
          "deposit"
        ]

        // Keywords that indicate public endpoints (market data)
        const publicKeywords = [
          "ping",
          "time",
          "timestamp",
          "market",
          "ticker",
          "orderbook",
          "order_book",
          "depth",
          "kline",
          "candle",
          "symbol",
          "currencies",
          "common",
          "trades" // Public recent trades, not mytrades
        ]

        // Check if endpoint path or title contains private keywords
        const hasPrivateKeywords = privateKeywords.some(
          keyword =>
            titleLower.includes(keyword) || endpointPath.includes(keyword)
        )

        // Check if it's explicitly a public endpoint
        const hasPublicKeywords = publicKeywords.some(
          keyword =>
            titleLower.includes(keyword) || endpointPath.includes(keyword)
        )

        // Additional check: endpoints with "order" but not public market "orderbook"
        const hasOrderOperations =
          (titleLower.includes("order") || endpointPath.includes("order")) &&
          !titleLower.includes("orderbook") &&
          !titleLower.includes("order_book") &&
          !titleLower.includes("order book")

        // Endpoints that modify state (POST, PUT, DELETE) are usually private
        const isModifyingEndpoint = ["POST", "PUT", "DELETE", "PATCH"].includes(
          method
        )

        // Determine if public: must have public keywords and no private keywords,
        // or be GET with no private indicators and no order operations
        const isPublic =
          (hasPublicKeywords &&
            !hasPrivateKeywords &&
            !hasOrderOperations &&
            !isModifyingEndpoint) ||
          (!hasAccessKey &&
            !hasSignature &&
            !hasTimestamp &&
            !hasPrivateKeywords &&
            !hasOrderOperations &&
            !isModifyingEndpoint)

        const endpoint = {
          method,
          path: endpointPath,
          title: h2.textContent.trim(),
          sourceUrl: `${baseUrl}#${h2.id}`,
          content,
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
  }, BASE_URL)

  return endpoints
}

/**
 * Process and save endpoint documentation
 */
const processEndpoint = (endpoint, turndownService, isPublic) => {
  const { method, path: endpointPath, title, content, sourceUrl } = endpoint

  // Convert HTML to Markdown
  let markdown = turndownService.turndown(content)

  // Add standard header with metadata
  const header = `# ${method} ${endpointPath}

**Title:** ${title}

**Source:** [${title}](${sourceUrl})

## Authentication

${isPublic ? "Not Required (Public Endpoint)" : "Required (Private Endpoint)"}

---

`

  markdown = header + markdown

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
  console.log("🚀 Starting DigiFinex endpoint documentation extraction...")
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

    // Ensure output directories exist
    ensureDir(path.join(OUTPUT_DIR, "public"))
    ensureDir(path.join(OUTPUT_DIR, "private"))

    // Extract endpoints
    const endpoints = await extractEndpoints(page, turndownService)

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
      process.exit(1)
    } else {
      console.log(
        `\n✅ Endpoint documentation extraction completed successfully!`
      )
      console.log(`📁 Files written to: ${OUTPUT_DIR}`)
      console.log(`   - Public endpoints: ${endpoints.public.length}`)
      console.log(`   - Private endpoints: ${endpoints.private.length}`)
    }
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
