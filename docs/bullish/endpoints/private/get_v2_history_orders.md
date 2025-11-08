# GET /v2/history/orders

**Summary**: Get Historical Orders

## Description

Retrieve a list of orders placed by a trading account with specified filters.

- On a single query request you can retrieve data over a 7 day window, with the
  data available for the last 90 days

This endpoint requires [authentication](#overview--generate-a-jwt-token) and
supports [pagination](#overview--pagination-support). To filter by
`createdAtDatetime` and `createdAtTimestamp`, additional parameters are
required. For detailed instructions, see the
[Filtering Support](#overview--filtering-support) section. Additionally, this
endpoint is subjected to rate limiting.

**Operation ID**: trade-get-orders-history-v2

**Tags**: history

**Endpoint**: `GET /v2/history/orders`

**Authentication Required**: Yes

## Parameters

| Parameter              | In    | Type   | Required | Description                                                                              |
| ---------------------- | ----- | ------ | -------- | ---------------------------------------------------------------------------------------- |
|                        |       | string | No       |                                                                                          |
| symbol                 | query | string | No       |                                                                                          |
| orderId                | query | string | No       |                                                                                          |
| clientOrderId          | query | string | No       | Unique numeric (i64) identifier generated on the client side expressed as a string value |
| side                   | query | string | No       | order side                                                                               |
| status                 | query | string | No       | order status                                                                             |
| tradingAccountId       | query | string | Yes      | Id of the trading account                                                                |
| createdAtDatetime[gte] | query | string | No       | start timestamp of period, ISO 8601 with millisecond as string                           |
| createdAtDatetime[lte] | query | string | No       | end timestamp of period, ISO 8601 with millisecond as string                             |

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
