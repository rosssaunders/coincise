# GET /v1/trades/{tradeId}

**Summary**: Get Trade by ID

## Description

Gets a trade by ID, requires
[bearer token](#overview--add-authenticated-request-header) in authorization
header

**Ratelimited:** `True`

**Operation ID**: trade-get-trade-by-id

**Tags**: trades

**Endpoint**: `GET /v1/trades/{tradeId}`

**Authentication Required**: Yes

## Parameters

| Parameter        | In    | Type   | Required | Description               |
| ---------------- | ----- | ------ | -------- | ------------------------- |
|                  |       | string | No       |                           |
| tradeId          | path  | number | Yes      | trade ID                  |
| tradingAccountId | query | string | Yes      | Id of the trading account |

## Responses

### 200 - OK

**Content-Type**: application/json

**Schema**:

```json
{
  "$ref": "#/components/schemas/Trade"
}
```

### 401 - Not Authenticated

### 403 - Access Forbidden

### 404 - Resource Not Found

### 429 - Too Many Requests

### 500 - Internal Server Error
