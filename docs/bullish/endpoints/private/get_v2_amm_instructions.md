# GET /v2/amm-instructions

**Summary**: Get AMM Instructions

## Description

Gets a list of AMM instructions based on applied filters.

- requires [bearer token](#overview--add-authenticated-request-header) in
  authorization header
- [supports pagination](#overview--pagination-support)

**Ratelimited:** `True`

**Operation ID**: trade-get-amm-instructions

**Tags**: amm instructions

**Endpoint**: `GET /v2/amm-instructions`

**Authentication Required**: Yes

## Parameters

| Parameter        | In    | Type   | Required | Description               |
| ---------------- | ----- | ------ | -------- | ------------------------- |
|                  |       | string | No       |                           |
| symbol           | query | string | No       |                           |
| status           | query | string | No       | order status              |
| tradingAccountId | query | string | Yes      | Id of the trading account |

## Responses

### 200 - OK

**Content-Type**: application/json

**Schema**:

```json
{
  "type": "array",
  "minItems": 0,
  "maxItems": 10,
  "items": {
    "$ref": "#/components/schemas/AMMInstruction"
  }
}
```

### 401 - Not Authenticated

### 403 - Access Forbidden

### 429 - Too Many Requests

### 500 - Internal Server Error
