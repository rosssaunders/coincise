# GET /api/v1/orders

## List open orders

Returns a list of active orders resting on the order book matching the requested criteria. Does not return any rejected, cancelled, or fully filled orders as they are not active.

**Operation ID:** getOrders

**Tags:** Orders

**Endpoint:** `GET /api/v1/orders`

**Base URL:** https://api.international.coinbase.com

## Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| portfolio | query | string | No | Identifies the portfolio by UUID (e.g., `892e8c7c-e979-4cad-b61b-55a197932cf1`) or portfolio ID (e.g., `5189861793641175`) |
| instrument | query | string | No | Identifies the instrument by name (e.g., `BTC-USDC`), UUID (e.g., `ce55a827-f04a-45c0-9d9b-8bbdb9b48065`), or instrument ID (e.g., `7149252043835013`) |
| instrument_type | query | string | No | Identifies the instruments by type . Allowed values: SPOT, PERPETUAL_FUTURE |
| client_order_id | query | string | No | The client order ID that was used when the order was created |
| event_type | query | string | No | The most recent type of event that happened to the order. Allowed values: NEW, TRADE, REPLACED |
| order_type | query | string | No | The type of order. Allowed values: LIMIT, MARKET, STOP, STOP_LIMIT |
| side | query | string | No | Identifies the side by name (e.g., `BUY`, `SELL`) |
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

Order matches found

### 400

Invalid attribute

## Documentation

For more details, see the [INTX API Documentation](https://docs.cdp.coinbase.com/api-reference/international-exchange-api/rest-api/introduction).
