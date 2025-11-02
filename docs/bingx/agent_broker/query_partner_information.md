## Query partner information

GET /openApi/agent/v1/asset/partnerData

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

This api is used to query partner profile data.

- 1.Only supports querying data from the last 3 months.

### Request Parameters

| Parameter Name | Type  | Required | Description                                                                                  |
| -------------- | ----- | -------- | -------------------------------------------------------------------------------------------- |
| uid            | long  | no       | Partner UID                                                                                  |
| startTime      | int64 | yes      | Start time, unit: day, only supports querying the latest 3 months.                           |
| endTime        | int64 | yes      | End time, unit: day, only supports querying the latest 3 months.                             |
| pageIndex      | int64 | yes      |                                                                                              |
| pageSize       | int64 | yes      | the maximum value is 200                                                                     |
| recvWindow     | int64 | no       | Request valid time window value, unit: milliseconds. If not filled, the default is 5 seconds |
| timestamp      | int64 | YES      | request timestamp, unit: millisecond                                                         |

### Response Parameters

| Parameter Name   | Type   | Description                                                               |
| ---------------- | ------ | ------------------------------------------------------------------------- |
| uid              | long   | Partner UID                                                               |
| email            | STRING | Partner mailbox, encrypted status                                         |
| Phone            | STRING | Partner's mobile phone number,Partner's mobile phone number, encrypted    |
| referralType     | int    | Invitation type: 1: direct invitation, 2: indirect invitation             |
| remarks          | STRING | Remarks                                                                   |
| referrerUid      | long   | Superior Uid                                                              |
| language         | STRING | language                                                                  |
| newReferees      | STRING | The number of new invitees during the query period                        |
| firstTrade       | STRING | Number of people who made their first transaction during the query period |
| branchDeposits   | STRING | The amount of channel recharge during the query period                    |
| branchTrading    | STRING | Number of channel transactions during query time                          |
| branchTradingVol | STRING | The transaction amount of the channel during the query period             |
| level            | STRING | level                                                                     |
| commissionRatio  | STRING | Rebate ratio                                                              |

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
