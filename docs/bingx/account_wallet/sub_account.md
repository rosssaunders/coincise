# BingX Account & Wallet API - Sub-Account Management

## Sub-account management

### Create sub-account

POST /openApi/subAccount/v1/create

rate limitation by UID: 1/s & rate limitation by IP in group Number: 2

API KEY permission: Manage Subaccounts

Content-Type:request body(application/json)

This API is used to create a sub-account, which needs to be implemented through
the API key of the master account. The user who verifies the signature of this
API must be main account.

#### Request Parameters

| Parameter Name   | Type   | Required | Field Description                                                                               |
| ---------------- | ------ | -------- | ----------------------------------------------------------------------------------------------- |
| subAccountString | string | yes      | Sub account username(Starting with a letter, containing a number, and longer than 6 characters) |
| note             | string | no       | notes                                                                                           |
| recvWindow       | long   | yes      |                                                                                                 |
| timestamp        | long   | yes      |                                                                                                 |

#### Response Parameters

| Parameter Name   | Type   | Field Description            |
| ---------------- | ------ | ---------------------------- |
| subUid           | long   | Sub account uid              |
| subAccountString | string | Sub account username         |
| note             | string | Sub account note information |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/common/sub-account#Create
> sub-account](https://bingx-api.github.io/docs/#/en-us/common/sub-account#Create
> sub-account)

### Query user API Key permissions

GET /openApi/v1/account/apiPermissions

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

Query the user's APIKEY permissions, which can be used by both main and sub
account.

#### Request Parameters

| Parameter Name | Type  | Required | Description                                             |
| -------------- | ----- | -------- | ------------------------------------------------------- |
| recvWindow     | int64 | no       | Timestamp of initiating the request, Unit: milliseconds |
| timestamp      | int64 | yes      | Request valid time window value, Unit: milliseconds     |

#### Response Parameters

| Parameter Name | Type   | Description                                                                                                                                           |
| -------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| apiKey         | String | apiKey                                                                                                                                                |
| permissions    | array  | Permissions, 1-spot trading, 2-reading, 3-professional contract trading, 4-universal transfer, 5-coin withdrawal, 7-allow transfer within sub-account |
| ipAddresses    | array  | ip whitelist                                                                                                                                          |
| note           | String | Remark                                                                                                                                                |

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

> **Source:** [https://bingx-api.github.io/docs/#/en-us/common/sub-account#Query
> user API Key
> permissions](https://bingx-api.github.io/docs/#/en-us/common/sub-account#Query
> user API Key permissions)

### Query account uid

GET /openApi/account/v1/uid

rate limitation by UID: 10/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

Query account uid,which can be used by both main and sub account.

#### Request Parameters

| Parameter Name | Type  | Required | Description                                             |
| -------------- | ----- | -------- | ------------------------------------------------------- |
| recvWindow     | int64 | no       | Timestamp of initiating the request, Unit: milliseconds |
| timestamp      | int64 | yes      | Request valid time window value, Unit: milliseconds     |

#### Response Parameters

| Parameter Name | Type | Description |
| -------------- | ---- | ----------- |
| uid            | long | uid         |

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

> **Source:** [https://bingx-api.github.io/docs/#/en-us/common/sub-account#Query
> account uid](https://bingx-api.github.io/docs/#/en-us/common/sub-account#Query
> account uid)

### Get sub-account list

GET /openApi/subAccount/v1/list

rate limitation by UID: 1/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

Through this api, the main user can obtain the UID list of all sub-users and the
status of each sub-account, and can also query the information of the designated
sub-account. The user who verifies the signature of this API must be main
account

#### Request Parameters

| Parameter Name   | Type   | Required | Description                                             |
| ---------------- | ------ | -------- | ------------------------------------------------------- |
| subUid           | long   | no       | Sub account uid                                         |
| subAccountString | string | no       | Sub account username                                    |
| isFeeze          | bool   | no       | Freeze or not                                           |
| page             | int    | yes      | Page number, starting with 1                            |
| limit            | int    | yes      | Paging size, maximum 1000                               |
| recvWindow       | int64  | no       | Timestamp of initiating the request, Unit: milliseconds |
| timestamp        | int64  | yes      | Request valid time window value, Unit: milliseconds     |

