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

```json
{
  "type": "array",
  "minItems": 0,
  "maxItems": 10,
  "items": {
    "type": "object",
    "required": [
      "apy",
      "baseCurrentQuantity",
      "baseFee",
      "baseInvestQuantity",
      "basePrice",
      "baseWithdrawQuantity",
      "createdAtDateTime",
      "createdAtTimestamp",
      "currentValue",
      "dislocationEnabled",
      "feeTierId",
      "impermanentLoss",
      "initialBasePrice",
      "initialQuotePrice",
      "initialValue",
      "liquidityId",
      "instructionId",
      "lowerBound",
      "price",
      "quoteFee",
      "quoteInvestQuantity",
      "quotePrice",
      "quoteWithdrawQuantity",
      "requestId",
      "staticSpreadFee",
      "status",
      "statusReason",
      "statusReasonCode",
      "symbol",
      "updatedAtDateTime",
      "updatedAtTimestamp",
      "upperBound",
      "yieldEarn"
    ],
    "properties": {
      "liquidityId": {
        "type": "string",
        "example": "297735387747975680",
        "properties": {}
      },
      "instructionId": {
        "type": "string",
        "example": "297735387747975680",
        "properties": {}
      },
      "symbol": {
        "type": "string",
        "description": "market symbol. Eg `BTCUSDC` for SPOT and `BTC-USDC-PERP` for PERPETUAL market",
        "example": "BTCUSDC",
        "properties": {}
      },
      "baseFee": {
        "description": "see [asset value](#overview--price-and-quantity-precision) format",
        "type": "string",
        "example": "1.00000000",
        "properties": {}
      },
      "quoteFee": {
        "description": "see [asset value](#overview--price-and-quantity-precision) format",
        "type": "string",
        "example": "1.00000000",
        "properties": {}
      },
      "status": {
        "type": "string",
        "description": "order status can have the following string values `\"OPEN\"`, `\"CLOSED\"`, `\"CANCELLED\"`, `\"REJECTED\"`",
        "example": "OPEN",
        "properties": {}
      },
      "statusReason": {
        "description": "status reason, describes why the order is in a specific state",
        "type": "string",
        "example": "Ok"
      },
      "statusReasonCode": {
        "description": "status reason code, see [details](#overview--error--rejection-codes)",
        "type": "integer",
        "example": 1001
      },
      "createdAtDatetime": {
        "type": "string",
        "format": "date-time",
        "example": "2025-05-20T01:01:01.000Z",
        "description": "ISO 8601 with millisecond as string",
        "properties": {}
      },
      "createdAtTimestamp": {
        "type": "string",
        "format": "string",
        "example": "1621490985000",
        "description": "unsigned 64 bit integer value which is the number of milliseconds since EPOCH expressed as string",
        "properties": {}
      },
      "24HrApy": {
        "type": "string",
        "description": "APY of the last 24 Hours, only for AMM instructions with `OPEN` status",
        "example": "2.3319"
      },
      "24HrYieldEarn": {
        "type": "string",
        "description": "amount of money earned in USD from the last 24 Hours, only for AMM instructions with `OPEN` status",
        "example": "0.00"
      },
      "apy": {
        "type": "string",
        "description": "yield generated from the time AMM instruction was created, in annualised percentage",
        "example": "0.0000"
      },
      "baseCurrentQuantity": {
        "type": "string",
        "description": "amount of base asset this AMM instruction currently holds, only for AMM instruction with `OPEN` status",
        "example": "0.00000000"
      },
      "baseInvestQuantity": {
        "type": "string",
        "description": "initial base investment",
        "example": "0.00000008"
      },
      "basePrice": {
        "type": "string",
        "description": "current price of base asset",
        "example": "345.6700"
      },
      "baseWithdrawQuantity": {
        "type": "string",
        "description": "amount of base asset returned when AMM instruction is terminated",
        "example": "0.00000010"
      },
      "currentValue": {
        "type": "string",
        "description": "value of assets (base and quote) in USD amount that this AMM instruction currently holds",
        "example": "0.0000"
      },
      "dislocationEnabled": {
        "description": "dislocation enabled/disabled",
        "type": "boolean",
        "example": false
      },
      "feeTierId": {
        "type": "string",
        "description": "unique fee tier ID, see [Get Market By Symbol](#get-/v1/markets/-symbol-)",
        "example": "1",
        "properties": {}
      },
      "finalValue": {
        "type": "string",
        "description": "value of assets (base and quote) in USD amount when AMM instruction was terminated, only for AMM instruction with `CLOSED` status",
        "example": "0.0001"
      },
      "impermanentLoss": {
        "type": "string",
        "description": "impermanent loss",
        "example": "0.0000"
      },
      "initialBasePrice": {
        "type": "string",
        "description": "price of base asset when AMM instruction was created",
        "example": "100.0000"
      },
      "initialQuotePrice": {
        "type": "string",
        "description": "price of quote asset when AMM instruction was created",
        "example": "0.0100"
      },
      "initialValue": {
        "type": "string",
        "description": "value of assets (base and quote) in USD amount when AMM instruction was created",
        "example": "0.0000"
      },
      "lowerBound": {
        "type": "string",
        "description": "lower bound of price range, in quote currency",
        "example": "0.0013"
      },
      "price": {
        "type": "string",
        "description": "current price of AMM, see [Get Tick By Symbol](#get-/v1/markets/-symbol-/tick)",
        "example": "456.7800"
      },
      "quoteCurrentQuantity": {
        "type": "string",
        "description": "amount of quote asset this AMM instruction currently holds, only for AMM instruction with `OPEN` status",
        "example": "0.0000"
      },
      "quoteInvestQuantity": {
        "type": "string",
        "description": "initial quote investment",
        "example": "0.0009"
      },
      "quotePrice": {
        "type": "string",
        "description": "current price of quote asset",
        "example": "1.0000"
      },
      "quoteWithdrawQuantity": {
        "type": "string",
        "description": "amount of quote asset returned when AMM instruction is terminated",
        "example": "0.0011"
      },
      "lastDistributedPrice": {
        "type": "string",
        "description": "(Perpetual market only) The price used at the time of settlement for AMM Instructions that can be used to determine mtmPnl and the actual Pnl",
        "example": null
      },
      "requestId": {
        "type": "string",
        "example": "197735387747975680",
        "properties": {}
      },
      "staticSpreadFee": {
        "type": "string",
        "description": "static spread fee, see [Get Market By Symbol](#get-/v1/markets/-symbol-)",
        "example": "0.00200000"
      },
      "updatedAtDatetime": {
        "type": "string",
        "format": "date-time",
        "example": "2025-05-20T01:01:01.000Z",
        "description": "ISO 8601 with millisecond as string",
        "properties": {}
      },
      "updatedAtTimestamp": {
        "type": "string",
        "format": "string",
        "example": "1621490985000",
        "description": "unsigned 64 bit integer value which is the number of milliseconds since EPOCH expressed as string",
        "properties": {}
      },
      "upperBound": {
        "type": "string",
        "description": "upper bound of price range, in quote currency",
        "example": "14000.0000"
      },
      "yieldEarn": {
        "type": "string",
        "description": "amount of money earned in USD",
        "example": "0.00"
      }
    }
  }
}
```

### 401 - Not Authenticated

### 403 - Access Forbidden

### 429 - Too Many Requests

### 500 - Internal Server Error
