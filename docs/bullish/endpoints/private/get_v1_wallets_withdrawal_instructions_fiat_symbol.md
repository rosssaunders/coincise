# GET /v1/wallets/withdrawal-instructions/fiat/{symbol}

**Summary**: Get Withdrawal Instructions for Fiat

## Description

Get withdrawal instructions added by the user, requires
[bearer token](#overview--add-authenticated-request-header) in authorization
header. Please note that before withdrawal destinations can be used for
withdrawing to, they must be whitelisted on the Bullish website.

**Ratelimited:** `True` - see [custody limits](#tag--custody)

**Operation ID**: custody-get-withdrawal-instructions-fiat

**Tags**: custody

**Endpoint**: `GET /v1/wallets/withdrawal-instructions/fiat/{symbol}`

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
    "$ref": "#/components/schemas/CustodyFiatWithdrawalInstructions"
  }
}
```

### 429 - Too Many Requests

### 500 - Internal Server Error