#### Response Parameters

| Parameter Name   | Type   | Description                  |
| ---------------- | ------ | ---------------------------- |
| subUid           | long   | Sub account uid              |
| subAccountString | string | Sub account username         |
| note             | string | Sub account note information |
| freeze           | bool   | Has it been frozen           |
| createTime       | long   | Creation time                |

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

> **Source:** [https://bingx-api.github.io/docs/#/en-us/common/sub-account#Get
> sub-account
> list](https://bingx-api.github.io/docs/#/en-us/common/sub-account#Get
> sub-account list)

### Query sub-account Fund Account

GET /openApi/subAccount/v1/assets

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

To check the balance of the Fund Account of each currency of the sub-account.
The user who verifies the signature of this API must be main account

#### Request Parameters

| Parameter Name | Type  | Required | Description                                             |
| -------------- | ----- | -------- | ------------------------------------------------------- |
| subUid         | long  | yes      | Sub account uid                                         |
| recvWindow     | int64 | no       | Timestamp of initiating the request, Unit: milliseconds |
| timestamp      | int64 | yes      | Request valid time window value, Unit: milliseconds     |

#### Response Parameters

| Parameter Name | Type   | Description     |
| -------------- | ------ | --------------- |
| asset          | string | Asset Name      |
| free           | double | Available limit |
| locked         | double | Lock in assets  |

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

> **Source:** [https://bingx-api.github.io/docs/#/en-us/common/sub-account#Query
> sub-account Fund
> Account](https://bingx-api.github.io/docs/#/en-us/common/sub-account#Query
> sub-account Fund Account)

### Create an API Key for a sub-account

POST /openApi/subAccount/v1/apiKey/create

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Manage Subaccounts

Content-Type:request body(application/json)

This API is used to create an API key for a sub-user of the main account. The
user who verifies the signature of this API must be main account

#### Request Parameters

| Parameter Name | Type   | Required | Field Description                                                                                                                           |
| -------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| subUid         | long   | yes      | Sub account uid                                                                                                                             |
| note           | string | yes      | notes                                                                                                                                       |
| permissions    | Array  | yes      | permissions，1-Spot Trading，2-Read，3-Perpetual Futures Trading,4-Universal Transfer,5-Widthdraw,7-Allow internal transfer of sub accounts |
| ipAddresses    | Array  | no       | IP whitelist                                                                                                                                |
| recvWindow     | int64  | no       | Timestamp of initiating the request, Unit: milliseconds                                                                                     |
| timestamp      | int64  | yes      | Request valid time window value, Unit: milliseconds                                                                                         |

#### Response Parameters

| Parameter Name | Type   | Field Description                                                                                                                 |
| -------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------- |
| apiKey         | string | apiKey                                                                                                                            |
| apiSecret      | string | apiSecret                                                                                                                         |
| permissions    | Array  | permissions，1-Spot Trading，2-Read，3-Perpetual Futures Trading，4-Universal Transfer，7-Allow internal transfer of sub accounts |
| ipAddresses    | Array  | IP whitelist                                                                                                                      |
| note           | string | notes                                                                                                                             |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/common/sub-account#Create an API Key
> for a
> sub-account](https://bingx-api.github.io/docs/#/en-us/common/sub-account#Create
> an API Key for a sub-account)

### Query the API Key of a sub-account

GET /openApi/account/v1/apiKey/query

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

This interface is used by the main account to query its own API key information,
and the main user to query the API key information of the sub-user. The user who
verifies the signature of this API must be main account.

#### Request Parameters

