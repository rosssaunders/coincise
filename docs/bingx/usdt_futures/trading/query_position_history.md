## Query Position History

GET /openApi/swap/v1/trade/positionHistory

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

Query the position history of perpetual contracts under the current account.

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
| 109400     | CATI-USDT,symbol not exist, please verify it in api: /openApi/swap/v2/quote/contracts                                                                        |
| 80020      | risk forbidden                                                                                                                                               |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html)
