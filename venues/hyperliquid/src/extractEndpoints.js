/**
 * Hyperliquid Exchange - Endpoints Documentation Extraction
 * Extracts endpoint documentation from GitBook-based API docs
 */
"use strict"

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { launchBrowser, configurePage } from "../../shared/puppeteer.js"
import { createTurndownBuilder } from "../../shared/turndown.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BASE_URL =
  "https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api"
const OUTPUT_DIR = path.resolve(__dirname, "../../../docs/hyperliquid")

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
  console.log(`Writing ${filePath}...`)
  fs.writeFileSync(filePath, content, "utf8")
  console.log(`✅ Written ${filePath}`)
}

/**
 * Sanitize filename
 */
const sanitizeFilename = name => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
}

/**
 * Extract endpoints from Info endpoint page
 */
const extractInfoEndpoints = async (page, turndownService) => {
  console.log("Extracting Info endpoints...")

  const url = `${BASE_URL}/info-endpoint`
  await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 })

  const endpoints = await page.evaluate(pageUrl => {
    const results = []
    const h2Headings = document.querySelectorAll("h2")

    h2Headings.forEach(h2 => {
      const endpointName = h2.textContent.trim()

      // Create a container for this endpoint's content
      const contentDiv = document.createElement("div")
      let currentElement = h2.nextElementSibling

      // Collect all content until the next h2 or end
      while (currentElement && currentElement.tagName !== "H2") {
        contentDiv.appendChild(currentElement.cloneNode(true))
        currentElement = currentElement.nextElementSibling
      }

      if (contentDiv.innerHTML.trim()) {
        results.push({
          name: endpointName,
          content: contentDiv.innerHTML,
          sourceUrl: pageUrl
        })
      }
    })

    return results
  }, url)

  return endpoints.map(endpoint => ({
    ...endpoint,
    content: turndownService.turndown(endpoint.content)
  }))
}

/**
 * Extract endpoints from Exchange endpoint page
 */
const extractExchangeEndpoints = async (page, turndownService) => {
  console.log("Extracting Exchange endpoints...")

  const url = `${BASE_URL}/exchange-endpoint`
  await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 })

  const endpoints = await page.evaluate(pageUrl => {
    const results = []
    const h2Headings = document.querySelectorAll("h2")

    h2Headings.forEach(h2 => {
      const endpointName = h2.textContent.trim()

      // Create a container for this endpoint's content
      const contentDiv = document.createElement("div")
      let currentElement = h2.nextElementSibling

      // Collect all content until the next h2 or end
      while (currentElement && currentElement.tagName !== "H2") {
        contentDiv.appendChild(currentElement.cloneNode(true))
        currentElement = currentElement.nextElementSibling
      }

      if (contentDiv.innerHTML.trim()) {
        results.push({
          name: endpointName,
          content: contentDiv.innerHTML,
          sourceUrl: pageUrl
        })
      }
    })

    return results
  }, url)

  return endpoints.map(endpoint => ({
    ...endpoint,
    content: turndownService.turndown(endpoint.content)
  }))
}

/**
 * Extract WebSocket endpoints
 */
const extractWebSocketEndpoints = async (page, turndownService) => {
  console.log("Extracting WebSocket endpoints...")

  const url = `${BASE_URL}/websocket`
  await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 })

  const content = await page.evaluate(() => {
    const mainContent = document.querySelector(
      'main, article, [role="main"], .content'
    )
    if (mainContent) {
      return mainContent.innerHTML
    }
    return ""
  })

  return [
    {
      name: "WebSocket API",
      content: turndownService.turndown(content),
      sourceUrl: url
    }
  ]
}

/**
 * Determine if endpoint is public or private
 */
const classifyEndpoint = (name, content) => {
  const lowerName = name.toLowerCase()
  const lowerContent = content.toLowerCase()

  // Check for authentication-related keywords in content
  const hasAuthKeywords =
    lowerContent.includes("signature") ||
    lowerContent.includes("signing") ||
    lowerContent.includes("private key") ||
    lowerContent.includes("wallet") ||
    lowerContent.includes("authorization")

  // Public endpoints typically include these terms
  const isPublicEndpoint =
    lowerName.includes("retrieve mids") ||
    lowerName.includes("l2 book") ||
    lowerName.includes("candle") ||
    lowerName.includes("snapshot") ||
    (lowerName.includes("websocket") && !hasAuthKeywords)

  // If it's explicitly public, classify as public
  if (isPublicEndpoint) {
    return "public"
  }

  // If it has auth keywords, it's private
  if (hasAuthKeywords) {
    return "private"
  }

  // Default to private for exchange endpoints and authenticated info endpoints
  if (
    lowerName.includes("order") ||
    lowerName.includes("cancel") ||
    lowerName.includes("modify") ||
    lowerName.includes("leverage") ||
    lowerName.includes("transfer") ||
    lowerName.includes("withdraw") ||
    lowerName.includes("user")
  ) {
    return "private"
  }

  // Default to public if uncertain
  return "public"
}

