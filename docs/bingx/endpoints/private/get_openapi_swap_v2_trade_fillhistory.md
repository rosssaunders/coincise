# GET /openApi/swap/v2/trade/fillHistory

**Source:**
[/openApi/swap/v2/trade/fillHistory](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Query historical transaction details

GET /openApi/swap/v2/trade/fillHistory

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type   | Required | Description                                                                                                         |
| -------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------- |
| symbol         | string | Yes      | Trading pair, e.g., BTC-USDT, please use uppercase letters                                                          |
| currency       | string | no       | USDC or USDT                                                                                                        |
| orderId        | int64  | no       | If orderId is provided, only the filled orders of that orderId are returned                                         |
| lastFillId     | int64  | no       | The last tradeId of the last query, default is 0 if not filled in.                                                  |
| startTs        | int64  | yes      | Starting timestamp in milliseconds                                                                                  |
| endTs          | int64  | yes      | End timestamp in milliseconds                                                                                       |
| timestamp      | int64  | yes      | request timestamp, unit: millisecond                                                                                |
| recvWindow     | int64  | no       | Request valid time window value, Unit: milliseconds                                                                 |
| pageIndex      | int64  | no       | The page number must be greater than 0, if not filled in, the default is 1                                          |
| pageSize       | int64  | no       | The size of each page must be greater than 0, the maximum value is 1000, if you do not fill in, then the default 50 |

### Response Parameters

| Parameter Name  | Type   | Description                                                                                                                                             |
| --------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol          | string | trading pair, for example: BTC-USDT                                                                                                                     |
| qty             | string | Transaction quantity                                                                                                                                    |
| price           | string | Transaction price                                                                                                                                       |
| quoteQty        | string | Transaction amount                                                                                                                                      |
| commission      | string | commission                                                                                                                                              |
| commissionAsset | string | Asset unit, usually USDT                                                                                                                                |
| orderId         | string | order id                                                                                                                                                |
| tradeId         | string | trade id                                                                                                                                                |
| filledTime      | string | Match the transaction time in the format of 2006-01-02T15:04:05.999+0800                                                                                |
| side            | string | buying and selling direction                                                                                                                            |
| positionSide    | string | Position direction, required for single position as BOTH, for both long and short positions only LONG or SHORT can be chosen, defaults to LONG if empty |
| role            | string | Active selling and buying, taker: active buying, maker: active selling                                                                                  |
| total           | int64  | total records                                                                                                                                           |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html)
