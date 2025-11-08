# GET /v2/orders

**Summary**: Get Orders

## Description

Retrieve a list of orders placed by a trading account with specified filters.

- Only the last 24 hours of data is available for querying

This endpoint requires [authentication](#overview--generate-a-jwt-token) and
supports [pagination](#overview--pagination-support). To filter by
`createdAtDatetime` and `createdAtTimestamp`, additional parameters are
required. For detailed instructions, see the
[Filtering Support](#overview--filtering-support) section. Additionally, this
endpoint is subjected to rate limiting.

**Operation ID**: trade-get-orders-v2

**Tags**: orders

**Endpoint**: `GET /v2/orders`

**Authentication Required**: Yes

## Parameters

| Parameter        | In    | Type   | Required | Description                                                                              |
| ---------------- | ----- | ------ | -------- | ---------------------------------------------------------------------------------------- |
|                  |       | string | No       |                                                                                          |
| symbol           | query | string | No       |                                                                                          |
| clientOrderId    | query | string | No       | Unique numeric (i64) identifier generated on the client side expressed as a string value |
| side             | query | string | No       | order side                                                                               |
| status           | query | string | No       | order status                                                                             |
| tradingAccountId | query | string | Yes      | Id of the trading account                                                                |

## Responses

### 200 - OK

**Content-Type**: application/json

**Schema**:

```json
{
  "type": "array",
  "minItems": 0,
  "maxItems": 10,
  "items": {
    "$ref": "#/components/schemas/Order"
  }
}
```

### 401 - Not Authenticated

### 403 - Access Forbidden

### 429 - Too Many Requests

### 500 - Internal Server Error
