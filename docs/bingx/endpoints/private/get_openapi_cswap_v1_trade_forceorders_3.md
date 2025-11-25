# GET /openApi/cswap/v1/trade/forceOrders

**Source:**
[/openApi/cswap/v1/trade/forceOrders](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Query force orders

GET /openApi/cswap/v1/trade/forceOrders

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type   | Description                                        |
| -------------- | ------ | -------------------------------------------------- |
| code           | int32  | Status code                                        |
| msg            | string | Description information                            |
| timestamp      | int64  | Response generation time point, unit: milliseconds |
| data           | List   | Force order list                                   |

### Response Parameters

| Parameter Name | Type   | Description                                        |
| -------------- | ------ | -------------------------------------------------- |
| code           | int32  | Status code                                        |
| msg            | string | Description information                            |
| timestamp      | int64  | Response generation time point, unit: milliseconds |
| data           | List   | Force order list                                   |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/standard/contract-api.html](https://bingx-api.github.io/docs/#/en-us/standard/contract-api.html)
