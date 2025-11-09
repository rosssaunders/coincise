/**
 * Backpack Exchange - Endpoint Documentation Extraction
 * Extracts individual endpoint documentation from Redocly-based API docs
 */
"use strict"

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { launchBrowser, configurePage } from "../../shared/puppeteer.js"
import { createTurndownBuilder } from "../../shared/turndown.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BASE_URL = "https://docs.backpack.exchange"
const OUTPUT_DIR = path.resolve(__dirname, "../../../docs/backpack/endpoints")

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

  const endpoints = await page.evaluate(async () => {
    // Helper function to clean up complex HTML tables and convert to proper structure
    const cleanupTables = () => {
      const tables = document.querySelectorAll("table")

      tables.forEach(table => {
        const rows = table.querySelectorAll("tr")
        const tableData = []

        // Extract data from rows
        rows.forEach(row => {
          const cells = row.querySelectorAll("td")
          if (cells.length === 2) {
            const firstCell = cells[0]
            const secondCell = cells[1]

            // Extract parameter/property information
            const propertyName = firstCell.querySelector(".property-name")
            const required = firstCell.textContent
              .toLowerCase()
              .includes("required")
            const typeElements = secondCell.querySelectorAll(".sc-gFAWRd")

            // Look for description in multiple possible locations
            const descriptionElem = secondCell.querySelector(
              '.sc-eeDRCY, .sc-eBMEME, p, [class*="description"]'
            )

            // Also check for plain text descriptions (common in response schemas)
            let descText = ""
            if (descriptionElem) {
              descText = descriptionElem.textContent.trim()
            } else {
              // Try to extract description from the second cell's text content
              // Skip type information and enum values
              const cellText = secondCell.textContent.trim()
              const lines = cellText
                .split("\n")
                .map(l => l.trim())
                .filter(l => l.length > 0)
              // The description is usually after the type and enum
              for (let i = 0; i < lines.length; i++) {
                const line = lines[i]
                // Skip lines that are just type keywords or enum labels
                if (
                  !line.match(
                    /^(string|number|integer|boolean|array|object|Enum:)$/i
                  ) &&
                  !line.startsWith('"') &&
                  line.length > 10
                ) {
                  descText = line
                  break
                }
              }
            }

            if (propertyName) {
              const paramName = propertyName.textContent.trim()
              const typeText = Array.from(typeElements)
                .map(el => el.textContent.trim())
                .join(" ")

              tableData.push({
                parameter: paramName,
                required: required ? "required" : "optional",
                type: typeText || "string",
                description: descText
              })
            }
          }
        })

        // Rebuild table with proper structure for Turndown GFM conversion
        if (tableData.length > 0) {
          const newTable = document.createElement("table")
          const thead = document.createElement("thead")
          const tbody = document.createElement("tbody")

          // Create header row
          const headerRow = document.createElement("tr")
          ;["Parameter", "Required", "Type", "Description"].forEach(header => {
            const th = document.createElement("th")
            th.textContent = header
            headerRow.appendChild(th)
          })
          thead.appendChild(headerRow)

          // Create data rows
          tableData.forEach(data => {
            const tr = document.createElement("tr")

            const tdParam = document.createElement("td")
            tdParam.textContent = data.parameter
            tr.appendChild(tdParam)

            const tdReq = document.createElement("td")
            tdReq.textContent = data.required
            tr.appendChild(tdReq)

            const tdType = document.createElement("td")
            tdType.textContent = data.type
            tr.appendChild(tdType)

            const tdDesc = document.createElement("td")
            tdDesc.textContent = data.description
            tr.appendChild(tdDesc)

            tbody.appendChild(tr)
          })

          newTable.appendChild(thead)
          newTable.appendChild(tbody)

          // Replace old table with new one
          table.parentNode.replaceChild(newTable, table)
        }
      })
    }

    // Expand all response buttons to reveal schemas
    const expandResponseButtons = () => {
      const buttons = Array.from(document.querySelectorAll("button"))

      // Find buttons that look like response code buttons (200, 400, 500, etc.)
      const responseButtons = buttons.filter(btn => {
        const text = btn.textContent
        return (
          /^\s*\d{3}\s/.test(text) && // Starts with 3-digit code
          (text.includes("Success") ||
            text.includes("error") ||
            text.includes("Error"))
        )
      })

      console.log(`Found ${responseButtons.length} response buttons to expand`)

      // Click each button to expand
      responseButtons.forEach(btn => {
        try {
          const isExpanded = btn.getAttribute("aria-expanded")
          if (isExpanded !== "true") {
            btn.click()
          }
        } catch (e) {
          console.error("Error clicking response button:", e)
        }
      })
    }

    // Expand response sections first
    expandResponseButtons()

    // Wait for DOM to update after expanding responses
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Clean up tables before extraction
    cleanupTables()

    const results = {
      public: [],
      private: []
    }

    // Redocly typically structures endpoints in operation blocks
    // Look for HTTP method tags and endpoint paths
    const operations = document.querySelectorAll("[data-section-id]")

    operations.forEach((operation) => {
      try {
        // The operation element itself has the data-section-id - that's how we found it!
        let operationId = operation.getAttribute("data-section-id")

        // Try to find method and path
        const methodElement = operation.querySelector(
          '[data-role="method"], .http-verb, .method'
        )
        const pathElement = operation.querySelector(
          '[data-role="path"], .path, .endpoint-path'
        )

        if (!methodElement || !pathElement) {
          return
        }

        const method = methodElement.textContent.trim().toUpperCase()
        const endpointPath = pathElement.textContent.trim()

        // If we still don't have an operationId, use the endpointPath
        if (!operationId || operationId.trim() === "") {
          // Convert endpoint path to an ID format
          operationId = endpointPath
            .replace(/\./g, "")
            .replace(/\s+/g, "_")
            .toLowerCase()
        }

        // Clean up operationId - remove trailing periods and whitespace
        operationId = operationId ? operationId.trim() : ""
        if (operationId.endsWith(".")) {
          operationId = operationId.slice(0, -1)
        }

        // Get the full content including response bodies
        let content = operation.innerHTML

        // Debug: Check if content includes response schema
        const hasResponseSchema =
          content.includes("Response Schema") ||
          content.includes("RESPONSE SCHEMA")
        const hasSymbolField = content.includes("Symbol of the asset")

        // Redocly often puts response bodies in separate sibling elements or nested deeply
        // Look for response schema sections including expanded content from clicked buttons
        const responseSchemas = operation.querySelectorAll(
          '[role="tabpanel"], ' +
            ".response-panel, " +
            ".response-body, " +
            '[class*="response"], ' +
            '[class*="schema"], ' +
            '[class*="ctGfEE"], ' + // Expanded response schema container
            "pre, " +
            'code[class*="language"]'
        )

        responseSchemas.forEach(section => {
          if (!content.includes(section.outerHTML)) {
            content += "\n" + section.outerHTML
          }
        })

        // Also check the next sibling elements which might contain response info
        let nextSibling = operation.nextElementSibling
        let siblingCount = 0
        while (nextSibling && siblingCount < 3) {
          // Check if this sibling looks like it contains response information
          if (
            nextSibling.textContent.toLowerCase().includes("response") ||
            nextSibling.querySelector('pre, code, [class*="schema"]')
          ) {
            content += "\n" + nextSibling.innerHTML
          }
          nextSibling = nextSibling.nextElementSibling
          siblingCount++
        }

        // Determine if public or private based on presence of authentication headers
        // Private endpoints require X-API-KEY, X-SIGNATURE, and X-TIMESTAMP headers
        const hasXApiKey =
          content.includes("X-API-KEY") || content.includes("X-API-Key")
        const hasXSignature =
          content.includes("X-SIGNATURE") || content.includes("X-Signature")
        const hasXTimestamp =
          content.includes("X-TIMESTAMP") || content.includes("X-Timestamp")
        const hasAuthHeaders = hasXApiKey || hasXSignature || hasXTimestamp
        const isPublic = !hasAuthHeaders

        // Build final source URL right before creating endpoint object
        const finalSourceUrl =
          operationId && operationId.trim().length > 0
            ? `https://docs.backpack.exchange/#${operationId.trim()}`
            : "https://docs.backpack.exchange"

        const endpoint = {
          method,
          path: endpointPath,
          operationId,
          sourceUrl: finalSourceUrl,
          content,
          isPublic,
          _debug: {
            hasResponseSchema,
            hasSymbolField,
            contentLength: content.length,
            hasXApiKey,
            hasXSignature,
            hasXTimestamp,
            hasAuthHeaders,
            isPublic
          }
        }

        if (isPublic) {
          results.public.push(endpoint)
        } else {
          results.private.push(endpoint)
        }
      } catch (error) {
        console.error("Error processing operation:", error)
      }
    })

    // Alternative extraction: Look for h2/h3 headings with operation info
    if (results.public.length === 0 && results.private.length === 0) {
      console.log(
        "⚠️ Using fallback extraction method - primary method found no endpoints"
      )
      const headings = document.querySelectorAll("h2, h3")

      headings.forEach(heading => {
        const text = heading.textContent
        const methodMatch = text.match(/^(GET|POST|PUT|DELETE|PATCH)\s+(.+)/i)

        if (methodMatch) {
          const method = methodMatch[1].toUpperCase()
          const endpointPath = methodMatch[2].trim()

          // Extract the link href from the heading for the source URL
          const link = heading.querySelector("a[href]")
          let sourceUrl = "https://docs.backpack.exchange"
          let operationId = endpointPath

          if (link) {
            const href = link.getAttribute("href")
            if (href && href.startsWith("#")) {
              sourceUrl = `https://docs.backpack.exchange/${href}`
              operationId = href.replace("#", "")
            }
          }

          // Get content until next heading
          let content = heading.outerHTML
          let sibling = heading.nextElementSibling

          while (sibling && !["H1", "H2", "H3"].includes(sibling.tagName)) {
            content += sibling.outerHTML
            sibling = sibling.nextElementSibling
          }

          // Determine if public or private based on presence of authentication headers
          // Private endpoints require X-API-KEY, X-SIGNATURE, and X-TIMESTAMP headers
          const hasXApiKey =
            content.includes("X-API-KEY") || content.includes("X-API-Key")
          const hasXSignature =
            content.includes("X-SIGNATURE") || content.includes("X-Signature")
          const hasXTimestamp =
            content.includes("X-TIMESTAMP") || content.includes("X-Timestamp")
          const hasAuthHeaders = hasXApiKey || hasXSignature || hasXTimestamp
          const isPublic = !hasAuthHeaders

          // Debug: Check if content includes response schema
          const hasResponseSchema =
            content.includes("Response Schema") ||
            content.includes("RESPONSE SCHEMA")
          const hasSymbolField = content.includes("Symbol of the asset")

          const endpoint = {
            method,
            path: endpointPath,
            operationId,
            sourceUrl,
            content,
            isPublic,
            _debug: {
              hasResponseSchema,
              hasSymbolField,
              contentLength: content.length,
              hasXApiKey,
              hasXSignature,
              hasXTimestamp,
              hasAuthHeaders,
              isPublic
            }
          }

          if (isPublic) {
            results.public.push(endpoint)
          } else {
            results.private.push(endpoint)
          }
        }
      })
    }

    // Debug: Show first endpoint info
    if (results.private.length > 0) {
      const first = results.private[0]
      console.log("📝 First endpoint has _debug:", !!first._debug)
      console.log("📝 First endpoint keys:", Object.keys(first).join(", "))

      results._debug = {
        operationId: first.operationId,
        sourceUrl: first.sourceUrl,
        method: first.method,
        path: first.path,
        contentDebug: first._debug || { error: "_debug not set" },
        steps: results._debugSteps
      }
    }

    // Save first endpoint's HTML for debugging (before returning)
    if (results.private.length > 0) {
      const firstEndpoint = results.private[0]
      if (firstEndpoint._debug) {
        console.log("📝 First endpoint content debug:", {
          hasResponseSchema: firstEndpoint._debug.hasResponseSchema,
          hasSymbolField: firstEndpoint._debug.hasSymbolField,
          contentLength: firstEndpoint._debug.contentLength
        })
      }
    }

    return results
  })

  // Log debug info
  if (endpoints._debug) {
    console.log(
      "📝 Debug first endpoint:",
      JSON.stringify(endpoints._debug, null, 2)
    )
  }
  if (endpoints._debugSteps) {
    console.log(
      "📝 Debug extraction steps:",
      JSON.stringify(endpoints._debugSteps, null, 2)
    )
  }

  return endpoints
}

/**
 * Process and save endpoint documentation
 */
const processEndpoint = (endpoint, turndownService, isPublic) => {
  const { method, path: endpointPath, content, sourceUrl } = endpoint

  // Convert HTML to Markdown
  let markdown = turndownService.turndown(content)

  // Add standard template header if not present
  if (!markdown.includes("#")) {
    markdown = `# ${method} ${endpointPath}\n\n${markdown}`
  }

  // Add metadata section with source URL
  const header = `# ${method} ${endpointPath}\n\n**Source:** [${endpointPath}](${sourceUrl})\n\n## Authentication\n\n${isPublic ? "Not Required (Public Endpoint)" : "Required (Private Endpoint)"}\n\n`

  if (!markdown.startsWith("# ")) {
    markdown = header + markdown
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
  console.log("🚀 Starting Backpack endpoint documentation extraction...")
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
