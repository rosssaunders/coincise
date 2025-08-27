"use strict"

import fs from "fs"
import path from "path"
import process from "process"
import { fileURLToPath } from "url"
import { JSDOM } from "jsdom"
import TurndownService from "turndown"
import { gfm, tables, strikethrough } from "turndown-plugin-gfm"
import puppeteer from "puppeteer"
import { formatMarkdown } from "../../shared/format-markdown.js"
import fetch from "node-fetch"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Get configuration from command line argument or default to private.json
function getConfig() {
  const configFile = process.argv[2] || "private.json"
  
  // Handle both relative paths (config/assets.json) and just filenames (assets.json)
  let configPath
  if (configFile.includes('/')) {
    configPath = path.resolve(path.join(__dirname, "..", configFile))
  } else {
    configPath = path.resolve(path.join(__dirname, "../config", configFile))
  }
  
  if (!fs.existsSync(configPath)) {
    throw new Error(`Configuration file not found: ${configPath}`)
  }
  
  const configData = fs.readFileSync(configPath, "utf8")
  return JSON.parse(configData)
}

/**
 * Configure Turndown for HTML to Markdown conversion
 * @returns {TurndownService} Configured Turndown service
 */
function configureTurndown() {
  const turndownService = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
    fence: "```",
    bulletListMarker: "-",
    emDelimiter: "_",
    strongDelimiter: "**",
    br: "\n",
    preformattedCode: true
  })
  
  turndownService.use([gfm, tables, strikethrough])

  // Handle dollar signs in code blocks
  const originalEscape = turndownService.escape
  turndownService.escape = function (string) {
    return originalEscape(string).replace(/\$/g, "\\$")
  }

  return turndownService
}

/**
 * Launch Puppeteer browser with optimized configuration for scraping
 * @returns {Promise<Browser>} Puppeteer browser instance
 */
async function launchBrowser() {
  return await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--single-process',
      '--no-first-run',
      '--no-zygote',
      '--disable-extensions',
      '--disable-component-extensions-with-background-pages',
      '--disable-background-timer-throttling',
      '--disable-backgrounding-occluded-windows',
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process',
      '--password-store=basic'
    ],
    timeout: 30000,
    ignoreHTTPSErrors: true
  })
}

/**
 * Configure page with optimized settings for scraping
 * @param {Page} page - Puppeteer page instance
 */
async function configurePage(page) {
  await page.setViewport({ width: 1920, height: 1080 })
  await page.setDefaultTimeout(30000)
  await page.setDefaultNavigationTimeout(30000)

  // Enable request interception for performance optimization
  await page.setRequestInterception(true)
  page.on('request', (request) => {
    const resourceType = request.resourceType()
    if (['image', 'stylesheet', 'font', 'media'].includes(resourceType)) {
      request.abort()
    } else {
      request.continue()
    }
  })
}

/**
 * Extract content from a single URL using Puppeteer
 * @param {Page} page - Puppeteer page instance
 * @param {string} url - URL to extract content from
 * @returns {Promise<string>} Extracted HTML content
 */
async function extractContent(page, url) {
  console.log(`🌐 Fetching content from: ${url}`)
  
  try {
    await page.goto(url, { waitUntil: 'networkidle0' })
    
    // Wait for main content to load
    await page.waitForSelector('main, .main, #main, [role="main"]', { timeout: 10000 })
    
    // Extract the main content
    const content = await page.evaluate(() => {
      // Try to find the main content area
      const selectors = [
        'main',
        '.main-content',
        '.content',
        '#main',
        '[role="main"]',
        '.docs-content',
        '.reference-content'
      ]
      
      let mainElement = null
      for (const selector of selectors) {
        mainElement = document.querySelector(selector)
        if (mainElement) break
      }
      
      // If no main element found, use body but exclude navigation and headers
      if (!mainElement) {
        mainElement = document.body
        
        // Remove navigation and header elements
        const elementsToRemove = mainElement.querySelectorAll(
          'nav, header, .navigation, .nav, .header, .sidebar, .footer, .breadcrumb'
        )
        elementsToRemove.forEach(el => el.remove())
      }
      
      return mainElement ? mainElement.innerHTML : ''
    })
    
    return content
  } catch (error) {
    console.error(`Error extracting content from ${url}:`, error)
    throw error
  }
}

/**
 * Extract content using simple fetch for changelog-style pages
 * @param {string} url - URL to fetch
 * @returns {Promise<string>} HTML content
 */
async function getChangelogHTML(url) {
  console.log(`🌐 Fetching changelog from: ${url}`)

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"
      }
    })

    if (!response.ok) {
      throw new Error(
        `Failed to fetch ${url}: ${response.status} ${response.statusText}`
      )
    }

    const html = await response.text()

    if (!html || html.trim() === "") {
      throw new Error(`Empty content received from ${url}`)
    }

    // Use JSDOM to extract the main content
    const dom = new JSDOM(html)
    const mainContent = dom.window.document.querySelector("main")

    if (!mainContent) {
      console.warn("Main content not found, using body instead")
      return dom.window.document.body.innerHTML
    }

    return mainContent.innerHTML
  } catch (error) {
    console.error(`Error fetching content from ${url}:`, error)
    throw error
  }
}

