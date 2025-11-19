# GET /openApi/spot/v1/oco/openOrderList

**Source:**
[/openApi/spot/v1/oco/openOrderList](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Query All Open OCO Orders

GET /openApi/spot/v1/oco/openOrderList

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type  | Required | Description                              |
| -------------- | ----- | -------- | ---------------------------------------- |
| pageIndex      | int64 | Yes      | Page number                              |
| pageSize       | int64 | Yes      | Number of items per page                 |
| recvWindow     | int64 | No       | Request validity window, in milliseconds |
| timestamp      | int64 | Yes      | Request timestamp, in milliseconds       |

### Response Parameters

| Parameter Name  | Type    | Description                                             |
| --------------- | ------- | ------------------------------------------------------- |
| transactionTime | int64   | Order time                                              |
| orderId         | string  | Order ID                                                |
| clientOrderId   | string  | User-defined order ID                                   |
| symbol          | string  | Trading pair                                            |
| orderType       | string  | ocoLimit: OCO Limit Order, ocoTps: OCO Stop-Limit Order |
| side            | string  | Trade type, BUY for buy, SELL for sell                  |
| triggerPrice    | float64 | Trigger price                                           |
| price           | float64 | Order price                                             |
| quantity        | float64 | Order quantity                                          |
| orderListId     | string  | OCO order group ID                                      |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/spot/trade-api.html](https://bingx-api.github.io/docs/#/en-us/spot/trade-api.html)
