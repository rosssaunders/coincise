## Get K-line Data

GET /openApi/cswap/v1/market/klines

API KEY permission: No API KEY signature required

Content-Type:request body(application/json)

- only supports querying K-line data for the last 30 days

rate limitation by IP in group Number: 1

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
> [https://bingx-api.github.io/docs/#/en-us/cswap/market-api.html](https://bingx-api.github.io/docs/#/en-us/cswap/market-api.html)
