# POST /openApi/swap/v1/trade/autoAddMargin

**Source:**
[/openApi/swap/v1/trade/autoAddMargin](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Hedge mode Position - Automatic Margin Addition

POST /openApi/swap/v1/trade/autoAddMargin

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type   | Required | Description                                                                           |
| -------------- | ------ | -------- | ------------------------------------------------------------------------------------- |
| symbol         | string | Yes      | Trading pair, e.g., BTC-USDT, please use uppercase letters.                           |
| positionId     | int64  | Yes      | Position ID                                                                           |
| functionSwitch | string | Yes      | Whether to enable the automatic margin addition feature, true: enable, false: disable |
| amount         | string | No       | Amount of margin to be added, in USDT. Must be specified when enabling the feature.   |
| timestamp      | int64  | Yes      | Timestamp of the request, in milliseconds.                                            |
| recvWindow     | int64  | No       | Request validity window, in milliseconds.                                             |

### Response Parameters

| Parameter Name | Type   | Description                                                                              |
| -------------- | ------ | ---------------------------------------------------------------------------------------- |
| code           | int64  | Error code, 0 means success, non-zero means failure                                      |
| msg            | string | Error message                                                                            |
| symbol         | string | Trading pair, e.g., BTC-USDT, please use uppercase letters.                              |
| positionId     | int64  | Position ID                                                                              |
| functionSwitch | string | Whether the automatic margin addition feature is enabled, true: enabled, false: disabled |
| amount         | string | Amount of margin added, in USDT                                                          |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html)
