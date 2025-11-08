# GET /v1/assets

**Summary**: Get Assets

## Description

Get supported assets. Clients can ignore [test assets](#overview--test-assets).

**Operation ID**: asset-data-get-assets

**Tags**: asset-data

**Endpoint**: `GET /v1/assets`

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
    "$ref": "#/components/schemas/Asset"
  }
}
```

### 429 - Too Many Requests

### 500 - Internal Server Error
