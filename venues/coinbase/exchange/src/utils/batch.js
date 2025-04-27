'use strict'

import fs from 'fs'
import path from 'path'
import { scrapeApiDocumentation } from '../scraper.js'
import { readConfig, ensureOutputDirectory, generateFilename } from './config.js'

/**
 * Process a single URL from the config
 *
 * @param {Object} urlConfig - Configuration for a single URL
 * @param {string} outputDir - Directory to save the output
 * @returns {Promise<string>} Path to the generated file
 */
export const processUrl = async (urlConfig, outputDir) => {
  const url = urlConfig.url
  const filename = generateFilename(url, urlConfig.filename)
  const outputPath = path.join(outputDir, filename)

  try {
    // Attempt to scrape the API documentation
    await scrapeApiDocumentation(url, outputPath)
    console.log(`✅ Scraping completed successfully for ${url}`)
    return outputPath
  } catch (error) {
    // Log the error with more detail
    console.error(`❌ Error scraping ${url}: ${error.message}`)

    // Create a minimal error file to indicate failure
    try {
      const errorContent = `# Error Scraping ${url}\n\nFailed to scrape this URL at ${new Date().toISOString()}\n\nError message: ${error.message}`
      fs.writeFileSync(outputPath, errorContent, 'utf8')
      console.log(`Created error placeholder file at ${outputPath}`)
    } catch (writeError) {
      console.error(`Failed to create error placeholder file: ${writeError.message}`)
    }

    // Re-throw the error to be handled by the caller
    throw error
  }
}

/**
 * Extract the title from a markdown file
 *
 * @param {string} filePath - Path to the markdown file
 * @returns {string} The title extracted from the file
 */