/**
 * Extract HTTP method and path from content
 */
const extractMethodAndPath = content => {
  // Look for POST/GET followed by URL
  const methodMatch = content.match(/`(POST|GET|PUT|DELETE|PATCH)`\s+`([^`]+)`/)
  if (methodMatch) {
    return {
      method: methodMatch[1],
      path: methodMatch[2].replace(/^https?:\/\/[^/]+/, "") // Remove domain
    }
  }
  // Default to POST /info for info endpoints, POST /exchange for exchange endpoints
  return null
}

/**
 * Extract description from content
 */
const extractDescription = (content, endpointName) => {
  // Get the first paragraph after the method line
  const lines = content.split("\n")
  const description = []

  let foundMethod = false
  for (const line of lines) {
    if (line.includes("`POST`") || line.includes("`GET`")) {
      foundMethod = true
      continue
    }
    if (
      foundMethod &&
      line.trim() &&
      !line.startsWith("**") &&
      !line.startsWith("####")
    ) {
      // Stop at sections we don't want
      if (
        line.includes("**Headers**") ||
        line.includes("**Body**") ||
        line.includes("**Response**") ||
        line === "Name" ||
        line === "Value" ||
        line === "Type" ||
        line === "Description" ||
        line.startsWith("[](#") || // GitBook anchor links
        line.toLowerCase() === "headers" ||
        line.toLowerCase() === "body"
      ) {
        break
      }
      description.push(line.trim())
    }
  }

  const result = description.join("\n\n").trim()
  return result || `${endpointName} endpoint`
}

/**
 * Convert parameter text to GFM table
 */
const convertParametersToTable = (
  content,
  sectionName,
  includeRequired = true
) => {
  const lines = content.split("\n")
  let inSection = false
  const params = []
  let currentParam = {}

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()

    // Find section start
    if (line.includes(`**${sectionName}**`)) {
      inSection = true
      continue
    }

    // Stop at next section
    if (
      inSection &&
      (line.startsWith("**") || line.startsWith("####")) &&
      !line.includes("Name") &&
      !line.includes("Type") &&
      !line.includes("Description") &&
      !line.includes("Value")
    ) {
      break
    }

    if (inSection && line) {
      // Skip header rows
      if (
        line === "Name" ||
        line === "Type" ||
        line === "Description" ||
        line === "Value"
      ) {
        continue
      }

      // Collect parameter info - order is Name, Type, Description (or Name, Value for headers)
      if (!currentParam.name) {
        // Check if this looks like a parameter name
        if (line && !line.includes("**") && line.length < 100) {
          currentParam.name = line
          // Check if required (has asterisk or escaped asterisk)
          currentParam.required = line.includes("*") || line.includes("\\*")
        }
      } else if (!currentParam.type) {
        currentParam.type = line
      } else if (!currentParam.description) {
        currentParam.description = line
        // Add the parameter
        if (currentParam.name) {
          params.push({ ...currentParam })
          currentParam = {}
        }
      }
    }
  }

  if (params.length === 0) return ""

  // Generate table
  const headers = includeRequired
    ? "| Parameter | Type | Required | Description |"
    : "| Parameter | Type | Description |"
  const separator = includeRequired
    ? "| --------- | ---- | -------- | ----------- |"
    : "| --------- | ---- | ----------- |"

  const rows = params.map(p => {
    const isRequired = p.required ? "Yes" : "No"
    // Clean name - remove asterisks and escaped characters
    const cleanName = p.name.replace(/\*/g, "").replace(/\\/g, "").trim()
    const cleanType = (p.type || "string").trim()
    const desc = (p.description || "").trim()

    return includeRequired
      ? `| ${cleanName} | ${cleanType} | ${isRequired} | ${desc} |`
      : `| ${cleanName} | ${cleanType} | ${desc} |`
  })

  return `${headers}\n${separator}\n${rows.join("\n")}`
}

/**
 * Fix JSON code blocks
 */
const fixJsonCodeBlocks = content => {
  // Add json tag to code blocks
  return content.replace(/```\n(\s*[{[])/g, "```json\n$1")
}

/**
 * Transform content to standard format
 */
