// File: convert.js
// Description: Node.js script to fetch an OpenAPI spec from a URL
//              and convert it to a Markdown file using the 'openapi-to-md' library.

// Import necessary modules
import openapiToMd from 'openapi-to-md'; // The conversion library
import fs from 'fs/promises';         // Node.js module for file system operations (writing the output file)
import path from 'path';              // Node.js module for handling file paths
import { fileURLToPath } from 'url';  // To get the current directory path in ES modules

// --- Configuration ---
// URL of the OpenAPI specification JSON file
const specUrl = 'https://raw.githubusercontent.com/Kucoin/kucoin-universal-sdk/refs/heads/main/spec/rest/api/openapi-spot-order.json';
// Desired name for the output Markdown file
const outputFileName = 'api-documentation.md';
// --- End Configuration ---

// Helper to get the directory name in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Main asynchronous function to perform the fetch and conversion.
 */
async function convertSpecToMarkdown() {
    console.log(`Attempting to fetch OpenAPI spec from: ${specUrl}`);

    try {
        // 1. Fetch the OpenAPI specification from the URL
        //    Uses the built-in fetch API available in Node.js v18+
        const response = await fetch(specUrl);

        // Check if the fetch was successful
        if (!response.ok) {
            // If not successful, throw an error with the HTTP status
            throw new Error(`HTTP error fetching spec! Status: ${response.status} ${response.statusText}`);
        }

        // 2. Parse the response body as JSON
        const specObject = await response.json();
        console.log('Successfully fetched and parsed the OpenAPI spec.');

        // 3. Convert the JSON spec object to Markdown using the library
        console.log('Converting spec to Markdown format...');
        // The library handles the complex task of walking through the spec
        // and formatting it according to Markdown conventions.
        // You can pass an options object as a second argument if needed,
        // check the 'openapi-to-md' documentation for available options.
        const markdownContent = await openapiToMd(specObject);
        console.log('Conversion successful.');

        // 4. Define the full path for the output file
        const outputPath = path.join(__dirname, outputFileName); // Save in the same directory as the script

        // 5. Write the generated Markdown content to the output file
        await fs.writeFile(outputPath, markdownContent, 'utf8'); // Use 'utf8' encoding
        console.log(`Markdown documentation has been saved to: ${outputPath}`);

    } catch (error) {
        // Catch any errors during fetch, parse, convert, or file writing
        console.error('An error occurred during the process:');
        console.error(error.message);
        // Optionally log the full error stack for debugging
        // console.error(error);
        process.exit(1); // Exit the script with a non-zero code to indicate failure
    }
}

// --- Execute the main function ---
convertSpecToMarkdown();
