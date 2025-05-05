"use strict"

import fs from "fs"
import path from "path"

/**
 * Read and parse a JSON config file
 *
 * @param {string} configPath - Path to the JSON config file
 * @returns {Object} The parsed config object
 */
export const readConfig = configPath => {
  try {
    const configContent = fs.readFileSync(configPath, "utf8")
    return JSON.parse(configContent)
  } catch (error) {
    throw new Error(`Failed to read config file: ${error.message}`)
  }
}

/**
 * Ensures the output directory exists
 *
 * @param {string} outputDir - Path to the output directory
 */
export const ensureOutputDirectory = outputDir => {
  try {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }
  } catch (error) {
    throw new Error(`Failed to create output directory: ${error.message}`)
  }
}

/**
 * Generate filename from URL if not specified
 *
 * @param {string} url - The URL
 * @param {string|null} filename - Optional filename
 * @returns {string} The filename with .md extension
 */
export const generateFilename = (url, filename) => {
  if (!filename) {
    // Extract the last part of the URL and sanitize it
    filename = url
      .split("/")
      .pop()
      .replace(/[^a-zA-Z0-9]/g, "-")
  }

  // Add .md extension if not present
  if (!filename.endsWith(".md")) {
    filename = `${filename}.md`
  }

  return filename
}

/**
 * Get config file path from command-line arguments or use default
 *
 * @param {string[]} args - Command-line arguments
 * @returns {Object} Object containing configPath and outputDir
 */
export const parseConfigOptions = args => {
  let configPath = "config.json"
  let outputDir = null

  for (let i = 0; i < args.length; i++) {
    if ((args[i] === "-c" || args[i] === "--config") && i + 1 < args.length) {
      configPath = args[i + 1]
      i++ // Skip the next argument
    } else if (
      (args[i] === "-o" || args[i] === "--output") &&
      i + 1 < args.length
    ) {
      outputDir = args[i + 1]
      i++ // Skip the next argument
    }
  }

  return { configPath, outputDir }
}