| Parameter Name | Type   | Required | Description                                             |
| -------------- | ------ | -------- | ------------------------------------------------------- |
| uid            | long   | yes      | User uid                                                |
| apiKey         | string | no       |                                                         |
| recvWindow     | int64  | no       | Timestamp of initiating the request, Unit: milliseconds |
| timestamp      | int64  | yes      | Request valid time window value, Unit: milliseconds     |

#### Response Parameters

| Parameter Name | Type   | Description                                                                                                                       |
| -------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------- |
| apiKey         | string |                                                                                                                                   |
| note           | string | notes                                                                                                                             |
| permissions    | Array  | permissions，1-Spot Trading，2-Read，3-Perpetual Futures Trading，4-Universal Transfer，7-Allow internal transfer of sub accounts |
| ipAddresses    | Array  | IP whitelist                                                                                                                      |
| createTime     | long   | Creation time                                                                                                                     |
| updateTime     | long   | update time                                                                                                                       |

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

> **Source:** [https://bingx-api.github.io/docs/#/en-us/common/sub-account#Query
> the API Key of a
> sub-account](https://bingx-api.github.io/docs/#/en-us/common/sub-account#Query
> the API Key of a sub-account)

### Reset the API Key of a sub-account

POST /openApi/subAccount/v1/apiKey/edit

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Manage Subaccounts

Content-Type:request body(application/json)

This API is used for the main account to edit the API key remarks, permissions,
and IP addresses of the sub-account. The user who verifies the signature of this
API must be main account

#### Request Parameters

| Parameter Name | Type   | Required | Field Description                                                                                                                 |
| -------------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------- |
| subUid         | long   | yes      | Sub account uid                                                                                                                   |
| apiKey         | string | yes      |                                                                                                                                   |
| note           | string | yes      | notes                                                                                                                             |
| permissions    | Array  | yes      | permissions，1-Spot Trading，2-Read，3-Perpetual Futures Trading，4-Universal Transfer，7-Allow internal transfer of sub accounts |
| ipAddresses    | Array  | no       | IP whitelist                                                                                                                      |
| recvWindow     | int64  | no       | Timestamp of initiating the request, Unit: milliseconds                                                                           |
| timestamp      | int64  | yes      | Request valid time window value, Unit: milliseconds                                                                               |

#### Response Parameters

| Parameter Name | Type   | Field Description                                                                                                                 |
| -------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------- |
| permissions    | Array  | permissions，1-Spot Trading，2-Read，3-Perpetual Futures Trading，4-Universal Transfer，7-Allow internal transfer of sub accounts |
| ipAddresses    | Array  | IP whitelist                                                                                                                      |
| note           | string | notes                                                                                                                             |

> **Source:** [https://bingx-api.github.io/docs/#/en-us/common/sub-account#Reset
> the API Key of a
> sub-account](https://bingx-api.github.io/docs/#/en-us/common/sub-account#Reset
> the API Key of a sub-account)

### Delete the API Key of sub-accounts

POST /openApi/subAccount/v1/apiKey/del

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Manage Subaccounts

Content-Type:request body(application/json)

This API is used for the main user to delete the API key of the sub-account. The
user who verifies the signature of this API must be main account

#### Request Parameters

| Parameter Name | Type   | Required | Field Description                                       |
| -------------- | ------ | -------- | ------------------------------------------------------- |
| subUid         | long   | yes      | Sub account uid                                         |
| apiKey         | string | yes      |                                                         |
| recvWindow     | int64  | no       | Timestamp of initiating the request, Unit: milliseconds |
| timestamp      | int64  | yes      | Request valid time window value, Unit: milliseconds     |

#### Response Parameters

| Parameter Name | Type | Field Description |
| -------------- | ---- | ----------------- |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/common/sub-account#Delete the API
> Key of
> sub-accounts](https://bingx-api.github.io/docs/#/en-us/common/sub-account#Delete
> the API Key of sub-accounts)

### Freeze and unfreeze sub-accounts

POST /openApi/subAccount/v1/updateStatus

rate limitation by UID: 1/s & rate limitation by IP in group Number: 2

