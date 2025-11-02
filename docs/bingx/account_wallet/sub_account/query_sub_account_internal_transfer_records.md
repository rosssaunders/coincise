## Query sub-account internal transfer records

GET /openApi/wallets/v1/capital/subAccount/innerTransfer/records

rate limitation by UID: 10/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

This node is used for sub-accounts to query their own internal transfer
records,The user who verifies the signature of this API must be sub-account.

### Request Parameters

| Parameter Name   | Type   | Required | Description                                                                                                                                               |
| ---------------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| coin             | string | yes      | Transfer currency name                                                                                                                                    |
| transferClientId | string | no       | Client's self-defined internal transfer ID. When both platform ID and transferClientId are provided as input, the query will be based on the platform ID. |
| startTime        | long   | no       | Start time                                                                                                                                                |
| endTime          | long   | no       | End time                                                                                                                                                  |
| offset           | int    | no       | Starting record number, default is 0                                                                                                                      |
| limit            | int    | no       | Page size, default is 100, maximum is 1000                                                                                                                |
| timestamp        | int64  | yes      | Request timestamp in milliseconds                                                                                                                         |
| recvWindow       | int64  | no       | Request valid time window, in milliseconds                                                                                                                |

### Response Parameters

| Parameter Name   | Type    | Description                                                                                                                                               |
| ---------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| data             | object  | Internal transfer record list                                                                                                                             |
| total            | int     | Total number of addresses                                                                                                                                 |
| id               | long    | Internal transfer ID                                                                                                                                      |
| coin             | string  | Currency name                                                                                                                                             |
| receiver         | long    | Receiver's UID                                                                                                                                            |
| amount           | decimal | Transfer amount                                                                                                                                           |
| time             | long    | Internal transfer time                                                                                                                                    |
| status           | Integer | Status 4-Pending review 5-Failed 6-Completed                                                                                                              |
| transferClientId | string  | Client's self-defined internal transfer ID. When both platform ID and transferClientId are provided as input, the query will be based on the platform ID. |
| fromUid          | long    | Payer's account                                                                                                                                           |
| recordType       | string  | Out: transfer out record, in: transfer in record                                                                                                          |

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
