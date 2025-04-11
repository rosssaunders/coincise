#!/usr/bin/env node
/**
 * CLI for the Coinbase Exchange API documentation scraper
 */

import fs from 'fs';
import { scrapeApiDocumentation } from './scraper.js';
import { processAuthSection, processRequestParams } from './processors/formatters.js';

// Parse command line arguments
const args = process.argv.slice(2);
const command = args[0];

// Print help information
const printHelp = () => {
  console.log(`
Coinbase Exchange API Documentation Scraper

Usage:
  node index.js scrape <url> <output-file>     # Scrape API docs from URL to markdown file
  node index.js convert-auth <input-file> [output-file]     # Convert auth HTML to markdown
  node index.js convert-params <input-file> [output-file]   # Convert request params HTML to markdown
  node index.js help                           # Show this help message
  `);
};

// Main function to handle CLI commands
const main = async () => {
  try {
    if (!command || command === 'help' || command === '--help' || command === '-h') {
      printHelp();
      return;
    }
    
    if (command === 'scrape') {
      const url = args[1];
      const outputFile = args[2];
      
      if (!url || !outputFile) {
        console.error('Error: URL and output file are required');
        printHelp();
        return;
      }
      
      await scrapeApiDocumentation(url, outputFile);
    } 
    else if (command === 'convert-auth' && args[1]) {
      try {
        const inputFile = args[1];
        const outputFile = args[2];
        
        console.log(`Reading auth HTML from ${inputFile}...`);
        const htmlContent = fs.readFileSync(inputFile, 'utf8');
        const markdownTable = processAuthSection(htmlContent);
        
        if (!markdownTable) {
          console.error('Error: Could not extract authentication data from input file');
          return;
        }
        
        console.log(markdownTable);
        
        // Optionally save to an output file if specified
        if (outputFile) {
          fs.writeFileSync(outputFile, markdownTable);
          console.log(`Markdown table written to ${outputFile}`);
        }
      } catch (error) {
        console.error('Error converting auth file:', error.message);
      }
    } 
    else if (command === 'convert-params' && args[1]) {
      try {
        const inputFile = args[1];
        const outputFile = args[2];
        
        console.log(`Reading params HTML from ${inputFile}...`);
        const htmlContent = fs.readFileSync(inputFile, 'utf8');
        const markdownTable = processRequestParams(htmlContent);
        
        if (!markdownTable) {
          console.error('Error: Could not extract request parameters from input file');
          return;
        }
        
        console.log(markdownTable);
        
        // Optionally save to an output file if specified
        if (outputFile) {
          fs.writeFileSync(outputFile, markdownTable);
          console.log(`Markdown table written to ${outputFile}`);
        }
      } catch (error) {
        console.error('Error converting params file:', error.message);
      }
    }
    else {
      console.error(`Unknown command: ${command}`);
      printHelp();
    }
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

// Run the main function
main().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});

// Export the main functionality for use as a module
export { 
  scrapeApiDocumentation, 
  processAuthSection, 
  processRequestParams 
}; 