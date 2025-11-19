# GET /openApi/api/v3/asset/transferRecord

**Source:**
[/openApi/api/v3/asset/transferRecord](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Asset transfer records new

GET /openApi/api/v3/asset/transferRecord

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Universal Transfer

Content-Type: request body(application/json)

### Request Parameters

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

### Response Parameters

| Parameter Name | Type    | Description                                                                                                                                       |
| -------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| transferId     | string  | transferId                                                                                                                                        |
| asset          | string  | Coin Name                                                                                                                                         |
| amount         | DECIMAL | Transfer Amount                                                                                                                                   |
| fromAccount    | string  | fromAccount, fund：Funding Account spot:Spot Account, stdFutures:Standard Contract, coinMPerp:COIN-M Perpetual Future, USDTMPerp:Perpetual Future |
| toAccount      | string  | toAccount, fund：Funding Account spot:Spot Account, stdFutures:Standard Contract, coinMPerp:COIN-M Perpetual Future, USDTMPerp:Perpetual Future   |
| timestamp      | LONG    | Transfer time stamp                                                                                                                               |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/spot/account-api.html](https://bingx-api.github.io/docs/#/en-us/spot/account-api.html)
