# GET /api/v1/portfolios/{portfolio}/fills

## List portfolio fills

Returns all of the fills for a given portfolio.

**Operation ID:** getPortfolioFills

**Tags:** Portfolios

**Endpoint:** `GET /api/v1/portfolios/{portfolio}/fills`

**Base URL:** https://api.international.coinbase.com

## Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| portfolio | path | string | Yes | Identifies the portfolio by UUID (e.g., `892e8c7c-e979-4cad-b61b-55a197932cf1`) or portfolio ID (e.g., `5189861793641175`) |
| order_id | query | string | No | A specific order for which to fetch fills identified by order ID |
| client_order_id | query | string | No | Fetch fills for all orders with the given client order ID |
| undefined | undefined | string | No |  |
| undefined | undefined | string | No |  |
| undefined | undefined | string | No |  |
| undefined | undefined | string | No |  |

## Authentication

This endpoint requires authentication. Include the following headers:

- `CB-ACCESS-KEY`: Your API key
- `CB-ACCESS-SIGN`: Request signature
- `CB-ACCESS-TIMESTAMP`: Request timestamp
- `CB-ACCESS-PASSPHRASE`: API key passphrase

## Responses

### 200

Fill information

### 400

Invalid attribute

## Documentation

For more details, see the [INTX API Documentation](https://docs.cdp.coinbase.com/api-reference/international-exchange-api/rest-api/introduction).
