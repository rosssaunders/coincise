# GET /v1/wallets/withdrawal-instructions/crypto/{symbol}

**Summary**: Get Withdrawal Instructions for Crypto

## Description

Get crypto withdrawal instructions, requires
[bearer token](#overview--add-authenticated-request-header) in authorization
header. Please note that all withdrawal addresses must be whitelisted via the
Bullish website before any digital asset withdrawals can be processed.

Please note that Custody endpoints utilize a non-multiplied asset format for
long decimal assets like SHIB and PEPE, ensuring consistency with real-world
asset representation. This differs from Trading endpoints, which use a
multiplied asset format, such as SHIB1M and PEPE1M. For more information, please
see
[help centre](https://bullishexchange.atlassian.net/wiki/spaces/BHC/pages/20807684/Understanding+Multiplied+Assets+PEPE1M+and+SHIB1M)

**Ratelimited:** `True` - see [custody limits](#tag--custody)

**Operation ID**: custody-get-withdrawal-instructions-crypto

**Tags**: custody

**Endpoint**: `GET /v1/wallets/withdrawal-instructions/crypto/{symbol}`

**Authentication Required**: Yes

## Parameters

| Parameter | In    | Type   | Required | Description |
| --------- | ----- | ------ | -------- | ----------- |
|           |       | string | No       |             |
| symbol    | path  | string | Yes      |             |
| signed    | query | string | No       |             |

## Responses

### 200 - OK

**Content-Type**: application/json

**Schema**:

```json
{
  "type": "array",
  "items": {
    "$ref": "#/components/schemas/CustodyCryptoWithdrawalInstructions"
  }
}
```

### 429 - Too Many Requests

### 500 - Internal Server Error
