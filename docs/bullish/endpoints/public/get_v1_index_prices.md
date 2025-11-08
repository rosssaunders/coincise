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

**Schema**:

```json
{
  "type": "array",
  "items": {
    "$ref": "#/components/schemas/IndexPrice"
  }
}
```

### 429 - Too Many Requests

### 500 - Internal Server Error
