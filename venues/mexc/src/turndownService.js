"use strict"

import TurndownService from "turndown"
import { gfm, tables, strikethrough } from "turndown-plugin-gfm"

// --- Turndown Setup ---
const turndownService = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  emDelimiter: "*",
  strongDelimiter: "**",
  linkStyle: "inline"
})

turndownService.use([gfm, tables, strikethrough])

export default turndownService
