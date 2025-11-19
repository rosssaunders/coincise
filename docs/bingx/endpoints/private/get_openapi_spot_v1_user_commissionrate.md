# GET /openApi/spot/v1/user/commissionRate

**Source:**
[/openApi/spot/v1/user/commissionRate](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Query Trading Commission Rate

GET /openApi/spot/v1/user/commissionRate

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type    | Required | Description                                               |
| -------------- | ------- | -------- | --------------------------------------------------------- |
| symbol         | string  | Yes      | Trading pair, e.g. BTC-USDT, please use uppercase letters |
| recvWindow     | float64 | No       | Request valid time window in milliseconds                 |
| timestamp      | int64   | Yes      | Request timestamp in milliseconds                         |

### Response Parameters

| Parameter Name      | Type    | Description           |
| ------------------- | ------- | --------------------- |
| takerCommissionRate | float64 | Taker commission rate |
| makerCommissionRate | float64 | Maker commission rate |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/spot/trade-api.html](https://bingx-api.github.io/docs/#/en-us/spot/trade-api.html)
