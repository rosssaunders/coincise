'use strict'

import puppeteer from 'puppeteer'
import TurndownService from 'turndown'
import turndownPluginGfm from 'turndown-plugin-gfm'
import { promises as fs } from 'fs'

const urls = [
  'https://support.deribit.com/hc/en-us/articles/25944617523357-Rate-Limits',
  'https://support.deribit.com/hc/en-us/articles/25944603459613-Connection-Management',
  'https://support.deribit.com/hc/en-us/articles/25973087226909-Accessing-historical-trades-and-orders-using-API',
  'https://support.deribit.com/hc/en-us/articles/25944617449373-API-Usage-Policy',
  'https://support.deribit.com/hc/en-us/articles/25944617582877-Server-Infrastructure',
  'https://support.deribit.com/hc/en-us/articles/25944635815197-Asia-Gateway',
  'https://support.deribit.com/hc/en-us/articles/25944588342941-Deribit-AWS-Endpoint-Service-instruction',
  'https://support.deribit.com/hc/en-us/articles/25944617728285-Deribit-AWS-Multicast-Service-Instruction',
]

// Add delay function
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

class App {
  constructor() {
    this.browser = null
    this.turndownService = null
  }

  async initialize() {
    // Initialize Turndown with GFM
    this.turndownService = new TurndownService({
      codeBlockStyle: 'fenced',
      fence: '```',
    })

    // Add GFM plugins (tables, strikethrough, etc)
    this.turndownService.use(turndownPluginGfm.gfm)

    // Add custom rule to preserve line breaks in table cells
    this.turndownService.addRule('tableCellWithBr', {
      filter: 'td',
      replacement: (content, node) => {
        const cellContent = node.innerHTML.replace(/<br\s*\/?>/gi, '<br>')
        return `| ${cellContent} `
      },
    })

    // Launch browser with more realistic settings
    this.browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--window-size=1920x1080',
      ],
    })
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close()
      this.browser = null
    }
  }

  async newPage() {
    const page = await this.browser.newPage()
    // Set a realistic user agent
    await page.setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
    )
    return page
  }

  async convertSupportArticleToMarkdown(url) {
    const page = await this.newPage()

    try {
      // Load the support article with a longer timeout
      await page.goto(url, {
        waitUntil: 'networkidle0',
        timeout: 60000,
      })

      // Add a random delay to simulate human behavior
      await delay(Math.random() * 2000 + 1000)

      // Wait for the article to be present with a longer timeout
      await page.waitForSelector('article', { timeout: 60000 })

      // Extract the article content
      const content = await page.evaluate(() => {
        // Get the article element
        const article = document.querySelector('article')
        if (!article) {
          console.log('Article not found in DOM')
          return null
        }

        // Get the header and content section
        const header = article.querySelector('header.mb-5')
        const contentSection = article.querySelector('section.content[itemprop="articleBody"]')

        if (!header || !contentSection) {
          console.log('Required sections not found in article')
          return null
        }

        // Create a container for the content
        const container = document.createElement('div')
        container.appendChild(header.cloneNode(true))
        container.appendChild(contentSection.cloneNode(true))

        return container.innerHTML
      })

      if (!content) {
        console.error(`No article content found for ${url}`)
        // Take a screenshot for debugging
        await page.screenshot({ path: `debug-${url.split('/').pop()}.png` })
        return null
      }

      // Convert to markdown
      const markdown = this.turndownService.turndown(content)
      return markdown
    } catch (error) {
      console.error(`Error processing ${url}:`, error)
      // Take a screenshot on error
      await page.screenshot({ path: `error-${url.split('/').pop()}.png` })
      return null
    } finally {
      await page.close()
    }
  }

  async convertDocsToMarkdown() {
    const page = await this.newPage()

    try {
      // Load the local HTML file
      await page.goto('https://docs.deribit.com')

      // Extract all sections
      const content = await page.evaluate(() => {
        // First, remove all highlight divs from the document
        const highlightDivs = document.querySelectorAll('div.highlight')
        highlightDivs.forEach(div => div.remove())

        // Remove all "Try in API console" links
        const apiConsoleLinks = document.querySelectorAll('a[href*="api_console"]')
        apiConsoleLinks.forEach(link => {
          if (link.textContent.includes('Try in API console')) {
            link.remove()
          }
        })

        // Remove example JSON structure blockquotes
        const blockquotes = document.querySelectorAll('blockquote.open')
        blockquotes.forEach(blockquote => {
          const paragraphs = blockquote.querySelectorAll('p')
          paragraphs.forEach(p => {
            if (p.textContent.includes('The above command returns JSON structured like this')) {
              blockquote.remove()
            }
          })
        })

        // Get all h1 sections
        const h1Sections = document.querySelectorAll('h1')
        const allContent = []

        h1Sections.forEach(h1Section => {
          const sectionContent = [h1Section.outerHTML]
          let currentElement = h1Section

          // Get all elements until the next h1
          while ((currentElement = currentElement.nextElementSibling) !== null) {
            if (currentElement.tagName === 'H1') break
            sectionContent.push(currentElement.outerHTML)
          }

          allContent.push(sectionContent.join('\n'))
        })

        return allContent.join('\n\n')
      })

      // Convert to markdown
      return this.turndownService.turndown(content)
    } finally {
      await page.close()
    }
  }

  async run() {
    try {
      console.log('Starting documentation conversion process...')

      // First convert the main docs
      console.log('Converting main API documentation...')
      const mainDocsMarkdown = await this.convertDocsToMarkdown()
      console.log('Main API documentation conversion complete')

      // Create the combined markdown content
      console.log('Creating combined documentation...')
      let combinedMarkdown = '# Deribit API Documentation\n\n'

      // Add the main API documentation
      combinedMarkdown += `${mainDocsMarkdown}\n\n`

      // Add support articles
      console.log('Processing support articles...')
      combinedMarkdown += '## Support Articles\n\n'
      for (const url of urls) {
        console.log(`Processing support article: ${url}`)
        const articleMarkdown = await this.convertSupportArticleToMarkdown(url)
        if (articleMarkdown) {
          combinedMarkdown += `${articleMarkdown}\n\n`
          console.log(`Successfully processed article: ${url}`)
        } else {
          console.log(`Failed to process article: ${url}`)
        }
        // Add a delay between articles
        await delay(3000)
      }

      // Write the combined markdown to a single file
      console.log('Writing combined documentation to file...')
      await fs.writeFile('../../docs/deribit/api.md', combinedMarkdown)
      console.log('Documentation conversion complete! Output file: deribit/api.md')
    } catch (error) {
      console.error('Error in main execution:', error)
      throw error
    }
  }
}

// Main execution
const main = async () => {
  const app = new App()
  try {
    await app.initialize()
    await app.run()
    process.exit(0)
  } catch (error) {
    console.error('Unhandled error:', error)
    process.exit(1)
  } finally {
    await app.cleanup()
  }
}

main().catch(error => {
  console.error('Unhandled error:', error)
  process.exit(1)
})
