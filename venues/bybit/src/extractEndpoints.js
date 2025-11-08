/**
 * Bybit - Endpoint Documentation Extraction
 * Extracts individual endpoint documentation from Bybit V5 API docs
 */
"use strict"

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { launchBrowser, configurePage } from "../../shared/puppeteer.js"
import { createTurndownBuilder } from "../../shared/turndown.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BASE_URL = "https://bybit-exchange.github.io/docs/v5"
const OUTPUT_DIR = path.resolve(__dirname, "../../../docs/bybit/endpoints")

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
 * Get all endpoint URLs from Bybit documentation
 * This extracts endpoints from the config files used by the old system
 */
const getAllEndpoints = () => {
  const configDir = path.join(__dirname, "../config")
  const endpoints = []

  // Read public and private REST configs
  const publicRest = JSON.parse(
    fs.readFileSync(path.join(configDir, "public_rest.json"), "utf8")
  )
  const privateRest = JSON.parse(
    fs.readFileSync(path.join(configDir, "private_rest.json"), "utf8")
  )

  // Add public endpoints
  publicRest.endpoints.forEach(endpoint => {
    endpoints.push({
      endpoint,
      url: `${BASE_URL}/${endpoint}`,
      category: "public"
    })
  })

  // Add private endpoints
  privateRest.endpoints.forEach(endpoint => {
    endpoints.push({
      endpoint,
      url: `${BASE_URL}/${endpoint}`,
      category: "private"
    })
  })

  return endpoints
}

/**
 * Extract endpoint documentation from a page
 */
const extractEndpoint = async (page, turndownService, url, category) => {
  try {
    await page.goto(url, {
      waitUntil: "networkidle0",
      timeout: 30000
    })

    // Extract endpoint information
    const endpointInfo = await page.evaluate(() => {
      const main = document.querySelector('main, article, .main-content, [role="main"]')
      if (!main) {
        return null
      }

      // Get the main heading which usually contains the endpoint name
      const h1 = main.querySelector("h1")
      const title = h1 ? h1.textContent.trim() : "Unknown Endpoint"

      // Try to find the HTTP method and path
      const codeElements = Array.from(main.querySelectorAll("code"))
      let method = "GET"
      let endpointPath = ""

      // Look for HTTP method in the content
      const httpMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"]
      for (const code of codeElements) {
        const text = code.textContent.trim()
        for (const m of httpMethods) {
          if (text.toUpperCase().startsWith(m)) {
            method = m
            // Try to extract path from same or nearby code element
            const pathMatch = text.match(/\/v5\/[^\s\n?]+/)
            if (pathMatch) {
              endpointPath = pathMatch[0]
            }
            break
          }
        }
        if (endpointPath) break
      }

      // If we didn't find the path yet, look for it specifically
      if (!endpointPath) {
        for (const code of codeElements) {
          const text = code.textContent.trim()
          if (text.startsWith("/v5/")) {
            // Extract just the path without query parameters
            endpointPath = text.split(/[\s\n?]/)[0]
            break
          }
        }
      }
      
      // Clean up the path - remove any trailing query parameters
      if (endpointPath) {
        endpointPath = endpointPath.split('?')[0]
      }

      // Check for authentication headers to determine if private
      const bodyText = main.textContent
      const hasApiKey = bodyText.includes("X-BAPI-API-KEY")
      const hasSignature = bodyText.includes("X-BAPI-SIGN")
      const hasTimestamp = bodyText.includes("X-BAPI-TIMESTAMP")
      const requiresAuth = hasApiKey || hasSignature || hasTimestamp

      return {
        title,
        method,
        path: endpointPath,
        content: main.innerHTML,
        isPrivate: requiresAuth
      }
    })

    if (!endpointInfo || !endpointInfo.path) {
      console.warn(`  ⚠️  Could not extract endpoint path from ${url} - skipping`)
      return null
    }

    // Convert HTML to Markdown
    let markdown = turndownService.turndown(endpointInfo.content)

    // Determine if public or private based on authentication
    // The category from config is a hint, but we verify with actual auth headers
    const isPrivate = endpointInfo.isPrivate
    const finalCategory = isPrivate ? "private" : "public"

    // Add metadata header
    const header = `# ${endpointInfo.method} ${endpointInfo.path}\n\n**Source:** [${endpointInfo.title}](${url})\n\n## Authentication\n\n${isPrivate ? "Required (Private Endpoint)" : "Not Required (Public Endpoint)"}\n\n`

    if (!markdown.startsWith("# ")) {
      markdown = header + markdown
    }

    return {
      method: endpointInfo.method,
      path: endpointInfo.path,
      markdown,
      category: finalCategory
    }
  } catch (error) {
    console.error(`  ❌ Error extracting ${url}:`, error.message)
    return null
  }
}

/**
 * Main extraction function
 */
const main = async () => {
  console.log("🚀 Starting Bybit endpoint documentation extraction...")
  console.log(`📍 Source: ${BASE_URL}`)
  console.log(`📁 Output: ${OUTPUT_DIR}`)

  const browser = await launchBrowser()

  try {
    const page = await browser.newPage()
    await configurePage(page)

    const turndownService = createTurndownBuilder().build()

    // Ensure output directories exist
    ensureDir(path.join(OUTPUT_DIR, "public"))
    ensureDir(path.join(OUTPUT_DIR, "private"))

    // Get all endpoints to extract
    const endpoints = getAllEndpoints()
    console.log(`\n📊 Found ${endpoints.length} endpoints to extract`)

    let publicCount = 0
    let privateCount = 0
    let errorCount = 0

    // Process each endpoint
    for (const endpoint of endpoints) {
      console.log(`\n📝 Processing: ${endpoint.endpoint}`)

      const result = await extractEndpoint(
        page,
        turndownService,
        endpoint.url,
        endpoint.category
      )

      if (result) {
        // Generate filename
        const filename = generateFilename(result.method, result.path)
        const folder = result.category
        const filePath = path.join(OUTPUT_DIR, folder, filename)

        // Write file
        writeFile(filePath, result.markdown)

        if (result.category === "public") {
          publicCount++
        } else {
          privateCount++
        }
      } else {
        errorCount++
      }

      // Add a small delay to be polite to the server
      await new Promise(resolve => setTimeout(resolve, 500))
    }

    console.log(`\n✅ Endpoint documentation extraction completed!`)
    console.log(`📁 Files written to: ${OUTPUT_DIR}`)
    console.log(`   - Public endpoints: ${publicCount}`)
    console.log(`   - Private endpoints: ${privateCount}`)
    if (errorCount > 0) {
      console.log(`   - Errors: ${errorCount}`)
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
