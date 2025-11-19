# GET /openApi/swap/v2/user/positions

**Source:** [/openApi/swap/v2/user/positions](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Query position data

GET /openApi/swap/v2/user/positions

rate limitation by UID: 5/s & rate limitation by IP in group Number: 3

API KEY permission: Read

Content-Type: request body(application/json)

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

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/account-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/account-api.html)
