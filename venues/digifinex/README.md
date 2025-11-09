# DigiFinex API Documentation Extractor

This project extracts and processes DigiFinex API documentation from their
official documentation site using a standardized extraction structure.

## Overview

The extractor scrapes the DigiFinex API documentation and organizes it into:

- **General Documentation**: Core documentation files (authentication, rate limits, error codes, etc.)
- **Endpoint Documentation**: Individual endpoint files categorized as public or private
- **WebSocket API**: Real-time data streaming endpoints

## Source

Documentation is extracted from:
https://docs.digifinex.com/en-ww/spot/v3/rest.html

## Usage

### Extract All Documentation

```bash
pnpm run extract:all
```

### Extract Specific Categories

```bash
pnpm run extract:general          # Core documentation files
pnpm run extract:endpoints        # Individual endpoint documentation
pnpm run extract:websocket-github # Complete WebSocket API from GitHub
```

## Output

Generated markdown files are saved to `docs/digifinex/`:

### General Documentation
- `authentication.md` - Authentication and signature requirements
- `rate_limits.md` - API rate limiting rules and trading guidelines
- `network_connectivity.md` - API base URLs and connectivity information
- `error_codes.md` - Error codes and their descriptions
- `response_formats.md` - Standard response format documentation
- `change_log.md` - API changelog (placeholder)

### Endpoint Documentation
- `endpoints/public/` - Public market data endpoints (11 endpoints)
- `endpoints/private/` - Private trading and account endpoints (15 endpoints)

### WebSocket Documentation
- `websocket_api.md` - Complete WebSocket API documentation from GitHub

## Categorization

Endpoints are automatically categorized as public or private based on:

1. **Public endpoints**: Market data endpoints that don't require authentication
   - Examples: ping, time, markets, ticker, orderbook, trades, klines, symbols
   
2. **Private endpoints**: Trading and account operations that require authentication
   - Examples: assets, orders, trades history, positions, transfers

## Dependencies

### Required

- `turndown: ^7.2.1` - HTML to Markdown conversion
- `turndown-plugin-gfm: ^1.0.2` - GitHub Flavored Markdown support
- `puppeteer: ^24.22.0` - Web scraping automation

### Shared Utilities

The extractor uses shared utilities from `venues/shared/`:
- `puppeteer.js` - Standardized browser configuration
- `turndown.js` - Markdown conversion utilities

## Automation

The documentation is automatically updated daily at 00:00 UTC via GitHub Actions
workflow (`digifinex-docs-update.yml`). Changes are automatically committed and
a pull request is created if documentation updates are detected.

## Project Structure

```
digifinex/
├── src/
│   ├── extractGeneral.js       # Core documentation extraction
│   ├── extractEndpoints.js     # Endpoint documentation extraction
│   └── websocket-github.js     # WebSocket documentation from GitHub
├── package.json                # Dependencies and scripts
├── package-lock.json           # Dependency lock file
└── README.md                   # This file
```

## Implementation Notes

The scraper follows the standardized extraction pattern established in Backpack, 
Deribit, and XT venues:

- Pure ES6 JavaScript with ES6 modules
- Shared Puppeteer and Turndown utilities
- Proper section boundary detection
- Authentication-based endpoint categorization
- Individual endpoint files with source URLs
