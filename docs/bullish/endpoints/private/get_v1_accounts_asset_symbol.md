# GET /v1/accounts/asset/{symbol}

**Summary**: Get Asset Account by Symbol

## Description

Gets the asset account by symbol, requires
[bearer token](#overview--add-authenticated-request-header) in authorization
header

**Ratelimited:** `True`

**Operation ID**: user-get-asset-account-by-symbol

**Tags**: accounts

**Endpoint**: `GET /v1/accounts/asset/{symbol}`

**Authentication Required**: Yes

## Parameters

| Parameter        | In    | Type   | Required | Description               |
| ---------------- | ----- | ------ | -------- | ------------------------- |
|                  |       | string | No       |                           |
| symbol           | path  | string | Yes      |                           |
| tradingAccountId | query | string | Yes      | Id of the trading account |

## Responses

### 200 - OK

**Content-Type**: application/json

**Schema**:

```json
{
  "$ref": "#/components/schemas/AssetAccount"
}
```

### 401 - Not Authenticated

### 403 - Access Forbidden

### 404 - Resource Not Found

### 429 - Too Many Requests

### 500 - Internal Server Error
