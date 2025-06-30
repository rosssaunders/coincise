"use strict"

import puppeteer from "puppeteer"
import TurndownService from "turndown"
import { gfm } from "turndown-plugin-gfm"
import fs from "fs/promises"
import path from "path"

/**
 * Scrapes the KuCoin rate limit documentation page
 * @param {string} url - The URL to scrape
 * @param {string} outputDir - Directory to save the scraped content
 * @returns {Promise<void>}
 */
export async function scrapeRateLimitDocs(url, outputDir) {
  let browser
  let page

  try {
    console.log(`Starting rate limit documentation scrape from: ${url}`)

    // Launch browser with optimized settings
    browser = await puppeteer.launch({
      headless: "new",
      args: [
        "--no-sandbox",
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

    page = await browser.newPage()

    // Set viewport and configure page
    await page.setViewport({ width: 1920, height: 1080 })

    // Enable request interception for resource optimization
    await page.setRequestInterception(true)
    page.on("request", request => {
      const resourceType = request.resourceType()
      if (["document", "script", "xhr", "fetch"].includes(resourceType)) {
        request.continue()
      } else {
        request.abort()
      }
    })

    // Navigate to the rate limit documentation page
    console.log("Navigating to rate limit documentation...")
    await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: 30000
    })

    // Wait for content to load
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Extract the main content area
    const content = await page.evaluate(() => {
      // Try multiple selectors to find the main content
      const selectors = [
        "main",
        ".content",
        ".main-content",
        ".documentation-content",
        ".doc-content",
        "article",
        ".markdown-body",
        "[role='main']"
      ]

      for (const selector of selectors) {
        const element = document.querySelector(selector)
        if (element) {
          return element.outerHTML
        }
      }

      // Fallback to body if no main content found
      return document.body.outerHTML
    })

    if (!content) {
      throw new Error("Could not extract content from the page")
    }

    // Convert HTML to Markdown
    const turndownService = new TurndownService({
      headingStyle: "atx",
      codeBlockStyle: "fenced",
      fence: "```"
    })

    // Add GitHub Flavored Markdown support
    turndownService.use(gfm)

    // Custom rules for better conversion
    turndownService.addRule("codeBlock", {
      filter: "pre",
      replacement: (content, node) => {
        const code = node.querySelector("code")
        if (code) {
          const language = code.className.match(/language-(\w+)/)?.[1] || ""
          return `\n\`\`\`${language}\n${code.textContent}\n\`\`\`\n`
        }
        return `\n\`\`\`\n${content}\n\`\`\`\n`
      }
    })

    const markdown = turndownService.turndown(content)

    // Ensure output directory exists
    await fs.mkdir(outputDir, { recursive: true })

    // Save the markdown content
    const outputPath = path.join(outputDir, "rate_limit_docs.md")
    await fs.writeFile(outputPath, markdown, "utf8")

    console.log(`Rate limit documentation saved to: ${outputPath}`)

  } catch (error) {
    console.error("Error scraping rate limit documentation:", error)
    console.error("Stack trace:", error.stack)
    throw error
  } finally {
    // Clean up resources
    if (page) {
      await page.close()
    }
    if (browser) {
      await browser.close()
    }
  }
}

/**
 * Main function for rate limit scraping
 * @param {Object} config - Configuration object with rateLimitUrl and outputDir
 * @returns {Promise<void>}
 */
export async function scrapeRateLimit(config) {
  const url = config.rateLimitUrl || "https://www.kucoin.com/docs-new/rate-limit"
  const outputDir = config.outputDir || "../../docs/kucoin"

  await scrapeRateLimitDocs(url, outputDir)
}