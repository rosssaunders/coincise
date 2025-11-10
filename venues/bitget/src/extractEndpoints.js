/**
 * Bitget Exchange - Endpoint Documentation Extraction
 * Extracts individual endpoint documentation from Bitget API docs
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
const OUTPUT_DIR = path.resolve(__dirname, "../../../docs/bitget/endpoints")

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
        `  Attempt ${attempt} failed. Retrying in ${delayTime / 1000} seconds...`
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
  const methodLower = method.toLowerCase()
  const pathPart = sanitizeFilename(
    endpointPath.replace(/^\//, "").replace(/\//g, "_")
  )
  return `${methodLower}_${pathPart}.md`
}

/**
 * Determine if an endpoint is public or private based on content
 */
const isPublicEndpoint = (html, title, endpointPath) => {
  const htmlLower = html.toLowerCase()
  const titleLower = title.toLowerCase()

  // Check if the endpoint path contains /public/
  if (endpointPath && endpointPath.includes("/public/")) {
    return true
  }

  // Check for authentication requirements
  if (
    htmlLower.includes("authentication required") ||
    htmlLower.includes("signature required") ||
    htmlLower.includes("access-key") ||
    htmlLower.includes("access-sign") ||
    htmlLower.includes("access-timestamp") ||
    htmlLower.includes("access-passphrase")
  ) {
    return false
  }

  // Check for public indicators
  if (
    titleLower.includes("public") ||
    htmlLower.includes("public interface") ||
    htmlLower.includes("no authentication")
  ) {
    return true
  }

  // If in /public/ path in title, it's public
  if (titleLower.includes("/public/")) {
    return true
  }

  // Default to private for safety (most trading endpoints require auth)
  return false
}

/**
 * Extract HTTP method and path from endpoint documentation
 */
const extractMethodAndPath = html => {
  // Look for patterns like "GET /api/v2/..." or "POST /api/v2/..."
  const methodPattern = /(GET|POST|PUT|DELETE)\s+(\/api\/[^\s<]+)/i
  const match = html.match(methodPattern)

  if (match) {
    return {
      method: match[1].toUpperCase(),
      path: match[2]
    }
  }

  return null
}

/**
 * Extract a single endpoint from a URL
 */
const extractEndpoint = async (page, url, turndownService) => {
  return retryWithBackoff(
    async () => {
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

      const result = await page.evaluate(() => {
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
            // Get the title
            const h1 = element.querySelector("h1")
            const title = h1 ? h1.textContent.trim() : ""

            // Clone the element to avoid modifying the DOM
            const clone = element.cloneNode(true)

            // Remove unwanted elements
            const unwanted = clone.querySelectorAll(
              'button, .copy-button, [class*="copy"]'
            )
            unwanted.forEach(el => el.remove())

            return {
              title,
              html: clone.innerHTML
            }
          }
        }

        return {
          title: "",
          html: document.body.innerHTML
        }
      })

      // Clean up the HTML content
      let cleanHtml = result.html.replace(
        /(Copy Success|Copy to Clipboard)/gi,
        ""
      )

      // Extract method and path
      const methodInfo = extractMethodAndPath(cleanHtml)

      if (!methodInfo) {
        console.log(`  ⚠️  Could not extract method/path from ${url}`)
        return null
      }

      // Convert to markdown
      let markdown = turndownService.turndown(cleanHtml)

      // Ensure the document starts with an H1 if it doesn't have one
      if (!markdown.startsWith("# ")) {
        markdown = `# ${result.title}\n\n${markdown}`
      }

      // Add source URL
      markdown += `\n\n> **Source:** ${url}\n`

      // Determine if public or private
      const isPublic = isPublicEndpoint(cleanHtml, result.title, methodInfo.path)

      return {
        method: methodInfo.method,
        path: methodInfo.path,
        title: result.title,
        markdown,
        isPublic
      }
    },
    3,
    5000
  ).catch(error => {
    console.log(`  ✗ Error extracting ${url}: ${error.message}`)
    return null
  })
}

/**
 * Load URLs from config files
 */
const loadConfigUrls = () => {
  const configDir = path.resolve(__dirname, "../config")
  const configFiles = ["common.json", "spot.json", "future.json"]

  const allUrls = []

  for (const configFile of configFiles) {
    const configPath = path.join(configDir, configFile)
    if (fs.existsSync(configPath)) {
      const config = JSON.parse(fs.readFileSync(configPath, "utf8"))

      // Add URLs that look like endpoints (not general docs)
      for (const urlPath of config.urls) {
        // Skip general documentation pages
        if (
          urlPath.includes("/intro") ||
          urlPath.includes("/quick-start") ||
          urlPath.includes("/faq") ||
          urlPath.includes("/signature") ||
          urlPath.includes("/websocket-intro") ||
          urlPath.includes("/domain") ||
          urlPath.includes("/sdk-postman") ||
          urlPath.includes("/error-code") ||
          urlPath.includes("/changelog")
        ) {
          continue
        }

        allUrls.push({
          url: `${config.base_url}${urlPath}`,
          path: urlPath
        })
      }
    }
  }

  return allUrls
}

/**
 * Main extraction function
 */
const main = async () => {
  console.log("Starting endpoint documentation extraction for Bitget...")

  // Ensure output directories exist
  ensureDir(path.join(OUTPUT_DIR, "public"))
  ensureDir(path.join(OUTPUT_DIR, "private"))

  const browser = await launchBrowser()
  const turndownService = createTurndownBuilder().build()

  try {
    const page = await browser.newPage()

    // Load all endpoint URLs from config files
    const urls = loadConfigUrls()
    console.log(`Found ${urls.length} endpoint URLs to process`)

    let publicCount = 0
    let privateCount = 0
    let failedCount = 0

    for (let i = 0; i < urls.length; i++) {
      const { url, path: urlPath } = urls[i]
      console.log(`[${i + 1}/${urls.length}] Processing: ${url}`)

      const endpoint = await extractEndpoint(page, url, turndownService)

      if (endpoint) {
        const filename = generateFilename(endpoint.method, endpoint.path)
        const outputDir = endpoint.isPublic
          ? path.join(OUTPUT_DIR, "public")
          : path.join(OUTPUT_DIR, "private")
        const outputPath = path.join(outputDir, filename)

        writeFile(outputPath, endpoint.markdown)
        console.log(
          `  ✓ Wrote: ${endpoint.isPublic ? "public" : "private"}/${filename}`
        )

        if (endpoint.isPublic) {
          publicCount++
        } else {
          privateCount++
        }
      } else {
        failedCount++
      }

      // Polite delay between requests
      await delay(1500)
    }

    console.log("\n" + "=".repeat(60))
    console.log("Extraction completed!")
    console.log(`Public endpoints: ${publicCount}`)
    console.log(`Private endpoints: ${privateCount}`)
    console.log(`Failed: ${failedCount}`)
    console.log(`Total: ${urls.length}`)
    console.log("=".repeat(60))
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
