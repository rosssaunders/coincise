// @docs token counter
// Recursively counts tokens in all files in the docs directory using various methods
// Usage: node tools/clean/token-count.js

"use strict"

import fs from "fs"
import path from "path"

const DOCS_DIR = path.resolve("docs")
const TOKEN_METHODS = [
  {
    name: "Words",
    fn: text => text.split(/\s+/).filter(Boolean).length
  },
  {
    name: "Chars",
    fn: text => text.length
  },
  {
    name: "Bytes",
    fn: text => Buffer.byteLength(text, "utf8")
  },
  {
    name: "GPT-3.5 Approx",
    fn: text =>
      Math.ceil(text.split(/\s+/).filter(Boolean).join(" ").length / 4)
  }
]

const getAllFiles = dir => {
  let results = []
  const list = fs.readdirSync(dir)
  for (const file of list) {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFiles(filePath))
    } else {
      results.push(filePath)
    }
  }
  return results
}

const countTokens = filePath => {
  const text = fs.readFileSync(filePath, "utf8")
  return TOKEN_METHODS.map(({ fn }) => fn(text))
}

const main = () => {
  const files = getAllFiles(DOCS_DIR).filter(f => f.endsWith(".md"))
  const rows = files.map(file => {
    const counts = countTokens(file)
    return {
      File: path.relative(DOCS_DIR, file),
      ...Object.fromEntries(TOKEN_METHODS.map((m, i) => [m.name, counts[i]]))
    }
  })
  console.table(rows)
}

main()
