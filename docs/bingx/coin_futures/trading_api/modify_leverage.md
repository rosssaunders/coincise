## Modify Leverage

POST /openApi/cswap/v1/trade/leverage

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

### Request Parameters

| Parameter Name | Type   | Required | Description                                                                                                                          |
| -------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| symbol         | string | Yes      | Trading pair, for example: BTC-USD, use capital letters                                                                              |
| side           | string | Yes      | For dual-position mode, the leverage rate of long or short positions. LONG represents long position, SHORT represents short position |
| leverage       | string | Yes      | Leverage rate                                                                                                                        |
| timestamp      | int64  | Yes      | Request timestamp, unit: millisecond                                                                                                 |
| recvWindow     | int64  | No       | Request valid time window value, unit: millisecond                                                                                   |

### Response Parameters

| Parameter Name | Type   | Description                                      |
| -------------- | ------ | ------------------------------------------------ |
| code           | int32  | Status code                                      |
| msg            | string | Description                                      |
| timestamp      | int64  | Response generation timestamp, unit: millisecond |
| data           | List   |                                                  |

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
