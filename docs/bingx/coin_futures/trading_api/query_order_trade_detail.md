## Query Order Trade Detail

GET /openApi/cswap/v1/trade/allFillOrders

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

### Request Parameters

| Parameter Name | Type   | Required | Description                                        |
| -------------- | ------ | -------- | -------------------------------------------------- |
| orderId        | string | Yes      | Order ID                                           |
| pageIndex      | int64  | No       | Page number, default 1                             |
| pageSize       | int64  | No       | Number per page, default 100, max 1000             |
| timestamp      | int64  | Yes      | Request timestamp, unit: millisecond               |
| recvWindow     | int64  | No       | Request valid time window value, unit: millisecond |

### Response Parameters

| Parameter Name | Type   | Description                                           |
| -------------- | ------ | ----------------------------------------------------- |
| code           | int32  | Status code                                           |
| msg            | string | Description                                           |
| timestamp      | int64  | Response generated timestamp point, unit: millisecond |
| data           | List   | Trade detail list                                     |

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
