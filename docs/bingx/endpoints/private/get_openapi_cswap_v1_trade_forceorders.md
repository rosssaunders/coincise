# GET /openApi/cswap/v1/trade/forceOrders

**Source:**
[/openApi/cswap/v1/trade/forceOrders](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Query force orders

GET /openApi/cswap/v1/trade/forceOrders

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type   | Required | Description                                                                             |
| -------------- | ------ | -------- | --------------------------------------------------------------------------------------- |
| symbol         | string | No       | Trading pair, for example: BTC-USD, use uppercase letters                               |
| autoCloseType  | string | No       | LIQUIDATION:Force order, ADL:Reduce order                                               |
| startTime      | int64  | No       | Start time, unit: milliseconds                                                          |
| endTime        | int64  | No       | End time, unit: milliseconds                                                            |
| limit          | int64  | No       | The number of results in the returned result set, default value: 50, maximum value: 100 |
| timestamp      | int64  | Yes      | Request time stamp, unit: milliseconds                                                  |
| recvWindow     | int64  | No       | Request effective time window value, unit: milliseconds                                 |

### Response Parameters

| Parameter Name | Type   | Description                                        |
| -------------- | ------ | -------------------------------------------------- |
| code           | int32  | Status code                                        |
| msg            | string | Description information                            |
| timestamp      | int64  | Response generation time point, unit: milliseconds |
| data           | List   | Force order list                                   |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/cswap/trade-api.html](https://bingx-api.github.io/docs/#/en-us/cswap/trade-api.html)
