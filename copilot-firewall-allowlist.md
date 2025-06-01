# Copilot Agent Firewall Allowlist

This file contains the firewall configuration for GitHub Copilot Agent to access all the API documentation URLs that the venue scrapers require.

## Overview

The venue scrapers in this repository access documentation from various cryptocurrency exchange APIs. To enable Copilot Agent to access these resources when working on this repository, the following domains and URLs need to be allowlisted in the firewall configuration.

## Usage

Set the `COPILOT_AGENT_FIREWALL_ALLOW_LIST_ADDITIONS` GitHub Actions variable to the comma-separated list provided below.

## Allowed Domains

These domains allow access to the domain and any subdomains:

- `api.bitfinex.com` - Bitfinex API documentation
- `bingx-api.github.io` - BingX API documentation hosted on GitHub Pages
- `developers.binance.com` - Binance developer documentation
- `docs.bitfinex.com` - Bitfinex documentation site
- `docs.cdp.coinbase.com` - Coinbase Exchange API documentation
- `docs.deribit.com` - Deribit API documentation
- `exchange-docs.crypto.com` - Crypto.com Exchange documentation
- `github.com` - GitHub repository access (for CCXT library)
- `global-docs.upbit.com` - Upbit API documentation
- `mexcdevelop.github.io` - MEXC API documentation hosted on GitHub Pages
- `raw.githubusercontent.com` - Raw GitHub content (for KuCoin specs)
- `support.deribit.com` - Deribit support documentation
- `www.bitget.com` - Bitget API documentation
- `www.gate.io` - Gate.io API documentation
- `www.htx.com` - HTX (formerly Huobi) API documentation
- `www.okx.com` - OKX API documentation

## Specific URL Paths

These specific URLs are required for detailed API documentation access:

### BingX Documentation
- `https://bingx-api.github.io/docs/` - Base BingX API documentation

### Binance Documentation  
- `https://developers.binance.com/docs/` - Base Binance developer documentation

### Bitfinex Documentation
- `https://docs.bitfinex.com/docs/abbreviations-glossary/`
- `https://docs.bitfinex.com/docs/flag-values/`
- `https://docs.bitfinex.com/docs/rest-auth/`
- `https://docs.bitfinex.com/docs/ws-auth/`
- `https://docs.bitfinex.com/docs/ws-general/`
- `https://docs.bitfinex.com/docs/ws-public/`
- `https://docs.bitfinex.com/docs/ws-websocket-checksum/`

### Coinbase Exchange Documentation
- `https://docs.cdp.coinbase.com/exchange/docs/getting-started/`
- `https://docs.cdp.coinbase.com/exchange/docs/matching-engine/`
- `https://docs.cdp.coinbase.com/exchange/docs/profiles/`
- `https://docs.cdp.coinbase.com/exchange/docs/rate-limits/`
- `https://docs.cdp.coinbase.com/exchange/docs/rest-auth/`
- `https://docs.cdp.coinbase.com/exchange/docs/rest-pagination/`
- `https://docs.cdp.coinbase.com/exchange/docs/rest-rate-limits/`
- `https://docs.cdp.coinbase.com/exchange/docs/rest-requests/`
- `https://docs.cdp.coinbase.com/exchange/docs/runbook/`
- `https://docs.cdp.coinbase.com/exchange/docs/sandbox/`
- `https://docs.cdp.coinbase.com/exchange/docs/types/`
- `https://docs.cdp.coinbase.com/exchange/docs/websocket-auth/`
- `https://docs.cdp.coinbase.com/exchange/docs/websocket-best-practices/`
- `https://docs.cdp.coinbase.com/exchange/docs/websocket-channels/`
- `https://docs.cdp.coinbase.com/exchange/docs/websocket-errors/`
- `https://docs.cdp.coinbase.com/exchange/docs/websocket-overview/`
- `https://docs.cdp.coinbase.com/exchange/docs/websocket-rate-limits/`
- `https://docs.cdp.coinbase.com/exchange/docs/welcome/`
- `https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_deleteorder/`
- `https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_deleteorders/`
- `https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getaccounts/`
- `https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getfills/`
- `https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getorder/`
- `https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getorders/`
- `https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getproduct/`
- `https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getproductbook/`
- `https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getproductcandles/`
- `https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getproducts/`
- `https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getproductstats/`
- `https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getproductsvolume/`
- `https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getproductticker/`
- `https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getproducttrades/`
- `https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_postorders/`

