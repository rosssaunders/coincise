# GET /openApi/cswap/v1/user/balance

**Source:** [/openApi/cswap/v1/user/balance](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Query Account Assets

GET /openApi/cswap/v1/user/balance

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type   | Required | Description                                        |
| -------------- | ------ | -------- | -------------------------------------------------- |
| symbol         | string | No       | Trading pair, e.g. BTC-USD, use uppercase letters  |
| timestamp      | int64  | Yes      | Request timestamp, unit: millisecond               |
| recvWindow     | int64  | No       | Request valid time window value, unit: millisecond |

### Response Parameters

| Parameter Name | Type   | Description                                       |
| -------------- | ------ | ------------------------------------------------- |
| code           | int32  | Status code                                       |
| msg            | string | Description message                               |
| timestamp      | int64  | Response generation time point, unit: millisecond |
| data           | List   | Asset list                                        |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/cswap/trade-api.html](https://bingx-api.github.io/docs/#/en-us/cswap/trade-api.html)
