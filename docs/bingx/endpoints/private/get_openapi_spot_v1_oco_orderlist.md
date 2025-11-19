# GET /openApi/spot/v1/oco/orderList

**Source:** [/openApi/spot/v1/oco/orderList](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Query an OCO Order List

GET /openApi/spot/v1/oco/orderList

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type   | Required | Description                                                                        |
| -------------- | ------ | -------- | ---------------------------------------------------------------------------------- |
| orderListId    | string | No       | OCO order group ID. Either \`orderListId\` or \`clientOrderId\` must be filled in. |
| clientOrderId  | string | No       | User-defined OCO order group ID                                                    |
| recvWindow     | int64  | No       | Request valid time window, in milliseconds                                         |
| timestamp      | int64  | Yes      | Request timestamp, in milliseconds                                                 |

### Response Parameters

| Parameter Name  | Type    | Description                                             |
| --------------- | ------- | ------------------------------------------------------- |
| transactionTime | int64   | Order time                                              |
| orderId         | string  | Order ID                                                |
| clientOrderId   | string  | User-defined order ID                                   |
| symbol          | string  | Trading pair                                            |
| orderType       | string  | ocoLimit: OCO limit order, ocoTps: OCO stop-limit order |
| side            | string  | Order type, BUY for buy, SELL for sell                  |
| triggerPrice    | float64 | Trigger price                                           |
| price           | float64 | Order price                                             |
| quantity        | float64 | Order quantity                                          |
| orderListId     | string  | OCO order group ID                                      |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/spot/trade-api.html](https://bingx-api.github.io/docs/#/en-us/spot/trade-api.html)
