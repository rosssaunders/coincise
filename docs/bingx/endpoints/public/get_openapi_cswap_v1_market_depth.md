# GET /openApi/cswap/v1/market/depth

**Source:** [/openApi/cswap/v1/market/depth](https://bingx-api.github.io/docs/)

## Authentication

Not Required (Public Endpoint)

## Query Depth Data

GET /openApi/cswap/v1/market/depth

API KEY permission: No API KEY signature required

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type   | Required | Description                                                                                                      |
| -------------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------- |
| symbol         | string | yes      | Trading pair, e.g., BTC-USD. Please use uppercase letters.                                                       |
| limit          | int64  | no       | The number of returned results. The default is 20 if not filled, optional values: 5, 10, 20, 50, 100, 500, 1000. |
| timestamp      | int64  | yes      | Request timestamp, in milliseconds.                                                                              |
| recvWindow     | int64  | no       | The window of time for which the request is valid, in milliseconds.                                              |

### Response Parameters

| Parameter Name | Type   | Description                       |
| -------------- | ------ | --------------------------------- |
| code           | int64  | Status code.                      |
| msg            | string | Description message.              |
| timestamp      | int64  | Response time, Unit: milliseconds |
| data           | List   |                                   |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/cswap/market-api.html](https://bingx-api.github.io/docs/#/en-us/cswap/market-api.html)
