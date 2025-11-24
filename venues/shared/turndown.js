"use strict"

import TurndownService from "turndown"
import { gfm } from "turndown-plugin-gfm"

/**
 * Creates a basic turndown service with default configuration
 * @returns {Object} Turndown service with builder functions
 */
export const createTurndownBuilder = () => {
  // Create the base turndown service with default configuration
  const service = new TurndownService({
    headingStyle: "atx", // ATX uses # symbols for headings (e.g., # Heading 1, ## Heading 2)
    codeBlockStyle: "fenced", // Uses ```code``` style blocks instead of indented blocks
    bulletListMarker: "-", // Use - for unordered lists instead of * or +
    emDelimiter: "*", // Use *text* for emphasis (italics) instead of _text_
    strongDelimiter: "**", // Use **text** for strong emphasis (bold) instead of __text__
    linkReferenceStyle: "full" // Generate links as [text](url) instead of reference-style links,
  })

  // Add GitHub Flavored Markdown plugin as part of the base configuration
  service.use(gfm)

  // Return object with builder methods
  return {
    /**
     * Add support for tables without headers
     * @returns {Object} The builder object for chaining
     */
    withTablesWithoutHeaders() {
      service.addRule("tablesWithoutHeaders", {
        filter: ["table"],
        replacement: function (content, node) {
          const rows = Array.from(node.querySelectorAll("tr"))
          if (rows.length === 0) return ""

          // If there's no thead, create a markdown table with empty headers
          if (!node.querySelector("thead")) {
            const firstRow = rows[0]
            const cells = Array.from(firstRow.querySelectorAll("td"))
            const headerRow = cells.map(() => "---").join(" | ")
            const contentRows = rows
              .map(row => {
                const cells = Array.from(row.querySelectorAll("td"))
                return cells.map(cell => cell.textContent.trim()).join(" | ")
              })
              .join("\n")

            return `\n| ${headerRow} |\n| ${contentRows} |\n`
          }

          return content
        }
      })
      return this
    },

    /**
     * Add a custom Turndown rule
     * @param {string} ruleName - Name of the rule
     * @param {Object} ruleDefinition - Rule definition with filter and replacement
     * @returns {Object} The builder object for chaining
     */
    withCustomRule(ruleName, ruleDefinition) {
      service.addRule(ruleName, ruleDefinition)
      return this
    },

    /**
     * Build and return the configured TurndownService
     * @returns {TurndownService} Configured Turndown service
     */
    build() {
      return service
    }
  }
}
