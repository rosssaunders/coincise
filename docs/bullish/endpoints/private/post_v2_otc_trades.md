# POST /v2/otc-trades

**Summary**: Create OTC Trade

## Description

Creates an OTC trade, requires
[bearer token](#overview--add-authenticated-request-header) in authorization
header.

This endpoint uses the [signing format](#overview--signing-format) which does
not require strict field ordering and addition of null fields in the request
body. Prices do not require strict precision. Eg. for asset precision of 4 -
`100`, `100.0`, `100.00`, `100.000` and `100.0000` are all accepted.

**Operation ID**: create-otc-trade

**Tags**: OTC

**Endpoint**: `POST /v2/otc-trades`

**Authentication Required**: Yes

## Parameters

| Parameter | In  | Type   | Required | Description |
| --------- | --- | ------ | -------- | ----------- |
|           |     | string | No       |             |
|           |     | string | No       |             |
|           |     | string | No       |             |
|           |     | string | No       |             |
|           |     | string | No       |             |

## Request Body

**Required**: Yes

### Content-Type: application/json

**Schema**:

```json
{
  "$ref": "#/components/schemas/CreateOtcTradeCommand"
}
```

## Responses

### 200 - Status OK. The create OTC trade command was successfully acknowledged. To check the current status of the

OTC trade, query [Get Trade by ID](#get-/v2/otc-trades/-otcTradeId-) using
`otcTradeId` or `clientOtcTradeId` received in the response payload.

**Content-Type**: application/json

**Schema**:

```json
{
  "$ref": "#/components/schemas/CreateOtcTradeResponse"
}
```

### 400 - Bad Request

For example, sending a request with the `BX-SIGNATURE` header missing will
result in the following response:

**Content-Type**: application/json

**Schema**:

```json
{
  "$ref": "#/components/schemas/BadOtcTradeEntryResponse"
}
```

### 401 - Unauthorized. Either API details are missing or invalid

**Content-Type**: application/json

**Schema**:

```json
{
  "$ref": "#/components/schemas/BadOtcTradeEntryResponse"
}
```

### 403 - Forbidden- You do not have access to the requested resource

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
