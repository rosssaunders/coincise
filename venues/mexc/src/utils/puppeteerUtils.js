'use strict'

import puppeteer from 'puppeteer'
import { info } from './logger.js'

/**
 * Launches a Puppeteer browser and loads the specified HTML file
 * @param {string} htmlFilePath - Path to the HTML file to load
 * @returns {Promise<{browser: puppeteer.Browser, page: puppeteer.Page}>}
 */
export async function launchBrowserAndLoadPage(htmlFilePath) {
  info('Launching Puppeteer...')
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const page = await browser.newPage()

  // Convert file path to file URL
  info(`Loading HTML file: ${htmlFilePath}`)

  await page.goto(htmlFilePath, { waitUntil: 'networkidle0' })

  return { browser, page }
}