API KEY permission: Manage Subaccounts

Content-Type:request body(application/json)

This API is used for the main account to freeze and unfreeze the sub-accounts
under the parent user, and the sub-accounts in the frozen state will not be able
to log in and trade. The user who verifies the signature of this API must be
main account

#### Request Parameters

| Parameter Name | Type  | Required | Field Description                                       |
| -------------- | ----- | -------- | ------------------------------------------------------- |
| subUid         | long  | yes      | Sub account uid                                         |
| freeze         | bool  | yes      | Whether to freeze the account                           |
| recvWindow     | int64 | no       | Timestamp of initiating the request, Unit: milliseconds |
| timestamp      | int64 | yes      | Request valid time window value, Unit: milliseconds     |

#### Response Parameters

| Parameter Name | Type | Field Description  |
| -------------- | ---- | ------------------ |
| subUid         | long | Sub account uid    |
| freeze         | bool | Has it been frozen |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/common/sub-account#Freeze and
> unfreeze
> sub-accounts](https://bingx-api.github.io/docs/#/en-us/common/sub-account#Freeze
> and unfreeze sub-accounts)

### Authorize sub-account internal transfers

POST /openApi/account/v1/innerTransfer/authorizeSubAccount

rate limitation by UID: 10/s & rate limitation by IP in group Number: 2

API KEY permission: Manage Subaccounts

Content-Type:request body(application/json)

It is used for the main account to set the asset transfer permission of
sub-account in batches, so that the sub-account with this permission can
transfer assets to other accounts under the name of the main account through the
transfer interface. By default, the main account can transfer assets to
sub-account, and the sub-account can transfer assets to the main account by
default, without separate settings. The user who verifies the signature of this
API must be main account

#### Request Parameters

| Parameter Name | Type    | Required | Description                                             |
| -------------- | ------- | -------- | ------------------------------------------------------- |
| subUids        | string  | yes      | User uid list, comma separated                          |
| transferable   | boolean | yes      | Is it allowed? True allows false prohibits              |
| recvWindow     | int64   | no       | Timestamp of initiating the request, Unit: milliseconds |
| timestamp      | int64   | yes      | Request valid time window value, Unit: milliseconds     |

#### Response Parameters

| Parameter Name | Type    | Description |
| -------------- | ------- | ----------- | ------------------------------------------------------- |
| subUids        | string  | yes         | User uid list, comma separated                          |
| transferable   | boolean | yes         | Is it allowed? True allows false prohibits              |
| recvWindow     | int64   | no          | Timestamp of initiating the request, Unit: milliseconds |
| timestamp      | int64   | yes         | Request valid time window value, Unit: milliseconds     |

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
> [https://bingx-api.github.io/docs/#/en-us/common/sub-account#Authorize
> sub-account internal
> transfers](https://bingx-api.github.io/docs/#/en-us/common/sub-account#Authorize
> sub-account internal transfers)

### Sub-account internal transfer

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

#### Request Parameters

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

#### Response Parameters

| Parameter Name | Type   | Description                                                         |
| -------------- | ------ | ------------------------------------------------------------------- |
| id             | string | The platform returns the unique ID of the internal transfer record. |

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
> [https://bingx-api.github.io/docs/#/en-us/common/sub-account#Sub-account
> internal
> transfer](https://bingx-api.github.io/docs/#/en-us/common/sub-account#Sub-account
> internal transfer)

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
| transferClientId | string  | no       | Custom ID for internal transfer by the client, combination of numbers and letters, length less than 100 characters |
| walletType       | int     | Yes      | Account type, 1 Fund Account; 2 Standard Futures Account; 3 Perpetual Futures Account                              |
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

> **Source:** [https://bingx-api.github.io/docs/#/en-us/common/sub-account#Main
> Accoun internal
> transfer](https://bingx-api.github.io/docs/#/en-us/common/sub-account#Main
> Accoun internal transfer)

### Create deposit address for sub-account

