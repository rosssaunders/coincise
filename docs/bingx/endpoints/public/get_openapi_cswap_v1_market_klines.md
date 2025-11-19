# GET /openApi/cswap/v1/market/klines

**Source:** [/openApi/cswap/v1/market/klines](https://bingx-api.github.io/docs/)

## Authentication

Not Required (Public Endpoint)

## Get K-line Data

GET /openApi/cswap/v1/market/klines

API KEY permission: No API KEY signature required

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type   | Required | Description                                                                                        |
| -------------- | ------ | -------- | -------------------------------------------------------------------------------------------------- |
| symbol         | string | yes      | Trading pair, e.g., BTC-USD. Please use uppercase letters.                                         |
| interval       | string | yes      | Time interval, optional values are: 1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 6h, 8h, 12h, 1d, 3d, 1w, 1M. |
| startTime      | int64  | no       | Start time, the returned result includes the K-line of this time.                                  |
| endTime        | int64  | no       | End time, the returned result does not include the K-line of this time.                            |
| limit          | int64  | no       | The number of returned results. The default is 500 if not filled, and the maximum is 1000.         |
| timestamp      | int64  | yes      | Request timestamp, in milliseconds.                                                                |
| recvWindow     | int64  | no       | The window of time for which the request is valid, in milliseconds.                                |

### Response Parameters

| Parameter Name | Type   | Description                       |
| -------------- | ------ | --------------------------------- |
| code           | int64  | Status code.                      |
| msg            | string | Description message.              |
| timestamp      | int64  | Response time, Unit: milliseconds |
| data           | List   |                                   |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/cswap/market-api.html](https://bingx-api.github.io/docs/#/en-us/cswap/market-api.html)
