# POST /openApi/swap/v2/trade/order/test

**Source:**
[/openApi/swap/v2/trade/order/test](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Test Order

POST /openApi/swap/v2/trade/order/test

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type: request body(application/json)

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

| Parameter Name  | Type    | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| --------------- | ------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol          | string  | yes      | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT                                                                                                                                                                                                                                                                                                                                                                                      |
| type            | string  | yes      | LIMIT: Limit Order / MARKET: Market Order / STOP_MARKET: Stop Market Order / TAKE_PROFIT_MARKET: Take Profit Market Order / STOP: Stop Limit Order / TAKE_PROFIT: Take Profit Limit Order / TRIGGER_LIMIT: Stop Limit Order with Trigger / TRIGGER_MARKET: Stop Market Order with Trigger / TRAILING_STOP_MARKET: Trailing Stop Market Order / TRAILING_TP_SL: Trailing TakeProfit or StopLoss                                                            |
| side            | string  | yes      | buying and selling direction SELL, BUY                                                                                                                                                                                                                                                                                                                                                                                                                    |
| positionSide    | string  | no       | Position direction, required for single position as BOTH, for both long and short positions only LONG or SHORT can be chosen, defaults to LONG if empty                                                                                                                                                                                                                                                                                                   |
| reduceOnly      | string  | no       | true, false; Default value is false for single position mode; This parameter is not accepted for both long and short positions mode                                                                                                                                                                                                                                                                                                                       |
| price           | float64 | no       | Price, represents the trailing stop distance in TRAILING_STOP_MARKET and TRAILING_TP_SL                                                                                                                                                                                                                                                                                                                                                                   |
| quantity        | float64 | no       | Original quantity, only support units by COIN ,Ordering with quantity U is not currently supported.                                                                                                                                                                                                                                                                                                                                                       |
| stopPrice       | float64 | no       | Trigger price, only required for STOP_MARKET, TAKE_PROFIT_MARKET, STOP, TAKE_PROFIT, TRIGGER_LIMIT, TRIGGER_MARKET                                                                                                                                                                                                                                                                                                                                        |
| priceRate       | float64 | no       | For type: TRAILING_STOP_MARKET or TRAILING_TP_SL; Maximum: 1                                                                                                                                                                                                                                                                                                                                                                                              |
| timestamp       | int64   | yes      | request timestamp, unit: millisecond                                                                                                                                                                                                                                                                                                                                                                                                                      |
| stopLoss        | string  | no       | Support setting stop loss while placing an order. Only supports type: STOP_MARKET/STOP                                                                                                                                                                                                                                                                                                                                                                    |
| takeProfit      | string  | no       | Support setting take profit while placing an order. Only supports type: TAKE_PROFIT_MARKET/TAKE_PROFIT                                                                                                                                                                                                                                                                                                                                                    |
| clientOrderId   | string  | no       | Customized order ID for users, with a limit of characters from 1 to 40. Different orders cannot use the same clientOrderId                                                                                                                                                                                                                                                                                                                                |
| recvWindow      | int64   | no       | Request valid time window value, Unit: milliseconds                                                                                                                                                                                                                                                                                                                                                                                                       |
| timeInForce     | string  | no       | Time in Force, currently supports PostOnly, GTC, IOC, and FOK                                                                                                                                                                                                                                                                                                                                                                                             |
| closePosition   | string  | no       | true, false; all position squaring after triggering, only support STOP_MARKET and TAKE_PROFIT_MARKET; not used with quantity; comes with only position squaring effect, not used with reduceOnly                                                                                                                                                                                                                                                          |
| activationPrice | float64 | no       | Used with TRAILING_STOP_MARKET or TRAILING_TP_SL orders, default as the latest price(supporting different workingType)                                                                                                                                                                                                                                                                                                                                    |
| stopGuaranteed  | string  | no       | true: Enables the guaranteed stop-loss and take-profit feature; false: Disables the feature. The guaranteed stop-loss feature is not enabled by default. Supported order types include: STOP_MARKET: Market stop-loss order / TAKE_PROFIT_MARKET: Market take-profit order / STOP: Limit stop-loss order / TAKE_PROFIT: Limit take-profit order / TRIGGER_LIMIT: Stop-limit order with trigger / TRIGGER_MARKET: Market order with trigger for stop-loss. |

### Response Parameters

| Parameter Name | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| -------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol         | string | trading pair, for example: BTC-USDT                                                                                                                                                                                                                                                                                                                                                                                                                       |
| side           | string | buying and selling direction                                                                                                                                                                                                                                                                                                                                                                                                                              |
| type           | string | LIMIT: Limit Order / MARKET: Market Order / STOP_MARKET: Stop Market Order / TAKE_PROFIT_MARKET: Take Profit Market Order / STOP: Stop Limit Order / TAKE_PROFIT: Take Profit Limit Order / TRIGGER_LIMIT: Stop Limit Order with Trigger / TRIGGER_MARKET: Stop Market Order with Trigger / TRAILING_STOP_MARKET: Trailing Stop Market Order / TRAILING_TP_SL: Trailing TakeProfit or StopLoss                                                            |
| positionSide   | string | Position direction, required for single position as BOTH, for both long and short positions only LONG or SHORT can be chosen, defaults to LONG if empty                                                                                                                                                                                                                                                                                                   |
| reduceOnly     | string | true, false; Default value is false for single position mode; This parameter is not accepted for both long and short positions mode                                                                                                                                                                                                                                                                                                                       |
| orderId        | int64  | Order ID                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| clientOrderId  | string | Customized order ID for users                                                                                                                                                                                                                                                                                                                                                                                                                             |
| stopGuaranteed | string | true: Enables the guaranteed stop-loss and take-profit feature; false: Disables the feature. The guaranteed stop-loss feature is not enabled by default. Supported order types include: STOP_MARKET: Market stop-loss order / TAKE_PROFIT_MARKET: Market take-profit order / STOP: Limit stop-loss order / TAKE_PROFIT: Limit take-profit order / TRIGGER_LIMIT: Stop-limit order with trigger / TRIGGER_MARKET: Market order with trigger for stop-loss. |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html)
