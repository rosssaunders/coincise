"use strict"

import { launchBrowser, configurePage } from "../../shared/puppeteer.js"

/**
 * Fallback to Puppeteer when regular HTTP requests are blocked
 * @param {string} url - The URL to fetch
 * @returns {Promise<string>} - HTML content of the page
 */
export async function fallbackWithPuppeteer(url) {
  const browser = await launchBrowser()

  try {
    const page = await browser.newPage()
    await configurePage(page, { logWebsiteMessages: false })

    // Set a realistic user agent
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) " +
        "Chrome/124.0.0.0 Safari/537.36"
    )

    await page.setViewport({ width: 1280, height: 800 })

    console.log(`[gateio] Navigating to ${url} with puppeteer...`)
    await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 })

    const html = await page.content()
    await page.close()

    return html
  } finally {
    await browser.close()
  }
}
