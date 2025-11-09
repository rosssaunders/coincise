# PUT /api/v1/orders/{id}

## Modify open order

Modifies an open order.

**Operation ID:** modifyOrder

**Tags:** Orders

**Endpoint:** `PUT /api/v1/orders/{id}`

**Base URL:** https://api.international.coinbase.com

## Parameters

| Name | In   | Type   | Required | Description                                                          |
| ---- | ---- | ------ | -------- | -------------------------------------------------------------------- |
| id   | path | string | Yes      | The exchange order ID or Client Order ID of the order being modified |

## Authentication

This endpoint requires authentication. Include the following headers:

- `CB-ACCESS-KEY`: Your API key
- `CB-ACCESS-SIGN`: Request signature
- `CB-ACCESS-TIMESTAMP`: Request timestamp
- `CB-ACCESS-PASSPHRASE`: API key passphrase

## Responses

### 200

Order modified

### 400

Invalid attribute

## Documentation

For more details, see the
[INTX API Documentation](https://docs.cdp.coinbase.com/api-reference/international-exchange-api/rest-api/introduction).
