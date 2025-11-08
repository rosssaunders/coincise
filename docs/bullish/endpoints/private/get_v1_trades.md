# GET /v1/trades

**Summary**: Get Trades

## Description

Get a list of trades based on specified filters.

- requires [bearer token](#overview--add-authenticated-request-header) in
  authorization header
- Only the last 24 hours of data is available for querying
- [supports pagination](#overview--pagination-support)
- filtering on `createdAtDatetime`, `createdAtTimestamp` requires additional
  keywords, [see filtering support](#overview--filtering-support)

**Ratelimited:** `True`

**Operation ID**: trade-get-trades

**Tags**: trades

**Endpoint**: `GET /v1/trades`

**Authentication Required**: Yes

## Parameters

| Parameter        | In    | Type   | Required | Description                 |
| ---------------- | ----- | ------ | -------- | --------------------------- |
|                  |       | string | No       |                             |
| symbol           | query | string | No       |                             |
| orderId          | query | string | No       | unique order ID             |
| tradingAccountId | query | string | Yes      | Id of the trading account   |
| otcTradeId       | query | string | No       | unique Bullish otc trade id |
| clientOtcTradeId | query | string | No       | unique client otc trade id  |

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
    "$ref": "#/components/schemas/Trade"
  }
}
```

### 401 - Not Authenticated

### 403 - Access Forbidden

### 429 - Too Many Requests

### 500 - Internal Server Error
