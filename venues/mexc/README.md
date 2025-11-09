# MEXC Exchange Documentation Extraction

This directory contains extraction scripts for MEXC Exchange API documentation.

## Overview

MEXC uses a single-page documentation format hosted at:

- Spot API: https://mexcdevelop.github.io/apidocs/spot_v3_en

The extraction scripts convert this HTML documentation into LLM-friendly
Markdown format following the standardized Coincise structure.

## Structure

```
venues/mexc/
├── src/
│   ├── extractGeneral.js    # Extracts core documentation files
│   └── extractEndpoints.js  # Extracts individual endpoint documentation
├── package.json
└── README.md
```

## Extraction Scripts

### General Documentation (`extractGeneral.js`)

Extracts core documentation files to `docs/mexc/`:

- `rate_limits.md` - API rate limiting rules and policies
- `authentication.md` - API key generation and request signing
- `network_connectivity.md` - Base endpoints and HTTP return codes
- `error_codes.md` - Error codes and troubleshooting
- `response_formats.md` - Standard response structures
- `change_log.md` - API version history and changes

### Endpoint Documentation (`extractEndpoints.js`)

Extracts individual endpoint documentation to `docs/mexc/endpoints/`:

- `public/` - Endpoints that don't require authentication
- `private/` - Endpoints that require API keys and signatures

Each endpoint is saved as `{http_method}_{endpoint_path}.md` (e.g.,
`get_api_v3_ticker_24hr.md`).

## Usage

### Extract All Documentation

```bash
pnpm run extract:all
```

This runs both general and endpoint extraction scripts.

### Extract Specific Parts

```bash
# Extract only general documentation
pnpm run extract:general

# Extract only endpoint documentation
pnpm run extract:endpoints
```

## Authentication Detection

Endpoints are automatically categorized as public or private based on:

- Presence of authentication headers (X-MEXC-APIKEY)
- Signature requirements
- RecvWindow parameters
- Endpoint path patterns (account, order, trade, wallet, etc.)

## Output Statistics

- **General Documentation**: 6 core files (all under 300 lines)
- **Endpoint Documentation**: 60 endpoints
  - Public: 9 endpoints
  - Private: 51 endpoints

## Automated Updates

This documentation is automatically updated weekly via GitHub Actions workflow
(`.github/workflows/mexc-docs-update.yml`).

## Dependencies

- `puppeteer` - Headless browser for page scraping
- `turndown` - HTML to Markdown conversion
- `turndown-plugin-gfm` - GitHub Flavored Markdown support
- Shared utilities from `venues/shared/`

## Implementation Notes

- Uses shared Puppeteer and Turndown utilities from `venues/shared/`
- Follows pure ES6 JavaScript standards (no TypeScript)
- Proper error handling with non-zero exit codes on failure
- Section boundary detection prevents over-extraction
- Source URLs included in endpoint documentation for reference

## Future Enhancements

The current implementation extracts only Spot API documentation. Future work may
include:

- Contract API extraction (https://mexcdevelop.github.io/apidocs/contract_v1_en)
- Broker API extraction (https://mexcdevelop.github.io/apidocs/broker_en)
- WebSocket documentation extraction
