## Create deposit address for sub-account

POST /openApi/wallets/v1/capital/deposit/createSubAddress

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Manage Subaccounts

Content-Type:request body(application/json)

This node is used for the master user to create a recharge address for the
sub-user. Each currency supports only one recharge address, limited to the
master user.The user who verifies the signature of this API must be main
account.

### Request Parameters

| Parameter Name | Type   | Required | Description                                                                  |
| -------------- | ------ | -------- | ---------------------------------------------------------------------------- |
| coin           | string | Yes      | Currency name                                                                |
| subUid         | long   | Yes      | Sub-account UID                                                              |
| network        | string | Yes      | Network name                                                                 |
| walletType     | int    | Yes      | 1：fund account 2：standard futures account，3：USDⓢ-M Perp,15: Spot Account |
| timestamp      | int64  | Yes      | Request timestamp in milliseconds                                            |
| recvWindow     | int64  | No       | Request valid time window, in milliseconds                                   |

### Response Parameters

| Parameter Name    | Type    | Description                                                                              |
| ----------------- | ------- | ---------------------------------------------------------------------------------------- |
| address           | string  | Address                                                                                  |
| addressTag        | string  | Address tag                                                                              |
| addressWithPrefix | string  | Deposit address with prefix                                                              |
| coin              | string  | Currency name                                                                            |
| network           | string  | Network name                                                                             |
| status            | decimal | Address status: 0 for activated, 1 for pending, 2 for not applied                        |
| ts                | long    | Creation time in Unix timestamp format in milliseconds, e.g. 1597026383085               |
| walletType        | int     | 1 for Fund Account, 2 for Standard Account, 3 for Perpetual Account, 15 for Spot Account |

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
