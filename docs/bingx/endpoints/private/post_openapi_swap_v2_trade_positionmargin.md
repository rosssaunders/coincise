# POST /openApi/swap/v2/trade/positionMargin

**Source:**
[/openApi/swap/v2/trade/positionMargin](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Modify Isolated Position Margin

POST /openApi/swap/v2/trade/positionMargin

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type    | Required | Description                                                                   |
| -------------- | ------- | -------- | ----------------------------------------------------------------------------- |
| symbol         | string  | yes      | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT          |
| amount         | float64 | yes      | margin funds                                                                  |
| type           | int     | yes      | adjustment direction 1: increase isolated margin, 2: decrease isolated margin |
| positionSide   | string  | no       | Position direction, and only LONG or SHORT can be selected                    |
| positionId     | int64   | no       | Position ID, if it is filled, the system will use the positionId first        |
| timestamp      | int64   | yes      | request timestamp in milliseconds                                             |
| recvWindow     | int64   | no       | Request valid time window value, Unit: milliseconds                           |

### Response Parameters

| Parameter Name | Type    | Description                                                                   |
| -------------- | ------- | ----------------------------------------------------------------------------- |
| code           | int64   | error code, 0 means successfully response, others means response failure      |
| msg            | string  | Error Details Description                                                     |
| amount         | float64 | margin funds                                                                  |
| type           | int     | adjustment direction 1: increase isolated margin, 2: decrease isolated margin |
| positionId     | int64   | Position ID                                                                   |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html)
