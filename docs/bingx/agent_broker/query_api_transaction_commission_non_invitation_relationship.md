## Query API transaction commission (non-invitation relationship)

GET /openApi/agent/v1/reward/third/commissionDataList

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

Query API transaction commissions, commissions from API transactions for
non-invited relationship users.Broker platform specific.

- 1\. Only supports querying data after December 1, 2023;

- 2\. startTime 'endtime, endtime -startTime' = 7.

- 3.Only supports querying the commissions of users who have no invitation
  relationship but place orders through the corresponding channel API.

### Request Parameters

| Parameter Name    | Type  | Required | Description                                                                                  |
| ----------------- | ----- | -------- | -------------------------------------------------------------------------------------------- |
| uid               | long  | no       | UID of the trading user (non-invitation relationship user)                                   |
| commissionBizType | int   | YES      | 81: perpetual contract trading API commission 82: spot trading API commission                |
| startTime         | date  | YES      | Start timestamp (days), Only supports querying data after December 1, 2023.                  |
| endTime           | date  | YES      | End timestamp (days). Only supports querying data after December 1, 2023.                    |
| pageIndex         | int64 | YES      | Page number for pagination, must be greater than 0                                           |
| pageSize          | int64 | YES      | The number of pages must be greater than 0 and the maximum value is 100                      |
| recvWindow        | int64 | no       | Request valid time window value, unit: milliseconds. If not filled, the default is 5 seconds |
| timestamp         | int64 | YES      | request timestamp, unit: millisecond                                                         |

### Response Parameters

| Parameter Name    | Type   | Description                                                                   |
| ----------------- | ------ | ----------------------------------------------------------------------------- |
| uid               | long   | UID of the trading user (non-invitation relationship user)                    |
| commissionTime    | long   | Commission timestamp, date                                                    |
| tradeVolume       | string | API order amount is discounted in USDT                                        |
| commissionVolume  | string | ebate commission amount in USDT                                               |
| commissionBizType | int    | 81: perpetual contract trading API commission 82: spot trading API commission |

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
