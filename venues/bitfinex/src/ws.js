'use strict'

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { JSDOM } from 'jsdom'
import TurndownService from 'turndown'
import { gfm } from 'turndown-plugin-gfm'
import puppeteer from 'puppeteer'

// Set up directory paths
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Get config file name from command line arguments
const configFileName = process.argv[2] || 'ws_private.json'
console.log(`Using config file: ${configFileName}`)

// Load configuration
const config = JSON.parse(
  fs.readFileSync(path.join(__dirname, `../config/${configFileName}`), 'utf8')
)

/**
 * Fetch content from a URL using Puppeteer
 * @param {string} url - URL to fetch
 * @returns {Promise<string>} HTML content of the page
 */
const fetchContent = async url => {
  console.log(`Fetching content from: ${url}`)

  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu',
    ],
  })

  try {
    const page = await browser.newPage()
    await page.goto(url, { waitUntil: 'networkidle2' })

    // Wait for the content to load
    await page.waitForSelector('body', { timeout: 5000 })

    // Extract the page content
    const content = await page.evaluate(() => {
      return document.body.innerHTML
    })

    return content
  } catch (error) {
    console.error(`Error fetching content from ${url}:`, error)
    throw error
  } finally {
    await browser.close()
  }
}

/**
 * Configure Turndown for HTML to Markdown conversion
 * @returns {TurndownService} Configured Turndown service
 */
const configureTurndown = () => {
  // Set up Turndown for HTML to Markdown conversion
  const turndownService = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
  })

  // Add GitHub Flavored Markdown plugin
  turndownService.use(gfm)

  // Configure turndown for code blocks
  turndownService.addRule('codeBlocks', {
    filter: ['pre'],
    replacement: function (content, node) {
      const language = node.querySelector('code')?.className.replace('language-', '') || ''
      return `\n\`\`\`${language}\n${content.trim()}\n\`\`\`\n`
    },
  })

  return turndownService
}

/**
 * Extract links from the main documentation page
 * @param {string} htmlContent - Raw HTML content to process
 * @returns {Array} Array of endpoint objects with title and URL
 */
const extractLinks = htmlContent => {
  const { document } = new JSDOM(htmlContent).window
  const links = []

  // Find all section headers
  const sections = Array.from(document.querySelectorAll('h1, h2, h3'))

  for (const section of sections) {
    // Find the specific section we're looking for
    if (section.textContent.trim().includes(config.section)) {
      let element = section.nextElementSibling

      // Look for lists after the section header
      while (element && !element.matches('h1, h2, h3')) {
        if (element.tagName === 'UL') {
          // Extract links from this list
          const listLinks = Array.from(element.querySelectorAll('a')).map(a => ({
            title: a.textContent.trim(),
            url: a.getAttribute('href'),
          }))

          links.push(...listLinks)
        }
        element = element.nextElementSibling
      }
    }
  }

  return links
}

/**
 * Fetch and process content from a specific URL
 * @param {string} url - URL to fetch
 * @param {string} baseUrl - Base URL for relative links
 * @param {TurndownService} turndownService - Configured Turndown service
 * @returns {Promise<string>} Markdown content
 */
const processUrl = async (url, baseUrl, turndownService) => {
  const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`
  const content = await fetchContent(fullUrl)

  if (!content) {
    return `# Error\n\nUnable to fetch content from ${fullUrl}.`
  }

  // Extract main content
  const { document } = new JSDOM(content).window
  const mainContent = document.querySelector('.content-body') || document.body

  // Convert HTML to Markdown
  return turndownService.turndown(mainContent.innerHTML)
}

/**
 * Main function to extract WebSocket documentation
 */
const main = async () => {
  try {
    // Configure Turndown
    const turndownService = configureTurndown()

    let markdown = `# ${config.title}\n\n`

    // Process each URL in the configuration
    for (const url of config.urls) {
      console.log(`Processing URL: ${url}`)

      // Fetch content from the URL
      const content = await fetchContent(url)

      // Extract the main content
      const { document } = new JSDOM(content).window
      const mainContent = document.querySelector('.content-body') || document.body

      // Convert to markdown and add to the output
      const pageMarkdown = turndownService.turndown(mainContent.innerHTML)
      markdown += `${pageMarkdown}\n\n---\n\n`

      // If this is the main page with links to other pages, extract and process those links
      if (url === config.mainDocsUrl) {
        const links = extractLinks(content)

        // Process each linked page
        for (const link of links) {
          console.log(`Processing endpoint: ${link.title}`)

          const endpointMarkdown = await processUrl(link.url, config.baseUrl, turndownService)
          markdown += `## ${link.title}\n\n${endpointMarkdown}\n\n---\n\n`
        }
      }
    }

    // Ensure output directory exists
    const outputDir = path.dirname(path.join(__dirname, config.output))
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    // Write the markdown file
    fs.writeFileSync(path.join(__dirname, config.output), markdown)

    console.log(`Successfully extracted WebSocket documentation to ${config.output}`)
  } catch (error) {
    console.error('Error extracting WebSocket documentation:', error)
    process.exit(1)
  }
}

// Execute the main function
main().catch(error => {
  console.error('Fatal error:', error)
  process.exit(1)
})
