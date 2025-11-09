# Upbit API Documentation Extractor

This tool extracts and converts Upbit API documentation to clean markdown format, organized for easy consumption by LLMs and developers following the standardized Coincise extraction pattern.

## Features

- **Standardized Structure**: Follows the same extraction pattern as other exchanges (Backpack, Deribit, XT)
- **Core Documentation Files**: Extracts 6 essential documentation files (rate limits, authentication, network connectivity, error codes, response formats, change log)
- **Endpoint Documentation**: Automatically categorizes endpoints as public or private
- **Clean Markdown**: Converts HTML documentation to clean, readable markdown using Turndown
- **Puppeteer-based**: Uses headless Chrome for reliable content extraction

## Usage

### Extract All Documentation

```bash
# Install dependencies
npm install

# Extract all documentation (general + endpoints)
npm run extract:all
```

### Extract Individual Sections

```bash
# Extract core documentation files only
npm run extract:general

# Extract endpoint documentation only
npm run extract:endpoints
```

## Output Structure

The extracted documentation is organized as follows:

```
docs/upbit/
├── rate_limits.md
├── authentication.md
├── network_connectivity.md
├── error_codes.md
├── response_formats.md
├── change_log.md
└── endpoints/
    ├── public/
    │   ├── listing_market_list.md
    │   ├── seconds_candles.md
    │   ├── order_book_list.md
    │   └── ...
    └── private/
        ├── overall_account_inquiry.md
        ├── order.md
        ├── order_cancel.md
        ├── deposit_list_inquiry.md
        ├── withdrawal_list_inquiry.md
        └── ...
```

## Endpoint Categorization

- **Public Endpoints**: Quotation and Service APIs (no authentication required)
- **Private Endpoints**: Assets, Order, Withdrawal, and Deposit APIs (authentication required)

## Technical Details

- **Engine**: Uses Puppeteer with optimized browser configuration
- **Content Processing**: Extracts main content areas while filtering out navigation
- **Error Handling**: Graceful error handling with detailed logging and fallbacks
- **Performance**: Includes polite delays between requests
- **Format**: Converts to clean markdown with proper heading structure and table support

## Dependencies

- `puppeteer`: ^24.22.0 - Headless Chrome automation
- `turndown`: ^7.2.1 - HTML to Markdown conversion
- `turndown-plugin-gfm`: ^1.0.2 - GitHub Flavored Markdown support

Shared utilities are imported from `venues/shared/`:
- `puppeteer.js` - Browser configuration and page setup
- `turndown.js` - Markdown conversion service