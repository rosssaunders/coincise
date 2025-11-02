## Get sub-account list

GET /openApi/subAccount/v1/list

rate limitation by UID: 1/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

Through this api, the main user can obtain the UID list of all sub-users and the
status of each sub-account, and can also query the information of the designated
sub-account. The user who verifies the signature of this API must be main
account

### Request Parameters

| Parameter Name   | Type   | Required | Description                                             |
| ---------------- | ------ | -------- | ------------------------------------------------------- |
| subUid           | long   | no       | Sub account uid                                         |
| subAccountString | string | no       | Sub account username                                    |
| isFeeze          | bool   | no       | Freeze or not                                           |
| page             | int    | yes      | Page number, starting with 1                            |
| limit            | int    | yes      | Paging size, maximum 1000                               |
| recvWindow       | int64  | no       | Timestamp of initiating the request, Unit: milliseconds |
| timestamp        | int64  | yes      | Request valid time window value, Unit: milliseconds     |

### Response Parameters

| Parameter Name   | Type   | Description                  |
| ---------------- | ------ | ---------------------------- |
| subUid           | long   | Sub account uid              |
| subAccountString | string | Sub account username         |
| note             | string | Sub account note information |
| freeze           | bool   | Has it been frozen           |
| createTime       | long   | Creation time                |

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
