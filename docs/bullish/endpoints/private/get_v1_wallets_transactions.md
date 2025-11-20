# GET /v1/wallets/transactions

**Summary**: Get Custody Transaction History

## Description

Get custody transaction history, requires
[bearer token](#overview--add-authenticated-request-header) in authorization
header

Please note that Custody endpoints utilize a non-multiplied asset format for
long decimal assets like SHIB and PEPE, ensuring consistency with real-world
asset representation. This differs from Trading endpoints, which use a
multiplied asset format, such as SHIB1M and PEPE1M. For more information, please
see
[help centre](https://bullishexchange.atlassian.net/wiki/spaces/BHC/pages/20807684/Understanding+Multiplied+Assets+PEPE1M+and+SHIB1M)

- [supports pagination](#overview--pagination-support)

**Ratelimited:** `True` - see [custody limits](#tag--custody)

**Operation ID**: custody-get-history

**Tags**: custody

**Endpoint**: `GET /v1/wallets/transactions`

**Authentication Required**: Yes

## Parameters

| Parameter              | In    | Type   | Required | Description                                                    |
| ---------------------- | ----- | ------ | -------- | -------------------------------------------------------------- |
|                        |       | string | No       |                                                                |
| createdAtDatetime[gte] | query | string | No       | start timestamp of period, ISO 8601 with millisecond as string |
| createdAtDatetime[lte] | query | string | No       | end timestamp of period, ISO 8601 with millisecond as string   |

## Responses

### 200 - OK

**Content-Type**: application/json

```json
{
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "custodyTransactionId": {
        "type": "string",
        "example": "DB:9e6304a08c9cc2a33e6bc6429a088eae2a6b940c8e312aede3a3780257b9b979",
        "description": "unique identifier for tracking a deposit or withdrawal",
        "properties": {}
      },
      "direction": {
        "type": "string",
        "example": "DEPOSIT",
        "description": "direction of transaction from API user's perspective, 'DEPOSIT' or 'WITHDRAWAL'",
        "properties": {}
      },
      "quantity": {
        "type": "string",
        "description": "total quantity of symbol to withdraw including fee in units of symbol, not in smaller denominations (e.g. BTC not Satoshi, ETH not Wei) - quantity received will have fee subtracted.",
        "example": "100000.00",
        "properties": {}
      },
      "symbol": {
        "type": "string",
        "example": "USDC",
        "description": "symbol representing coin or token, e.g. USDC, BTC, ETH, SHIB",
        "properties": {}
      },
      "network": {
        "type": "string",
        "example": "ETH",
        "description": "the network of the native coin or token, e.g. BTC, ETH, SOL",
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
        "example": "925891241",
        "description": "memo or destination tag used during deposit to help identify account to credit funds to",
        "properties": {}
      },
      "createdAtDateTime": {
        "type": "string",
        "example": "2022-09-16T07:56:15.000Z",
        "description": "time of initial transaction",
        "properties": {}
      },
      "status": {
        "type": "string",
        "example": "COMPLETE",
        "description": "one of 'PENDING', 'COMPLETE', 'CANCELLED', 'FAILED'",
        "properties": {}
      },
      "transactionDetails": {
        "type": "object",
        "properties": {
          "address": {
            "type": "string",
            "description": "crypto network address",
            "example": "0xb0a64d976972d87b0783eeb1ff88306cd1891f02"
          },
          "blockchainTxId": {
            "type": "string",
            "description": "transaction id on chain",
            "example": "0xec557f2c7278d2dae2d98a27b9bd43f386789a4209090cbbd11595f1bed4a4c2"
          },
          "swiftUetr": {
            "type": "string",
            "description": "unique end-to-end-transaction reference for swift transactions",
            "example": "b55aa5cd-baa2-4122-8c17-ae9b856ae36a"
          }
        }
      }
    }
  }
}
```

### 429 - Too Many Requests

### 500 - Internal Server Error
