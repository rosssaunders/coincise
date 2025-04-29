'use strict'

import puppeteer from 'puppeteer'
import TurndownService from 'turndown'
import { gfm } from 'turndown-plugin-gfm'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { launchBrowser, configurePage } from '../../../../shared/utils.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export class BaseProcessor {
  constructor(configPath, processorType) {
    this.configPath = path.join(__dirname, '../../config', configPath)
    this.processorType = processorType
    this.browser = null
    this.page = null
    this.turndownService = new TurndownService({
      codeBlockStyle: 'fenced',
      fence: '```',
    })
    this.turndownService.use(gfm)
    // Add custom rule to preserve line breaks in table cells
    this.turndownService.addRule('tableCellWithBr', {
      filter: 'td',
      replacement: (content, node) => {
        const cellContent = node.innerHTML.replace(/<br\s*\/?>/gi, '<br>')
        return `| ${cellContent} `
      },
    })
  }

  async initialize() {
    this.browser = await launchBrowser()
    this.page = await this.browser.newPage()
    await configurePage(this.page)
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close()
    }
  }

  async extractContent(url) {
    await this.page.goto(url, { waitUntil: 'networkidle0' })

    return await this.page.evaluate(() => {
      const selectors = [
        '.theme-doc-markdown',
        '.markdown-body',
        '.theme-default-content',
        'article',
        'main',
      ]

      for (const selector of selectors) {
        const element = document.querySelector(selector)
        if (element) {
          const unwantedElements = element.querySelectorAll('nav, .sidebar, .toc, .header-anchor')
          unwantedElements.forEach(el => el.remove())
          return element.innerHTML
        }
      }
      return ''
    })
  }

  async processEndpoint(endpoint, url) {
    const timestamp = new Date().toLocaleTimeString()
    console.log(`\n[${timestamp}] 🔄 Processing endpoint: ${endpoint}`)
    console.log(`📍 URL: ${url}`)

    const content = await this.extractContent(url)
    if (!content) {
      console.warn(`⚠️  No content found for endpoint: ${endpoint}`)
      return null
    }

    console.log(`✅ Successfully processed: ${endpoint}`)
    return this.turndownService.turndown(content)
  }

  async generateDocs() {
    try {
      await this.initialize()

      const config = JSON.parse(fs.readFileSync(this.configPath, 'utf8'))
      const { endpoints, output_file, title } = config

      let markdownContent = `# ${title}\n\n`

      for (const endpoint of endpoints) {
        const url = this.constructUrl(endpoint)
        const markdown = await this.processEndpoint(endpoint, url)
        if (markdown) {
          markdownContent += `${markdown}\n\n`
        }
      }

      const outputPath = path.join(__dirname, '../../../../docs/', output_file)
      fs.mkdirSync(path.dirname(outputPath), { recursive: true })
      fs.writeFileSync(outputPath, markdownContent)

      console.log(
        `\n✨ ${this.processorType} API documentation successfully generated! ✨\n📄 Output file: ${output_file}\n`
      )
    } catch (error) {
      console.error(`Error generating ${this.processorType} API documentation:`, error)
      throw error
    } finally {
      await this.cleanup()
    }
  }

  // To be implemented by child classes
  constructUrl(endpoint) {
    return `https://bybit-exchange.github.io/docs/v5/${endpoint}`
  }
}
