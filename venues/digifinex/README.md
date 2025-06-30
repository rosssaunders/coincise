# DigiFinex API Documentation Extractor

This project extracts and processes DigiFinex API documentation from their
official documentation site.

## Overview

The extractor scrapes the DigiFinex API documentation and categorizes it into
three main sections:

- **Public API**: Market data, symbols, and other public endpoints
- **Private API**: Account management, trading, and authenticated endpoints
- **WebSocket API**: Real-time data streaming endpoints

## Source

Documentation is extracted from:
https://docs.digifinex.com/en-ww/spot/v3/rest.html

## Usage

### Extract All Documentation

```bash
npm run extract:all
```

### Extract Specific Categories

```bash
npm run extract:public           # Public endpoints only
npm run extract:private          # Private endpoints only
npm run extract:websocket-github # Complete WebSocket API from GitHub
```

## Output

Generated markdown files are saved to `docs/digifinex/`:

- `public_rest_api.md` - Public API documentation
- `private_rest_api.md` - Private API documentation
- `websocket_api.md` - Complete WebSocket API documentation from GitHub

## Dependencies

### Required

- `turndown: ^7.1.2` - HTML to Markdown conversion
- `turndown-plugin-gfm: ^1.0.2` - GitHub Flavored Markdown support
- `puppeteer: ^22.0.0` - Web scraping automation

## Automation

The documentation is automatically updated daily at 00:00 UTC via GitHub Actions
workflow (`digifinex-docs-update.yml`). Changes are automatically committed and
a pull request is created if documentation updates are detected.

## Project Structure

```
digifinex/
├── config/              # Configuration files (if needed)
├── src/
│   └── index.js         # Main extraction script
├── package.json         # Dependencies and scripts
├── package-lock.json    # Dependency lock file
└── README.md           # This file
```

## Implementation Notes

The scraper categorizes content based on keywords and context:

- **Public**: Market data, tickers, symbols, public endpoints
- **Private**: Authentication, accounts, orders, trading, signatures
- **WebSocket**: Socket connections, real-time streaming

### Dual WebSocket Documentation Sources

DigiFinex provides WebSocket documentation:

2. **GitHub Repository**: Complete WebSocket API documentation

API docs

- `websocket_api.md` contains the complete WebSocket documentation fetched
  directly from GitHub

The extraction follows the project's Puppeteer scraping rules for optimal
performance and reliability.
