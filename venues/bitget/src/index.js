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

async function processPage(page, fullUrl) {
  // Navigate to the page and wait for content to load
  await page.goto(fullUrl, {
    waitUntil: "networkidle0",
    timeout: 30000
  })

  // Get the page content
  const content = await page.content()
  const $ = cheerio.load(content)

  // Extract the markdown content div
  const markdownDiv = $(".theme-doc-markdown.markdown").first()

  if (markdownDiv.length === 0) {
    console.log(`No markdown content found for ${fullUrl}`)
    return null
  }

  // Get the outer HTML of the markdown content
  const outerHtml = markdownDiv.html()

  return outerHtml
}

function dropHeadingsOneLevel(html) {
  const dom = new JSDOM(html)
  const { document } = dom.window
  for (let i = 5; i >= 1; i--) {
    const oldHeading = `h${i}`
    const newHeading = `h${i + 1}`
    document.querySelectorAll(oldHeading).forEach(node => {
      const newNode = document.createElement(newHeading)
      newNode.innerHTML = node.innerHTML
      // Copy attributes if any
      for (const attr of node.attributes) {
        newNode.setAttribute(attr.name, attr.value)
      }
      node.replaceWith(newNode)
    })
  }
  return document.body.innerHTML
}

async function convertToMarkdown(configPath) {
  let browser
  try {
    // Read the config file
    const config = JSON.parse(await fs.promises.readFile(configPath, "utf8"))

    const outputDir = "../../docs/bitget"

    // Create output directory if it doesn't exist
    await fs.promises.mkdir(outputDir, { recursive: true })

    // Initialize markdown content with a header
    let markdownContent = `# ${config.title}\n\n`

    // Launch browser once for all requests
    browser = await puppeteer.launch({
      headless: "new",
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--single-process",
        "--no-first-run",
        "--no-zygote",
        "--disable-extensions",
        "--disable-component-extensions-with-background-pages",
        "--disable-background-timer-throttling",
        "--disable-backgrounding-occluded-windows",
        "--disable-web-security",
        "--disable-features=IsolateOrigins,site-per-process",
        "--password-store=basic"
      ],
      timeout: 30000, // Browser launch timeout
      ignoreHTTPSErrors: true
    })

    // Process each link
    for (const relativePath of config.urls) {
      if (!relativePath || typeof relativePath !== "string") {
        continue
      }

      // Construct the full URL
      const fullUrl = `${config.base_url}${relativePath}`

      console.log(`Processing: ${fullUrl}`)

      // Add delay between requests
      await delay(1000)

      // Create a new page for each request
      const page = await browser.newPage()

      // Set viewport, timeout, and request interception
      await page.setViewport({ width: 1920, height: 1080 })
      page.setDefaultTimeout(30000) // For operations like waitForSelector, evaluate

      await page.setRequestInterception(true)
      page.on("request", req => {
        const resourceType = req.resourceType()
        if (["document", "script", "xhr", "fetch"].includes(resourceType)) {
          req.continue()
        } else {
          req.abort()
        }
      })

      // Set user agent
      await page.setUserAgent(
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
      )

      // Process the page with retry logic
      let sectionHTMLContent = await retryWithBackoff(
        () => processPage(page, fullUrl),
        3, // max retries
        5000 // initial delay in ms
      )

      sectionHTMLContent = dropHeadingsOneLevel(sectionHTMLContent)

      // Convert to markdown using Turndown with the HTML string
      const sectionMDContent = turndownService.turndown(sectionHTMLContent)

      if (sectionMDContent) {
        // Add a newline before each section to ensure proper separation
        markdownContent += "\n\n" + sectionMDContent
        markdownContent += `\n\n> **Source:** [original URL](${fullUrl})\n\n---\n\n`
      }

      // Close the page after processing
      await page.close()
    }

    // Save the markdown content
    const outputPath = path.join(outputDir, config.output_file)
    await fs.promises.writeFile(outputPath, markdownContent) // Changed to use fs.promises.writeFile
    console.log(`Markdown file has been created successfully at ${outputPath}!`)

    // Format the markdown file
    await formatMarkdown(outputPath)
    console.log(`Formatted: ${outputPath}`)
  } finally {
    // Close the browser
    if (browser) {
      await browser.close()
    }
  }
}

// Check if config file path is provided
if (argv.length < 3) {
  console.error("Please provide the path to the links config file")
  console.error("Usage: node index.js <path_to_links_file>")
  process.exit(1)
}

// Only run main() if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  convertToMarkdown(argv[2]).catch(error => {
    console.error("Unhandled error in main:", error)
    console.error("Stack trace:", error.stack)
    process.exit(1)
  })
}
