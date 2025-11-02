## Query position data

GET /openApi/swap/v2/user/positions

rate limitation by UID: 5/s & rate limitation by IP in group Number: 3

API KEY permission: Read

Content-Type:request body(application/json)

Retrieve information on users' positions of Perpetual Swap.

### Request Parameters

| Parameter Name | Type   | Required | Description                                                          |
| -------------- | ------ | -------- | -------------------------------------------------------------------- |
| symbol         | string | no       | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT |
| timestamp      | int64  | yes      | request timestamp in milliseconds                                    |
| recvWindow     | int64  | no       | Request valid time window value, Unit: milliseconds                  |

### Response Parameters

| Parameter Name     | Type    | Description                                                                                 |
| ------------------ | ------- | ------------------------------------------------------------------------------------------- |
| symbol             | string  | trading pair, for example: BTC-USDT                                                         |
| positionId         | string  | Position ID                                                                                 |
| positionSide       | string  | position direction LONG/SHORT long/short                                                    |
| isolated           | bool    | Whether it is isolated margin mode, true: isolated margin mode false: cross margin          |
| positionAmt        | string  | Position Amount                                                                             |
| availableAmt       | string  | AvailableAmt Amount                                                                         |
| unrealizedProfit   | string  | unrealized profit and loss                                                                  |
| realisedProfit     | string  | realized profit and loss                                                                    |
| initialMargin      | string  | initialMargin                                                                               |
| margin             | string  | margin                                                                                      |
| avgPrice           | string  | Average opening price                                                                       |
| liquidationPrice   | float64 | liquidation price                                                                           |
| leverage           | int     | leverage                                                                                    |
| positionValue      | string  | Position value                                                                              |
| markPrice          | string  | Mark price                                                                                  |
| riskRate           | string  | Risk rate. When the risk rate reaches 100%, it will force liquidation or position reduction |
| maxMarginReduction | string  | Maximum margin reduction                                                                    |
| pnlRatio           | string  | Unrealized P&L ratio                                                                        |
| updateTime         | int64   | Position update time, in milliseconds timestamp.                                            |

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
> [https://bingx-api.github.io/docs/#/en-us/swapV2/account-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/account-api.html)
