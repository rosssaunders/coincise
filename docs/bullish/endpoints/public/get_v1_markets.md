# GET /v1/markets

**Summary**: Get Markets

## Description

Get Markets. Clients can ignore [test markets](#overview--test-markets).

**Operation ID**: market-data-get-markets

**Tags**: market-data

**Endpoint**: `GET /v1/markets`

**Authentication Required**: No

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
    "$ref": "#/components/schemas/Market"
  }
}
```

### 404 - Not Found

### 429 - Too Many Requests

### 500 - Internal Server Error
