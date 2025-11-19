# GET /openApi/cswap/v1/market/openInterest

**Source:**
[/openApi/cswap/v1/market/openInterest](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Get Swap Open Positions

GET /openApi/cswap/v1/market/openInterest

API KEY permission: Read

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type   | Required | Description                                                         |
| -------------- | ------ | -------- | ------------------------------------------------------------------- |
| symbol         | string | no       | trading pair, for example: BTC-USD                                  |
| timestamp      | int64  | yes      | Request timestamp, in milliseconds.                                 |
| recvWindow     | int64  | no       | The window of time for which the request is valid, in milliseconds. |

### Response Parameters

| Parameter Name | Type   | Description                       |
| -------------- | ------ | --------------------------------- |
| code           | int64  | Status Code                       |
| msg            | string | Description                       |
| timestamp      | int64  | Response time, Unit: milliseconds |
| data           | List   |                                   |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/cswap/market-api.html](https://bingx-api.github.io/docs/#/en-us/cswap/market-api.html)
