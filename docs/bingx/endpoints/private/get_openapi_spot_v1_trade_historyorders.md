# GET /openApi/spot/v1/trade/historyOrders

**Source:**
[/openApi/spot/v1/trade/historyOrders](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Query Order history

GET /openApi/spot/v1/trade/historyOrders

rate limitation by UID: 10/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type   | Required | Description                                                                                                    |
| -------------- | ------ | -------- | -------------------------------------------------------------------------------------------------------------- |
| symbol         | string | no       | Trading pair, e.g., BTC-USDT                                                                                   |
| orderId        | int64  | no       | If orderId is set, orders >= orderId. Otherwise, the most recent orders will be returned.                      |
| startTime      | int64  | no       | Start timestamp, Unit: ms                                                                                      |
| endTime        | int64  | no       | End timestamp, Unit: ms                                                                                        |
| pageIndex      | int64  | no       | Page number, must >0,If not specified, it defaults to 1. Restriction: pageIndex \* pageSize <= 10,000.         |
| pageSize       | int64  | no       | Page size, must >0,Max 100,If not specified, it defaults to 100. Restriction: pageIndex \* pageSize <= 10,000. |
| status         | string | no       | status: FILLED (fully filled) CANCELED: (canceled) FAILED: (failed)                                            |
| type           | string | no       | order type: MARKET/LIMIT/TAKE_STOP_LIMIT/TAKE_STOP_MARKET/TRIGGER_LIMIT/TRIGGER_MARKET                         |
| recvWindow     | int64  | no       | Request valid time window value, Unit: milliseconds                                                            |
| timestamp      | int64  | yes      | Timestamp of initiating the request, Unit: milliseconds                                                        |

### Response Parameters

| Parameter Name | Type  | Description                                                              |
| -------------- | ----- | ------------------------------------------------------------------------ |
| orders         | Array | Order list,max length is 2000, refer to the table below for order fields |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/spot/trade-api.html](https://bingx-api.github.io/docs/#/en-us/spot/trade-api.html)
