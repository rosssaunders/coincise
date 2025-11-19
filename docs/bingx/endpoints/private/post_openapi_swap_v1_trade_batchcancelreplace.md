# POST /openApi/swap/v1/trade/batchCancelReplace

**Source:**
[/openApi/swap/v1/trade/batchCancelReplace](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Cancel orders in batches and place orders in batches

POST /openApi/swap/v1/trade/batchCancelReplace

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type   | Required | Description                                         |
| -------------- | ------ | -------- | --------------------------------------------------- |
| batchOrders    | string | yes      | A batch of orders, string form of LIST              |
| timestamp      | int64  | yes      | request timestamp, unit: millisecond                |
| recvWindow     | int64  | no       | Request valid time window value, Unit: milliseconds |

### Response Parameters

| Parameter Name | Type          | Description                                                              |
| -------------- | ------------- | ------------------------------------------------------------------------ |
| code           | Int64         | error code, 0 means successfully response, others means response failure |
| msg            | string        | Error Details Description                                                |
| OrderResponse  | OrderResponse |                                                                          |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html)
