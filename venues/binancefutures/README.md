# Binance Futures API Documentation Extractor

Extracts and processes Binance Futures API documentation (USD-M, COIN-M,
Options) from the official Binance developer documentation, following the
standardized documentation structure.

## Documentation Sources

- **USD-M Futures**:
  https://developers.binance.com/docs/derivatives/usds-margined-futures
- **COIN-M Futures**:
  https://developers.binance.com/docs/derivatives/coin-margined-futures
- **Options**: https://developers.binance.com/docs/derivatives/option
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

This will:

1. Extract core documentation (rate limits, authentication, error codes, etc.)
   via `extract:general`
2. Extract individual endpoint documentation files via `extract:endpoints`

### Extract Specific Sections

**General Documentation:**

```bash
pnpm run extract:general
```

This extracts core documentation sections for all three futures types:

- `rate_limits.md` - Rate limiting rules and policies
- `authentication.md` - API authentication and request signing
- `network_connectivity.md` - API endpoints and connectivity info
- `error_codes.md` - Error code definitions
- `response_formats.md` - Common definitions and response formats
- `change_log.md` - API changelog (shared across all futures types)

**Endpoint Documentation:**

```bash
pnpm run extract:endpoints
```

This splits existing monolithic documentation into individual REST endpoint
files for all three types.

## Output Structure

Documentation is saved to `docs/binance/{usdm,coinm,options}/` following the
standardized structure:

```
docs/binance/
├── futures/
│   └── change_log.md         # Shared changelog
├── usdm/
│   ├── rate_limits.md
│   ├── authentication.md
│   ├── network_connectivity.md
│   ├── error_codes.md
│   ├── response_formats.md
│   └── endpoints/
│       ├── public/           # 30 public REST endpoints
│       │   ├── get_fapi_v1_ping.md
│       │   ├── get_fapi_v1_time.md
│       │   └── ...
│       └── private/          # 53 private REST endpoints
│           ├── post_fapi_v1_order.md
│           ├── delete_fapi_v1_order.md
│           └── ...
├── coinm/
│   ├── rate_limits.md
│   ├── authentication.md
│   ├── network_connectivity.md
│   ├── error_codes.md
│   ├── response_formats.md
│   └── endpoints/
│       ├── public/           # 29 public REST endpoints
│       └── private/          # 37 private REST endpoints
└── options/
    ├── rate_limits.md
    ├── authentication.md
    ├── network_connectivity.md
    ├── error_codes.md
    ├── response_formats.md
    └── endpoints/
        ├── public/           # 13 public REST endpoints
        └── private/          # 17 private REST endpoints
```

## Architecture

- **extractGeneral.js** - Extracts core documentation sections (authentication,
  rate limits, etc.)
- **extractEndpoints.js** - Parses existing monolithic markdown files and splits
  them into individual endpoint files

## Notes

- Binance uses Docusaurus for documentation with multi-page structure
- Each REST endpoint is extracted into its own markdown file for better
  organization and LLM consumption
- The extractor parses pre-generated monolithic files rather than scraping
  individual pages
- Change Log is shared across all futures types and stored in
  `docs/binance/futures/change_log.md`
- Total endpoints extracted: 179 (across USD-M, COIN-M, and Options)
  - USD-M: 83 endpoints (30 public + 53 private)
  - COIN-M: 66 endpoints (29 public + 37 private)
  - Options: 30 endpoints (13 public + 17 private)
