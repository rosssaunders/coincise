"use strict"

import TurndownService from "turndown"
import turndownPluginGfm from "turndown-plugin-gfm"

/**
 * Utility class for Markdown conversion
 */
class MarkdownUtils {
  /**
   * Initialize the Turndown service with plugins and custom rules
   * @returns {TurndownService} Configured Turndown service
   */
  static initTurndownService() {
    // Initialize Turndown with GFM
    const turndownService = new TurndownService({
      codeBlockStyle: "fenced",
      fence: "```"
    })

    // Add GFM plugins (tables, strikethrough, etc)
    turndownService.use(turndownPluginGfm.gfm)

    // Add custom rule to preserve line breaks in table cells
    turndownService.addRule("tableCellWithBr", {
      filter: "td",
      replacement: (content, node) => {
        const cellContent = node.innerHTML.replace(/<br\s*\/?>/gi, "<br>")
        return `| ${cellContent} `
      }
    })

    return turndownService
  }
}

export default MarkdownUtils
