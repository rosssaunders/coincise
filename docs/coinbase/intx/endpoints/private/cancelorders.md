# DELETE /api/v1/orders

## Cancel orders

Cancels all orders matching the requested criteria.

**Operation ID:** cancelOrders

**Tags:** Orders

**Endpoint:** `DELETE /api/v1/orders`

**Base URL:** https://api.international.coinbase.com

## Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| portfolio | query | string | Yes | Identifies the portfolio by UUID (e.g., `892e8c7c-e979-4cad-b61b-55a197932cf1`) or portfolio ID (e.g., `5189861793641175`) |
| instrument | query | string | No | Identifies the instrument by name (e.g., `BTC-USDC`), UUID (e.g., `ce55a827-f04a-45c0-9d9b-8bbdb9b48065`), or instrument ID (e.g., `7149252043835013`) |
| side | query | string | No | Identifies the side by name (e.g., `BUY`, `SELL`) |
| instrument_type | query | string | No | Identifies the instruments by type . Allowed values: SPOT, PERPETUAL_FUTURE |

## Authentication

This endpoint requires authentication. Include the following headers:

- `CB-ACCESS-KEY`: Your API key
- `CB-ACCESS-SIGN`: Request signature
- `CB-ACCESS-TIMESTAMP`: Request timestamp
- `CB-ACCESS-PASSPHRASE`: API key passphrase

## Responses

### 200

Order submitted

### 400

Invalid attribute

## Documentation

For more details, see the [INTX API Documentation](https://docs.cdp.coinbase.com/api-reference/international-exchange-api/rest-api/introduction).
