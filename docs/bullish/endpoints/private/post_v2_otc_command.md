# POST /v2/otc-command

**Summary**: OTC Trade Cancellation Command

## Description

Submits a command to the trading engine. A successful response indicates that
the command entry was acknowledged but does not indicate that the command was
executed. This endpoint uses the [signing format](#overview--signing-format)
which does not require strict field ordering and addition of null fields in the
request body.

Command schemas and examples are provided below. Supported commands:

- V1CancelOtcTrade
- V1CancelAllOtcTrades

Requires

- [bearer token](#overview--add-authenticated-request-header) in authorization
  header

**Operation ID**: otc-command

**Tags**: OTC

**Endpoint**: `POST /v2/otc-command`

**Authentication Required**: Yes

## Parameters

| Parameter | In  | Type   | Required | Description |
| --------- | --- | ------ | -------- | ----------- |
|           |     | string | No       |             |
|           |     | string | No       |             |
|           |     | string | No       |             |
|           |     | string | No       |             |

## Request Body

**Required**: Yes

### Content-Type: application/json

```json
{
  "discriminator": {
    "propertyName": "commandType",
    "mapping": {
      "V1CancelOtcTrade": "#/components/schemas/CancelOtcTradeCommand",
      "V1CancelAllOtcTrades": "#/components/schemas/CancelAllOtcTradesCommand"
    }
  },
  "oneOf": [
    {
      "$ref": "#/components/schemas/CancelOtcTradeCommand"
    },
    {
      "$ref": "#/components/schemas/CancelAllOtcTradesCommand"
    }
  ]
}
```

## Responses

### 200 - Status OK. This means a command was successfully acknowledged.

**Content-Type**: application/json

```json
{
  "oneOf": [
    {
      "$ref": "#/components/schemas/CancelOtcTradeResponse"
    },
    {
      "$ref": "#/components/schemas/CancelAllOtcTradesResponse"
    }
  ]
}
```

### 400 - Bad Request

For example, sending a request with the `BX-SIGNATURE` header missing will
result in the following response:

**Content-Type**: application/json

| Field         | Type    | Required | Description            |
| ------------- | ------- | -------- | ---------------------- |
| message       | string  | Yes      | message                |
| errorCode     | integer | Yes      | unique error code      |
| errorCodeName | string  | Yes      | unique error code name |

### 401 - Unauthorized. Either API details are missing or invalid

**Content-Type**: application/json

| Field         | Type    | Required | Description            |
| ------------- | ------- | -------- | ---------------------- |
| message       | string  | Yes      | message                |
| errorCode     | integer | Yes      | unique error code      |
| errorCodeName | string  | Yes      | unique error code name |

### 403 - Forbidden- You do not have access to the requested resource

**Content-Type**: application/json

| Field         | Type    | Required | Description            |
| ------------- | ------- | -------- | ---------------------- |
| message       | string  | Yes      | message                |
| errorCode     | integer | Yes      | unique error code      |
| errorCodeName | string  | Yes      | unique error code name |

### 500 - Internal Server Error

**Content-Type**: application/json

| Field         | Type    | Required | Description            |
| ------------- | ------- | -------- | ---------------------- |
| message       | string  | Yes      | message                |
| errorCode     | integer | Yes      | unique error code      |
| errorCodeName | string  | Yes      | unique error code name |
