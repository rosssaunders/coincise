// Simplified Binance Spot extraction script
'use strict'

import fs from 'fs'
import path from 'path'
import puppeteer from 'puppeteer'
import TurndownService from 'turndown'
import { gfm } from 'turndown-plugin-gfm'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const CONFIG_PATH = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.resolve(__dirname, '../config/spot.json')

const DOCS_ROOT = path.resolve(__dirname, '../../../docs')
const BASE_URL = 'https://developers.binance.com/docs'

// Load config
const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'))

// Setup Turndown with GFM
const turndownService = new TurndownService({
  codeBlockStyle: 'fenced',
  fence: '```',
})
gfm(turndownService)

async function fetchAndConvert(url) {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
  let markdown = ''
  try {
    const page = await browser.newPage()
    await page.setViewport({ width: 1920, height: 1080 })
    await page.goto(url, { waitUntil: 'networkidle0' })
    await page.waitForSelector('.theme-doc-markdown.markdown', { timeout: 30000 })
    const html = await page.evaluate(() => {
      const el = document.querySelector('.theme-doc-markdown.markdown')
      return el ? el.outerHTML : ''
    })
    markdown = turndownService.turndown(html)
    await page.close()
  } catch (err) {
    await browser.close()
    throw new Error(`Failed to fetch or convert ${url}: ${err.message}`)
  } finally {
    await browser.close()
  }
  return markdown
}

async function processAll() {
  const { endpoints, output_file, title } = config
  let content = `# ${title}\n\n`

  for (const endpoint of endpoints) {
    const url = `${BASE_URL}/${endpoint}`
    console.log(`Fetching: ${url}`)
    try {
      const md = await fetchAndConvert(url)
      if (md) content += md + '\n\n'
      await new Promise(r => setTimeout(r, 5000)) // polite delay
    } catch (err) {
      console.error(err.message)
      process.exit(1) // Exit immediately on error
    }
  }

  const outPath = path.join(DOCS_ROOT, output_file)
  fs.mkdirSync(path.dirname(outPath), { recursive: true })
  fs.writeFileSync(outPath, content)
  console.log(`Wrote: ${outPath}`)
}

// Run if called directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  processAll().catch(err => {
    console.error(err)
    process.exit(1)
  })
}
