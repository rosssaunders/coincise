'use strict'

import path from 'path'
import { fileURLToPath } from 'url'
import widdershins from 'widdershins'
import { writeToFile } from '../utils/fileUtils.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Merges multiple OpenAPI specifications into a single spec
 * @param {Array<Object>} specs - Array of OpenAPI specifications
 * @returns {Object} - Merged OpenAPI specification
 */
const mergeOpenApiSpecs = specs => {
  if (specs.length === 0) {
    return null
  }

  if (specs.length === 1) {
    return specs[0].specData
  }

  // Start with the first spec as the base
  const mergedSpec = { ...specs[0].specData }

  // Merge paths and components from subsequent specs
  for (let i = 1; i < specs.length; i++) {
    const spec = specs[i].specData

    // Merge paths
    if (spec.paths) {
      mergedSpec.paths = {
        ...(mergedSpec.paths || {}),
        ...spec.paths,
      }
    }

    // Merge components
    if (spec.components) {
      mergedSpec.components = mergedSpec.components || {}

      // Merge schemas
      if (spec.components.schemas) {
        mergedSpec.components.schemas = {
          ...(mergedSpec.components.schemas || {}),
          ...spec.components.schemas,
        }
      }

      // Merge other component types
      const componentTypes = [
        'responses',
        'parameters',
        'examples',
        'requestBodies',
        'headers',
        'securitySchemes',
        'links',
        'callbacks',
      ]

      for (const type of componentTypes) {
        if (spec.components[type]) {
          mergedSpec.components[type] = {
            ...(mergedSpec.components[type] || {}),
            ...spec.components[type],
          }
        }
      }
    }
  }

  return mergedSpec
}

/**
 * Converts OpenAPI specifications to Markdown format
 * @param {Object} downloadedSpecs - Object containing downloaded API specifications
 * @param {string} outputDir - Base output directory for generated Markdown files
 */
export const convertSpecsToMarkdown = async (downloadedSpecs, outputDir) => {
  const fullOutputPath = path.resolve(__dirname, '..', outputDir)

  // Configure widdershins options
  const options = {
    codeSamples: true,
    httpsnippet: false,
    language_tabs: [{ javascript: 'JavaScript' }, { python: 'Python' }],
    search: true,
    theme: 'darkula',
    summary: true,
    tocSummary: true,
    headings: 2,
    omitHeader: false, // Include headers in the output
  }

  // Process REST API specs
  for (const [category, specs] of Object.entries(downloadedSpecs.rest)) {
    console.log(`Converting REST API specs for category: ${category}`)

    // Handle individual spec files
    for (const spec of specs) {
      try {
        const markdownOutput = await widdershins.convert(spec.specData, options)
        const outputFilePath = path.join(fullOutputPath, 'rest', category, `${spec.fileName}.md`)

        await writeToFile(outputFilePath, markdownOutput)
      } catch (error) {
        console.error(`Error converting individual REST API spec ${spec.fileName}:`, error)
      }
    }

    // Create a merged spec for the entire category
    try {
      const mergedSpec = mergeOpenApiSpecs(specs)

      if (mergedSpec) {
        // Add a title to the merged spec
        mergedSpec.info = mergedSpec.info || {}
        mergedSpec.info.title = `KuCoin ${category.charAt(0).toUpperCase() + category.slice(1)} REST API`

        const markdownOutput = await widdershins.convert(mergedSpec, options)
        const outputFilePath = path.join(fullOutputPath, 'rest', `${category}_api.md`)

        await writeToFile(outputFilePath, markdownOutput)
      }
    } catch (error) {
      console.error(`Error converting merged REST API spec for ${category}:`, error)
    }
  }

  // Process WebSocket API specs
  for (const [category, specs] of Object.entries(downloadedSpecs.ws)) {
    console.log(`Converting WebSocket API specs for category: ${category}`)

    // Handle individual spec files
    for (const spec of specs) {
      try {
        const markdownOutput = await widdershins.convert(spec.specData, options)
        const outputFilePath = path.join(fullOutputPath, 'ws', category, `${spec.fileName}.md`)

        await writeToFile(outputFilePath, markdownOutput)
      } catch (error) {
        console.error(`Error converting individual WebSocket API spec ${spec.fileName}:`, error)
      }
    }

    // Create a merged spec for the entire category
    try {
      const mergedSpec = mergeOpenApiSpecs(specs)

      if (mergedSpec) {
        // Add a title to the merged spec
        mergedSpec.info = mergedSpec.info || {}
        mergedSpec.info.title = `KuCoin ${category.charAt(0).toUpperCase() + category.slice(1)} WebSocket API`

        const markdownOutput = await widdershins.convert(mergedSpec, options)
        const outputFilePath = path.join(fullOutputPath, 'ws', `${category}_api.md`)

        await writeToFile(outputFilePath, markdownOutput)
      }
    } catch (error) {
      console.error(`Error converting merged WebSocket API spec for ${category}:`, error)
    }
  }
}
