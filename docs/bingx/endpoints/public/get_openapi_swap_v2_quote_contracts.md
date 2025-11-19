# GET /openApi/swap/v2/quote/contracts

**Source:**
[/openApi/swap/v2/quote/contracts](https://bingx-api.github.io/docs/)

## Authentication

Not Required (Public Endpoint)

## USDT-M Perp Futures symbols

GET /openApi/swap/v2/quote/contracts

API KEY permission: No API KEY signature required

Content-Type: request body(application/json)

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

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/market-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/market-api.html)
