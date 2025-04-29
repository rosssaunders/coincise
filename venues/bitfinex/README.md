# Bitfinex API Documentation Extractor

This project extracts API documentation from Bitfinex and converts it to markdown format.

## Features

- Extracts REST API authenticated endpoints from HTML documentation
- Extracts WebSocket API documentation (both public and private)
- Organizes endpoints by section
- Converts HTML to Markdown with proper formatting
- Preserves code blocks with syntax highlighting

## Project Structure

```
bitfinex/
├── config/
│   ├── margin_funding.json  # Configuration for margin funding endpoints
│   ├── merchants.json       # Configuration for merchant endpoints
│   ├── orders.json          # Configuration for order endpoints
│   ├── positions.json       # Configuration for position endpoints
│   ├── wallets.json         # Configuration for wallet endpoints
│   ├── ws_private.json      # Configuration for private WebSocket API
│   └── ws_public.json       # Configuration for public WebSocket API
├── src/
│   ├── index.js             # Main REST API extraction script
│   └── ws.js                # WebSocket API extraction script
├── package.json
└── README.md
```

## Dependencies

- turndown: ^7.1.2 - For HTML to Markdown conversion
- turndown-plugin-gfm: ^1.0.2 - GitHub Flavored Markdown support
- jsdom: 26.1.0 - For HTML parsing
- puppeteer: ^24.7.2 - For web scraping and dynamic content extraction
- npm-run-all: ^4.1.5 - For running multiple scripts sequentially

## Usage

1. Install dependencies:

```bash
npm install
```

2. Run all extractors:

```bash
npm start
```

3. Or run specific extractors:

```bash
# Extract REST API endpoints
npm run extract:wallets
npm run extract:positions
npm run extract:orders
npm run extract:merchants
npm run extract:margin

# Extract WebSocket API documentation
npm run extract:ws-private
npm run extract:ws-public
```

## Output Files

The extracted markdown will be saved to the following locations:

- REST API:

  - `../../docs/bitfinex/private_rest_wallets_account_api.md`
  - `../../docs/bitfinex/private_rest_positions_api.md`
  - `../../docs/bitfinex/private_rest_orders_api.md`
  - `../../docs/bitfinex/private_rest_merchants_api.md`
  - `../../docs/bitfinex/private_rest_margin_funding_api.md`

- WebSocket API:
  - `../../docs/bitfinex/private_websocket_api.md`
  - `../../docs/bitfinex/public_websocket_api.md`

## Configuration

Extraction settings can be modified in the respective configuration files in the `config/` directory. Each configuration file includes:

- `docUrl`: URL of the main documentation page
- `output`: Path where the markdown file will be saved (relative to src/)
- `title`: Title for the markdown document
- `baseUrl`: Base URL for resolving relative links
- `section`: Section name to extract from the documentation

For WebSocket configurations, additional parameters include:

- `urls`: Array of URLs to process for the WebSocket documentation
- `mainDocsUrl`: URL of the main documentation page that contains links to other pages
