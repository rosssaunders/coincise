# POST /openApi/spot/v1/trade/cancelOpenOrders

**Source:**
[/openApi/spot/v1/trade/cancelOpenOrders](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Cancel all Open Orders on a Symbol

POST /openApi/spot/v1/trade/cancelOpenOrders

rate limitation by UID: 2/s & rate limitation by IP in group Number: 3

API KEY permission: Spot Trading

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type    | Required | Description                                                        |
| -------------- | ------- | -------- | ------------------------------------------------------------------ |
| symbol         | string  | no       | Trading pair, e.g., BTC-USDT,If not filled out, cancel all orders. |
| recvWindow     | float64 | no       | Request valid time window value, Unit: milliseconds                |
| timestamp      | int64   | yes      | Timestamp of initiating the request, Unit: milliseconds            |

### Response Parameters

| Parameter Name      | Type   | Description                                                                |
| ------------------- | ------ | -------------------------------------------------------------------------- |
| symbol              | string | Trading pair                                                               |
| orderId             | int64  | Order ID                                                                   |
| price               | string | Price                                                                      |
| origQty             | string | Original quantity                                                          |
| executedQty         | string | Executed quantity                                                          |
| cummulativeQuoteQty | string | Cumulative quote asset transacted quantity                                 |
| status              | string | Order status: NEW, PENDING, PARTIALLY_FILLED, FILLED, CANCELED, FAILED     |
| type                | string | MARKET/LIMIT/TAKE_STOP_LIMIT/TAKE_STOP_MARKET/TRIGGER_LIMIT/TRIGGER_MARKET |
| side                | string | BUY/SELL                                                                   |
| clientOrderID       | string | Customized order ID for users                                              |
| stopPrice           | string | trigger price                                                              |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/spot/trade-api.html](https://bingx-api.github.io/docs/#/en-us/spot/trade-api.html)
