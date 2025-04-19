'use strict'

import TurndownService from 'turndown'
import { gfm, tables, strikethrough } from 'turndown-plugin-gfm'

/**
 * Converts HTML content to Markdown format with custom table cell formatting
 * @param {string} html - The HTML content to convert
 * @returns {string} The converted Markdown content
 */
function convertToMarkdown(html) {
  const turndownService = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    fence: '```',
    bulletListMarker: '-',
    emDelimiter: '_',
    strongDelimiter: '**',
    br: '\n',
    preformattedCode: true,
  })
  turndownService.use([gfm, tables, strikethrough])

  return turndownService.turndown(html)
}

export { convertToMarkdown }
