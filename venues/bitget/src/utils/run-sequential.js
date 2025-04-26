'use strict'

import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import child_process from 'child_process'
import { promisify } from 'util'

const exec = promisify(child_process.exec)
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

// ANSI color codes for terminal output
const GREEN = '\x1b[32m'
const RED = '\x1b[31m'
const RESET = '\x1b[0m'

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.join(__dirname, '..', '..')

/**
 * Prints a status message to the console with color
 * @param {string} message - The message to print
 * @param {boolean} isError - Whether this is an error message
 */
const printStatus = (message, isError = false) => {
  const prefix = isError ? `${RED}[ERROR]${RESET}` : `${GREEN}[INFO]${RESET}`
  console.log(`${prefix} ${message}`)
}

/**
 * Processes a single config file
 * @param {string} configFile - Path to the config file
 * @returns {Promise<boolean>} - Success or failure
 */
const processConfigFile = async configFile => {
  try {
    const configPath = path.join(rootDir, configFile)

    // Check if config file exists
    try {
      await fs.access(configPath)
    } catch (error) {
      printStatus(`Config file not found: ${configPath}`, true)
      return false
    }

    printStatus(`Processing ${configFile}...`)

    // Run the conversion script
    const indexPath = path.join(rootDir, 'src', 'index.js')
    const { stdout, stderr } = await exec(`node ${indexPath} ${configPath}`)

    if (stdout) console.log(stdout)
    if (stderr) console.error(stderr)

    printStatus(`Successfully processed ${configFile}`)
    return true
  } catch (error) {
    printStatus(`Failed to process ${configFile}: ${error.message}`, true)
    return false
  }
}

/**
 * Main function to process all config files
 */
const main = async () => {
  const configFiles = ['config/common.json', 'config/spot.json', 'config/future.json']

  let success = true

  for (const configFile of configFiles) {
    const result = await processConfigFile(configFile)
    if (!result) {
      success = false
      break
    }

    // Add a small delay between processing files
    await sleep(2000)
  }

  if (success) {
    printStatus('All conversions completed successfully!')
  } else {
    printStatus('Conversion process failed.', true)
    process.exit(1)
  }
}

// Run the main function
main().catch(error => {
  printStatus(`Unexpected error: ${error.message}`, true)
  process.exit(1)
})
