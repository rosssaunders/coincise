# GET /openApi/swap/v2/user/commissionRate

**Source:**
[/openApi/swap/v2/user/commissionRate](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Query Trading Commission Rate

GET /openApi/swap/v2/user/commissionRate

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type  | Required | Description                                         |
| -------------- | ----- | -------- | --------------------------------------------------- |
| timestamp      | int64 | yes      | request timestamp, unit: millisecond                |
| recvWindow     | int64 | no       | Request valid time window value, Unit: milliseconds |

### Response Parameters

| Parameter Name      | Type    | Description    |
| ------------------- | ------- | -------------- |
| takerCommissionRate | float64 | taker fee rate |
| makerCommissionRate | float64 | maker fee rate |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/account-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/account-api.html)
