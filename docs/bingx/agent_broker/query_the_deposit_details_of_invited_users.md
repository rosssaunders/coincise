## Query the deposit details of invited users

GET /openApi/agent/v1/asset/depositDetailList

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

Agent KOL can query the deposit details of the corresponding UID within a
certain period of time through this interface.

- 1\. The verification user must be a parent user and have an agent role;

- 2\. The UID queried must be a user directly or indirectly invited by the
  verification user;

- 3\. Currently, only deposit information is supported.

### Request Parameters

| Parameter Name | Type  | Required | Description                                                                                  |
| -------------- | ----- | -------- | -------------------------------------------------------------------------------------------- |
| uid            | long  | YES      | Inviting user UID, must be the parent user UID                                               |
| bizType        | int   | YES      | 1:Deposit                                                                                    |
| startTime      | int64 | YES      | Start timestamp (days), only supports querying the last 90 days of data.                     |
| endTime        | int64 | YES      | End timestamp (days). Only the last 90 days of data can be queried.                          |
| pageIndex      | int64 | YES      | Page number for pagination, must be greater than 0                                           |
| pageSize       | int64 | YES      | The number of pages must be greater than 0 and the maximum value is 100                      |
| recvWindow     | int64 | no       | Request valid time window value, unit: milliseconds. If not filled, the default is 5 seconds |
| timestamp      | int64 | YES      | request timestamp, unit: millisecond                                                         |

### Response Parameters

| Parameter Name       | Type    | Description                                                      |
| -------------------- | ------- | ---------------------------------------------------------------- |
| uid                  | long    | Invited User UID                                                 |
| inviteResult         | boolean | true: invitation relationship,false: non-invitation relationship |
| directInvitation     | boolean | true: Direct invitation, false: Indirect invitation              |
| bizType              | int     | 1:Deposi                                                         |
| bizTime              | long    | event time                                                       |
| assetType            | int     | Operation type breakdown                                         |
| assetTypeName        | string  | Operation type subdivision name                                  |
| currencyName         | string  | Currency                                                         |
| currencyAmountVolume | string  | amount                                                           |

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
