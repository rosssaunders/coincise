# GET /openApi/swap/v1/trade/positionHistory

**Source:**
[/openApi/swap/v1/trade/positionHistory](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Query Position History

GET /openApi/swap/v1/trade/positionHistory

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type   | Required | Description                                                                                                                  |
| -------------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| symbol         | string | Yes      | Trading pair, e.g.: BTC-USDT, please use uppercase letters                                                                   |
| currency       | string | no       | USDC or USDT                                                                                                                 |
| timestamp      | int64  | Yes      | Request timestamp, in milliseconds                                                                                           |
| positionId     | int64  | No       | Position ID, if not provided, all position histories of the relevant trading pair will be returned by default                |
| startTs        | int64  | Yes      | Start timestamp, in milliseconds, maximum time span is three months, if not provided, the default start time is 90 days ago  |
| endTs          | int64  | Yes      | End timestamp, in milliseconds, maximum time span is three months, if not provided, the default end time is the current time |
| pageIndex      | int64  | No       | Page number, must be greater than 0, if not provided, the default is 1                                                       |
| pageSize       | int64  | No       | Page size, must be greater than 0, maximum value is 100, if not provided, the default is 1000                                |
| recvWindow     | int64  | No       | Request valid window value, in milliseconds                                                                                  |

### Response Parameters

| Parameter Name     | Type    | Description                                             |
| ------------------ | ------- | ------------------------------------------------------- |
| symbol             | string  | Trading pair, e.g.: BTC-USDT                            |
| positionId         | string  | Position ID                                             |
| positionSide       | string  | Position side LONG/SHORT                                |
| isolated           | bool    | Isolated mode, true: isolated mode, false: cross margin |
| closeAllPositions  | bool    | All positions closed                                    |
| positionAmt        | string  | Position amount                                         |
| closePositionAmt   | string  | Closed position amount                                  |
| realisedProfit     | string  | Realized profit and loss                                |
| netProfit          | string  | Net profit and loss                                     |
| avgClosePrice      | float64 | Average close price                                     |
| avgPrice           | string  | Average open price                                      |
| leverage           | int     | Leverage                                                |
| positionCommission | string  | Commission fee                                          |
| totalFunding       | string  | Funding fee                                             |
| openTime           | int64   | Open time                                               |
| closeTime          | int64   | Close time                                              |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html)
