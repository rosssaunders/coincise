# POST /openApi/cswap/v1/trade/marginType

**Source:**
[/openApi/cswap/v1/trade/marginType](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Set Margin Type

POST /openApi/cswap/v1/trade/marginType

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type   | Required | Description                                               |
| -------------- | ------ | -------- | --------------------------------------------------------- |
| symbol         | string | yes      | Trading pair, e.g., BTC-USD, please use uppercase letters |
| marginType     | string | yes      | Margin type, e.g., ISOLATED, CROSSED                      |
| timestamp      | int64  | yes      | Request timestamp in milliseconds                         |
| recvWindow     | int64  | no       | Request validity window in milliseconds                   |

### Response Parameters

|     | Parameter Name | Type | Description |
| --- | -------------- | ---- | ----------- |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/cswap/trade-api.html](https://bingx-api.github.io/docs/#/en-us/cswap/trade-api.html)
