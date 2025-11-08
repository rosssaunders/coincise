# GET /v1/time

**Summary**: Get Exchange Time

## Description

Get Current Exchange Time

**Operation ID**: market-data-get-current-exchange-time

**Tags**: time

**Endpoint**: `GET /v1/time`

**Authentication Required**: No

## Responses

### 200 - OK

**Content-Type**: application/json

**Schema**:

```json
{
  "$ref": "#/components/schemas/CurrentExchangeTimeResponse"
}
```

### 429 - Too Many Requests

### 500 - Internal Server Error
