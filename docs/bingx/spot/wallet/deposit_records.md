## Deposit records

GET /openApi/api/v3/capital/deposit/hisrec

rate limitation by UID: 10/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

### Request Parameters

| Parameter Name | Type   | Required | Description                                         |
| -------------- | ------ | -------- | --------------------------------------------------- |
| coin           | string | no       | coin name                                           |
| status         | int    | no       | Status (0-In progress 6-Chain uploaded 1-Completed) |
| startTime      | LONG   | no       | Starting time1658748648396                          |
| endTime        | LONG   | no       | End Time 1658748648396                              |
| offset         | int    | no       | offset default0                                     |
| limit          | int    | no       | Page size default 1000 cannot exceed 1000           |
| txId           | LONG   |          | transaction id                                      |
| recvWindow     | LONG   | no       | Execution window time, cannot be greater than 60000 |
| timestamp      | LONG   | yes      | current timestamp 1658748648396                     |

### Response Parameters

| Parameter Name | Type    | Description                                         |
| -------------- | ------- | --------------------------------------------------- |
| amount         | DECIMAL | Recharge amount                                     |
| coin           | string  | coin name                                           |
| network        | string  | recharge network                                    |
| status         | int     | Status (0-In progress 6-Chain uploaded 1-Completed) |
| address        | string  | recharge address                                    |
| addressTag     | string  | Remark                                              |
| txId           | LONG    | transaction id                                      |
| insertTime     | LONG    | transaction hour                                    |
| transferType   | LONG    | Transaction Type 0 = Recharge                       |
| unlockConfirm  | LONG    | confirm times for unlocking                         |
| confirmTimes   | LONG    | Network confirmation times                          |
| sourceAddress  | String  | Source address                                      |

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
> [https://bingx-api.github.io/docs/#/en-us/spot/wallet-api.html](https://bingx-api.github.io/docs/#/en-us/spot/wallet-api.html)
