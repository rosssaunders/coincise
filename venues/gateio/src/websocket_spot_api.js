"use strict"
import fs from "fs"
import path from "path"
import TurndownService from "turndown"
import { gfm, tables } from "turndown-plugin-gfm"
import { fileURLToPath } from "url"
import process from "process"
import { downloadHtml, processHtml } from "./utils.js"
import { addListItemWithTableRule, addCodeBlockRule } from "./utils.js"
import { formatMarkdown } from "../../shared/format-markdown.js"
import { load } from "cheerio"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Extract changelog section from WebSocket Spot API HTML
 * @param {string} html The HTML content to extract changelog from
 * @returns {Object} Object containing modified HTML and extracted changelog
 */
export const extractSpotWebsocketChangelog = html => {
  const $ = load(html)
  const contentBlock = $(".content-block__cont")
  if (!contentBlock.length) {
    console.warn("No .content-block__cont found in HTML")
    return { html, changelog: null }
  }

  const changelogHeading = contentBlock.find("h3#changelog")
  if (!changelogHeading.length) {
    console.warn('No <h3 id="changelog"> found in HTML')
    return { html, changelog: null }
  }

  // Collect changelog nodes
  const changelogNodes = []
  let node = changelogHeading[0].nextSibling
  while (node) {
    if (node.tagName === "h3") break
    changelogNodes.push(node)
    node = node.nextSibling
  }

  // Extract HTML for changelog
  const changelogHtml = [
    $.html(changelogHeading),
    ...changelogNodes.map(n => $.html(n))
  ].join("")

  // Remove changelog nodes from DOM
  changelogHeading.remove()
  changelogNodes.forEach(n => $(n).remove())

  return { html: $.html(), changelog: changelogHtml }
}

// List of endpoints to scrape
const endpoints = ["apiv4/ws/en/"]

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
      `../../../docs/gateio/spot/websocket_api.md`
    )
    const changelogFilePath = path.join(
      __dirname,
      `../../../docs/gateio/spot/websocket_change_log.md`
    )

    try {
      await downloadHtml(url, htmlFilePath)
      const html = fs.readFileSync(htmlFilePath, "utf8")

      // Extract changelog section and get modified HTML using the spot-specific function
      const { html: modifiedHtml, changelog } =
        extractSpotWebsocketChangelog(html)

      if (changelog) {
        // Convert changelog to markdown and save to separate file
        const changelogMarkdown = turndownService.turndown(changelog)
        fs.writeFileSync(changelogFilePath, changelogMarkdown)
        console.log(`Changelog extracted and saved to: ${changelogFilePath}`)

        // Format the changelog markdown file
        try {
          await formatMarkdown(changelogFilePath)
          console.log(`Formatted: ${changelogFilePath}`)
        } catch (err) {
          console.error("Error formatting changelog markdown:", err)
          console.error("Stack trace:", err.stack)
        }
      } else {
        console.warn("No changelog found to extract")
      }

      // Process the modified HTML (without changelog)
      const markdown = processHtml(modifiedHtml, turndownService)
      fs.writeFileSync(outputFilePath, markdown)
      console.log(`Markdown file created at: ${outputFilePath}`)

      // Format the markdown file
      try {
        await formatMarkdown(outputFilePath)
        console.log(`Formatted: ${outputFilePath}`)
      } catch (err) {
        console.error("Error formatting markdown:", err)
        console.error("Stack trace:", err.stack)
        process.exit(1)
      }

      fs.unlink(htmlFilePath, err => {
        if (err) {
          console.error("Error deleting HTML file:", err)
        } else {
          console.log("HTML file deleted successfully.")
        }
      })
    } catch (error) {
      console.error("Error processing HTML:", error)
    }
  }
}

// Only run main() if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  run().catch(error => {
    console.error("Unhandled error in main:", error)
    console.error("Stack trace:", error.stack)
    process.exit(1)
  })
}
