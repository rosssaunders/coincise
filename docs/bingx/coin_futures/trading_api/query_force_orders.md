## Query force orders

GET /openApi/cswap/v1/trade/forceOrders

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

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

### Errors

| Error Code | Description                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 80014      | timestamp is invalid                                                                                                                                         |
| 100421     | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets |
| 100419     | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set                                                |
| 100410     | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249                          |
| 100410     | rate limited                                                                                                                                                 |
| 100413     | Incorrect apiKey                                                                                                                                             |
| 100410     | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155                              |

> **Source:**
> [https://bingx-api.github.io/docs//#/en-us/cswap/trade-api.html](https://bingx-api.github.io/docs//#/en-us/cswap/trade-api.html)
