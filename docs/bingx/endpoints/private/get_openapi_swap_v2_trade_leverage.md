# GET /openApi/swap/v2/trade/leverage

**Source:** [/openApi/swap/v2/trade/leverage](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Query Leverage and Available Positions

GET /openApi/swap/v2/trade/leverage

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type   | Required | Description                                                          |
| -------------- | ------ | -------- | -------------------------------------------------------------------- |
| symbol         | string | yes      | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT |
| timestamp      | int64  | yes      | request timestamp in milliseconds                                    |
| recvWindow     | int64  | no       | Request valid time window value, Unit: milliseconds                  |

### Response Parameters

| Parameter Name      | Type   | Description                  |
| ------------------- | ------ | ---------------------------- |
| longLeverage        | int64  | Long position leverage       |
| shortLeverage       | int64  | Short position Leverage      |
| maxLongLeverage     | int64  | Max Long position leverage   |
| maxShortLeverage    | int64  | Max Short position Leverage  |
| availableLongVol    | string | Available Long Volume        |
| availableShortVol   | string | Available Short Volume       |
| availableLongVal    | string | Available Long Value         |
| availableShortVal   | string | Available Short Value        |
| maxPositionLongVal  | string | Maximum Position Long Value  |
| maxPositionShortVal | string | Maximum Position Short Value |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html)
