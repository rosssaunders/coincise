# BingX Account & Wallet API - Account Operations

## Fund Account

### Query Assets

GET /openApi/spot/v1/account/balance

rate limitation by UID: 5/s & rate limitation by IP in group Number: 3

API KEY permission: Read

Content-Type:request body(application/json)

#### Request Parameters

| Parameter Name | Type  | Required | Description                                             |
| -------------- | ----- | -------- | ------------------------------------------------------- |
| recvWindow     | int64 | no       | Timestamp of initiating the request, Unit: milliseconds |
| timestamp      | int64 | yes      | Request valid time window value, Unit: milliseconds     |

#### Response Parameters

| Parameter Name | Type  | Description                                             |
| -------------- | ----- | ------------------------------------------------------- |
| balances       | Array | Asset list, element fields refer to the following table |

#### Order Parameters

| Parameter Name | Type   | Description     |
| -------------- | ------ | --------------- |
| asset          | string | Asset name      |
| displayName    | string | Display Name    |
| free           | string | Available asset |
| locked         | string | Freeze asset    |

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
> [https://bingx-api.github.io/docs/#/en-us/common/account-api.html#Query
> Assets](https://bingx-api.github.io/docs/#/en-us/common/account-api.html#Query
> Assets)

### Asset Transfer

POST /openApi/api/v3/post/asset/transfer

rate limitation by UID: 2/s & rate limitation by IP in group Number: 3

API KEY permission: Universal Transfer

Content-Type:request body(application/json)

