# POST /openApi/spot/v1/oco/cancel

**Source:** [/openApi/spot/v1/oco/cancel](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Cancel an OCO Order List

POST /openApi/spot/v1/oco/cancel

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Spot Trading

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type   | Required | Description                                                                                                |
| -------------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------- |
| orderId        | string | No       | The order ID of the limit order or the stop-limit order. Either orderId or clientOrderId must be provided. |
| clientOrderId  | string | No       | The User-defined order ID of the limit order or the stop-limit order                                       |
| recvWindow     | int64  | No       | Request validity window, in milliseconds                                                                   |
| timestamp      | int64  | Yes      | Request timestamp, in milliseconds                                                                         |

### Response Parameters

| Parameter Name | Type   | Description           |
| -------------- | ------ | --------------------- |
| orderId        | string | Order ID              |
| clientOrderId  | string | User-defined order ID |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/spot/trade-api.html](https://bingx-api.github.io/docs/#/en-us/spot/trade-api.html)
