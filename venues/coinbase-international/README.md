# Coinbase International Exchange API Documentation Extractor

This project extracts and formats documentation from the Coinbase International Exchange API documentation website.

## Overview

The Coinbase International Exchange (INTX) provides three API types:
- REST API - For trading and account management
- FIX API - For institutional trading
- WebSocket Feed - For real-time market data and order updates

## Installation

```bash
npm install
```

## Usage

Extract specific API documentation:

```bash
# Extract REST API documentation
npm run extract:rest

# Extract FIX API documentation  
npm run extract:fix

# Extract WebSocket API documentation
npm run extract:websocket
```

## Output

Documentation is saved to:
- REST API: `../../docs/coinbase/international/rest_api.md`
- FIX API: `../../docs/coinbase/international/fix_api.md`
- WebSocket API: `../../docs/coinbase/international/websocket_api.md`

## Configuration

Configuration files are located in the `config/` directory:
- `rest.json` - REST API URLs and output settings
- `fix.json` - FIX API URLs and output settings
- `websocket.json` - WebSocket API URLs and output settings

## Dependencies

- `turndown` - HTML to Markdown conversion
- `turndown-plugin-gfm` - GitHub Flavored Markdown support