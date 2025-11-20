# POST /v2/orders

**Summary**: Create Order

## Description

Creates an order, requires
[bearer token](#overview--add-authenticated-request-header) in authorization
header.

This endpoint uses the [signing format](#overview--signing-format) which does
not require strict field ordering and addition of null fields in the request
body. Quantities and prices does not require strict precision. Eg. for asset
precision of 4 - `100`, `100.0`, `100.00`, `100.000` and `100.0000` are all
accepted.

**Ratelimited:** `True`. Higher tiers of rate limits available by providing the
`BX-RATELIMIT-TOKEN` request header.

**Operation ID**: trade-create-order-v2

**Tags**: orders

**Endpoint**: `POST /v2/orders`

**Authentication Required**: Yes

## Parameters

| Parameter | In  | Type   | Required | Description |
| --------- | --- | ------ | -------- | ----------- |
|           |     | string | No       |             |
|           |     | string | No       |             |
|           |     | string | No       |             |
|           |     | string | No       |             |
|           |     | string | No       |             |
|           |     | string | No       |             |

## Request Body

new order request body

**Required**: Yes

### Content-Type: application/json

| Field            | Type    | Required | Description                                                                                                                                                                                  |
| ---------------- | ------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| commandType      | string  | Yes      | The command type, it must be 'V3CreateOrder'                                                                                                                                                 |
| clientOrderId    | string  | No       | Unique numeric (i64) identifier generated on the client side expressed as a string value<br>**Example:** `"187"`                                                                             |
| symbol           | string  | Yes      | market symbol. Eg `BTCUSDC` for SPOT and `BTC-USDC-PERP` for PERPETUAL market<br>**Example:** `"BTCUSDC"`                                                                                    |
| type             | string  | Yes      | order type can have the following string values `"LIMIT"`, `"MARKET"`, `"STOP_LIMIT"`, `"POST_ONLY"`. `"MARKET"` and `"STOP_LIMIT"` are not applicable for Options<br>**Example:** `"LIMIT"` |
| side             | string  | Yes      | order side can have the following string values `"BUY"`, `"SELL"`<br>**Example:** `"BUY"`                                                                                                    |
| price            | string  | No       | see [asset value](#overview--price-and-quantity-precision) format<br>**Example:** `"1.00000000"`                                                                                             |
| stopPrice        | string  | No       | see [asset value](#overview--price-and-quantity-precision) format<br>**Example:** `"1.00000000"`                                                                                             |
| quantity         | string  | Yes      | see [asset value](#overview--price-and-quantity-precision) format<br>**Example:** `"1.00000000"`                                                                                             |
| timeInForce      | string  | Yes      | time in force can have the following string values `"GTC"`, `"FOK"`, `"IOC"`, see [details](#overview--order-timeinforce)                                                                    |
| allowBorrow      | boolean | No       | allows to borrow on the order<br>**Example:** `false`                                                                                                                                        |
| isMMP            | boolean | No       | Indicate if the order is subject to `Market Maker Protection`. Only applicable to option markets<br>**Example:** `true`                                                                      |
| tradingAccountId | string  | Yes      | unique trading account ID<br>**Example:** `"111000000000001"`                                                                                                                                |

## Responses

### 200 - Status OK. The create order command was successfully acknowledged. To check the current status of the order, query [Get Order by ID](#get-/trading-api/v2/orders/-orderId-) using the `orderId` received in the response payload. Please consult the section [How To Ensure The Order Of _Create Order_ or _Cancel Order_ Requests](#overview--how-to-ensure-the-order-of-create-order-or-cancel-order-requests) for more information.

**Content-Type**: application/json

| Field         | Type   | Required | Description                                                                        |
| ------------- | ------ | -------- | ---------------------------------------------------------------------------------- |
| message       | string | Yes      | message                                                                            |
| requestId     | string | Yes      | <br>**Example:** `"197735387747975680"`                                            |
| orderId       | string | Yes      | <br>**Example:** `"297735387747975680"`                                            |
| clientOrderId | string | No       | unique numeric identifier generated on the client side expressed as a string value |

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
