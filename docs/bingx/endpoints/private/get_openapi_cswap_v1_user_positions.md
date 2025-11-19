# GET /openApi/cswap/v1/user/positions

**Source:**
[/openApi/cswap/v1/user/positions](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Query warehouse

GET /openApi/cswap/v1/user/positions

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type   | Required | Description                                           |
| -------------- | ------ | -------- | ----------------------------------------------------- |
| symbol         | string | No       | Trading pair, example: BTC-USD, use uppercase letters |
| timestamp      | int64  | Yes      | Request time stamp, unit: millisecond                 |
| recvWindow     | int64  | No       | Request valid time window value, unit: millisecond    |

### Response Parameters

| Parameter Name | Type   | Description                                       |
| -------------- | ------ | ------------------------------------------------- |
| code           | int32  | Status code                                       |
| msg            | string | Description information                           |
| timestamp      | int64  | Response generation time point, unit: millisecond |
| data           | List   | Warehouse list                                    |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/cswap/trade-api.html](https://bingx-api.github.io/docs/#/en-us/cswap/trade-api.html)
