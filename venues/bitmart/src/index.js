import * as fs from "fs"
import puppeteer from "puppeteer"
import * as cheerio from "cheerio"
import path, { join, dirname } from "path"
import TurndownService from "turndown"
import { gfm, tables } from "turndown-plugin-gfm"
import { argv } from "process"
import process from "process"
import { writeFileSync, existsSync, mkdirSync } from "fs"

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
  return retryWithBackoff(
    async () => {
      const page = await browser.newPage()

      try {
        // Set a standard user agent to avoid blocking
        await page.setUserAgent(
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        )

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
            "main",
            ".content",
            ".documentation",
            ".doc-content",
            ".main-content",
            "#content",
            "article",
            ".article-content",
            "body"
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

        if (!content || content.trim() === "") {
          throw new Error(`No content found on ${url}`)
        }

        console.log(`Successfully scraped content from: ${url}`)
        return content
      } finally {
        await page.close()
      }
    },
    3,
    5000
  )
}

// Remove SECTION_TITLES and outputDir from code, and read from config instead

/**
 * Extracts sections from HTML by h1 titles, returns a map of {title: html}
 * @param {string} html - The full HTML string
 * @returns {Object} - Map of section title to HTML content
 */
function extractSectionsByH1(html) {
  const $ = cheerio.load(html)
  const sections = {}
  let currentTitle = null
  let currentContent = []

  // Find all h1s and their content
  $("body")
    .children()
    .each((_, el) => {
      if (el.tagName && el.tagName.toLowerCase() === "h1") {
        const title = $(el).text().trim()
        if (currentTitle && currentContent.length > 0) {
          sections[currentTitle] = currentContent.join("")
        }
        currentTitle = title
        currentContent = [$.html(el)]
      } else if (currentTitle) {
        currentContent.push($.html(el))
      }
    })
  if (currentTitle && currentContent.length > 0) {
    sections[currentTitle] = currentContent.join("")
  }
  return sections
}

async function processConfig(configFile) {
  console.log(`Processing config file: ${configFile}`)
  const configPath = path.resolve(configFile)
  if (!fs.existsSync(configPath)) {
    console.error(`Config file not found: ${configPath}`)
    process.exit(1)
  }
  const config = JSON.parse(fs.readFileSync(configPath, "utf8"))
  console.log(`Starting Bitmart documentation extraction for: ${config.title}`)
  console.log(`Number of URLs to process: ${config.urls.length}`)

  const browser = await puppeteer.launch({
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--single-process",
      "--no-first-run",
      "--no-zygote",
      "--disable-extensions"
    ]
  })

  let processedUrls = 0
  let allSections = {}
  // const outputDir = resolve(
  //   dirname(fileURLToPath(import.meta.url)),
  //   "../../../docs/bitmart"
  // )

  try {
    // Fetch and concatenate HTML from all URLs
    let combinedHtml = ""
    for (const urlPath of config.urls) {
      const fullUrl = `${config.base_url}${urlPath}`
      try {
        const html = await scrapePageContent(browser, fullUrl)
        combinedHtml += html
        processedUrls++
        await delay(2000)
      } catch (error) {
        console.error(`Error scraping ${fullUrl}:`, error)
        console.error("Stack trace:", error.stack)
      }
    }
    allSections = extractSectionsByH1(combinedHtml)
  } finally {
    await browser.close()
  }

  // Ensure output directory exists
  const outputDir = config.output_dir
  try {
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true })
      console.info(`Created output directory: ${outputDir}`)
    }
  } catch (error) {
    console.error(`Failed to create output directory: ${outputDir}`, error)
    console.error("Stack trace:", error.stack)
    process.exit(1)
  }

  // Read outputDir and sectionTitles from config
  const sectionTitles = config.section_titles || []

  // For each required section, convert to markdown and write to its own file
  for (const sectionTitle of sectionTitles) {
    const html = allSections[sectionTitle]
    let markdown = ""
    let fileName =
      sectionTitle.toLowerCase().replace(/\s+/g, "_").replace(/\//g, "_") +
      ".md"
    const filePath = join(outputDir, fileName)
    // Ensure parent directory exists for the file (in case fileName has underscores from slashes)
    const fileDir = dirname(filePath)
    if (!existsSync(fileDir)) {
      mkdirSync(fileDir, { recursive: true })
    }
    if (html) {
      // Remove the first <h1> from the HTML to avoid duplicate titles
      let htmlNoH1 = html.replace(/<h1[^>]*>.*?<\/h1>/i, "").trim()
      // Remove 'Copy Success' and 'Copy to Clipboard' from the HTML before markdown conversion
      htmlNoH1 = htmlNoH1.replace(/(Copy Success|Copy to Clipboard)/gi, "")
      markdown = `# ${sectionTitle}\n\n${turndownService.turndown(htmlNoH1)}\n`
    } else {
      console.warn(`Section not found: ${sectionTitle}`)
      markdown = `# ${sectionTitle}\n\n_Not found in source documentation._\n`
    }
    try {
      writeFileSync(filePath, markdown, "utf8")
      console.info(`Wrote section to: ${filePath}`)
    } catch (error) {
      console.error(`Failed to write section file: ${filePath}`, error)
      console.error("Stack trace:", error.stack)
      process.exit(1)
    }
  }

  console.log(`\nExtraction completed!`)
  console.log(`Processed URLs: ${processedUrls}/${config.urls.length}`)
  console.log(`Output written to: ${outputDir}`)
  return outputDir
}

// Main execution
async function main() {
  const configFile = argv[2] || "config/spot.json"

  try {
    await processConfig(configFile)
  } catch (error) {
    console.error("Extraction failed:", error)
    process.exit(1)
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main()
}