### Other Exchange Documentation
- `https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html/` - Crypto.com Exchange docs
- `https://github.com/ccxt/ccxt.git/` - CCXT library repository
- `https://global-docs.upbit.com/changelog/` - Upbit API changelog
- `https://mexcdevelop.github.io/apidocs/broker_en/` - MEXC Broker API docs
- `https://mexcdevelop.github.io/apidocs/contract_v1_en/` - MEXC Contract API docs
- `https://mexcdevelop.github.io/apidocs/spot_v3_en/` - MEXC Spot API docs
- `https://raw.githubusercontent.com/Kucoin/kucoin-universal-sdk/main/` - KuCoin SDK specs
- `https://support.deribit.com/hc/en-us/articles/25944588342941-Deribit-AWS-Endpoint-Service-instruction/`
- `https://support.deribit.com/hc/en-us/articles/25944603459613-Connection-Management/`
- `https://support.deribit.com/hc/en-us/articles/25944617449373-API-Usage-Policy/`
- `https://support.deribit.com/hc/en-us/articles/25944617523357-Rate-Limits/`
- `https://support.deribit.com/hc/en-us/articles/25944617582877-Server-Infrastructure/`
- `https://support.deribit.com/hc/en-us/articles/25944617728285-Deribit-AWS-Multicast-Service-Instruction/`
- `https://support.deribit.com/hc/en-us/articles/25944635815197-Asia-Gateway/`
- `https://support.deribit.com/hc/en-us/articles/25973087226909-Accessing-historical-trades-and-orders-using-API/`
- `https://www.bitget.com/api-doc/` - Bitget API documentation
- `https://www.gate.io/docs/developers/apiv4/en/` - Gate.io API documentation
- `https://www.htx.com/en-us/opend/newApiPages/` - HTX API documentation
- `https://www.okx.com/docs-v5/en/` - OKX API documentation

## GitHub Actions Variable Configuration

To configure the Copilot Agent firewall, set the `COPILOT_AGENT_FIREWALL_ALLOW_LIST_ADDITIONS` variable to:

```
api.bitfinex.com,bingx-api.github.io,developers.binance.com,docs.bitfinex.com,docs.cdp.coinbase.com,docs.deribit.com,exchange-docs.crypto.com,github.com,global-docs.upbit.com,mexcdevelop.github.io,raw.githubusercontent.com,support.deribit.com,www.bitget.com,www.gate.io,www.htx.com,www.okx.com,https://bingx-api.github.io/docs/,https://developers.binance.com/docs/,https://docs.bitfinex.com/docs/abbreviations-glossary/,https://docs.bitfinex.com/docs/flag-values/,https://docs.bitfinex.com/docs/rest-auth/,https://docs.bitfinex.com/docs/ws-auth/,https://docs.bitfinex.com/docs/ws-general/,https://docs.bitfinex.com/docs/ws-public/,https://docs.bitfinex.com/docs/ws-websocket-checksum/,https://docs.cdp.coinbase.com/exchange/docs/getting-started/,https://docs.cdp.coinbase.com/exchange/docs/matching-engine/,https://docs.cdp.coinbase.com/exchange/docs/profiles/,https://docs.cdp.coinbase.com/exchange/docs/rate-limits/,https://docs.cdp.coinbase.com/exchange/docs/rest-auth/,https://docs.cdp.coinbase.com/exchange/docs/rest-pagination/,https://docs.cdp.coinbase.com/exchange/docs/rest-rate-limits/,https://docs.cdp.coinbase.com/exchange/docs/rest-requests/,https://docs.cdp.coinbase.com/exchange/docs/runbook/,https://docs.cdp.coinbase.com/exchange/docs/sandbox/,https://docs.cdp.coinbase.com/exchange/docs/types/,https://docs.cdp.coinbase.com/exchange/docs/websocket-auth/,https://docs.cdp.coinbase.com/exchange/docs/websocket-best-practices/,https://docs.cdp.coinbase.com/exchange/docs/websocket-channels/,https://docs.cdp.coinbase.com/exchange/docs/websocket-errors/,https://docs.cdp.coinbase.com/exchange/docs/websocket-overview/,https://docs.cdp.coinbase.com/exchange/docs/websocket-rate-limits/,https://docs.cdp.coinbase.com/exchange/docs/welcome/,https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_deleteorder/,https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_deleteorders/,https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getaccounts/,https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getfills/,https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getorder/,https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getorders/,https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getproduct/,https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getproductbook/,https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getproductcandles/,https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getproducts/,https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getproductstats/,https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getproductsvolume/,https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getproductticker/,https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getproducttrades/,https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_postorders/,https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html/,https://github.com/ccxt/ccxt.git/,https://global-docs.upbit.com/changelog/,https://mexcdevelop.github.io/apidocs/broker_en/,https://mexcdevelop.github.io/apidocs/contract_v1_en/,https://mexcdevelop.github.io/apidocs/spot_v3_en/,https://raw.githubusercontent.com/Kucoin/kucoin-universal-sdk/main/,https://support.deribit.com/hc/en-us/articles/25944588342941-Deribit-AWS-Endpoint-Service-instruction/,https://support.deribit.com/hc/en-us/articles/25944603459613-Connection-Management/,https://support.deribit.com/hc/en-us/articles/25944617449373-API-Usage-Policy/,https://support.deribit.com/hc/en-us/articles/25944617523357-Rate-Limits/,https://support.deribit.com/hc/en-us/articles/25944617582877-Server-Infrastructure/,https://support.deribit.com/hc/en-us/articles/25944617728285-Deribit-AWS-Multicast-Service-Instruction/,https://support.deribit.com/hc/en-us/articles/25944635815197-Asia-Gateway/,https://support.deribit.com/hc/en-us/articles/25973087226909-Accessing-historical-trades-and-orders-using-API/,https://www.bitget.com/api-doc/,https://www.gate.io/docs/developers/apiv4/en/,https://www.htx.com/en-us/opend/newApiPages/,https://www.okx.com/docs-v5/en/
```

## Maintenance

When adding new venues or updating existing ones:

1. Update this file with any new domains or URLs
2. Update the GitHub Actions variable configuration
3. Test that the new venues can access their required documentation

## Venues Covered

This allowlist covers documentation access for the following venues:

- **Binance** (Spot & Futures) - `developers.binance.com`
- **BingX** - `bingx-api.github.io`
- **Bitfinex** - `docs.bitfinex.com`, `api.bitfinex.com`
- **Bitget** - `www.bitget.com`
- **Bybit** - `bybit-exchange.github.io` (domain covered by general rules)
- **CCXT** - `github.com`
- **Coinbase Exchange** - `docs.cdp.coinbase.com`
- **Crypto.com** - `exchange-docs.crypto.com`
- **Deribit** - `docs.deribit.com`, `support.deribit.com`
- **Gate.io** - `www.gate.io`
- **HTX** (formerly Huobi) - `www.htx.com`
- **KuCoin** - `raw.githubusercontent.com`
- **MEXC** - `mexcdevelop.github.io`
- **OKX** - `www.okx.com`
- **Upbit** - `global-docs.upbit.com`