const transformToStandardFormat = (endpoint, category) => {
  const { name, content, sourceUrl } = endpoint

  // Extract components
  const methodPath = extractMethodAndPath(content)
  const description = extractDescription(content, name)

  // Determine method and path
  let method = "POST"
  let path = "/info"
  if (methodPath) {
    method = methodPath.method
    path =
      methodPath.path ||
      (sourceUrl.includes("exchange-endpoint") ? "/exchange" : "/info")
  } else {
    path = sourceUrl.includes("exchange-endpoint") ? "/exchange" : "/info"
  }

  // Build sections
  const sections = []

  // Title
  sections.push(`# ${method} ${path}`)
  sections.push("")

  // Source
  sections.push(`**Source:** ${sourceUrl}`)
  sections.push("")

  // Description
  if (description) {
    sections.push("## Description")
    sections.push("")
    sections.push(description)
    sections.push("")
  }

  // Authentication
  sections.push("## Authentication")
  sections.push("")
  if (category === "public") {
    sections.push("Not Required (Public Endpoint)")
  } else {
    sections.push("Required (Private Endpoint)")
    sections.push("")
    sections.push(
      "This endpoint requires authentication using EIP-712 signing with your private key or API wallet."
    )
  }
  sections.push("")

  // Rate Limit
  sections.push("## Rate Limit")
  sections.push("")
  sections.push("**Weight:** 1")
  sections.push("")
  sections.push(
    "See [Rate Limits](/docs/hyperliquid/rate_limits.md) for complete rate limiting rules."
  )
  sections.push("")

  // HTTP Request
  sections.push("## HTTP Request")
  sections.push("")
  sections.push(`\`${method} ${path}\``)
  sections.push("")

  // Request Parameters - Headers
  const headersTable = convertParametersToTable(content, "Headers", false)
  if (headersTable) {
    sections.push("## Request Parameters")
    sections.push("")
    sections.push("### Headers")
    sections.push("")
    sections.push(headersTable)
    sections.push("")
  }

  // Request Parameters - Body
  const bodyTable = convertParametersToTable(content, "Body", true)
  if (bodyTable) {
    if (!headersTable) {
      sections.push("## Request Parameters")
      sections.push("")
    }
    sections.push("### Body Parameters")
    sections.push("")
    sections.push(bodyTable)
    sections.push("")
  }

  // Request Example
  sections.push("## Request Example")
  sections.push("")
  sections.push("```bash")
  if (category === "public") {
    sections.push(`curl -X ${method} "https://api.hyperliquid.xyz${path}" \\`)
    sections.push('  -H "Content-Type: application/json" \\')
    sections.push('  -d \'{"type": "...", ...}\'')
  } else {
    sections.push(`curl -X ${method} "https://api.hyperliquid.xyz${path}" \\`)
    sections.push('  -H "Content-Type: application/json" \\')
    sections.push(
      '  -d \'{"action": {...}, "nonce": 1234567890, "signature": {...}}\''
    )
  }
  sections.push("```")
  sections.push("")

  // Response Example
  sections.push("## Response Example")
  sections.push("")

  // Extract and fix response
  const responseMatch = content.match(/\*\*Response\*\*[\s\S]*?```[\s\S]*?```/m)
  if (responseMatch) {
    let response = responseMatch[0]
    // Remove "Response" header and status code
    response = response.replace(
      /\*\*Response\*\*[\s\S]*?200: OK[\s\S]*?Copy[\s\S]*?/m,
      ""
    )
    // Fix code block
    response = fixJsonCodeBlocks(response)
    sections.push(response.trim())
  } else {
    sections.push("```json")
    sections.push("{")
    sections.push('  "status": "ok"')
    sections.push("}")
    sections.push("```")
  }
  sections.push("")

  return sections.join("\n")
}

/**
 * Save endpoint to file
 */
const saveEndpoint = (endpoint, category) => {
  const filename = `${sanitizeFilename(endpoint.name)}.md`
  const outputPath = path.join(OUTPUT_DIR, "endpoints", category, filename)

  const content = transformToStandardFormat(endpoint, category)

  writeFile(outputPath, content)
}

const main = async () => {
  console.log("Starting endpoint documentation extraction for Hyperliquid...\n")

  const browser = await launchBrowser()
  const page = await browser.newPage()
  await configurePage(page)

  const turndownService = createTurndownBuilder().build()

  try {
    ensureDir(OUTPUT_DIR)
    ensureDir(path.join(OUTPUT_DIR, "endpoints", "public"))
    ensureDir(path.join(OUTPUT_DIR, "endpoints", "private"))

    // Extract all endpoints
    const infoEndpoints = await extractInfoEndpoints(page, turndownService)
    const exchangeEndpoints = await extractExchangeEndpoints(
      page,
      turndownService
    )
    const wsEndpoints = await extractWebSocketEndpoints(page, turndownService)

    const allEndpoints = [
      ...infoEndpoints,
      ...exchangeEndpoints,
      ...wsEndpoints
    ]

    console.log(`\nExtracted ${allEndpoints.length} total endpoints`)

    let publicCount = 0
    let privateCount = 0

    // Classify and save each endpoint
    allEndpoints.forEach(endpoint => {
      const category = classifyEndpoint(endpoint.name, endpoint.content)
      saveEndpoint(endpoint, category)

      if (category === "public") {
        publicCount++
      } else {
        privateCount++
      }
    })

    console.log(`\n📊 Endpoint Classification Summary:`)
    console.log(`   Public endpoints: ${publicCount}`)
    console.log(`   Private endpoints: ${privateCount}`)
    console.log(`   Total: ${allEndpoints.length}`)

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