POST /openApi/wallets/v1/capital/deposit/createSubAddress

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Manage Subaccounts

Content-Type:request body(application/json)

This node is used for the master user to create a recharge address for the
sub-user. Each currency supports only one recharge address, limited to the
master user.The user who verifies the signature of this API must be main
account.

#### Request Parameters

| Parameter Name | Type   | Required | Description                                                 |
| -------------- | ------ | -------- | ----------------------------------------------------------- |
| coin           | string | Yes      | Currency name                                               |
| subUid         | long   | Yes      | Sub-account UID                                             |
| network        | string | Yes      | Network name                                                |
| walletType     | int    | Yes      | 1：fund account 2：standard futures account，3：USDⓢ-M Perp |
| timestamp      | int64  | Yes      | Request timestamp in milliseconds                           |
| recvWindow     | int64  | No       | Request valid time window, in milliseconds                  |

#### Response Parameters

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
> [https://bingx-api.github.io/docs/#/en-us/common/sub-account#Create deposit
> address for
> sub-account](https://bingx-api.github.io/docs/#/en-us/common/sub-account#Create
> deposit address for sub-account)

### Get sub-account deposit address

GET /openApi/wallets/v1/capital/subAccount/deposit/address

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

This endpoint is used for the parent user to query the deposit address of a
specific coin for a child user in the blockchain where the child user is
located. The user who verifies the signature of this API must be main account.

#### Request Parameters

| Parameter Name | Type   | Required | Description                                |
| -------------- | ------ | -------- | ------------------------------------------ |
| coin           | string | Yes      | Name of the transfer coin                  |
| subUid         | long   | Yes      | Sub-account UID                            |
| offset         | int    | No       | Starting record number, default is 0       |
| limit          | int    | No       | Page size, default is 100, maximum is 1000 |
| timestamp      | int64  | Yes      | Timestamp of the request in milliseconds   |
| recvWindow     | int64  | No       | Request valid time window, in milliseconds |

#### Response Parameters

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

> **Source:** [https://bingx-api.github.io/docs/#/en-us/common/sub-account#Get
> sub-account deposit
> address](https://bingx-api.github.io/docs/#/en-us/common/sub-account#Get
> sub-account deposit address)

### Get sub-account deposit records

GET /openApi/wallets/v1/capital/deposit/subHisrec

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

This node is used for the main user to query the deposit history of the
sub-user. The user who verifies the signature of this API must be main account.

#### Request Parameters

| Parameter Name | Type   | Required | Description                                                                                            |
| -------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------ |
| coin           | string | no       | Transfer currency name                                                                                 |
| subUid         | long   | no       | Sub-user UID, when not filled, query the deposit records of all sub-accounts under the parent username |
| status         | int    | no       | Status (0-In progress 6-Chain uploaded 1-Completed)                                                    |
| startTime      | long   | no       | Start time                                                                                             |
| endTime        | long   | no       | End time                                                                                               |
| offset         | int    | no       | Starting record number, default is 0                                                                   |
| limit          | int    | no       | Page size, default is 100, maximum is 1000                                                             |
| txId           | string |          | Transaction ID                                                                                         |
| timestamp      | int64  | yes      | Request timestamp in milliseconds                                                                      |
| recvWindow     | int64  | no       | Request valid time window, in milliseconds                                                             |

#### Response Parameters

| Parameter Name     | Type    | Description                                            |
| ------------------ | ------- | ------------------------------------------------------ |
| data               | object  | Internal transfer record list                          |
| total              | int     | Total number of addresses                              |
| subUid             | long    | Sub-account UID                                        |
| amount             | decimal | Transfer amount                                        |
| coin               | string  | Currency name                                          |
| network            | string  | Network name                                           |
| status             | int     | Status (0-In progress 6-Chain uploaded 1-Completed)    |
| address            | string  | Deposit address                                        |
| addressTag         | string  | Deposit address tag                                    |
| txId               | string  | Transaction ID                                         |
| insertTime         | long    | Transaction scan time                                  |
| transferType       | int     | 0-deposit                                              |
| unlockConfirmTimes | int     | Number of confirmations required to unlock the deposit |
| confirmTimes       | int     | Number of confirmations                                |

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

