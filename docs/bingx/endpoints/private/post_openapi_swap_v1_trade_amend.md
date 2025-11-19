# POST /openApi/swap/v1/trade/amend

**Source:** [/openApi/swap/v1/trade/amend](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Modify Order

POST /openApi/swap/v1/trade/amend

rate limitation by UID: 5/s & rate limitation by IP in group Number: 3

API KEY permission: Perpetual Futures Trading

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type   | Required | Description                                                                         |
| -------------- | ------ | -------- | ----------------------------------------------------------------------------------- |
| orderId        | string | Yes      | Either orderId or clientOrderId must be provided. At least one of them is required. |
| clientOrderId  | string | Yes      | Either orderId or clientOrderId must be provided. At least one of them is required. |
| quantity       | float  | Yes      | The amended order quantity.                                                         |
| symbol         | string | Yes      | Trading pair, e.g., BTC-USDT (please use uppercase letters).                        |
| timestamp      | int64  | Yes      | Timestamp of the request in milliseconds.                                           |
| recvWindow     | int64  | No       | Request validity window, in milliseconds.                                           |

### Response Parameters

| Parameter Name | Type   | Description                                                          |
| -------------- | ------ | -------------------------------------------------------------------- |
| code           | int64  | Error code: 0 means success; any non-zero value indicates a failure. |
| msg            | string | Error message.                                                       |
| orderId        | int64  | Order ID.                                                            |
| clientOrderId  | string | Client order ID (if applicable).                                     |
| symbol         | string | Trading pair, e.g., BTC-USDT (please use uppercase letters).         |
| quantity       | float  | The amended order quantity.                                          |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html)
