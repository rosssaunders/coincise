## Create sub-account

POST /openApi/subAccount/v1/create

rate limitation by UID: 1/s & rate limitation by IP in group Number: 2

API KEY permission: Manage Subaccounts

Content-Type:request body(application/json)

This API is used to create a sub-account, which needs to be implemented through
the API key of the master account. The user who verifies the signature of this
API must be main account.

### Request Parameters

| Parameter Name   | Type   | Required | Field Description                                                                               |
| ---------------- | ------ | -------- | ----------------------------------------------------------------------------------------------- |
| subAccountString | string | yes      | Sub account username(Starting with a letter, containing a number, and longer than 6 characters) |
| note             | string | no       | notes                                                                                           |
| recvWindow       | long   | yes      |                                                                                                 |
| timestamp        | long   | yes      |                                                                                                 |

### Response Parameters

| Parameter Name   | Type   | Field Description            |
| ---------------- | ------ | ---------------------------- |
| subUid           | long   | Sub account uid              |
| subAccountString | string | Sub account username         |
| note             | string | Sub account note information |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/common/sub-account](https://bingx-api.github.io/docs/#/en-us/common/sub-account)
