/**
 * Binance Futures - Endpoint Documentation Extraction
 * Scrapes individual endpoint pages from Binance Developers website
 */
"use strict"

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { JSDOM } from "jsdom"
import { launchBrowser, getPage, politeDelay } from "../../shared/puppeteer.js"
import { createTurndownBuilder } from "../../shared/turndown.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const DOCS_ROOT = path.resolve(__dirname, "../../../docs/binance")
const BASE_URL = "https://developers.binance.com"

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
  const methodLower = method ? method.toLowerCase() : "endpoint"
  const pathPart = sanitizeFilename(
    endpointPath.replace(/^\//, "").replace(/\//g, "_")
  )
  return `${methodLower}_${pathPart}.md`
}

/**
 * Extract HTTP method and path from markdown content
 */
const extractMethodAndPath = content => {
  // Look for patterns like "GET `/fapi/v1/ticker`" or "GET /fapi/v1/ticker"
  const patterns = [
    /(GET|POST|PUT|DELETE|PATCH)\s+`([^`]+)`/i,
    /(GET|POST|PUT|DELETE|PATCH)\s+(\/[^\s\n]+)/i
  ]

  for (const pattern of patterns) {
    const match = content.match(pattern)
    if (match) {
      return {
        method: match[1].toUpperCase(),
        path: match[2]
      }
    }
  }
  return null
}

/**
 * Helper to adjust heading levels down by one
 */
const adjustHeadingLevels = document => {
  const cleanHeadingContent = element => {
    const anchors = element.querySelectorAll("a")
    for (const anchor of anchors) {
      if (
        anchor.getAttribute("href")?.includes("#") ||
        anchor.classList.contains("hash-link") ||
        anchor.textContent.trim() === "" ||
        anchor.textContent === "\u200B"
      ) {
        anchor.parentNode.removeChild(anchor)
      } else {
        const text = anchor.textContent
        const textNode = document.createTextNode(text)
        anchor.parentNode.replaceChild(textNode, anchor)
      }
    }
    return element.innerHTML
  }

  ;["h5", "h4", "h3", "h2", "h1"].forEach((tag, index) => {
    const nextTag = `h${6 - index}`
    const elements = document.querySelectorAll(tag)
    for (const element of elements) {
      const newElement = document.createElement(nextTag)
      newElement.innerHTML = cleanHeadingContent(element)
      element.parentNode.replaceChild(newElement, element)
    }
  })
}

/**
 * Extract endpoint URLs from the sidebar
 */
const extractEndpointUrls = async (page, sectionUrl) => {
  console.log(`  Crawling sidebar at ${sectionUrl}...`)
  await page.goto(sectionUrl, { waitUntil: "networkidle2", timeout: 30000 })

  const links = await page.evaluate(() => {
    const sidebar = document.querySelector("nav.menu") || document.querySelector(".theme-doc-sidebar-menu")
    if (!sidebar) return []

    return Array.from(sidebar.querySelectorAll("a.menu__link"))
      .map(a => ({
        text: a.textContent.trim(),
        href: a.href
      }))
      .filter(link => {
        // Filter out non-endpoint links
        const skipTexts = [
            "General Info", "Change Log", "Error Codes", "Filters", 
            "Websocket", "Stream", "Introduction", "FAQ"
        ]
        if (skipTexts.some(skip => link.text.includes(skip))) return false
        
        // Ensure it's a documentation link
        return link.href.includes("/docs/derivatives/")
      })
  })

  // Remove duplicates
  const uniqueLinks = Array.from(new Set(links.map(l => l.href)))
    .map(href => links.find(l => l.href === href))

  console.log(`  Found ${uniqueLinks.length} potential endpoint links`)
  return uniqueLinks
}

/**
 * Process a single endpoint page
 */
const processEndpointPage = async (page, url, turndownService, type) => {
  // console.log(`  Processing ${url}...`)
  try {
    await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 })
    
    const html = await page.evaluate(() => {
      const content = document.querySelector(".theme-doc-markdown.markdown")
      return content ? content.innerHTML : ""
    })

    if (!html) {
    //   console.log(`  ⚠️  No content found for ${url}`)
      return false
    }

    const dom = new JSDOM(html)
    const document = dom.window.document
    adjustHeadingLevels(document)
    
    // Pre-process code blocks to preserve newlines
    const codeBlocks = document.querySelectorAll("pre code, code")
    for (const block of codeBlocks) {
        // Replace <br> with newlines
        block.innerHTML = block.innerHTML.replace(/<br\s*\/?>/gi, "\n")
    }

    const cleanedHtml = dom.serialize()
    const markdown = turndownService.turndown(cleanedHtml)

    const methodPath = extractMethodAndPath(markdown)
    if (!methodPath) {
    //   console.log(`  ⚠️  No HTTP method/path found in ${url}`)
      return false
    }

    const typeDir = path.join(DOCS_ROOT, type)
    // Determine if public or private based on content (heuristic)
    // Default to public if not specified, but usually API keys imply private
    const isPrivate = markdown.toLowerCase().includes("api key") || markdown.toLowerCase().includes("signature")
    
    const outputDir = isPrivate
      ? path.join(typeDir, "endpoints", "private")
      : path.join(typeDir, "endpoints", "public")
    ensureDir(outputDir)

    const filename = generateFilename(methodPath.method, methodPath.path)
    const filepath = path.join(outputDir, filename)

    // Append source link
    const contentWithSource = `${markdown}\n\n> Source: [${url}](${url})\n`

    writeFile(filepath, contentWithSource)
    return true

  } catch (error) {
    console.error(`  ❌ Error processing ${url}:`, error.message)
    return false
  }
}

/**
 * Process all futures types
 */
const processAllTypes = async () => {
  console.log("Starting endpoint scraping for Binance Futures...")
  
  const browser = await launchBrowser()
  const page = await browser.newPage()
  const turndownService = createTurndownBuilder().withTablesWithoutHeaders().build()

  try {
    const types = [
      { 
        name: "usdm", 
        url: "https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api" 
      },
      { 
        name: "coinm", 
        url: "https://developers.binance.com/docs/derivatives/coin-margined-futures/market-data/rest-api" 
      },
      { 
        name: "options", 
        url: "https://developers.binance.com/docs/derivatives/option/market-data/rest-api" 
      }
    ]

    for (const type of types) {
      console.log(`\n=== Processing ${type.name.toUpperCase()} ===`)
      const links = await extractEndpointUrls(page, type.url)
      
      let count = 0
      for (const link of links) {
        const success = await processEndpointPage(page, link.href, turndownService, type.name)
        if (success) count++
        await politeDelay(100) // Be polite
      }
      console.log(`✅ Extracted ${count} endpoints for ${type.name}`)
    }

  } finally {
    await browser.close()
  }
}

/**
 * Main extraction function
 */
const main = async () => {
  await processAllTypes()
  console.log("\n✅ All endpoint extraction completed successfully")
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
