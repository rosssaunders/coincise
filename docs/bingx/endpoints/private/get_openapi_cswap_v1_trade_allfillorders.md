# GET /openApi/cswap/v1/trade/allFillOrders

**Source:**
[/openApi/cswap/v1/trade/allFillOrders](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Query Order Trade Detail

GET /openApi/cswap/v1/trade/allFillOrders

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type   | Required | Description                                        |
| -------------- | ------ | -------- | -------------------------------------------------- |
| orderId        | string | Yes      | Order ID                                           |
| pageIndex      | int64  | No       | Page number, default 1                             |
| pageSize       | int64  | No       | Number per page, default 100, max 1000             |
| timestamp      | int64  | Yes      | Request timestamp, unit: millisecond               |
| recvWindow     | int64  | No       | Request valid time window value, unit: millisecond |

### Response Parameters

| Parameter Name | Type   | Description                                           |
| -------------- | ------ | ----------------------------------------------------- |
| code           | int32  | Status code                                           |
| msg            | string | Description                                           |
| timestamp      | int64  | Response generated timestamp point, unit: millisecond |
| data           | List   | Trade detail list                                     |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/cswap/trade-api.html](https://bingx-api.github.io/docs/#/en-us/cswap/trade-api.html)
