## Asset overview

GET /openApi/account/v1/allAccountBalance

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

### Request Parameters

| Parameter Name | Type   | Required | Description                                                                                                                                                                                                                                                                                                 |
| -------------- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accountType    | string | 否       | Account type, if left blank, all assets of the account will be checked by default. spot: spot (fund account), stdFutures: standard futures account, coinMPerp: coin base account, USDTMPerp: U base account, copyTrading: copy trading account, grid: grid account, eran: wealth account, c2c: c2c account. |
| timestamp      | int64  | 是       | Request valid time window value, Unit: milliseconds                                                                                                                                                                                                                                                         |
| recvWindow     | int64  | 否       | Timestamp of initiating the request, Unit: milliseconds                                                                                                                                                                                                                                                     |

### Response Parameters

| Parameter Name | Type   | Description                                                                                                                                                                                                                                                                                                 |
| -------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accountType    | string | Account type, if left blank, all assets of the account will be checked by default. spot: spot (fund account), stdFutures: standard futures account, coinMPerp: coin base account, USDTMPerp: U base account, copyTrading: copy trading account, grid: grid account, eran: wealth account, c2c: c2c account. |
| usdtBalance    | string | Equivalent to USDT amount                                                                                                                                                                                                                                                                                   |

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
> [https://bingx-api.github.io/docs/#/en-us/common/account-api.html](https://bingx-api.github.io/docs/#/en-us/common/account-api.html)
