/**
 * Coinbase Exchange - Endpoint Documentation Extraction
 * Extracts individual endpoint documentation from reference pages
 */
"use strict"

import { launchBrowser, configurePage } from "../../../shared/puppeteer.js"
import { createTurndownBuilder } from "../../../shared/turndown.js"
import { KNOWN_ENDPOINTS } from "./endpoints-config.js"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BASE_URL = "https://docs.cdp.coinbase.com/exchange/reference"
const OUTPUT_DIR = path.join(__dirname, "../../../../docs/coinbase/endpoints")

// Allow limiting number of endpoints for testing via environment variable
const MAX_ENDPOINTS = process.env.MAX_ENDPOINTS
  ? parseInt(process.env.MAX_ENDPOINTS, 10)
  : KNOWN_ENDPOINTS.length

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
 * Generate filename from HTTP method and endpoint path, with fallback to operation ID
 */
const generateFilename = (method, endpointPath, operationId) => {
  const methodLower = method.toLowerCase()

  // If path is unknown or invalid, use operation ID as filename
  if (!endpointPath || endpointPath === "/unknown" || endpointPath.length < 2) {
    // Convert exchangerestapi_getorder to get_order
    const cleanOperationId = operationId
      .replace(/^exchangerestapi_/, "")
      .toLowerCase()
    return `${cleanOperationId}.md`
  }

  const pathPart = sanitizeFilename(
    endpointPath.replace(/^\//, "").replace(/\//g, "_")
  )
  return `${methodLower}_${pathPart}.md`
}

/**
 * Determine if endpoint is public or private based on authentication requirements
 */
const isPublicEndpoint = content => {
  // Check for authentication headers in the content
  const hasCBAccessKey =
    content.includes("CB-ACCESS-KEY") || content.includes("CB-ACCESS-Key")
  const hasCBAccessSign =
    content.includes("CB-ACCESS-SIGN") ||
    content.includes("CB-ACCESS-Signature")
  const hasCBAccessTimestamp =
    content.includes("CB-ACCESS-TIMESTAMP") ||
    content.includes("CB-ACCESS-Timestamp")
  const hasCBAccessPassphrase =
    content.includes("CB-ACCESS-PASSPHRASE") ||
    content.includes("CB-ACCESS-Passphrase")

  const hasAuthHeaders =
    hasCBAccessKey ||
    hasCBAccessSign ||
    hasCBAccessTimestamp ||
    hasCBAccessPassphrase

  // Also check for explicit mentions of authentication
  const requiresAuth =
    content.includes("API Key Permissions") ||
    content.toLowerCase().includes("authentication required") ||
    content.toLowerCase().includes("requires authentication")

  return !hasAuthHeaders && !requiresAuth
}

/**
 * Extract endpoint documentation
 */
const extractEndpoint = async (page, turndownService, operationId) => {
  const url = `${BASE_URL}/${operationId}`

  console.log(`  Extracting ${operationId}...`)

  await page.goto(url, {
    waitUntil: "networkidle2",
    timeout: 90000
  })

  await page.waitForSelector('main[role="main"]', { timeout: 90000 })

  const endpointData = await page.evaluate(() => {
    const content = document.querySelector('main[role="main"]')
    const title = document.querySelector("#page-title, h1")

    // Check if this is a 404 page
    const bodyText = content ? content.textContent : ""
    const is404 =
      title &&
      title.textContent.includes("Page Not Found") &&
      bodyText.includes("We couldn't find the page")

    // Try to find the endpoint method and path
    const methodMatch = bodyText.match(
      /(GET|POST|PUT|DELETE|PATCH)\s+(\/[^\s\n]*)/i
    )

    // Clean up Coinbase documentation structure to create proper GFM tables
    const cleanupCoinbaseParams = () => {
      if (!content) return

      // Find all h4 headers
      const headers = Array.from(content.querySelectorAll("h4"))

      // Find all api-section divs (they contain the actual parameter data)
      const apiSections = Array.from(content.querySelectorAll(".api-section"))

      // Match h4 headers to api-sections by order
      // Typically: Authorizations h4 -> api-section[0], Path Parameters h4 -> api-section[1], Response h4 -> api-section[2]
      let apiSectionIndex = 0

      headers.forEach(header => {
        const headerText = header.textContent.trim()

        // Only process parameter/response sections
        if (
          !headerText.includes("Authorization") &&
          !headerText.includes("Parameter") &&
          !headerText.includes("Response")
        ) {
          return
        }

        // Get the corresponding api-section for this header
        const apiSection = apiSections[apiSectionIndex]
        apiSectionIndex++

        if (!apiSection) return

        // Extract parameters from this section
        const tableData = []
        const paramDivs = apiSection.querySelectorAll(
          ".font-semibold.text-primary"
        )

        paramDivs.forEach(paramDiv => {
          const paramName = paramDiv.textContent.trim()

          // Skip if empty
          if (!paramName) return

          // Find type and required info
          let type = ""
          let required = "optional"
          let description = ""

          // The type/required info is in the container's parent
          let container = paramDiv.parentElement
          while (container && !container.classList.contains("param-head")) {
            container = container.parentElement
          }

          if (container) {
            // Look for type and required in the container's parent text
            const allText = container.parentElement.textContent

            // Extract type
            const typeMatch = allText.match(
              /(string|number|integer|boolean|array|object|null)/i
            )
            if (typeMatch) {
              type = typeMatch[1]
            }

            // Check if required
            if (allText.includes("required")) {
              required = "required"
            }

            // Try to find description
            const descDivs = container.parentElement.querySelectorAll("div")
            descDivs.forEach(div => {
              const text = div.textContent.trim()
              if (
                text.length > 20 &&
                !text.match(
                  /^(string|number|integer|boolean|array|object|required|optional|header|query|path)$/i
                ) &&
                !description
              ) {
                description = text
              }
            })
          }

          tableData.push({
            parameter: paramName,
            type: type || "string",
            required: required,
            description: description || ""
          })
        })

        // Create table if we have data
        if (tableData.length > 0) {
          const table = document.createElement("table")
          const thead = document.createElement("thead")
          const tbody = document.createElement("tbody")

          // Header row
          const headerRow = document.createElement("tr")
          ;["Parameter", "Type", "Required", "Description"].forEach(h => {
            const th = document.createElement("th")
            th.textContent = h
            headerRow.appendChild(th)
          })
          thead.appendChild(headerRow)

          // Data rows
          tableData.forEach(data => {
            const tr = document.createElement("tr")
            ;["parameter", "type", "required", "description"].forEach(key => {
              const td = document.createElement("td")
              td.textContent = data[key]
              tr.appendChild(td)
            })
            tbody.appendChild(tr)
          })

          table.appendChild(thead)
          table.appendChild(tbody)

          // Insert table after the header
          header.parentNode.insertBefore(table, header.nextSibling)
        }
      })
    }

    // Apply cleanup
    cleanupCoinbaseParams()

    return {
      html: content ? content.innerHTML : "",
      title: title ? title.textContent.trim() : "",
      method: methodMatch ? methodMatch[1].toUpperCase() : "GET",
      path: methodMatch ? methodMatch[2] : "/unknown",
      is404
    }
  })

  // Skip 404 pages
  if (endpointData.is404) {
    console.log(`    ⚠️  Skipping - page not found (404)`)
    return null
  }

  const markdown = turndownService.turndown(endpointData.html)

  // Build endpoint file content
  const method = endpointData.method
  const endpointPath = endpointData.path
  const title = endpointData.title || operationId

  const content = `# ${method} ${endpointPath}

**Source:**
[${title}](${url})

## Authentication

${isPublicEndpoint(markdown) ? "Not Required (Public Endpoint)" : "Required (Private Endpoint)"}

${markdown}
`

  return {
    method,
    path: endpointPath,
    operationId,
    sourceUrl: url,
    content,
    isPublic: isPublicEndpoint(markdown)
  }
}

/**
 * List of known Coinbase Exchange API endpoints
 * This list should be expanded as new endpoints are discovered
 */
/**
 * Main extraction function
 */
const main = async () => {
  const endpointsToExtract = KNOWN_ENDPOINTS.slice(0, MAX_ENDPOINTS)

  console.log(
    "Starting endpoint documentation extraction for Coinbase Exchange..."
  )
  console.log(
    `Will attempt to extract ${endpointsToExtract.length} of ${KNOWN_ENDPOINTS.length} known endpoints`
  )
  if (MAX_ENDPOINTS < KNOWN_ENDPOINTS.length) {
    console.log(`  (Limited by MAX_ENDPOINTS=${MAX_ENDPOINTS})`)
  }

  const browser = await launchBrowser()
  const page = await browser.newPage()
  await configurePage(page)

  // Set longer timeouts for Coinbase
  await page.setDefaultNavigationTimeout(90000)
  await page.setDefaultTimeout(90000)

  const turndownBuilder = createTurndownBuilder()
  const turndownService = turndownBuilder.build()

  try {
    // Ensure output directories exist
    const publicDir = path.join(OUTPUT_DIR, "public")
    const privateDir = path.join(OUTPUT_DIR, "private")
    await ensureDir(publicDir)
    await ensureDir(privateDir)

    let successCount = 0
    let errorCount = 0
    let publicCount = 0
    let privateCount = 0

    for (const operationId of endpointsToExtract) {
      try {
        const endpoint = await extractEndpoint(
          page,
          turndownService,
          operationId
        )

        // Skip if endpoint returned null (404 page)
        if (!endpoint) {
          errorCount++
          continue
        }

        // Determine output directory
        const outputDir = endpoint.isPublic ? publicDir : privateDir
        const filename = generateFilename(
          endpoint.method,
          endpoint.path,
          endpoint.operationId
        )
        const filePath = path.join(outputDir, filename)

        await writeFile(filePath, endpoint.content)

        if (endpoint.isPublic) {
          publicCount++
        } else {
          privateCount++
        }

        successCount++
      } catch (error) {
        console.error(`  ❌ Failed to extract ${operationId}: ${error.message}`)
        errorCount++
      }
    }

    console.log("\n" + "=".repeat(50))
    console.log(`✅ Endpoint extraction completed`)
    console.log(`   Total attempted: ${endpointsToExtract.length}`)
    console.log(`   Successfully extracted: ${successCount}`)
    console.log(`   Public endpoints: ${publicCount}`)
    console.log(`   Private endpoints: ${privateCount}`)
    console.log(`   Failed: ${errorCount}`)
    console.log("=".repeat(50))
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
