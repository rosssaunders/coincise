"use strict"

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { dirname } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/**
 * Read and parse a JSON config file
 *
 * @param {string} configPath - Path to the JSON config file
 * @returns {Object} The parsed config object
 */
const readConfig = (configPath) => {
  try {
    const configContent = fs.readFileSync(configPath, "utf8")
    return JSON.parse(configContent)
  } catch (error) {
    console.error(`Error reading config file ${configPath}:`, error.message)
    process.exit(1)
  }
}

/**
 * Get config file path from command-line arguments or use default
 *
 * @param {string[]} args - Command-line arguments
 * @returns {string} Path to the config file
 */
export const parseConfigPath = (args) => {
  let configPath = path.resolve(__dirname, "../config/config.json")

  for (let i = 0; i < args.length; i++) {
    if ((args[i] === "-c" || args[i] === "--config") && i + 1 < args.length) {
      configPath = args[i + 1]
      // If the path is not absolute, make it relative to the current directory
      if (!path.isAbsolute(configPath)) {
        configPath = path.resolve(process.cwd(), configPath)
      }
      break
    }
  }

  return configPath
}

/**
 * Configuration for the KuCoin API documentation extraction
 * Loads from a JSON config file, with optional path specified via command-line arguments
 */
export const config = readConfig(parseConfigPath(process.argv))
