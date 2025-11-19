# GET /openApi/account/v1/allAccountBalance

**Source:**
[/openApi/account/v1/allAccountBalance](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Asset overview

GET /openApi/account/v1/allAccountBalance

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type   | Required | Description                                                                                                                                                                                                                                                                                                 |
| -------------- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accountType    | string | 否       | Account type, if left blank, all assets of the account will be checked by default. spot: spot (fund account), stdFutures: standard futures account, coinMPerp: coin base account, USDTMPerp: U base account, copyTrading: copy trading account, grid: grid account, eran: wealth account, c2c: c2c account. |
| timestamp      | int64  | 是       | Request valid time window value, Unit: milliseconds                                                                                                                                                                                                                                                         |
| recvWindow     | int64  | 否       | Timestamp of initiating the request, Unit: milliseconds                                                                                                                                                                                                                                                     |

### Response Parameters

| Parameter Name | Type   | Description                                                                                                                                                                                                                                                                                                 |
| -------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accountType    | string | Account type, if left blank, all assets of the account will be checked by default. spot: spot (fund account), stdFutures: standard futures account, coinMPerp: coin base account, USDTMPerp: U base account, copyTrading: copy trading account, grid: grid account, eran: wealth account, c2c: c2c account. |
| usdtBalance    | string | Equivalent to USDT amount                                                                                                                                                                                                                                                                                   |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/spot/account-api.html](https://bingx-api.github.io/docs/#/en-us/spot/account-api.html)
