import puppeteer from 'puppeteer'
import { MarkdownConverter } from './markdownConverter.js'

/**
 * Class for processing documentation from Binance API
 */
class DocProcessor {
  /**
   * @param {string[]} endpoints - Array of API endpoints to process
   * @param {string} outputFile - Path to the output file
   * @param {string} title - Title for the documentation
   */
  constructor(endpoints, outputFile, title) {
    /** @private */
    this.endpoints = endpoints
    /** @private */
    this.outputFile = outputFile
    /** @private */
    this.title = title
    /** @private */
    this.baseUrl = 'https://developers.binance.com/docs'
    /** @private */
    this.markdownConverter = new MarkdownConverter()
    /** @private */
    this.browser = null
  }

  /**
   * Process the documentation from all endpoints
   * @returns {Promise<string>} The markdown content
   * @throws {Error} If there's an error processing the documentation
   */
  async processDocs() {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    try {
      // Launch browser
      this.browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      })

      let content = `# ${this.title}\n\n`

      for (const endpoint of this.endpoints) {
        const url = `${this.baseUrl}/${endpoint}`
        console.log(`Fetching documentation from: ${url}`)

        try {
          const page = await this.browser.newPage()

          // Set viewport to ensure consistent rendering
          await page.setViewport({ width: 1920, height: 1080 })

          // Navigate to the page and wait for the content to load
          await page.goto(url, { waitUntil: 'networkidle0' })

          // Wait for the specific element we want
          await page.waitForSelector('.theme-doc-markdown.markdown', { timeout: 10000 })

          // Get the HTML content of the specific div
          const html = await page.evaluate(() => {
            const element = document.querySelector('.theme-doc-markdown.markdown')
            return element ? element.outerHTML : ''
          })

          await page.close()

          if (!html) {
            console.warn(`No content found in theme-doc-markdown markdown class for ${url}`)
            // Add delay before next request
            await delay(5000)
            continue
          }

          console.log(`Successfully fetched ${url}`)
          const markdown = this.convertToMarkdown(html)

          if (!markdown) {
            console.warn(`Failed to convert content to markdown for ${url}`)
            // Add delay before next request
            await delay(5000)
            continue
          }

          content += `${markdown}\n\n`
        } catch (error) {
          console.error(`Error processing ${url}:`, error)
          throw error
        }
        // Add a 5 second delay before the next request
        await delay(1000)
      }

      return content
    } catch (error) {
      console.error('Error in processDocs:', error)
      throw error
    } finally {
      // Always close the browser
      if (this.browser) {
        await this.browser.close()
      }
    }
  }

  /**
   * Convert HTML content to Markdown
   * @private
   * @param {string} html - The HTML content to convert
   * @returns {string} The converted Markdown content
   */
  convertToMarkdown(html) {
    return this.markdownConverter.convertToMarkdown(html)
  }
}

export { DocProcessor }

