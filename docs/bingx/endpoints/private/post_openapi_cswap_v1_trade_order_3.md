# POST /openApi/cswap/v1/trade/order

**Source:** [/openApi/cswap/v1/trade/order](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Trade order

POST /openApi/cswap/v1/trade/order

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type    | Required | Description                                                                                                                                                                               |
| -------------- | ------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol         | string  | yes      | Trading pair, for example: BTC-USD, please use capital letters                                                                                                                            |
| type           | string  | yes      | LIMIT: Limit order/MARKET: Market order/STOP_MARKET: Market stop loss order/TAKE_PROFIT_MARKET: Market take profit order/STOP: Limit stop loss order/TAKE_PROFIT: Limit stop profit order |
| side           | string  | yes      | Buying and selling direction SELL, BUY                                                                                                                                                    |
| positionSide   | string  | no       | Position direction, single position must fill in BOTH, two-way position can only choose LONG or SHORT, if it is empty, the default is LONG                                                |
| price          | float64 | no       | Commission price                                                                                                                                                                          |
| quantity       | float64 | no       | The order quantity and the number of contracts. It is not supported to place orders with U quantity at the moment.                                                                        |
| stopPrice      | float64 | no       | Trigger price, only STOP_MARKET,TAKE_PROFIT_MARKET,STOP,TAKE_PROFIT require this parameter                                                                                                |
| workingType    | string  | no       | stopPrice trigger price price type: MARK_PRICE, CONTRACT_PRICE, default MARK_PRICE                                                                                                        |
| timestamp      | int64   | yes      | Requested timestamp, unit: milliseconds                                                                                                                                                   |
| stopLoss       | string  | no       | Support placing orders and setting stop loss at the same time. But only supports type: STOP_MARKET/STOP                                                                                   |
| takeProfit     | string  | no       | Support placing orders and setting take profit at the same time. But only supports type: TAKE_PROFIT_MARKET/TAKE_PROFIT                                                                   |
| recvWindow     | int64   | no       | Request valid time window value, unit: milliseconds                                                                                                                                       |
| timeInForce    | string  | no       | Effective method, currently supports GTC, IOC, FOK and PostOnly                                                                                                                           |
| clientOrderId  | string  | no       | Customized order ID for users                                                                                                                                                             |

### Response Parameters

| Parameter Name | Type    | Required | Description                                                                                                                                                                               |
| -------------- | ------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol         | string  | yes      | Trading pair, for example: BTC-USD, please use capital letters                                                                                                                            |
| type           | string  | yes      | LIMIT: Limit order/MARKET: Market order/STOP_MARKET: Market stop loss order/TAKE_PROFIT_MARKET: Market take profit order/STOP: Limit stop loss order/TAKE_PROFIT: Limit stop profit order |
| side           | string  | yes      | Buying and selling direction SELL, BUY                                                                                                                                                    |
| positionSide   | string  | no       | Position direction, single position must fill in BOTH, two-way position can only choose LONG or SHORT, if it is empty, the default is LONG                                                |
| price          | float64 | no       | Commission price                                                                                                                                                                          |
| quantity       | float64 | no       | The order quantity and the number of contracts. It is not supported to place orders with U quantity at the moment.                                                                        |
| stopPrice      | float64 | no       | Trigger price, only STOP_MARKET,TAKE_PROFIT_MARKET,STOP,TAKE_PROFIT require this parameter                                                                                                |
| workingType    | string  | no       | stopPrice trigger price price type: MARK_PRICE, CONTRACT_PRICE, default MARK_PRICE                                                                                                        |
| timestamp      | int64   | yes      | Requested timestamp, unit: milliseconds                                                                                                                                                   |
| stopLoss       | string  | no       | Support placing orders and setting stop loss at the same time. But only supports type: STOP_MARKET/STOP                                                                                   |
| takeProfit     | string  | no       | Support placing orders and setting take profit at the same time. But only supports type: TAKE_PROFIT_MARKET/TAKE_PROFIT                                                                   |
| recvWindow     | int64   | no       | Request valid time window value, unit: milliseconds                                                                                                                                       |
| timeInForce    | string  | no       | Effective method, currently supports GTC, IOC, FOK and PostOnly                                                                                                                           |
| clientOrderId  | string  | no       | Customized order ID for users                                                                                                                                                             |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/standard/contract-api.html](https://bingx-api.github.io/docs/#/en-us/standard/contract-api.html)
