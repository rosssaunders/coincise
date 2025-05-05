"use strict"

import TurndownService from "turndown"
import { gfm } from "turndown-plugin-gfm"
import JSON5 from "json5"

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
     * Add code block handling rule
     * @returns {Object} The builder object for chaining
     */
    withCodeBlocks() {
      // service.addRule("codeBlocks", {
      //   filter: ["pre"],
      //   replacement: function (content, node) {
      //     // Extract language from class name, checking for "language-" pattern in the className
      //     const codeElement = node.querySelector("code")
      //     let language = ""
      //     if (codeElement && codeElement.className) {
      //       const classNames = codeElement.className.split(" ")
      //       for (const className of classNames) {
      //         if (className.includes("language-")) {
      //           language = className.replace("language-", "")
      //           break
      //         }
      //       }
      //     }

      //     // Try to format JSON content for better readability
      //     let formattedContent = content.trim()
      //     if (
      //       language === "javascript" ||
      //       language === "json" ||
      //       (!language && content.trim().match(/^[{\[]/))
      //     ) {
      //       try {
      //         // First attempt to parse with JSON5 which supports comments
      //         const jsonObj = JSON5.parse(content.trim())
      //         formattedContent = JSON.stringify(jsonObj, null, 2)
      //       } catch (error) {
      //         // If JSON5 parsing fails, use the original content
      //         console.warn("Failed to parse JSON in code block:", error.message)
      //         console.warn("JSON content that failed to parse:", content.trim())
      //       }
      //     }

      //     return `\n\`\`\`${language}\n${formattedContent}\n\`\`\`\n`
      //   }
      // })
      return this
    },

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

          // add a new line after in case two tables are next to each other
          return content
        }
      })
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
