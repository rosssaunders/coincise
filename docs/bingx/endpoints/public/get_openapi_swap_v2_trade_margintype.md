# GET /openApi/swap/v2/trade/marginType

**Source:**
[/openApi/swap/v2/trade/marginType](https://bingx-api.github.io/docs/)

## Authentication

Not Required (Public Endpoint)

## Change Margin Type

GET /openApi/swap/v2/trade/marginType

POST /openApi/swap/v2/trade/marginType

GET /openApi/swap/v2/trade/leverage

POST /openApi/swap/v2/trade/leverage

GET /openApi/swap/v2/trade/forceOrders

GET /openApi/swap/v2/trade/allOrders

POST /openApi/swap/v2/trade/positionMargin

GET /openApi/swap/v2/trade/allFillOrders

POST /openApi/swap/v1/positionSide/dual

GET /openApi/swap/v1/positionSide/dual

POST /openApi/swap/v1/trade/cancelReplace

POST /openApi/swap/v1/trade/batchCancelReplace

POST /openApi/swap/v2/trade/cancelAllAfter

POST /openApi/swap/v1/trade/closePosition

GET /openApi/swap/v1/trade/fullOrder

GET /openApi/swap/v1/maintMarginRatio

GET /openApi/swap/v2/trade/fillHistory

GET /openApi/swap/v1/trade/positionHistory

GET /openApi/swap/v1/positionMargin/history

POST /openApi/swap/v1/trade/getVst

POST /openApi/swap/v1/twap/order

GET /openApi/swap/v1/twap/openOrders

GET /openApi/swap/v1/twap/historyOrders

GET /openApi/swap/v1/twap/orderDetail

POST /openApi/swap/v1/twap/cancelOrder

POST /openApi/swap/v1/trade/assetMode

GET /openApi/swap/v1/trade/assetMode

GET /openApi/swap/v1/trade/multiAssetsRules

GET /openApi/swap/v1/user/marginAssets

POST /openApi/swap/v1/trade/reverse

POST /openApi/swap/v1/trade/autoAddMargin

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Read

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

rate limitation by UID: 10/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

rate limitation by UID: 5/s & rate limitation by IP in group Number: 3

API KEY permission: Perpetual Futures Trading

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

rate limitation by UID: 1/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Read

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Read

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Read

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

API KEY permission: No API KEY signature required

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Read

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type:request body(application/json)

Content-Type:request body(application/json)

Content-Type:request body(application/json)

Content-Type:request body(application/json)

Content-Type:request body(application/json)

Content-Type:request body(application/json)

Content-Type:request body(application/json)

Content-Type:request body(application/json)

Content-Type:request body(application/json)

Content-Type:request body(application/json)

Content-Type:request body(application/json)

Content-Type:request body(application/json)

Content-Type:request body(application/json)

Content-Type:request body(application/json)

Content-Type:request body(application/json)

Content-Type:request body(application/json)

Content-Type:request body(application/json)

Content-Type:request body(application/json)

Content-Type:request body(application/json)

Content-Type:request body(application/json)

Content-Type:request body(application/json)

Content-Type:request body(application/json)

Content-Type:request body(application/json)

Content-Type:request body(application/json)

Content-Type:request body(application/json)

Content-Type:request body(application/json)

Content-Type:request body(application/json)

Content-Type:request body(application/json)

Content-Type:request body(application/json)

Content-Type:request body(application/json)

Content-Type:request body(application/json)

### Description

The current account places an order on the specified symbol contract. (Supports
limit order, market order, market order for plan entrustment, limit order for
plan entrustment, position stop profit and stop loss order, and liquidation for
positions)

The participation and return are consistent with the ordering interface, but the
actual order will not be placed, only the test results will be returned.The
result is a fake order, and your funds will not be deducted. It will not appear
on the real transaction panel and is only used to help you practice using the
order interface

Depending on the order type, certain parameters are mandatory:

- LIMIT: Mandatory Parameters: quantity, price

- MARKET: Mandatory Parameters: quantity

- TRAILING_STOP_MARKET (Tracking Stop Loss Order) or TRAILING_TP_SL (Trailing
  TakeProfit/StopLoss Order): The price field or priceRate field needs to be
  filled in

- TRIGGER_LIMIT, STOP, TAKE_PROFIT: Mandatory Parameters:
  quantity、stopPrice、price

- STOP_MARKET, TAKE_PROFIT_MARKET, TRIGGER_MARKET: Mandatory Parameters:
  quantity、stopPrice

The triggering of the conditional order must:

### STOP/STOP_MARKET stop loss order:

- The accumulative quantity of the pending stop loss orders cannot be greater
  than the quantity of open positions

- Buy: the mark price is higher than or equal to the trigger price stopPrice

- Sell: the mark price is lower than or equal to the trigger price stopPrice

### TAKE_PROFIT/TAKE_PROFIT_MARKET take profit order:

- The accumulative quantity of the pending take profit order cannot be greater
  than the position quantity

- Buy: the mark price is lower than or equal to the trigger price stopPrice

- Sell: the mark price is higher than or equal to the trigger price stopPrice

The minimum order quantity can be obtained from the api
/openApi/swap/v2/quote/contracts: tradeMinQuantity, tradeMinUSDT

Trading Rules:

- Trading Rules:
  [https://bingx.com/en/tradeInfo/perpetual/trading-rules/BTC-USDT/](https://bingx.com/en/tradeInfo/perpetual/trading-rules/BTC-USDT/)
- About price accuracy and quantity accuracy reference interface:
  [https://open-api.bingx.com/openApi/swap/v2/quote/contracts](https://open-api.bingx.com/openApi/swap/v2/quote/contracts)
- If the accuracy exceeds the range of the current period, the current API order
  will still be successful, but it will be truncated. For example, the price
  requirement is: 0.0001, if the order is 0.123456, it will be successfully
  submitted with 0.1234.

### Request Parameters

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
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html)
