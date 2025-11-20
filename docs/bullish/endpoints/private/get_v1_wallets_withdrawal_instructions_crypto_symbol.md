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

| Parameter | In   | Type   | Required | Description |
| --------- | ---- | ------ | -------- | ----------- |
|           |      | string | No       |             |
| symbol    | path | string | Yes      |             |

## Responses

### 200 - OK

**Content-Type**: application/json

```json
{
  "type": "array",
  "items": {
    "type": "object",
    "required": [
      "network",
      "symbol",
      "address",
      "fee",
      "label",
      "destinationId"
    ],
    "properties": {
      "network": {
        "type": "string",
        "example": "ETH",
        "description": "the network of the native coin or token, e.g. BTC, ETH, SOL",
        "properties": {}
      },
      "symbol": {
        "type": "string",
        "example": "USDC",
        "description": "symbol representing coin or token, e.g. USDC, BTC, ETH, SHIB",
        "properties": {}
      },
      "address": {
        "type": "string",
        "example": "0xb0a64d976972d87b0783eeb1ff88306cd1891f02",
        "description": "an address on the given network",
        "properties": {}
      },
      "fee": {
        "type": "string",
        "example": "3.00",
        "description": "withdrawal fee charged in units of symbol, not in smaller denominations (e.g. BTC not Satoshi, ETH not Wei)",
        "properties": {}
      },
      "memo": {
        "type": "string",
        "example": "MZAXEMRXA",
        "description": "memo or destination tag that will be used as a reference on transaction",
        "properties": {}
      },
      "label": {
        "type": "string",
        "example": "Our cold wallet",
        "description": "descriptive label of destination provided by user",
        "properties": {}
      },
      "destinationId": {
        "type": "string",
        "example": "1560ec0b406c0d909bb9f5f827dd6aa14a1f638884f33a2a3134878102e78038",
        "description": "destination id provided by bullish that uniquely identifies a whitelisted address or account",
        "properties": {}
      }
    }
  }
}
```

### 429 - Too Many Requests

### 500 - Internal Server Error
