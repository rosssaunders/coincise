# POST /openApi/swap/v2/trade/leverage

**Source:** [/openApi/swap/v2/trade/leverage](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Set Leverage

POST /openApi/swap/v2/trade/leverage

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type   | Required | Description                                                                                                                                           |
| -------------- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol         | string | yes      | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT                                                                                  |
| side           | string | yes      | Leverage for long or short positions. In the Hedge mode, LONG for long positions, SHORT for short positions. In the One-way mode, only supports BOTH. |
| timestamp      | int64  | yes      | request timestamp in milliseconds                                                                                                                     |
| leverage       | int64  | yes      | leverage                                                                                                                                              |
| recvWindow     | int64  | no       | Request valid time window value, Unit: milliseconds                                                                                                   |

### Response Parameters

| Parameter Name      | Type   | Description                  |
| ------------------- | ------ | ---------------------------- |
| leverage            | int64  | leverage                     |
| symbol              | string | trading pair                 |
| availableLongVol    | string | Available Long Volume        |
| availableShortVol   | string | Available Short Volume       |
| availableLongVal    | string | Available Long Value         |
| availableShortVal   | string | Available Short Value        |
| maxPositionLongVal  | string | Maximum Position Long Value  |
| maxPositionShortVal | string | Maximum Position Short Value |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html)
