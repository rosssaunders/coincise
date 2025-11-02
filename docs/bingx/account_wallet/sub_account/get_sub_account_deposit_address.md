## Get sub-account deposit address

GET /openApi/wallets/v1/capital/subAccount/deposit/address

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

This endpoint is used for the parent user to query the deposit address of a
specific coin for a child user in the blockchain where the child user is
located. The user who verifies the signature of this API must be main account.

### Request Parameters

| Parameter Name | Type   | Required | Description                                |
| -------------- | ------ | -------- | ------------------------------------------ |
| coin           | string | Yes      | Name of the transfer coin                  |
| subUid         | long   | Yes      | Sub-account UID                            |
| offset         | int    | No       | Starting record number, default is 0       |
| limit          | int    | No       | Page size, default is 100, maximum is 1000 |
| timestamp      | int64  | Yes      | Timestamp of the request in milliseconds   |
| recvWindow     | int64  | No       | Request valid time window, in milliseconds |

### Response Parameters

| Parameter Name    | Type   | Description                                                                              |
| ----------------- | ------ | ---------------------------------------------------------------------------------------- |
| data              | object | List of deposit addresses                                                                |
| total             | int    | Total number of addresses                                                                |
| coin              | string | Coin name                                                                                |
| network           | string | Network name                                                                             |
| address           | string | Deposit address                                                                          |
| addressWithPrefix | string | Deposit address with prefix                                                              |
| tag               | string | Address tag                                                                              |
| status            | int    | 0: Activated, 1: Applied, 2: Not applied                                                 |
| walletType        | int    | 1 for Fund Account, 2 for Standard Account, 3 for Perpetual Account, 15 for Spot Account |

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
