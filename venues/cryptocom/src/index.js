// scrape-docs.js
import fs from "fs"
import path from "path"
import puppeteer from "puppeteer"
import TurndownService from "turndown"
import { gfm, tables, strikethrough } from "turndown-plugin-gfm"
import { formatMarkdown } from "../../shared/format-markdown.js"
import process from "process"

const turndown = new TurndownService()
turndown.use([gfm, tables, strikethrough])

async function extractSectionsAsHtmlMap(url) {
  // launch headless browser
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  })
  const page = await browser.newPage()
  await page.goto(url, { waitUntil: "networkidle0" })

  // select all H1 elements
  const h1Elements = await page.$$("h1")
  const sectionMap = new Map()

  for (const h1Handle of h1Elements) {
    // get the H1's text content to use as the section name
    const title = await h1Handle.evaluate(el => el.textContent.trim())

    // get the HTML content of the H1 and its following siblings until the next H1
    const html = await h1Handle.evaluate(el => {
      let content = el.outerHTML
      let sibling = el.nextElementSibling
      while (sibling && sibling.tagName !== "H1") {
        content += sibling.outerHTML
        sibling = sibling.nextElementSibling
      }
      return content
    })

    // store the section name and HTML content in the map
    sectionMap.set(title, html)
  }

  await browser.close()
  return sectionMap
}

async function main() {
  const configDir = path.resolve(process.cwd(), "config")
  // Changed output directory to docs/cryptocom in the repo root
  const outputDir = path.resolve(process.cwd(), "../../docs/cryptocom")

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  // Read all JSON config files in the config directory
  const configFiles = fs
    .readdirSync(configDir)
    .filter(file => file.endsWith(".json"))

  for (const configFile of configFiles) {
    const configPath = path.join(configDir, configFile)
    const config = JSON.parse(fs.readFileSync(configPath, "utf-8"))

    // Use baseUrl from config instead of hardcoded URL
    const url =
      config.baseUrl ||
      "https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#introduction" // Fallback URL if not in config
    const sectionMap = await extractSectionsAsHtmlMap(url)

    // markdown file
    let allHtmlContent = ""

    // Log available sections for debugging
    console.log("Available sections:", Array.from(sectionMap.keys()))
    console.log("Config sections:", config.sections)

    for (const sectionName of config.sections) {
      if (sectionMap.has(sectionName)) {
        const html = sectionMap.get(sectionName)
        allHtmlContent += html
      } else {
        console.warn(`Section "${sectionName}" not found in the documentation`)
      }
    }

    if (!allHtmlContent) {
      console.warn(`No content found for config: ${configPath}`)
      continue
    }

    const markdown = turndown.turndown(allHtmlContent)

    // Use the outputFilename from the config if it exists, otherwise use the default naming
    const filename = config.outputFilename

    const filepath = path.join(outputDir, filename)
    fs.writeFileSync(filepath, markdown)
    console.log(
      `Generated markdown for config: ${configPath}, saved to: ${filepath}`
    )

    // Format the markdown file
    try {
      await formatMarkdown(filepath)
      console.log(`Formatted: ${filepath}`)
    } catch (err) {
      console.error("Error formatting markdown:", err)
      console.error("Stack trace:", err.stack)
      process.exit(1)
    }
  }
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
