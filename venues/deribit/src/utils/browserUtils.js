'use strict'

import { launchBrowser, configurePage } from '../../../../shared/utils.js'

/**
 * Utility class to handle browser operations
 */
class BrowserUtils {
  /**
   * Initialize a new browser instance
   * @returns {Promise<Browser>} Puppeteer browser instance
   */
  static async initBrowser() {
    return await launchBrowser()
  }

  /**
   * Create a new page in the browser with realistic settings
   * @param {Browser} browser - Puppeteer browser instance
   * @returns {Promise<Page>} Puppeteer page instance
   */
  static async createPage(browser) {
    const page = await browser.newPage()
    await configurePage(page)
    await page.setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
    )
    return page
  }
}

export default BrowserUtils
