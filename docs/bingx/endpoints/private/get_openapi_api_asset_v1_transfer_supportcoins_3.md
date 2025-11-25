# GET /openApi/api/asset/v1/transfer/supportCoins

**Source:**
[/openApi/api/asset/v1/transfer/supportCoins](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Query transferable currency

GET /openApi/api/asset/v1/transfer/supportCoins

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Universal Transfer

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type   | Required | Description                                                                                                                                       |
| -------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| fromAccount    | string | yes      | fromAccount, fund：Funding Account spot:Spot Account, stdFutures:Standard Contract, coinMPerp:COIN-M Perpetual Future, USDTMPerp:Perpetual Future |
| toAccount      | string | 是       | toAccount, fund:Funding Account spot:Spot Account, stdFutures:Standard Contract, coinMPerp:COIN-M Perpetual Future, USDTMPerp:Perpetual Future    |
| recvWindow     | LONG   | no       | Execution window time, cannot be greater than 60000                                                                                               |
| timestamp      | LONG   | yes      | Current timestamp e.g. 1658748648396                                                                                                              |

### Response Parameters

| Parameter Name | Type  | Description                                             |
| -------------- | ----- | ------------------------------------------------------- |
| coins          | Array | Coin Asset, element fields refer to the following table |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/common/account-api.html](https://bingx-api.github.io/docs/#/en-us/common/account-api.html)
