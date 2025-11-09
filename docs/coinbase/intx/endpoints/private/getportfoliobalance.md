# GET /api/v1/portfolios/{portfolio}/balances/{asset}

## Get balance for portfolio/asset

Retrieves the balance for a given portfolio and asset.

**Operation ID:** getPortfolioBalance

**Tags:** Portfolios

**Endpoint:** `GET /api/v1/portfolios/{portfolio}/balances/{asset}`

**Base URL:** https://api.international.coinbase.com

## Parameters

| Name      | In   | Type   | Required | Description                                                                                                                             |
| --------- | ---- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| portfolio | path | string | Yes      | Identifies the portfolio by UUID (e.g., `892e8c7c-e979-4cad-b61b-55a197932cf1`) or portfolio ID (e.g., `5189861793641175`)              |
| asset     | path | string | Yes      | Identifies the asset by name (e.g., `BTC`), UUID (e.g., `291efb0f-2396-4d41-ad03-db3b2311cb2c`), or asset ID (e.g., `1482439423963469`) |

## Authentication

This endpoint requires authentication. Include the following headers:

- `CB-ACCESS-KEY`: Your API key
- `CB-ACCESS-SIGN`: Request signature
- `CB-ACCESS-TIMESTAMP`: Request timestamp
- `CB-ACCESS-PASSPHRASE`: API key passphrase

## Responses

### 200

Balance information

### 400

Invalid attribute

## Documentation

For more details, see the
[INTX API Documentation](https://docs.cdp.coinbase.com/api-reference/international-exchange-api/rest-api/introduction).
