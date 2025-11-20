# GET /v1/accounts/asset

**Summary**: Get Asset Accounts

## Description

Gets the asset accounts, requires
[bearer token](#overview--add-authenticated-request-header) in authorization
header

**Ratelimited:** `True`

**Operation ID**: user-get-asset-accounts

**Tags**: accounts

**Endpoint**: `GET /v1/accounts/asset`

**Authentication Required**: Yes

## Parameters

| Parameter        | In    | Type   | Required | Description               |
| ---------------- | ----- | ------ | -------- | ------------------------- |
|                  |       | string | No       |                           |
| tradingAccountId | query | string | Yes      | Id of the trading account |

## Responses

### 200 - OK

**Content-Type**: application/json

```json
{
  "type": "array",
  "minItems": 0,
  "maxItems": 10,
  "items": {
    "type": "object",
    "required": [
      "tradingAccountId",
      "assetId",
      "assetSymbol",
      "availableQuantity",
      "borrowedQuantity",
      "lockedQuantity",
      "loanedQuantity",
      "updatedAtDatetime",
      "updatedAtTimestamp"
    ],
    "properties": {
      "tradingAccountId": {
        "description": "unique trading account ID",
        "type": "string",
        "example": "111000000000001",
        "properties": {}
      },
      "assetId": {
        "type": "string",
        "description": "unique asset ID",
        "example": "1",
        "properties": {}
      },
      "assetSymbol": {
        "type": "string",
        "description": "asset symbol as denoted in the world",
        "example": "BTC",
        "properties": {}
      },
      "availableQuantity": {
        "description": "see [asset value](#overview--price-and-quantity-precision) format",
        "type": "string",
        "example": "1.00000000",
        "properties": {}
      },
      "borrowedQuantity": {
        "description": "see [asset value](#overview--price-and-quantity-precision) format",
        "type": "string",
        "example": "1.00000000",
        "properties": {}
      },
      "lockedQuantity": {
        "description": "see [asset value](#overview--price-and-quantity-precision) format",
        "type": "string",
        "example": "1.00000000",
        "properties": {}
      },
      "loanedQuantity": {
        "description": "see [asset value](#overview--price-and-quantity-precision) format",
        "type": "string",
        "example": "1.00000000",
        "properties": {}
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
        "format": "string",
        "example": "1621490985000",
        "description": "unsigned 64 bit integer value which is the number of milliseconds since EPOCH expressed as string",
        "properties": {}
      }
    }
  }
}
```

### 401 - Not Authenticated

### 403 - Access Forbidden

### 429 - Too Many Requests

### 500 - Internal Server Error
