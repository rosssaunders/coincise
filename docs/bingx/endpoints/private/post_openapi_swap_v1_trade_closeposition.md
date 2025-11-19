# POST /openApi/swap/v1/trade/closePosition

**Source:**
[/openApi/swap/v1/trade/closePosition](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Close position by position ID

POST /openApi/swap/v1/trade/closePosition

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type   | Required | Description                                            |
| -------------- | ------ | -------- | ------------------------------------------------------ |
| positionId     | string | yes      | Position ID, will close the position with market price |
| timestamp      | int64  | yes      | Request timestamp, in milliseconds                     |
| recvWindow     | int64  | no       | Request valid time window value, in milliseconds       |

### Response Parameters

| Parameter Name | Type   | Description                                                          |
| -------------- | ------ | -------------------------------------------------------------------- |
| code           | int64  | Error code, 0 indicates success, non-zero indicates abnormal failure |
| msg            | string | Error message prompt                                                 |
| data           | Data   |                                                                      |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html)
