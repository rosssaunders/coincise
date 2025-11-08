# Binance Spot API Documentation Extractor

Extracts and processes Binance Spot API documentation from the official Binance developer documentation.

## Documentation Source

- **URL**: https://developers.binance.com/docs/binance-spot-api-docs
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

### Extract Specific Sections

**General Documentation:**
```bash
npm run extract:general
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
npm run extract:endpoints:public_rest      # Public REST API endpoints
npm run extract:endpoints:private_rest     # Private REST API endpoints
npm run extract:endpoints:public_websocket # Public WebSocket streams
npm run extract:endpoints:private_websocket # Private WebSocket streams
npm run extract:endpoints:fix              # FIX API documentation
npm run extract:endpoints:sbe              # SBE Market Data documentation
```

## Output Structure

Documentation is saved to `docs/binance/spot/`:

```
docs/binance/spot/
├── rate_limits.md
├── authentication.md
├── network_connectivity.md
├── error_codes.md
├── response_formats.md
├── change_log.md
├── public_rest_api.md
├── private_rest_api.md
├── public_websocket_api.md
├── private_websocket_api.md
├── fix_api.md
└── market_data_sbe_api.md
```

## Notes

- Binance uses Docusaurus for documentation with multi-page structure
- The extractor combines related endpoint pages into comprehensive API documents
- Due to Binance's documentation structure, endpoints are aggregated into category files rather than individual endpoint files
- Extraction respects rate limits with polite delays between requests
