# GET /v1/history/markets/{symbol}/trades

**Summary**: Get Historical Market Trades

## Description

Get Historical Market Trades by Market Symbol. Supports querying of up to 7 days
of data at a time.

- [supports pagination](#overview--pagination-support)

**Ratelimited:** `False`

- Only the last 90 days of data is available for querying

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
| tradeId                | query | string | No       | specific `tradeId` to search for, if any                       |

## Responses

### 200 - OK

**Content-Type**: application/json

```json
{
  "type": "array",
  "minItems": 0,
  "maxItems": 25,
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
