## Freeze and unfreeze sub-accounts

POST /openApi/subAccount/v1/updateStatus

rate limitation by UID: 1/s & rate limitation by IP in group Number: 2

API KEY permission: Manage Subaccounts

Content-Type:request body(application/json)

This API is used for the main account to freeze and unfreeze the sub-accounts
under the parent user, and the sub-accounts in the frozen state will not be able
to log in and trade. The user who verifies the signature of this API must be
main account

### Request Parameters

| Parameter Name | Type  | Required | Field Description                                       |
| -------------- | ----- | -------- | ------------------------------------------------------- |
| subUid         | long  | yes      | Sub account uid                                         |
| freeze         | bool  | yes      | Whether to freeze the account                           |
| recvWindow     | int64 | no       | Timestamp of initiating the request, Unit: milliseconds |
| timestamp      | int64 | yes      | Request valid time window value, Unit: milliseconds     |

### Response Parameters

| Parameter Name | Type | Field Description  |
| -------------- | ---- | ------------------ |
| subUid         | long | Sub account uid    |
| freeze         | bool | Has it been frozen |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/common/sub-account](https://bingx-api.github.io/docs/#/en-us/common/sub-account)
