/**
 * Utils for the Coinbase Exchange API scraper
 */

import fs from "fs"
import path from "path"

/**
 * Helper function to delay execution
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise<void>}
 */
export const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Ensure directory exists
 * @param {string} dirPath - Directory path
 */
export const ensureDirectoryExists = dirPath => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}
