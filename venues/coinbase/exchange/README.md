# Coinbase Exchange API Documentation Scraper

Documentation extraction for the Coinbase Exchange API following the standardized Coincise pipeline.

## Overview

This scraper extracts Coinbase Exchange API documentation and converts it to the standardized LLM-friendly markdown format used across all Coincise venues.

## Documentation Structure

The scraper produces the following documentation structure:

```
docs/coinbase/
├── authentication.md          # API authentication and signing
├── rate_limits.md            # Rate limiting policies
├── network_connectivity.md   # Connection and endpoint information
├── error_codes.md            # Error code definitions
├── response_formats.md       # Response data types and formats
├── change_log.md            # API version history
└── endpoints/
    ├── public/              # Public (unauthenticated) endpoints
    │   ├── get_products.md
    │   ├── get_time.md
    │   └── ...
    └── private/             # Private (authenticated) endpoints
        ├── get_accounts.md
        ├── post_orders.md
        └── ...
```

## Installation

```bash
pnpm install
```

## Usage

### Extract All Documentation

```bash
pnpm run extract:all
```

This will run both general and endpoint extraction in sequence.

### Extract General Documentation Only

```bash
pnpm run extract:general
```

Extracts core documentation files:
- Authentication
- Rate limits
- Network connectivity
- Error codes
- Response formats
- Change log

### Extract Endpoint Documentation Only

```bash
pnpm run extract:endpoints
```

Extracts individual API endpoint documentation into `endpoints/public/` and `endpoints/private/` directories.

### Legacy Scripts

The original batch scraping scripts are still available with the `legacy:` prefix:

```bash
pnpm run legacy:privaterestapi
pnpm run legacy:publicrestapi
pnpm run legacy:websocketapi
pnpm run legacy:all
```

## Endpoint Classification

Endpoints are automatically classified as public or private based on authentication requirements:

- **Public endpoints**: No authentication headers required (CB-ACCESS-KEY, CB-ACCESS-SIGN, etc.)
- **Private endpoints**: Require authentication headers

## Documentation Source

- **Base URL**: https://docs.cdp.coinbase.com/exchange
- **API Reference**: https://docs.cdp.coinbase.com/exchange/reference/
- **General Docs**: https://docs.cdp.coinbase.com/exchange/rest-api/

## Known Endpoints

The scraper includes a comprehensive list of known Coinbase Exchange API endpoints in `src/extractEndpoints.js`. This list includes:

- Account management endpoints
- Order management endpoints
- Deposit and withdrawal endpoints
- Product and market data endpoints
- Profile management endpoints
- And more...

## Authentication Headers

Coinbase Exchange uses the following authentication headers:

- `CB-ACCESS-KEY`: Your API key
- `CB-ACCESS-SIGN`: Request signature
- `CB-ACCESS-TIMESTAMP`: Request timestamp
- `CB-ACCESS-PASSPHRASE`: API key passphrase

## Notes

- The Coinbase documentation uses a custom framework (not Redocly)
- Each endpoint is documented on a separate page with the pattern: `exchangerestapi_{operation}`
- Documentation is updated regularly by GitHub Actions workflow

## Project Structure

```
venues/coinbase/exchange/
├── config/                  # Configuration files (legacy)
├── src/
│   ├── extractGeneral.js   # General documentation extraction
│   ├── extractEndpoints.js # Endpoint documentation extraction
│   ├── index.js           # Legacy batch scraper CLI
│   ├── scraper.js         # Legacy scraper functionality
│   ├── processors/        # Legacy HTML processing modules
│   └── utils/             # Legacy utility functions
├── package.json
└── README.md
```

## Dependencies

- **turndown**: HTML to Markdown conversion
- **turndown-plugin-gfm**: GitHub Flavored Markdown support
- **puppeteer**: Headless browser for dynamic content scraping

## Automation

Documentation is automatically updated via GitHub Actions workflow that runs weekly. The workflow:

1. Extracts general documentation
2. Extracts all endpoint documentation
3. Formats the documentation
4. Creates a pull request with any changes
