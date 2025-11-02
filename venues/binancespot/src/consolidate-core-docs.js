"use strict"

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { dirname } from "path"
import { formatMarkdown } from "../../shared/format-markdown.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const DOCS_DIR = path.resolve(__dirname, "../../../docs/binance/spot")

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
function extractErrorCodes() {
  console.log("\x1b[34m%s\x1b[0m", "📊 Extracting error codes from all endpoints...")

  const errorCodes = new Map()
  const publicDir = path.join(DOCS_DIR, "endpoints/public")
  const privateDir = path.join(DOCS_DIR, "endpoints/private")
  const coreDir = path.join(DOCS_DIR, "core")

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

  console.log(`  ✅ Found ${errorCodes.size} unique error codes`)
  return errorCodes
}

/**
 * Consolidate core documentation by category
 */
function consolidateCoreByCategory() {
  console.log("\x1b[34m%s\x1b[0m", "📚 Consolidating core documentation by category...")

  const coreDir = path.join(DOCS_DIR, "core")
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

  console.log(`  ✅ General: ${categories.general.length} files`)
  console.log(`  ✅ Rate limits: ${categories.rate_limits.length} files`)
  console.log(`  ✅ Authentication: ${categories.authentication.length} files`)
  console.log(`  ✅ Network connectivity: ${categories.network_connectivity.length} files`)
  console.log(`  ✅ Error codes: ${categories.error_codes.length} files`)
  console.log(`  ✅ Response formats: ${categories.response_formats.length} files`)
  console.log(`  ✅ Change log: ${categories.change_log.length} files`)

  return categories
}

/**
 * Create rate_limits.md
 */
