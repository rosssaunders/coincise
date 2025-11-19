# POST /openApi/cswap/v1/trade/positionMargin

**Source:**
[/openApi/cswap/v1/trade/positionMargin](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Adjust Isolated Margin

POST /openApi/cswap/v1/trade/positionMargin

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type    | Required | Description                                                                    |
| -------------- | ------- | -------- | ------------------------------------------------------------------------------ |
| symbol         | string  | yes      | Trading pair, e.g., BTC-USD, please use uppercase letters                      |
| amount         | float64 | yes      | Margin funds                                                                   |
| type           | int     | yes      | Adjustment direction: 1: Increase isolated margin, 2: Decrease isolated margin |
| positionSide   | string  | yes      | Position direction, can only be LONG or SHORT                                  |
| timestamp      | int64   | yes      | Request timestamp in milliseconds                                              |
| recvWindow     | int64   | no       | Request validity window in milliseconds                                        |

### Response Parameters

| Parameter Name | Type   | Description                                      |
| -------------- | ------ | ------------------------------------------------ |
| code           | int64  | Error code, 0 means success, non-0 means failure |
| msg            | string | Error message                                    |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/cswap/trade-api.html](https://bingx-api.github.io/docs/#/en-us/cswap/trade-api.html)
