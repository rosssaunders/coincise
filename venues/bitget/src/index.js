import { promises as fs } from "fs"
import puppeteer from "puppeteer"
import * as cheerio from "cheerio"
import path from "path"
import TurndownService from "turndown"
import { gfm, tables } from "turndown-plugin-gfm"
import { argv } from "process"
import process from "process"
import { formatMarkdown } from "../../shared/format-markdown.js"

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

  // Convert to markdown using Turndown with the HTML string
  return turndownService.turndown(outerHtml)
}

async function convertToMarkdown(configPath) {
  let browser
  try {
    // Read the config file
    const config = JSON.parse(await fs.readFile(configPath, "utf8"))

    const outputDir = "../../docs/bitget"

    // Create output directory if it doesn't exist
    await fs.mkdir(outputDir, { recursive: true })

    // Initialize markdown content with a header
    let markdownContent = `# ${config.title}\n\n`

    // Launch browser once for all requests
    browser = await puppeteer.launch({
      headless: "new",
      args: ["--start-maximized", "--no-sandbox", "--disable-setuid-sandbox"]
    })

    // Process each link
    for (const relativePath of config.urls) {
      if (!relativePath || typeof relativePath !== "string") {
        continue
      }

      // Construct the full URL
      const fullUrl = `${config.base_url}${relativePath}`

      try {
        console.log(`Processing: ${fullUrl}`)

        // Add delay between requests
        await delay(1000)

        // Create a new page for each request
        const page = await browser.newPage()

        // Set viewport and user agent
        await page.setUserAgent(
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
        )

        // Process the page with retry logic
        const sectionContent = await retryWithBackoff(
          () => processPage(page, fullUrl),
          3, // max retries
          5000 // initial delay in ms
        )

        if (sectionContent) {
          // Add a newline before each section to ensure proper separation
          markdownContent += "\n\n" + sectionContent
        }

        // Close the page after processing
        await page.close()
      } catch (error) {
        console.error(`Error processing ${fullUrl}:`, error.message)
        // Add a longer delay on error
        await delay(5000)
      }
    }

    // Save the markdown content
    const outputPath = path.join(outputDir, config.output_file)
    await fs.writeFile(outputPath, markdownContent)
    console.log(
      `\nMarkdown file has been created successfully at ${outputPath}!`
    )

    // Format the markdown file
    try {
      await formatMarkdown(outputPath)
      console.log(`Formatted: ${outputPath}`)
    } catch (err) {
      console.error(`Error formatting markdown:`, err)
      process.exit(1)
    }
  } catch (error) {
    console.error("Error converting to markdown:", error)
    process.exit(1)
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
