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
 * Detect code block language
 */
const detectCodeLanguage = code => {
  const trimmed = code.trim()

  // Check for JSON
  if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
    try {
      JSON.parse(trimmed)
      return 'json'
    } catch (e) {
      if (trimmed.includes('"') && (trimmed.includes(':') || trimmed.includes(','))) {
        return 'json'
      }
    }
  }

  // Check for Python
  if (/^(import|from)\s+/.test(trimmed) ||
      /\bdef\s+\w+\(/.test(trimmed) ||
      /\bprint\(/.test(trimmed)) {
    return 'python'
  }

  // Check for JavaScript/TypeScript
  if (/^(const|let|var)\s+/.test(trimmed) ||
      /require\(['"']/.test(trimmed) ||
      /^import\s+.*from/.test(trimmed) ||
      /=>\s*{/.test(trimmed)) {
    return 'javascript'
  }

  // Check for shell/bash
  if (/^(curl|wget|http|GET|POST|PUT|DELETE|PATCH)\s+/i.test(trimmed)) {
    return 'bash'
  }

  return null
}

/**
 * Clean up markdown content - remove GitBook artifacts and tag code blocks
 */
const cleanMarkdown = content => {
  const lines = content.split('\n')
  const cleanedLines = []
  let inCodeBlock = false
  let codeBlockContent = []

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i]

    // Handle code block detection and language tagging
    if (line.trim().startsWith('```')) {
      if (!inCodeBlock) {
        // Starting a code block
        inCodeBlock = true
        codeBlockContent = []
        if (line.trim() === '```') {
          cleanedLines.push(line)
        } else {
          cleanedLines.push(line)
        }
      } else {
        // Closing a code block
        inCodeBlock = false

        // If the opening was untagged, detect language and add it
        const openingLineIndex = cleanedLines.length - codeBlockContent.length - 1
        if (openingLineIndex >= 0 && cleanedLines[openingLineIndex].trim() === '```') {
          const codeContent = codeBlockContent.join('\n')
          const detectedLang = detectCodeLanguage(codeContent)
          if (detectedLang) {
            cleanedLines[openingLineIndex] = '```' + detectedLang
          }
        }

        cleanedLines.push(line)
        codeBlockContent = []
      }
      continue
    }

    // Track code block content for language detection
    if (inCodeBlock) {
      codeBlockContent.push(line)
      cleanedLines.push(line)
      continue
    }

    // Skip processing inside code blocks
    if (!inCodeBlock) {
      // Remove GitBook artifacts

      // Remove empty heading markers (####)
      if (line.match(/^#{2,6}\s*$/)) {
        continue
      }

      // Remove GitBook anchor links like [](#headers)
      if (line.match(/^\[\]\(#[^)]*\)$/)) {
        continue
      }

      // Remove "Copy" text that appears before code blocks
      if (line.trim() === 'Copy') {
        continue
      }

      // Remove lines that are just numbers
      if (line.match(/^\s*\d+\s*$/)) {
        continue
      }

      // Clean up anchor links inline
      line = line.replace(/\[\]\(#[^)]*\)/g, '')
    }

    cleanedLines.push(line)
  }

  return cleanedLines
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

/**
 * Extract HTTP method and path from content
 */
const extractMethodAndPath = content => {
  // Look for patterns like "`POST` `https://api.hyperliquid.xyz/info`"
  const match = content.match(/`(GET|POST|PUT|DELETE|PATCH)`\s+`([^`]+)`/i)
  if (match) {
    const method = match[1].toUpperCase()
    const fullUrl = match[2]

    // Extract path from URL
    try {
      const url = new URL(fullUrl)
      return {
        method,
        path: url.pathname
      }
    } catch (e) {
      // If URL parsing fails, try to extract path manually
      const pathMatch = fullUrl.match(/https?:\/\/[^/]+(\/[^?\s]*)/)
      if (pathMatch) {
        return {
          method,
          path: pathMatch[1]
        }
      }
    }
  }

  return null
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

  return endpoints.map(endpoint => {
    const markdown = turndownService.turndown(endpoint.content)
    const cleanedContent = cleanMarkdown(markdown)
    return {
      ...endpoint,
      content: cleanedContent
    }
  })
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

  return endpoints.map(endpoint => {
    const markdown = turndownService.turndown(endpoint.content)
    const cleanedContent = cleanMarkdown(markdown)
    return {
      ...endpoint,
      content: cleanedContent
    }
  })
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

  const markdown = turndownService.turndown(content)
  const cleanedContent = cleanMarkdown(markdown)

  return [
    {
      name: "WebSocket API",
      content: cleanedContent,
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
 * Save endpoint to file
 */
const saveEndpoint = (endpoint, category) => {
  const filename = `${sanitizeFilename(endpoint.name)}.md`
  const outputPath = path.join(OUTPUT_DIR, "endpoints", category, filename)

  // Extract HTTP method and path from content
  const methodPath = extractMethodAndPath(endpoint.content)

  // Create H1 heading - prefer method/path format if available
  let h1Heading = endpoint.name
  if (methodPath) {
    h1Heading = `${methodPath.method} ${methodPath.path}`
  }

  const content = `# ${h1Heading}

**Source:** ${endpoint.sourceUrl}

${endpoint.content}
`

  writeFile(outputPath, content)
}

const main = async () => {
  console.log("Starting endpoint documentation extraction for Hyperliquid...\n")

  const browser = await launchBrowser()
  const page = await browser.newPage()
  await configurePage(page)

  const turndownService = createTurndownBuilder()
    .withTablesWithoutHeaders()
    .build()

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
