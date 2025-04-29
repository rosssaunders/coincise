'use strict'

import { launchBrowser, configurePage } from '../../../../shared/utils.js'
import { info } from './logger.js'

/**
 * Launches a Puppeteer browser and loads the specified HTML file
 * @param {string} htmlFilePath - Path to the HTML file to load
 * @returns {Promise<{browser: puppeteer.Browser, page: puppeteer.Page}>}
 */
export async function launchBrowserAndLoadPage(htmlFilePath) {
  info('Launching Puppeteer...')
  const browser = await launchBrowser()
  const page = await browser.newPage()
  await configurePage(page)

  // Convert file path to file URL
  info(`Loading HTML file: ${htmlFilePath}`)
  await page.goto(htmlFilePath, { waitUntil: 'networkidle0' })

  return { browser, page }
}
