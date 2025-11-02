"use strict"

import { promises as fs } from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { dirname } from "path"
import { formatMarkdown } from "../../shared/format-markdown.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const DOCS_DIR = path.resolve(__dirname, "../../../docs/deribit")

/**
 * Helper function to recursively find all files in a directory
 */
async function findFiles(dir, fileList = []) {
  try {
    const files = await fs.readdir(dir)

    for (const file of files) {
      const filePath = path.join(dir, file)
      const stat = await fs.stat(filePath)

      if (stat.isDirectory()) {
        await findFiles(filePath, fileList)
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
 * Extract error codes from JSON-RPC responses in endpoint files
 */
async function extractErrorCodes() {
  console.log("\x1b[34m%s\x1b[0m", "📊 Extracting error codes from all endpoints...")

  const errorCodes = new Map()
  const publicDir = path.join(DOCS_DIR, "endpoints/public")
  const privateDir = path.join(DOCS_DIR, "endpoints/private")

  const allEndpoints = [
    ...(await findFiles(publicDir)),
    ...(await findFiles(privateDir))
  ]

  for (const file of allEndpoints) {
    const content = await fs.readFile(file, "utf8")

    // Look for error code patterns in the markdown
    // Deribit uses JSON-RPC error codes
    const errorPattern = /`(\d{4,5})`[^\n]*error/gi
    const matches = content.matchAll(errorPattern)

    for (const match of matches) {
      const code = match[1]
      if (code && !errorCodes.has(code)) {
        // Extract context around the error code
        const contextStart = Math.max(0, match.index - 100)
        const contextEnd = Math.min(content.length, match.index + 200)
        const context = content.substring(contextStart, contextEnd)
        errorCodes.set(code, context.split("\n")[0].trim())
      }
    }
  }

  console.log(`  ✅ Found ${errorCodes.size} unique error codes`)
  return errorCodes
}

/**
 * Consolidate core documentation by category
 */
async function consolidateCoreByCategory() {
  console.log("\x1b[34m%s\x1b[0m", "📚 Consolidating core documentation by category...")

  const coreDir = path.join(DOCS_DIR, "core")
  const coreFiles = await findFiles(coreDir)

  const categories = {
    general: [],
    session_management: [],
    authentication: [],
    connection: [],
    support_articles: []
  }

  for (const file of coreFiles) {
    const content = await fs.readFile(file, "utf8")
    const filename = path.basename(file).toLowerCase()

    // Categorize based on filename
    if (filename.includes("general") || filename.includes("overview") || filename.includes("json")) {
      categories.general.push({ file, content })
    } else if (filename.includes("session")) {
      categories.session_management.push({ file, content })
    } else if (filename.includes("auth")) {
      categories.authentication.push({ file, content })
    } else if (filename.includes("connection") || filename.includes("support")) {
      categories.connection.push({ file, content })
    } else if (filename.includes("support_articles")) {
      categories.support_articles.push({ file, content })
    } else {
      // Default to general
      categories.general.push({ file, content })
    }
  }

  console.log(`  ✅ General: ${categories.general.length} files`)
  console.log(`  ✅ Session management: ${categories.session_management.length} files`)
  console.log(`  ✅ Authentication: ${categories.authentication.length} files`)
  console.log(`  ✅ Connection: ${categories.connection.length} files`)

  return categories
}

/**
 * Create network_connectivity.md from connection and session management docs
 */
async function createNetworkConnectivityDoc(sessionDocs, connectionDocs) {
  console.log("\x1b[34m%s\x1b[0m", "📝 Creating network_connectivity.md...")

  let content = "# Network Connectivity\n\n"
  content += "This document describes connection management, WebSocket configuration, and infrastructure details for the Deribit API.\n\n"

  content += "## Base URLs\n\n"
  content += "- Production (REST): `https://www.deribit.com/api/v2/`\n"
  content += "- Production (WebSocket): `wss://www.deribit.com/ws/api/v2`\n"
  content += "- Test (REST): `https://test.deribit.com/api/v2/`\n"
  content += "- Test (WebSocket): `wss://test.deribit.com/ws/api/v2`\n\n"

  if (sessionDocs.length > 0) {
    content += "## Session Management\n\n"
    for (const { content: docContent } of sessionDocs) {
      content += docContent + "\n\n"
    }
  }

  if (connectionDocs.length > 0) {
    content += "## Connection and Infrastructure\n\n"
    for (const { content: docContent } of connectionDocs) {
      content += docContent + "\n\n"
    }
  }

  const outputPath = path.join(DOCS_DIR, "network_connectivity.md")
  await fs.writeFile(outputPath, content)
  console.log(`  ✅ Created: ${outputPath}`)
}

/**
 * Create authentication.md
 */
async function createAuthenticationDoc(authDocs) {
  console.log("\x1b[34m%s\x1b[0m", "📝 Creating authentication.md...")

  let content = "# Authentication\n\n"
  content += "Deribit API uses OAuth 2.0 for authentication. This document describes the authentication methods and requirements.\n\n"

  if (authDocs.length > 0) {
    for (const { content: docContent } of authDocs) {
      content += docContent + "\n\n"
    }
  } else {
    content += "## Authentication Methods\n\n"
    content += "The Deribit API supports multiple authentication methods:\n\n"
    content += "- **Client Credentials**: Using API key and secret\n"
    content += "- **Client Signature**: Using cryptographic signatures\n"
    content += "- **Refresh Token**: For obtaining new access tokens\n\n"
    content += "Please refer to the authentication endpoints in the public endpoints folder for detailed information.\n"
  }

  const outputPath = path.join(DOCS_DIR, "authentication.md")
  await fs.writeFile(outputPath, content)
  console.log(`  ✅ Created: ${outputPath}`)
}

/**
 * Create rate_limits.md from connection docs
 */
async function createRateLimitsDoc(connectionDocs) {
  console.log("\x1b[34m%s\x1b[0m", "📝 Creating rate_limits.md...")

  let content = "# Rate Limits\n\n"
  content += "Deribit API implements rate limiting to ensure fair usage and system stability.\n\n"

  // Check if there's rate limit information in connection docs
  let hasRateLimitInfo = false
  for (const { content: docContent } of connectionDocs) {
    if (docContent.toLowerCase().includes("rate") || docContent.toLowerCase().includes("limit")) {
      content += docContent + "\n\n"
      hasRateLimitInfo = true
    }
  }

  if (!hasRateLimitInfo) {
    content += "## Rate Limiting Rules\n\n"
    content += "Rate limits are applied per user and per endpoint. The specific limits vary by endpoint type:\n\n"
    content += "- **Market Data**: Higher rate limits for read-only operations\n"
    content += "- **Trading Operations**: Moderate limits to prevent system abuse\n"
    content += "- **Account Management**: Standard limits for account operations\n\n"
    content += "When rate limits are exceeded, the API will return an error code. Please implement exponential backoff in your client to handle rate limit errors gracefully.\n"
  }

  const outputPath = path.join(DOCS_DIR, "rate_limits.md")
  await fs.writeFile(outputPath, content)
  console.log(`  ✅ Created: ${outputPath}`)
}

/**
 * Create error_codes.md
 */
async function createErrorCodesDoc(errorCodes, generalDocs) {
  console.log("\x1b[34m%s\x1b[0m", "📝 Creating error_codes.md...")

  let content = "# Error Codes\n\n"
  content += "Deribit API uses JSON-RPC 2.0 error codes. This document lists all error codes that may be returned.\n\n"

  // Check if there's error documentation in general docs
  let hasErrorDoc = false
  for (const { content: docContent } of generalDocs) {
    if (docContent.toLowerCase().includes("error") && docContent.toLowerCase().includes("code")) {
      content += docContent + "\n\n"
      hasErrorDoc = true
      break
    }
  }

  if (!hasErrorDoc && errorCodes.size > 0) {
    content += "## Common Error Codes\n\n"
    content += "| Error Code | Description |\n"
    content += "| ---------- | ----------- |\n"

    // Sort error codes numerically
    const sortedErrors = Array.from(errorCodes.entries()).sort((a, b) => {
      const numA = parseInt(a[0])
      const numB = parseInt(b[0])
      return numA - numB
    })

    for (const [code, description] of sortedErrors) {
      content += `| ${code} | ${description} |\n`
    }
  }

  const outputPath = path.join(DOCS_DIR, "error_codes.md")
  await fs.writeFile(outputPath, content)
  console.log(`  ✅ Created: ${outputPath}`)
}

/**
 * Create response_formats.md
 */
async function createResponseFormatsDoc() {
  console.log("\x1b[34m%s\x1b[0m", "📝 Creating response_formats.md...")

  let content = "# Response Formats\n\n"
  content += "Deribit API uses JSON-RPC 2.0 protocol for all requests and responses.\n\n"

  content += "## JSON-RPC 2.0 Format\n\n"
  content += "### Request Format\n\n"
  content += "```json\n"
  content += "{\n"
  content += '  "jsonrpc": "2.0",\n'
  content += '  "id": 1,\n'
  content += '  "method": "public/get_time",\n'
  content += '  "params": {}\n'
  content += "}\n"
  content += "```\n\n"

  content += "### Success Response Format\n\n"
  content += "```json\n"
  content += "{\n"
  content += '  "jsonrpc": "2.0",\n'
  content += '  "id": 1,\n'
  content += '  "result": { ... }\n'
  content += "}\n"
  content += "```\n\n"

  content += "### Error Response Format\n\n"
  content += "```json\n"
  content += "{\n"
  content += '  "jsonrpc": "2.0",\n'
  content += '  "id": 1,\n'
  content += '  "error": {\n'
  content += '    "code": 10009,\n'
  content += '    "message": "Invalid argument"\n'
  content += "  }\n"
  content += "}\n"
  content += "```\n\n"

  content += "## Data Types\n\n"
  content += "### Timestamps\n\n"
  content += "- All timestamps are in milliseconds since Unix epoch\n"
  content += "- Example: `1609459200000` represents 2021-01-01 00:00:00 UTC\n\n"

  content += "### Numbers\n\n"
  content += "- Prices and amounts may be returned as numbers or strings\n"
  content += "- Always handle both formats in your client code\n\n"

  const outputPath = path.join(DOCS_DIR, "response_formats.md")
  await fs.writeFile(outputPath, content)
  console.log(`  ✅ Created: ${outputPath}`)
}

/**
 * Create change_log.md placeholder
 */
async function createChangeLogDoc() {
  console.log("\x1b[34m%s\x1b[0m", "📝 Creating change_log.md...")

  let content = "# Change Log\n\n"
  content += "Deribit API v2.1.1\n\n"
  content += "For the latest API changes and version history, please refer to the official Deribit documentation at https://docs.deribit.com\n"

  const outputPath = path.join(DOCS_DIR, "change_log.md")
  await fs.writeFile(outputPath, content)
  console.log(`  ✅ Created: ${outputPath}`)
}

/**
 * Main function
 */
async function main() {
  console.log("\x1b[36m%s\x1b[0m", "🚀 Deribit Core Documentation Consolidation")
  console.log("\x1b[36m%s\x1b[0m", "=".repeat(50))

  // Step 1: Extract error codes from all endpoints
  const errorCodes = await extractErrorCodes()

  // Step 2: Consolidate core documentation by category
  const coreCategories = await consolidateCoreByCategory()

  // Step 3: Create consolidated core documentation files
  await createNetworkConnectivityDoc(
    coreCategories.session_management,
    coreCategories.connection
  )

  await createAuthenticationDoc(coreCategories.authentication)
  await createRateLimitsDoc(coreCategories.connection)
  await createErrorCodesDoc(errorCodes, coreCategories.general)
  await createResponseFormatsDoc()
  await createChangeLogDoc()

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
