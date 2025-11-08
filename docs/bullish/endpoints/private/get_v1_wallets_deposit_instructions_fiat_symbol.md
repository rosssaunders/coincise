# GET /v1/wallets/deposit-instructions/fiat/{symbol}

**Summary**: Get Deposit Instructions for Fiat

## Description

Get deposit instructions, requires
[bearer token](#overview--add-authenticated-request-header) in authorization
header

**Ratelimited:** `True` - see [custody limits](#tag--custody)

**Operation ID**: custody-get-deposit-instructions-fiat

**Tags**: custody

**Endpoint**: `GET /v1/wallets/deposit-instructions/fiat/{symbol}`

**Authentication Required**: Yes

## Parameters

| Parameter | In   | Type   | Required | Description |
| --------- | ---- | ------ | -------- | ----------- |
|           |      | string | No       |             |
| symbol    | path | string | Yes      |             |

## Responses

### 200 - OK

**Content-Type**: application/json

**Schema**:

```json
{
  "type": "array",
  "items": {
    "$ref": "#/components/schemas/CustodyFiatDepositInstructions"
  }
}
```

### 429 - Too Many Requests

### 500 - Internal Server Error
