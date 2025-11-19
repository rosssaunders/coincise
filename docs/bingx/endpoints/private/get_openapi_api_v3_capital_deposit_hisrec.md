# GET /openApi/api/v3/capital/deposit/hisrec

**Source:**
[/openApi/api/v3/capital/deposit/hisrec](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Deposit records

GET /openApi/api/v3/capital/deposit/hisrec

rate limitation by UID: 10/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type: request body(application/json)

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

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/spot/wallet-api.html](https://bingx-api.github.io/docs/#/en-us/spot/wallet-api.html)
