## Daily Commission Query（invitation relationship）

GET /openApi/agent/v1/reward/commissionDataList

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

The agent KOL can use this api to query the detailed information of daily
commissions.Only supports querying the commission details of customers with
invitation relationships.

- 1\. Only supports querying data from the last 365 days.

- 2\. startTime < endtime, and endtime - startTime <= 30 days. These are
  required fields.

- 3\. Only supports querying commission information for users with an invitation
  relationship.

### Request Parameters

| Parameter Name | Type   | Required | Description                                                                                                |
| -------------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------- |
| uid            | long   | no       | Invited User UID                                                                                           |
| invitationCode | string |          | Invitation code                                                                                            |
| startTime      | date   | YES      | Start timestamp, in days, with a maximum query window of 30 days and a sliding range of the last 365 days. |
| endTime        | date   | YES      | End timestamp, in days, with a maximum query window of 30 days and a sliding range of the last 365 days.   |
| pageIndex      | int64  | YES      | Page number for pagination, must be greater than 0                                                         |
| pageSize       | int64  | YES      | Page size for pagination, must be greater than 0 with a maximum value of 100.                              |
| recvWindow     | int64  | Yes      | Request valid time window, in milliseconds. Default is 5 seconds if not provided.                          |
| timestamp      | int64  | no       | Request timestamp in milliseconds                                                                          |

### Response Parameters

| Parameter Name          | Type   | Description                                                                                                                 |
| ----------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------- |
| uid                     | long   | Invited User UID                                                                                                            |
| invitationCode          | string | Invitation code                                                                                                             |
| commissionTime          | long   | Commission timestamp, date                                                                                                  |
| tradingVolume           | string | Total trading volume in USDT for Spot, Standard Contract, Perpetual Contract, Copy Trading, and MT5 business lines combined |
| commissionVolume        | string | Commission amount in USDT                                                                                                   |
| spotTradingVolume       | string | Spot transaction amount, discounted to USDT                                                                                 |
| swapTradingVolume       | string | Perpetual contract trading volume, converted into USDT                                                                      |
| stdTradingVolume        | string | Standard contract transaction amount, discounted in USDT                                                                    |
| extCopyTradingVolume    | string | Copy transaction amount, discounted in USDT                                                                                 |
| mt5TradingVolume        | string | MT5 transaction volume, discount USDT                                                                                       |
| spotCommissionVolume    | string | Spot commission rebate amount, discounted in USDT                                                                           |
| swapCommissionVolume    | string | Perpetual contract rebate commission amount, converted into USDT                                                            |
| stdCommissionVolume     | string | Standard contract rebate amount, discounted in USDT                                                                         |
| extCopyCommissionVolume | string | The commission amount for following orders is discounted in USDT                                                            |
| mt5CommissionVolume     | string | MT5 rebate commission amount, discount USDT                                                                                 |

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
> [https://bingx-api.github.io/docs/#/en-us/agent/agent-interface.html](https://bingx-api.github.io/docs/#/en-us/agent/agent-interface.html)
