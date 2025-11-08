# Hyperliquid Exchange Documentation Extractor

This directory contains scripts for extracting and converting Hyperliquid API documentation into LLM-friendly markdown format.

## Overview

Hyperliquid is a decentralized perpetual trading protocol with comprehensive REST and WebSocket APIs. This extractor pulls documentation from their official GitBook-based docs.

## Documentation Source

- **Main Documentation**: https://hyperliquid.gitbook.io/hyperliquid-docs
- **API Documentation**: https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api
- **Python SDK**: https://github.com/hyperliquid-dex/hyperliquid-python-sdk

## Extraction Scripts

### `extractGeneral.js`

Extracts general API documentation:
- Network connectivity (REST and WebSocket endpoints)
- Authentication and signing
- Rate limits and user limits
- Error responses
- Response format notation
- Change log

### `extractEndpoints.js`

Extracts individual endpoint documentation:
- **Info endpoints** (26 endpoints): Public and private endpoints for querying market data and user information
- **Exchange endpoints** (25 endpoints): Private endpoints for trading, transfers, and account management
- **WebSocket API** (1 endpoint): Real-time data streaming documentation

Total: **52 endpoints** (7 public, 45 private)

## Usage

### Install Dependencies

```bash
npm install
```

### Extract All Documentation

```bash
npm run extract:all
```

### Extract Individual Sections

```bash
npm run extract:general      # Extract general documentation
npm run extract:endpoints    # Extract endpoint documentation
```

## Output Structure

Generated documentation is placed in `/docs/hyperliquid/`:

```
docs/hyperliquid/
├── authentication.md
├── change_log.md
├── error_codes.md
├── network_connectivity.md
├── rate_limits.md
├── response_formats.md
└── endpoints/
    ├── public/
    │   ├── retrieve_mids_for_all_coins.md
    │   ├── l2_book_snapshot.md
    │   ├── candle_snapshot.md
    │   └── ...
    └── private/
        ├── place_an_order.md
        ├── cancel_order_s.md
        ├── retrieve_a_user_s_open_orders.md
        └── ...
```

## Hyperliquid API Characteristics

### Network

- **Mainnet REST**: https://api.hyperliquid.xyz
- **Mainnet WebSocket**: wss://api.hyperliquid.xyz/ws
- **Testnet REST**: https://api.hyperliquid-testnet.xyz
- **Testnet WebSocket**: wss://api.hyperliquid-testnet.xyz/ws

### Authentication

- Uses EIP-712 signing with private keys
- API wallets for programmatic access
- Signature-based authentication for all private endpoints

### Rate Limits

- REST: 1200 weight per minute per IP address
- WebSocket: Connection-based limits
- Per-address limits on certain operations

### API Structure

- **Info Endpoint**: Query market data, user positions, orders, fills
- **Exchange Endpoint**: Place/modify/cancel orders, manage leverage, transfers
- **WebSocket**: Real-time market data and user event streams

## Notes

- The API is currently at version v0, with a planned v1 update for standardization
- GitBook structure requires different extraction approach than Redocly-based docs
- Endpoints are classified based on authentication requirements
- WebSocket API documentation is kept as a single comprehensive document

## Last Updated

2025-11-08
