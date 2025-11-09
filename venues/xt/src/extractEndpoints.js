/**
 * XT.com Exchange - Endpoint Documentation Extraction
 * Extracts individual endpoint documentation from Docusaurus-based API docs
 */
"use strict"

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { launchBrowser, configurePage } from "../../shared/puppeteer.js"
import { createTurndownBuilder } from "../../shared/turndown.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BASE_URL = "https://doc.xt.com/docs/spot"
const OUTPUT_DIR = path.resolve(__dirname, "../../../docs/xt/endpoints")

// Delay between requests to avoid overwhelming the server (in milliseconds)
const REQUEST_DELAY_MS = 500

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
 * Generate filename from endpoint name
 */
const generateFilename = (method, name) => {
  const methodLower = method.toLowerCase()
  const namePart = sanitizeFilename(name)
  return `${methodLower}_${namePart}.md`
}

/**
 * Determine if endpoint requires authentication based on content
 */
const isPrivateEndpoint = content => {
  // Check for authentication headers commonly used by XT.com
  const hasValidateSignature = content.includes("validate-signature")
  const hasValidateTimestamp = content.includes("validate-timestamp")
  const hasValidateAppkey = content.includes("validate-appkey")
  const hasAuthHeaders =
    hasValidateSignature || hasValidateTimestamp || hasValidateAppkey

  // Check for rate limit patterns that indicate API key is required
  const hasApiKeyRateLimit =
    content.includes("/apikey") || content.includes("/apiKey")

  // Also check for explicit authentication requirement mentions
  const hasAuthMention =
    content.toLowerCase().includes("authentication required") ||
    content.toLowerCase().includes("need to sign") ||
    content.toLowerCase().includes("signature required")

  return hasAuthHeaders || hasAuthMention || hasApiKeyRateLimit
}

/**
 * Extract response parameters from JSON example
 */
const extractResponseParameters = content => {
  // Find the response example section - use simpler regex that works with template literals
  const responseMatch = content.match(
    /Response Example[^`]*```[^\n]*\n([\s\S]*?)```/i
  )
  if (!responseMatch) return null

  const originalJson = responseMatch[1]
  let jsonText = originalJson.trim()

  // Remove inline comments (e.g., //symbol)
  jsonText = jsonText.replace(/\/\/.*$/gm, "")

  try {
    const jsonObj = JSON.parse(jsonText)
    const params = []

    const extractParams = (obj, prefix = "") => {
      for (const key in obj) {
        const fullKey = prefix ? `${prefix}.${key}` : key
        const value = obj[key]
        const type = Array.isArray(value) ? "array" : typeof value

        // Determine description from inline comments if available (restrict to same line)
        let description = ""
        const commentMatch = originalJson.match(
          new RegExp(`"${key}"[^\\n]*//\\s*(.+?)$`, "m")
        )
        if (commentMatch) {
          description = commentMatch[1].trim()
        }

        params.push({ param: fullKey, type, description })

        // Recursively extract nested objects (but not arrays)
        if (value && typeof value === "object" && !Array.isArray(value)) {
          extractParams(value, fullKey)
        }
      }
    }

    extractParams(jsonObj)
    return params
  } catch (e) {
    return null
  }
}

/**
 * Post-process markdown content to conform to standard format
 */
