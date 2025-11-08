# GET /v1/markets/{symbol}/trades

**Summary**: Get Latest Market Trades

## Description

Get Market Trades by Market Symbol.

- return 100 most recent trades
- lookup from local cache

**Ratelimited:** `False`

**Operation ID**: market-data-get-anonymous-trades-by-market-symbol

**Tags**: market-data

**Endpoint**: `GET /v1/markets/{symbol}/trades`

**Authentication Required**: No

## Parameters

| Parameter | In   | Type   | Required | Description   |
| --------- | ---- | ------ | -------- | ------------- |
| symbol    | path | string | Yes      | symbol to get |

## Responses

### 200 - OK

**Content-Type**: application/json

**Schema**:

```json
{
  "type": "array",
  "minItems": 0,
  "maxItems": 100,
  "items": {
    "$ref": "#/components/schemas/ObfuscatedTrade"
  }
}
```

### 404 - Resource Not Found

### 429 - Too Many Requests

### 500 - Internal Server Error
