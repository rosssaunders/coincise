# Binance Futures API Documentation Extractor

Extracts and processes Binance Futures API documentation for USD-M Futures, COIN-M Futures, and Options from the official Binance developer documentation.

## Documentation Sources

- **USD-M Futures**: https://developers.binance.com/docs/derivatives/usds-margined-futures
- **COIN-M Futures**: https://developers.binance.com/docs/derivatives/coin-margined-futures
- **Options**: https://developers.binance.com/docs/derivatives/option
- **Type**: Docusaurus-based documentation

## Installation

```bash
npm install
```

## Usage

### Extract All Documentation

```bash
npm run extract:all
```

This extracts documentation for all three futures types (USD-M, COIN-M, Options).

### Extract Specific Sections

**General Documentation (all futures types):**
```bash
npm run extract:general
```

This extracts core documentation sections for USD-M, COIN-M, and Options:
- `rate_limits.md` - Rate limiting rules and policies
- `authentication.md` - API authentication and request signing
- `network_connectivity.md` - API endpoints and connectivity info
- `error_codes.md` - Error code definitions
- `response_formats.md` - Common definitions and response formats
- `change_log.md` - API changelog (shared across all futures types)

**USD-M Futures Endpoint Documentation:**
```bash
npm run extract:endpoints:usdm:public:rest
npm run extract:endpoints:usdm:private:rest
npm run extract:endpoints:usdm:public:ws
npm run extract:endpoints:usdm:private:ws
```

**COIN-M Futures Endpoint Documentation:**
```bash
npm run extract:endpoints:coinm:public:rest
npm run extract:endpoints:coinm:private:rest
npm run extract:endpoints:coinm:public:ws
npm run extract:endpoints:coinm:private:ws
```

**Options Endpoint Documentation:**
```bash
npm run extract:endpoints:options:public:rest
npm run extract:endpoints:options:private:rest
npm run extract:endpoints:options:public:ws
npm run extract:endpoints:options:private:ws
```

## Output Structure

Documentation is saved to `docs/binance/`:

```
docs/binance/
├── futures/
│   └── change_log.md
├── usdm/
│   ├── rate_limits.md
│   ├── authentication.md
│   ├── network_connectivity.md
│   ├── error_codes.md
│   ├── response_formats.md
│   ├── public_rest_api.md
│   ├── private_rest_api.md
│   ├── public_websocket_api.md
│   └── private_websocket_api.md
├── coinm/
│   ├── rate_limits.md
│   ├── authentication.md
│   ├── network_connectivity.md
│   ├── error_codes.md
│   ├── response_formats.md
│   ├── public_rest_api.md
│   ├── private_rest_api.md
│   ├── public_websocket_api.md
│   └── private_websocket_api.md
└── options/
    ├── rate_limits.md
    ├── authentication.md
    ├── network_connectivity.md
    ├── error_codes.md
    ├── response_formats.md
    ├── public_rest_api.md
    ├── private_rest_api.md
    ├── public_websocket_api.md
    └── private_websocket_api.md
```

## Notes

- Binance uses Docusaurus for documentation with multi-page structure
- The extractor combines related endpoint pages into comprehensive API documents
- Due to Binance's documentation structure, endpoints are aggregated into category files rather than individual endpoint files
- Extraction respects rate limits with polite delays between requests
- General documentation is shared where applicable (e.g., change log)
