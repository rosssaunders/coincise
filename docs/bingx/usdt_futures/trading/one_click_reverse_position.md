## One-Click Reverse Position

POST /openApi/swap/v1/trade/reverse

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

One-Click Reverse Position

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
| 109500     | Account Service Unavailable, err:symbol not exist                                                                                                            |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html)
