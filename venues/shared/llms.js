"use strict"

import fs from "fs"
import path from "path"

export const buildLlmsContent = (title, summary, sections) => {
  let lines = []
  lines.push(`# ${title}`)
  if (summary) lines.push(`> ${summary}`)
  lines.push("")

  for (const section of sections) {
    if (!section || !section.title || !Array.isArray(section.links)) continue
    if (section.links.length === 0) continue
    lines.push(`## ${section.title}`)
    for (const link of section.links) {
      const name = link.name || link.url
      const url = link.url
      const notes = link.notes ? `: ${link.notes}` : ""
      lines.push(`- [${name}](${url})${notes}`)
    }
    lines.push("")
  }

  return lines.join("\n")
}

export const writeLlmsTxt = (outputDir, content) => {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }
  const filePath = path.join(outputDir, "llms.txt")
  fs.writeFileSync(filePath, content, "utf8")
  console.log(`Wrote llms.txt: ${filePath}`)
  return filePath
}

export const makeLink = (name, url, notes = "") => ({ name, url, notes })


