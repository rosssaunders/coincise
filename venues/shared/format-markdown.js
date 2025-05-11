"use strict"

import fs from "fs/promises"
import path from "path"
import prettier from "prettier"

/**
 * Formats a Markdown file using Prettier
 *
 * @param {string} filePath - Path to the Markdown file to format
 * @returns {Promise<void>}
 */
export const formatMarkdown = async filePath => {
  // Validate file path
  if (!filePath || typeof filePath !== "string") {
    throw new Error("Invalid file path provided")
  }

  // Check if the file exists and is a markdown file
  const fileExt = path.extname(filePath).toLowerCase()
  if (fileExt !== ".md" && fileExt !== ".markdown") {
    throw new Error(`File ${filePath} is not a Markdown file`)
  }

  // Read the file
  const content = await fs.readFile(filePath, "utf8")

  // Explicitly load the project's prettier config
  const prettierConfig = await prettier.resolveConfig(filePath)
  if (!prettierConfig) {
    throw new Error(`Could not resolve Prettier config for ${filePath}`)
  }

  // Format the content with Prettier using the project's explicit config
  const formattedContent = await prettier.format(content, {
    ...prettierConfig,
    parser: "markdown"
  })

  // Write the formatted content back to the file
  await fs.writeFile(filePath, formattedContent, "utf8")

  console.info(`Successfully formatted ${filePath}`)
}
