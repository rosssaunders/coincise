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

| Field                 | Type    | Required | Description                                                                                                                                                          |
| --------------------- | ------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| liquidityId           | string  | Yes      | <br>**Example:** `"297735387747975680"`                                                                                                                              |
| instructionId         | string  | Yes      | <br>**Example:** `"297735387747975680"`                                                                                                                              |
| symbol                | string  | Yes      | market symbol. Eg `BTCUSDC` for SPOT and `BTC-USDC-PERP` for PERPETUAL market<br>**Example:** `"BTCUSDC"`                                                            |
| baseFee               | string  | Yes      | see [asset value](#overview--price-and-quantity-precision) format<br>**Example:** `"1.00000000"`                                                                     |
| quoteFee              | string  | Yes      | see [asset value](#overview--price-and-quantity-precision) format<br>**Example:** `"1.00000000"`                                                                     |
| status                | string  | Yes      | order status can have the following string values `"OPEN"`, `"CLOSED"`, `"CANCELLED"`, `"REJECTED"`<br>**Example:** `"OPEN"`                                         |
| statusReason          | string  | Yes      | status reason, describes why the order is in a specific state<br>**Example:** `"Ok"`                                                                                 |
| statusReasonCode      | integer | Yes      | status reason code, see [details](#overview--error--rejection-codes)<br>**Example:** `1001`                                                                          |
| createdAtDatetime     | string  | No       | ISO 8601 with millisecond as string<br>**Example:** `"2025-05-20T01:01:01.000Z"`                                                                                     |
| createdAtTimestamp    | string  | Yes      | unsigned 64 bit integer value which is the number of milliseconds since EPOCH expressed as string<br>**Example:** `"1621490985000"`                                  |
| 24HrApy               | string  | No       | APY of the last 24 Hours, only for AMM instructions with `OPEN` status<br>**Example:** `"2.3319"`                                                                    |
| 24HrYieldEarn         | string  | No       | amount of money earned in USD from the last 24 Hours, only for AMM instructions with `OPEN` status<br>**Example:** `"0.00"`                                          |
| apy                   | string  | Yes      | yield generated from the time AMM instruction was created, in annualised percentage<br>**Example:** `"0.0000"`                                                       |
| baseCurrentQuantity   | string  | Yes      | amount of base asset this AMM instruction currently holds, only for AMM instruction with `OPEN` status<br>**Example:** `"0.00000000"`                                |
| baseInvestQuantity    | string  | Yes      | initial base investment<br>**Example:** `"0.00000008"`                                                                                                               |
| basePrice             | string  | Yes      | current price of base asset<br>**Example:** `"345.6700"`                                                                                                             |
| baseWithdrawQuantity  | string  | Yes      | amount of base asset returned when AMM instruction is terminated<br>**Example:** `"0.00000010"`                                                                      |
| currentValue          | string  | Yes      | value of assets (base and quote) in USD amount that this AMM instruction currently holds<br>**Example:** `"0.0000"`                                                  |
| dislocationEnabled    | boolean | Yes      | dislocation enabled/disabled<br>**Example:** `false`                                                                                                                 |
| feeTierId             | string  | Yes      | unique fee tier ID, see [Get Market By Symbol](#get-/v1/markets/-symbol-)<br>**Example:** `"1"`                                                                      |
| finalValue            | string  | No       | value of assets (base and quote) in USD amount when AMM instruction was terminated, only for AMM instruction with `CLOSED` status<br>**Example:** `"0.0001"`         |
| impermanentLoss       | string  | Yes      | impermanent loss<br>**Example:** `"0.0000"`                                                                                                                          |
| initialBasePrice      | string  | Yes      | price of base asset when AMM instruction was created<br>**Example:** `"100.0000"`                                                                                    |
| initialQuotePrice     | string  | Yes      | price of quote asset when AMM instruction was created<br>**Example:** `"0.0100"`                                                                                     |
| initialValue          | string  | Yes      | value of assets (base and quote) in USD amount when AMM instruction was created<br>**Example:** `"0.0000"`                                                           |
| lowerBound            | string  | Yes      | lower bound of price range, in quote currency<br>**Example:** `"0.0013"`                                                                                             |
| price                 | string  | Yes      | current price of AMM, see [Get Tick By Symbol](#get-/v1/markets/-symbol-/tick)<br>**Example:** `"456.7800"`                                                          |
| quoteCurrentQuantity  | string  | No       | amount of quote asset this AMM instruction currently holds, only for AMM instruction with `OPEN` status<br>**Example:** `"0.0000"`                                   |
| quoteInvestQuantity   | string  | Yes      | initial quote investment<br>**Example:** `"0.0009"`                                                                                                                  |
| quotePrice            | string  | Yes      | current price of quote asset<br>**Example:** `"1.0000"`                                                                                                              |
| quoteWithdrawQuantity | string  | Yes      | amount of quote asset returned when AMM instruction is terminated<br>**Example:** `"0.0011"`                                                                         |
| lastDistributedPrice  | string  | No       | (Perpetual market only) The price used at the time of settlement for AMM Instructions that can be used to determine mtmPnl and the actual Pnl<br>**Example:** `null` |
| requestId             | string  | Yes      | <br>**Example:** `"197735387747975680"`                                                                                                                              |
| staticSpreadFee       | string  | Yes      | static spread fee, see [Get Market By Symbol](#get-/v1/markets/-symbol-)<br>**Example:** `"0.00200000"`                                                              |
| updatedAtDatetime     | string  | No       | ISO 8601 with millisecond as string<br>**Example:** `"2025-05-20T01:01:01.000Z"`                                                                                     |
| updatedAtTimestamp    | string  | Yes      | unsigned 64 bit integer value which is the number of milliseconds since EPOCH expressed as string<br>**Example:** `"1621490985000"`                                  |
| upperBound            | string  | Yes      | upper bound of price range, in quote currency<br>**Example:** `"14000.0000"`                                                                                         |
| yieldEarn             | string  | Yes      | amount of money earned in USD<br>**Example:** `"0.00"`                                                                                                               |

### 401 - Not Authenticated

### 403 - Access Forbidden

### 429 - Too Many Requests

### 500 - Internal Server Error
