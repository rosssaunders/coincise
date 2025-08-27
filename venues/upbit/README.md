# Upbit API Documentation Extractor

This tool extracts and converts Upbit API documentation to clean markdown format, organized by API sections for easy consumption by LLMs and developers.

## Features

- **Comprehensive API Coverage**: Extracts all major API sections (Assets, Order, Withdrawal, Deposit, Service, Quotation, WebSocket)
- **Structured Output**: Organizes documentation into logical directories matching the API structure
- **Clean Markdown**: Converts HTML documentation to clean, readable markdown using Turndown
- **Puppeteer-based**: Uses headless Chrome for reliable content extraction
- **Change Log Support**: Maintains existing changelog monitoring functionality

## Usage

### Extract All API Documentation

```bash
# Install dependencies
npm install

# Extract all API sections
npm run extract:all
```

### Extract Individual Sections

```bash
# Extract specific API sections
npm run extract:assets
npm run extract:order
npm run extract:withdrawal
npm run extract:deposit
npm run extract:service
npm run extract:quotation
npm run extract:websocket

# Extract changelog (legacy functionality)
npm run extract:changelog
```

### Manual Extraction

```bash
# Run extraction with specific config file
node src/index.js config/assets.json
node src/index.js config/order.json
# ... etc
```

## Configuration

Each API section has its own configuration file in the `config/` directory:

### API Section Config Format

```json
{
  "section": "assets",
  "title": "Assets API",
  "baseUrl": "https://global-docs.upbit.com/reference",
  "endpoints": [
    {
      "name": "overall-account-inquiry",
      "url": "https://global-docs.upbit.com/reference/overall-account-inquiry",
      "filename": "overall_account_inquiry.md"
    }
  ],
  "outputConfig": {
    "docsDir": "../../docs/upbit",
    "subDir": "assets"
  }
}
```

### Changelog Config Format

```json
{
  "urls": ["https://global-docs.upbit.com/changelog"],
  "outputConfig": {
    "docsDir": "../../docs/upbit",
    "outputFileName": "change_log.md"
  },
  "title": "Upbit API Change Log"
}
```

## Output Structure

The extracted documentation is organized as follows:

```
docs/upbit/
├── assets/
│   └── overall_account_inquiry.md
├── order/
│   ├── available_order_information.md
│   ├── individual_order_inquiry.md
│   ├── query_order_list_by_id.md
│   └── ...
├── withdrawal/
│   ├── withdrawal_list_inquiry.md
│   └── ...
├── deposit/
│   ├── deposit_list_inquiry.md
│   └── ...
├── service/
│   └── wallet_status.md
├── quotation/
│   ├── listing_market_list.md
│   ├── seconds_candles.md
│   └── ...
├── websocket/
│   ├── general_information.md
│   ├── authentication.md
│   └── ...
└── change_log.md
```

## Technical Details

- **Engine**: Uses Puppeteer with optimized browser configuration for scraping
- **Content Processing**: Extracts main content areas while filtering out navigation
- **Error Handling**: Graceful error handling with detailed logging
- **Performance**: Includes polite delays between requests and resource optimization
- **Format**: Converts to clean markdown with proper heading structure and table support

## Dependencies

- `puppeteer`: ^22.0.0 - Headless Chrome automation
- `turndown`: ^7.1.2 - HTML to Markdown conversion
- `turndown-plugin-gfm`: ^1.0.2 - GitHub Flavored Markdown support
- `jsdom`: ^22.1.0 - HTML parsing for legacy changelog functionality
- `node-fetch`: ^3.3.2 - HTTP requests for legacy functionality