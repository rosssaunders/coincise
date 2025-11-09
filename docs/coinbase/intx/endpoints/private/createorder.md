# POST /api/v1/orders

## Create order

Creates a new order.

**Operation ID:** createOrder

**Tags:** Orders

**Endpoint:** `POST /api/v1/orders`

**Base URL:** https://api.international.coinbase.com

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
