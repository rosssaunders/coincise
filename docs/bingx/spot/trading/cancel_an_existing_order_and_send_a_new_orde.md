## Cancel an Existing Order and Send a New Orde

POST /openApi/spot/v1/trade/order/cancelReplace

rate limitation by UID: 2/s & rate limitation by IP in group Number: 3

API KEY permission: Spot Trading

Content-Type:request body(application/json)

### Request Parameters

| Parameter Name      | Type    | Required | Description                                                                                                                                                                                            |
| ------------------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| symbol              | string  | yes      | The trading pair, for example: BTC-USDT, please use uppercase letters                                                                                                                                  |
| cancelOrderId       | int64   | no       | The ID of the order to be canceled                                                                                                                                                                     |
| cancelClientOrderID | string  | no       | The user-defined ID of the order to be canceled, character length limit: 1-40, different orders cannot use the same clientOrderID, only supports a query range of 2 hours                              |
| cancelRestrictions  | string  | no       | Cancel orders with specified status: NEW: New order, PENDING: Pending order, PARTIALLY_FILLED: Partially filled                                                                                        |
| CancelReplaceMode   | string  | yes      | STOP_ON_FAILURE: If the cancel order fails, it will not continue to place a new order. ALLOW_FAILURE: Regardless of whether the cancel order succeeds or fails, it will continue to place a new order. |
| side                | string  | yes      | The type of transaction, BUY: Buy, SELL: Sell                                                                                                                                                          |
| type                | string  | yes      | MARKET/LIMIT/TAKE_STOP_LIMIT/TAKE_STOP_MARKET/TRIGGER_LIMIT/TRIGGER_MARKET                                                                                                                             |
| stopPrice           | string  | yes      | Trigger price used for TAKE_STOP_LIMIT, TAKE_STOP_MARKET, TRIGGER_LIMIT, TRIGGER_MARKET order types.                                                                                                   |
| quantity            | float64 | no       | Order quantity, e.g. 0.1BTC                                                                                                                                                                            |
| quoteOrderQty       | float64 | no       | Order amount, e.g. 100USDT                                                                                                                                                                             |
| price               | float64 | no       | Order price, e.g. 10000USDT                                                                                                                                                                            |
| newClientOrderId    | string  | no       | Custom order ID consisting of letters, numbers, and \_. Character length should be between 1-40. Different orders cannot use the same newClientOrderId.                                                |
| recvWindow          | float64 | no       | Request valid time window in milliseconds.                                                                                                                                                             |
| timestamp           | int64   | yes      | Request timestamp in milliseconds.                                                                                                                                                                     |

### Response Parameters

| Parameter Name      | Type   | Description                                                                                                                                   |
| ------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol              | string | Trading symbol                                                                                                                                |
| orderId             | int64  | Order ID                                                                                                                                      |
| price               | string | Order price                                                                                                                                   |
| origQty             | string | Order quantity                                                                                                                                |
| executedQty         | string | Executed quantity                                                                                                                             |
| cummulativeQuoteQty | string | Cumulative quote quantity                                                                                                                     |
| status              | string | Order status: NEW (new order), PENDING (pending), PARTIALLY_FILLED (partially filled), FILLED (filled), CANCELED (cancelled), FAILED (failed) |
| type                | string | Order type: MARKET/LIMIT/TAKE_STOP_LIMIT/TAKE_STOP_MARKET/TRIGGER_LIMIT/TRIGGER_MARKET                                                        |
| side                | string | Transaction type: BUY (buy), SELL (sell)                                                                                                      |
| clientOrderID       | string | User-defined order ID                                                                                                                         |
| stopPrice           | string | Trigger price                                                                                                                                 |
| cancelRestrictions  | string | Cancel orders in specific states: NEW (new order), PENDING (pending), PARTIALLY_FILLED (partially filled)                                     |
| transactTime        | int64  | Transaction timestamp                                                                                                                         |

### Errors

| Error Code | Description                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 80014      | timestamp is invalid                                                                                                                                         |
| 100421     | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets |
| 100419     | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set                                                |
| 100410     | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249                          |
| 100410     | rate limited                                                                                                                                                 |
| 100413     | Incorrect apiKey                                                                                                                                             |
| 100410     | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155                              |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/spot/trade-api.html](https://bingx-api.github.io/docs/#/en-us/spot/trade-api.html)
