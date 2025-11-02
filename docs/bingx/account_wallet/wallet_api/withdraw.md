## Withdraw

POST /openApi/wallets/v1/capital/withdraw/apply

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Withdraw

Content-Type:request body(application/json)

Specify user account to initiate coin withdrawal

### Request Parameters

| Parameter Name     | Type    | Required | Description                                                                                                                                                                                                      |
| ------------------ | ------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| coin               | string  | yes      | Coin name                                                                                                                                                                                                        |
| network            | string  | no       | Network name, use default network if not transmitted                                                                                                                                                             |
| address            | string  | yes      | Withdrawal address                                                                                                                                                                                               |
| addressTag         | string  | no       | Tag or memo, some currencies support tag or memo                                                                                                                                                                 |
| amount             | float64 | yes      | Withdrawal amount                                                                                                                                                                                                |
| walletType         | int64   | yes      | Account type: 1 fund account, 2 standard account, 3 perpetual account, 15 spot account.When the funding account balance is insufficient, the system will automatically replenish funds from the spot account.    |
| withdrawOrderId    | string  | no       | Customer-defined withdrawal ID, a combination of numbers and letters, with a length of less than 100 characters                                                                                                  |
| vaspEntityId       | string  | no       | Payment platform information, only KYC=KOR (Korean individual users) must pass this field. List values Bithumb, Coinone, Hexlant, Korbit, Upbit, Others, and select Others if there are no corresponding options |
| recipientLastName  | string  | no       | The recipient's surname is in English, and only KYC=KOR (Korean individual users) must pass this field. No need to fill in when vaspAntityId=Others                                                              |
| recipientFirstName | string  | no       | The recipient's name in English, only KYC=KOR (Korean individual users) must pass this field. No need to fill in when vaspAntityId=Others.                                                                       |
| dateOfbirth        | string  | no       | The payee's date of birth (example 1999-09-09) must be passed as this field only for KYC=KOR (Korean individual users). No need to fill in when vaspAntityId=Others.                                             |
| recvWindow         | int64   | no       | Timestamp of initiating the request, Unit: milliseconds                                                                                                                                                          |
| timestamp          | int64   | yes      | Request valid time window value, Unit: milliseconds                                                                                                                                                              |

### Response Parameters

| Parameter Name  | Type   | Description                                                                                                     |
| --------------- | ------ | --------------------------------------------------------------------------------------------------------------- |
| id              | string | The platform returns the unique ID of the internal transfer record.                                             |
| withdrawOrderId | string | Customer-defined withdrawal ID, a combination of numbers and letters, with a length of less than 100 characters |

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
> [https://bingx-api.github.io/docs/#/en-us/common/wallet-api.html](https://bingx-api.github.io/docs/#/en-us/common/wallet-api.html)
