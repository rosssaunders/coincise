# GET /openApi/spot/v1/trade/query

**Source:** [/openApi/spot/v1/trade/query](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Query Order details

GET /openApi/spot/v1/trade/query

rate limitation by UID: 10/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type    | Required | Description                                                                                                                                                       |
| -------------- | ------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol         | string  | yes      | Trading pair, e.g., BTC-USDT                                                                                                                                      |
| orderId        | int64   | no       | Order ID                                                                                                                                                          |
| clientOrderID  | string  | no       | Customized order ID for users, with a limit of characters from 1 to 40. Different orders cannot use the same clientOrderID,Only supports a query range of 2 hours |
| recvWindow     | float64 | no       | Request valid time window value, Unit: milliseconds                                                                                                               |
| timestamp      | int64   | yes      | Timestamp of initiating the request, Unit: milliseconds                                                                                                           |

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
| time                | int64  | Order timestamp                                                            |
| updateTime          | int64  | Update timestamp                                                           |
| origQuoteOrderQty   | string | Original quote order quantity                                              |
| fee                 | string | Fee                                                                        |
| feeAsset            | string | Fee asset                                                                  |
| clientOrderID       | string | Customized order ID for users                                              |
| stopPrice           | string | trigger price                                                              |
| avgPrice            | string | average fill price                                                         |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/spot/trade-api.html](https://bingx-api.github.io/docs/#/en-us/spot/trade-api.html)
