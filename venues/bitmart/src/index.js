import * as fs from "fs"
import puppeteer from "puppeteer"
import * as cheerio from "cheerio"
import path from "path"
import TurndownService from "turndown"
import { gfm, tables } from "turndown-plugin-gfm"
import { argv } from "process"
import process from "process"
import { formatMarkdown } from "../../shared/format-markdown.js"
import { JSDOM } from "jsdom"

// Add delay between requests
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

// Initialize Turndown service with GFM plugin
const turndownService = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced"
})
turndownService.use(gfm)
turndownService.use(tables)

// Add a custom rule to handle <td> elements and preserve <br> tags
turndownService.addRule("tableCellWithBr", {
  filter: "td",
  replacement: function (content, node) {
    const cellContent = node.innerHTML.replace(/<br\s*\/?>/gi, "<br>")
    return `| ${cellContent} `
  }
})

// Retry function with exponential backoff
async function retryWithBackoff(fn, maxRetries = 3, initialDelay = 5000) {
  let lastError

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error
      if (attempt === maxRetries) {
        throw error
      }

      const delayTime = initialDelay * Math.pow(2, attempt - 1)
      console.log(
        `Attempt ${attempt} failed. Retrying in ${delayTime / 1000} seconds...`
      )
      await delay(delayTime)
    }
  }

  throw lastError
}

async function scrapePageContent(browser, url) {
  return retryWithBackoff(async () => {
    const page = await browser.newPage()
    
    try {
      // Set a standard user agent to avoid blocking
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36')
      
      console.log(`Navigating to: ${url}`)
      
      await page.goto(url, {
        waitUntil: "networkidle2",
        timeout: 30000
      })

      // Wait for content to load
      await page.waitForSelector("body", { timeout: 15000 })

      // Extract the main content
      const content = await page.evaluate(() => {
        // Try to find the main documentation content
        const selectors = [
          'main',
          '.content',
          '.documentation',
          '.doc-content',
          '.main-content',
          '#content',
          'article',
          '.article-content',
          'body'
        ]
        
        for (const selector of selectors) {
          const element = document.querySelector(selector)
          if (element && element.innerHTML.trim()) {
            return element.innerHTML
          }
        }
        
        // Fallback to body if nothing else found
        return document.body.innerHTML
      })

      if (!content || content.trim() === '') {
        throw new Error(`No content found on ${url}`)
      }

      console.log(`Successfully scraped content from: ${url}`)
      return content
    } finally {
      await page.close()
    }
  }, 3, 5000)
}

function processContent(html, url) {
  try {
    // Load HTML into cheerio for processing
    const $ = cheerio.load(html)
    
    // Remove unwanted elements
    $('script, style, nav, footer, .sidebar, .navigation, .breadcrumb').remove()
    
    // Get the processed HTML
    const processedHtml = $.html()
    
    // Convert to markdown
    const markdown = turndownService.turndown(processedHtml)
    
    // Clean up the markdown
    return markdown
      .replace(/\n{3,}/g, '\n\n') // Replace multiple newlines with double newlines
      .replace(/^\s+|\s+$/g, '') // Trim whitespace
      .trim()
  } catch (error) {
    console.error(`Error processing content from ${url}:`, error)
    return `# Error processing ${url}\n\nContent could not be processed due to: ${error.message}`
  }
}

async function processConfig(configFile) {
  console.log(`Processing config file: ${configFile}`)
  
  const configPath = path.resolve(configFile)
  
  if (!fs.existsSync(configPath)) {
    console.error(`Config file not found: ${configPath}`)
    process.exit(1)
  }

  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'))
  
  console.log(`Starting Bitmart documentation extraction for: ${config.title}`)
  console.log(`Number of URLs to process: ${config.urls.length}`)

  const browser = await puppeteer.launch({
    headless: "new",
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--single-process',
      '--no-first-run',
      '--no-zygote',
      '--disable-extensions'
    ]
  })

  let fullMarkdown = `# ${config.title}\n\n`
  let processedUrls = 0

  try {
    for (const urlPath of config.urls) {
      const fullUrl = `${config.base_url}${urlPath}`
      
      try {
        console.log(`Processing ${processedUrls + 1}/${config.urls.length}: ${urlPath}`)
        
        const html = await scrapePageContent(browser, fullUrl)
        const markdown = processContent(html, fullUrl)
        
        // Add section header and content
        const sectionTitle = urlPath.split('/').pop().replace(/-/g, ' ')
        fullMarkdown += `## ${sectionTitle}\n\n${markdown}\n\n`
        
        processedUrls++
        
        // Add delay between requests to be respectful
        await delay(2000)
        
      } catch (error) {
        console.error(`Error processing ${fullUrl}:`, error.message)
        fullMarkdown += `## Error: ${urlPath}\n\nFailed to process this section: ${error.message}\n\n`
      }
    }
  } finally {
    await browser.close()
  }

  // Write output file
  const outputDir = path.resolve('../../docs/bitmart')
  const outputPath = path.join(outputDir, config.output_file)
  
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }
  
  fs.writeFileSync(outputPath, fullMarkdown)
  
  // Format the markdown file
  await formatMarkdown(outputPath)
  
  console.log(`\nExtraction completed!`)
  console.log(`Processed URLs: ${processedUrls}/${config.urls.length}`)
  console.log(`Output written to: ${outputPath}`)
  
  return outputPath
}

// Main execution
async function main() {
  const configFile = argv[2] || 'config/spot.json'
  
  try {
    await processConfig(configFile)
  } catch (error) {
    console.error('Extraction failed:', error)
    process.exit(1)
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main()
}