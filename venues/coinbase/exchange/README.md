# Coinbase Exchange API Documentation Scraper

A Node.js based tool for scraping the Coinbase Exchange API documentation and converting it to Markdown format.

## Features

- Scrapes Coinbase Exchange API documentation from the official website
- Converts HTML content to clean Markdown format
- Supports batch processing multiple URLs from a config file
- Combines multiple Markdown files into a single documentation file
- Configurable output directory and file naming

## Installation

```bash
# Install dependencies
npm install
```

## Usage

The scraper can be used in two main ways:

### 1. Scrape a single URL

```bash
npm run scrape <url> <output-file>
```

Example:

```bash
npm run scrape https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getaccounts docs/get-accounts.md
```

### 2. Batch process multiple URLs from a config file

```bash
npm run batch [-c config_file] [-o output_directory]
```

Example:

```bash
# Use default config file (config.json)
npm run batch

# Specify a custom config file
npm run batch:config config/custom-config.json

# Specify a custom output directory
npm run batch:output custom-output-dir

# Specify both custom config and output directory
node src/index.js batch -c config/custom-config.json -o custom-output-dir
```

## Configuration File Format

The batch processing uses a JSON configuration file with the following structure:

```json
{
  "output_directory": "docs",
  "combined_filename": "combined_api_documentation.md",
  "delete_individual_files": true,
  "urls": [
    {
      "url": "https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getaccounts",
      "filename": "get-accounts"
    },
    {
      "url": "https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_postorders",
      "filename": "post-orders"
    }
  ]
}
```

### Configuration Options:

- `output_directory`: Directory where the markdown files will be saved (default: "output")
- `combined_filename`: Name of the file that will contain all combined documentation (default: "combined_api_documentation.md")
- `delete_individual_files`: Whether to delete individual markdown files after combining them (default: true)
- `urls`: Array of URL objects to scrape, each with:
  - `url`: The URL to scrape
  - `filename`: Optional filename for the output (without extension), defaults to the last part of the URL

## Other Commands

### Converting Authentication Sections

```bash
npm run start convert-auth <input-file> [output-file]
```

### Converting Request Parameters

```bash
npm run start convert-params <input-file> [output-file]
```

### Help

```bash
npm run help
```

## Project Structure

```
coinbase-exchange/
├── config/                # Configuration files for batch processing
├── docs/                  # Output directory for markdown files
├── src/
│   ├── index.js           # Entry point and CLI interface
│   ├── scraper.js         # Main scraper functionality
│   ├── processors/        # HTML processing modules
│   └── utils/             # Utility functions
├── package.json
└── README.md
```

## Dependencies

- turndown: Converts HTML to Markdown
- turndown-plugin-gfm: GFM (GitHub Flavored Markdown) plugin for Turndown
- puppeteer: Headless browser for scraping dynamic content
- jsdom: DOM implementation for processing HTML
