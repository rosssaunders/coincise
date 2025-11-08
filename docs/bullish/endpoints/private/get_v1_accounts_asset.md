# GET /v1/accounts/asset

**Summary**: Get Asset Accounts

## Description

Gets the asset accounts, requires
[bearer token](#overview--add-authenticated-request-header) in authorization
header

**Ratelimited:** `True`

**Operation ID**: user-get-asset-accounts

**Tags**: accounts

**Endpoint**: `GET /v1/accounts/asset`

**Authentication Required**: Yes

## Parameters

| Parameter        | In    | Type   | Required | Description               |
| ---------------- | ----- | ------ | -------- | ------------------------- |
|                  |       | string | No       |                           |
| tradingAccountId | query | string | Yes      | Id of the trading account |

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
    "$ref": "#/components/schemas/AssetAccount"
  }
}
```

### 401 - Not Authenticated

### 403 - Access Forbidden

### 429 - Too Many Requests

### 500 - Internal Server Error
