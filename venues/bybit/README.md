# Bybit V5 API Documentation Extraction

Documentation extraction for Bybit's V5 API following the standardized Coincise structure.

## Features

- Extracts 6 core documentation files:
  - `rate_limits.md` - Rate limiting rules and policies
  - `authentication.md` - API authentication and security
  - `network_connectivity.md` - Connection information and endpoints
  - `error_codes.md` - Error code definitions
  - `response_formats.md` - Standard response structures
  - `change_log.md` - API version history
- Extracts individual endpoint documentation:
  - 22 public endpoints
  - 113 private endpoints
  - Proper categorization based on authentication headers
  - Individual markdown files per endpoint

## Prerequisites

- Node.js >= 20.0.0
- pnpm

## Installation

From the venue directory:

```bash
pnpm install
```

## Usage

### Extract All Documentation

```bash
pnpm run extract:all
```

### Extract Only General Documentation

```bash
pnpm run extract:general
```

### Extract Only Endpoint Documentation

```bash
pnpm run extract:endpoints
```

## Output Structure

```
docs/bybit/
├── rate_limits.md
├── authentication.md
├── network_connectivity.md
├── error_codes.md
├── response_formats.md
├── change_log.md
└── endpoints/
    ├── public/
    │   └── get_v5_market_time.md
    │   └── ... (22 endpoints)
    └── private/
        └── post_v5_order_create.md
        └── ... (113 endpoints)
```

## Documentation Source

- **Base URL:** https://bybit-exchange.github.io/docs/v5/
- **API Version:** V5
- **Changelog:** https://bybit-exchange.github.io/docs/changelog/v5

## Technical Details

### Extraction Approach

- Uses Puppeteer for web scraping
- Converts HTML to Markdown using Turndown with GFM support
- Classifies endpoints as public/private based on authentication headers:
  - Private endpoints require: X-BAPI-API-KEY, X-BAPI-SIGN, X-BAPI-TIMESTAMP
  - Public endpoints do not require authentication headers

### Authentication Detection

The script checks for Bybit-specific authentication headers:
- `X-BAPI-API-KEY` - API key header
- `X-BAPI-SIGN` - Signature header
- `X-BAPI-TIMESTAMP` - Timestamp header

Endpoints requiring any of these headers are classified as private.

## Dependencies

- `puppeteer` - Web scraping and browser automation
- `turndown` - HTML to Markdown conversion
- `turndown-plugin-gfm` - GitHub Flavored Markdown support

## Last Updated

2024-11-08 