## Asset transfer records new

GET /openApi/api/v3/asset/transferRecord

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Universal Transfer

Content-Type:request body(application/json)

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
> [https://bingx-api.github.io/docs/#/en-us/spot/account-api.html](https://bingx-api.github.io/docs/#/en-us/spot/account-api.html)
