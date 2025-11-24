# POST /openApi/cswap/v1/trade/positionMargin

**Source:**
[/openApi/cswap/v1/trade/positionMargin](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Adjust Isolated Margin

POST /openApi/cswap/v1/trade/positionMargin

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type   | Description                                      |
| -------------- | ------ | ------------------------------------------------ |
| code           | int64  | Error code, 0 means success, non-0 means failure |
| msg            | string | Error message                                    |

### Response Parameters

| Parameter Name | Type   | Description                                      |
| -------------- | ------ | ------------------------------------------------ |
| code           | int64  | Error code, 0 means success, non-0 means failure |
| msg            | string | Error message                                    |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/standard/contract-api.html](https://bingx-api.github.io/docs/#/en-us/standard/contract-api.html)
