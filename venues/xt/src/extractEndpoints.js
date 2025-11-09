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

  let originalJson = responseMatch[1]
  let jsonText = originalJson.trim()

  // Handle git conflict markers - extract the correct version
  if (jsonText.includes("<<<<<<< Updated upstream")) {
    // Extract the version between ======= and >>>>>>> (the "incoming" changes)
    const conflictMatch = jsonText.match(/=======\s*([\s\S]*?)>>>>>>> [^\n]+/)
    if (conflictMatch) {
      jsonText = conflictMatch[1].trim()
      originalJson = jsonText // Update original for comment extraction
    }
  }

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
 * Returns an object with the processed content and extracted path
 */
const postProcessMarkdown = (markdown, method, path, isPrivate) => {
  let processed = markdown

  // Remove navigation anchors like [​](#description "Direct link to Description")
  processed = processed.replace(/\[​\]\(#[^)]+\)/g, "")

  // Remove "Edit this page" links
  processed = processed.replace(/\[Edit this page\]\([^)]+\)/g, "")

  // Remove horizontal rules (both --- and * * * formats)
  processed = processed.replace(/^---+$/gm, "")
  processed = processed.replace(/^\* \* \*$/gm, "")

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
  let extractedPath = path // Track the extracted path

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
          extractedPath = pathMatch[2] // Store the extracted path
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

      // Handle git conflict markers in the JSON - extract the correct version
      if (responseExample.includes("<<<<<<< Updated upstream")) {
        // Find the code block and extract just the version between ======= and >>>>>>>
        const codeBlockMatch = responseExample.match(/```[^\n]*\n([\s\S]*?)```/)
        if (codeBlockMatch) {
          const fullJson = codeBlockMatch[1]
          const conflictMatch = fullJson.match(/=======\s*([\s\S]*?)>>>>>>> [^\n]+/)
          if (conflictMatch) {
            // Reconstruct with just the "incoming" version (after =======)
            responseExample = "```\n" + conflictMatch[1].trim() + "\n```"
          }
        }
      }

      // Remove untagged code blocks and add json tag
      responseExample = responseExample.replace(/```\s*\n/g, "```json\n")
      // Remove inline comments - preserve existing commas, just remove the comment part
      responseExample = responseExample.replace(/\s*\/\/.*$/gm, "")
      // Clean up any double commas that might have been created
      responseExample = responseExample.replace(/,(\s*,)+/g, ",")
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

  return {
    content: output.trim(),
    extractedPath: extractedPath
  }
}

/**
 * Extract all endpoints from the XT.com documentation
 */
const extractEndpoints = async (page, turndownService) => {
  console.log("Extracting endpoint information...")

  // Navigate to the main spot trading page
  await page.goto(
    `${BASE_URL}/Access%20Description/BasicInformationOfTheInterface`,
    {
      waitUntil: "networkidle2",
      timeout: 30000
    }
  )

  // Wait for the sidebar to be populated
  await page.waitForSelector(".menu__list", { timeout: 10000 })

  // Expand all collapsed categories
  await page.evaluate(() => {
    const collapsedItems = document.querySelectorAll(
      ".menu__list-item--collapsed"
    )
    collapsedItems.forEach(item => {
      const link = item.querySelector("a")
      if (link) link.click()
    })
  })

  // Wait for expansion
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Get all endpoint links from the sidebar
  const endpointLinks = await page.evaluate(() => {
    const getAllMenuItems = listElement => {
      const items = []
      const directChildren = Array.from(listElement.children)

      directChildren.forEach(child => {
        if (child.classList.contains("menu__list-item")) {
          const link = child.querySelector(":scope > .menu__link, :scope > a")
          const nestedList = child.querySelector(":scope > ul")

          if (link) {
            items.push({
              text: link.textContent.trim(),
              href: link.href
            })
          }

          if (nestedList) {
            const children = getAllMenuItems(nestedList)
            items.push(...children)
          }
        }
      })

      return items
    }

    const mainMenu = document.querySelector(".menu__list")
    const allItems = mainMenu ? getAllMenuItems(mainMenu) : []

    // Filter to get only endpoint pages (exclude general documentation)
    return allItems.filter(item => {
      if (!item.href) return false

      // Must be in Balance, Deposit&Withdrawal, Market, Order, Trade, or Transfer sections
      const isEndpointSection =
        item.href.includes("/Balance/") ||
        item.href.includes("/Deposit&Withdrawal/") ||
        item.href.includes("/Market/") ||
        item.href.includes("/Order/") ||
        item.href.includes("/Trade/") ||
        item.href.includes("/Transfer/")

      return isEndpointSection
    })
  })

  console.log(`Found ${endpointLinks.length} endpoints to extract`)

  const endpoints = []

  // Extract each endpoint
  for (const link of endpointLinks) {
    console.log(`  Processing: ${link.text}...`)

    try {
      await page.goto(link.href, {
        waitUntil: "networkidle2",
        timeout: 30000
      })

      const endpointData = await page.evaluate(url => {
        const article = document.querySelector(
          'article, main, [class*="docMainContainer"]'
        )
        if (!article) return null

        // Clone the article to avoid modifying the original
        const clone = article.cloneNode(true)

        // Remove navigation elements, TOC, etc.
        const elementsToRemove = clone.querySelectorAll(
          '.table-of-contents, [class*="tocCollapsible"], nav, .pagination-nav, [class*="lastUpdated"]'
        )
        elementsToRemove.forEach(el => el.remove())

        // Extract HTTP method and path from the page content
        const content = clone.innerHTML
        const textContent = clone.textContent

        let method = "GET" // Default
        let path = null

        // Look for the Type field which contains the actual HTTP method
        // Format: Type: post Description: /v4/order
        const typeMatch = textContent.match(/Type:?\s+(get|post|put|delete)/i)
        if (typeMatch) {
          method = typeMatch[1].toUpperCase()
        }

        // Look for the path in the Description field or in the content
        // Multiple possible formats:
        // 1. Description: /v4/public/ticker
        // 2. **GET** `/v4/public/ticker`
        // 3. Type: GET Description: /v4/order
        const pathMatch =
          textContent.match(/Description:?\s+(\/v4\/[^\s\n]+)/) ||
          textContent.match(/\*\*(?:GET|POST|PUT|DELETE)\*\*\s+`(\/v4\/[^`]+)`/)

        if (pathMatch) {
          path = pathMatch[1].trim()
        }

        return {
          content: content,
          method: method,
          path: path,
          sourceUrl: url
        }
      }, link.href)

      if (endpointData) {
        const markdown = turndownService.turndown(endpointData.content)

        endpoints.push({
          name: link.text,
          method: endpointData.method,
          path: endpointData.path,
          sourceUrl: endpointData.sourceUrl,
          content: markdown
        })
      }

      // Polite delay between requests
      await new Promise(resolve => setTimeout(resolve, REQUEST_DELAY_MS))
    } catch (error) {
      console.error(`  Error extracting ${link.text}:`, error.message)
    }
  }

  return endpoints
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
    const processed = postProcessMarkdown(
      endpoint.content,
      endpoint.method,
      endpoint.path,
      isPrivate
    )

    // Use extracted path if original path was not available
    const finalPath = endpoint.path || processed.extractedPath

    // Build the final document with proper H1 title
    const title = finalPath
      ? `# ${endpoint.method} ${finalPath}`
      : `# ${endpoint.method} ${endpoint.name}`

    const contentWithMetadata = `${title}

**Source:** [${endpoint.sourceUrl}](${endpoint.sourceUrl})

${processed.content}`

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
