# GET /api/v1/portfolios/fills

## List fills by portfolios

Returns fills for specified portfolios or fills for all portfolios if none are provided.

**Operation ID:** getMultiPortfolioFills

**Tags:** Portfolios

**Endpoint:** `GET /api/v1/portfolios/fills`

**Base URL:** https://api.international.coinbase.com

## Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| portfolios | query | string | No | The UUID of the portfolio that has filled orders. Can multiple values in the query |
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
