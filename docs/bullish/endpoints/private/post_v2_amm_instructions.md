# POST /v2/amm-instructions

**Summary**: Create AMM Instruction

## Description

Creates an AMM instruction, requires
[bearer token](#overview--add-authenticated-request-header) in authorization
header.

This endpoint uses the [signing format](#overview--signing-format) which does
not require strict field ordering in the request body. Quantities and prices
does not require strict precision. Eg. for asset precision of 4 - `100`,
`100.0`, `100.00`, `100.000` and `100.0000` are all accepted.

**Ratelimited:** `True`

**Operation ID**: trade-create-amm-instruction

**Tags**: amm instructions

**Endpoint**: `POST /v2/amm-instructions`

**Authentication Required**: Yes

## Parameters

| Parameter | In  | Type   | Required | Description |
| --------- | --- | ------ | -------- | ----------- |
|           |     | string | No       |             |
|           |     | string | No       |             |
|           |     | string | No       |             |
|           |     | string | No       |             |

## Request Body

new AMM instruction

**Required**: Yes

### Content-Type: application/json

| Field            | Type   | Required | Description                                                                                               |
| ---------------- | ------ | -------- | --------------------------------------------------------------------------------------------------------- |
| commandType      | string | Yes      | The command type, it must be 'V3CreateAMMInstruction'                                                     |
| symbol           | string | Yes      | market symbol. Eg `BTCUSDC` for SPOT and `BTC-USDC-PERP` for PERPETUAL market<br>**Example:** `"BTCUSDC"` |
| baseQuantity     | string | Yes      | see [asset value](#overview--price-and-quantity-precision) format<br>**Example:** `"1.00000000"`          |
| quoteQuantity    | string | Yes      | see [asset value](#overview--price-and-quantity-precision) format<br>**Example:** `"1.00000000"`          |
| upperBound       | string | Yes      | upper bound of price range, in quote currency                                                             |
| lowerBound       | string | Yes      | lower bound of price range, in quote currency                                                             |
| feeTierId        | string | Yes      | unique fee tier ID, see [Get Market By Symbol](#get-/v1/markets/-symbol-)<br>**Example:** `"1"`           |
| tradingAccountId | string | Yes      | unique trading account ID<br>**Example:** `"111000000000001"`                                             |

## Responses

### 200 - Status OK. This means a create AMM instruction command was successfully acknowledged. It does not necessarily mean the instruction was created. To check the current status, query [Get AMM Instruction by ID](#get-/trading-api/v2/amm-instructions/-instructionid-) using the `instructionId` received in the response payload.

**Content-Type**: application/json

| Field         | Type   | Required | Description                             |
| ------------- | ------ | -------- | --------------------------------------- |
| message       | string | Yes      | message                                 |
| requestId     | string | Yes      | <br>**Example:** `"197735387747975680"` |
| instructionId | string | Yes      | <br>**Example:** `"297735387747975680"` |

### 400 - Bad Request

For example, sending a request with the `BX-SIGNATURE` header missing will
result in the following response:

**Content-Type**: application/json

| Field         | Type    | Required | Description                                                         |
| ------------- | ------- | -------- | ------------------------------------------------------------------- |
| message       | string  | Yes      | message<br>**Example:** `"Missing signature header"`                |
| errorCode     | integer | Yes      | unique error code<br>**Example:** `6029`                            |
| errorCodeName | string  | Yes      | unique error code name<br>**Example:** `"MISSING_SIGNATURE_HEADER"` |

### 401 - Not Authenticated

### 403 - Access Forbidden

### 429 - Too Many Requests

### 500 - Internal Server Error
