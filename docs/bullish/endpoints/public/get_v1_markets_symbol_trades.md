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

```json
{
  "type": "array",
  "minItems": 0,
  "maxItems": 100,
  "items": {
    "type": "object",
    "required": [
      "tradeId",
      "symbol",
      "price",
      "quantity",
      "side",
      "isTaker",
      "createdAtTimestamp",
      "createdAtDatetime"
    ],
    "properties": {
      "tradeId": {
        "type": "string",
        "example": "100020000000000060",
        "properties": {}
      },
      "symbol": {
        "type": "string",
        "description": "market symbol. Eg `BTCUSDC` for SPOT and `BTC-USDC-PERP` for PERPETUAL market",
        "example": "BTCUSDC",
        "properties": {}
      },
      "price": {
        "description": "see [asset value](#overview--price-and-quantity-precision) format",
        "type": "string",
        "example": "1.00000000",
        "properties": {}
      },
      "quantity": {
        "description": "see [asset value](#overview--price-and-quantity-precision) format",
        "type": "string",
        "example": "1.00000000",
        "properties": {}
      },
      "side": {
        "type": "string",
        "description": "order side can have the following string values `\"BUY\"`, `\"SELL\"`",
        "example": "BUY",
        "properties": {}
      },
      "isTaker": {
        "type": "boolean",
        "format": "true or false",
        "example": true,
        "properties": {}
      },
      "createdAtDatetime": {
        "type": "string",
        "format": "date-time",
        "example": "2025-05-20T01:01:01.000Z",
        "description": "ISO 8601 with millisecond as string",
        "properties": {}
      },
      "createdAtTimestamp": {
        "type": "string",
        "format": "string",
        "example": "1621490985000",
        "description": "unsigned 64 bit integer value which is the number of milliseconds since EPOCH expressed as string",
        "properties": {}
      }
    }
  }
}
```

### 404 - Resource Not Found

### 429 - Too Many Requests

### 500 - Internal Server Error
