## Query Depth Data

GET /openApi/cswap/v1/market/depth

API KEY permission: No API KEY signature required

Content-Type:request body(application/json)

rate limitation by IP in group Number: 1

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
