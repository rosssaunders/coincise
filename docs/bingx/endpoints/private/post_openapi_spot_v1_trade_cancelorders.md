# POST /openApi/spot/v1/trade/cancelOrders

**Source:**
[/openApi/spot/v1/trade/cancelOrders](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Cancel multiple orders

POST /openApi/spot/v1/trade/cancelOrders

rate limitation by UID: 2/s & rate limitation by IP in group Number: 3

API KEY permission: Spot Trading

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type    | Required | Description                                                                                                                                                            |
| -------------- | ------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol         | string  | yes      | Trading pair, e.g., BTC-USDT                                                                                                                                           |
| process        | int     | no       | 0 or 1, default 0,if process=1,will handle valid orderIds partially, and return invalid orderIds in fails list, if process=0,if one of orderIds invalid, will all fail |
| orderIds       | string  | yes      | Order Ids: for example:orderIds=id1,id2,id3                                                                                                                            |
| clientOrderIDs | string  | no       | Custom order IDs, for example: clientOrderIDs=id1,id2,id3                                                                                                              |
| recvWindow     | float64 | no       | Request valid time window value, Unit: milliseconds                                                                                                                    |
| timestamp      | int64   | yes      | Timestamp of initiating the request, Unit: milliseconds                                                                                                                |

### Response Parameters

| Parameter Name      | Type    | Description                                                                |
| ------------------- | ------- | -------------------------------------------------------------------------- |
| symbol              | string  | Trading pair                                                               |
| orderId             | int64   | Order ID                                                                   |
| price               | string  | Price                                                                      |
| origQty             | string  | Original quantity                                                          |
| executedQty         | string  | Executed quantity                                                          |
| cummulativeQuoteQty | string  | Cumulative quote asset transacted quantity                                 |
| status              | string  | Order status: NEW, PENDING, PARTIALLY_FILLED, FILLED, CANCELED, FAILED     |
| type                | string  | MARKET/LIMIT/TAKE_STOP_LIMIT/TAKE_STOP_MARKET/TRIGGER_LIMIT/TRIGGER_MARKET |
| side                | string  | BUY/SELL                                                                   |
| clientOrderID       | string  | Customized order ID for users                                              |
| stopPrice           | float64 | trigger price                                                              |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/spot/trade-api.html](https://bingx-api.github.io/docs/#/en-us/spot/trade-api.html)
