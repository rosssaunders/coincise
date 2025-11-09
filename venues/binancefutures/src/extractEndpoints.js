/**
 * Binance Futures - Endpoint Documentation Extraction
 * Splits existing monolithic markdown files into individual endpoint files
 */
"use strict"

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const DOCS_ROOT = path.resolve(__dirname, "../../../docs/binance")

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
 * Extract HTTP method and path from markdown content
 */
const extractMethodAndPath = content => {
  // Look for patterns like "GET `/fapi/v1/ticker`" or "GET /fapi/v1/ticker"
  const patterns = [
    /(GET|POST|PUT|DELETE|PATCH)\s+`([^`]+)`/i,
    /(GET|POST|PUT|DELETE|PATCH)\s+(\/[^\s\n]+)/i
  ]

  for (const pattern of patterns) {
    const match = content.match(pattern)
    if (match) {
      return {
        method: match[1].toUpperCase(),
        path: match[2]
      }
    }
  }
  return null
}

/**
 * Split markdown content by H2 headings (##)
 */
const splitByH2Headings = content => {
  const sections = []
  const lines = content.split("\n")
  let currentSection = null
  let currentLines = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Check if this is an H2 heading
    if (line.startsWith("## ") && !line.startsWith("### ")) {
      // Save previous section if it exists
      if (currentSection) {
        sections.push({
          title: currentSection,
          content: currentLines.join("\n").trim()
        })
      }

      // Start new section
      currentSection = line.substring(3).trim()
      currentLines = [line]
    } else if (currentSection) {
      // Add line to current section
      currentLines.push(line)
    }
  }

  // Don't forget the last section
  if (currentSection) {
    sections.push({
      title: currentSection,
      content: currentLines.join("\n").trim()
    })
  }

  return sections
}

/**
 * Process a monolithic file and split into individual endpoints
 */
const processMonolithicFile = (filepath, type, isPrivate) => {
  console.log(`\nProcessing ${path.basename(filepath)}...`)

  if (!fs.existsSync(filepath)) {
    console.log(`  ⚠️  File not found: ${filepath}`)
    return 0
  }

  const content = fs.readFileSync(filepath, "utf8")
  const sections = splitByH2Headings(content)

  console.log(`  Found ${sections.length} sections`)

  let count = 0
  for (const section of sections) {
    // Skip non-endpoint sections
    const skipTitles = [
      "Quick Start",
      "General Info",
      "Public Endpoints Info",
      "Filters",
      "Error Codes",
      "Common Definitions",
      "Enum definitions"
    ]

    if (skipTitles.some(skip => section.title.includes(skip))) {
      continue
    }

    // Try to extract method and path
    const methodPath = extractMethodAndPath(section.content)
    if (!methodPath) {
      console.log(
        `  ⚠️  Skipping "${section.title}" - no HTTP method/path found`
      )
      continue
    }

    // Generate filename and save
    const typeDir = path.join(DOCS_ROOT, type)
    const outputDir = isPrivate
      ? path.join(typeDir, "endpoints", "private")
      : path.join(typeDir, "endpoints", "public")
    ensureDir(outputDir)

    const filename = generateFilename(methodPath.method, methodPath.path)
    const filepath = path.join(outputDir, filename)

    // Convert H2 to H1 for the main endpoint title
    const adjustedContent = section.content.replace(/^## /, "# ")

    writeFile(filepath, adjustedContent + "\n")
    count++
  }

  console.log(`✅ Extracted ${count} endpoints`)
  return count
}

/**
 * Process all futures types
 */
const processAllTypes = () => {
  console.log("Starting endpoint extraction for Binance Futures...")
  console.log("Parsing existing monolithic markdown files...\n")

  let totalCount = 0

  // USD-M Futures
  console.log("=== USD-M Futures ===")
  totalCount += processMonolithicFile(
    path.join(DOCS_ROOT, "usdm", "public_rest_api.md"),
    "usdm",
    false
  )
  totalCount += processMonolithicFile(
    path.join(DOCS_ROOT, "usdm", "private_rest_api.md"),
    "usdm",
    true
  )

  // COIN-M Futures
  console.log("\n=== COIN-M Futures ===")
  totalCount += processMonolithicFile(
    path.join(DOCS_ROOT, "coinm", "public_rest_api.md"),
    "coinm",
    false
  )
  totalCount += processMonolithicFile(
    path.join(DOCS_ROOT, "coinm", "private_rest_api.md"),
    "coinm",
    true
  )

  // Options
  console.log("\n=== Options ===")
  totalCount += processMonolithicFile(
    path.join(DOCS_ROOT, "options", "public_rest_api.md"),
    "options",
    false
  )
  totalCount += processMonolithicFile(
    path.join(DOCS_ROOT, "options", "private_rest_api.md"),
    "options",
    true
  )

  console.log(`\n✅ Total endpoints extracted: ${totalCount}`)
}

/**
 * Main extraction function
 */
const main = async () => {
  processAllTypes()
  console.log("\n✅ All endpoint extraction completed successfully")
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
