# GET /v1/accounts/trading-accounts

**Summary**: Get all trading Accounts details

## Description

Gets details for all trading accounts accessible by the API key used in the
request. It requires [bearer token](#overview--add-authenticated-request-header)
in authorization header. The trading account's id will be used in all other REST
API

**Ratelimited:** `True`

**Operation ID**: user-get-trading-accounts

**Tags**: trading-accounts

**Endpoint**: `GET /v1/accounts/trading-accounts`

**Authentication Required**: Yes

## Parameters

| Parameter | In  | Type   | Required | Description |
| --------- | --- | ------ | -------- | ----------- |
|           |     | string | No       |             |

## Responses

### 200 - OK

**Content-Type**: application/json

**Schema**:

```json
{
  "type": "array",
  "minItems": 0,
  "maxItems": 25,
  "items": {
    "$ref": "#/components/schemas/TradingAccountResponse"
  }
}
```

### 401 - Not Authenticated

### 403 - Access Forbidden

### 429 - Too Many Requests

### 500 - Internal Server Error
