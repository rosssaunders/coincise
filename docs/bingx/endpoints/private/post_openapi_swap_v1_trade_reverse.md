# POST /openApi/swap/v1/trade/reverse

**Source:** [/openApi/swap/v1/trade/reverse](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## One-Click Reverse Position

POST /openApi/swap/v1/trade/reverse

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type   | Required | Description                                                                                       |
| -------------- | ------ | -------- | ------------------------------------------------------------------------------------------------- |
| type           | string | Yes      | Reverse type, Reverse: immediate reverse, TriggerReverse: planned reverse                         |
| symbol         | string | Yes      | Trading pair, e.g.: BTC-USDT                                                                      |
| triggerPrice   | string | No       | Trigger price, required for planned reverse                                                       |
| workingType    | string | No       | TriggerPrice price type: MARK_PRICE, CONTRACT_PRICE, CONTRACT_PRICE. Required for planned reverse |
| timestamp      | int64  | Yes      | Request timestamp in milliseconds                                                                 |
| recvWindow     | int64  | No       | Request valid time window value in milliseconds                                                   |

### Response Parameters

| Parameter Name     | Type    | Description                                                                         |
| ------------------ | ------- | ----------------------------------------------------------------------------------- |
| type               | string  | Reverse type, Reverse: immediate reverse, TriggerReverse: planned reverse           |
| positionId         | string  | Original position ID                                                                |
| newPositionId      | string  | New position ID                                                                     |
| symbol             | string  | Trading pair, e.g.: BTC-USDT                                                        |
| positionSide       | string  | Position side LONG/SHORT                                                            |
| isolated           | bool    | Whether in isolated mode, true: isolated mode, false: cross margin                  |
| positionAmt        | string  | Position amount                                                                     |
| availableAmt       | string  | Available amount for closing                                                        |
| unrealizedProfit   | string  | Unrealized profit and loss                                                          |
| realisedProfit     | string  | Realized profit and loss                                                            |
| initialMargin      | string  | Initial margin                                                                      |
| margin             | string  | Margin                                                                              |
| liquidationPrice   | float64 | Liquidation price                                                                   |
| avgPrice           | string  | Average entry price                                                                 |
| leverage           | int64   | Leverage                                                                            |
| positionValue      | string  | Position value                                                                      |
| markPrice          | string  | Mark price                                                                          |
| riskRate           | string  | Risk rate, position will be force-reduced or liquidated when risk rate reaches 100% |
| maxMarginReduction | string  | Maximum reducible margin                                                            |
| pnlRatio           | string  | Unrealized PNL ratio                                                                |
| updateTime         | int64   | Position update time in milliseconds                                                |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html)
