# GET /v2/orders/{orderId}

**Summary**: Get Order by ID

## Description

Retrieve a specific order using its unique identifier.

This endpoint requires [authentication](#overview--generate-a-jwt-token) and is
subjected to rate limiting.

**Operation ID**: trade-get-order-by-id-v2

**Tags**: orders

**Endpoint**: `GET /v2/orders/{orderId}`

**Authentication Required**: Yes

## Parameters

| Parameter        | In    | Type   | Required | Description               |
| ---------------- | ----- | ------ | -------- | ------------------------- |
|                  |       | string | No       |                           |
| tradingAccountId | query | string | Yes      | Id of the trading account |

## Responses

### 200 - OK

**Content-Type**: application/json

| Field                 | Type    | Required | Description                                                                                                                                                                        |
| --------------------- | ------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| clientOrderId         | string  | Yes      | Unique numeric (i64) identifier generated on the client side expressed as a string value<br>**Example:** `"187"`                                                                   |
| orderId               | string  | Yes      | <br>**Example:** `"297735387747975680"`                                                                                                                                            |
| symbol                | string  | Yes      | market symbol. Eg `BTCUSDC` for SPOT and `BTC-USDC-PERP` for PERPETUAL market<br>**Example:** `"BTCUSDC"`                                                                          |
| price                 | string  | Yes      | see [asset value](#overview--price-and-quantity-precision) format<br>**Example:** `"1.00000000"`                                                                                   |
| averageFillPrice      | string  | Yes      | see [asset value](#overview--price-and-quantity-precision) format<br>**Example:** `"1.00000000"`                                                                                   |
| stopPrice             | string  | Yes      | see [asset value](#overview--price-and-quantity-precision) format<br>**Example:** `"1.00000000"`                                                                                   |
| allowBorrow           | boolean | Yes      | indicates if the order was allowed to borrow (does not indicate that borrowing occurred)<br>**Example:** `false`                                                                   |
| quantity              | string  | Yes      | see [asset value](#overview--price-and-quantity-precision) format<br>**Example:** `"1.00000000"`                                                                                   |
| quantityFilled        | string  | Yes      | see [asset value](#overview--price-and-quantity-precision) format<br>**Example:** `"1.00000000"`                                                                                   |
| quoteAmount           | string  | Yes      | see [asset value](#overview--price-and-quantity-precision) format<br>**Example:** `"1.00000000"`                                                                                   |
| baseFee               | string  | Yes      | see [asset value](#overview--price-and-quantity-precision) format<br>**Example:** `"1.00000000"`                                                                                   |
| quoteFee              | string  | Yes      | see [asset value](#overview--price-and-quantity-precision) format<br>**Example:** `"1.00000000"`                                                                                   |
| borrowedBaseQuantity  | string  | No       | see [asset value](#overview--price-and-quantity-precision) format<br>**Example:** `"1.00000000"`                                                                                   |
| borrowedQuoteQuantity | string  | No       | see [asset value](#overview--price-and-quantity-precision) format<br>**Example:** `"1.00000000"`                                                                                   |
| isLiquidation         | boolean | Yes      | indicates if the order was executed as a liquidation order<br>**Example:** `false`                                                                                                 |
| side                  | string  | Yes      | order side can have the following string values `"BUY"`, `"SELL"`<br>**Example:** `"BUY"`                                                                                          |
| type                  | string  | Yes      | order type can have the following string values `"LMT"`, `"MKT"`, `"STOP_LIMIT"`, `"POST_ONLY"`. `"MKT"` and `"STOP_LIMIT"` are not applicable for Options<br>**Example:** `"LMT"` |
| timeInForce           | string  | Yes      | time in force can have the following string values `"GTC"`, `"FOK"`, `"IOC"`, see [details](#overview--order-timeinforce)                                                          |
| status                | string  | Yes      | order status can have the following string values `"OPEN"`, `"CLOSED"`, `"CANCELLED"`, `"REJECTED"`<br>**Example:** `"OPEN"`                                                       |
| statusReason          | string  | Yes      | status reason, describes why the order is in a specific state<br>**Example:** `"User cancelled"`                                                                                   |
| statusReasonCode      | string  | Yes      | status reason code, see [details](#overview--error--rejection-codes)<br>**Example:** `"1002"`                                                                                      |
| createdAtDatetime     | string  | Yes      | ISO 8601 with millisecond as string<br>**Example:** `"2025-05-20T01:01:01.000Z"`                                                                                                   |
| createdAtTimestamp    | string  | Yes      | unsigned 64 bit integer value which is the number of milliseconds since EPOCH expressed as string<br>**Example:** `"1621490985000"`                                                |

### 401 - Not Authenticated

### 403 - Access Forbidden

### 429 - Too Many Requests

### 500 - Internal Server Error
