# GET /v2/otc-trades

**Summary**: Get OTC Trades

## Description

Get the otc trade list based on specified filters.

- requires [bearer token](#overview--add-authenticated-request-header) in
  authorization header
- [supports pagination](#overview--pagination-support)
- supports filtering on `status`, `tradingAccountId`, `sharedMatchKey`,
  `clientOtcTradeId`, `createdAtDatetime`, `createdAtTimestamp`

**Operation ID**: get-otc-trades

**Tags**: OTC

**Endpoint**: `GET /v2/otc-trades`

**Authentication Required**: Yes

## Parameters

| Parameter                | In    | Type   | Required | Description                                                    |
| ------------------------ | ----- | ------ | -------- | -------------------------------------------------------------- |
|                          |       | string | No       |                                                                |
| status                   | query | string | No       | OTC trade status                                               |
| tradingAccountId         | query | string | Yes      |                                                                |
| sharedMatchKey           | query | string | No       |                                                                |
| clientOtcTradeId         | query | string | No       |                                                                |
| createdAtDatetime[ gte ] | query | string | No       | Start timestamp of window, ISO 8601 with millisecond as string |
| createdAtDatetime[ lte ] | query | string | No       | End timestamp of window, ISO 8601 with millisecond as string   |

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
    "$ref": "#/components/schemas/OtcTradeView"
  }
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

### 500 - Internal Server Error

**Content-Type**: application/json

**Schema**:

```json
{
  "$ref": "#/components/schemas/BadOtcTradeEntryResponse"
}
```
