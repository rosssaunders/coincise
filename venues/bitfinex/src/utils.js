'use strict'

import puppeteer from 'puppeteer'

/**
 * Launch a new Puppeteer browser instance with standardized configuration
 * @returns {Promise<Browser>} Puppeteer browser instance
 */
export const launchBrowser = async () => {
  return await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--single-process',
      '--no-first-run',
      '--no-zygote',
      '--disable-extensions',
      '--disable-component-extensions-with-background-pages',
      '--disable-background-timer-throttling',
      '--disable-backgrounding-occluded-windows',
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process',
      '--password-store=basic',
    ],
    timeout: 30000,
    ignoreHTTPSErrors: true,
  })
}

/**
 * Configure a new page with standardized settings
 * @param {Page} page - Puppeteer page instance
 * @returns {Promise<void>}
 */
export const configurePage = async page => {
  await page.setViewport({ width: 1920, height: 1080 })
  await page.setDefaultNavigationTimeout(30000)
  await page.setDefaultTimeout(30000)

  // Enable request interception
  await page.setRequestInterception(true)
  page.on('request', request => {
    const resourceType = request.resourceType()
    if (['document', 'script', 'xhr', 'fetch'].includes(resourceType)) {
      request.continue()
    } else {
      request.abort()
    }
  })
}
