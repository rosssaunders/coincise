# GET /openApi/spot/v1/trade/myTrades

**Source:** [/openApi/spot/v1/trade/myTrades](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Query transaction details

GET /openApi/spot/v1/trade/myTrades

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type    | Required | Description                                                       |
| -------------- | ------- | -------- | ----------------------------------------------------------------- |
| symbol         | string  | Yes      | Trading pair, e.g. BTC-USDT, please use uppercase letters         |
| orderId        | long    | no       | Order ID                                                          |
| startTime      | long    | No       | Start timestamp, unit: ms                                         |
| endTime        | long    | No       | End timestamp, unit: ms                                           |
| fromId         | long    | No       | Starting trade ID. By default, the latest trade will be retrieved |
| limit          | long    | No       | Default 500, maximum 1000                                         |
| recvWindow     | float64 | No       | Request valid time window, unit: milliseconds                     |
| timestamp      | int64   | Yes      | Request timestamp, unit: milliseconds                             |

### Response Parameters

| Parameter Name  | Type    | Description                 |
| --------------- | ------- | --------------------------- |
| symbol          | string  | Trading symbol              |
| id              | int     | Trade ID                    |
| orderId         | int64   | Order ID                    |
| price           | string  | Price of the trade          |
| qty             | string  | Quantity of the trade       |
| quoteQty        | string  | Quote asset quantity traded |
| commission      | float64 | Commission amount           |
| commissionAsset | string  | Commission asset type       |
| time            | int64   | Trade time                  |
| isBuyer         | bool    | Whether the buyer           |
| isMaker         | bool    | Whether the maker           |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/spot/trade-api.html](https://bingx-api.github.io/docs/#/en-us/spot/trade-api.html)
