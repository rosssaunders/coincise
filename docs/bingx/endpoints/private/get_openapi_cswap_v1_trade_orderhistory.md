# GET /openApi/cswap/v1/trade/orderHistory

**Source:**
[/openApi/cswap/v1/trade/orderHistory](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## User's History Orders

GET /openApi/cswap/v1/trade/orderHistory

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type   | Required | Description                                                                                                                                               |
| -------------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol         | string | no       | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USD.If no symbol is specified, it will query the historical orders for all trading pairs. |
| orderId        | int64  | no       | Only return subsequent orders, and return the latest order by default                                                                                     |
| startTime      | int64  | no       | Start time, unit: millisecond                                                                                                                             |
| endTime        | int64  | no       | End time, unit: millisecond                                                                                                                               |
| limit          | int    | yes      | number of result sets to return Default: 500 Maximum: 1000                                                                                                |
| timestamp      | int64  | yes      | request timestamp in milliseconds                                                                                                                         |
| recvWindow     | int64  | no       | Request valid time window value, Unit: milliseconds                                                                                                       |

### Response Parameters

| Parameter Name | Type   | Description                                                                                                                                                                                                                                                                                                                                  |
| -------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| time           | int64  | order time, unit: millisecond                                                                                                                                                                                                                                                                                                                |
| symbol         | string | trading pair, for example: BTC-USDT.If a specific pair is not provided, a history of transactions for all pairs will be returned                                                                                                                                                                                                             |
| side           | string | buying and selling direction                                                                                                                                                                                                                                                                                                                 |
| type           | string | LIMIT: Limit Order / MARKET: Market Order / STOP_MARKET: Stop Market Order / TAKE_PROFIT_MARKET: Take Profit Market Order / STOP: Stop Limit Order / TAKE_PROFIT: Take Profit Limit Order / TRIGGER_LIMIT: Stop Limit Order with Trigger / TRIGGER_MARKET: Stop Market Order with Trigger / TRAILING_STOP_MARKET: Trailing Stop Market Order |
| positionSide   | string | Position direction, required for single position as BOTH, for both long and short positions only LONG or SHORT can be chosen, defaults to LONG if empty                                                                                                                                                                                      |
| reduceOnly     | string | true, false; Default value is false for single position mode; This parameter is not accepted for both long and short positions mode                                                                                                                                                                                                          |
| cumQuote       | string | transaction amount                                                                                                                                                                                                                                                                                                                           |
| status         | string | order status                                                                                                                                                                                                                                                                                                                                 |
| stopPrice      | string | Trigger price                                                                                                                                                                                                                                                                                                                                |
| price          | string | Price                                                                                                                                                                                                                                                                                                                                        |
| origQty        | string | original order quantity                                                                                                                                                                                                                                                                                                                      |
| avgPrice       | string | average transaction price                                                                                                                                                                                                                                                                                                                    |
| executedQty    | string | volume                                                                                                                                                                                                                                                                                                                                       |
| orderId        | int64  | Order ID                                                                                                                                                                                                                                                                                                                                     |
| profit         | string | profit and loss                                                                                                                                                                                                                                                                                                                              |
| commission     | string | Fee                                                                                                                                                                                                                                                                                                                                          |
| workingType    | string | StopPrice trigger price types: MARK_PRICE, CONTRACT_PRICE, default MARK_PRICE                                                                                                                                                                                                                                                                |
| updateTime     | int64  | update time, unit: millisecond                                                                                                                                                                                                                                                                                                               |
| timeInForce    | string | Effective method, currently supports GTC, IOC, FOK and PostOnly                                                                                                                                                                                                                                                                              |
| clientOrderId  | string | Customized order ID for users                                                                                                                                                                                                                                                                                                                |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/cswap/trade-api.html](https://bingx-api.github.io/docs/#/en-us/cswap/trade-api.html)
