import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { ProcessorRegistry } from './processors/processorRegistry.js'

/**
 * Process documentation for a specific exchange
 * @param {string} exchange - The exchange name
 * @returns {Promise<void>}
 */
async function processExchangeDocs(exchange) {
  const processors = ProcessorRegistry.createProcessorsByExchange(exchange)
  const results = []

  // Get the current directory path
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)

  for (const processor of processors) {
    const markdownContent = await processor.process()
    let outputFile = processor.getOutputFilename()

    // Ensure the output directory exists
    const outputDir = path.dirname(outputFile)

    // Save the file to the root of this repo
    const rootDir = path.resolve(__dirname, '..', '..', '..', 'docs')
    outputFile = path.join(rootDir, outputFile)

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    // Write the content to file
    fs.writeFileSync(outputFile, markdownContent)
    console.log(`Documentation written to ${outputFile}`)

    results.push({
      market: `${exchange}-${processor.apiType}`,
      file: outputFile,
      timestamp: new Date().toISOString(),
    })
  }

  console.table(results)
}

// Parse command line arguments
const args = process.argv.slice(2)
const command = args[0]

if (command === 'process') {
  const exchange = args[1]
  if (!exchange) {
    console.error('Please specify an exchange to process')
    process.exit(1)
  }
  processExchangeDocs(exchange).catch(console.error)
} else {
  console.error('Unknown command. Use "process <exchange>"')
  process.exit(1)
}
