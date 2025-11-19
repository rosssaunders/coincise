# POST /openApi/wallets/v1/capital/innerTransfer/apply

**Source:**
[/openApi/wallets/v1/capital/innerTransfer/apply](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Main Accoun internal transfer

POST /openApi/wallets/v1/capital/innerTransfer/apply

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Withdraw

Content-Type: request body(application/json)

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

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/spot/account-api.html](https://bingx-api.github.io/docs/#/en-us/spot/account-api.html)
