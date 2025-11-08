# GET /v1/history/trades

**Summary**: Get Historical Trades

## Description

Get a list of trades based on specified filters.

- requires [bearer token](#overview--add-authenticated-request-header) in
  authorization header
- On a single query request you can retrieve data over a 7 day window, with the
  data available for the last 90 days
- [supports pagination](#overview--pagination-support)
- filtering on `createdAtDatetime`, `createdAtTimestamp` requires additional
  keywords, [see filtering support](#overview--filtering-support)

**Ratelimited:** `True`

**Operation ID**: trade-get-trades-history

**Tags**: history

**Endpoint**: `GET /v1/history/trades`

**Authentication Required**: Yes

## Parameters

| Parameter              | In    | Type   | Required | Description                                                    |
| ---------------------- | ----- | ------ | -------- | -------------------------------------------------------------- |
|                        |       | string | No       |                                                                |
| symbol                 | query | string | No       |                                                                |
| orderId                | query | string | No       | unique order ID                                                |
| tradeId                | query | string | No       | unique trade ID                                                |
| tradingAccountId       | query | string | Yes      | Id of the trading account                                      |
| createdAtDatetime[gte] | query | string | No       | start timestamp of period, ISO 8601 with millisecond as string |
| createdAtDatetime[lte] | query | string | No       | end timestamp of period, ISO 8601 with millisecond as string   |
| otcTradeId             | query | string | No       | unique Bullish otc trade id                                    |
| clientOtcTradeId       | query | string | No       | unique client otc trade id                                     |

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
