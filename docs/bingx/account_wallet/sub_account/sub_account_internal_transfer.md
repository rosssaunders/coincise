## Sub-account internal transfer

POST /openApi/wallets/v1/capital/subAccountInnerTransfer/apply

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Internal Transfers Between Subaccounts

Content-Type:request body(application/json)

Used for transferring funds between sub-accounts within the Bingx platform
(sub-account to sub-account, sub-account to main account). This api cannot be
used for transferring funds within the main account or from the main account to
a sub-account. To initiate transfers within the main account, please use the
dedicated api
[(Main) User Internal Transfer](https://bingx-api.github.io/docs/#/en-us/common/account-api.html#User%20internal%20transfer).

This api requires the main account API KEY permission to be set as 'allow
sub-account transfer'. You can go to
[configure API KEY permissions](https://bingx.com/zh-tw/account/api/).

Note: Before using this interface, please make sure that the corresponding
sub-account has been authorized for internal transfers. You can use the api
[Authorize Sub-Account Internal Transfers](https://bingx-api.github.io/docs/#/en-us/common/sub-account#Authorize%20sub%20account%20internal%20transfer).

### Request Parameters

| Parameter Name  | Type    | Required | Description                                                             |
| --------------- | ------- | -------- | ----------------------------------------------------------------------- |
| coin            | string  | yes      | Transfer currency name                                                  |
| userAccountType | int     | yes      | User account type 1=uid 2=phone number 3=email                          |
| userAccount     | string  | yes      | User account: uid, phone, email                                         |
| amount          | float64 | yes      | Transfer amount                                                         |
| callingCode     | string  | no       | Area code for telephone, required when userAccountType=2.               |
| walletType      | int     | yes      | Account type, 1 fund account; 2. Standard account; 3 perpetual accounts |
| timestamp       | int64   | yes      | The timestamp of the request, in milliseconds                           |
| recvWindow      | int64   | no       | Request valid time empty window value, in milliseconds                  |

### Response Parameters

| Parameter Name | Type   | Description                                                         |
| -------------- | ------ | ------------------------------------------------------------------- |
| id             | string | The platform returns the unique ID of the internal transfer record. |

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
