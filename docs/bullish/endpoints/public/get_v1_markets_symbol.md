# GET /v1/markets/{symbol}

**Summary**: Get Market by Symbol

## Description

Get Market by Symbol.

**Operation ID**: market-data-get-market

**Tags**: market-data

**Endpoint**: `GET /v1/markets/{symbol}`

**Authentication Required**: No

## Responses

### 200 - OK

**Content-Type**: application/json

**Schema**:

```json
{
  "$ref": "#/components/schemas/Market"
}
```

### 404 - Not Found

### 429 - Too Many Requests

### 500 - Internal Server Error
