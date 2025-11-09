# GET /api/v1/portfolios/{portfolio}/position-limits/positions/{instrument}

## Get the open position limits for the portfolio instrument

Retrieves the position limits for a given portfolio and symbol.

**Operation ID:** getPortfolioPositionLimitsInstrument

**Tags:** Portfolios

**Endpoint:** `GET /api/v1/portfolios/{portfolio}/position-limits/positions/{instrument}`

**Base URL:** https://api.international.coinbase.com

## Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| portfolio | path | string | Yes | Identifies the portfolio by UUID (e.g., `892e8c7c-e979-4cad-b61b-55a197932cf1`) or portfolio ID (e.g., `5189861793641175`) |
| instrument | path | string | Yes | Identifies the instrument by name (e.g., `BTC-USDC`), UUID (e.g., `ce55a827-f04a-45c0-9d9b-8bbdb9b48065`), or instrument ID (e.g., `7149252043835013`) |

## Authentication

This endpoint requires authentication. Include the following headers:

- `CB-ACCESS-KEY`: Your API key
- `CB-ACCESS-SIGN`: Request signature
- `CB-ACCESS-TIMESTAMP`: Request timestamp
- `CB-ACCESS-PASSPHRASE`: API key passphrase

## Responses

### 200

Position limits information

### 400

Invalid attribute

## Documentation

For more details, see the [INTX API Documentation](https://docs.cdp.coinbase.com/api-reference/international-exchange-api/rest-api/introduction).
