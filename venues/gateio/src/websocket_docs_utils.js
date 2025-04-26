import FireCrawlApp from '@mendable/firecrawl-js'
import fs from 'fs'
import dotenv from 'dotenv'
import path from 'path'
import { JSDOM } from 'jsdom'
import axios from 'axios'
import { fileURLToPath } from 'url'

// Load environment variables from .env file
dotenv.config()

// Get the current file path
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export async function scrapeWebsocketDocs(endpoints, outputPath) {
  const app = new FireCrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY })
  let combinedContent = ''

  // Iterate through each endpoint
  for (const endpoint of endpoints) {
    console.log(`Scraping endpoint: ${endpoint}`)
    const url = `https://www.gate.io/docs/developers/${endpoint}`

    const scrapeResult = await app.scrapeUrl(url, {
      formats: ['markdown'],
      onlyMainContent: false,
      includeTags: ['div.page__container'],
    })

    // Extract the content
    let content = ''
    if (scrapeResult.markdown) {
      content = scrapeResult.markdown
    }

    if (content) {
      // Add a header for each section
      combinedContent += `\n\n# ${endpoint.toUpperCase()}\n\n`
      combinedContent += content
      console.log(`Successfully scraped ${endpoint}`)
    } else {
      console.error(`No content found for endpoint: ${endpoint}`)
    }
  }

  // Write the combined content to a single file
  if (combinedContent) {
    fs.writeFileSync(outputPath, combinedContent)
    console.log('All documentation combined and saved successfully.')
  } else {
    console.error('No content found in any of the scrape results.')
  }
}

// Function to download HTML file
export function downloadHtml(url, filePath) {
  return new Promise((resolve, reject) => {
    console.log(`Downloading HTML from ${url}...`)
    const file = fs.createWriteStream(filePath)
    axios
      .get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0',
          Accept: 'text/html',
        },
        responseType: 'stream',
      })
      .then(response => {
        if (response.status !== 200) {
          reject(new Error(`Failed to download: HTTP status code ${response.status}`))
          return
        }
        response.data.pipe(file)
        file.on('finish', () => {
          file.close()
          console.log('Download completed successfully.')
          resolve()
        })
      })
      .catch(err => {
        fs.unlink(filePath, () => {})
        reject(err)
      })
    file.on('error', err => {
      fs.unlink(filePath, () => {})
      reject(err)
    })
  })
}

// Function to process HTML and convert to markdown
export function processHtml(html, turndownService) {
  if (!turndownService) {
    console.error('TurndownService is not initialized.')
    return ''
  }
  const dom = new JSDOM(html)
  const document = dom.window.document
  const contentContainer = document.querySelector('div.col-md-9.col-lg-10.content__container')
  if (!contentContainer) {
    console.error('Could not find main content container')
    return ''
  }
  const content = contentContainer.innerHTML
  console.log('Content extracted successfully.')
  return turndownService.turndown(content)
}

// Helper functions for adding custom Turndown rules
export function addTableRule(turndownService) {
  turndownService.addRule('table', {
    filter: 'table',
    replacement: function (content, node) {
      const rows = Array.from(node.querySelectorAll('tr'))
      if (rows.length === 0) return ''

      let markdown = ''

      // Process header
      const headerCells = Array.from(rows[0].querySelectorAll('th'))
      if (headerCells.length > 0) {
        markdown += '|'
        headerCells.forEach(cell => {
          markdown += ` ${cell.textContent.trim()} |`
        })
        markdown += '\n|'
        headerCells.forEach(() => {
          markdown += ' --- |'
        })
        markdown += '\n'
      }

      // Process rows
      const startRow = headerCells.length > 0 ? 1 : 0
      for (let i = startRow; i < rows.length; i++) {
        const cells = Array.from(rows[i].querySelectorAll('td'))
        if (cells.length > 0) {
          markdown += '|'
          cells.forEach(cell => {
            markdown += ` ${cell.textContent.trim().replace(/\n/g, ' ')} |`
          })
          markdown += '\n'
        }
      }

      return markdown + '\n'
    },
  })
}

export function addListItemWithTableRule(turndownService) {
  turndownService.addRule('listItemWithTable', {
    filter: function (node) {
      return node.nodeName === 'LI' && node.querySelector('table')
    },
    replacement: function (content, node) {
      let markdown = '- '
      markdown += content.trim().replace(/\n/g, '\n  ')
      return markdown + '\n'
    },
  })
}

export function addCodeBlockRule(turndownService) {
  turndownService.addRule('codeBlock', {
    filter: 'pre',
    replacement: function (content, node) {
      let language = ''
      if (node.className) {
        const classes = node.className.split(' ')
        const langClass = classes.find(cls => cls.startsWith('language-'))
        if (langClass) {
          language = langClass.replace('language-', '').trim()
        }
      }
      const trimmedContent = content.trim()
      return `\n\`\`\`${language}\n${trimmedContent}\n\`\`\`\n`
    },
  })
}
