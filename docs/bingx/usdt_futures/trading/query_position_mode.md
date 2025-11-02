## Query position mode

GET /openApi/swap/v1/positionSide/dual

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type:request body(application/json)

Used to get the position mode of perpetual contract, supporting both dual
position mode and single position mode

### Request Parameters

| Parameter Name | Type  | Required | Description                                                  |
| -------------- | ----- | -------- | ------------------------------------------------------------ |
| timestamp      | int64 | Yes      | Timestamp of the request in milliseconds                     |
| recvWindow     | int64 | No       | The window time for the request to be valid, in milliseconds |

### Response Parameters

| Parameter Name   | Type   | Description                                               |
| ---------------- | ------ | --------------------------------------------------------- |
| dualSidePosition | string | "true": dual position mode; "false": single position mode |

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
| 109400     | CATI-USDT,symbol not exist, please verify it in api: /openApi/swap/v2/quote/contracts                                                                        |
| 80020      | risk forbidden                                                                                                                                               |
| 109401     | user has pending orders or position                                                                                                                          |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html)
