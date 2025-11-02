## Invitation code data

GET /openApi/agent/v1/commissionDataList/referralCode

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

Used by agents to directly query the data under the invitation code, including
commission, rebate rate, and other related information.

### Request Parameters

| Parameter Name   | Type   | Required | Description                                                                                                                                                                                                        |
| ---------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| referralCode     | string | no       | Invitation code; if left blank, query all.                                                                                                                                                                         |
| directInvitation | string | YES      | Invitation relationship, true: direct invitation, false: indirect invitation                                                                                                                                       |
| startTime        | Long   | no       | Start time only supports querying data for the most recent year. If neither startTime nor endTime is filled in, the default is to return data for the most recent 7 days. The maximum query time window is 92 days |
| endTime          | Long   | no       | End time only supports querying data for the most recent year. If neither startTime nor endTime is filled in, the default is to return data for the most recent 7 days. The maximum query time window is 92 days   |
| pageIndex        | int64  | no       | Number of pages, default is 1 if not specified                                                                                                                                                                     |
| pageSize         | int64  | no       | Number of pages per page, default is 100 if not specified, maximum is 200                                                                                                                                          |
| recvWindow       | int64  | no       | Request valid time window value, unit: milliseconds                                                                                                                                                                |
| timestamp        | int64  | YES      | Timestamp of the request, in milliseconds                                                                                                                                                                          |

### Response Parameters

| Parameter Name     | Type   | Description                         |
| ------------------ | ------ | ----------------------------------- |
| referralCode       | string | Invitation code                     |
| commissionRatio    | STRING | Commission percentage, unit: %      |
| friendEarn         | STRING | Friend cashback ratio, unit: %      |
| swapFeeDiscount    | STRING | Futures fee discount ratio, unit: % |
| referralNum        | STRING | Number of invitees                  |
| deposited          | STRING | Number of users who have deposited  |
| traded             | STRING | Number of users who have traded     |
| tradingVolume      | STRING | Transaction amount                  |
| fee                | STRING | Fee                                 |
| offsetTradingFees  | STRING | Fee deduction                       |
| payableTradingFees | STRING | Actual transaction fee paid         |
| commission         | STRING | Your commission                     |

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
> [https://bingx-api.github.io/docs/#/en-us/agent/agent-interface.html](https://bingx-api.github.io/docs/#/en-us/agent/agent-interface.html)
