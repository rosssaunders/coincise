# POST /openApi/swap/v2/trade/batchOrders

**Source:**
[/openApi/swap/v2/trade/batchOrders](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Place multiple orders

POST /openApi/swap/v2/trade/batchOrders

rate limitation by UID: 5/s & rate limitation by IP in group Number: 3

API KEY permission: Perpetual Futures Trading

Content-Type: request body(application/json)

### Description

The current account performs batch order operations on the specified symbol
contract

- Specific order conditions and rules are consistent with ordinary orders

- BatchOrders is kind of difficult but do not worry, please refer to 4 steps
  below:

- 1\. make your payload to string

original parameters:
batchOrders=\[{"symbol":"ETH-USDT","type":"MARKET","side":"BUY","positionSide":"LONG","quantity":1},{"symbol":"BTC-USDT","type":"MARKET","side":"BUY","positionSide":"LONG","quantity":0.001}\]×tamp=1692956597902

- 2\. sign original parameters

signature: bab521321a62a1381a76b485b92dd0f4a8b16b4616cfa4c75ffba899f80dfc86

- 3\. url encode each value,for example the value of batchOrders field,except
  timestamp field value (not url encode the key, not url encode entire original
  parametersg), make it like below:

after url encoded:
batchOrders=%5B%7B%22symbol%22%3A%22ETH-USDT%22%2C%22type%22%3A%22MARKET%22%2C%22side%22%3A%22BUY%22%2C%22positionSide%22%3A%22LONG%22%2C%22quantity%22%3A1%7D%2C%7B%22symbol%22%3A%22BTC-USDT%22%2C%22type%22%3A%22MARKET%22%2C%22side%22%3A%22BUY%22%2C%22positionSide%22%3A%22LONG%22%2C%22quantity%22%3A0.001%7D%5D×tamp=1692956597902

- 4\. final request should be like

POST
https://open-api.bingx.com/openApi/swap/v2/trade/batchOrders?batchOrders=%5B%7B%22symbol%22%3A%22ETH-USDT%22%2C%22type%22%3A%22MARKET%22%2C%22side%22%3A%22BUY%22%2C%22positionSide%22%3A%22LONG%22%2C%22quantity%22%3A1%7D%2C%7B%22symbol%22%3A%22BTC-USDT%22%2C%22type%22%3A%22MARKET%22%2C%22side%22%3A%22BUY%22%2C%22positionSide%22%3A%22LONG%22%2C%22quantity%22%3A0.001%7D%5D×tamp=1692956597902&signature=bab521321a62a1381a76b485b92dd0f4a8b16b4616cfa4c75ffba899f80dfc86

Batch orders are processed concurrently, and order matching order is not
guaranteed

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

| Parameter Name | Type  | Required | Description                                                                                        |
| -------------- | ----- | -------- | -------------------------------------------------------------------------------------------------- |
| batchOrders    | LIST  | yes      | Order list, supporting up to 5 orders, with Order objects referencing transactions to place orders |
| timestamp      | int64 | yes      | request timestamp, unit: millisecond                                                               |
| recvWindow     | int64 | no       | Request valid time window value, Unit: milliseconds                                                |

### Response Parameters

| Parameter Name | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| -------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol         | string | trading pair, for example: BTC-USDT                                                                                                                                                                                                                                                                                                                                                                                                                       |
| side           | string | buying and selling direction                                                                                                                                                                                                                                                                                                                                                                                                                              |
| type           | string | LIMIT: Limit Order / MARKET: Market Order / STOP_MARKET: Stop Market Order / TAKE_PROFIT_MARKET: Take Profit Market Order / STOP: Stop Limit Order / TAKE_PROFIT: Take Profit Limit Order / TRIGGER_LIMIT: Stop Limit Order with Trigger / TRIGGER_MARKET: Stop Market Order with Trigger / TRAILING_STOP_MARKET: Trailing Stop Market Order / TRAILING_TP_SL: Trailing TakeProfit or StopLoss                                                            |
| positionSide   | string | Position direction, required for single position as BOTH, for both long and short positions only LONG or SHORT can be chosen, defaults to LONG if empty                                                                                                                                                                                                                                                                                                   |
| reduceOnly     | string | true, false; Default value is false for single position mode; This parameter is not accepted for both long and short positions mode                                                                                                                                                                                                                                                                                                                       |
| orderID        | string | Order ID                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| clientOrderId  | string | Customized order ID for users. The system will convert this field to lowercase.                                                                                                                                                                                                                                                                                                                                                                           |
| stopGuaranteed | string | true: Enables the guaranteed stop-loss and take-profit feature; false: Disables the feature. The guaranteed stop-loss feature is not enabled by default. Supported order types include: STOP_MARKET: Market stop-loss order / TAKE_PROFIT_MARKET: Market take-profit order / STOP: Limit stop-loss order / TAKE_PROFIT: Limit take-profit order / TRIGGER_LIMIT: Stop-limit order with trigger / TRIGGER_MARKET: Market order with trigger for stop-loss. |
| status         | string | Order status                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| avgPrice       | string | Average filled price, present when type=MARKET                                                                                                                                                                                                                                                                                                                                                                                                            |
| executedQty    | string | Transaction quantity, coins                                                                                                                                                                                                                                                                                                                                                                                                                               |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html)
