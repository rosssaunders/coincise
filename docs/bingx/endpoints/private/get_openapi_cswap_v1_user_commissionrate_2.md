# GET /openApi/cswap/v1/user/commissionRate

**Source:**
[/openApi/cswap/v1/user/commissionRate](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Query Trade Commission Rate

GET /openApi/cswap/v1/user/commissionRate

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type   | Description                                      |
| -------------- | ------ | ------------------------------------------------ |
| code           | int32  | Status Code                                      |
| msg            | string | Description                                      |
| timestamp      | int64  | Response Generated Time Point, unit: millisecond |
| data           | List   |                                                  |

### Response Parameters

| Parameter Name | Type   | Description                                      |
| -------------- | ------ | ------------------------------------------------ |
| code           | int32  | Status Code                                      |
| msg            | string | Description                                      |
| timestamp      | int64  | Response Generated Time Point, unit: millisecond |
| data           | List   |                                                  |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/standard/contract-api.html](https://bingx-api.github.io/docs/#/en-us/standard/contract-api.html)
