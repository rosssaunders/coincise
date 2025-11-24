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
 * Convert a Deribit parameter table HTML to properly formatted markdown
 */
const convertParameterTable = tableNode => {
  const rows = Array.from(tableNode.querySelectorAll("tr"))
  if (rows.length < 2) return ""

  // Extract headers
  const headerRow = rows[0]
  const headerCells = Array.from(headerRow.querySelectorAll("th, td"))
    .map(cell => cell.textContent.trim())

  // Build header line
  const headerLine = "| " + headerCells.join(" | ") + " |"
  const separatorLine = "| " + headerCells.map(() => "---").join(" | ") + " |"

  // Process data rows
  const dataRows = []
  const parentStack = []

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i]
    const cells = Array.from(row.querySelectorAll("td"))

    if (cells.length === 0) continue

    // Extract cell values
    const cellValues = cells.map(cell => {
      // Get text content and clean it
      return cell.textContent
        .replace(/\s+/g, " ")
        .trim()
    })

    if (cellValues.length === 0) continue

    // Detect nesting level by checking indentation class or position
    let nestLevel = 0
    const firstCell = cells[0]
    const firstCellText = firstCell.textContent.trim()

    // Count leading special characters or check HTML structure for nesting
    const indentMatch = firstCellText.match(/^(›\s*)+/)
    if (indentMatch) {
      nestLevel = indentMatch[0].match(/›/g).length
    }

    // Clean parameter name
    let paramName = cellValues[0]
      .replace(/›/g, "")
      .trim()
      .replace(/\\_/g, "_")

    if (!paramName) continue

    // Clean type field (usually second or third column)
    let typeIdx = headerCells.findIndex(h =>
      h.toLowerCase().includes("type")
    )
    if (typeIdx >= 0 && typeIdx < cellValues.length) {
      cellValues[typeIdx] = cellValues[typeIdx]
        .replace(/\*object\*/g, "object")
        .replace(/\\_object\\_/g, "object")
        .replace(/\\_object\*/g, "object")
        .replace(/array of \*object\*/g, "array of objects")
        .replace(/array of \\_object\\_/g, "array of objects")
        .replace(/array of \\_object\*/g, "array of objects")
    }

    // Update parent stack
    while (parentStack.length > nestLevel) {
      parentStack.pop()
    }

    // Build full parameter name with dot notation
    let fullParamName = paramName
    if (nestLevel > 0 && parentStack.length > 0) {
      const parent = parentStack[parentStack.length - 1]
      if (parent.type && parent.type.includes("array")) {
        fullParamName = `${parent.name}[].${paramName}`
      } else {
        fullParamName = `${parent.name}.${paramName}`
      }
    }

    // Replace first cell with full parameter name
    cellValues[0] = fullParamName

    // Build row
    const rowLine = "| " + cellValues.join(" | ") + " |"
    dataRows.push(rowLine)

    // Update parent stack
    if (typeIdx >= 0 && typeIdx < cellValues.length) {
      const type = cellValues[typeIdx]
      if (type.includes("object") || type.includes("array")) {
        parentStack[nestLevel] = { name: fullParamName, type }
      }
    }
  }

  return [headerLine, separatorLine, ...dataRows].join("\n")
}

/**
 * Fix the main heading to use H1 instead of H2 and add HTTP method
 * Converts "## /public/endpoint" to "# GET /public/endpoint"
 */
const fixHeading = (markdown, endpointPath) => {
  // Determine HTTP method from endpoint path
  const parts = endpointPath.replace(/^\//, "").split("/")
  const endpointName = parts[1]

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
  const method = isPost ? "POST" : "GET"

  // Replace the first H2 heading with H1 and add method
  const lines = markdown.split("\n")
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith("## /")) {
      lines[i] = `# ${method} ${lines[i].substring(3)}`
      break
    }
  }

  return lines.join("\n")
}

/**
 * Fix malformed nested parameter tables in markdown
 * Converts broken tables with "›" symbols to properly formatted tables with dot notation
 */
