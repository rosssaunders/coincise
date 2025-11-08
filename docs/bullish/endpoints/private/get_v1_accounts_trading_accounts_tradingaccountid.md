# GET /v1/accounts/trading-accounts/{tradingAccountId}

**Summary**: Get trading account details by trading account id

## Description

Gets details for specific trading account by `tradingAccountId` and API key used
in the request. It requires
[bearer token](#overview--add-authenticated-request-header) in authorization
header.

**Ratelimited:** `True`

**Operation ID**: user-get-trading-account-by-id

**Tags**: trading-accounts

**Endpoint**: `GET /v1/accounts/trading-accounts/{tradingAccountId}`

**Authentication Required**: Yes

## Parameters

| Parameter        | In   | Type   | Required | Description               |
| ---------------- | ---- | ------ | -------- | ------------------------- |
|                  |      | string | No       |                           |
| tradingAccountId | path | string | Yes      | Id of the trading account |

## Responses

### 200 - OK

**Content-Type**: application/json

**Schema**:

```json
{
  "$ref": "#/components/schemas/TradingAccountResponse"
}
```

### 400 - Bad Request Parameter

### 401 - Not Authenticated

### 403 - Access Forbidden

### 404 - Resource Not Found

### 429 - Too Many Requests

### 500 - Internal Server Error
