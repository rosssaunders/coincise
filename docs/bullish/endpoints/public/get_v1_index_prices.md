# GET /v1/index-prices

**Summary**: Get Index Prices

## Description

Retrieves the index price of all supported assets

**Operation ID**: get-index-prices

**Tags**: index-data

**Endpoint**: `GET /v1/index-prices`

**Authentication Required**: No

## Responses

### 200 - OK

**Content-Type**: application/json

```json
{
  "type": "array",
  "items": {
    "type": "object",
    "required": [
      "assetSymbol",
      "price",
      "updatedAtDatetime",
      "updatedAtTimestamp"
    ],
    "properties": {
      "assetSymbol": {
        "type": "string",
        "description": "asset symbol as denoted in the world",
        "example": "BTC",
        "properties": {}
      },
      "price": {
        "description": "Asset price in USD",
        "example": "66100.0000",
        "type": "string"
      },
      "updatedAtDatetime": {
        "type": "string",
        "format": "date-time",
        "example": "2025-05-20T01:01:01.000Z",
        "description": "ISO 8601 with millisecond as string",
        "properties": {}
      },
      "updatedAtTimestamp": {
        "type": "string",
        "format": "int64",
        "example": "1621490985000",
        "description": "number of milliseconds since EPOCH as string",
        "properties": {}
      }
    }
  }
}
```

### 429 - Too Many Requests

### 500 - Internal Server Error