> **Source:** [https://bingx-api.github.io/docs/#/en-us/common/sub-account#Get
> sub-account deposit
> records](https://bingx-api.github.io/docs/#/en-us/common/sub-account#Get
> sub-account deposit records)

### Query sub-account internal transfer records

GET /openApi/wallets/v1/capital/subAccount/innerTransfer/records

rate limitation by UID: 10/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

This node is used for sub-accounts to query their own internal transfer
records,The user who verifies the signature of this API must be sub-account.

#### Request Parameters

| Parameter Name   | Type   | Required | Description                                                                                                                                               |
| ---------------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| coin             | string | yes      | Transfer currency name                                                                                                                                    |
| transferClientId | string | no       | Client's self-defined internal transfer ID. When both platform ID and transferClientId are provided as input, the query will be based on the platform ID. |
| startTime        | long   | no       | Start time                                                                                                                                                |
| endTime          | long   | no       | End time                                                                                                                                                  |
| offset           | int    | no       | Starting record number, default is 0                                                                                                                      |
| limit            | int    | no       | Page size, default is 100, maximum is 1000                                                                                                                |
| timestamp        | int64  | yes      | Request timestamp in milliseconds                                                                                                                         |
| recvWindow       | int64  | no       | Request valid time window, in milliseconds                                                                                                                |

#### Response Parameters

| Parameter Name   | Type    | Description                                                                                                                                               |
| ---------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| data             | object  | Internal transfer record list                                                                                                                             |
| total            | int     | Total number of addresses                                                                                                                                 |
| id               | long    | Internal transfer ID                                                                                                                                      |
| coin             | string  | Currency name                                                                                                                                             |
| receiver         | long    | Receiver's UID                                                                                                                                            |
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

> **Source:** [https://bingx-api.github.io/docs/#/en-us/common/sub-account#Query
> sub-account internal transfer
> records](https://bingx-api.github.io/docs/#/en-us/common/sub-account#Query
> sub-account internal transfer records)

### Query Sub-Account Transfer History (For Master Account Operations Only)

GET /openApi/account/transfer/v1/subAccount/asset/transferHistory

API KEY permission: Read

Content-Type:request body(application/json)

Query Sub-Account Transfer History, The user who verifies the signature of this
API must be main account.

rate limitation by IP in group Number: 1

#### Request Parameters

| Parameter Name | Type   | Required | Description                                 |
| -------------- | ------ | -------- | ------------------------------------------- |
| uid            | LONG   | Yes      | UID to query                                |
| type           | ENUM   | No       | Transfer type                               |
| tranId         | STRING | No       | Transfer ID                                 |
| startTime      | LONG   | No       | Start time 1658748648396                    |
| endTime        | LONG   | No       | End time 1658748648396                      |
| pageId         | int    | No       | Current page, default is 1                  |
| pagingSize     | int    | No       | Page size, default is 10, cannot exceed 100 |
| recvWindow     | LONG   | No       | Execution window time, cannot exceed 60000  |
| timestamp      | LONG   | Yes      | Current timestamp, e.g., 1658748648396      |

#### Response Parameters

| Parameter Name | Type    | Description         |
| -------------- | ------- | ------------------- |
| total          | LONG    | Total count         |
| rows           | Array   | Data array          |
| asset          | string  | Name of the asset   |
| amount         | DECIMAL | Amount of the asset |
| type           | ENUM    | Transfer type       |
| status         | string  | CONFIRMED           |
| tranId         | LONG    | Transfer ID         |
| timestamp      | LONG    | Transfer timestamp  |
| fromUid        | LONG    | UID of the sender   |
| toUid          | LONG    | UID of the receiver |

#### Data Parameters

