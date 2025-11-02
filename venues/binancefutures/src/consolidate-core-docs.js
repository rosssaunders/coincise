"use strict"

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { dirname } from "path"
import { formatMarkdown } from "../../shared/format-markdown.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const BASE_DOCS_DIR = path.resolve(__dirname, "../../../docs/binance")

// Product types to process
const PRODUCTS = ["usdm", "coinm", "options"]

/**
 * Helper function to recursively find all files in a directory
 */
function findFiles(dir, fileList = []) {
  try {
    const files = fs.readdirSync(dir)

    for (const file of files) {
      const filePath = path.join(dir, file)
      const stat = fs.statSync(filePath)

      if (stat.isDirectory()) {
        findFiles(filePath, fileList)
      } else if (file.endsWith(".md")) {
        fileList.push(filePath)
      }
    }
  } catch (error) {
    // Directory doesn't exist, skip it
  }

  return fileList
}

/**
 * Extract error codes from endpoint files
 */
function extractErrorCodes(productDir) {
  const errorCodes = new Map()
  const publicDir = path.join(productDir, "endpoints/public")
  const privateDir = path.join(productDir, "endpoints/private")
  const coreDir = path.join(productDir, "core")

  const allFiles = [
    ...findFiles(publicDir),
    ...findFiles(privateDir),
    ...findFiles(coreDir)
  ]

  for (const file of allFiles) {
    const content = fs.readFileSync(file, "utf8")

    // Look for error code tables
    const tableMatches = content.matchAll(/\|.*?Code.*?\|.*?\n[\s\S]*?\n\n/g)
    for (const match of tableMatches) {
      const table = match[0]
      if (table.includes("Error") || table.includes("error")) {
        const lines = table.split("\n").filter(line => line.trim().startsWith("|"))
        // Skip header and separator
        lines.slice(2).forEach(line => {
          const cells = line.split("|").map(cell => cell.trim()).filter(Boolean)
          if (cells.length >= 2 && cells[0].match(/^-?\d+$/)) {
            const code = cells[0]
            const description = cells.slice(1).join(" - ")
            if (!errorCodes.has(code)) {
              errorCodes.set(code, description)
            }
          }
        })
      }
    }
  }

  return errorCodes
}

/**
 * Consolidate core documentation by category
 */
function consolidateCoreByCategory(productDir) {
  const coreDir = path.join(productDir, "core")
  const coreFiles = findFiles(coreDir)

  const categories = {
    general: [],
    rate_limits: [],
    authentication: [],
    network_connectivity: [],
    error_codes: [],
    response_formats: [],
    change_log: []
  }

  for (const file of coreFiles) {
    const content = fs.readFileSync(file, "utf8")
    const filename = path.basename(file).toLowerCase()

    // Categorize based on filename and content
    if (filename.includes("rate") || filename.includes("limit") || content.includes("Rate Limit")) {
      categories.rate_limits.push({ file, content })
    } else if (filename.includes("auth") || filename.includes("security") || content.includes("Authentication")) {
      categories.authentication.push({ file, content })
    } else if (filename.includes("error") || filename.includes("codes") || content.includes("Error Codes")) {
      categories.error_codes.push({ file, content })
    } else if (filename.includes("response") || filename.includes("format") || content.includes("Response Format")) {
      categories.response_formats.push({ file, content })
    } else if (filename.includes("change") || filename.includes("log") || content.includes("Change Log")) {
      categories.change_log.push({ file, content })
    } else if (filename.includes("connect") || filename.includes("network") || content.includes("Endpoint")) {
      categories.network_connectivity.push({ file, content })
    } else {
      categories.general.push({ file, content })
    }
  }

  return categories
}

/**
 * Create core docs for a product
 */
async function processProduct(product) {
  const productDir = path.join(BASE_DOCS_DIR, product)

  console.log(`\n\x1b[36m%s\x1b[0m`, `Processing ${product.toUpperCase()}...`)

  // Step 1: Extract error codes
  console.log("\x1b[34m%s\x1b[0m", "📊 Extracting error codes...")
  const errorCodes = extractErrorCodes(productDir)
  console.log(`  ✅ Found ${errorCodes.size} unique error codes`)

  // Step 2: Consolidate core documentation
  console.log("\x1b[34m%s\x1b[0m", "📚 Consolidating core documentation...")
  const coreCategories = consolidateCoreByCategory(productDir)

  // Step 3: Create core files
  await createCoreDocs(productDir, product, coreCategories, errorCodes)
}

/**
 * Create all core documentation files for a product
 */
