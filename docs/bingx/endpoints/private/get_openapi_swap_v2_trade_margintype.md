# GET /openApi/swap/v2/trade/marginType

**Source:**
[/openApi/swap/v2/trade/marginType](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Query Margin Type

GET /openApi/swap/v2/trade/marginType

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type   | Required | Description                                                          |
| -------------- | ------ | -------- | -------------------------------------------------------------------- |
| symbol         | string | yes      | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT |
| timestamp      | int64  | yes      | request timestamp in milliseconds                                    |
| recvWindow     | int64  | no       | Request valid time window value, Unit: milliseconds                  |

### Response Parameters

| Parameter Name | Type   | Description |
| -------------- | ------ | ----------- |
| marginType     | string | margin mode |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html)
