# GET /v1/history/markets/{symbol}

**Summary**: Get Historical Market by Symbol

## Description

Get Historical Market by Symbol. This endpoint will return specified market even
if it is expired. Only applicable for this is applicable only for `DATED_FUTURE`
and `OPTION` markets.

**Operation ID**: market-data-get-historical-market

**Tags**: market-data

**Endpoint**: `GET /v1/history/markets/{symbol}`

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
