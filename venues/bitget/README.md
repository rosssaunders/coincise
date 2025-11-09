# Bitget API Documentation Extractor

This project extracts API documentation from Bitget and converts it to markdown format following the standardized extraction structure.

## Features

- Extracts core documentation files (authentication, rate limits, etc.)
- Extracts REST API endpoint documentation with public/private categorization
- Converts HTML to Markdown with proper formatting
- Preserves code blocks with syntax highlighting
- Uses retry logic with exponential backoff for reliability

## Project Structure

```
bitget/
├── config/
│   ├── common.json       # Configuration for common API endpoints (legacy)
│   ├── spot.json         # Configuration for spot trading endpoints (legacy)
│   ├── future.json       # Configuration for futures trading endpoints (legacy)
│   └── change_log.json   # Configuration for change log (legacy)
├── src/
│   ├── extractGeneral.js    # Extracts core documentation files
│   ├── extractEndpoints.js  # Extracts individual API endpoints
│   └── index.js             # Legacy extraction script
├── package.json
└── README.md
```

## Dependencies

- turndown: ^7.2.1 - For HTML to Markdown conversion
- turndown-plugin-gfm: ^1.0.2 - GitHub Flavored Markdown support
- puppeteer: ^24.22.0 - For web scraping and dynamic content extraction

## Usage

### Standardized Extraction (Recommended)

```bash
# Install dependencies
pnpm install

# Extract core documentation (authentication, rate limits, etc.)
pnpm run extract:general

# Extract individual API endpoints
pnpm run extract:endpoints

# Extract both core documentation and endpoints
pnpm run extract:all
```

### Legacy Extraction (Deprecated)

The legacy extraction scripts are still available but will be removed in a future version:

```bash
# Extract Common API documentation
pnpm run extract:common

# Extract Spot API documentation
pnpm run extract:spot

# Extract Futures API documentation
pnpm run extract:future

# Extract Change Log
pnpm run extract:change_log
```

## Output Structure

The extracted markdown files are organized as follows:

```
docs/bitget/
├── authentication.md           # API authentication and key management
├── rate_limits.md              # Rate limiting rules and policies
├── network_connectivity.md     # Connection info and endpoints
├── error_codes.md              # Error code definitions
├── response_formats.md         # Standard response structures
├── change_log.md               # API version history
└── endpoints/
    ├── public/                 # Public endpoints (no authentication)
    │   ├── get_api_v2_public_time.md
    │   ├── get_api_v2_spot_market_tickers.md
    │   └── ...
    └── private/                # Private endpoints (require authentication)
        ├── post_api_v2_spot_trade_place_order.md
        ├── get_api_v2_spot_account_assets.md
        └── ...
```

## Extraction Details

### General Documentation

The `extractGeneral.js` script extracts the following core files:

- **authentication.md**: Combines content from `/common/quick-start` and `/common/signature`
- **rate_limits.md**: Extracts rate limiting information from `/common/quick-start`
- **network_connectivity.md**: Combines `/common/intro` and `/common/domain`
- **error_codes.md**: Combines error codes from `/spot/error-code/restapi` and `/contract/error-code`
- **response_formats.md**: Extracts response format information from `/common/intro`
- **change_log.md**: Extracts changelog from `/common/changelog`

### Endpoint Documentation

The `extractEndpoints.js` script:

1. Loads endpoint URLs from the config files
2. Filters out general documentation pages
3. Extracts content from each endpoint page
4. Determines if the endpoint is public or private based on authentication requirements
5. Generates filenames in the format: `{method}_{endpoint_path}.md`
6. Saves to `endpoints/public/` or `endpoints/private/` accordingly

## API Documentation Source

The scraper targets the official Bitget API documentation at:
- Base URL: https://www.bitget.com/api-doc

## Technical Details

### Retry Logic

The extraction scripts use retry logic with exponential backoff to handle:
- Network issues
- Rate limiting
- Cloudflare protection
- Temporary server errors

### User Agent

A standard Chrome user agent is set to avoid blocking:
```
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36
```

### Polite Delays

The script includes delays between requests to be respectful to the Bitget servers:
- 2 seconds after page load
- 1.5 seconds between endpoint requests
- Exponential backoff on retries (5s, 10s, 20s)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT
