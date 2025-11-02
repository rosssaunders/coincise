## Export fund flow

GET /openApi/swap/v2/user/income/export

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type:request body(application/json)

Export fund flow

- Only keep the last 3 months data.

### Request Parameters

| Parameter Name | Type   | Required | Description                                                                                                          |
| -------------- | ------ | -------- | -------------------------------------------------------------------------------------------------------------------- |
| symbol         | string | no       | trading pair, for example: BTC-USDT                                                                                  |
| incomeType     | string | no       | Fund flow type, optional values:REALIZED_PNL FUNDING_FEE TRADING_FEE INSURANCE_CLEAR TRIAL_FUND ADL SYSTEM_DEDUCTION |
| startTime      | int64  | no       | Start time, unit: millisecond                                                                                        |
| endTime        | int64  | no       | End time, unit: millisecond                                                                                          |
| limit          | int    | no       | Number of returned result sets default value: 100 maximum value: 1000                                                |
| timestamp      | int64  | yes      | request timestamp, unit: millisecond                                                                                 |
| recvWindow     | int64  | no       | Request valid time window value, Unit: milliseconds                                                                  |

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

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/account-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/account-api.html)
