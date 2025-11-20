/**
 * Bullish Exchange - Endpoint Documentation Extraction
 * Extracts individual endpoint documentation from OpenAPI specification
 */
"use strict"

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import process from "process"
import { formatMarkdown } from "../../shared/format-markdown.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const SPEC_URL = "https://raw.githubusercontent.com/bullish-exchange/api-docs/master/src/trading-api/current/bullish-trading-api.yml"
const OUTPUT_DIR = path.resolve(__dirname, "../../../docs/bullish")
const PUBLIC_DIR = path.join(OUTPUT_DIR, "endpoints", "public")
const PRIVATE_DIR = path.join(OUTPUT_DIR, "endpoints", "private")

/**
 * Ensure directory exists
 */
const ensureDir = dirPath => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

/**
 * Write content to file and format it
 */
const writeFile = async (filePath, content) => {
  fs.writeFileSync(filePath, content, "utf8")
  await formatMarkdown(filePath)
}

/**
 * Download OpenAPI spec
 */
/**
 * Read local OpenAPI spec
 */
const readLocalSpec = () => {
  const specPath = path.resolve(__dirname, "../bullish-api-doc.json")
  console.log(`Reading OpenAPI spec from ${specPath}...`)
  const content = fs.readFileSync(specPath, "utf8")
  return JSON.parse(content)
}

/**
 * Sanitize endpoint path for filename
 */
const sanitizeFilename = str => {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
}

/**
 * Check if endpoint requires authentication
 */
const isAuthRequired = operation => {
  // Check if the operation has security requirements
  if (operation.security && operation.security.length > 0) {
    return true
  }

  // Check tags for authentication indicators
  if (operation.tags) {
    const tags = operation.tags.map(t => t.toLowerCase())
    if (tags.some(t => t.includes("private") || t.includes("authenticated"))) {
      return true
    }
    if (tags.some(t => t.includes("public") || t.includes("unauthenticated"))) {
      return false
    }
  }

  // Default to checking if JWT bearer token is required
  return false
}

/**
 * Resolve $ref in schema
 */
