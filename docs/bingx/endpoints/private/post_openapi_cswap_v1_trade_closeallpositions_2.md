# POST /openApi/cswap/v1/trade/closeAllPositions

**Source:**
[/openApi/cswap/v1/trade/closeAllPositions](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Close all positions in bulk

POST /openApi/cswap/v1/trade/closeAllPositions

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type   | Description                                      |
| -------------- | ------ | ------------------------------------------------ |
| code           | int32  | Status code                                      |
| msg            | string | Description                                      |
| timestamp      | int64  | Response generation timestamp, unit: millisecond |
| data           | Obj    |                                                  |

### Response Parameters

| Parameter Name | Type   | Description                                      |
| -------------- | ------ | ------------------------------------------------ |
| code           | int32  | Status code                                      |
| msg            | string | Description                                      |
| timestamp      | int64  | Response generation timestamp, unit: millisecond |
| data           | Obj    |                                                  |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/standard/contract-api.html](https://bingx-api.github.io/docs/#/en-us/standard/contract-api.html)
