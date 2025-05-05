// Simplified Binance Spot extraction script
"use strict"

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import process from "process"
import {
  fetchContent,
  configureTurndown,
  politeDelay
} from "../../shared/utils.js"
import { formatMarkdown } from "../../shared/format-markdown.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const CONFIG_PATH = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.resolve(__dirname, "../config/spot.json")

const DOCS_ROOT = path.resolve(__dirname, "../../../docs")
const BASE_URL = "https://developers.binance.com/docs"

// Load config
const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"))

// Setup Turndown
const turndownService = configureTurndown()

async function processAll() {
  const { endpoints, output_file, title } = config
  let content = `# ${title}\n\n`

  for (const endpoint of endpoints) {
    const url = `${BASE_URL}/${endpoint}`
    console.log(`Fetching: ${url}`)
    try {
      const html = await fetchContent(url, {
        selector: ".theme-doc-markdown.markdown",
        timeout: 30000
      })
      const md = turndownService.turndown(html)
      if (md) content += md + "\n\n"
      await politeDelay(1000) // polite delay
    } catch (err) {
      console.error(err.message)
      process.exit(1) // Exit immediately on error
    }
  }

  const outPath = path.join(DOCS_ROOT, output_file)
  fs.mkdirSync(path.dirname(outPath), { recursive: true })
  fs.writeFileSync(outPath, content)
  console.log(`Wrote: ${outPath}`)

  // Format the output file
  try {
    await formatMarkdown(outPath)
    console.log(`Formatted: ${outPath}`)
  } catch (err) {
    console.error(`Error formatting markdown:`, err)
    process.exit(1)
  }
}

// Run if called directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  processAll().catch(err => {
    console.error(err)
    process.exit(1)
  })
}
