# POST /openApi/swap/v1/positionSide/dual

**Source:**
[/openApi/swap/v1/positionSide/dual](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Set Position Mode

POST /openApi/swap/v1/positionSide/dual

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name   | Type  | Required | Description                                                  |
| ---------------- | ----- | -------- | ------------------------------------------------------------ |
| dualSidePosition | true  | Yes      | "true": dual position mode; "false": single position mode    |
| timestamp        | int64 | Yes      | Timestamp of the request in milliseconds                     |
| recvWindow       | int64 | No       | The window time for the request to be valid, in milliseconds |

### Response Parameters

| Parameter Name   | Type   | Description                                               |
| ---------------- | ------ | --------------------------------------------------------- |
| dualSidePosition | string | "true": dual position mode; "false": single position mode |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html)
