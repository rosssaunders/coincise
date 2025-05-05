"use strict"

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import process from "process"
import { formatMarkdown } from "../../shared/format-markdown.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Creates all necessary output directories for the Markdown files
 * @param {string} outputDir - Base output directory
 */
export const createOutputDirectories = async outputDir => {
  const fullOutputPath = path.resolve(__dirname, "..", outputDir)

  // Create base directories
  const baseDirectories = [
    fullOutputPath,
    path.join(fullOutputPath, "rest"),
    path.join(fullOutputPath, "ws")
  ]

  // Create category directories
  const categories = ["spot", "futures", "margin"]
  const typeDirectories = []

  for (const type of ["rest", "ws"]) {
    for (const category of categories) {
      typeDirectories.push(path.join(fullOutputPath, type, category))
    }
  }

  // Create all directories
  const allDirectories = [...baseDirectories, ...typeDirectories]

  for (const dir of allDirectories) {
    if (!fs.existsSync(dir)) {
      await fs.promises.mkdir(dir, { recursive: true })
      console.log(`Created directory: ${dir}`)
    }
  }
}

/**
 * Writes content to a file, creating directories if needed
 * @param {string} filePath - Path to write the file to
 * @param {string} content - Content to write to the file
 */
export const writeToFile = async (filePath, content) => {
  const directory = path.dirname(filePath)

  if (!fs.existsSync(directory)) {
    await fs.promises.mkdir(directory, { recursive: true })
  }

  await fs.promises.writeFile(filePath, content, "utf8")
  console.log(`File written successfully: ${filePath}`)

  // Format the markdown file if it is a markdown file
  if (filePath.endsWith(".md") || filePath.endsWith(".markdown")) {
    try {
      await formatMarkdown(filePath)
      console.log(`Formatted: ${filePath}`)
    } catch (err) {
      console.error("Error formatting markdown:", err)
      console.error("Stack trace:", err.stack)
      process.exit(1)
    }
  }
}
