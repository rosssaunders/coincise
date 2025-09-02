# BingX Account & Wallet API - Wallet Operations

## Wallet deposits and withdrawals

### Deposit records

GET /openApi/api/v3/capital/deposit/hisrec

rate limitation by UID: 10/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

#### Request Parameters

| Parameter Name | Type   | Required | Description                                         |
| -------------- | ------ | -------- | --------------------------------------------------- |
| coin           | string | no       | coin name                                           |
| status         | int    | no       | Status (0-In progress 6-Chain uploaded 1-Completed) |
| startTime      | LONG   | no       | Starting time1658748648396                          |
| endTime        | LONG   | no       | End Time 1658748648396                              |
| offset         | int    | no       | offset default0                                     |
| limit          | int    | no       | Page size default 1000 cannot exceed 1000           |
| txId           | LONG   |          | transaction id                                      |
| recvWindow     | LONG   | no       | Execution window time, cannot be greater than 60000 |
| timestamp      | LONG   | yes      | current timestamp 1658748648396                     |

#### Response Parameters

| Parameter Name | Type    | Description                                         |
| -------------- | ------- | --------------------------------------------------- |
| amount         | DECIMAL | Recharge amount                                     |
| coin           | string  | coin name                                           |
| network        | string  | recharge network                                    |
| status         | int     | Status (0-In progress 6-Chain uploaded 1-Completed) |
| address        | string  | recharge address                                    |
| addressTag     | string  | Remark                                              |
| txId           | LONG    | transaction id                                      |
| insertTime     | LONG    | transaction hour                                    |
| transferType   | LONG    | Transaction Type 0 = Recharge                       |
| unlockConfirm  | LONG    | confirm times for unlocking                         |
| confirmTimes   | LONG    | Network confirmation times                          |
| sourceAddress  | String  | Source address                                      |

#### Errors

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
> [https://bingx-api.github.io/docs/#/en-us/common/wallet-api.html#Deposit
> records](https://bingx-api.github.io/docs/#/en-us/common/wallet-api.html#Deposit
> records)

### Withdraw records

GET /openApi/api/v3/capital/withdraw/history

rate limitation by UID: 10/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

#### Request Parameters

| Parameter Name  | Type   | Required | Description                                                                                                                                                                       |
| --------------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id              | string | no       | Unique id of the withdrawal record returned by the platform                                                                                                                       |
| coin            | string | no       | coin name                                                                                                                                                                         |
| withdrawOrderId | string | no       | Custom ID, if there is none, this field will not be returned,When both the platform ID and withdraw order ID are passed as parameters, the query will be based on the platform ID |
| status          | int    | no       | 4-Under Review 5-Failed 6-Completed                                                                                                                                               |
| startTime       | LONG   | no       | Starting time1658748648396                                                                                                                                                        |
| endTime         | LONG   | no       | End Time 1658748648396                                                                                                                                                            |
| offset          | int    | no       | offset default0                                                                                                                                                                   |
| limit           | int    | no       | Page size default 1000 cannot exceed 1000                                                                                                                                         |
| txId            | String |          | Withdrawal transaction id                                                                                                                                                         |
| recvWindow      | LONG   | no       | Execution window time, cannot be greater than 60000                                                                                                                               |
| timestamp       | LONG   | yes      | current timestamp e.g.1658748648396                                                                                                                                               |

#### Response Parameters

| Parameter Name  | Type    | Description                                                                                                                                                                       |
| --------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address         | string  | address                                                                                                                                                                           |
| amount          | DECIMAL | Withdrawal amount                                                                                                                                                                 |
| applyTime       | Date    | withdraw time                                                                                                                                                                     |
| coin            | string  | coin name                                                                                                                                                                         |
| id              | string  | The id of the withdrawal                                                                                                                                                          |
| withdrawOrderId | string  | Custom ID, if there is none, this field will not be returned,When both the platform ID and withdraw order ID are passed as parameters, the query will be based on the platform ID |
| network         | string  | Withdrawal network                                                                                                                                                                |
| status          | int     | 4-Under Review 5-Failed 6-Completed                                                                                                                                               |
| transactionFee  | string  | handling fee                                                                                                                                                                      |
| confirmNo       | int     | Withdrawal confirmation times                                                                                                                                                     |
| info            | string  | Reason for withdrawal failure                                                                                                                                                     |
| txId            | String  | Withdrawal transaction id                                                                                                                                                         |
| sourceAddress   | String  | Source address                                                                                                                                                                    |
| transferType    | int     | Transfer type: 1 Withdrawal, 2 Internal transfer                                                                                                                                  |
| addressTag      | string  | Some currencies like XRP/XMR allow filling in secondary address tags                                                                                                              |

#### Errors

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
> [https://bingx-api.github.io/docs/#/en-us/common/wallet-api.html#Withdraw
> records](https://bingx-api.github.io/docs/#/en-us/common/wallet-api.html#Withdraw
> records)

### Query currency deposit and withdrawal data

GET /openApi/wallets/v1/capital/config/getall

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

Get information of coins,And query the limit corresponding to the coins

#### Request Parameters