export const extractTitle = filePath => {
  try {
    const content = fs.readFileSync(filePath, 'utf8')
    const lines = content.split('\n')

    // Find the first heading
    for (const line of lines) {
      if (line.startsWith('#')) {
        return line.replace(/^#+\s*/, '').trim()
      }
    }

    // If no heading found, use the filename without extension
    return path.basename(filePath, '.md')
  } catch (error) {
    console.warn(`Warning: Could not extract title from ${filePath}`)
    return path.basename(filePath, '.md')
  }
}

/**
 * Generate an anchor from a title
 *
 * @param {string} title - The title to convert to an anchor
 * @returns {string} The anchor ID
 */
export const generateAnchor = title => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Create a table of contents from processed files
 *
 * @param {Array<Object>} urlConfigs - Array of URL configs
 * @param {string} outputDir - Directory containing the output files
 * @returns {string} Markdown table of contents
 */
export const createTableOfContents = (urlConfigs, outputDir) => {
  let toc = '## Table of Contents\n\n'

  for (const urlConfig of urlConfigs) {
    const filename = generateFilename(urlConfig.url, urlConfig.filename)
    const filePath = path.join(outputDir, filename)

    if (!fs.existsSync(filePath)) {
      console.warn(`Warning: File ${filePath} does not exist, skipping in TOC`)
      continue
    }

    const title = extractTitle(filePath)
    const anchor = generateAnchor(title)

    toc += `* [${title}](#${anchor})\n`
  }

  return toc
}

/**
 * Combine multiple markdown files into a single file
 *
 * @param {Array<Object>} urlConfigs - Array of URL configs
 * @param {string} outputDir - Directory containing the output files
 * @param {string} combinedFilename - Name of the combined output file
 * @returns {string} Path to the combined file
 */
export const combineMarkdownFiles = (urlConfigs, outputDir, combinedFilename) => {
  const combinedFilePath = path.join(outputDir, combinedFilename)

  // Create a new file with a header
  let combinedContent = '# Coinbase Exchange API Documentation\n\n'
  combinedContent += `Generated on ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}\n\n`

  // Add table of contents
  combinedContent += createTableOfContents(urlConfigs, outputDir)
  combinedContent += '\n---\n\n'

  // Add content from each file
  for (const urlConfig of urlConfigs) {
    const filename = generateFilename(urlConfig.url, urlConfig.filename)
    const filePath = path.join(outputDir, filename)

    if (!fs.existsSync(filePath)) {
      console.warn(`Warning: File ${filePath} does not exist, skipping in combined file`)
      continue
    }

    console.log(`Adding ${filename} to combined file...`)

    const title = extractTitle(filePath)
    const content = fs.readFileSync(filePath, 'utf8')

    // Add a section divider and title
    combinedContent += `# ${title}\n\n`

    // Append the file content, skipping the first heading (already used as section title)
    const contentLines = content.split('\n')
    let skipFirstHeading = true

    for (const line of contentLines) {
      if (skipFirstHeading && line.startsWith('#')) {
        skipFirstHeading = false
        continue
      }

      if (skipFirstHeading === false) {
        combinedContent += line + '\n'
      }
    }

    // Add a separator between files
    combinedContent += '\n---\n\n'
  }

  // Write the combined content to file
  fs.writeFileSync(combinedFilePath, combinedContent)

  return combinedFilePath
}

/**
 * Delete individual markdown files, keeping only the combined file
 *
 * @param {Array<Object>} urlConfigs - Array of URL configs
 * @param {string} outputDir - Directory containing the output files
 * @param {string} combinedFilename - Name of the combined file to keep
 */
export const cleanupIndividualFiles = (urlConfigs, outputDir, combinedFilename) => {
  const combinedFilePath = path.join(outputDir, combinedFilename)

  for (const urlConfig of urlConfigs) {
    const filename = generateFilename(urlConfig.url, urlConfig.filename)
    const filePath = path.join(outputDir, filename)

    if (fs.existsSync(filePath) && filePath !== combinedFilePath) {
      fs.unlinkSync(filePath)
      console.log(`Deleted: ${filePath}`)
    }
  }
}

/**
 * Process all URLs in the config
 *
 * @param {string} configPath - Path to the config file
 * @param {string|null} outputDirOverride - Optional override for output directory
 * @returns {Promise<void>}
 */
export const processBatch = async (configPath, outputDirOverride = null) => {
  // Track failures to exit with error code if needed
  let hasFailures = false

  try {
    // Read the config file
    const config = readConfig(configPath)

    // Get the output directory from config or override
    const outputDir = outputDirOverride || config.output_directory || 'output'

    // Create output directory if it doesn't exist
    ensureOutputDirectory(outputDir)

    const urlConfigs = config.urls

    if (!urlConfigs || !Array.isArray(urlConfigs) || urlConfigs.length === 0) {
      throw new Error('No URLs found in config file')
    }

    console.log(`Found ${urlConfigs.length} URLs to process in ${configPath}`)

    // Process each URL
    const successfulUrls = []
    const failedUrls = []

    for (let i = 0; i < urlConfigs.length; i++) {
      const urlConfig = urlConfigs[i]

      console.log(`\n[${i + 1}/${urlConfigs.length}] Processing: ${urlConfig.url}`)

      try {
        await processUrl(urlConfig, outputDir)
        successfulUrls.push(urlConfig.url)
      } catch (error) {
        console.error(`Error processing URL ${urlConfig.url}: ${error.message}`)
        failedUrls.push(urlConfig.url)
        hasFailures = true
      }
    }

    // Log summary of results
    console.log(`\nProcessing complete:`)
    console.log(`- Successfully processed: ${successfulUrls.length} URLs`)
    console.log(`- Failed to process: ${failedUrls.length} URLs`)

    if (failedUrls.length > 0) {
      console.log('\nFailed URLs:')
      failedUrls.forEach(url => console.log(`- ${url}`))
    }

    // Only proceed with combining if we have at least one successful URL
    if (successfulUrls.length > 0) {
      console.log(`\nAll URLs processed. Results saved to ${outputDir}/`)

      // Get combined filename from config or use default
      const combinedFilename = config.combined_filename || 'combined_api_documentation.md'

      console.log(`Combining all markdown files into ${combinedFilename}...`)

      // Combine markdown files
      const combinedFilePath = combineMarkdownFiles(urlConfigs, outputDir, combinedFilename)

      console.log(`✅ Combined API documentation created at ${combinedFilePath}`)

      // Clean up individual files if needed
      if (config.delete_individual_files !== false) {
        console.log('Deleting individual markdown files...')
        cleanupIndividualFiles(urlConfigs, outputDir, combinedFilename)
        console.log('✅ Cleanup completed. Only combined file remains.')
      }
    } else {
      throw new Error('All URLs failed to process, cannot create combined file')
    }
  } catch (error) {
    console.error(`Error in batch processing: ${error.message}`)
    hasFailures = true
    throw error
  } finally {
    // Exit with non-zero code if there were failures in GitHub Actions
    if (hasFailures && (process.env.CI || process.env.GITHUB_ACTIONS)) {
      console.error('\n❌ Some URLs failed to process. GitHub Actions should mark this as failed.')
      // Setting a timeout to ensure logs are flushed before exit
      setTimeout(() => {
        process.exit(1)
      }, 1000)
    }
  }
}