/**
 * Process API documentation extraction for endpoint-based configs
 * @param {Object} config - Configuration object
 * @param {TurndownService} turndownService - Turndown service instance
 */
async function processApiDocumentation(config, turndownService) {
  const browser = await launchBrowser()
  
  try {
    const page = await browser.newPage()
    await configurePage(page)
    
    const { section, title, endpoints, outputConfig } = config
    const { docsDir, subDir } = outputConfig
    
    // Create output directory
    const outputDir = path.resolve(path.join(__dirname, "..", docsDir, subDir))
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }
    
    console.log(`📂 Processing ${title} (${endpoints.length} endpoints)`)
    
    for (const endpoint of endpoints) {
      const startTime = Date.now()
      
      try {
        // Extract content using Puppeteer
        const htmlContent = await extractContent(page, endpoint.url)
        
        if (!htmlContent || htmlContent.trim() === '') {
          console.warn(`⚠️ No content extracted from ${endpoint.url}`)
          continue
        }
        
        // Convert to markdown
        const markdown = turndownService.turndown(htmlContent)
        
        // Add source reference
        const finalMarkdown = `# ${endpoint.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}\n\n${markdown}\n\n> **Source:** [${endpoint.name}](${endpoint.url})\n`
        
        // Save to file
        const outputPath = path.join(outputDir, endpoint.filename)
        fs.writeFileSync(outputPath, finalMarkdown)
        
        // Format the markdown
        await formatMarkdown(outputPath)
        
        const endTime = Date.now()
        console.log(`✅ ${endpoint.name} (${((endTime - startTime) / 1000).toFixed(2)}s)`)
        
        // Polite delay between requests
        await new Promise(resolve => setTimeout(resolve, 1000))
        
      } catch (error) {
        console.error(`❌ Error processing ${endpoint.name}:`, error)
        // Continue with next endpoint rather than failing completely
      }
    }
    
  } finally {
    await browser.close()
  }
}

/**
 * Process changelog-style extraction for simple configs
 * @param {Object} config - Configuration object
 * @param {TurndownService} turndownService - Turndown service instance
 */
async function processChangelog(config, turndownService) {
  const { urls, outputConfig, title } = config
  const { docsDir, outputFileName } = outputConfig
  
  // Create docs directory if it doesn't exist
  const outputDir = path.resolve(path.join(__dirname, "..", docsDir))
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  let combinedMarkdown = ""

  // Add title if provided
  if (title) {
    console.log(`📝 Adding title: ${title}`)
    combinedMarkdown += `# ${title}\n\n`
  }

  // Process each URL
  for (const url of urls) {
    const startTime = Date.now()

    // Fetch and process HTML content
    const html = await getChangelogHTML(url)

    // Create DOM from HTML to process content
    const dom = new JSDOM(`<div>${html}</div>`)

    // Convert HTML to Markdown
    const markdown = turndownService.turndown(dom.window.document.body.innerHTML)

    // Add source reference
    combinedMarkdown += `${markdown}\n\n> **Source:** [Upbit Changelog](${url})\n\n`

    const endTime = Date.now()
    console.log(`⏱️ Processing time: ${(endTime - startTime) / 1000} seconds`)
  }

  // Save the combined markdown to file
  const outputPath = path.join(outputDir, outputFileName)
  fs.writeFileSync(outputPath, combinedMarkdown)

  // Format the markdown file
  await formatMarkdown(outputPath)
  console.log(`✅ Successfully generated and formatted: ${outputPath}`)
  console.log(`📦 Size: ${(combinedMarkdown.length / 1024).toFixed(2)} KB`)
}

async function main() {
  try {
    console.log(`🚀 Starting Upbit documentation extraction...`)
    
    // Get configuration
    const config = getConfig()
    
    // Setup Turndown
    const turndownService = configureTurndown()
    
    // Determine processing method based on config structure
    if (config.endpoints && Array.isArray(config.endpoints)) {
      // API documentation extraction
      await processApiDocumentation(config, turndownService)
    } else if (config.urls && Array.isArray(config.urls)) {
      // Changelog-style extraction
      await processChangelog(config, turndownService)
    } else {
      throw new Error('Invalid configuration format. Expected either "endpoints" or "urls" array.')
    }
    
    console.log(`🎉 Extraction completed successfully!`)
    
  } catch (error) {
    console.error("❌ Error in main process:", error)
    console.error("Stack trace:", error.stack)
    process.exit(1)
  }
}

// Only run main() if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error("Unhandled error in main:", error)
    console.error("Stack trace:", error.stack)
    process.exit(1)
  })
}
