# Coinbase Exchange API Documentation Scraper

A tool to scrape Coinbase Exchange API documentation and convert it to markdown format.

## Installation

```bash
# Clone the repository (if applicable)
git clone [repository-url]
cd [repository-directory]/tools/extraction/coinbase/exchange2

# Install dependencies
npm install

# Make the bash script executable
chmod +x run-scraper.sh
```

## Usage

### Command Line Interface

The tool provides a command-line interface for scraping API documentation:

```bash
# Show help
node index.js help

# Scrape API documentation from a URL
node index.js scrape <url> <output-file>

# Example:
node index.js scrape https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_postorders orders.md

# Convert HTML auth section to markdown
node index.js convert-auth <input-html-file> [output-markdown-file]

# Convert HTML request parameters to markdown
node index.js convert-params <input-html-file> [output-markdown-file]
```

### Batch Processing with Bash Script

The included bash script allows you to process multiple URLs defined in a JSON configuration file:

```bash
# Run with default config.json file
./run-scraper.sh

# Specify a different config file
./run-scraper.sh -c my-config.json

# Specify an output directory (overrides the one in config file)
./run-scraper.sh -o ./my-output-dir

# Show help
./run-scraper.sh -h
```

#### JSON Configuration Format

Create a `config.json` file with the following structure:

```json
{
  "output_directory": "output/coinbase-api-docs",
  "urls": [
    {
      "url": "https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_postorders",
      "filename": "post-orders.md"
    },
    {
      "url": "https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getaccounts",
      "filename": "get-accounts.md"
    }
  ]
}
```

Note: The `filename` field is optional. If not provided, a filename will be generated from the URL.

### Using as a Module

You can also use the scraper programmatically in your Node.js application:

```javascript
const { scrapeApiDocumentation } = require('./index');

// Scrape API documentation from a URL and save as markdown
scrapeApiDocumentation(
  'https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_postorders',
  'orders.md'
).then(() => {
  console.log('Documentation scraping complete!');
}).catch((error) => {
  console.error('Error:', error);
});
```

## Features

- Scrapes endpoint details from Coinbase Exchange API documentation
- Extracts authentication information
- Extracts request parameters
- Extracts response schemas
- Converts all content to formatted markdown
- Saves documentation as a markdown file
- Batch processing of multiple API endpoints

## Project Structure

- `index.js` - Command-line interface and entry point
- `scraper.js` - Main scraping logic
- `extractors.js` - Functions to extract data from web pages
- `formatters.js` - Functions to convert HTML to markdown
- `utils.js` - Utility functions
- `run-scraper.sh` - Bash script for batch processing
- `config.json` - Configuration file for batch processing

## Dependencies

- Puppeteer - For browser automation and scraping
- JSDOM - For parsing HTML outside the browser context
- jq - For JSON processing in the bash script (required for run-scraper.sh) 