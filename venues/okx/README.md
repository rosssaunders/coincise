# OKX API Documentation Extractor

A tool for extracting and converting OKX API documentation into markdown format.

## Project Structure

```
okx/
├── src/
│   ├── index.js          # Entry point
│   └── types.js          # Type definitions
├── config/               # Configuration files for each section
│   ├── overview.json
│   ├── trading_account.json
│   ├── order_book_trading.json
│   ├── block_trading.json
│   ├── spread_trading.json
│   ├── public_data.json
│   ├── trading_statistics.json
│   ├── funding_account.json
│   ├── sub_account.json
│   ├── financial_product.json
│   ├── affiliate.json
│   ├── status.json
│   ├── announcement.json
│   ├── error_code.json
│   ├── private_order_book_trading_rest_api.json
│   ├── private_order_book_trading_websocket_api.json
│   ├── public_market_data_rest_api.json
│   └── public_market_data_websocket_api.json
├── package.json          # Project dependencies
└── README.md            # This file
```

## Dependencies

- puppeteer: ^24.6.0 - For web scraping
- turndown: ^7.1.2 - For HTML to Markdown conversion
- turndown-plugin-gfm: ^1.0.2 - For GitHub Flavored Markdown support
- jsdom: ^26.0.0 - For HTML parsing

## Configuration

The project uses multiple configuration files, one for each major section of the
OKX API documentation. Each config file contains the following structure:

```json
{
  "url": "https://www.okx.com/docs-v5/en/#overview",
  "name": "Section Name",
  "sections": [
    {
      "h1_match": "pattern",
      "h2_match": "pattern",
      "h3_matches": ["pattern1", "pattern2"],
      "include_h2_html": true
    }
  ],
  "output_file": "path/to/output.md"
}
```

### Available Sections

- **Overview** - General API information, authentication, rate limits
- **Trading Account** - Account management, positions, balances
- **Order Book Trading** - Trading operations, order management
- **Block Trading** - Block trading workflow and APIs
- **Spread Trading** - Spread trading operations and workflows
- **Public Data** - Market data, instruments, funding rates
- **Trading Statistics** - Trading analytics and metrics
- **Funding Account** - Deposits, withdrawals, transfers
- **Sub-account** - Sub-account management and operations
- **Financial Product** - Staking, earning products
- **Affiliate** - Affiliate program APIs
- **Status** - System status and monitoring
- **Announcement** - Platform announcements
- **Error Code** - API error codes and descriptions

## Usage

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run all extractions:

   ```bash
   npm start
   ```

3. Run specific sections:

   ```bash
   # Extract overview and general information
   npm run extract:overview

   # Extract trading account information
   npm run extract:trading-account

   # Extract order book trading
   npm run extract:order-book-trading

   # Extract block trading
   npm run extract:block-trading

   # Extract spread trading
   npm run extract:spread-trading

   # Extract public data
   npm run extract:public-data

   # Extract trading statistics
   npm run extract:trading-statistics

   # Extract funding account
   npm run extract:funding-account

   # Extract sub-account
   npm run extract:sub-account

   # Extract financial product
   npm run extract:financial-product

   # Extract affiliate
   npm run extract:affiliate

   # Extract status
   npm run extract:status

   # Extract announcement
   npm run extract:announcement

   # Extract error code
   npm run extract:error-code
   ```

The tool will:

1. Fetch the documentation page
2. Extract sections based on the configuration
3. Convert the content to markdown
4. Save the results to the specified output files

## Features

- Extracts documentation sections based on H1, H2, and H3 headings
- Converts HTML content to GitHub Flavored Markdown
- Supports multiple output configurations
- Maintains the original documentation structure
- Handles nested sections and content hierarchy
- Comprehensive coverage of all OKX API sections
- Separate markdown files for each major API category
