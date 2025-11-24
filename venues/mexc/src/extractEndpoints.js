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
 * Extract all endpoints from current page
 */
const extractEndpointsFromPage = async (page, turndownService, pageUrl) => {
  console.log(`Extracting endpoints from ${pageUrl}...`)

  const endpoints = await page.evaluate(() => {
    const contentNode = document.querySelector("main") || document.querySelector(".theme-doc-markdown")
    if (!contentNode) return []

    const endpoints = []
    const h2Elements = Array.from(contentNode.querySelectorAll("h2"))

    h2Elements.forEach(h2 => {
      const endpointTitle = h2.textContent.trim()
      const endpointId = h2.id || ""

      // Collect content for this endpoint until next H2 or H1
      const content = document.createElement("div")
      let currentNode = h2.nextElementSibling

      while (
        currentNode &&
        currentNode.nodeName !== "H1" &&
        currentNode.nodeName !== "H2"
      ) {
        content.appendChild(currentNode.cloneNode(true))
        currentNode = currentNode.nextElementSibling
      }

      // Extract HTTP method and path from content
      // Look for UL element or paragraph containing the method and path
      const ulElement = content.querySelector("ul")
      const pElements = Array.from(content.querySelectorAll("p"))

      let method = ""
      let path = ""

      // Try UL first
      if (ulElement) {
        const text = ulElement.textContent.trim()
        const match = text.match(/^(GET|POST|DELETE|PUT|PATCH)\s+(.+)$/)
        if (match) {
          method = match[1]
          path = match[2]
        }
      }

      // Try paragraphs if UL didn't work
      if (!method && pElements.length > 0) {
        for (const p of pElements) {
          const text = p.textContent.trim()
          const match = text.match(/^(GET|POST|DELETE|PUT|PATCH)\s+(.+)$/)
          if (match) {
            method = match[1]
            path = match[2]
            break
          }
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
    })

    return endpoints
  })

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

    // Create turndown service with table support
    const turndownService = createTurndownBuilder()
      .withTablesWithoutHeaders()
      .build()

    // Ensure output directories exist
    ensureDir(path.join(OUTPUT_DIR, "public"))
    ensureDir(path.join(OUTPUT_DIR, "private"))

    // Pages to extract endpoints from (each page now contains a section)
    const pages = [
      { url: "https://www.mexc.com/api-docs/spot-v3/market-data-endpoints", name: "Market Data Endpoints" },
      { url: "https://www.mexc.com/api-docs/spot-v3/spot-account-trade", name: "Spot Account/Trade" },
      { url: "https://www.mexc.com/api-docs/spot-v3/wallet-endpoints", name: "Wallet Endpoints" },
      { url: "https://www.mexc.com/api-docs/spot-v3/subaccount-endpoints", name: "Sub-Account Endpoints" },
      { url: "https://www.mexc.com/api-docs/spot-v3/rebate-endpoints", name: "Rebate Endpoints" }
    ]

    let publicCount = 0
    let privateCount = 0

    for (const pageInfo of pages) {
      console.log(`\nNavigating to ${pageInfo.name}...`)
      await page.goto(pageInfo.url, {
        waitUntil: "networkidle2",
        timeout: 60000
      })
      await page.waitForSelector("main", { timeout: 30000 })

      const endpoints = await extractEndpointsFromPage(
        page,
        turndownService,
        pageInfo.url
      )

      console.log(`Found ${endpoints.length} endpoints in ${pageInfo.name}`)

      for (const endpoint of endpoints) {
        const markdown = turndownService.turndown(endpoint.html)
        const cleanedMarkdown = cleanMarkdown(markdown)

        // Remove the H1 from content since we'll add our own
        const contentWithoutH1 = cleanedMarkdown.replace(/^#\s+[^\n]+\n*/m, '')

        // Create H1 with HTTP method and path
        const h1 = `# ${endpoint.method} ${endpoint.path}`

        const fullMarkdown = `${h1}

**Source:** ${pageInfo.url}#${endpoint.id}

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
