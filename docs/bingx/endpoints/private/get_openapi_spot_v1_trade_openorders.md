# GET /openApi/spot/v1/trade/openOrders

**Source:**
[/openApi/spot/v1/trade/openOrders](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Current Open Orders

GET /openApi/spot/v1/trade/openOrders

rate limitation by UID: 10/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type    | Required | Description                                                            |
| -------------- | ------- | -------- | ---------------------------------------------------------------------- |
| symbol         | string  | no       | Trading pair, e.g., BTC-USDT,Query all pending orders when left blank. |
| recvWindow     | float64 | no       | Request valid time window value, Unit: milliseconds                    |
| timestamp      | int64   | yes      | Timestamp of initiating the request, Unit: milliseconds                |

### Response Parameters

| Parameter Name | Type  | Description                                                              |
| -------------- | ----- | ------------------------------------------------------------------------ |
| orders         | Array | Order list,max length is 2000, refer to the table below for order fields |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/spot/trade-api.html](https://bingx-api.github.io/docs/#/en-us/spot/trade-api.html)
