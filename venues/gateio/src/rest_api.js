import fs from 'fs'
import path from 'path'
import TurndownService from 'turndown'
import { fileURLToPath } from 'url'
import { downloadHtml, processHtml } from './websocket_docs_utils.js'
import { addTableRule, addCodeBlockRule } from './websocket_docs_utils.js'

// Get the current file path
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// URL to download the HTML file from
const gateioDocsUrl = 'https://www.gate.io/docs/developers/apiv4/en/'

// Initialize turndown service
const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
})
addTableRule(turndownService)
addCodeBlockRule(turndownService)

// Path to the HTML file
const htmlFilePath = path.join(__dirname, 'gateio.html')
const outputFilePath = path.join(__dirname, '../../../docs/gateio/rest_api.md')

// Function to delete the HTML file
function deleteHtmlFile(filePath) {
  fs.unlink(filePath, err => {
    if (err) {
      console.error('Error deleting file:', err)
    } else {
      console.log('Temporary HTML file deleted.')
    }
  })
}

// Main execution
async function main() {
  // Check if HTML file exists
  if (!fs.existsSync(htmlFilePath)) {
    try {
      // If not, download it
      await downloadHtml(gateioDocsUrl, htmlFilePath)
    } catch (error) {
      console.error('Error downloading HTML file:', error)
      return
    }
  } else {
    console.log('HTML file already exists, skipping download.')
  }

  // Read the HTML file
  console.log('Reading HTML file...')
  fs.readFile(htmlFilePath, 'utf8', (err, html) => {
    if (err) {
      console.error('Error reading file:', err)
      return
    }

    processHtml(html)

    // Delete the HTML file after processing
    deleteHtmlFile(htmlFilePath)
  })
}

// Run the main function
main().catch(error => {
  console.error('Error in main execution:', error)
})
