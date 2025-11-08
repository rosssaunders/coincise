# POST /v2/command

**Summary**: Create Command

## Description

Submits a command to the trading engine. A successful response indicates that
the command entry was acknowledged but does not indicate that the command was
executed. This endpoint uses the [signing format](#overview--signing-format)
which does not require strict field ordering and addition of null fields in the
request body. Quantities and prices does not require strict precision. Eg. for
asset precision of 4 - `100`, `100.0`, `100.00`, `100.000` and `100.0000` are
all accepted.

Command schemas and examples are provided below. Supported commands:

- V3CancelOrder
- V1CancelAllOrders
- V1CancelAllOrdersByMarket
- V1DelayedCancelAllOrders
- V1UnsetDelayedCancelAllOrders
- V1AmendOrder
- V3TerminateAMMInstruction
- V2TransferAsset

Requires

- [bearer token](#overview--add-authenticated-request-header) in authorization
  header

**Ratelimited:** `True`. Higher tiers of rate limits available by providing the
`BX-RATELIMIT-TOKEN` request header.

**Operation ID**: command-entry

**Tags**: command entry, amm instructions, transfers

**Endpoint**: `POST /v2/command`

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
  "oneOf": [
    {
      "$ref": "#/components/schemas/CancelOrderCommandV3"
    },
    {
      "$ref": "#/components/schemas/CancelAllOrdersCommand"
    },
    {
      "$ref": "#/components/schemas/CancelAllOrdersByMarketCommand"
    },
    {
      "$ref": "#/components/schemas/DelayedCancelAllOrdersCommand"
    },
    {
      "$ref": "#/components/schemas/UnsetDelayedCancelAllOrdersCommand"
    },
    {
      "$ref": "#/components/schemas/TerminateAMMInstructionCommandV3"
    },
    {
      "$ref": "#/components/schemas/TransferAssetCommandV2"
    },
    {
      "$ref": "#/components/schemas/AmendOrderCommandV1"
    }
  ]
}
```

## Responses

### 200 - Status OK. This means a command was successfully acknowledged.

**Content-Type**: application/json

**Schema**:

```json
{
  "oneOf": [
    {
      "$ref": "#/components/schemas/CancelOrderCommandResponseV3"
    },
    {
      "$ref": "#/components/schemas/CancelAllOrdersByMarketResponse"
    },
    {
      "$ref": "#/components/schemas/TerminateAMMInstructionCommandResponseV3"
    }
  ]
}
```

### 400 - Bad Request

For example, sending a request with the `BX-SIGNATURE` header missing will
result in the following response:

**Content-Type**: application/json

**Schema**:

```json
{
  "$ref": "#/components/schemas/BadOrderEntryResponse"
}
```

### 401 - Not Authenticated

### 403 - Access Forbidden

### 429 - Too Many Requests

### 500 - Internal Server Error
