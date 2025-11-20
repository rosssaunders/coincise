# POST /v2/mmp-configuration

**Summary**: Setup Market Maker Protection (MMP)

## Description

MMP configurations are setup per underlying asset symbol for a specific trading
Account. While setting up MMP configurations you can specify
`windowTimeInSeconds`, `frozenTimeInSeconds`, `quantityLimit` and `deltaLimit`
and use it as best suited. Please reach out to your relationship manager to
understand how to enable MMP for your trading accounts.

- To get updates on the status of your set / reset MMP configs request for an
  underlying asset symbol over WS ,please subscribe to `mmpRequest` TOPIC within
  the [Private Data WebSocket](#overview--private-data-websocket-authenticated).
- To get updates about MMP triggered event over WS ,please subscribe to the
  `mmpTriggered` TOPIC within the
  [Private Data WebSocket](#overview--private-data-websocket-authenticated).

To update/amend your MMP configs ,please use the resetMMPCommandV1 to reset the
MMP configurations , followed by setting up a new MMP config via setMMPCommandV1
per underlying asset symbol.

Note: MMP is only applicable for Options [Orders created](#post-/v2/orders) with
the `isMMP` flag set to `true`.

**Operation ID**: set-mmp-config

**Tags**: market-maker-protection(MMP)

**Endpoint**: `POST /v2/mmp-configuration`

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
  "oneOf": [
    {
      "$ref": "#/components/schemas/SetMMPCommandV1"
    },
    {
      "$ref": "#/components/schemas/ResetMMPCommandV1"
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
      "$ref": "#/components/schemas/SetMMPCommandResponse"
    },
    {
      "$ref": "#/components/schemas/ResetMMPCommandResponse"
    }
  ]
}
```

### 400 - Bad Request

### 401 - Not Authenticated

### 403 - Access Forbidden

### 429 - Too Many Requests

### 500 - Internal Server Error
