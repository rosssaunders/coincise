# GET /v1/wallets/deposit-instructions/crypto/{symbol}

**Summary**: Get Deposit Instructions for Crypto

## Description

Get deposit instructions, requires
[bearer token](#overview--add-authenticated-request-header) in authorization
header

Please note that Custody endpoints utilize a non-multiplied asset format for
long decimal assets like SHIB and PEPE, ensuring consistency with real-world
asset representation. This differs from Trading endpoints, which use a
multiplied asset format, such as SHIB1M and PEPE1M. For more information, please
see
[help centre](https://bullishexchange.atlassian.net/wiki/spaces/BHC/pages/20807684/Understanding+Multiplied+Assets+PEPE1M+and+SHIB1M)

**Ratelimited:** `True` - see [custody limits](#tag--custody)

**Operation ID**: custody-get-deposit-instructions-crypto

**Tags**: custody

**Endpoint**: `GET /v1/wallets/deposit-instructions/crypto/{symbol}`

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
    "required": ["network", "symbol", "address"],
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
      "memo": {
        "type": "string",
        "example": "925891241",
        "description": "memo or destination tag used during deposit to help identify account to credit funds to",
        "properties": {}
      },
      "address": {
        "type": "string",
        "example": "0xb0a64d976972d87b0783eeb1ff88306cd1891f02",
        "description": "an address on the given network",
        "properties": {}
      }
    },
    "example": {
      "network": "ETH",
      "symbol": "USDC",
      "address": "0xb0a64d976972d87b0783eeb1ff88306cd1891f02"
    }
  }
}
```

### 429 - Too Many Requests

### 500 - Internal Server Error
