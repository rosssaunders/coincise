import fs from "fs"
import path from "path"
import TurndownService from "turndown"
import { gfm, tables } from "turndown-plugin-gfm"
import { fileURLToPath } from "url"
import { downloadHtml, processHtml } from "./utils.js"
import { extractChangelog } from "./websocket_utils.js"
import { addListItemWithTableRule, addCodeBlockRule } from "./utils.js"
import { formatMarkdown } from "../../shared/format-markdown.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// List of endpoints to scrape
const endpoints = ["unified/ws/en/"]

async function run() {
  const turndownService = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced"
  })
  turndownService.use(gfm)
  turndownService.use(tables)
  addListItemWithTableRule(turndownService)
  addCodeBlockRule(turndownService)

  for (const endpoint of endpoints) {
    const url = `https://www.gate.io/docs/developers/${endpoint}`
    const htmlFilePath = path.join(
      __dirname,
      `gateio_${endpoint.replace(/\//g, "_")}.html`
    )
    const outputFilePath = path.join(
      __dirname,
      `../../../docs/gateio/unified_websocket_api.md`
    )
    const changelogFilePath = path.join(
      __dirname,
      `../../../docs/gateio/unified_websocket_change_log.md`
    )

    await downloadHtml(url, htmlFilePath)
    const html = fs.readFileSync(htmlFilePath, "utf8")

    // Extract changelog section and get modified HTML
    const { html: modifiedHtml, changelog } = extractChangelog(html)

    if (changelog) {
      // Convert changelog to markdown and save to separate file
      const changelogMarkdown = turndownService.turndown(changelog)
      fs.writeFileSync(changelogFilePath, changelogMarkdown)
      console.log(`Changelog extracted and saved to: ${changelogFilePath}`)

      // Format the changelog markdown file
      await formatMarkdown(changelogFilePath)
      console.log(`Formatted: ${changelogFilePath}`)
    }

    // Process the modified HTML (without changelog)
    const markdown = processHtml(modifiedHtml, turndownService)
    fs.writeFileSync(outputFilePath, markdown)
    console.log(`Markdown file created at: ${outputFilePath}`)

    // Format the markdown file
    await formatMarkdown(outputFilePath)
    console.log(`Formatted: ${outputFilePath}`)

    fs.unlink(htmlFilePath, err => {
      if (err) {
        console.error("Error deleting HTML file:", err)
      } else {
        console.log("HTML file deleted successfully.")
      }
    })
  }
}

run().catch(console.error)
