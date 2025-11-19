# POST /openApi/swap/v1/trade/getVst

**Source:** [/openApi/swap/v1/trade/getVst](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Apply VST

POST /openApi/swap/v1/trade/getVst

rate limitation by UID: 1/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type  | Required | Description                                     |
| -------------- | ----- | -------- | ----------------------------------------------- |
| timestamp      | int64 | Yes      | Request timestamp in milliseconds               |
| recvWindow     | int64 | No       | Request valid time window value in milliseconds |

### Response Parameters

| Parameter Name | Type   | Description                           |
| -------------- | ------ | ------------------------------------- |
| amount         | flot64 | Amount of VST applied in this request |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html)