const fixNestedTables = markdown => {
  const lines = markdown.split("\n")
  const result = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Check if this is the start of a parameter table
    if (line.trim().startsWith("|") &&
        (line.includes("| Parameter |") || line.includes("| Name |"))) {
      // Found table header
      const headerLine = lines[i]
      const separatorLine = lines[i + 1] || ""
      i += 2

      // Collect ALL lines that are part of the table (start with |)
      const tableLines = []
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        tableLines.push(lines[i])
        i++
      }

      // Process the table
      const fixedRows = processParameterTable(tableLines, headerLine)

      // Output fixed table
      result.push(headerLine)
      result.push(separatorLine)
      result.push(...fixedRows)
    } else {
      result.push(line)
      i++
    }
  }

  return result.join("\n")
}

/**
 * Process a parameter table and fix all the broken rows
 */
const processParameterTable = (tableLines, headerLine) => {
  // Determine column structure from header
  const headerCells = headerLine.split("|").map(c => c.trim()).filter(c => c)
  const columnCount = headerCells.length

  // Parse all rows - we need to handle multi-line rows
  const parsedRows = []
  let currentRow = {
    lines: [],
    complete: false
  }

  tableLines.forEach((line, idx) => {
    const trimmed = line.trim()
    if (!trimmed.startsWith("|")) return

    // Split into cells
    const cells = trimmed.split("|").map(c => c.trim()).filter(c => c)

    // Detect if this starts a new parameter
    // New parameter: first cell is not empty and doesn't start with "›"
    // OR has enough cells to be a complete row
    const firstCell = cells[0] || ""
    const isNestedParam = firstCell.startsWith("›") || firstCell === ""
    const looksLikeNewRow = !isNestedParam && cells.length >= 3

    if (looksLikeNewRow && currentRow.lines.length > 0) {
      // Save previous row and start new one
      parsedRows.push({ lines: currentRow.lines })
      currentRow = { lines: [line] }
    } else {
      // Add to current row
      currentRow.lines.push(line)
    }
  })

  // Don't forget the last row
  if (currentRow.lines.length > 0) {
    parsedRows.push({ lines: currentRow.lines })
  }

  // Now convert each parsed row to a proper markdown row
  const fixedRows = []
  const parentStack = []

  parsedRows.forEach(row => {
    // Combine all lines of this row
    const combinedText = row.lines.join(" ").replace(/\s+/g, " ")

    // Count nesting level
    const nestMatch = combinedText.match(/^\|\s*(›\s*)+/)
    const nestLevel = nestMatch ? (nestMatch[0].match(/›/g) || []).length : 0

    // Split into cells
    const cells = combinedText.split("|").map(c => c.trim()).filter(c => c)

    if (cells.length === 0) return

    // Extract parameter name
    let paramName = cells[0].replace(/›/g, "").trim().replace(/\\_/g, "_")
    if (!paramName) return

    // Extract other columns based on column count
    let colData = {}

    if (columnCount === 5) {
      // Parameter | Required | Type | Enum | Description
      colData = {
        paramName,
        required: cells[1] || "",
        type: cells[2] || "",
        enumVal: cells[3] || "",
        description: cells.slice(4).join(" ") || ""
      }
    } else if (columnCount === 4) {
      // Parameter | Type | Required | Description  OR  Name | Type | Enum | Description
      colData = {
        paramName,
        type: cells[1] || "",
        required: cells[2] || "",
        description: cells.slice(3).join(" ") || ""
      }
    } else if (columnCount === 3) {
      // Name | Type | Description
      colData = {
        paramName,
        type: cells[1] || "",
        description: cells.slice(2).join(" ") || ""
      }
    }

    // Clean type field
    if (colData.type) {
      colData.type = colData.type
        .replace(/\*object\*/g, "object")
        .replace(/\\_object\\_/g, "object")
        .replace(/\\_object\*/g, "object")
        .replace(/array of \*object\*/g, "array of objects")
        .replace(/array of \\_object\\_/g, "array of objects")
        .replace(/array of \\_object\*/g, "array of objects")
    }

    // Update parent stack
    while (parentStack.length > nestLevel) {
      parentStack.pop()
    }

    // Build full parameter name with dot notation
    let fullParamName = paramName
    if (nestLevel > 0 && parentStack.length > 0) {
      const parent = parentStack[parentStack.length - 1]
      if (parent.type && parent.type.includes("array")) {
        fullParamName = `${parent.name}[].${paramName}`
      } else {
        fullParamName = `${parent.name}.${paramName}`
      }
    }

    // Build fixed row based on column count
    let fixedRow = ""
    if (columnCount === 5) {
      fixedRow = `| ${fullParamName} | ${colData.required} | ${colData.type} | ${colData.enumVal} | ${colData.description} |`
    } else if (columnCount === 4) {
      fixedRow = `| ${fullParamName} | ${colData.type} | ${colData.required} | ${colData.description} |`
    } else if (columnCount === 3) {
      fixedRow = `| ${fullParamName} | ${colData.type} | ${colData.description} |`
    }

    if (fixedRow) {
      fixedRows.push(fixedRow)
    }

    // Update parent stack if this is an object/array
    if (colData.type && (colData.type.includes("object") || colData.type.includes("array"))) {
      parentStack[nestLevel] = { name: fullParamName, type: colData.type }
    }
  })

  return fixedRows
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

        // Fix parameter tables in the extracted content
        const tables = content.querySelectorAll("table")
        tables.forEach(table => {
          const rows = Array.from(table.querySelectorAll("tr"))

          // Check if this is a parameter table
          const headerCells = rows[0]?.querySelectorAll("th, td")
          if (!headerCells) return

          const headers = Array.from(headerCells).map(cell => cell.textContent.trim().toLowerCase())
          const isParameterTable = headers.some(h => h.includes("parameter") || h.includes("name"))

          if (!isParameterTable) return

          // Process each row to ensure proper structure
          rows.forEach((row, idx) => {
            if (idx === 0) return // Skip header row

            const cells = Array.from(row.querySelectorAll("td"))
            cells.forEach(cell => {
              // Normalize whitespace and remove line breaks within cells
              const text = cell.innerHTML
                .replace(/<br\s*\/?>/gi, " ")
                .replace(/\s+/g, " ")
                .trim()
              cell.innerHTML = text
            })
          })
        })

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

    const turndownService = createTurndownBuilder()
      .withCustomRule("deribit-tables", {
        filter: node => {
          return node.nodeName === "TABLE"
        },
        replacement: (content, node) => {
          // Check if this is a parameter table
          const headerRow = node.querySelector("tr")
          if (!headerRow) return content

          const headers = Array.from(headerRow.querySelectorAll("th, td"))
            .map(cell => cell.textContent.trim())

          const isParameterTable = headers.some(h =>
            h.toLowerCase().includes("parameter") ||
            h.toLowerCase().includes("name")
          )

          if (!isParameterTable) return content // Let default processing handle it

          // Custom processing for parameter tables
          return convertParameterTable(node)
        }
      })
      .build()

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
      let markdown = turndownService.turndown(endpoint.content)
      markdown = fixNestedTables(markdown)
      markdown = fixHeading(markdown, endpoint.path)
      const filename = endpointToFilename(endpoint.path)
      const filepath = path.join(OUTPUT_DIR, "public", filename)
      writeFile(filepath, markdown)
    })
    console.log(`✅ Written ${endpoints.public.length} public endpoint files`)

    // Write private endpoints
    console.log("\n📝 Writing private endpoint files...")
    endpoints.private.forEach(endpoint => {
      let markdown = turndownService.turndown(endpoint.content)
      markdown = fixNestedTables(markdown)
      markdown = fixHeading(markdown, endpoint.path)
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