async function createCoreDocs(productDir, productName, categories, errorCodes) {
  console.log("\x1b[34m%s\x1b[0m", "📝 Creating core documentation files...")

  // rate_limits.md
  let content = "# Rate Limits\n\n"
  content += `Binance ${productName.toUpperCase()} Futures API implements rate limiting.\n\n`
  if (categories.rate_limits.length > 0) {
    for (const { content: docContent } of categories.rate_limits) {
      content += docContent.replace(/^#+ .*\n/, "") + "\n\n"
    }
  }
  fs.writeFileSync(path.join(productDir, "rate_limits.md"), content)

  // authentication.md
  content = "# Authentication\n\n"
  content += `Binance ${productName.toUpperCase()} Futures API uses API keys and request signing.\n\n`
  if (categories.authentication.length > 0) {
    for (const { content: docContent } of categories.authentication) {
      content += docContent.replace(/^#+ .*\n/, "") + "\n\n"
    }
  }
  fs.writeFileSync(path.join(productDir, "authentication.md"), content)

  // network_connectivity.md
  content = "# Network Connectivity\n\n"
  content += `Base URLs and connectivity information for Binance ${productName.toUpperCase()} Futures API.\n\n`
  content += "## Base URLs\n\n"
  if (productName === "usdm") {
    content += "- REST API: `https://fapi.binance.com`\n"
    content += "- WebSocket Streams: `wss://fstream.binance.com`\n"
    content += "- WebSocket API: `wss://ws-fapi.binance.com/ws-fapi/v1`\n\n"
  } else if (productName === "coinm") {
    content += "- REST API: `https://dapi.binance.com`\n"
    content += "- WebSocket Streams: `wss://dstream.binance.com`\n"
    content += "- WebSocket API: `wss://ws-dapi.binance.com/ws-dapi/v1`\n\n"
  } else if (productName === "options") {
    content += "- REST API: `https://eapi.binance.com`\n"
    content += "- WebSocket Streams: `wss://nbstream.binance.com`\n\n"
  }
  if (categories.network_connectivity.length > 0) {
    for (const { content: docContent } of categories.network_connectivity) {
      content += docContent.replace(/^#+ .*\n/, "") + "\n\n"
    }
  }
  fs.writeFileSync(path.join(productDir, "network_connectivity.md"), content)

  // error_codes.md
  content = "# Error Codes\n\n"
  content += `Error codes for Binance ${productName.toUpperCase()} Futures API.\n\n`
  if (categories.error_codes.length > 0) {
    for (const { content: docContent } of categories.error_codes) {
      content += docContent.replace(/^#+ .*\n/, "") + "\n\n"
    }
  }
  if (errorCodes.size > 0) {
    content += "## All Error Codes\n\n"
    content += "| Code | Description |\n"
    content += "| ---- | ----------- |\n"
    const sortedErrors = Array.from(errorCodes.entries()).sort((a, b) => {
      const numA = parseInt(a[0].replace(/^-/, ""))
      const numB = parseInt(b[0].replace(/^-/, ""))
      if (isNaN(numA) || isNaN(numB)) return a[0].localeCompare(b[0])
      return numA - numB
    })
    for (const [code, description] of sortedErrors) {
      content += `| ${code} | ${description} |\n`
    }
  }
  fs.writeFileSync(path.join(productDir, "error_codes.md"), content)

  // response_formats.md
  content = "# Response Formats\n\n"
  content += `Response format specifications for Binance ${productName.toUpperCase()} Futures API.\n\n`
  if (categories.response_formats.length > 0) {
    for (const { content: docContent } of categories.response_formats) {
      content += docContent.replace(/^#+ .*\n/, "") + "\n\n"
    }
  } else {
    content += "Responses are returned in JSON format.\n"
  }
  fs.writeFileSync(path.join(productDir, "response_formats.md"), content)

  // change_log.md
  content = "# Change Log\n\n"
  content += `API version history for Binance ${productName.toUpperCase()} Futures.\n\n`
  if (categories.change_log.length > 0) {
    for (const { content: docContent } of categories.change_log) {
      content += docContent.replace(/^#+ .*\n/, "") + "\n\n"
    }
  }
  fs.writeFileSync(path.join(productDir, "change_log.md"), content)

  // Format all files
  console.log("\x1b[34m%s\x1b[0m", "✨ Formatting files...")
  const coreFiles = [
    "rate_limits.md",
    "authentication.md",
    "network_connectivity.md",
    "error_codes.md",
    "response_formats.md",
    "change_log.md"
  ]

  for (const file of coreFiles) {
    const filePath = path.join(productDir, file)
    try {
      await formatMarkdown(filePath)
      console.log(`  ✅ ${file}`)
    } catch (error) {
      console.log(`  ⚠️  Could not format ${file}`)
    }
  }
}

/**
 * Main function
 */
async function main() {
  console.log("\x1b[36m%s\x1b[0m", "🚀 Binance Futures Core Documentation Consolidation")
  console.log("\x1b[36m%s\x1b[0m", "=".repeat(50))

  for (const product of PRODUCTS) {
    await processProduct(product)
  }

  console.log("\x1b[32m%s\x1b[0m", "\n✅ All products processed successfully!")
  console.log(`📁 Output directory: ${BASE_DOCS_DIR}`)
}

// Only run main() if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error("Unhandled error in main:", error)
    console.error("Stack trace:", error.stack)
    process.exit(1)
  })
}