|                               | Description                                                 |
| ----------------------------- | ----------------------------------------------------------- |
| MAIN_CAPITAL_TO_SUB_CAPITAL   | Master account capital to sub-account capital               |
| MAIN_CAPITAL_TO_SUB_CONTRACT  | Master account capital to sub-account contract              |
| MAIN_CAPITAL_TO_SUB_SWAP      | Master account capital to sub-account perpetual swap        |
| MAIN_CONTRACT_TO_SUB_CAPITAL  | Master account contract to sub-account capital              |
| MAIN_CONTRACT_TO_SUB_CONTRACT | Master account contract to sub-account contract             |
| MAIN_CONTRACT_TO_SUB_SWAP     | Master account contract to sub-account perpetual swap       |
| MAIN_SWAP_TO_SUB_CAPITAL      | Master account perpetual swap to sub-account capital        |
| MAIN_SWAP_TO_SUB_CONTRACT     | Master account perpetual swap to sub-account contract       |
| MAIN_SWAP_TO_SUB_SWAP         | Master account perpetual swap to sub-account perpetual swap |
| SUB_CAPITAL_TO_MAIN_CAPITAL   | Sub-account capital to master account capital               |
| SUB_CAPITAL_TO_MAIN_CONTRACT  | Sub-account capital to master account contract              |
| SUB_CAPITAL_TO_MAIN_SWAP      | Sub-account capital to master account perpetual swap        |
| SUB_CONTRACT_TO_MAIN_CAPITAL  | Sub-account contract to master account capital              |
| SUB_CONTRACT_TO_MAIN_CONTRACT | Sub-account contract to master account contract             |
| SUB_CONTRACT_TO_MAIN_SWAP     | Sub-account contract to master account perpetual swap       |
| SUB_SWAP_TO_MAIN_CAPITAL      | Sub-account perpetual swap to master account capital        |
| SUB_SWAP_TO_MAIN_CONTRACT     | Sub-account perpetual swap to master account contract       |
| SUB_SWAP_TO_MAIN_SWAP         | Sub-account perpetual swap to master account perpetual swap |

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

> **Source:** [https://bingx-api.github.io/docs/#/en-us/common/sub-account#Query
> Sub-Account Transfer History (For Master Account Operations
> Only)](https://bingx-api.github.io/docs/#/en-us/common/sub-account#Query
> Sub-Account Transfer History \(For Master Account Operations Only\))

### Query the transferable amount of funds in the parent-child account (only for parent account operations).

POST /openApi/account/transfer/v1/subAccount/transferAsset/supportCoins

API KEY permission: Read

Content-Type:request body(application/json)

Query the transferable amount of funds in the parent-child account, The user who
verifies the signature of this API must be main account.

API Parameters

rate limitation by IP in group Number: 1

#### Request Parameters

| Parameter Name  | Type | Required | Field Description                                                                        |
| --------------- | ---- | -------- | ---------------------------------------------------------------------------------------- |
| fromUid         | LONG | Yes      | Sender UID                                                                               |
| fromAccountType | LONG | Yes      | Sender account type: 1-Fund account; 2-Contract account; 3-Perpetual USD-based account   |
| toUid           | LONG | Yes      | Receiver UID                                                                             |
| toAccountType   | LONG | Yes      | Receiver account type: 1-Fund account; 2-Contract account; 3-Perpetual USD-based account |
| recvWindow      | LONG | No       | Execution window time, cannot exceed 60000                                               |
| timestamp       | LONG | Yes      | Current timestamp, e.g., 1658748648396                                                   |

#### Response Parameters

| Parameter Name  | Type    | Field Description         |
| --------------- | ------- | ------------------------- |
| coins           | ARRAY   | List of supported coins   |
| id              | LONG    | Coin ID                   |
| name            | STRING  | Coin name, e.g., USDT     |
| availableAmount | DECIMAL | Available transfer amount |

