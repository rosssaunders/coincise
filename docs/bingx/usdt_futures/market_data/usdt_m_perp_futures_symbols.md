## USDT-M Perp Futures symbols

GET /openApi/swap/v2/quote/contracts

API KEY permission: No API KEY signature required

Content-Type:request body(application/json)

rate limitation by IP in group Number: 1

### Request Parameters

| Parameter Name | Type   | Required | Description                                             |
| -------------- | ------ | -------- | ------------------------------------------------------- |
| symbol         | string | no       | trading pair, for example: BTC-USDT                     |
| recvWindow     | int64  | no       | Timestamp of initiating the request, Unit: milliseconds |
| timestamp      | int64  | yes      | Request valid time window value, Unit: milliseconds     |

### Response Parameters

| Parameter Name    | Type    | Description                                                                                                                                                                            |
| ----------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| contractId        | string  | contract ID                                                                                                                                                                            |
| symbol            | string  | trading pair, for example: BTC-USDT                                                                                                                                                    |
| quantityPrecision | int     | transaction quantity precision                                                                                                                                                         |
| pricePrecision    | int     | price precision                                                                                                                                                                        |
| takerFeeRate      | float64 | take transaction fee                                                                                                                                                                   |
| makerFeeRate      | float64 | make transaction fee                                                                                                                                                                   |
| tradeMinQuantity  | float64 | The minimum trading unit(COIN)                                                                                                                                                         |
| tradeMinUSDT      | float64 | The minimum trading unit(USDT)                                                                                                                                                         |
| currency          | string  | settlement and margin currency asset                                                                                                                                                   |
| asset             | string  | contract trading asset                                                                                                                                                                 |
| status            | int     | 1 online, 25 forbidden to open positions, 5 pre-online, 0 offline                                                                                                                      |
| apiStateOpen      | string  | Whether the API can open a position                                                                                                                                                    |
| apiStateClose     | string  | Whether API can close positions                                                                                                                                                        |
| ensureTrigger     | bool    | Whether to support guaranteed stop loss.                                                                                                                                               |
| triggerFeeRate    | string  | The fee rate for guaranteed stop loss.                                                                                                                                                 |
| brokerState       | bool    | Whether to prohibit broker user transactions, true: prohibited                                                                                                                         |
| launchTime        | long    | shelf time; The status of the pair is pre-online before the listing time, and the status of the pair changes to online after the listing time                                          |
| maintainTime      | long    | The start time of the prohibition of opening a position, after the time is up, the currency pair is in a state of prohibition from opening a position, and can only close the position |
| offTime           | long    | Down line time, after the time is up, the currency pair is in the offline state and trading is prohibited                                                                              |
| displayName       | string  | The trading pair name displayed on the platform is for display purposes only. Unlike the symbol, which is primarily used for order placement.                                          |

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
| 109400     | CATI-USDT,symbol not exist, please verify it in api: /openApi/swap/v2/quote/contracts                                                                        |
| 80020      | risk forbidden                                                                                                                                               |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/market-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/market-api.html)
