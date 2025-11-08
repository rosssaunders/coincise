# GET /v1/assets/{symbol}

**Summary**: Get Asset by Symbol

## Description

Get Asset by Symbol

**Operation ID**: asset-data-get-asset

**Tags**: asset-data

**Endpoint**: `GET /v1/assets/{symbol}`

**Authentication Required**: No

## Parameters

| Parameter | In   | Type   | Required | Description |
| --------- | ---- | ------ | -------- | ----------- |
| symbol    | path | string | Yes      |             |

## Responses

### 200 - OK

**Content-Type**: application/json

**Schema**:

```json
{
  "$ref": "#/components/schemas/Asset"
}
```

### 429 - Too Many Requests

### 500 - Internal Server Error