| Parameter Name | Type   | Required | Description                                                                                                                     |
| -------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------- |
| coin           | string | no       | Coin identification                                                                                                             |
| displayName    | string | 否       | The platform displays the currency pair name for display only. Unlike coins, coins need to be used for withdrawal and recharge. |
| recvWindow     | int64  | no       | Timestamp of initiating the request, Unit: milliseconds                                                                         |
| timestamp      | int64  | yes      | Request valid time window value, Unit: milliseconds                                                                             |

#### Response Parameters

| Parameter Name | Type    | Description                                                                                                                     |
| -------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------- |
| coin           | string  | Coin identification                                                                                                             |
| displayName    | string  | The platform displays the currency pair name for display only. Unlike coins, coins need to be used for withdrawal and recharge. |
| name           | string  | Coin name                                                                                                                       |
| networkList    | Network | Network information                                                                                                             |

#### Data Parameters

|                   | Description                                                          |
| ----------------- | -------------------------------------------------------------------- |
| name              | Network name                                                         |
| network           | Network identification                                               |
| depositEnable     | Whether the currency is enabled for deposit                          |
| depositMin        | Minimum deposit amount                                               |
| minConfirm        | Minimum number of confirmed blocks                                   |
| isDefault         | Is it the default network                                            |
| withdrawEnable    | Is the coin open for withdrawal                                      |
| withdrawFee       | withdraw fee                                                         |
| withdrawMax       | Maximum withdrawal amount(Withdrawal limit)                          |
| withdrawMin       | Minimum withdrawal amount                                            |
| withdrawDesc      | Description of withdrawal                                            |
| withdrawPrecision | Withdrawal precision                                                 |
| depositPrecision  | Deposit precision                                                    |
| contractAddress   | Contract address                                                     |
| needTagOrMemo     | Whether memo or tag is required, true: required, false: not required |

#### Errors

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
> [https://bingx-api.github.io/docs/#/en-us/common/wallet-api.html#Query
> currency deposit and withdrawal
> data](https://bingx-api.github.io/docs/#/en-us/common/wallet-api.html#Query
> currency deposit and withdrawal data)

### Withdraw

POST /openApi/wallets/v1/capital/withdraw/apply

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Withdraw

Content-Type:request body(application/json)

Specify user account to initiate coin withdrawal

#### Request Parameters

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

#### Response Parameters

| Parameter Name  | Type   | Description                                                                                                     |
| --------------- | ------ | --------------------------------------------------------------------------------------------------------------- |
| id              | string | The platform returns the unique ID of the internal transfer record.                                             |
| withdrawOrderId | string | Customer-defined withdrawal ID, a combination of numbers and letters, with a length of less than 100 characters |

#### Errors

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
> [https://bingx-api.github.io/docs/#/en-us/common/wallet-api.html#Withdraw](https://bingx-api.github.io/docs/#/en-us/common/wallet-api.html#Withdraw)

### Main Account Deposit Address

GET /openApi/wallets/v1/capital/deposit/address

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

This endpoint is used for a mother account to query the deposit address of a
specific coin in the blockchain it belongs to. Only available for mother
accounts.

#### Request Parameters

| Parameter Name | Type   | Required | Description                                |
| -------------- | ------ | -------- | ------------------------------------------ |
| coin           | string | Yes      | Name of the coin for transfer              |
| offset         | int    | No       | Starting record number, default is 0       |
| limit          | int    | No       | Page size, default is 100, maximum is 1000 |
| timestamp      | int64  | Yes      | Timestamp of the request in milliseconds   |
| recvWindow     | int64  | No       | Request window validity, in milliseconds   |

#### Response Parameters

| Parameter Name    | Type   | Description                                                                              |
| ----------------- | ------ | ---------------------------------------------------------------------------------------- |
| data              | object | List of deposit addresses                                                                |
| total             | int    | Total number of addresses                                                                |
| coin              | string | Name of the coin                                                                         |
| network           | string | Name of the network                                                                      |
| address           | string | Deposit address                                                                          |
| addressWithPrefix | string | Deposit address with prefix                                                              |
| tag               | string | Address tag                                                                              |
| status            | int    | 0 for activated, 1 for applied, 2 for not applied                                        |
| walletType        | int    | 1 for Fund Account, 2 for Standard Account, 3 for Perpetual Account, 15 for Spot Account |

#### Errors

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
> [https://bingx-api.github.io/docs/#/en-us/common/wallet-api.html#Main Account
> Deposit
> Address](https://bingx-api.github.io/docs/#/en-us/common/wallet-api.html#Main
> Account Deposit Address)

### Deposit risk control records

GET /openApi/wallets/v1/capital/deposit/riskRecords

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

Used to query the recharge records in risk control for users and their
sub-accounts

#### Request Parameters

|     | Parameter Name | Type | Required | Description |
| --- | -------------- | ---- | -------- | ----------- |

#### Response Parameters

| Parameter Name | Type     | Description      |
| -------------- | -------- | ---------------- |
| uid            | string   | User ID          |
| coin           | string   | Currency name    |
| amount         | decimal  | Amount           |
| sourceAddress  | string   | Source address   |
| address        | string   | Recharge address |
| insetTime      | datetime | Creation time    |

#### Errors

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
> [https://bingx-api.github.io/docs/#/en-us/common/wallet-api.html#Deposit risk
> control
> records](https://bingx-api.github.io/docs/#/en-us/common/wallet-api.html#Deposit
> risk control records)

---