const postProcessMarkdown = (markdown, method, path, isPrivate) => {
  let processed = markdown

  // Remove navigation anchors like [​](#description "Direct link to Description")
  processed = processed.replace(/\[​\]\(#[^)]+\)/g, "")

  // Remove "Edit this page" links
  processed = processed.replace(/\[Edit this page\]\([^)]+\)/g, "")

  // Remove horizontal rules
  processed = processed.replace(/^---+$/gm, "")

  // Fix section headings and standardize structure
  const sections = []
  let currentSection = { title: "", content: "" }

  const lines = processed.split("\n")
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Check if this is a heading
    if (line.match(/^#{1,6}\s+/)) {
      if (currentSection.content.trim()) {
        sections.push({ ...currentSection })
      }
      currentSection = { title: line, content: "" }
    } else {
      currentSection.content += line + "\n"
    }
    i++
  }

  if (currentSection.content.trim() || currentSection.title) {
    sections.push(currentSection)
  }

  // Rebuild document in standard format
  let output = ""

  // Process sections and reorder/rename them
  let description = ""
  let rateLimit = ""
  let httpRequest = path ? `\`${method} ${path}\`` : ""
  let requestParams = ""
  let requestExample = ""
  let responseParams = ""
  let responseExample = ""

  sections.forEach(section => {
    const heading = section.title.toLowerCase()
    let content = section.content.trim()

    if (
      heading.includes("description") ||
      heading.includes("full ticker") ||
      heading.includes("submit order") ||
      heading.includes("query") ||
      heading.includes("cancel")
    ) {
      // Extract description - clean up any path/method info
      if (content) {
        // Remove Type and Description fields that show the path
        content = content.replace(/\*\*Type:?\*\*[^\n]*\n?/gi, "")
        content = content.replace(/\*\*Description:?\*\*[^\n]*\n?/gi, "")
        content = content.replace(
          /\*\*(GET|POST|PUT|DELETE|PATCH)\*\*\s+`[^`]+`\s*/gi,
          ""
        )
        content = content.trim()
        if (content) {
          description = content
        }
      }
      // Try to extract HTTP request from description if not already found
      if (!httpRequest && section.content) {
        const pathMatch = section.content.match(
          /\*\*([A-Z]+)\*\*\s+`(\/v4\/[^`]+)`/
        )
        if (pathMatch) {
          httpRequest = `\`${pathMatch[1]} ${pathMatch[2]}\``
        }
      }
    } else if (
      heading.includes("limit") ||
      heading.includes("flow rule") ||
      heading.includes("remark")
    ) {
      rateLimit = content
    } else if (heading.includes("parameter") && !heading.includes("example")) {
      requestParams = content
    } else if (heading.includes("request") && heading.includes("example")) {
      // Remove "Request" label that sometimes appears
      content = content.replace(/^Request\s*\n+/i, "")
      requestExample = content
      // Remove untagged code blocks and add bash tag
      requestExample = requestExample.replace(/```\s*\n/g, "```bash\n")
    } else if (heading.includes("response") && heading.includes("example")) {
      // Remove "Response" label that sometimes appears
      content = content.replace(/^Response\s*\n+/i, "")
      responseExample = content
      // Remove untagged code blocks and add json tag, also remove inline comments
      responseExample = responseExample.replace(/```\s*\n/g, "```json\n")
      // Remove inline comments and clean up trailing whitespace
      responseExample = responseExample.replace(/,?\s*\/\/.*$/gm, ",")
      responseExample = responseExample.replace(/,(\s*[\]}])/g, "$1")
    }
  })

  // Add Description section
  if (description) {
    output += "## Description\n\n"
    output += description + "\n\n"
  } else {
    output += "## Description\n\n"
    output += `This endpoint ${method === "GET" ? "retrieves" : "performs"} operations on ${path || "the resource"}.\n\n`
  }

  // Add Authentication section
  output += "## Authentication\n\n"
  output += isPrivate
    ? "Required (Private Endpoint)\n\n"
    : "Not Required (Public Endpoint)\n\n"

  // Add Rate Limit section
  if (rateLimit) {
    output += "## Rate Limit\n\n"
    output += rateLimit + "\n\n"
  }

  // Add HTTP Request section
  if (httpRequest) {
    output += "## HTTP Request\n\n"
    output += httpRequest + "\n\n"
  }

  // Add Request Parameters section
  if (requestParams) {
    output += "## Request Parameters\n\n"
    // Fix table headers to include "Required" column
    let params = requestParams
    // Check if the table has "mandatory" or "Mandatory" and replace with "Required"
    params = params.replace(/\|\s*mandatory\s*\|/gi, "| Required |")
    params = params.replace(/\|\s*true\s*\|/g, "| Yes |")
    params = params.replace(/\|\s*false\s*\|/g, "| No |")
    output += params + "\n\n"
  }

  // Add Request Example section
  if (requestExample) {
    output += "## Request Example\n\n"
    output += requestExample + "\n\n"
  }

  // Try to extract response parameters from the response example
  if (responseExample && !responseParams) {
    const extractedParams = extractResponseParameters(processed)
    if (extractedParams && extractedParams.length > 0) {
      responseParams = "| Parameter | Type | Description |\n"
      responseParams += "| --- | --- | --- |\n"
      extractedParams.forEach(p => {
        responseParams += `| ${p.param} | ${p.type} | ${p.description || "-"} |\n`
      })
    }
  }

  // Add Response Parameters section
  if (responseParams) {
    output += "## Response Parameters\n\n"
    output += responseParams + "\n\n"
  }

  // Add Response Example section
  if (responseExample) {
    output += "## Response Example\n\n"
    output += responseExample + "\n\n"
  }

  return output.trim()
}

/**
 * Write endpoints to files
 */
const writeEndpoints = endpoints => {
  console.log("\nWriting endpoint files...")

  const publicDir = path.join(OUTPUT_DIR, "public")
  const privateDir = path.join(OUTPUT_DIR, "private")

  ensureDir(publicDir)
  ensureDir(privateDir)

  let publicCount = 0
  let privateCount = 0

  endpoints.forEach(endpoint => {
    const isPrivate = isPrivateEndpoint(endpoint.content)
    const dir = isPrivate ? privateDir : publicDir
    const filename = generateFilename(endpoint.method, endpoint.name)
    const filePath = path.join(dir, filename)

    // Post-process the markdown content
    const processedContent = postProcessMarkdown(
      endpoint.content,
      endpoint.method,
      endpoint.path,
      isPrivate
    )

    // Build the final document with proper H1 title
    const title = endpoint.path
      ? `# ${endpoint.method} ${endpoint.path}`
      : `# ${endpoint.method} ${endpoint.name}`

    const contentWithMetadata = `${title}

**Source:** [${endpoint.sourceUrl}](${endpoint.sourceUrl})

${processedContent}`

    writeFile(filePath, contentWithMetadata)

    if (isPrivate) {
      privateCount++
    } else {
      publicCount++
    }
  })

  console.log(`\n✅ Written ${publicCount} public endpoints`)
  console.log(`✅ Written ${privateCount} private endpoints`)
  console.log(`✅ Total: ${endpoints.length} endpoints`)
}

/**
 * Main extraction function
 */
const main = async () => {
  console.log("Starting endpoint documentation extraction for XT.com...\n")

  const browser = await launchBrowser()
  const page = await browser.newPage()
  await configurePage(page)

  const turndownService = createTurndownBuilder().build()

  try {
    const endpoints = await extractEndpoints(page, turndownService)
    writeEndpoints(endpoints)

    console.log("\n✅ Endpoint documentation extraction completed successfully")
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