> **Source:** [https://bingx-api.github.io/docs/#/en-us/common/sub-account#Query
> the transferable amount of funds in the parent-child account (only for parent
> account
> operations).](https://bingx-api.github.io/docs/#/en-us/common/sub-account#Query
> the transferable amount of funds in the parent-child account \(only for parent
> account operations\).)

### Sub-Account Asset Transfer Interface (For Master Account Operations Only)

POST /openApi/account/transfer/v1/subAccount/transferAsset

API KEY permission: Universal Transfer

Content-Type:request body(application/json)

Sub-Account Asset Transfer Interface , The user who verifies the signature of
this API must be main account.

API Parameters

rate limitation by IP in group Number: 1

#### Request Parameters

| Parameter Name  | Type    | Required | Field Description                                                                        |
| --------------- | ------- | -------- | ---------------------------------------------------------------------------------------- |
| assetName       | string  | Yes      | Name of the asset, e.g., USDT                                                            |
| transferAmount  | DECIMAL | Yes      | Transfer amount                                                                          |
| fromUid         | LONG    | Yes      | Sender UID                                                                               |
| fromType        | LONG    | Yes      | Sender sub/master account type: 1-Master account; 2-Sub-account                          |
| fromAccountType | LONG    | Yes      | Sender account type: 1-Fund account; 2-Contract account; 3-Perpetual USD-based account   |
| toUid           | LONG    | Yes      | Receiver UID                                                                             |
| toType          | LONG    | Yes      | Receiver sub/master account type: 1-Master account; 2-Sub-account                        |
| toAccountType   | LONG    | Yes      | Receiver account type: 1-Fund account; 2-Contract account; 3-Perpetual USD-based account |
| remark          | string  | Yes      | Transfer remark                                                                          |
| recvWindow      | LONG    | No       | Execution window time, cannot exceed 60000                                               |
| timestamp       | LONG    | Yes      | Current timestamp, e.g., 1658748648396                                                   |

#### Response Parameters

| Parameter Name | Type   | Field Description  |
| -------------- | ------ | ------------------ |
| tranId         | STRING | Transfer record ID |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/common/sub-account#Sub-Account Asset
> Transfer Interface (For Master Account Operations
> Only)](https://bingx-api.github.io/docs/#/en-us/common/sub-account#Sub-Account
> Asset Transfer Interface \(For Master Account Operations Only\))

### Batch inquiry of sub account asset overview

GET /openApi/subAccount/v1/allAccountBalance

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

Batch inquiry of sub account asset overview, The user who verifies the signature
of this API must be main account.

#### Request Parameters

| Parameter Name | Type   | Required | Description                                                                                                                                                                                                                                                                                                 |
| -------------- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| subUid         | long   | 否       | Sub account uid                                                                                                                                                                                                                                                                                             |
| accountType    | string | 否       | Account type, if left blank, all assets of the account will be checked by default. spot: spot (fund account), stdFutures: standard futures account, coinMPerp: coin base account, USDTMPerp: U base account, copyTrading: copy trading account, grid: grid account, eran: wealth account, c2c: c2c account. |
| pageIndex      | int64  | 是       | Page number, must be greater than 0                                                                                                                                                                                                                                                                         |
| pageSize       | int64  | 是       | Paging size, must be greater than 0, maximum 10                                                                                                                                                                                                                                                             |
| timestamp      | int64  | 是       | Request valid time window value, Unit: milliseconds                                                                                                                                                                                                                                                         |
| recvWindow     | int64  | 否       | Timestamp of initiating the request, Unit: milliseconds                                                                                                                                                                                                                                                     |

#### Response Parameters

| Parameter Name | Type   | Description                                                                                                                                                                                                                                                                                                 |
| -------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| subUid         | long   | Sub account uid                                                                                                                                                                                                                                                                                             |
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

> **Source:** [https://bingx-api.github.io/docs/#/en-us/common/sub-account#Batch
> inquiry of sub account asset
> overview](https://bingx-api.github.io/docs/#/en-us/common/sub-account#Batch
> inquiry of sub account asset overview)

---
