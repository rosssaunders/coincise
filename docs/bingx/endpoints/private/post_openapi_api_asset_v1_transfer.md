# POST /openApi/api/asset/v1/transfer

**Source:** [/openApi/api/asset/v1/transfer](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Asset Transfer New

POST /openApi/api/asset/v1/transfer

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Universal Transfer

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type    | Required | Description                                                                                                                                       |
| -------------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| fromAccount    | string  | yes      | fromAccount, fund：Funding Account spot:Spot Account, stdFutures:Standard Contract, coinMPerp:COIN-M Perpetual Future, USDTMPerp:Perpetual Future |
| toAccount      | string  | 是       | toAccount, fund:Funding Account spot:Spot Account, stdFutures:Standard Contract, coinMPerp:COIN-M Perpetual Future, USDTMPerp:Perpetual Future    |
| asset          | string  | yes      | coin name e.g. USDT                                                                                                                               |
| amount         | DECIMAL | yes      | amount                                                                                                                                            |
| recvWindow     | LONG    | no       | Execution window time, cannot be greater than 60000                                                                                               |
| timestamp      | LONG    | yes      | current timestamp e.g. 1658748648396                                                                                                              |

### Response Parameters

| Parameter Name | Type   | Description |
| -------------- | ------ | ----------- |
| transferId     | string | transfer ID |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/spot/account-api.html](https://bingx-api.github.io/docs/#/en-us/spot/account-api.html)
