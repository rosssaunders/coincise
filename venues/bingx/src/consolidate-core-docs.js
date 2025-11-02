import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { dirname } from "path"
import { formatMarkdown } from "../../shared/format-markdown.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const DOCS_DIR = path.resolve(__dirname, "../../../docs/bingx")

// Helper function to recursively find all files in a directory
function findFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) {
    return fileList
  }

  const files = fs.readdirSync(dir)

  files.forEach(file => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      findFiles(filePath, fileList)
    } else if (file.endsWith(".md")) {
      fileList.push(filePath)
    }
  })

  return fileList
}

// Extract error codes from all endpoint files
function extractErrorCodes() {
  console.log("\x1b[34m%s\x1b[0m", "📊 Extracting error codes from all endpoints...")

  const errorCodes = new Map()
  const publicDir = path.join(DOCS_DIR, "endpoints/public")
  const privateDir = path.join(DOCS_DIR, "endpoints/private")

  const allEndpoints = [
    ...findFiles(publicDir),
    ...findFiles(privateDir)
  ]

  allEndpoints.forEach(file => {
    const content = fs.readFileSync(file, "utf8")

    // Extract error table
    const errorMatch = content.match(/### Errors\s+([\s\S]*?)(?=\n##|\n>|$)/)
    if (errorMatch) {
      const errorTable = errorMatch[1]
      const errorLines = errorTable.split("\n").filter(line => line.trim())

      // Parse error table rows (skip header and separator)
      errorLines.slice(2).forEach(line => {
        const cells = line.split("|").map(cell => cell.trim())
        if (cells.length >= 3 && cells[1] && cells[2]) {
          const code = cells[1]
          const description = cells[2]
          if (!errorCodes.has(code)) {
            errorCodes.set(code, description)
          }
        }
      })
    }
  })

  console.log(`  ✅ Found ${errorCodes.size} unique error codes`)
  return errorCodes
}

// Consolidate core documentation by category
function consolidateCoreByCategory() {
  console.log("\x1b[34m%s\x1b[0m", "📚 Consolidating core documentation by category...")

  const coreDir = path.join(DOCS_DIR, "core")
  if (!fs.existsSync(coreDir)) {
    console.log("  ⚠️  No core directory found")
    return {
      rate_limits: [],
      authentication: [],
      network_connectivity: []
    }
  }

  const coreFiles = findFiles(coreDir)
  const categories = {
    rate_limits: [],
    authentication: [],
    network_connectivity: []
  }

  coreFiles.forEach(file => {
    const content = fs.readFileSync(file, "utf8")
    const filename = path.basename(file).toLowerCase()

    // Categorize based on filename
    if (filename.includes("rate") || filename.includes("limit")) {
      categories.rate_limits.push({ file, content })
    } else if (filename.includes("auth")) {
      categories.authentication.push({ file, content })
    } else if (
      filename.includes("network") ||
      filename.includes("connectivity") ||
      filename.includes("endpoint") ||
      filename.includes("base") ||
      filename.includes("introduction")
    ) {
      categories.network_connectivity.push({ file, content })
    }
  })

  console.log(`  ✅ Rate limits: ${categories.rate_limits.length} files`)
  console.log(`  ✅ Authentication: ${categories.authentication.length} files`)
  console.log(`  ✅ Network connectivity: ${categories.network_connectivity.length} files`)

  return categories
}

// Create consolidated rate_limits.md
function createRateLimitsDoc(rateLimitDocs) {
  console.log("\x1b[34m%s\x1b[0m", "📝 Creating rate_limits.md...")

  let content = "# Rate Limits\n\n"
  content += "BingX API implements rate limiting across different products and endpoints.\n\n"
  content += "## Overview\n\n"
  content += "- Rate limits are enforced per UID (user ID) and per IP address\n"
  content += "- Different API groups have different rate limits\n"
  content += "- You can check rate limit usage via response headers:\n"
  content += "  - `X-RateLimit-Requests-Remain`: Remaining requests in the current window\n"
  content += "  - `X-RateLimit-Requests-Expire`: Window expiration time\n\n"

  // Group by product
  const byProduct = new Map()

  rateLimitDocs.forEach(({ file, content: docContent }) => {
    const relativePath = path.relative(DOCS_DIR, file)
    const pathParts = relativePath.split(path.sep)

    // Extract product from path (e.g., "core" folder doesn't tell us, so we try to infer)
    // For now, we'll just add all content
    const product = pathParts[0] || "general"

    if (!byProduct.has(product)) {
      byProduct.set(product, [])
    }
    byProduct.get(product).push(docContent)
  })

  // Add each product's rate limit info
  byProduct.forEach((docs, product) => {
    content += `## ${product.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}\n\n`
    docs.forEach(doc => {
      // Remove the H2 heading if it exists
      const withoutH2 = doc.replace(/^##\s+.*\n/, "")
      content += withoutH2 + "\n\n"
    })
  })

  const outputPath = path.join(DOCS_DIR, "rate_limits.md")
  fs.writeFileSync(outputPath, content)
  console.log(`  ✅ Created: ${outputPath}`)
}

// Create consolidated authentication.md
function createAuthenticationDoc(authDocs) {
  console.log("\x1b[34m%s\x1b[0m", "📝 Creating authentication.md...")

  let content = "# Authentication\n\n"
  content += "BingX API uses API keys and signatures for authentication.\n\n"
  content += "## Overview\n\n"
  content += "- All private endpoints require authentication using API keys\n"
  content += "- Public endpoints do not require API key signatures\n"
  content += "- API keys can be created in your BingX account settings\n\n"

  // Group by product
  const byProduct = new Map()

  authDocs.forEach(({ file, content: docContent }) => {
    const relativePath = path.relative(DOCS_DIR, file)
    const pathParts = relativePath.split(path.sep)
    const product = pathParts[0] || "general"

    if (!byProduct.has(product)) {
      byProduct.set(product, [])
    }
    byProduct.get(product).push(docContent)
  })

  // Add each product's auth info
  byProduct.forEach((docs, product) => {
    content += `## ${product.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}\n\n`
    docs.forEach(doc => {
      const withoutH2 = doc.replace(/^##\s+.*\n/, "")
      content += withoutH2 + "\n\n"
    })
  })

  const outputPath = path.join(DOCS_DIR, "authentication.md")
  fs.writeFileSync(outputPath, content)
  console.log(`  ✅ Created: ${outputPath}`)
}

// Create consolidated network_connectivity.md
function createNetworkConnectivityDoc(networkDocs) {
  console.log("\x1b[34m%s\x1b[0m", "📝 Creating network_connectivity.md...")

  let content = "# Network Connectivity\n\n"
  content += "This document describes the base URLs and connectivity information for BingX APIs.\n\n"
  content += "## Base URLs\n\n"
  content += "- Production API: `https://open-api.bingx.com`\n"
  content += "- WebSocket: `wss://open-api-ws.bingx.com`\n\n"

  // Group by product
  const byProduct = new Map()

  networkDocs.forEach(({ file, content: docContent }) => {
    const relativePath = path.relative(DOCS_DIR, file)
    const pathParts = relativePath.split(path.sep)
    const product = pathParts[0] || "general"

    if (!byProduct.has(product)) {
      byProduct.set(product, [])
    }
    byProduct.get(product).push(docContent)
  })

  // Add each product's network info
  byProduct.forEach((docs, product) => {
    content += `## ${product.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}\n\n`
    docs.forEach(doc => {
      const withoutH2 = doc.replace(/^##\s+.*\n/, "")
      content += withoutH2 + "\n\n"
    })
  })

  const outputPath = path.join(DOCS_DIR, "network_connectivity.md")
  fs.writeFileSync(outputPath, content)
  console.log(`  ✅ Created: ${outputPath}`)
}

// Create error_codes.md
function createErrorCodesDoc(errorCodes) {
  console.log("\x1b[34m%s\x1b[0m", "📝 Creating error_codes.md...")

  let content = "# Error Codes\n\n"
  content += "This document lists all error codes that may be returned by BingX APIs.\n\n"
  content += "| Error Code | Description |\n"
  content += "| ---------- | ----------- |\n"

  // Sort error codes numerically
  const sortedErrors = Array.from(errorCodes.entries()).sort((a, b) => {
    const numA = parseInt(a[0])
    const numB = parseInt(b[0])
    if (isNaN(numA) || isNaN(numB)) return a[0].localeCompare(b[0])
    return numA - numB
  })

  sortedErrors.forEach(([code, description]) => {
    content += `| ${code} | ${description} |\n`
  })

  const outputPath = path.join(DOCS_DIR, "error_codes.md")
  fs.writeFileSync(outputPath, content)
  console.log(`  ✅ Created: ${outputPath}`)
}

// Create response_formats.md
function createResponseFormatsDoc() {
  console.log("\x1b[34m%s\x1b[0m", "📝 Creating response_formats.md...")

  let content = "# Response Formats\n\n"
  content += "BingX APIs return responses in JSON format.\n\n"
  content += "## Common Response Structure\n\n"
  content += "Most BingX API endpoints return responses with the following structure:\n\n"
  content += "```json\n"
  content += "{\n"
  content += '  "code": 0,\n'
  content += '  "msg": "success",\n'
  content += '  "data": { ... }\n'
  content += "}\n"
  content += "```\n\n"
  content += "### Success Response\n\n"
  content += "- `code`: `0` for success\n"
  content += "- `msg`: Success message, typically `\"success\"`\n"
  content += "- `data`: Response data (structure varies by endpoint)\n\n"
  content += "### Error Response\n\n"
  content += "- `code`: Non-zero error code\n"
  content += "- `msg`: Error message describing what went wrong\n\n"
  content += "## Data Types\n\n"
  content += "### Timestamps\n\n"
  content += "- All timestamps are in milliseconds (Unix epoch time in milliseconds)\n"
  content += "- Example: `1640000000000` represents 2021-12-20 13:46:40 UTC\n\n"
  content += "### Numbers\n\n"
  content += "- Prices and quantities are often returned as strings to preserve precision\n"
  content += "- Always parse these as decimal/float types in your application\n\n"
  content += "## Pagination\n\n"
  content += "Some endpoints support pagination using the following parameters:\n\n"
  content += "- `limit`: Maximum number of results to return\n"
  content += "- `orderId` or `timestamp`: Cursor for pagination\n\n"

  const outputPath = path.join(DOCS_DIR, "response_formats.md")
  fs.writeFileSync(outputPath, content)
  console.log(`  ✅ Created: ${outputPath}`)
}

// Find and copy change_log.md
function copyChangeLog() {
  console.log("\x1b[34m%s\x1b[0m", "📝 Looking for change_log.md...")

  const coreDir = path.join(DOCS_DIR, "core")
  const changeLogFiles = findFiles(coreDir).filter(f =>
    path.basename(f).toLowerCase().includes("change")
  )

  if (changeLogFiles.length > 0) {
    // Use the first change log found
    const sourceFile = changeLogFiles[0]
    const content = fs.readFileSync(sourceFile, "utf8")
    const outputPath = path.join(DOCS_DIR, "change_log.md")
    fs.writeFileSync(outputPath, content)
    console.log(`  ✅ Copied change_log.md from ${path.basename(sourceFile)}`)
  } else {
    console.log("  ⚠️  No change_log.md found in core docs")
  }
}

async function main() {
  console.log("\x1b[36m%s\x1b[0m", "🚀 BingX Core Documentation Consolidation")
  console.log("\x1b[36m%s\x1b[0m", "=" .repeat(50))

  // Step 1: Extract error codes from all endpoints
  const errorCodes = extractErrorCodes()

  // Step 2: Consolidate core documentation by category
  const coreCategories = consolidateCoreByCategory()

  // Step 3: Create consolidated core documentation files
  if (coreCategories.rate_limits.length > 0) {
    createRateLimitsDoc(coreCategories.rate_limits)
  } else {
    console.log("  ⚠️  No rate limit docs found")
  }

  if (coreCategories.authentication.length > 0) {
    createAuthenticationDoc(coreCategories.authentication)
  } else {
    console.log("  ⚠️  No authentication docs found")
  }

  if (coreCategories.network_connectivity.length > 0) {
    createNetworkConnectivityDoc(coreCategories.network_connectivity)
  } else {
    console.log("  ⚠️  No network connectivity docs found")
  }

  createErrorCodesDoc(errorCodes)
  createResponseFormatsDoc()
  copyChangeLog()

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
    if (fs.existsSync(filePath)) {
      await formatMarkdown(filePath)
      console.log(`  ✅ Formatted: ${file}`)
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
