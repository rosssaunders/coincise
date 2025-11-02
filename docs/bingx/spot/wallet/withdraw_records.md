## Withdraw records

GET /openApi/api/v3/capital/withdraw/history

rate limitation by UID: 10/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

### Request Parameters

| Parameter Name  | Type   | Required | Description                                                                                                                                                                       |
| --------------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id              | string | no       | Unique id of the withdrawal record returned by the platform                                                                                                                       |
| coin            | string | no       | coin name                                                                                                                                                                         |
| withdrawOrderId | string | no       | Custom ID, if there is none, this field will not be returned,When both the platform ID and withdraw order ID are passed as parameters, the query will be based on the platform ID |
| status          | int    | no       | 4-Under Review 5-Failed 6-Completed                                                                                                                                               |
| startTime       | LONG   | no       | Starting time1658748648396                                                                                                                                                        |
| endTime         | LONG   | no       | End Time 1658748648396                                                                                                                                                            |
| offset          | int    | no       | offset default0                                                                                                                                                                   |
| limit           | int    | no       | Page size default 1000 cannot exceed 1000                                                                                                                                         |
| txId            | String |          | Withdrawal transaction id                                                                                                                                                         |
| recvWindow      | LONG   | no       | Execution window time, cannot be greater than 60000                                                                                                                               |
| timestamp       | LONG   | yes      | current timestamp e.g.1658748648396                                                                                                                                               |

### Response Parameters

| Parameter Name  | Type    | Description                                                                                                                                                                       |
| --------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address         | string  | address                                                                                                                                                                           |
| amount          | DECIMAL | Withdrawal amount                                                                                                                                                                 |
| applyTime       | Date    | withdraw time                                                                                                                                                                     |
| coin            | string  | coin name                                                                                                                                                                         |
| id              | string  | The id of the withdrawal                                                                                                                                                          |
| withdrawOrderId | string  | Custom ID, if there is none, this field will not be returned,When both the platform ID and withdraw order ID are passed as parameters, the query will be based on the platform ID |
| network         | string  | Withdrawal network                                                                                                                                                                |
| status          | int     | 4-Under Review 5-Failed 6-Completed                                                                                                                                               |
| transactionFee  | string  | handling fee                                                                                                                                                                      |
| confirmNo       | int     | Withdrawal confirmation times                                                                                                                                                     |
| info            | string  | Reason for withdrawal failure                                                                                                                                                     |
| txId            | String  | Withdrawal transaction id                                                                                                                                                         |
| sourceAddress   | String  | Source address                                                                                                                                                                    |
| transferType    | int     | Transfer type: 1 Withdrawal, 2 Internal transfer                                                                                                                                  |
| addressTag      | string  | Some currencies like XRP/XMR allow filling in secondary address tags                                                                                                              |

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