const resolveSchema = (schema, spec) => {
  if (!schema) return schema

  // Handle $ref
  if (schema.$ref) {
    const refPath = schema.$ref.replace(/^#\//, "").split("/")
    let resolved = spec
    for (const part of refPath) {
      resolved = resolved?.[part]
    }
    // Recursively resolve the found schema
    return resolveSchema(resolved, spec)
  }

  // Handle arrays
  if (schema.type === "array" && schema.items) {
    return {
      ...schema,
      items: resolveSchema(schema.items, spec)
    }
  }

  // Handle objects with properties
  if (schema.properties) {
    const resolvedProperties = {}
    for (const [key, value] of Object.entries(schema.properties)) {
      resolvedProperties[key] = resolveSchema(value, spec)
    }
    return {
      ...schema,
      properties: resolvedProperties
    }
  }

  // Handle allOf (merge properties)
  if (schema.allOf) {
    let mergedSchema = {}
    for (const item of schema.allOf) {
      const resolvedItem = resolveSchema(item, spec)
      mergedSchema = {
        ...mergedSchema,
        ...resolvedItem,
        properties: {
          ...mergedSchema.properties,
          ...resolvedItem.properties
        }
      }
    }
    delete mergedSchema.allOf
    return mergedSchema
  }

  return schema
}

/**
 * Convert JSON schema to markdown table
 */
const schemaToMarkdownTable = (schema, requiredFields = []) => {
  if (!schema || !schema.properties) {
    return "```json\n" + JSON.stringify(schema, null, 2) + "\n```\n\n"
  }

  let markdown = "| Field | Type | Required | Description |\n"
  markdown += "|-------|------|----------|-------------|\n"

  for (const [fieldName, fieldSchema] of Object.entries(schema.properties)) {
    const isRequired = requiredFields.includes(fieldName) ? "Yes" : "No"
    let type = fieldSchema.type || "object"
    
    // Handle array types
    if (type === "array" && fieldSchema.items) {
      const itemType = fieldSchema.items.type || "object"
      type = `array[${itemType}]`
    }

    // Get description and example
    const description = fieldSchema.description || ""
    const example = fieldSchema.example !== undefined 
      ? `<br>**Example:** \`${JSON.stringify(fieldSchema.example)}\``
      : ""
    
    // Handle deprecated fields
    const deprecated = fieldSchema.deprecated ? " ⚠️ *Deprecated*" : ""
    
    const fullDescription = (description + example + deprecated)
      .replace(/\n/g, " ")
      .replace(/\|/g, "\\|")

    markdown += `| ${fieldName} | ${type} | ${isRequired} | ${fullDescription} |\n`
  }

  markdown += "\n"
  return markdown
}

/**
 * Format parameter information
 */
const formatParameters = parameters => {
  if (!parameters || parameters.length === 0) {
    return "No parameters required.\n"
  }

  let markdown = "| Parameter | In | Type | Required | Description |\n"
  markdown += "|-----------|-----|------|----------|-------------|\n"

  parameters.forEach(param => {
    const name = param.name || ""
    const inLocation = param.in || ""
    const type = param.schema?.type || param.type || "string"
    const required = param.required ? "Yes" : "No"
    const description = (param.description || "")
      .replace(/\\/g, "\\\\") // Escape backslashes first
      .replace(/\n/g, " ")
      .replace(/\|/g, "\\|")

    markdown += `| ${name} | ${inLocation} | ${type} | ${required} | ${description} |\n`
  })

  return markdown + "\n"
}

/**
 * Format request body information
 */
const formatRequestBody = (requestBody, spec) => {
  if (!requestBody) {
    return ""
  }

  let markdown = "## Request Body\n\n"

  if (requestBody.description) {
    markdown += `${requestBody.description}\n\n`
  }

  if (requestBody.required) {
    markdown += "**Required**: Yes\n\n"
  }

  if (requestBody.content) {
    for (const [contentType, content] of Object.entries(requestBody.content)) {
      markdown += `### Content-Type: ${contentType}\n\n`

      if (content.schema) {
        const resolvedSchema = resolveSchema(content.schema, spec)
        markdown += schemaToMarkdownTable(resolvedSchema, resolvedSchema.required || [])
      }

      if (content.example) {
        markdown += "**Example**:\n\n"
        markdown += "```json\n"
        markdown += JSON.stringify(content.example, null, 2)
        markdown += "\n```\n\n"
      }
    }
  }

  return markdown
}

/**
 * Format response information
 */
const formatResponses = (responses, spec) => {
  if (!responses) {
    return ""
  }

  let markdown = "## Responses\n\n"

  for (const [statusCode, response] of Object.entries(responses)) {
    markdown += `### ${statusCode} - ${response.description || "Response"}\n\n`

    if (response.content) {
      for (const [contentType, content] of Object.entries(response.content)) {
        markdown += `**Content-Type**: ${contentType}\n\n`

        if (content.schema) {
          const resolvedSchema = resolveSchema(content.schema, spec)
          markdown += schemaToMarkdownTable(resolvedSchema, resolvedSchema.required || [])
        }

        if (content.example) {
          markdown += "**Example**:\n\n"
          markdown += "```json\n"
          markdown += JSON.stringify(content.example, null, 2)
          markdown += "\n```\n\n"
        }
      }
    }
  }

  return markdown
}

/**
 * Extract endpoint documentation
 */
const extractEndpoint = (endpointPath, method, operation, spec) => {
  const methodUpper = method.toUpperCase()
  const summary = operation.summary || ""
  const description = operation.description || ""
  const operationId = operation.operationId || ""
  const tags = operation.tags ? operation.tags.join(", ") : ""

  // Build markdown content
  let markdown = `# ${methodUpper} ${endpointPath}\n\n`

  if (summary) {
    markdown += `**Summary**: ${summary}\n\n`
  }

  if (description) {
    markdown += `## Description\n\n${description}\n\n`
  }

  if (operationId) {
    markdown += `**Operation ID**: ${operationId}\n\n`
  }

  if (tags) {
    markdown += `**Tags**: ${tags}\n\n`
  }

  markdown += `**Endpoint**: \`${methodUpper} ${endpointPath}\`\n\n`

  // Authentication
  const authRequired = isAuthRequired(operation)
  markdown += `**Authentication Required**: ${authRequired ? "Yes" : "No"}\n\n`

  // Parameters
  if (operation.parameters && operation.parameters.length > 0) {
    markdown += "## Parameters\n\n"
    markdown += formatParameters(operation.parameters)
  }

  // Request Body
  if (operation.requestBody) {
    markdown += formatRequestBody(operation.requestBody, spec)
  }

  // Responses
  if (operation.responses) {
    markdown += formatResponses(operation.responses, spec)
  }

  return {
    markdown,
    isPublic: !authRequired,
    filename: `${method}_${sanitizeFilename(endpointPath)}.md`
  }
}

/**
 * Process all endpoints from spec
 */
const processEndpoints = async spec => {
  console.log("Processing endpoints...")

  let publicCount = 0
  let privateCount = 0

  for (const [endpointPath, pathItem] of Object.entries(spec.paths)) {
    // Process each HTTP method
    const methods = ["get", "post", "put", "delete", "patch", "options", "head"]

    for (const method of methods) {
      if (pathItem[method]) {
        const operation = pathItem[method]
        const endpoint = extractEndpoint(endpointPath, method, operation, spec)

        // Determine output directory
        const outputDir = endpoint.isPublic ? PUBLIC_DIR : PRIVATE_DIR
        const filePath = path.join(outputDir, endpoint.filename)

        // Write endpoint file
        await writeFile(filePath, endpoint.markdown)

        if (endpoint.isPublic) {
          publicCount++
        } else {
          privateCount++
        }
      }
    }
  }

  console.log(`✅ Processed ${publicCount} public endpoints`)
  console.log(`✅ Processed ${privateCount} private endpoints`)
}

/**
 * Main extraction function
 */
const main = async () => {
  console.log("Starting endpoint documentation extraction for Bullish...")

  try {
    // Ensure output directories exist
    ensureDir(PUBLIC_DIR)
    ensureDir(PRIVATE_DIR)

    // Read local OpenAPI spec
    const spec = readLocalSpec()

    // Process all endpoints
    await processEndpoints(spec)

    console.log("✅ Endpoint documentation extraction completed successfully")
  } catch (error) {
    console.error("Error during extraction:", error)
    throw error
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
