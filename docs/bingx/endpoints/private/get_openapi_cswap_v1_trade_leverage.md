# GET /openApi/cswap/v1/trade/leverage

**Source:**
[/openApi/cswap/v1/trade/leverage](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Query Leverage

GET /openApi/cswap/v1/trade/leverage

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type   | Required | Description                                        |
| -------------- | ------ | -------- | -------------------------------------------------- |
| symbol         | string | Yes      | Trading pair, e.g. BTC-USD, use uppercase letters  |
| timestamp      | int64  | Yes      | Request timestamp, unit: millisecond               |
| recvWindow     | int64  | No       | Request valid time window value, unit: millisecond |

### Response Parameters

| Parameter Name | Type   | Description                                      |
| -------------- | ------ | ------------------------------------------------ |
| code           | int32  | Status code                                      |
| msg            | string | Description                                      |
| timestamp      | int64  | Response generation timestamp, unit: millisecond |
| data           | List   |                                                  |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/cswap/trade-api.html](https://bingx-api.github.io/docs/#/en-us/cswap/trade-api.html)
