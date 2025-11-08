# GET /v1/history/markets/{symbol}/trades

**Summary**: Get Historical Market Trades

## Description

Get Historical Market Trades by Market Symbol. Supports querying of up to 7 days
of data at a time.

- [supports pagination](#overview--pagination-support)

**Ratelimited:** `False`

- On a single query request you can retrieve data over a 7 day window, with the
  data available for the last 90 days

**Operation ID**: market-data-get-historical-anonymous-trades-by-market-symbol

**Tags**: history

**Endpoint**: `GET /v1/history/markets/{symbol}/trades`

**Authentication Required**: No

## Parameters

| Parameter              | In    | Type   | Required | Description                                                    |
| ---------------------- | ----- | ------ | -------- | -------------------------------------------------------------- |
| symbol                 | path  | string | Yes      | symbol to get                                                  |
| createdAtDatetime[gte] | query | string | No       | start timestamp of period, ISO 8601 with millisecond as string |
| createdAtDatetime[lte] | query | string | No       | end timestamp of period, ISO 8601 with millisecond as string   |

## Responses

### 200 - OK

**Content-Type**: application/json

**Schema**:

```json
{
  "type": "array",
  "minItems": 0,
  "maxItems": 25,
  "items": {
    "$ref": "#/components/schemas/ObfuscatedTradeWithId"
  }
}
```

### 404 - Resource Not Found

### 429 - Too Many Requests

### 500 - Internal Server Error
