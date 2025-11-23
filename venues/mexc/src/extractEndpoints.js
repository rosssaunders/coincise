/**
 * MEXC Exchange - Endpoint Documentation Extraction
 * Extracts individual endpoint documentation from single-page API docs
 */
"use strict"

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { launchBrowser, configurePage } from "../../shared/puppeteer.js"
import { createTurndownBuilder } from "../../shared/turndown.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BASE_URL = "https://mexcdevelop.github.io/apidocs/spot_v3_en"
const OUTPUT_DIR = path.resolve(__dirname, "../../../docs/mexc/endpoints")

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
const generateFilename = (method, path) => {
  const methodLower = method.toLowerCase()
  const pathPart = sanitizeFilename(path.replace(/^\//, "").replace(/\//g, "_"))
  return `${methodLower}_${pathPart}.md`
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
 * Clean up markdown content and tag code blocks
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

    cleanedLines.push(line)
  }

  return cleanedLines
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

/**
 * Determine if endpoint requires authentication
 */
const isPrivateEndpoint = (title, content) => {
  // Check for authentication indicators in content
  const hasSignature = content.toLowerCase().includes("signature")
  const hasApiKey = content.toLowerCase().includes("x-mexc-apikey")
  const hasRecvWindow = content.toLowerCase().includes("recvwindow")

  // Common patterns for private endpoints
  const privatePatterns = [
    /account/i,
    /order/i,
    /trade/i,
    /withdraw/i,
    /deposit/i,
    /transfer/i,
    /balance/i,
    /wallet/i
  ]

  const titleIsPrivate = privatePatterns.some(pattern =>
    pattern.test(title.toLowerCase())
  )

  return hasSignature || hasApiKey || hasRecvWindow || titleIsPrivate
}

/**
 * Extract all endpoints from a section
 */
const extractEndpointsFromSection = async (
  page,
  turndownService,
  sectionTitle
) => {
  console.log(`Extracting endpoints from ${sectionTitle} section...`)

  const endpoints = await page.evaluate(section => {
    const contentNode = document.querySelector(".content")
    if (!contentNode) return []

    // Find the section H1
    const h1Elements = Array.from(contentNode.querySelectorAll("h1"))
    const sectionH1 = h1Elements.find(h1 =>
      h1.textContent.trim().toLowerCase().includes(section.toLowerCase())
    )

    if (!sectionH1) return []

    const endpoints = []
    let currentNode = sectionH1.nextElementSibling

    // Iterate through nodes until we hit the next H1
    while (currentNode && currentNode.nodeName !== "H1") {
      if (currentNode.nodeName === "H2") {
        const endpointTitle = currentNode.textContent.trim()
        const endpointId = currentNode.id || ""

        // Collect content for this endpoint until next H2 or H1
        const content = document.createElement("div")
        let contentNode = currentNode.nextElementSibling

        while (
          contentNode &&
          contentNode.nodeName !== "H1" &&
          contentNode.nodeName !== "H2"
        ) {
          content.appendChild(contentNode.cloneNode(true))
          contentNode = contentNode.nextElementSibling
        }

        // Extract HTTP method and path from content
        // Look for UL element containing the method and path
        const ulElement = content.querySelector("ul")
        let method = ""
        let path = ""

        if (ulElement) {
          const text = ulElement.textContent.trim()
          const match = text.match(/^(GET|POST|DELETE|PUT)\s+(.+)$/)
          if (match) {
            method = match[1]
            path = match[2]
          }
        }

        if (method && path) {
          endpoints.push({
            title: endpointTitle,
            id: endpointId,
            method: method,
            path: path,
            html: `<h1>${endpointTitle}</h1>${content.innerHTML}`
          })
        }
      }

      currentNode = currentNode.nextElementSibling
    }

    return endpoints
  }, sectionTitle)

  return endpoints
}

/**
 * Main extraction function
 */
const main = async () => {
  console.log("Starting MEXC endpoint documentation extraction...")

  let browser = null
  try {
    // Launch browser and navigate
    browser = await launchBrowser()
    const page = await browser.newPage()
    await configurePage(page)

    console.log(`Navigating to ${BASE_URL}...`)
    await page.goto(BASE_URL, {
      waitUntil: "networkidle2",
      timeout: 60000
    })

    // Wait for content to load
    await page.waitForSelector(".content", { timeout: 30000 })

    // Create turndown service with table support
    const turndownService = createTurndownBuilder()
      .withTablesWithoutHeaders()
      .build()

    // Ensure output directories exist
    ensureDir(path.join(OUTPUT_DIR, "public"))
    ensureDir(path.join(OUTPUT_DIR, "private"))

    // Sections to extract endpoints from
    const sections = [
      "Market Data Endpoints",
      "Spot Account/Trade",
      "Wallet Endpoints",
      "Sub-Account Endpoints",
      "Rebate Endpoints"
    ]

    let publicCount = 0
    let privateCount = 0

    for (const section of sections) {
      const endpoints = await extractEndpointsFromSection(
        page,
        turndownService,
        section
      )

      console.log(`Found ${endpoints.length} endpoints in ${section}`)

      for (const endpoint of endpoints) {
        const markdown = turndownService.turndown(endpoint.html)
        const cleanedMarkdown = cleanMarkdown(markdown)

        // Remove the H1 from content since we'll add our own
        const contentWithoutH1 = cleanedMarkdown.replace(/^#\s+[^\n]+\n*/m, '')

        // Create H1 with HTTP method and path
        const h1 = `# ${endpoint.method} ${endpoint.path}`

        const fullMarkdown = `${h1}

**Source:** ${BASE_URL}#${endpoint.id}

${contentWithoutH1}
`

        const isPrivate = isPrivateEndpoint(
          endpoint.title,
          endpoint.html + markdown
        )
        const category = isPrivate ? "private" : "public"
        const filename = generateFilename(endpoint.method, endpoint.path)
        const filepath = path.join(OUTPUT_DIR, category, filename)

        writeFile(filepath, fullMarkdown)

        if (isPrivate) {
          privateCount++
        } else {
          publicCount++
        }
      }
    }

    console.log(
      `\n✅ Endpoint extraction completed successfully!\n   Public: ${publicCount}, Private: ${privateCount}`
    )
  } catch (error) {
    console.error("Error during extraction:", error)
    throw error
  } finally {
    if (browser) {
      await browser.close()
    }
  }
}

// Execute main function if this script is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error("Fatal error:", error)
    process.exit(1)
  })
}

export { main }
