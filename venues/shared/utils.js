"use strict"

import puppeteer from "puppeteer"
import TurndownService from "turndown"
import { gfm } from "turndown-plugin-gfm"

/**
 * Launch a new Puppeteer browser instance with standardized configuration
 * @returns {Promise<Browser>} Puppeteer browser instance
 */
export const launchBrowser = async () => {
  return await puppeteer.launch({
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
    timeout: 30000,
    ignoreHTTPSErrors: true
  })
}

/**
 * Configure a Puppeteer page with standardized settings
 * @param {Page} page - Puppeteer page instance
 * @returns {Promise<void>}
 */
export const configurePage = async page => {
  await page.setViewport({ width: 1920, height: 1080 })
  await page.setDefaultNavigationTimeout(30000)
  await page.setDefaultTimeout(30000)

  // Enable request interception
  await page.setRequestInterception(true)

  // Block unnecessary resources
  page.on("request", request => {
    const resourceType = request.resourceType()
    if (["document", "script", "xhr", "fetch"].includes(resourceType)) {
      request.continue()
    } else {
      request.abort()
    }
  })
}

/**
 * Create a new Turndown service instance with GFM support
 * @returns {TurndownService} Configured Turndown service
 */
export const createTurndownService = () => {
  const turndownService = new TurndownService({
    codeBlockStyle: "fenced",
    fence: "```"
  })
  turndownService.use(gfm)
  return turndownService
}

/**
 * Configure Turndown for HTML to Markdown conversion
 * @returns {TurndownService} Configured Turndown service
 */
export const configureTurndown = () => {
  const turndownService = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced"
  })

  // Add GitHub Flavored Markdown plugin
  turndownService.use(gfm)

  // Configure turndown for code blocks
  turndownService.addRule("codeBlocks", {
    filter: ["pre"],
    replacement: function (content, node) {
      const language =
        node.querySelector("code")?.className.replace("language-", "") || ""
      return `\n\`\`\`${language}\n${content.trim()}\n\`\`\`\n`
    }
  })

  // Add custom rule for tables without headers
  turndownService.addRule("tablesWithoutHeaders", {
    filter: ["table"],
    replacement: function (content, node) {
      const rows = Array.from(node.querySelectorAll("tr"))
      if (rows.length === 0) return ""

      // If there's no thead, create a markdown table with empty headers
      if (!node.querySelector("thead")) {
        const firstRow = rows[0]
        const cells = Array.from(firstRow.querySelectorAll("td"))
        const headerRow = cells.map(() => "---").join(" | ")
        const contentRows = rows
          .map(row => {
            const cells = Array.from(row.querySelectorAll("td"))
            return cells.map(cell => cell.textContent.trim()).join(" | ")
          })
          .join("\n")

        return `\n| ${headerRow} |\n| ${contentRows} |\n`
      }

      return content
    }
  })

  return turndownService
}

/**
 * Fetch content from a URL using Puppeteer
 * @param {string} url - URL to fetch
 * @param {Object} options - Additional options
 * @param {string} options.selector - CSS selector to wait for
 * @param {number} options.timeout - Timeout in milliseconds
 * @returns {Promise<string>} HTML content of the page
 */
export const fetchContent = async (url, options = {}) => {
  const { selector = "body", timeout = 30000 } = options
  let browser = null
  let page = null

  try {
    browser = await launchBrowser()
    page = await browser.newPage()
    await configurePage(page)

    await page.goto(url, {
      waitUntil: "networkidle2",
      timeout
    })

    // Wait for the content to load
    await page.waitForSelector(selector, { timeout })

    // Extract the page content
    const content = await page.evaluate(sel => {
      const el = document.querySelector(sel)
      return el ? el.innerHTML : document.body.innerHTML
    }, selector)

    if (!content) {
      throw new Error(`No content found on ${url}`)
    }

    return content
  } finally {
    if (page) await page.close()
    if (browser) await browser.close()
  }
}

/**
 * Add a polite delay between requests
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise<void>}
 */
export const politeDelay = ms => new Promise(resolve => setTimeout(resolve, ms))