[1\. Create Account](https://bingx.com)
[2\. Pass KYC/KYB](https://bingx.com/en-us/account/api/)
[3\. Create API KEY](https://bingx.com/en-us/account/api/)
[4\. Configure API KEY permissions](https://bingx.com/en-us/account/api/)
[5\. Understanding signature authentication](https://bingx-api.github.io/docs/#/en-us/swapV2/authentication.html#Signature%20Description)
_6\. Run the following example code_
[7\. Understand common error codes](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Common%20Error%20Codes)
[8\. Understand rate limitations](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Rate%20limit)
[9\. Understanding request timestamps](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Timestamp)
[10\. Understand fee schedule](https://bingx.com/en-us/support/costs/)
[11\. Understand trading rules](https://bingx.com/en-us/tradeInfo/perpetual/trading-rules/BTC-USDT)

request parameters https://open-api.bingx.com

#### Request Parameters

| Parameter Name | Type    | Required | Description                                         |
| -------------- | ------- | -------- | --------------------------------------------------- |
| type           | ENUM    | yes      | transfer tpye                                       |
| asset          | string  | yes      | coin name e.g. USDT                                 |
| amount         | DECIMAL | yes      | amount                                              |
| recvWindow     | LONG    | no       | Execution window time, cannot be greater than 60000 |
| timestamp      | LONG    | yes      | current timestamp e.g. 1658748648396                |

#### Response Parameters

| Parameter Name | Type | Description    |
| -------------- | ---- | -------------- |
| tranId         | LONG | Transaction ID |

#### Data Parameters

|                   | Description                          |
| ----------------- | ------------------------------------ |
| FUND_SFUTURES     | Funding Account->Standard Contract   |
| SFUTURES_FUND     | Standard Contract->Funding Account   |
| FUND_PFUTURES     | Funding Account->Perpetual Futures   |
| PFUTURES_FUND     | Perpetual Futures->Funding Account   |
| SFUTURES_PFUTURES | Standard Contract->Perpetual Futures |
| PFUTURES_SFUTURES | Perpetual Futures->Standard Contract |

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
> [https://bingx-api.github.io/docs/#/en-us/common/account-api.html#Asset
> Transfer](https://bingx-api.github.io/docs/#/en-us/common/account-api.html#Asset
> Transfer)

### Asset transfer records

GET /openApi/api/v3/asset/transfer

rate limitation by UID: 10/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

#### Request Parameters

| Parameter Name | Type | Required | Description                                         |
| -------------- | ---- | -------- | --------------------------------------------------- |
| type           | ENUM | yes      | transfer type, (query by type or tranId)            |
| tranId         | LONG | no       | transaction ID, (query by type or tranId)           |
| startTime      | LONG | no       | Starting time1658748648396                          |
| endTime        | LONG | no       | End Time 1658748648396                              |
| current        | int  | no       | current page default1                               |
| size           | int  | no       | Page size default 10 can not exceed 100             |
| recvWindow     | LONG | no       | Execution window time, cannot be greater than 60000 |
| timestamp      | LONG | yes      | current timestamp e.g.1658748648396                 |

#### Response Parameters

| Parameter Name | Type    | Description         |
| -------------- | ------- | ------------------- |
| total          | LONG    | total               |
| rows           | Array   | Array               |
| asset          | string  | coin name           |
| amount         | DECIMAL | coin amount         |
| type           | ENUM    | transfer tpye       |
| status         | string  | CONFIRMED           |
| tranId         | LONG    | Transaction ID      |
| timestamp      | LONG    | Transfer time stamp |

#### Data Parameters

|                   | Description                             |
| ----------------- | --------------------------------------- |
| FUND_SFUTURES     | Funding Account->Standard Contract      |
| SFUTURES_FUND     | Standard Contract->Funding Account      |
| FUND_PFUTURES     | Funding Account->Perpetual Futures      |
| PFUTURES_FUND     | Perpetual Futures->Funding Account      |
| SFUTURES_PFUTURES | Standard Contract->Perpetual Futures    |
| PFUTURES_SFUTURES | Perpetual Futures->Standard Contract    |
| FUND_STRADING     | Funding Account -> Grid Account         |
| STRADING_FUND     | Grid Account ->Funding Account          |
| FUND_CTRADING     | Funding Account -> Copy Trade Account   |
| SFUTURES_CTRADING | Standard Contract -> Copy Trade Account |
| PFUTURES_CTRADING | Perpetual Futures -> Copy Trade Account |
| CTRADING_FUND     | Copy Trade Account -> Funding Account   |
| CTRADING_SFUTURES | Copy Trade Account -> Standard Contract |
| CTRADING_PFUTURES | Copy Trade Account -> Perpetual Futures |

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
> [https://bingx-api.github.io/docs/#/en-us/common/account-api.html#Asset
> transfer
> records](https://bingx-api.github.io/docs/#/en-us/common/account-api.html#Asset
> transfer records)

### Main Accoun internal transfer

POST /openApi/wallets/v1/capital/innerTransfer/apply

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Withdraw

Content-Type:request body(application/json)

Users can transfer money to each other within the bingx platform. Transfers are
only allowed between main accounts and from main accounts to sub-accounts.

For internal transfers within sub-accounts, please use the dedicated interface:
[User internal transfer](https://bingx-api.github.io/docs/#/en-us/common/account-api.html#User%20internal%20transfer)

#### Request Parameters

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

#### Response Parameters

| Parameter Name   | Type   | Description                                                                                                        |
| ---------------- | ------ | ------------------------------------------------------------------------------------------------------------------ |
| id               | string | The platform returns the unique ID of the internal transfer record.                                                |
| transferClientId | string | Custom ID for internal transfer by the client, combination of numbers and letters, length less than 100 characters |

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
> [https://bingx-api.github.io/docs/#/en-us/common/account-api.html#Main Accoun
> internal
> transfer](https://bingx-api.github.io/docs/#/en-us/common/account-api.html#Main
> Accoun internal transfer)

### Asset Transfer New

POST /openApi/api/asset/v1/transfer

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Universal Transfer

Content-Type:request body(application/json)

[1\. Create Account](https://bingx.com)
[2\. Pass KYC/KYB](https://bingx.com/en-us/account/api/)
[3\. Create API KEY](https://bingx.com/en-us/account/api/)
[4\. Configure API KEY permissions](https://bingx.com/en-us/account/api/)
[5\. Understanding signature authentication](https://bingx-api.github.io/docs/#/en-us/swapV2/authentication.html#Signature%20Description)
_6\. Run the following example code_
[7\. Understand common error codes](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Common%20Error%20Codes)
[8\. Understand rate limitations](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Rate%20limit)
[9\. Understanding request timestamps](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Timestamp)
[10\. Understand fee schedule](https://bingx.com/en-us/support/costs/)
[11\. Understand trading rules](https://bingx.com/en-us/tradeInfo/perpetual/trading-rules/BTC-USDT)

request parameters https://open-api.bingx.com

#### Request Parameters

| Parameter Name | Type    | Required | Description                                                                                                                                       |
| -------------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| fromAccount    | string  | yes      | fromAccount, fund：Funding Account spot:Spot Account, stdFutures:Standard Contract, coinMPerp:COIN-M Perpetual Future, USDTMPerp:Perpetual Future |
| toAccount      | string  | 是       | toAccount, fund:Funding Account spot:Spot Account, stdFutures:Standard Contract, coinMPerp:COIN-M Perpetual Future, USDTMPerp:Perpetual Future    |
| asset          | string  | yes      | coin name e.g. USDT                                                                                                                               |
| amount         | DECIMAL | yes      | amount                                                                                                                                            |
| recvWindow     | LONG    | no       | Execution window time, cannot be greater than 60000                                                                                               |
| timestamp      | LONG    | yes      | current timestamp e.g. 1658748648396                                                                                                              |

#### Response Parameters

| Parameter Name | Type   | Description |
| -------------- | ------ | ----------- |
| transferId     | string | transfer ID |

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
> [https://bingx-api.github.io/docs/#/en-us/common/account-api.html#Asset
> Transfer
> New](https://bingx-api.github.io/docs/#/en-us/common/account-api.html#Asset
> Transfer New)

### Query transferable currency

GET /openApi/api/asset/v1/transfer/supportCoins

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Universal Transfer

Content-Type:request body(application/json)

#### Request Parameters

| Parameter Name | Type   | Required | Description                                                                                                                                       |
| -------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| fromAccount    | string | yes      | fromAccount, fund：Funding Account spot:Spot Account, stdFutures:Standard Contract, coinMPerp:COIN-M Perpetual Future, USDTMPerp:Perpetual Future |
| toAccount      | string | 是       | toAccount, fund:Funding Account spot:Spot Account, stdFutures:Standard Contract, coinMPerp:COIN-M Perpetual Future, USDTMPerp:Perpetual Future    |
| recvWindow     | LONG   | no       | Execution window time, cannot be greater than 60000                                                                                               |
| timestamp      | LONG   | yes      | Current timestamp e.g. 1658748648396                                                                                                              |

#### Response Parameters

| Parameter Name | Type  | Description                                             |
| -------------- | ----- | ------------------------------------------------------- |
| coins          | Array | Coin Asset, element fields refer to the following table |

#### Order Parameters

| Parameter Name | Type   | Description     |
| -------------- | ------ | --------------- |
| asset          | string | Coin Name       |
| amount         | string | Available Asset |

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
> [https://bingx-api.github.io/docs/#/en-us/common/account-api.html#Query
> transferable
> currency](https://bingx-api.github.io/docs/#/en-us/common/account-api.html#Query
> transferable currency)

### Asset transfer records new

GET /openApi/api/v3/asset/transferRecord

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Universal Transfer

Content-Type:request body(application/json)

#### Request Parameters

| Parameter Name | Type   | Required | Description                                                                                                                                       |
| -------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| fromAccount    | string | no       | fromAccount, fund：Funding Account spot:Spot Account, stdFutures:Standard Contract, coinMPerp:COIN-M Perpetual Future, USDTMPerp:Perpetual Future |
| toAccount      | string | 是       | toAccount, fund:Funding Account spot:Spot Account, stdFutures:Standard Contract, coinMPerp:COIN-M Perpetual Future, USDTMPerp:Perpetual Future    |
| transferId     | string | 否       | transaction ID, (query by fromAccount                                                                                                             | toAccount or transferId) |
| startTime      | LONG   | no       | Starting time1658748648396                                                                                                                        |
| endTime        | LONG   | no       | End Time 1658748648396                                                                                                                            |
| pageIndex      | int    | no       | current page default1                                                                                                                             |
| pageSize       | int    | no       | Page size default 10 can not exceed 100                                                                                                           |
| recvWindow     | LONG   | no       | Execution window time, cannot be greater than 60000                                                                                               |
| timestamp      | LONG   | yes      | current timestamp e.g.1658748648396                                                                                                               |

#### Response Parameters

| Parameter Name | Type    | Description                                                                                                                                       |
| -------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| transferId     | string  | transferId                                                                                                                                        |
| asset          | string  | Coin Name                                                                                                                                         |
| amount         | DECIMAL | Transfer Amount                                                                                                                                   |
| fromAccount    | string  | fromAccount, fund：Funding Account spot:Spot Account, stdFutures:Standard Contract, coinMPerp:COIN-M Perpetual Future, USDTMPerp:Perpetual Future |
| toAccount      | string  | toAccount, fund：Funding Account spot:Spot Account, stdFutures:Standard Contract, coinMPerp:COIN-M Perpetual Future, USDTMPerp:Perpetual Future   |
| timestamp      | LONG    | Transfer time stamp                                                                                                                               |

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
> [https://bingx-api.github.io/docs/#/en-us/common/account-api.html#Asset
> transfer records
> new](https://bingx-api.github.io/docs/#/en-us/common/account-api.html#Asset
> transfer records new)

### Query Fund Account Assets

GET /openApi/fund/v1/account/balance

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Universal Transfer

Content-Type:request body(application/json)

#### Request Parameters

| Parameter Name | Type   | Required | Description                                             |
| -------------- | ------ | -------- | ------------------------------------------------------- |
| asset          | string | 否       | Coin name, return all when not transmitted              |
| recvWindow     | int64  | no       | Timestamp of initiating the request, Unit: milliseconds |
| timestamp      | int64  | yes      | Request valid time window value, Unit: milliseconds     |

#### Response Parameters

| Parameter Name | Type  | Description                                             |
| -------------- | ----- | ------------------------------------------------------- |
| balances       | Array | Asset list, element fields refer to the following table |

#### Order Parameters

| Parameter Name | Type   | Description     |
| -------------- | ------ | --------------- |
| asset          | string | Asset name      |
| displayName    | string | Display Name    |
| free           | string | Available asset |
| locked         | string | Freeze asset    |

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
> [https://bingx-api.github.io/docs/#/en-us/common/account-api.html#Query Fund
> Account
> Assets](https://bingx-api.github.io/docs/#/en-us/common/account-api.html#Query
> Fund Account Assets)

### Main account internal transfer records

GET /openApi/wallets/v1/capital/innerTransfer/records

rate limitation by UID: 10/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

This endpoint is used for the parent user to query their own inner transfer
records. Only available for parent users.

#### Request Parameters

| Parameter Name   | Type   | Required | Description                                                                                                                                               |
| ---------------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id               | string | no       | Internal transfer ID                                                                                                                                      |
| coin             | string | Yes      | Transfer coin name                                                                                                                                        |
| transferClientId | string | no       | Client's self-defined internal transfer ID. When both platform ID and transferClientId are provided as input, the query will be based on the platform ID. |
| startTime        | long   | No       | Start time                                                                                                                                                |
| endTime          | long   | No       | End time                                                                                                                                                  |
| offset           | int    | No       | Starting record number, default is 0                                                                                                                      |
| limit            | int    | No       | Page size, default is 100, maximum is 1000                                                                                                                |
| timestamp        | int64  | Yes      | Request timestamp in milliseconds                                                                                                                         |
| recvWindow       | int64  | No       | Request valid time window in milliseconds                                                                                                                 |

#### Response Parameters

| Parameter Name   | Type    | Description                                                                                                                                               |
| ---------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| data             | object  | Inner transfer records list                                                                                                                               |
| total            | int     | Total number of addresses                                                                                                                                 |
| id               | long    | Inner transfer ID                                                                                                                                         |
| coin             | string  | Coin name                                                                                                                                                 |
| receiver         | long    | Receiver UID                                                                                                                                              |
| amount           | decimal | Transfer amount                                                                                                                                           |
| time             | long    | Internal transfer time                                                                                                                                    |
| status           | Integer | Status 4-Pending review 5-Failed 6-Completed                                                                                                              |
| transferClientId | string  | Client's self-defined internal transfer ID. When both platform ID and transferClientId are provided as input, the query will be based on the platform ID. |
| fromUid          | long    | Payer's account                                                                                                                                           |
| recordType       | string  | Out: transfer out record, in: transfer in record                                                                                                          |

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
> [https://bingx-api.github.io/docs/#/en-us/common/account-api.html#Main account
> internal transfer
> records](https://bingx-api.github.io/docs/#/en-us/common/account-api.html#Main
> account internal transfer records)

### Asset overview

GET /openApi/account/v1/allAccountBalance

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

#### Request Parameters

| Parameter Name | Type   | Required | Description                                                                                                                                                                                                                                                                                                 |
| -------------- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accountType    | string | 否       | Account type, if left blank, all assets of the account will be checked by default. spot: spot (fund account), stdFutures: standard futures account, coinMPerp: coin base account, USDTMPerp: U base account, copyTrading: copy trading account, grid: grid account, eran: wealth account, c2c: c2c account. |
| timestamp      | int64  | 是       | Request valid time window value, Unit: milliseconds                                                                                                                                                                                                                                                         |
| recvWindow     | int64  | 否       | Timestamp of initiating the request, Unit: milliseconds                                                                                                                                                                                                                                                     |

#### Response Parameters

| Parameter Name | Type   | Description                                                                                                                                                                                                                                                                                                 |
| -------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accountType    | string | Account type, if left blank, all assets of the account will be checked by default. spot: spot (fund account), stdFutures: standard futures account, coinMPerp: coin base account, USDTMPerp: U base account, copyTrading: copy trading account, grid: grid account, eran: wealth account, c2c: c2c account. |
| usdtBalance    | string | Equivalent to USDT amount                                                                                                                                                                                                                                                                                   |

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
> [https://bingx-api.github.io/docs/#/en-us/common/account-api.html#Asset
> overview](https://bingx-api.github.io/docs/#/en-us/common/account-api.html#Asset
> overview)

---
