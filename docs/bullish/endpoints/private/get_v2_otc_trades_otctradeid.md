# GET /v2/otc-trades/{otcTradeId}

**Summary**: Get OTC Trade by ID

## Description

Retrieve a specific otc trade using its unique identifier.

**Operation ID**: get-otc-trade--by-id

**Tags**: OTC

**Endpoint**: `GET /v2/otc-trades/{otcTradeId}`

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
  "$ref": "#/components/schemas/OtcTradeView"
}
```

### 400 - For example, sending a request with an invalid trading account

**Content-Type**: application/json

**Schema**:

```json
{
  "$ref": "#/components/schemas/BadOtcTradeEntryResponse"
}
```

### 401 - Not Authenticated

**Content-Type**: application/json

**Schema**:

```json
{
  "$ref": "#/components/schemas/BadOtcTradeEntryResponse"
}
```

### 403 - Access Forbidden

**Content-Type**: application/json

**Schema**:

```json
{
  "$ref": "#/components/schemas/BadOtcTradeEntryResponse"
}
```

### 404 - The given otcTradeId does not exist

**Content-Type**: application/json

**Schema**:

```json
{
  "$ref": "#/components/schemas/BadOtcTradeEntryResponse"
}
```

### 500 - Internal Server Error

**Content-Type**: application/json

**Schema**:

```json
{
  "$ref": "#/components/schemas/BadOtcTradeEntryResponse"
}
```
