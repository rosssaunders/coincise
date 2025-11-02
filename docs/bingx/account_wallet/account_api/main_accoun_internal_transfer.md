## Main Accoun internal transfer

POST /openApi/wallets/v1/capital/innerTransfer/apply

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Withdraw

Content-Type:request body(application/json)

Users can transfer money to each other within the bingx platform. Transfers are
only allowed between main accounts and from main accounts to sub-accounts.

For internal transfers within sub-accounts, please use the dedicated interface:
[User internal transfer](https://bingx-api.github.io/docs/#/en-us/common/account-api.html#User%20internal%20transfer)

### Request Parameters

| Parameter Name   | Type    | Required | Description                                                                                                        |
| ---------------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------ |
| coin             | string  | Yes      | Name of the transferred currency                                                                                   |
| userAccountType  | int     | Yes      | User account type 1=UID 2=phone number 3=email                                                                     |
| userAccount      | string  | Yes      | User account: UID, phone number, email                                                                             |
| amount           | float64 | Yes      | Transfer amount                                                                                                    |
| callingCode      | string  | No       | Area code for telephone, required when userAccountType=2.                                                          |
| walletType       | int     | Yes      | Account type, 1 Fund Account; 2 Standard Futures Account; 3 Perpetual Futures Account                              |
| transferClientId | string  | no       | Custom ID for internal transfer by the client, combination of numbers and letters, length less than 100 characters |
| timestamp        | int64   | Yes      | The timestamp of the request, in milliseconds.                                                                     |
| recvWindow       | int64   | No       | Request validity time window, unit: milliseconds                                                                   |

### Response Parameters

| Parameter Name   | Type   | Description                                                                                                        |
| ---------------- | ------ | ------------------------------------------------------------------------------------------------------------------ |
| id               | string | The platform returns the unique ID of the internal transfer record.                                                |
| transferClientId | string | Custom ID for internal transfer by the client, combination of numbers and letters, length less than 100 characters |

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
> [https://bingx-api.github.io/docs/#/en-us/common/account-api.html](https://bingx-api.github.io/docs/#/en-us/common/account-api.html)
