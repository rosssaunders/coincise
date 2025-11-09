/**
 * KuCoin Exchange - Endpoint Documentation Extraction
 * Extracts individual endpoint documentation from OpenAPI specifications
 */
"use strict"

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import fetch from "node-fetch"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const OUTPUT_DIR = path.resolve(__dirname, "../../../docs/kucoin/endpoints")
const GITHUB_BASE =
  "https://raw.githubusercontent.com/Kucoin/kucoin-universal-sdk/main"

// OpenAPI spec URLs
const SPEC_URLS = {
  spot: [
    `${GITHUB_BASE}/spec/rest/api/openapi-spot-market.json`,
    `${GITHUB_BASE}/spec/rest/api/openapi-spot-order.json`
  ],
  futures: [
    `${GITHUB_BASE}/spec/rest/api/openapi-futures-market.json`,
    `${GITHUB_BASE}/spec/rest/api/openapi-futures-order.json`,
    `${GITHUB_BASE}/spec/rest/api/openapi-futures-positions.json`,
    `${GITHUB_BASE}/spec/rest/api/openapi-futures-fundingfees.json`
  ],
  margin: [
    `${GITHUB_BASE}/spec/rest/api/openapi-margin-market.json`,
    `${GITHUB_BASE}/spec/rest/api/openapi-margin-order.json`,
    `${GITHUB_BASE}/spec/rest/api/openapi-margin-credit.json`,
    `${GITHUB_BASE}/spec/rest/api/openapi-margin-debit.json`,
    `${GITHUB_BASE}/spec/rest/api/openapi-margin-risklimit.json`
  ]
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
  const methodLower = method.toLowerCase()
  const pathPart = sanitizeFilename(
    endpointPath.replace(/^\//, "").replace(/\//g, "_")
  )
  return `${methodLower}_${pathPart}.md`
}

/**
 * Determine if endpoint is public or private based on security requirements
 */
const isPublicEndpoint = operation => {
  // Check for KuCoin-specific extension field
  if (operation["x-api-channel"]) {
    return operation["x-api-channel"].toLowerCase() !== "private"
  }

  // Fallback: Check if the operation has security requirements
  if (!operation.security || operation.security.length === 0) {
    return true
  }

  // Check if any security requirement is defined
  for (const secReq of operation.security) {
    if (Object.keys(secReq).length > 0) {
      return false // Has security requirements, so it's private
    }
  }

  return true // No actual security requirements
}

/**
 * Convert OpenAPI parameter object to markdown table row
 */
const parameterToMarkdown = param => {
  const name = param.name || ""
  const required = param.required ? "required" : "optional"
  const type = param.schema?.type || param.type || "string"
  const description = param.description || ""

  return `| ${name} | ${required} | ${type} | ${description} |`
}

/**
 * Convert OpenAPI schema properties to markdown table with nested object support
 */
const schemaPropertiesToMarkdown = (schema, prefix = "") => {
  if (!schema || !schema.properties) {
    return ""
  }

  const required = schema.required || []
  let table = ""

  // Only add header if this is the top-level call
  if (prefix === "") {
    table = "| Parameter | Required | Type | Description |\n"
    table += "|-----------|----------|------|-------------|\n"
  }

  for (const [propName, propSchema] of Object.entries(schema.properties)) {
    const isRequired = required.includes(propName)
    const type = propSchema.type || "string"
    const description = propSchema.description || ""
    const fullName = prefix ? `${prefix}.${propName}` : propName

    table += `| ${fullName} | ${isRequired ? "required" : "optional"} | ${type} | ${description} |\n`

    // Recursively handle nested objects
    if (propSchema.type === "object" && propSchema.properties) {
      table += schemaPropertiesToMarkdown(propSchema, fullName)
    }

    // Handle arrays of objects
    if (propSchema.type === "array" && propSchema.items) {
      if (propSchema.items.type === "object" && propSchema.items.properties) {
        table += schemaPropertiesToMarkdown(propSchema.items, `${fullName}[]`)
      }
    }
  }

  return table
}

/**
 * Generate markdown documentation for an endpoint
 */
const generateEndpointMarkdown = (
  method,
  endpointPath,
  operation,
  isPublic
) => {
  const sourceUrl = `https://www.kucoin.com/docs/rest/${endpointPath}`

  let markdown = `# ${method.toUpperCase()} ${endpointPath}\n\n`
  markdown += `**Source:** [${endpointPath}](${sourceUrl})\n\n`

  // Authentication section
  markdown += `## Authentication\n\n`
  markdown += isPublic
    ? "Not Required (Public Endpoint)\n\n"
    : "Required (Private Endpoint)\n\n"

  // Description
  if (operation.summary) {
    markdown += `## Description\n\n${operation.summary}\n\n`
  }

  if (operation.description && operation.description !== operation.summary) {
    markdown += `${operation.description}\n\n`
  }

  // Parameters
  if (operation.parameters && operation.parameters.length > 0) {
    markdown += `## Parameters\n\n`
    markdown += `| Parameter | Required | Type | Description |\n`
    markdown += `|-----------|----------|------|-------------|\n`

    for (const param of operation.parameters) {
      markdown += parameterToMarkdown(param) + "\n"
    }

    markdown += "\n"
  }

  // Request Body
  if (operation.requestBody) {
    markdown += `## Request Body\n\n`

    const content = operation.requestBody.content
    if (content && content["application/json"]) {
      const schema = content["application/json"].schema

      if (schema.properties) {
        markdown += schemaPropertiesToMarkdown(schema)
      } else if (schema.example) {
        markdown += "Example:\n\n```json\n"
        markdown += JSON.stringify(schema.example, null, 2)
        markdown += "\n```\n"
      }
    }

    markdown += "\n"
  }

  // Responses
  if (operation.responses) {
    markdown += `## Responses\n\n`

    for (const [statusCode, response] of Object.entries(operation.responses)) {
      markdown += `### ${statusCode}\n\n`

      if (response.description) {
        markdown += `${response.description}\n\n`
      }

      if (response.content && response.content["application/json"]) {
        const schema = response.content["application/json"].schema

        if (schema.example) {
          markdown += "Example:\n\n```json\n"
          markdown += JSON.stringify(schema.example, null, 2)
          markdown += "\n```\n\n"
        } else if (schema.properties) {
          markdown += schemaPropertiesToMarkdown(schema)
          markdown += "\n"
        }
      }
    }
  }

  return markdown
}

/**
 * Fetch and parse OpenAPI specification
 */
const fetchOpenAPISpec = async url => {
  console.log(`Fetching OpenAPI spec from ${url}...`)

  try {
    const response = await fetch(url)

    if (!response.ok) {
      console.warn(`⚠️  Failed to fetch ${url}: ${response.statusText}`)
      return null
    }

    const spec = await response.json()
    return spec
  } catch (error) {
    console.error(`❌ Error fetching ${url}:`, error.message)
    return null
  }
}

/**
 * Extract endpoints from OpenAPI specification
 */
const extractEndpointsFromSpec = spec => {
  const endpoints = {
    public: [],
    private: []
  }

  if (!spec || !spec.paths) {
    return endpoints
  }

  for (const [path, pathItem] of Object.entries(spec.paths)) {
    for (const [method, operation] of Object.entries(pathItem)) {
      // Skip non-operation properties
      if (
        !["get", "post", "put", "delete", "patch"].includes(
          method.toLowerCase()
        )
      ) {
        continue
      }

      const isPublic = isPublicEndpoint(operation)
      const endpoint = {
        method: method.toUpperCase(),
        path,
        operation,
        isPublic
      }

      if (isPublic) {
        endpoints.public.push(endpoint)
      } else {
        endpoints.private.push(endpoint)
      }
    }
  }

  return endpoints
}

/**
 * Process and save endpoint documentation
 */
const processEndpoint = endpoint => {
  const { method, path: endpointPath, operation, isPublic } = endpoint

  // Generate markdown
  const markdown = generateEndpointMarkdown(
    method,
    endpointPath,
    operation,
    isPublic
  )

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
  console.log("🚀 Starting KuCoin endpoint documentation extraction...")
  console.log(`📍 Source: KuCoin OpenAPI Specifications`)
  console.log(`📁 Output: ${OUTPUT_DIR}`)

  // Ensure output directories exist
  ensureDir(path.join(OUTPUT_DIR, "public"))
  ensureDir(path.join(OUTPUT_DIR, "private"))

  let totalPublic = 0
  let totalPrivate = 0

  // Process each category of specs
  for (const [category, urls] of Object.entries(SPEC_URLS)) {
    console.log(`\n📦 Processing ${category} endpoints...`)

    for (const url of urls) {
      const spec = await fetchOpenAPISpec(url)

      if (!spec) {
        continue
      }

      const endpoints = extractEndpointsFromSpec(spec)

      console.log(
        `  Found ${endpoints.public.length} public and ${endpoints.private.length} private endpoints`
      )

      // Process public endpoints
      if (endpoints.public.length > 0) {
        console.log(`  Processing public endpoints...`)
        for (const endpoint of endpoints.public) {
          processEndpoint(endpoint)
          totalPublic++
        }
      }

      // Process private endpoints
      if (endpoints.private.length > 0) {
        console.log(`  Processing private endpoints...`)
        for (const endpoint of endpoints.private) {
          processEndpoint(endpoint)
          totalPrivate++
        }
      }
    }
  }

  console.log(`\n✅ Endpoint documentation extraction completed successfully!`)
  console.log(`📁 Files written to: ${OUTPUT_DIR}`)
  console.log(`   - Public endpoints: ${totalPublic}`)
  console.log(`   - Private endpoints: ${totalPrivate}`)
  console.log(`   - Total endpoints: ${totalPublic + totalPrivate}`)
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
