# POST /openApi/cswap/v1/trade/allOpenOrders

**Source:**
[/openApi/cswap/v1/trade/allOpenOrders](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Cancel all orders

POST /openApi/cswap/v1/trade/allOpenOrders

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type   | Description                                        |
| -------------- | ------ | -------------------------------------------------- |
| code           | int32  | Status code                                        |
| msg            | string | Description                                        |
| timestamp      | int64  | Response generation time point, unit: milliseconds |
| data           | Obj    |                                                    |

### Response Parameters

| Parameter Name | Type   | Description                                        |
| -------------- | ------ | -------------------------------------------------- |
| code           | int32  | Status code                                        |
| msg            | string | Description                                        |
| timestamp      | int64  | Response generation time point, unit: milliseconds |
| data           | Obj    |                                                    |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/standard/contract-api.html](https://bingx-api.github.io/docs/#/en-us/standard/contract-api.html)
