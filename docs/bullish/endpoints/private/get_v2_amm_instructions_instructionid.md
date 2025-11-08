# GET /v2/amm-instructions/{instructionId}

**Summary**: Get AMM Instruction by ID

## Description

Gets a specific AMM instruction based on the `instructionId`, requires
[bearer token](#overview--add-authenticated-request-header) in authorization
header

**Ratelimited:** `True`

**Operation ID**: trade-get-amm-instruction-by-id-v2

**Tags**: amm instructions

**Endpoint**: `GET /v2/amm-instructions/{instructionId}`

**Authentication Required**: Yes

## Parameters

| Parameter | In  | Type   | Required | Description |
| --------- | --- | ------ | -------- | ----------- |
|           |     | string | No       |             |

## Responses

### 200 - OK

**Content-Type**: application/json

**Schema**:

```json
{
  "$ref": "#/components/schemas/AMMInstruction"
}
```

### 401 - Not Authenticated

### 403 - Access Forbidden

### 429 - Too Many Requests

### 500 - Internal Server Error
