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

# URLS

## General

https://docs.cdp.coinbase.com/exchange/docs/welcome
https://docs.cdp.coinbase.com/exchange/docs/getting-started
https://docs.cdp.coinbase.com/exchange/docs/sandbox
https://docs.cdp.coinbase.com/exchange/docs/matching-engine
https://docs.cdp.coinbase.com/exchange/docs/rate-limits
https://docs.cdp.coinbase.com/exchange/docs/runbook

## REST API

https://docs.cdp.coinbase.com/exchange/docs/rest-requests
https://docs.cdp.coinbase.com/exchange/docs/rest-auth
https://docs.cdp.coinbase.com/exchange/docs/rest-rate-limits
https://docs.cdp.coinbase.com/exchange/docs/rest-pagination
https://docs.cdp.coinbase.com/exchange/docs/profiles
https://docs.cdp.coinbase.com/exchange/docs/types


## Endpoints

### Accounts

https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getaccounts
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getaccount
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getaccountholds
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getaccountledger
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getaccounttransfers

### Address book

https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getaddressbook
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_postaddressbook
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_deleteaddressbookentry

### Coinbase accounts

https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getcoinbaseaccounts
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_postcoinbaseaccountaddresses

### Conversions

https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_postconversion
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getconversions
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getconversionfees
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getconversion

### Currencies

https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getcurrencies
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getcurrency

### Transfers

https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_postdepositcoinbaseaccount
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_postdepositpaymentmethod
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getpaymentmethods
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_gettransfers
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_gettransfer
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_posttransfertravelrule
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_postwithdrawcoinbaseaccount
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_postwithdrawcrypto
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getwithdrawfeeestimate
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_postwithdrawpaymentmethod

### Fees

https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getfees

### Orders

https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getfills
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getorders
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_deleteorders
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_postorders
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getorder
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_deleteorder

### Loans

https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getloans
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getloanassets
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getinterestsummary
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getinteresthistory
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getinterestcharges
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getloanlendingoverview
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getloanpreview
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_openloan
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getnewloanoptions
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_repayinterest
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_repayprincipal
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getrepaymentpreview

### Futures

https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getfcmautoloan
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_postfcmautoloan
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getfcmusdcmargin
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_postfcmusdcmargin

### Coinbase Oracle Prices

https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getcoinbasepriceoracle

### Products

https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getproducts
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getproductsvolume
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getproduct
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getproductbook
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getproductcandles
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getproductstats
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getproductticker
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getproducttrades

### Profiles

https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getprofiles
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_postprofile
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_postprofiletransfer
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getprofile
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_putprofile
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_putprofiledeactivate

### Reports

https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getreports
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_postreports
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getreport

### Travel Rules

https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_gettravelrules
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_posttravelrule
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_deletetravelrule

### Users

https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getuserexchangelimits
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_postuserlevelsettlementpreferences
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getusertradingvolumes

### Wrapped Assets

https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getwrappedassets
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getallwrappedassetstakewraps
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_postwrappedassetstakewrap
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getwrappedassetstakewrap
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getwrappedasset
https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getwrappedassetconversionrate


## Websocket

https://docs.cdp.coinbase.com/exchange/docs/websocket-overview
https://docs.cdp.coinbase.com/exchange/docs/websocket-best-practices
https://docs.cdp.coinbase.com/exchange/docs/websocket-auth
https://docs.cdp.coinbase.com/exchange/docs/websocket-channels
https://docs.cdp.coinbase.com/exchange/docs/websocket-rate-limits
https://docs.cdp.coinbase.com/exchange/docs/websocket-errors
