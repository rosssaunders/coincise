# POST /v2/amm-instructions

**Summary**: Create AMM Instruction

## Description

Creates an AMM instruction, requires
[bearer token](#overview--add-authenticated-request-header) in authorization
header.

This endpoint uses the [signing format](#overview--signing-format) which does
not require strict field ordering in the request body. Quantities and prices
does not require strict precision. Eg. for asset precision of 4 - `100`,
`100.0`, `100.00`, `100.000` and `100.0000` are all accepted.

**Ratelimited:** `True`

**Operation ID**: trade-create-amm-instruction

**Tags**: amm instructions

**Endpoint**: `POST /v2/amm-instructions`

**Authentication Required**: Yes

## Parameters

| Parameter | In  | Type   | Required | Description |
| --------- | --- | ------ | -------- | ----------- |
|           |     | string | No       |             |
|           |     | string | No       |             |
|           |     | string | No       |             |
|           |     | string | No       |             |

## Request Body

new AMM instruction

**Required**: Yes

### Content-Type: application/json

**Schema**:

```json
{
  "$ref": "#/components/schemas/CreateAMMInstructionCommandV3"
}
```

## Responses

### 200 - Status OK. This means a create AMM instruction command was successfully acknowledged. It does not necessarily mean the instruction was created. To check the current status, query [Get AMM Instruction by ID](#get-/trading-api/v2/amm-instructions/-instructionid-) using the `instructionId` received in the response payload.

**Content-Type**: application/json

**Schema**:

```json
{
  "$ref": "#/components/schemas/CreateAMMInstructionCommandResponseV3"
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
