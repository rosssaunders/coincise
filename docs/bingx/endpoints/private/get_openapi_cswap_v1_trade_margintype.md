# GET /openApi/cswap/v1/trade/marginType

**Source:**
[/openApi/cswap/v1/trade/marginType](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Query Margin Type

GET /openApi/cswap/v1/trade/marginType

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type   | Required | Description                                               |
| -------------- | ------ | -------- | --------------------------------------------------------- |
| symbol         | string | yes      | Trading pair, e.g., BTC-USD, please use uppercase letters |
| timestamp      | int64  | yes      | Request timestamp in milliseconds                         |
| recvWindow     | int64  | no       | Request validity window in milliseconds                   |

### Response Parameters

| Parameter Name | Type   | Description                          |
| -------------- | ------ | ------------------------------------ |
| symbol         | string | Trading pair                         |
| marginType     | string | Margin type, e.g., CROSSED, ISOLATED |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/cswap/trade-api.html](https://bingx-api.github.io/docs/#/en-us/cswap/trade-api.html)
