## Get sub-account deposit records

GET /openApi/wallets/v1/capital/deposit/subHisrec

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

This node is used for the main user to query the deposit history of the
sub-user. The user who verifies the signature of this API must be main account.

### Request Parameters

| Parameter Name | Type   | Required | Description                                                                                            |
| -------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------ |
| coin           | string | no       | Transfer currency name                                                                                 |
| subUid         | long   | no       | Sub-user UID, when not filled, query the deposit records of all sub-accounts under the parent username |
| status         | int    | no       | Status (0-In progress 6-Chain uploaded 1-Completed)                                                    |
| startTime      | long   | no       | Start time                                                                                             |
| endTime        | long   | no       | End time                                                                                               |
| offset         | int    | no       | Starting record number, default is 0                                                                   |
| limit          | int    | no       | Page size, default is 100, maximum is 1000                                                             |
| txId           | string |          | Transaction ID                                                                                         |
| timestamp      | int64  | yes      | Request timestamp in milliseconds                                                                      |
| recvWindow     | int64  | no       | Request valid time window, in milliseconds                                                             |

### Response Parameters

| Parameter Name     | Type    | Description                                            |
| ------------------ | ------- | ------------------------------------------------------ |
| data               | object  | Internal transfer record list                          |
| total              | int     | Total number of addresses                              |
| subUid             | long    | Sub-account UID                                        |
| amount             | decimal | Transfer amount                                        |
| coin               | string  | Currency name                                          |
| network            | string  | Network name                                           |
| status             | int     | Status (0-In progress 6-Chain uploaded 1-Completed)    |
| address            | string  | Deposit address                                        |
| addressTag         | string  | Deposit address tag                                    |
| txId               | string  | Transaction ID                                         |
| insertTime         | long    | Transaction scan time                                  |
| transferType       | int     | 0-deposit                                              |
| unlockConfirmTimes | int     | Number of confirmations required to unlock the deposit |
| confirmTimes       | int     | Number of confirmations                                |

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
> [https://bingx-api.github.io/docs/#/en-us/common/sub-account](https://bingx-api.github.io/docs/#/en-us/common/sub-account)
