# KuCoin API Documentation Extractor

This project extracts API documentation from KuCoin and converts it to
standardized LLM-friendly markdown format.

## Extraction Approach

KuCoin uses two complementary extraction methods:

### 1. General Documentation (`extractGeneral.js`)

Extracts core documentation sections from the KuCoin documentation website:

- **Rate Limits** - Rate limiting rules, tiers, and policies
- **Authentication** - API key generation, request signing, headers
- **Network Connectivity** - Connection info, endpoints, WebSocket details
- **Error Codes** - Error code definitions and troubleshooting
- **Response Formats** - Standard response structures and formats
- **Changelog** - API version history and breaking changes

**Source:** https://www.kucoin.com/docs-new

### 2. Endpoint Documentation (`extractEndpoints.js`)

Extracts individual endpoint documentation from OpenAPI specifications hosted in
the KuCoin Universal SDK GitHub repository:

- Processes REST API specs for Spot, Futures, and Margin trading
- Automatically categorizes endpoints as public/private using the
  `x-api-channel` field
- Generates individual markdown files for each endpoint
- Includes parameters, request/response formats, and examples

**Source:**
https://github.com/Kucoin/kucoin-universal-sdk/tree/main/spec/rest/api

## Directory Structure

```
kucoin/
├── src/
│   ├── extractGeneral.js     # General documentation extraction
│   ├── extractEndpoints.js   # Endpoint documentation extraction
│   ├── index.js              # Legacy OpenAPI converter (deprecated)
│   ├── config.js             # Configuration management
│   ├── converter.js          # OpenAPI to Markdown converter
│   ├── downloader.js         # OpenAPI spec downloader
│   ├── fileUtils.js          # File operations
│   ├── rateLimitScraper.js   # Rate limit page scraper
│   └── types.js              # Type definitions
├── config/
│   └── config.json           # API spec URLs and settings
├── package.json
└── README.md
```

## Usage

### Extract All Documentation

```bash
pnpm install
pnpm run extract:all
```

This runs both general and endpoint extraction.

### Extract General Documentation Only

```bash
pnpm run extract:general
```

Extracts the 6 core documentation files to `docs/kucoin/`.

### Extract Endpoint Documentation Only

```bash
pnpm run extract:endpoints
```

Extracts individual endpoint files to `docs/kucoin/endpoints/public/` and
`docs/kucoin/endpoints/private/`.

### Legacy Method (Deprecated)

The legacy OpenAPI extraction method is still available:

```bash
# Extract all endpoints from OpenAPI specs
npm start

# Extract rate limit documentation only
pnpm run extract:rate-limit
```

## Output Structure

```
docs/kucoin/
├── rate_limits.md              # Rate limiting documentation
├── authentication.md           # Authentication guide
├── network_connectivity.md     # Connection information
├── error_codes.md              # Error code reference
├── response_formats.md         # Response format guide
├── change_log.md               # API changelog
└── endpoints/
    ├── public/                 # Public endpoints (no auth required)
    │   ├── get_api_v1_market_stats.md
    │   └── ...
    └── private/                # Private endpoints (auth required)
        ├── post_api_v1_hf_orders.md
        └── ...
```

## Dependencies

- **puppeteer**: Web scraping for documentation pages
- **turndown & turndown-plugin-gfm**: HTML to Markdown conversion
- **node-fetch**: HTTP requests for OpenAPI specs
- **widdershins**: OpenAPI to Markdown conversion (legacy)

## Features

- **Dual Extraction**: Combines web scraping and OpenAPI parsing
- **Smart Classification**: Uses `x-api-channel` field to categorize endpoints
- **Standardized Format**: Follows the project's LLM-friendly markdown standards
- **Comprehensive Coverage**: Captures both narrative documentation and
  technical specifications

## Notes

- Rate limit documentation is critical and requires web scraping as it's not in
  OpenAPI specs
- OpenAPI specs provide the most accurate and complete endpoint documentation
- The `x-api-channel` field in KuCoin's OpenAPI specs reliably indicates public
  vs private endpoints
- All endpoints are properly categorized with 44 public and 113 private
  endpoints (as of latest extraction)