function createRateLimitsDoc(rateLimitDocs) {
  console.log("\x1b[34m%s\x1b[0m", "📝 Creating rate_limits.md...")

  let content = "# Rate Limits\n\n"
  content += "Binance Spot API implements comprehensive rate limiting to ensure fair usage and system stability.\n\n"

  if (rateLimitDocs.length > 0) {
    for (const { content: docContent } of rateLimitDocs) {
      content += docContent.replace(/^#+ .*\n/, "") + "\n\n"
    }
  } else {
    content += "## Overview\n\n"
    content += "Rate limits are enforced per endpoint and may be based on:\n"
    content += "- IP address\n"
    content += "- API key (UID)\n"
    content += "- Weight system for different endpoints\n\n"
    content += "Please refer to individual endpoint documentation for specific rate limits.\n"
  }

  const outputPath = path.join(DOCS_DIR, "rate_limits.md")
  fs.writeFileSync(outputPath, content)
  console.log(`  ✅ Created: ${outputPath}`)
}

/**
 * Create authentication.md
 */
function createAuthenticationDoc(authDocs) {
  console.log("\x1b[34m%s\x1b[0m", "📝 Creating authentication.md...")

  let content = "# Authentication\n\n"
  content += "Binance Spot API uses API keys and request signing for authentication of private endpoints.\n\n"

  if (authDocs.length > 0) {
    for (const { content: docContent } of authDocs) {
      content += docContent.replace(/^#+ .*\n/, "") + "\n\n"
    }
  } else {
    content += "## API Key Setup\n\n"
    content += "1. Create API keys in your Binance account settings\n"
    content += "2. Enable required permissions for your use case\n"
    content += "3. Keep your API secret secure\n\n"
    content += "## Request Signing\n\n"
    content += "Private endpoints require signed requests using HMAC SHA256.\n\n"
    content += "Please refer to the authentication section in core documentation for detailed signing instructions.\n"
  }

  const outputPath = path.join(DOCS_DIR, "authentication.md")
  fs.writeFileSync(outputPath, content)
  console.log(`  ✅ Created: ${outputPath}`)
}

/**
 * Create network_connectivity.md
 */
function createNetworkConnectivityDoc(networkDocs) {
  console.log("\x1b[34m%s\x1b[0m", "📝 Creating network_connectivity.md...")

  let content = "# Network Connectivity\n\n"
  content += "This document describes base URLs, endpoints, and connectivity information for Binance Spot API.\n\n"
  content += "## Base URLs\n\n"
  content += "- REST API: `https://api.binance.com`\n"
  content += "- WebSocket Streams: `wss://stream.binance.com:9443`\n"
  content += "- WebSocket API: `wss://ws-api.binance.com:443/ws-api/v3`\n\n"

  if (networkDocs.length > 0) {
    content += "## Additional Information\n\n"
    for (const { content: docContent } of networkDocs) {
      content += docContent.replace(/^#+ .*\n/, "") + "\n\n"
    }
  }

  const outputPath = path.join(DOCS_DIR, "network_connectivity.md")
  fs.writeFileSync(outputPath, content)
  console.log(`  ✅ Created: ${outputPath}`)
}

/**
 * Create error_codes.md
 */
function createErrorCodesDoc(errorCodes, errorDocs) {
  console.log("\x1b[34m%s\x1b[0m", "📝 Creating error_codes.md...")

  let content = "# Error Codes\n\n"
  content += "Binance Spot API returns specific error codes to help identify and resolve issues.\n\n"

  // Add any error documentation from core files
  if (errorDocs.length > 0) {
    for (const { content: docContent } of errorDocs) {
      content += docContent.replace(/^#+ .*\n/, "") + "\n\n"
    }
  }

  if (errorCodes.size > 0) {
    content += "## All Error Codes\n\n"
    content += "| Code | Description |\n"
    content += "| ---- | ----------- |\n"

    // Sort error codes numerically
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

  const outputPath = path.join(DOCS_DIR, "error_codes.md")
  fs.writeFileSync(outputPath, content)
  console.log(`  ✅ Created: ${outputPath}`)
}

/**
 * Create response_formats.md
 */
function createResponseFormatsDoc(formatDocs) {
  console.log("\x1b[34m%s\x1b[0m", "📝 Creating response_formats.md...")

  let content = "# Response Formats\n\n"
  content += "Binance Spot API returns responses in JSON format.\n\n"

  if (formatDocs.length > 0) {
    for (const { content: docContent } of formatDocs) {
      content += docContent.replace(/^#+ .*\n/, "") + "\n\n"
    }
  } else {
    content += "## Standard Response Structure\n\n"
    content += "Successful responses typically return JSON objects or arrays with the requested data.\n\n"
    content += "## Error Response Structure\n\n"
    content += "```json\n"
    content += "{\n"
    content += '  "code": -1121,\n'
    content += '  "msg": "Invalid symbol."\n'
    content += "}\n"
    content += "```\n\n"
    content += "## Data Types\n\n"
    content += "- **Timestamps**: Unix timestamp in milliseconds\n"
    content += "- **Prices and Quantities**: Strings to preserve precision\n\n"
  }

  const outputPath = path.join(DOCS_DIR, "response_formats.md")
  fs.writeFileSync(outputPath, content)
  console.log(`  ✅ Created: ${outputPath}`)
}

/**
 * Create change_log.md
 */
function createChangeLogDoc(changeLogDocs) {
  console.log("\x1b[34m%s\x1b[0m", "📝 Creating change_log.md...")

  let content = "# Change Log\n\n"
  content += "Binance Spot API version history and changes.\n\n"

  if (changeLogDocs.length > 0) {
    for (const { content: docContent } of changeLogDocs) {
      content += docContent.replace(/^#+ .*\n/, "") + "\n\n"
    }
  } else {
    content += "For the latest API changes, please refer to the official Binance API documentation.\n"
  }

  const outputPath = path.join(DOCS_DIR, "change_log.md")
  fs.writeFileSync(outputPath, content)
  console.log(`  ✅ Created: ${outputPath}`)
}

/**
 * Main function
 */
async function main() {
  console.log("\x1b[36m%s\x1b[0m", "🚀 Binance Spot Core Documentation Consolidation")
  console.log("\x1b[36m%s\x1b[0m", "=".repeat(50))

  // Step 1: Extract error codes from all files
  const errorCodes = extractErrorCodes()

  // Step 2: Consolidate core documentation by category
  const coreCategories = consolidateCoreByCategory()

  // Step 3: Create consolidated core documentation files
  createRateLimitsDoc(coreCategories.rate_limits)
  createAuthenticationDoc(coreCategories.authentication)
  createNetworkConnectivityDoc(coreCategories.network_connectivity)
  createErrorCodesDoc(errorCodes, coreCategories.error_codes)
  createResponseFormatsDoc(coreCategories.response_formats)
  createChangeLogDoc(coreCategories.change_log)

  // Step 4: Format all core documentation files
  console.log("\x1b[34m%s\x1b[0m", "✨ Formatting core documentation files...")
  const coreFiles = [
    "rate_limits.md",
    "authentication.md",
    "network_connectivity.md",
    "error_codes.md",
    "response_formats.md",
    "change_log.md"
  ]

  for (const file of coreFiles) {
    const filePath = path.join(DOCS_DIR, file)
    try {
      await formatMarkdown(filePath)
      console.log(`  ✅ Formatted: ${file}`)
    } catch (error) {
      console.log(`  ⚠️  Could not format ${file}: ${error.message}`)
    }
  }

  console.log("\x1b[32m%s\x1b[0m", "\n✅ Core documentation consolidation complete!")
  console.log(`📁 Output directory: ${DOCS_DIR}`)
}

// Only run main() if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error("Unhandled error in main:", error)
    console.error("Stack trace:", error.stack)
    process.exit(1)
  })
}
