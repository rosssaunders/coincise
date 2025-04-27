'use strict'

import puppeteer from 'puppeteer'
import TurndownService from 'turndown'
import turndownPluginGfm from 'turndown-plugin-gfm'
import { promises as fs } from 'fs'
import path from 'path'

// Add delay function
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

class App {
  constructor(configPath) {
    this.browser = null
    this.turndownService = null
    this.configPath = configPath
    this.config = null
  }

  async initialize() {
    // Load configuration
    try {
      const configData = await fs.readFile(this.configPath, 'utf8')
      this.config = JSON.parse(configData)

      if (
        !this.config ||
        !this.config.sections ||
        !Array.isArray(this.config.sections) ||
        this.config.sections.length === 0
      ) {
        throw new Error(
          'Configuration file must contain a "sections" array with at least one section name'
        )
      }

      if (!this.config.output) {
        throw new Error('Configuration file must specify an "output" path')
      }

      console.log(`Loaded configuration with ${this.config.sections.length} sections to extract`)
    } catch (error) {
      console.error(`Failed to load configuration file: ${error.message}`)
      throw error
    }

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

  async convertSelectedSectionsToMarkdown() {
    const page = await this.newPage()

    try {
      // Load the local HTML file
      await page.goto('https://docs.deribit.com')

      // Extract only the specified sections
      const { sections } = this.config
      const content = await page.evaluate(targetSections => {
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
        const selectedContent = []
        const matchedSections = []

        h1Sections.forEach(h1Section => {
          const sectionTitle = h1Section.textContent.trim()

          // Check if this section should be included
          const shouldInclude = targetSections.some(targetSection => {
            // Check for direct match or if the section title contains the target section name
            return (
              sectionTitle === targetSection ||
              sectionTitle.includes(targetSection) ||
              targetSection.includes(sectionTitle)
            )
          })

          if (shouldInclude) {
            matchedSections.push(sectionTitle)
            const sectionContent = [h1Section.outerHTML]
            let currentElement = h1Section

            // Get all elements until the next h1
            while ((currentElement = currentElement.nextElementSibling) !== null) {
              if (currentElement.tagName === 'H1') break
              sectionContent.push(currentElement.outerHTML)
            }

            selectedContent.push(sectionContent.join('\n'))
          }
        })

        // For debugging - return both content and matched section names
        return {
          content: selectedContent.join('\n\n'),
          matchedSections: matchedSections,
        }
      }, sections)

      console.log(`Found and extracted ${content.matchedSections.length} sections:`)
      content.matchedSections.forEach(section => console.log(`  - ${section}`))

      if (content.matchedSections.length === 0) {
        console.warn('No matching sections found. Check your section names in the config file.')
      }

      // Convert to markdown
      return this.turndownService.turndown(content.content)
    } finally {
      await page.close()
    }
  }

  async run() {
    try {
      console.log('Starting documentation conversion process...')

      // Convert the selected sections
      console.log('Converting selected API documentation sections...')
      const markdown = await this.convertSelectedSectionsToMarkdown()
      console.log('API documentation conversion complete')

      // Create the combined markdown content
      console.log('Creating documentation file...')
      let combinedMarkdown = `# ${this.config.title || 'Deribit API Documentation'}\n\n`

      // Add the converted documentation
      combinedMarkdown += `${markdown}\n\n`

      // Ensure output directory exists
      const outputDir = path.dirname(this.config.output)
      await fs.mkdir(outputDir, { recursive: true })

      // Write the markdown to the output file
      console.log(`Writing documentation to file: ${this.config.output}`)
      await fs.writeFile(this.config.output, combinedMarkdown)
      console.log('Documentation conversion complete!')
    } catch (error) {
      console.error('Error in main execution:', error)
      throw error
    }
  }
}

// Main execution
const main = async () => {
  // Get config file path from command line argument
  const configPath = process.argv[2]

  if (!configPath) {
    console.error('Error: No configuration file specified')
    console.log('Usage: node index.js <path-to-config-file>')
    process.exit(1)
  }

  const app = new App(configPath)
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
