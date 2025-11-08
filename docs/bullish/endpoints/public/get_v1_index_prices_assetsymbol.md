# GET /v1/index-prices/{assetSymbol}

**Summary**: Get Index Price by Asset Symbol

## Description

Retrieves the index price of a specified asset

**Operation ID**: get-index-price-by-symbol

**Tags**: index-data

**Endpoint**: `GET /v1/index-prices/{assetSymbol}`

**Authentication Required**: No

## Responses

### 200 - OK

**Content-Type**: application/json

**Schema**:

```json
{
  "$ref": "#/components/schemas/IndexPrice"
}
```

### 404 - Not found

### 429 - Too Many Requests

### 500 - Internal Server Error
