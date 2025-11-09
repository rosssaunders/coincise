# Binance Spot API Documentation Extractor

Extracts and processes Binance Spot API documentation from the official Binance
developer documentation.

## Documentation Source

- **URL**: https://developers.binance.com/docs/binance-spot-api-docs
- **Type**: Docusaurus-based documentation

## Installation

```bash
pnpm install
```

## Usage

### Extract All Documentation

```bash
pnpm run extract:all
```

### Extract Specific Sections

**General Documentation:**

```bash
pnpm run extract:general
```

This extracts core documentation sections into separate files:

- `rate_limits.md` - Rate limiting rules and policies
- `authentication.md` - API authentication and request signing
- `network_connectivity.md` - API endpoints and connectivity info
- `error_codes.md` - Error code definitions
- `response_formats.md` - HTTP return codes and response formats
- `change_log.md` - API changelog

**Endpoint Documentation:**

```bash
pnpm run extract:endpoints  # Extract individual REST endpoint files
```

This extracts each REST API endpoint into its own markdown file in the
`endpoints/` directory, organized into `public/` and `private/` subdirectories.

## Output Structure

Documentation is saved to `docs/binance/spot/` following the standardized
structure:

```
docs/binance/spot/
├── rate_limits.md              # Rate limiting rules and policies
├── authentication.md           # API key generation and request signing
├── network_connectivity.md     # Connection info and endpoints
├── error_codes.md             # Error code definitions
├── response_formats.md        # Standard response structures
├── change_log.md              # API version history
└── endpoints/
    ├── public/                 # Public REST API endpoints (15 endpoints)
    │   ├── get_api_v3_ping.md
    │   ├── get_api_v3_time.md
    │   ├── get_api_v3_exchangeinfo.md
    │   ├── get_api_v3_depth.md
    │   ├── get_api_v3_ticker_24hr.md
    │   └── ...
    └── private/                # Private REST API endpoints (22 endpoints)
        ├── post_api_v3_order.md
        ├── delete_api_v3_order.md
        ├── get_api_v3_account.md
        ├── get_api_v3_mytrades.md
        └── ...
```

## Architecture

- **extractGeneral.js** - Extracts core documentation sections (authentication,
  rate limits, etc.)
- **extractEndpoints.js** - Extracts individual REST endpoints from
  documentation pages and saves each to a separate file

## Notes

- Binance uses Docusaurus for documentation with multi-page structure
- Each REST endpoint is extracted into its own markdown file for better
  organization and LLM consumption
- WebSocket endpoints are excluded as they don't follow the REST endpoint
  pattern
- Extraction respects rate limits with polite delays between requests
