# BingX USDT-Futures API - Trading

## Trades Endpoints

### Test Order

POST /openApi/swap/v2/trade/order/test

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type:request body(application/json)

#### Description

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

#### STOP/STOP_MARKET stop loss order:

- The accumulative quantity of the pending stop loss orders cannot be greater
  than the quantity of open positions

- Buy: the mark price is higher than or equal to the trigger price stopPrice

- Sell: the mark price is lower than or equal to the trigger price stopPrice

#### TAKE_PROFIT/TAKE_PROFIT_MARKET take profit order:

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

#### Request Parameters

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

#### Response Parameters

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

#### Data Parameters

|                | Description                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type           | Only supports type: STOP_MARKET/STOP, TAKE_PROFIT_MARKET/TAKE_PROFIT                                                                                                                                                                                                                                                                                                                                                                                      |
| stopPrice      | Trigger price, only for STOP_MARKET, TAKE_PROFIT_MARKET, STOP, TAKE_PROFIT                                                                                                                                                                                                                                                                                                                                                                                |
| price          | Order price                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| workingType    | Trigger price type for stopPrice: MARK_PRICE, CONTRACT_PRICE, default is MARK_PRICE. When the type is STOP or STOP_MARKET, and stopGuaranteed is true, the workingType must only be CONTRACT_PRICE.                                                                                                                                                                                                                                                       |
| stopGuaranteed | true: Enables the guaranteed stop-loss and take-profit feature; false: Disables the feature. The guaranteed stop-loss feature is not enabled by default. Supported order types include: STOP_MARKET: Market stop-loss order / TAKE_PROFIT_MARKET: Market take-profit order / STOP: Limit stop-loss order / TAKE_PROFIT: Limit take-profit order / TRIGGER_LIMIT: Stop-limit order with trigger / TRIGGER_MARKET: Market order with trigger for stop-loss. |

#### Errors

| Error Code | Description                                                                                                                                                              |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 80014      | timestamp is invalid                                                                                                                                                     |
| 100421     | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets             |
| 100419     | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set                                                            |
| 100410     | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249                                      |
| 100410     | rate limited                                                                                                                                                             |
| 100413     | Incorrect apiKey                                                                                                                                                         |
| 100410     | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155                                          |
| 109400     | CATI-USDT,symbol not exist, please verify it in api: /openApi/swap/v2/quote/contracts                                                                                    |
| 80020      | risk forbidden                                                                                                                                                           |
| 80014      | Reminder: Due to the large market fluctuations, in order to reduce the risk of liquidation, API orders are temporarily disabled.                                         |
| 101400     | Please ensure that the minimum nominal value of the order placed must be greater than 2u                                                                                 |
| 101212     | Failed. Please check if you have pending orders under the trading pair. If yes, please cancel them and try again                                                         |
| 80020      | risk forbidden                                                                                                                                                           |
| 80014      | parameter quantity is must                                                                                                                                               |
| 110411     | Stop Loss price should be lower than the current price                                                                                                                   |
| 101205     | No position to close                                                                                                                                                     |
| 101204     | Insufficient margin                                                                                                                                                      |
| 80014      | Invalid parameters,positionSide: This field is required.                                                                                                                 |
| 101215     | The Maker (Post Only) order ensures that the user always acts as a maker. If the order would immediately match with available orders in the market, it will be canceled. |
| 110406     | Position SL order already exists                                                                                                                                         |
| 80001      | This operation is not allowed as your account assets are being processed. Please try again later.                                                                        |
| 110412     | Stop Loss price should be greater than the current price                                                                                                                 |
| 101290     | The Reduce Only order can only decrease the position and not be used to open a position. Please check your positions and open orders.                                    |
| 109400     | In the One-way mode, the 'PositionSide' field can only be set to BOTH.                                                                                                   |
| 101211     | Order price should be higher than 15.5                                                                                                                                   |
| 101481     | clientOrderID cannot be repeated                                                                                                                                         |
| 80017      | position not exist                                                                                                                                                       |
| 109400     | You have a copy trading signal in process, please try again later.                                                                                                       |
| 109400     | In the Hedge mode, the 'PositionSide' field can only be set to LONG or SHORT.                                                                                            |
| 101515     | You're temporarily suspended from trading. Please try again later.                                                                                                       |
| 110400     | The parameters submitted don't meet the requirement. Please try again later or contact customer support                                                                  |
| 101419     | Your order size has reached the upper limit                                                                                                                              |
| 110413     | Take Profit price should be greater than the current price                                                                                                               |
| 101209     | The maximum position value for this leverage is 170000 USDT.                                                                                                             |
| 101424     | This order exceeds the current position limit amount of 5000 USDT. Please complete your KYC to increase the maximum position limit.                                      |
| 101400     | The trading pair is not available for trading                                                                                                                            |
| 80012      | The current system is busy, please try again later                                                                                                                       |
| 101290     |                                                                                                                                                                          |
| 110407     | Position TP order already exists                                                                                                                                         |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Test
> Order](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Test
> Order)

### Place order

POST /openApi/swap/v2/trade/order

rate limitation by UID: 5/s & rate limitation by IP in group Number: 3

API KEY permission: Perpetual Futures Trading

Content-Type:request body(application/json)

[1\. Create Account](https://bingx.com)
[2\. Pass KYC/KYB](https://bingx.com/en-us/account/api/)
[3\. Create API KEY](https://bingx.com/en-us/account/api/)
[4\. Configure API KEY permissions](https://bingx.com/en-us/account/api/)
[5\. Understanding signature authentication](https://bingx-api.github.io/docs/#/en-us/swapV2/authentication.html#Signature%20Description)
_6\. Run the following example code_
[7\. Understand common error codes](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Common%20Error%20Codes)
[8\. Understand rate limitations](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Rate%20limit)
[9\. Understanding request timestamps](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Timestamp)
[10\. Understand fee schedule](https://bingx.com/en-us/support/costs/)
[11\. Understand trading rules](https://bingx.com/en-us/tradeInfo/perpetual/trading-rules/BTC-USDT)

request parameters https://open-api.bingx.com

#### Description

The current account places an order on the specified symbol contract. (Supports
limit order, market order, market order for plan entrustment, limit order for
plan entrustment, position stop profit and stop loss order, and liquidation for
positions)

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

#### 1\. Open/Close: How to use the same endpoint to open (Long/Short) and close (Long/Short) positions? Please refer to the following request payload combination:

open/buy LONG: side=BUY & positionSide=LONG

close/sell LONG: side=SELL & positionSide=LONG

open/sell SHORT: side=SELL & positionSide=SHORT

close/buy SHORT: side=BUY & positionSide=SHORT

{"symbol": "ETH-USDT","side": "BUY","positionSide": "LONG", "type": "MARKET",
"quantity": 5}

#### 2\. Set take profit and stop loss: This endpoint can also be used to set take profit and stop loss, but the position needs to be opened first;

{"symbol": "ETH-USDT","side": "BUY","positionSide": "LONG", "type":
"TAKE_PROFIT_MARKET", "quantity": 3, "stopPrice": 31968.0}

#### 3\. set stopLoss and takeProfit when open position:using takeProfit and stopLoss fields

{"symbol": "BTC-USDT","side": "BUY","positionSide": "LONG","type":
"MARKET","quantity": 5,"takeProfit": "{\\"type\\": \\"TAKE_PROFIT_MARKET\\",
\\"stopPrice\\": 31968.0,\\"price\\":
31968.0,\\"workingType\\":\\"MARK_PRICE\\"}"}

The triggering of the conditional order must:

#### STOP/STOP_MARKET stop loss order:

- The accumulative quantity of the pending stop loss orders cannot be greater
  than the quantity of open positions

- Buy: the mark price is higher than or equal to the trigger price stopPrice

- Sell: the mark price is lower than or equal to the trigger price stopPrice

#### TAKE_PROFIT/TAKE_PROFIT_MARKET take profit order:

- The accumulative quantity of the pending take profit order cannot be greater
  than the position quantity

- Buy: the mark price is lower than or equal to the trigger price stopPrice

- Sell: the mark price is higher than or equal to the trigger price stopPrice

The minimum order quantity can be obtained from the api
/openApi/swap/v2/quote/contracts: tradeMinQuantity, tradeMinUSDT

#### Request Parameters

| Parameter Name  | Type    | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| --------------- | ------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol          | string  | yes      | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| type            | string  | yes      | LIMIT: Limit Order / MARKET: Market Order / STOP_MARKET: Stop Market Order / TAKE_PROFIT_MARKET: Take Profit Market Order / STOP: Stop Limit Order / TAKE_PROFIT: Take Profit Limit Order / TRIGGER_LIMIT: Stop Limit Order with Trigger / TRIGGER_MARKET: Stop Market Order with Trigger / TRAILING_STOP_MARKET: Trailing Stop Market Order / TRAILING_TP_SL: Trailing TakeProfit or StopLoss                                                                                                                                                                                                                                                             |
| side            | string  | yes      | buying and selling direction SELL, BUY                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| positionSide    | string  | no       | Position direction, required for single position as BOTH, for both long and short positions only LONG or SHORT can be chosen, defaults to LONG if empty                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| reduceOnly      | string  | no       | true, false; Default value is false for single position mode; This parameter is not accepted for both long and short positions mode                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| price           | float64 | no       | Price, represents the trailing stop distance in TRAILING_STOP_MARKET and TRAILING_TP_SL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| quantity        | float64 | no       | Original quantity, only support units by COIN ,Ordering with quantity U is not currently supported.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| stopPrice       | float64 | no       | Trigger price, only required for STOP_MARKET, TAKE_PROFIT_MARKET, STOP, TAKE_PROFIT, TRIGGER_LIMIT, TRIGGER_MARKET                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| priceRate       | float64 | no       | For type: TRAILING_STOP_MARKET or TRAILING_TP_SL; Maximum: 1                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| stopLoss        | string  | no       | Support setting stop loss while placing an order. Only supports type: STOP_MARKET/STOP                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| takeProfit      | string  | no       | Support setting take profit while placing an order. Only supports type: TAKE_PROFIT_MARKET/TAKE_PROFIT                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| workingType     | string  | no       | StopPrice trigger price types: MARK_PRICE, CONTRACT_PRICE, default MARK_PRICE. When the type is STOP or STOP_MARKET, and stopGuaranteed is true, the workingType must only be CONTRACT_PRICE.                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| timestamp       | int64   | yes      | request timestamp, unit: millisecond                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| clientOrderId   | string  | no       | Customized order ID for users, with a limit of characters from 1 to 40. The system will convert this field to lowercase. Different orders cannot use the same clientOrderId, clientOrderId only supports LIMIT/MARKET order type                                                                                                                                                                                                                                                                                                                                                                                                                           |
| recvWindow      | int64   | no       | Request valid time window value, Unit: milliseconds                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| timeInForce     | string  | no       | Time in Force, currently supports PostOnly, GTC, IOC, and FOK                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| closePosition   | string  | no       | true, false; all position squaring after triggering, only support STOP_MARKET and TAKE_PROFIT_MARKET; not used with quantity; comes with only position squaring effect, not used with reduceOnly                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| activationPrice | float64 | no       | Used with TRAILING_STOP_MARKET or TRAILING_TP_SL orders, default as the latest price(supporting different workingType)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| stopGuaranteed  | string  | no       | true: Enables the guaranteed stop-loss and take-profit feature; false: Disables the feature; cutfee: Enable the guaranteed stop loss function and enable the VIP guaranteed stop loss fee reduction function. When stopGuaranteed is true or cutfee, the quantity field does not take effect. The guaranteed stop-loss feature is not enabled by default. Supported order types include: STOP_MARKET: Market stop-loss order / TAKE_PROFIT_MARKET: Market take-profit order / STOP: Limit stop-loss order / TAKE_PROFIT: Limit take-profit order / TRIGGER_LIMIT: Stop-limit order with trigger / TRIGGER_MARKET: Market order with trigger for stop-loss. |
| positionId      | int64   | no       | In the Separate Isolated mode, closing a position must be transmitted                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |

#### Response Parameters

| Parameter Name | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| -------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol         | string | trading pair, for example: BTC-USDT                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| side           | string | buying and selling direction                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| type           | string | LIMIT: Limit Order / MARKET: Market Order / STOP_MARKET: Stop Market Order / TAKE_PROFIT_MARKET: Take Profit Market Order / STOP: Stop Limit Order / TAKE_PROFIT: Take Profit Limit Order / TRIGGER_LIMIT: Stop Limit Order with Trigger / TRIGGER_MARKET: Stop Market Order with Trigger / TRAILING_STOP_MARKET: Trailing Stop Market Order / TRAILING_TP_SL: Trailing TakeProfit or StopLoss                                                                                                                                                                                                                                                      |
| positionSide   | string | Position direction, required for single position as BOTH, for both long and short positions only LONG or SHORT can be chosen, defaults to LONG if empty                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| reduceOnly     | string | true, false; Default value is false for single position mode; This parameter is not accepted for both long and short positions mode                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| orderID        | string | Order ID                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| workingType    | string | StopPrice trigger price types: MARK_PRICE, CONTRACT_PRICE, default MARK_PRICE. When the type is STOP or STOP_MARKET, and stopGuaranteed is true, the workingType must only be CONTRACT_PRICE.                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| clientOrderId  | string | Customized order ID for users. The system will convert this field to lowercase.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| stopGuaranteed | string | true: Enables the guaranteed stop-loss and take-profit feature; false: Disables the feature; cutfee: Enable the guaranteed stop loss function and enable the VIP guaranteed stop loss fee reduction function. The VIP fee reduction only takes effect when placing a stop loss order.. The guaranteed stop-loss feature is not enabled by default. Supported order types include: STOP_MARKET: Market stop-loss order / TAKE_PROFIT_MARKET: Market take-profit order / STOP: Limit stop-loss order / TAKE_PROFIT: Limit take-profit order / TRIGGER_LIMIT: Stop-limit order with trigger / TRIGGER_MARKET: Market order with trigger for stop-loss. |
| status         | string | Order status                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| avgPrice       | string | Average filled price, present when type=MARKET                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| executedQty    | string | Transaction quantity, coins                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |

#### Data Parameters

|                | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type           | Only supports type: STOP_MARKET/STOP, TAKE_PROFIT_MARKET/TAKE_PROFIT                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| stopPrice      | Trigger price, only for STOP_MARKET, TAKE_PROFIT_MARKET, STOP, TAKE_PROFIT                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| price          | Order price                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| workingType    | Trigger price type for stopPrice: MARK_PRICE, CONTRACT_PRICE, default is MARK_PRICE. When the type is STOP or STOP_MARKET, and stopGuaranteed is true, the workingType must only be CONTRACT_PRICE.                                                                                                                                                                                                                                                                                                                                                                        |
| stopGuaranteed | true: Enables the guaranteed stop-loss and take-profit feature; false: Disables the feature; cutfee: Enable the guaranteed stop loss function and enable the VIP guaranteed stop loss fee reduction function. The guaranteed stop-loss feature is not enabled by default. Supported order types include: STOP_MARKET: Market stop-loss order / TAKE_PROFIT_MARKET: Market take-profit order / STOP: Limit stop-loss order / TAKE_PROFIT: Limit take-profit order / TRIGGER_LIMIT: Stop-limit order with trigger / TRIGGER_MARKET: Market order with trigger for stop-loss. |

#### Errors

| Error Code | Description                                                                                                                                                              |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 80014      | timestamp is invalid                                                                                                                                                     |
| 100421     | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets             |
| 100419     | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set                                                            |
| 100410     | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249                                      |
| 100410     | rate limited                                                                                                                                                             |
| 100413     | Incorrect apiKey                                                                                                                                                         |
| 100410     | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155                                          |
| 109400     | CATI-USDT,symbol not exist, please verify it in api: /openApi/swap/v2/quote/contracts                                                                                    |
| 80020      | risk forbidden                                                                                                                                                           |
| 80014      | Reminder: Due to the large market fluctuations, in order to reduce the risk of liquidation, API orders are temporarily disabled.                                         |
| 101400     | Please ensure that the minimum nominal value of the order placed must be greater than 2u                                                                                 |
| 101212     | Failed. Please check if you have pending orders under the trading pair. If yes, please cancel them and try again                                                         |
| 80020      | risk forbidden                                                                                                                                                           |
| 80014      | parameter quantity is must                                                                                                                                               |
| 110411     | Stop Loss price should be lower than the current price                                                                                                                   |
| 101205     | No position to close                                                                                                                                                     |
| 101204     | Insufficient margin                                                                                                                                                      |
| 80014      | Invalid parameters,positionSide: This field is required.                                                                                                                 |
| 101215     | The Maker (Post Only) order ensures that the user always acts as a maker. If the order would immediately match with available orders in the market, it will be canceled. |
| 110406     | Position SL order already exists                                                                                                                                         |
| 80001      | This operation is not allowed as your account assets are being processed. Please try again later.                                                                        |
| 110412     | Stop Loss price should be greater than the current price                                                                                                                 |
| 101290     | The Reduce Only order can only decrease the position and not be used to open a position. Please check your positions and open orders.                                    |
| 109400     | In the One-way mode, the 'PositionSide' field can only be set to BOTH.                                                                                                   |
| 101211     | Order price should be higher than 15.5                                                                                                                                   |
| 101481     | clientOrderID cannot be repeated                                                                                                                                         |
| 80017      | position not exist                                                                                                                                                       |
| 109400     | You have a copy trading signal in process, please try again later.                                                                                                       |
| 109400     | In the Hedge mode, the 'PositionSide' field can only be set to LONG or SHORT.                                                                                            |
| 101515     | You're temporarily suspended from trading. Please try again later.                                                                                                       |
| 110400     | The parameters submitted don't meet the requirement. Please try again later or contact customer support                                                                  |
| 101419     | Your order size has reached the upper limit                                                                                                                              |
| 110413     | Take Profit price should be greater than the current price                                                                                                               |
| 101209     | The maximum position value for this leverage is 170000 USDT.                                                                                                             |
| 101424     | This order exceeds the current position limit amount of 5000 USDT. Please complete your KYC to increase the maximum position limit.                                      |
| 101400     | The trading pair is not available for trading                                                                                                                            |
| 80012      | The current system is busy, please try again later                                                                                                                       |
| 101290     |                                                                                                                                                                          |
| 110407     | Position TP order already exists                                                                                                                                         |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Place
> order](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Place
> order)

### Place order in demo trading

POST /openApi/swap/v2/trade/order

rate limitation by UID: 5/s & rate limitation by IP in group Number: 3

API KEY permission: Perpetual Futures Trading

Content-Type:request body(application/json)

[1\. Create Account](https://bingx.com)
[2\. Pass KYC/KYB](https://bingx.com/en-us/account/api/)
[3\. Create API KEY](https://bingx.com/en-us/account/api/)
[4\. Configure API KEY permissions](https://bingx.com/en-us/account/api/)
[5\. Understanding signature authentication](https://bingx-api.github.io/docs/#/en-us/swapV2/authentication.html#Signature%20Description)
_6\. Run the following example code_
[7\. Understand common error codes](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Common%20Error%20Codes)
[8\. Understand rate limitations](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Rate%20limit)
[9\. Understanding request timestamps](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Timestamp)
[10\. Understand fee schedule](https://bingx.com/en-us/support/costs/)
[11\. Understand trading rules](https://bingx.com/en-us/tradeInfo/perpetual/trading-rules/BTC-USDT)

request parameters https://open-api.bingx.com

#### Description

The current account places an order on the specified symbol contract. (Supports
limit order, market order, market order for plan entrustment, limit order for
plan entrustment, position stop profit and stop loss order, and liquidation for
positions)

demo trading domain: open-api-vst.bingx.com

- LIMIT: Mandatory Parameters: quantity, price

- MARKET: Mandatory Parameters: quantity

- TRAILING_STOP_MARKET (Tracking Stop Loss Order) or TRAILING_TP_SL (Trailing
  TakeProfit/StopLoss Order): The price field or priceRate field needs to be
  filled in

- TRIGGER_LIMIT, STOP, TAKE_PROFIT: Mandatory Parameters:
  quantity、stopPrice、price

- STOP_MARKET, TAKE_PROFIT_MARKET, TRIGGER_MARKET: Mandatory Parameters:
  quantity、stopPrice

#### 1\. Open/Close: How to use the same endpoint to open (Long/Short) and close (Long/Short) positions? Please refer to the following request payload combination:

open/buy LONG: side=BUY & positionSide=LONG

close/sell LONG: side=SELL & positionSide=LONG

open/sell SHORT: side=SELL & positionSide=SHORT

close/buy SHORT: side=BUY & positionSide=SHORT

{"symbol": "ETH-USDT","side": "BUY","positionSide": "LONG", "type": "MARKET",
"quantity": 5}

#### 2\. Set take profit and stop loss: This endpoint can also be used to set take profit and stop loss, but the position needs to be opened first;

{"symbol": "ETH-USDT","side": "BUY","positionSide": "LONG", "type":
"TAKE_PROFIT_MARKET", "quantity": 3, "stopPrice": 31968.0}

#### 3\. set stopLoss and takeProfit when open position:using takeProfit and stopLoss fields

{"symbol": "BTC-USDT","side": "BUY","positionSide": "LONG","type":
"MARKET","quantity": 5,"takeProfit": "{\\"type\\": \\"TAKE_PROFIT_MARKET\\",
\\"stopPrice\\": 31968.0,\\"price\\":
31968.0,\\"workingType\\":\\"MARK_PRICE\\"}"}

The triggering of the conditional order must:

#### STOP/STOP_MARKET stop loss order:

- The accumulative quantity of the pending stop loss orders cannot be greater
  than the quantity of open positions

- Buy: the mark price is higher than or equal to the trigger price stopPrice

- Sell: the mark price is lower than or equal to the trigger price stopPrice

#### TAKE_PROFIT/TAKE_PROFIT_MARKET take profit order:

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

#### Request Parameters

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
| stopLoss        | string  | no       | Support setting stop loss while placing an order. Only supports type: STOP_MARKET/STOP                                                                                                                                                                                                                                                                                                                                                                    |
| takeProfit      | string  | no       | Support setting take profit while placing an order. Only supports type: TAKE_PROFIT_MARKET/TAKE_PROFIT                                                                                                                                                                                                                                                                                                                                                    |
| workingType     | string  | no       | StopPrice trigger price types: MARK_PRICE, CONTRACT_PRICE, default MARK_PRICE. When the type is STOP or STOP_MARKET, and stopGuaranteed is true, the workingType must only be CONTRACT_PRICE.                                                                                                                                                                                                                                                             |
| timestamp       | int64   | yes      | request timestamp, unit: millisecond                                                                                                                                                                                                                                                                                                                                                                                                                      |
| clientOrderId   | string  | no       | Customized order ID for users, with a limit of characters from 1 to 40. The system will convert this field to lowercase. Different orders cannot use the same clientOrderId, clientOrderId only supports LIMIT/MARKET order type                                                                                                                                                                                                                          |
| recvWindow      | int64   | no       | Request valid time window value, Unit: milliseconds                                                                                                                                                                                                                                                                                                                                                                                                       |
| timeInForce     | string  | no       | Time in Force, currently supports PostOnly, GTC, IOC, and FOK                                                                                                                                                                                                                                                                                                                                                                                             |
| closePosition   | string  | no       | true, false; all position squaring after triggering, only support STOP_MARKET and TAKE_PROFIT_MARKET; not used with quantity; comes with only position squaring effect, not used with reduceOnly                                                                                                                                                                                                                                                          |
| activationPrice | float64 | no       | Used with TRAILING_STOP_MARKET or TRAILING_TP_SL orders, default as the latest price(supporting different workingType)                                                                                                                                                                                                                                                                                                                                    |
| stopGuaranteed  | string  | no       | true: Enables the guaranteed stop-loss and take-profit feature; false: Disables the feature. The guaranteed stop-loss feature is not enabled by default. Supported order types include: STOP_MARKET: Market stop-loss order / TAKE_PROFIT_MARKET: Market take-profit order / STOP: Limit stop-loss order / TAKE_PROFIT: Limit take-profit order / TRIGGER_LIMIT: Stop-limit order with trigger / TRIGGER_MARKET: Market order with trigger for stop-loss. |
| positionId      | int64   | no       | In the Separate Isolated mode, closing a position must be transmitted                                                                                                                                                                                                                                                                                                                                                                                     |

#### Response Parameters

| Parameter Name | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| -------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol         | string | trading pair, for example: BTC-USDT                                                                                                                                                                                                                                                                                                                                                                                                                       |
| side           | string | buying and selling direction                                                                                                                                                                                                                                                                                                                                                                                                                              |
| type           | string | LIMIT: Limit Order / MARKET: Market Order / STOP_MARKET: Stop Market Order / TAKE_PROFIT_MARKET: Take Profit Market Order / STOP: Stop Limit Order / TAKE_PROFIT: Take Profit Limit Order / TRIGGER_LIMIT: Stop Limit Order with Trigger / TRIGGER_MARKET: Stop Market Order with Trigger / TRAILING_STOP_MARKET: Trailing Stop Market Order / TRAILING_TP_SL: Trailing TakeProfit or StopLoss                                                            |
| positionSide   | string | Position direction, required for single position as BOTH, for both long and short positions only LONG or SHORT can be chosen, defaults to LONG if empty                                                                                                                                                                                                                                                                                                   |
| reduceOnly     | string | true, false; Default value is false for single position mode; This parameter is not accepted for both long and short positions mode                                                                                                                                                                                                                                                                                                                       |
| orderId        | int64  | Order ID                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| workingType    | string | StopPrice trigger price types: MARK_PRICE, CONTRACT_PRICE, default MARK_PRICE. When the type is STOP or STOP_MARKET, and stopGuaranteed is true, the workingType must only be CONTRACT_PRICE.                                                                                                                                                                                                                                                             |
| clientOrderId  | string | Customized order ID for users. The system will convert this field to lowercase.                                                                                                                                                                                                                                                                                                                                                                           |
| stopGuaranteed | string | true: Enables the guaranteed stop-loss and take-profit feature; false: Disables the feature. The guaranteed stop-loss feature is not enabled by default. Supported order types include: STOP_MARKET: Market stop-loss order / TAKE_PROFIT_MARKET: Market take-profit order / STOP: Limit stop-loss order / TAKE_PROFIT: Limit take-profit order / TRIGGER_LIMIT: Stop-limit order with trigger / TRIGGER_MARKET: Market order with trigger for stop-loss. |
| executedQty    | string | Transaction quantity, coins                                                                                                                                                                                                                                                                                                                                                                                                                               |

#### Data Parameters

|                | Description                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type           | Only supports type: STOP_MARKET/STOP, TAKE_PROFIT_MARKET/TAKE_PROFIT                                                                                                                                                                                                                                                                                                                                                                                      |
| stopPrice      | Trigger price, only for STOP_MARKET, TAKE_PROFIT_MARKET, STOP, TAKE_PROFIT                                                                                                                                                                                                                                                                                                                                                                                |
| price          | Order price                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| workingType    | Trigger price type for stopPrice: MARK_PRICE, CONTRACT_PRICE, default is MARK_PRICE. When the type is STOP or STOP_MARKET, and stopGuaranteed is true, the workingType must only be CONTRACT_PRICE.                                                                                                                                                                                                                                                       |
| stopGuaranteed | true: Enables the guaranteed stop-loss and take-profit feature; false: Disables the feature. The guaranteed stop-loss feature is not enabled by default. Supported order types include: STOP_MARKET: Market stop-loss order / TAKE_PROFIT_MARKET: Market take-profit order / STOP: Limit stop-loss order / TAKE_PROFIT: Limit take-profit order / TRIGGER_LIMIT: Stop-limit order with trigger / TRIGGER_MARKET: Market order with trigger for stop-loss. |

#### Errors

| Error Code | Description                                                                                                                                                              |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 80014      | timestamp is invalid                                                                                                                                                     |
| 100421     | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets             |
| 100419     | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set                                                            |
| 100410     | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249                                      |
| 100410     | rate limited                                                                                                                                                             |
| 100413     | Incorrect apiKey                                                                                                                                                         |
| 100410     | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155                                          |
| 109400     | CATI-USDT,symbol not exist, please verify it in api: /openApi/swap/v2/quote/contracts                                                                                    |
| 80020      | risk forbidden                                                                                                                                                           |
| 80014      | Reminder: Due to the large market fluctuations, in order to reduce the risk of liquidation, API orders are temporarily disabled.                                         |
| 101400     | Please ensure that the minimum nominal value of the order placed must be greater than 2u                                                                                 |
| 101212     | Failed. Please check if you have pending orders under the trading pair. If yes, please cancel them and try again                                                         |
| 80020      | risk forbidden                                                                                                                                                           |
| 80014      | parameter quantity is must                                                                                                                                               |
| 110411     | Stop Loss price should be lower than the current price                                                                                                                   |
| 101205     | No position to close                                                                                                                                                     |
| 101204     | Insufficient margin                                                                                                                                                      |
| 80014      | Invalid parameters,positionSide: This field is required.                                                                                                                 |
| 101215     | The Maker (Post Only) order ensures that the user always acts as a maker. If the order would immediately match with available orders in the market, it will be canceled. |
| 110406     | Position SL order already exists                                                                                                                                         |
| 80001      | This operation is not allowed as your account assets are being processed. Please try again later.                                                                        |
| 110412     | Stop Loss price should be greater than the current price                                                                                                                 |
| 101290     | The Reduce Only order can only decrease the position and not be used to open a position. Please check your positions and open orders.                                    |
| 109400     | In the One-way mode, the 'PositionSide' field can only be set to BOTH.                                                                                                   |
| 101211     | Order price should be higher than 15.5                                                                                                                                   |
| 101481     | clientOrderID cannot be repeated                                                                                                                                         |
| 80017      | position not exist                                                                                                                                                       |
| 109400     | You have a copy trading signal in process, please try again later.                                                                                                       |
| 109400     | In the Hedge mode, the 'PositionSide' field can only be set to LONG or SHORT.                                                                                            |
| 101515     | You're temporarily suspended from trading. Please try again later.                                                                                                       |
| 110400     | The parameters submitted don't meet the requirement. Please try again later or contact customer support                                                                  |
| 101419     | Your order size has reached the upper limit                                                                                                                              |
| 110413     | Take Profit price should be greater than the current price                                                                                                               |
| 101209     | The maximum position value for this leverage is 170000 USDT.                                                                                                             |
| 101424     | This order exceeds the current position limit amount of 5000 USDT. Please complete your KYC to increase the maximum position limit.                                      |
| 101400     | The trading pair is not available for trading                                                                                                                            |
| 80012      | The current system is busy, please try again later                                                                                                                       |
| 101290     |                                                                                                                                                                          |
| 110407     | Position TP order already exists                                                                                                                                         |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Place order in
> demo
> trading](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Place
> order in demo trading)

### Place multiple orders

POST /openApi/swap/v2/trade/batchOrders

rate limitation by UID: 5/s & rate limitation by IP in group Number: 3

API KEY permission: Perpetual Futures Trading

Content-Type:request body(application/json)

#### Description

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

#### Request Parameters

| Parameter Name | Type  | Required | Description                                                                                        |
| -------------- | ----- | -------- | -------------------------------------------------------------------------------------------------- |
| batchOrders    | LIST  | yes      | Order list, supporting up to 5 orders, with Order objects referencing transactions to place orders |
| timestamp      | int64 | yes      | request timestamp, unit: millisecond                                                               |
| recvWindow     | int64 | no       | Request valid time window value, Unit: milliseconds                                                |

#### Response Parameters

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

#### Data Parameters

|                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol          | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT                                                                                                                                                                                                                                                                                                                                                                                      |
| type            | LIMIT: Limit Order / MARKET: Market Order / STOP_MARKET: Stop Market Order / TAKE_PROFIT_MARKET: Take Profit Market Order / STOP: Stop Limit Order / TAKE_PROFIT: Take Profit Limit Order / TRIGGER_LIMIT: Stop Limit Order with Trigger / TRIGGER_MARKET: Stop Market Order with Trigger / TRAILING_STOP_MARKET: Trailing Stop Market Order / TRAILING_TP_SL: Trailing TakeProfit or StopLoss                                                            |
| side            | buying and selling direction SELL, BUY                                                                                                                                                                                                                                                                                                                                                                                                                    |
| positionSide    | Position direction, required for single position as BOTH, for both long and short positions only LONG or SHORT can be chosen, defaults to LONG if empty                                                                                                                                                                                                                                                                                                   |
| reduceOnly      | true, false; Default value is false for single position mode; This parameter is not accepted for both long and short positions mode                                                                                                                                                                                                                                                                                                                       |
| price           | Price, represents the trailing stop distance in TRAILING_STOP_MARKET and TRAILING_TP_SL                                                                                                                                                                                                                                                                                                                                                                   |
| quantity        | Original quantity, only support units by COIN ,Ordering with quantity U is not currently supported.                                                                                                                                                                                                                                                                                                                                                       |
| stopPrice       | Trigger price, only required for STOP_MARKET, TAKE_PROFIT_MARKET, STOP, TAKE_PROFIT, TRIGGER_LIMIT, TRIGGER_MARKET                                                                                                                                                                                                                                                                                                                                        |
| priceRate       | For type: TRAILING_STOP_MARKET or TRAILING_TP_SL; Maximum: 1                                                                                                                                                                                                                                                                                                                                                                                              |
| stopLoss        | Support setting stop loss while placing an order. Only supports type: STOP_MARKET/STOP                                                                                                                                                                                                                                                                                                                                                                    |
| takeProfit      | Support setting take profit while placing an order. Only supports type: TAKE_PROFIT_MARKET/TAKE_PROFIT                                                                                                                                                                                                                                                                                                                                                    |
| timestamp       | request timestamp, unit: millisecond                                                                                                                                                                                                                                                                                                                                                                                                                      |
| clientOrderId   | Customized order ID for users, with a limit of characters from 1 to 40. The system will convert this field to lowercase. Different orders cannot use the same clientOrderId                                                                                                                                                                                                                                                                               |
| recvWindow      | Request valid time window value, Unit: milliseconds                                                                                                                                                                                                                                                                                                                                                                                                       |
| workingType     | StopPrice trigger price types: MARK_PRICE, CONTRACT_PRICE, default MARK_PRICE. When the type is STOP or STOP_MARKET, and stopGuaranteed is true, the workingType must only be CONTRACT_PRICE.                                                                                                                                                                                                                                                             |
| timeInForce     | Time in Force, currently supports PostOnly, GTC, IOC, and FOK                                                                                                                                                                                                                                                                                                                                                                                             |
| closePosition   | true, false; all position squaring after triggering, only support STOP_MARKET and TAKE_PROFIT_MARKET; not used with quantity; comes with only position squaring effect, not used with reduceOnly                                                                                                                                                                                                                                                          |
| activationPrice | Used with TRAILING_STOP_MARKET or TRAILING_TP_SL orders, default as the latest price(supporting different workingType)                                                                                                                                                                                                                                                                                                                                    |
| stopGuaranteed  | true: Enables the guaranteed stop-loss and take-profit feature; false: Disables the feature. The guaranteed stop-loss feature is not enabled by default. Supported order types include: STOP_MARKET: Market stop-loss order / TAKE_PROFIT_MARKET: Market take-profit order / STOP: Limit stop-loss order / TAKE_PROFIT: Limit take-profit order / TRIGGER_LIMIT: Stop-limit order with trigger / TRIGGER_MARKET: Market order with trigger for stop-loss. |
| positionId      | In the Separate Isolated mode, closing a position must be transmitted                                                                                                                                                                                                                                                                                                                                                                                     |

#### Errors

| Error Code | Description                                                                                                                                                                                                                                                                                                                                          |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 80014      | timestamp is invalid                                                                                                                                                                                                                                                                                                                                 |
| 100421     | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets                                                                                                                                                                                         |
| 100419     | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set                                                                                                                                                                                                                                        |
| 100410     | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249                                                                                                                                                                                                                  |
| 100410     | rate limited                                                                                                                                                                                                                                                                                                                                         |
| 100413     | Incorrect apiKey                                                                                                                                                                                                                                                                                                                                     |
| 100410     | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155                                                                                                                                                                                                                      |
| 109400     | CATI-USDT,symbol not exist, please verify it in api: /openApi/swap/v2/quote/contracts                                                                                                                                                                                                                                                                |
| 80020      | risk forbidden                                                                                                                                                                                                                                                                                                                                       |
| 80001      | No position to close; parameter quantity is must                                                                                                                                                                                                                                                                                                     |
| 80001      | No position to close; parameter quantity is must                                                                                                                                                                                                                                                                                                     |
| 80001      | No position to close; parameter quantity is must                                                                                                                                                                                                                                                                                                     |
| 109400     | Reminder: Due to the large market fluctuations, in order to reduce the risk of liquidation, API orders are temporarily disabled.                                                                                                                                                                                                                     |
| 109400     | symbol not exist                                                                                                                                                                                                                                                                                                                                     |
| 80001      | Failed. Please check if you have pending orders under the trading pair. If yes, please cancel them and try again; Failed. Please check if you have pending orders under the trading pair. If yes, please cancel them and try again; Failed. Please check if you have pending orders under the trading pair. If yes, please cancel them and try again |
| 80001      | No position to close                                                                                                                                                                                                                                                                                                                                 |
| 80001      | Insufficient margin                                                                                                                                                                                                                                                                                                                                  |
| 109400     | In the Hedge mode, the 'ReduceOnly' field can not be filled.; In the Hedge mode, the 'ReduceOnly' field can not be filled.                                                                                                                                                                                                                           |
| 80001      | This order exceeds the current position limit of 5000 USDT. Please try to reduce the leverage or adjust the order amount.; This order exceeds the current position limit of 5000 USDT. Please try to reduce the leverage or adjust the order amount.                                                                                                 |
| 80001      | The maximum position value for this leverage is 150000 USDT.                                                                                                                                                                                                                                                                                         |
| 100001     | Signature verification failed due to signature mismatch,please verify our authentication signature and try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets                                                                                                                        |
| 80020      | risk forbidden                                                                                                                                                                                                                                                                                                                                       |
| 80001      | Stop Loss price should be lower than the current price                                                                                                                                                                                                                                                                                               |
| 100421     | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets                                                                                                                                                                                         |
| 80001      | This operation is not allowed as your account assets are being processed. Please try again later.; This operation is not allowed as your account assets are being processed. Please try again later.                                                                                                                                                 |
| 80001      | In the Hedge mode, the 'PositionSide' field can only be set to LONG or SHORT.; In the Hedge mode, the 'PositionSide' field can only be set to LONG or SHORT.                                                                                                                                                                                         |
| 80001      | In the One-way mode, the 'PositionSide' field can only be set to BOTH.; In the One-way mode, the 'PositionSide' field can only be set to BOTH.; In the One-way mode, the 'PositionSide' field can only be set to BOTH.                                                                                                                               |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Place multiple
> orders](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Place
> multiple orders)

### Close All Positions

POST /openApi/swap/v2/trade/closeAllPositions

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type:request body(application/json)

One-click liquidation of all positions under the current account. Note that
one-click liquidation is triggered by a market order.

#### Request Parameters

| Parameter Name | Type   | Required | Description                                                      |
| -------------- | ------ | -------- | ---------------------------------------------------------------- |
| symbol         | string | no       | Trading pair, for example: BTC-USDT, please use capital letters. |
| timestamp      | int64  | yes      | request timestamp in milliseconds                                |
| recvWindow     | int64  | no       | Request valid time window value, Unit: milliseconds              |

#### Response Parameters

| Parameter Name | Type  | Description                                                   |
| -------------- | ----- | ------------------------------------------------------------- |
| success        | LIST  | Multiple order numbers generated by all one-click liquidation |
| failed         | array | the order number of the failed position closing               |

#### Errors

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
| 109201     | The same order number is only allowed to be submitted once within 1 second.                                                                                  |
| 80018      | order is already filled, The order doesn't exist                                                                                                             |
| 80001      | service has some errors, The order doesn't exist                                                                                                             |
| 109414     | order not exist                                                                                                                                              |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Close All
> Positions](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Close
> All Positions)

### Cancel Order

rate limitation by UID: 5/s & rate limitation by IP in group Number: 3

API KEY permission: Perpetual Futures Trading

Content-Type:request body(application/json)

Cancel an order that the current account is in the current entrusted state.

[1\. Create Account](https://bingx.com)
[2\. Pass KYC/KYB](https://bingx.com/en-us/account/api/)
[3\. Create API KEY](https://bingx.com/en-us/account/api/)
[4\. Configure API KEY permissions](https://bingx.com/en-us/account/api/)
[5\. Understanding signature authentication](https://bingx-api.github.io/docs/#/en-us/swapV2/authentication.html#Signature%20Description)
_6\. Run the following example code_
[7\. Understand common error codes](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Common%20Error%20Codes)
[8\. Understand rate limitations](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Rate%20limit)
[9\. Understanding request timestamps](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Timestamp)
[10\. Understand fee schedule](https://bingx.com/en-us/support/costs/)
[11\. Understand trading rules](https://bingx.com/en-us/tradeInfo/perpetual/trading-rules/BTC-USDT)

request parameters https://open-api.bingx.com

DELETE /openApi/swap/v2/trade/order

#### Request Parameters

| Parameter Name | Type   | Required | Description                                                                                                                                                                 |
| -------------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| orderId        | int64  | no       | Order ID                                                                                                                                                                    |
| symbol         | string | yes      | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT                                                                                                        |
| clientOrderId  | string | no       | Customized order ID for users, with a limit of characters from 1 to 40. The system will convert this field to lowercase. Different orders cannot use the same clientOrderId |
| timestamp      | int64  | yes      | request timestamp, unit: millisecond                                                                                                                                        |
| recvWindow     | int64  | no       | Request valid time window value, Unit: milliseconds                                                                                                                         |

#### Response Parameters

| Parameter Name | Type   | Description                                                                                                                                                                                                                                                                                                                                  |
| -------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| time           | int64  | order time, unit: millisecond                                                                                                                                                                                                                                                                                                                |
| symbol         | string | trading pair, for example: BTC-USDT                                                                                                                                                                                                                                                                                                          |
| side           | string | buying and selling direction                                                                                                                                                                                                                                                                                                                 |
| type           | string | LIMIT: Limit Order / MARKET: Market Order / STOP_MARKET: Stop Market Order / TAKE_PROFIT_MARKET: Take Profit Market Order / STOP: Stop Limit Order / TAKE_PROFIT: Take Profit Limit Order / TRIGGER_LIMIT: Stop Limit Order with Trigger / TRIGGER_MARKET: Stop Market Order with Trigger / TRAILING_STOP_MARKET: Trailing Stop Market Order |
| positionSide   | string | position side                                                                                                                                                                                                                                                                                                                                |
| cumQuote       | string | transaction amount                                                                                                                                                                                                                                                                                                                           |
| status         | string | order status                                                                                                                                                                                                                                                                                                                                 |
| stopPrice      | string | Trigger price                                                                                                                                                                                                                                                                                                                                |
| price          | string | Price                                                                                                                                                                                                                                                                                                                                        |
| origQty        | string | original order quantity                                                                                                                                                                                                                                                                                                                      |
| avgPrice       | string | average transaction price                                                                                                                                                                                                                                                                                                                    |
| executedQty    | string | volume                                                                                                                                                                                                                                                                                                                                       |
| orderId        | int64  | Order ID                                                                                                                                                                                                                                                                                                                                     |
| profit         | string | profit and loss                                                                                                                                                                                                                                                                                                                              |
| commission     | string | Fee                                                                                                                                                                                                                                                                                                                                          |
| updateTime     | int64  | update time, unit: millisecond                                                                                                                                                                                                                                                                                                               |
| clientOrderId  | string | Customized order ID for users. The system will convert this field to lowercase.                                                                                                                                                                                                                                                              |

#### Errors

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
| 109201     | The same order number is only allowed to be submitted once within 1 second.                                                                                  |
| 80018      | order is already filled, The order doesn't exist                                                                                                             |
| 80018      | order is already filled, The order doesn't exist                                                                                                             |
| 80001      | service has some errors, The order doesn't exist                                                                                                             |
| 109414     | order not exist                                                                                                                                              |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Cancel
> Order](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Cancel
> Order)

### Cancel multiple orders

rate limitation by UID: 5/s & rate limitation by IP in group Number: 3

API KEY permission: Perpetual Futures Trading

Content-Type:request body(application/json)

Batch cancellation of some of the orders whose current account is in the current
entrusted state.

DELETE /openApi/swap/v2/trade/batchOrders

#### Request Parameters

| Parameter Name    | Type   | Required | Description                                                                                                                    |
| ----------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------ |
| orderIdList       | LIST   | no       | system order number, up to 10 orders \[1234567,2345678\]                                                                       |
| clientOrderIdList | LIST   | no       | Customized order ID for users, up to 10 orders \["abc1234567","abc2345678"\]. The system will convert this field to lowercase. |
| symbol            | string | yes      | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT                                                           |
| timestamp         | int64  | yes      | request timestamp, unit: millisecond                                                                                           |
| recvWindow        | int64  | no       | Request valid time window value, Unit: milliseconds                                                                            |

#### Response Parameters

| Parameter Name | Type   | Description                                                              |
| -------------- | ------ | ------------------------------------------------------------------------ |
| code           | int64  | error code, 0 means successfully response, others means response failure |
| msg            | string | Error Details Description                                                |
| success        | LIST   | list of successfully canceled orders                                     |
| failed         | array  | list of failed orders                                                    |
| orderId        | int64  | Order ID                                                                 |
| errorCode      | int64  | error code, 0 means successfully response, others means response failure |
| errorMessage   | string | Error Details Description                                                |

#### Errors

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
| 80014      | orderIdList & clientOrderIDList are both empty;                                                                                                              |
| 109201     | The same order number is only allowed to be submitted once within 1 second.                                                                                  |
| 109201     | The same order number is only allowed to be submitted once within 1 second.                                                                                  |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Cancel
> multiple
> orders](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Cancel
> multiple orders)

### Cancel All Open Orders

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type:request body(application/json)

Cancel all orders in the current entrusted state of the current account.

DELETE /openApi/swap/v2/trade/allOpenOrders

#### Request Parameters

| Parameter Name | Type   | Required | Description                                                                                                                                                                                                                                                                                                                                                                                    |
| -------------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol         | string | no       | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT,if you do not fill this field,will delete all type of orders                                                                                                                                                                                                                                                              |
| type           | string | no       | LIMIT: Limit Order / MARKET: Market Order / STOP_MARKET: Stop Market Order / TAKE_PROFIT_MARKET: Take Profit Market Order / STOP: Stop Limit Order / TAKE_PROFIT: Take Profit Limit Order / TRIGGER_LIMIT: Stop Limit Order with Trigger / TRIGGER_MARKET: Stop Market Order with Trigger / TRAILING_STOP_MARKET: Trailing Stop Market Order / TRAILING_TP_SL: Trailing TakeProfit or StopLoss |
| timestamp      | int64  | yes      | request timestamp in milliseconds                                                                                                                                                                                                                                                                                                                                                              |
| recvWindow     | int64  | no       | Request valid time window value, Unit: milliseconds                                                                                                                                                                                                                                                                                                                                            |

#### Response Parameters

| Parameter Name | Type | Description                          |
| -------------- | ---- | ------------------------------------ |
| success        | LIST | list of successfully canceled orders |
| failed         | LIST | list of failed orders                |

#### Errors

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
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Cancel All
> Open
> Orders](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Cancel
> All Open Orders)

### Current All Open Orders

GET /openApi/swap/v2/trade/openOrders

rate limitation by UID: 5/s & rate limitation by IP in group Number: 3

API KEY permission: Perpetual Futures Trading

Content-Type:request body(application/json)

Query all orders that the user is currently entrusted with.

#### Request Parameters

| Parameter Name | Type   | Required | Description                                                                                                                                                                                                                                                                                                                                                                                    |
| -------------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol         | string | no       | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT,When not filled, query all pending orders. When filled, query the pending orders for the corresponding currency pair                                                                                                                                                                                                      |
| type           | string | no       | LIMIT: Limit Order / MARKET: Market Order / STOP_MARKET: Stop Market Order / TAKE_PROFIT_MARKET: Take Profit Market Order / STOP: Stop Limit Order / TAKE_PROFIT: Take Profit Limit Order / TRIGGER_LIMIT: Stop Limit Order with Trigger / TRIGGER_MARKET: Stop Market Order with Trigger / TRAILING_STOP_MARKET: Trailing Stop Market Order / TRAILING_TP_SL: Trailing TakeProfit or StopLoss |
| timestamp      | int64  | yes      | request timestamp in milliseconds                                                                                                                                                                                                                                                                                                                                                              |
| recvWindow     | int64  | no       | Request valid time window value, Unit: milliseconds                                                                                                                                                                                                                                                                                                                                            |

#### Response Parameters

| Parameter Name       | Type    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| -------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| time                 | int64   | order time, unit: millisecond                                                                                                                                                                                                                                                                                                                                                                                                                             |
| symbol               | string  | trading pair, for example: BTC-USDT                                                                                                                                                                                                                                                                                                                                                                                                                       |
| side                 | string  | buying and selling direction                                                                                                                                                                                                                                                                                                                                                                                                                              |
| type                 | string  | LIMIT: Limit Order / MARKET: Market Order / STOP_MARKET: Stop Market Order / TAKE_PROFIT_MARKET: Take Profit Market Order / STOP: Stop Limit Order / TAKE_PROFIT: Take Profit Limit Order / TRIGGER_LIMIT: Stop Limit Order with Trigger / TRIGGER_MARKET: Stop Market Order with Trigger / TRAILING_STOP_MARKET: Trailing Stop Market Order/ TRIGGER_REVERSE_MARKET: trigger reverse Market order / TRAILING_TP_SL: trailing take Profit or stop loss    |
| positionSide         | string  | Position direction, required for single position as BOTH, for both long and short positions only LONG or SHORT can be chosen, defaults to LONG if empty                                                                                                                                                                                                                                                                                                   |
| reduceOnly           | string  | true, false; Default value is false for single position mode; This parameter is not accepted for both long and short positions mode                                                                                                                                                                                                                                                                                                                       |
| cumQuote             | string  | transaction amount                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| status               | string  | order status                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| stopPrice            | string  | Trigger price                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| price                | string  | Price. When the type is TRAILING_STOP_MARKET or TRAILING_TP_SL, this field represents the trailing distance.                                                                                                                                                                                                                                                                                                                                              |
| origQty              | string  | original order quantity                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| avgPrice             | string  | average transaction price                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| executedQty          | string  | volume                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| orderId              | int64   | Order ID                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| profit               | string  | profit and loss                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| commission           | string  | Fee                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| workingType          | string  | StopPrice trigger price types: MARK_PRICE, CONTRACT_PRICE, default MARK_PRICE                                                                                                                                                                                                                                                                                                                                                                             |
| updateTime           | int64   | update time, unit: millisecond                                                                                                                                                                                                                                                                                                                                                                                                                            |
| postOnly             | bool    | Maker only                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| trailingStopRate     | float64 | Retracement rate                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| trailingStopDistance | int64   | trailing distance                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| stopGuaranteed       | string  | true: Enables the guaranteed stop-loss and take-profit feature; false: Disables the feature. The guaranteed stop-loss feature is not enabled by default. Supported order types include: STOP_MARKET: Market stop-loss order / TAKE_PROFIT_MARKET: Market take-profit order / STOP: Limit stop-loss order / TAKE_PROFIT: Limit take-profit order / TRIGGER_LIMIT: Stop-limit order with trigger / TRIGGER_MARKET: Market order with trigger for stop-loss. |
| priceRate            | string  | This field has a value only when the type is TRAILING_STOP_MARKET or TRAILING_TP_SL, and the priceRate is provided in the order; otherwise, it is an empty string.                                                                                                                                                                                                                                                                                        |
| actPrice             | string  | Activation price, used only for TRAILING_STOP_MARKET or TRAILING_TP_SL orders                                                                                                                                                                                                                                                                                                                                                                             |
| closePosition        | string  | Whether to close the entire position                                                                                                                                                                                                                                                                                                                                                                                                                      |

#### Data Parameters

|                  | Description    |
| ---------------- | -------------- |
| NEW              | New Order      |
| PARTIALLY_FILLED | Partial filled |
| FILLED           | all filled     |
| CANCELED         | canceled       |

#### Errors

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
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Current All
> Open
> Orders](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Current
> All Open Orders)

### Query pending order status

GET /openApi/swap/v2/trade/openOrder

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

Query order details

#### Request Parameters

| Parameter Name | Type   | Required | Description                                                                                                                |
| -------------- | ------ | -------- | -------------------------------------------------------------------------------------------------------------------------- |
| symbol         | string | yes      | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT                                                       |
| orderId        | int64  | no       | Order ID                                                                                                                   |
| clientOrderId  | string | no       | Customized order ID for users, with a limit of characters from 1 to 40. Different orders cannot use the same clientOrderId |
| timestamp      | int64  | yes      | request timestamp in milliseconds                                                                                          |
| recvWindow     | int64  | no       | Request valid time window value, Unit: milliseconds                                                                        |

#### Response Parameters

| Parameter Name | Type   | Description                                                                                                                                                                                                                                                                                                                                  |
| -------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| time           | int64  | order time, unit: millisecond                                                                                                                                                                                                                                                                                                                |
| symbol         | string | trading pair, for example: BTC-USDT                                                                                                                                                                                                                                                                                                          |
| side           | string | buying and selling direction                                                                                                                                                                                                                                                                                                                 |
| type           | string | LIMIT: Limit Order / MARKET: Market Order / STOP_MARKET: Stop Market Order / TAKE_PROFIT_MARKET: Take Profit Market Order / STOP: Stop Limit Order / TAKE_PROFIT: Take Profit Limit Order / TRIGGER_LIMIT: Stop Limit Order with Trigger / TRIGGER_MARKET: Stop Market Order with Trigger / TRAILING_STOP_MARKET: Trailing Stop Market Order |
| positionSide   | string | Position direction, required for single position as BOTH, for both long and short positions only LONG or SHORT can be chosen, defaults to LONG if empty                                                                                                                                                                                      |
| reduceOnly     | string | true, false; Default value is false for single position mode; This parameter is not accepted for both long and short positions mode                                                                                                                                                                                                          |
| cumQuote       | string | transaction amount                                                                                                                                                                                                                                                                                                                           |
| status         | string | order status                                                                                                                                                                                                                                                                                                                                 |
| stopPrice      | string | Trigger price                                                                                                                                                                                                                                                                                                                                |
| price          | string | Price                                                                                                                                                                                                                                                                                                                                        |
| origQty        | string | original order quantity                                                                                                                                                                                                                                                                                                                      |
| avgPrice       | string | average transaction price                                                                                                                                                                                                                                                                                                                    |
| executedQty    | string | volume                                                                                                                                                                                                                                                                                                                                       |
| orderId        | int64  | Order ID                                                                                                                                                                                                                                                                                                                                     |
| profit         | string | profit and loss                                                                                                                                                                                                                                                                                                                              |
| commission     | string | Fee                                                                                                                                                                                                                                                                                                                                          |
| updateTime     | int64  | update time, unit: millisecond                                                                                                                                                                                                                                                                                                               |
| workingType    | string | StopPrice trigger price types: MARK_PRICE, CONTRACT_PRICE, default MARK_PRICE                                                                                                                                                                                                                                                                |
| clientOrderId  | string | Customized order ID for users                                                                                                                                                                                                                                                                                                                |

#### Data Parameters

|     | Description |
| --- | ----------- |
| NEW | New Order   |

#### Errors

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
| 80016      | order does not exist                                                                                                                                         |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Query pending
> order
> status](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Query
> pending order status)

### Query Order details

GET /openApi/swap/v2/trade/order

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

Query order details

#### Request Parameters

| Parameter Name | Type   | Required | Description                                                                                                                                                                 |
| -------------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol         | string | yes      | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT                                                                                                        |
| orderId        | int64  | no       | Order ID                                                                                                                                                                    |
| clientOrderId  | string | no       | Customized order ID for users, with a limit of characters from 1 to 40. The system will convert this field to lowercase. Different orders cannot use the same clientOrderId |
| timestamp      | int64  | yes      | request timestamp in milliseconds                                                                                                                                           |
| recvWindow     | int64  | no       | Request valid time window value, Unit: milliseconds                                                                                                                         |

#### Response Parameters

| Parameter Name | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| -------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| time           | int64  | order time, unit: millisecond                                                                                                                                                                                                                                                                                                                                                                                                                             |
| symbol         | string | trading pair, for example: BTC-USDT                                                                                                                                                                                                                                                                                                                                                                                                                       |
| side           | string | buying and selling direction                                                                                                                                                                                                                                                                                                                                                                                                                              |
| type           | string | LIMIT: Limit Order / MARKET: Market Order / STOP_MARKET: Stop Market Order / TAKE_PROFIT_MARKET: Take Profit Market Order / STOP: Stop Limit Order / TAKE_PROFIT: Take Profit Limit Order / TRIGGER_LIMIT: Stop Limit Order with Trigger / TRIGGER_MARKET: Stop Market Order with Trigger / TRAILING_STOP_MARKET: Trailing Stop Market Order                                                                                                              |
| positionSide   | string | Position direction, required for single position as BOTH, for both long and short positions only LONG or SHORT can be chosen, defaults to LONG if empty                                                                                                                                                                                                                                                                                                   |
| reduceOnly     | string | true, false; Default value is false for single position mode; This parameter is not accepted for both long and short positions mode                                                                                                                                                                                                                                                                                                                       |
| cumQuote       | string | transaction amount                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| status         | string | order status                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| stopPrice      | string | Trigger price                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| price          | string | Price                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| origQty        | string | original order quantity                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| avgPrice       | string | average transaction price                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| executedQty    | string | volume                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| orderId        | int64  | Order ID                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| profit         | string | profit and loss                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| commission     | string | Fee                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| updateTime     | int64  | update time, unit: millisecond                                                                                                                                                                                                                                                                                                                                                                                                                            |
| workingType    | string | StopPrice trigger price types: MARK_PRICE, CONTRACT_PRICE, default MARK_PRICE                                                                                                                                                                                                                                                                                                                                                                             |
| clientOrderId  | string | Customized order ID for users. The system will convert this field to lowercase.                                                                                                                                                                                                                                                                                                                                                                           |
| stopGuaranteed | string | true: Enables the guaranteed stop-loss and take-profit feature; false: Disables the feature. The guaranteed stop-loss feature is not enabled by default. Supported order types include: STOP_MARKET: Market stop-loss order / TAKE_PROFIT_MARKET: Market take-profit order / STOP: Limit stop-loss order / TAKE_PROFIT: Limit take-profit order / TRIGGER_LIMIT: Stop-limit order with trigger / TRIGGER_MARKET: Market order with trigger for stop-loss. |
| triggerOrderId | int64  | trigger order ID associated with this order                                                                                                                                                                                                                                                                                                                                                                                                               |
| closePosition  | string | Whether to close the entire position                                                                                                                                                                                                                                                                                                                                                                                                                      |

#### Data Parameters

|                  | Description    |
| ---------------- | -------------- |
| NEW              | New Order      |
| PARTIALLY_FILLED | Partial filled |
| FILLED           | all filled     |
| CANCELED         | canceled       |

#### Errors

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
| 80016      | order does not exist                                                                                                                                         |
| 109414     | Request failed                                                                                                                                               |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Query Order
> details](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Query
> Order details)

### Query Margin Type

GET /openApi/swap/v2/trade/marginType

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

Query the user's margin mode on the specified symbol contract: isolated, cross
or separated isolated.

#### Request Parameters

| Parameter Name | Type   | Required | Description                                                          |
| -------------- | ------ | -------- | -------------------------------------------------------------------- |
| symbol         | string | yes      | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT |
| timestamp      | int64  | yes      | request timestamp in milliseconds                                    |
| recvWindow     | int64  | no       | Request valid time window value, Unit: milliseconds                  |

#### Response Parameters

| Parameter Name | Type   | Description |
| -------------- | ------ | ----------- |
| marginType     | string | margin mode |

#### Errors

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
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Query Margin
> Type](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Query
> Margin Type)

### Change Margin Type

POST /openApi/swap/v2/trade/marginType

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type:request body(application/json)

Change the user's margin mode on the specified symbol contract: isolated margin,
cross margin and separated isolated margin.

#### Request Parameters

| Parameter Name | Type   | Required | Description                                                                                                      |
| -------------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------- |
| symbol         | string | yes      | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT                                             |
| timestamp      | int64  | yes      | request timestamp in milliseconds                                                                                |
| marginType     | string | yes      | Margin mode ISOLATED (isolated margin), CROSSED (cross margin) and SEPARATE_ISOLATED (separated isolated margin) |
| recvWindow     | int64  | no       | Request valid time window value, Unit: milliseconds                                                              |

#### Response Parameters

| Parameter Name | Type   | Description                                                              |
| -------------- | ------ | ------------------------------------------------------------------------ |
| code           | int64  | error code, 0 means successfully response, others means response failure |
| msg            | string | Error Details Description                                                |

#### Errors

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
| 109400     | the account has positions or pending orders                                                                                                                  |
| 109500     | SetTradingStrategy network failed                                                                                                                            |
| 80012      | query Service Unavailable, err:contract not exist                                                                                                            |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Change Margin
> Type](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Change
> Margin Type)

### Query Leverage and Available Positions

GET /openApi/swap/v2/trade/leverage

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

Query the opening leverage and available positions of the user in the specified
symbol contract.

#### Request Parameters

| Parameter Name | Type   | Required | Description                                                          |
| -------------- | ------ | -------- | -------------------------------------------------------------------- |
| symbol         | string | yes      | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT |
| timestamp      | int64  | yes      | request timestamp in milliseconds                                    |
| recvWindow     | int64  | no       | Request valid time window value, Unit: milliseconds                  |

#### Response Parameters

| Parameter Name      | Type   | Description                  |
| ------------------- | ------ | ---------------------------- |
| longLeverage        | int64  | Long position leverage       |
| shortLeverage       | int64  | Short position Leverage      |
| maxLongLeverage     | int64  | Max Long position leverage   |
| maxShortLeverage    | int64  | Max Short position Leverage  |
| availableLongVol    | string | Available Long Volume        |
| availableShortVol   | string | Available Short Volume       |
| availableLongVal    | string | Available Long Value         |
| availableShortVal   | string | Available Short Value        |
| maxPositionLongVal  | string | Maximum Position Long Value  |
| maxPositionShortVal | string | Maximum Position Short Value |

#### Errors

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
| 109500     | Account Service Unavailable, err:symbol not exist                                                                                                            |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Query Leverage
> and Available
> Positions](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Query
> Leverage and Available Positions)

### Set Leverage

POST /openApi/swap/v2/trade/leverage

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type:request body(application/json)

Adjust the user's opening leverage in the specified symbol contract.

#### Request Parameters

| Parameter Name | Type   | Required | Description                                                                                                                                           |
| -------------- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol         | string | yes      | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT                                                                                  |
| side           | string | yes      | Leverage for long or short positions. In the Hedge mode, LONG for long positions, SHORT for short positions. In the One-way mode, only supports BOTH. |
| timestamp      | int64  | yes      | request timestamp in milliseconds                                                                                                                     |
| leverage       | int64  | yes      | leverage                                                                                                                                              |
| recvWindow     | int64  | no       | Request valid time window value, Unit: milliseconds                                                                                                   |

#### Response Parameters

| Parameter Name      | Type   | Description                  |
| ------------------- | ------ | ---------------------------- |
| leverage            | int64  | leverage                     |
| symbol              | string | trading pair                 |
| availableLongVol    | string | Available Long Volume        |
| availableShortVol   | string | Available Short Volume       |
| availableLongVal    | string | Available Long Value         |
| availableShortVal   | string | Available Short Value        |
| maxPositionLongVal  | string | Maximum Position Long Value  |
| maxPositionShortVal | string | Maximum Position Short Value |

#### Errors

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
| 109400     | margin is not enough                                                                                                                                         |
| 109400     | In the Hedge mode, the 'Side' field can only be set to LONG or SHORT.                                                                                        |
| 109400     | In the One-way mode, the 'Side' field can only be set to BOTH.                                                                                               |
| 109500     | symbol not exist                                                                                                                                             |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Set
> Leverage](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Set
> Leverage)

### User's Force Orders

GET /openApi/swap/v2/trade/forceOrders

rate limitation by UID: 10/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type:request body(application/json)

Query the user's forced liquidation order.

- If "startTime" is not passed, only the data within 7 days before "endTime"
  will be returned

[1\. Create Account](https://bingx.com)
[2\. Pass KYC/KYB](https://bingx.com/en-us/account/api/)
[3\. Create API KEY](https://bingx.com/en-us/account/api/)
[4\. Configure API KEY permissions](https://bingx.com/en-us/account/api/)
[5\. Understanding signature authentication](https://bingx-api.github.io/docs/#/en-us/swapV2/authentication.html#Signature%20Description)
_6\. Run the following example code_
[7\. Understand common error codes](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Common%20Error%20Codes)
[8\. Understand rate limitations](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Rate%20limit)
[9\. Understanding request timestamps](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Timestamp)
[10\. Understand fee schedule](https://bingx.com/en-us/support/costs/)
[11\. Understand trading rules](https://bingx.com/en-us/tradeInfo/perpetual/trading-rules/BTC-USDT)

request parameters https://open-api.bingx.com

#### Request Parameters

| Parameter Name | Type   | Required | Description                                                                          |
| -------------- | ------ | -------- | ------------------------------------------------------------------------------------ |
| symbol         | string | no       | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT                 |
| currency       | string | no       | USDC or USDT                                                                         |
| autoCloseType  | string | no       | "LIQUIDATION":liquidation order, "ADL":ADL liquidation order                         |
| startTime      | int64  | no       | Start time, unit: millisecond                                                        |
| endTime        | int64  | no       | End time, unit: millisecond                                                          |
| limit          | int    | no       | The number of returned result sets The default value is 50, the maximum value is 100 |
| timestamp      | int64  | yes      | request timestamp in milliseconds                                                    |
| recvWindow     | int64  | no       | Request valid time window value, Unit: milliseconds                                  |

#### Response Parameters

| Parameter Name | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| -------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| time           | int64  | order time, unit: millisecond                                                                                                                                                                                                                                                                                                                                                                                                                             |
| symbol         | string | trading pair, for example: BTC-USDT                                                                                                                                                                                                                                                                                                                                                                                                                       |
| side           | string | buying and selling direction                                                                                                                                                                                                                                                                                                                                                                                                                              |
| type           | string | LIMIT: Limit Order / MARKET: Market Order / STOP_MARKET: Stop Market Order / TAKE_PROFIT_MARKET: Take Profit Market Order / STOP: Stop Limit Order / TAKE_PROFIT: Take Profit Limit Order / TRIGGER_LIMIT: Stop Limit Order with Trigger / TRIGGER_MARKET: Stop Market Order with Trigger / TRAILING_STOP_MARKET: Trailing Stop Market Order                                                                                                              |
| positionSide   | string | Position direction, required for single position as BOTH, for both long and short positions only LONG or SHORT can be chosen, defaults to LONG if empty                                                                                                                                                                                                                                                                                                   |
| reduceOnly     | string | true, false; Default value is false for single position mode; This parameter is not accepted for both long and short positions mode                                                                                                                                                                                                                                                                                                                       |
| cumQuote       | string | transaction amount                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| status         | string | order status                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| stopPrice      | string | Trigger price                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| price          | string | Price                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| origQty        | string | original order quantity                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| avgPrice       | string | average transaction price                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| executedQty    | string | volume                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| orderId        | int64  | Order ID                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| profit         | string | profit and loss                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| commission     | string | Fee                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| workingType    | string | StopPrice trigger price types: MARK_PRICE, CONTRACT_PRICE, default MARK_PRICE                                                                                                                                                                                                                                                                                                                                                                             |
| updateTime     | int64  | update time, unit: millisecond                                                                                                                                                                                                                                                                                                                                                                                                                            |
| stopGuaranteed | string | true: Enables the guaranteed stop-loss and take-profit feature; false: Disables the feature. The guaranteed stop-loss feature is not enabled by default. Supported order types include: STOP_MARKET: Market stop-loss order / TAKE_PROFIT_MARKET: Market take-profit order / STOP: Limit stop-loss order / TAKE_PROFIT: Limit take-profit order / TRIGGER_LIMIT: Stop-limit order with trigger / TRIGGER_MARKET: Market order with trigger for stop-loss. |

#### Errors

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
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#User's Force
> Orders](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#User's
> Force Orders)

### Query Order history

GET /openApi/swap/v2/trade/allOrders

rate limitation by UID: 5/s & rate limitation by IP in group Number: 3

API KEY permission: Perpetual Futures Trading

Content-Type:request body(application/json)

Query the user's historical orders (order status is completed or canceled).

- Query data within the last 7 days by default

- Return order list sorted by updateTime from smallest to largest

[1\. Create Account](https://bingx.com)
[2\. Pass KYC/KYB](https://bingx.com/en-us/account/api/)
[3\. Create API KEY](https://bingx.com/en-us/account/api/)
[4\. Configure API KEY permissions](https://bingx.com/en-us/account/api/)
[5\. Understanding signature authentication](https://bingx-api.github.io/docs/#/en-us/swapV2/authentication.html#Signature%20Description)
_6\. Run the following example code_
[7\. Understand common error codes](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Common%20Error%20Codes)
[8\. Understand rate limitations](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Rate%20limit)
[9\. Understanding request timestamps](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Timestamp)
[10\. Understand fee schedule](https://bingx.com/en-us/support/costs/)
[11\. Understand trading rules](https://bingx.com/en-us/tradeInfo/perpetual/trading-rules/BTC-USDT)

request parameters https://open-api.bingx.com

#### Request Parameters

| Parameter Name | Type   | Required | Description                                                                                                                                                |
| -------------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol         | string | no       | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT.If no symbol is specified, it will query the historical orders for all trading pairs. |
| currency       | string | no       | USDC or USDT                                                                                                                                               |
| orderId        | int64  | no       | Only return subsequent orders, and return the latest order by default                                                                                      |
| startTime      | int64  | no       | Start time, unit: millisecond                                                                                                                              |
| endTime        | int64  | no       | End time, unit: millisecond                                                                                                                                |
| limit          | int    | yes      | number of result sets to return Default: 500 Maximum: 1000                                                                                                 |
| timestamp      | int64  | yes      | request timestamp in milliseconds                                                                                                                          |
| recvWindow     | int64  | no       | Request valid time window value, Unit: milliseconds                                                                                                        |

#### Response Parameters

| Parameter Name | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| -------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| time           | int64  | order time, unit: millisecond                                                                                                                                                                                                                                                                                                                                                                                                                             |
| symbol         | string | trading pair, for example: BTC-USDT.If a specific pair is not provided, a history of transactions for all pairs will be returned                                                                                                                                                                                                                                                                                                                          |
| side           | string | buying and selling direction                                                                                                                                                                                                                                                                                                                                                                                                                              |
| type           | string | LIMIT: Limit Order / MARKET: Market Order / STOP_MARKET: Stop Market Order / TAKE_PROFIT_MARKET: Take Profit Market Order / STOP: Stop Limit Order / TAKE_PROFIT: Take Profit Limit Order / TRIGGER_LIMIT: Stop Limit Order with Trigger / TRIGGER_MARKET: Stop Market Order with Trigger / TRAILING_STOP_MARKET: Trailing Stop Market Order                                                                                                              |
| positionSide   | string | Position direction, required for single position as BOTH, for both long and short positions only LONG or SHORT can be chosen, defaults to LONG if empty                                                                                                                                                                                                                                                                                                   |
| reduceOnly     | string | true, false; Default value is false for single position mode; This parameter is not accepted for both long and short positions mode                                                                                                                                                                                                                                                                                                                       |
| cumQuote       | string | transaction amount                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| status         | string | order status                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| stopPrice      | string | Trigger price                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| price          | string | Price                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| origQty        | string | original order quantity                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| avgPrice       | string | average transaction price                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| executedQty    | string | volume                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| orderId        | int64  | Order ID                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| profit         | string | profit and loss                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| commission     | string | Fee                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| workingType    | string | StopPrice trigger price types: MARK_PRICE, CONTRACT_PRICE, default MARK_PRICE                                                                                                                                                                                                                                                                                                                                                                             |
| updateTime     | int64  | update time, unit: millisecond                                                                                                                                                                                                                                                                                                                                                                                                                            |
| stopGuaranteed | string | true: Enables the guaranteed stop-loss and take-profit feature; false: Disables the feature. The guaranteed stop-loss feature is not enabled by default. Supported order types include: STOP_MARKET: Market stop-loss order / TAKE_PROFIT_MARKET: Market take-profit order / STOP: Limit stop-loss order / TAKE_PROFIT: Limit take-profit order / TRIGGER_LIMIT: Stop-limit order with trigger / TRIGGER_MARKET: Market order with trigger for stop-loss. |
| triggerOrderId | int64  | trigger order ID associated with this order                                                                                                                                                                                                                                                                                                                                                                                                               |
| isTwap         | bool   | Whether it is a TWAP order, true: yes, false: no                                                                                                                                                                                                                                                                                                                                                                                                          |
| mainOrderId    | string | TWAP order number                                                                                                                                                                                                                                                                                                                                                                                                                                         |

#### Errors

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
| 80014      | the query range is more than seven days                                                                                                                      |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Query Order
> history](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Query
> Order history)

### Modify Isolated Position Margin

POST /openApi/swap/v2/trade/positionMargin

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type:request body(application/json)

Adjust the isolated margin funds for the positions in the isolated position
mode.

#### Request Parameters

| Parameter Name | Type    | Required | Description                                                                   |
| -------------- | ------- | -------- | ----------------------------------------------------------------------------- |
| symbol         | string  | yes      | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT          |
| amount         | float64 | yes      | margin funds                                                                  |
| type           | int     | yes      | adjustment direction 1: increase isolated margin, 2: decrease isolated margin |
| positionSide   | string  | no       | Position direction, and only LONG or SHORT can be selected                    |
| positionId     | int64   | no       | Position ID, if it is filled, the system will use the positionId first        |
| timestamp      | int64   | yes      | request timestamp in milliseconds                                             |
| recvWindow     | int64   | no       | Request valid time window value, Unit: milliseconds                           |

#### Response Parameters

| Parameter Name | Type    | Description                                                                   |
| -------------- | ------- | ----------------------------------------------------------------------------- |
| code           | int64   | error code, 0 means successfully response, others means response failure      |
| msg            | string  | Error Details Description                                                     |
| amount         | float64 | margin funds                                                                  |
| type           | int     | adjustment direction 1: increase isolated margin, 2: decrease isolated margin |
| positionId     | int64   | Position ID                                                                   |

#### Errors

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
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Modify
> Isolated Position
> Margin](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Modify
> Isolated Position Margin)

### Query historical transaction orders

GET /openApi/swap/v2/trade/allFillOrders

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type:request body(application/json)

Obtain the transaction history of a certain transaction pair

[1\. Create Account](https://bingx.com)
[2\. Pass KYC/KYB](https://bingx.com/en-us/account/api/)
[3\. Create API KEY](https://bingx.com/en-us/account/api/)
[4\. Configure API KEY permissions](https://bingx.com/en-us/account/api/)
[5\. Understanding signature authentication](https://bingx-api.github.io/docs/#/en-us/swapV2/authentication.html#Signature%20Description)
_6\. Run the following example code_
[7\. Understand common error codes](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Common%20Error%20Codes)
[8\. Understand rate limitations](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Rate%20limit)
[9\. Understanding request timestamps](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Timestamp)
[10\. Understand fee schedule](https://bingx.com/en-us/support/costs/)
[11\. Understand trading rules](https://bingx.com/en-us/tradeInfo/perpetual/trading-rules/BTC-USDT)

request parameters https://open-api.bingx.com

#### Request Parameters

| Parameter Name | Type   | Required | Description                                                                                                                                     |
| -------------- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| orderId        | int64  | no       | If orderId is provided, only the filled orders of that orderId are returned                                                                     |
| currency       | string | no       | USDC or USDT                                                                                                                                    |
| tradingUnit    | string | yes      | Trading unit, optional values: COIN,CONT; COIN directly represent assets such as BTC and ETH, and CONT represents the number of contract sheets |
| startTs        | int64  | yes      | Starting timestamp in milliseconds                                                                                                              |
| endTs          | int64  | yes      | End timestamp in milliseconds                                                                                                                   |
| timestamp      | int64  | yes      | request timestamp, unit: millisecond                                                                                                            |
| recvWindow     | int64  | no       | Request valid time window value, Unit: milliseconds                                                                                             |

#### Response Parameters

| Parameter Name        | Type   | Description                                                                                                                                                                                                                                                                                                                                  |
| --------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| filledTm              | string | Transaction time, format: 2024-10-24T17:13:12Z                                                                                                                                                                                                                                                                                               |
| symbol                | string | trading pair, for example: BTC-USDT                                                                                                                                                                                                                                                                                                          |
| volume                | string | Transaction quantity                                                                                                                                                                                                                                                                                                                         |
| price                 | string | Transaction price                                                                                                                                                                                                                                                                                                                            |
| amount                | string | Transaction amount                                                                                                                                                                                                                                                                                                                           |
| commission            | string | commission                                                                                                                                                                                                                                                                                                                                   |
| currency              | string | Asset unit, usually USDT                                                                                                                                                                                                                                                                                                                     |
| orderId               | string | order id                                                                                                                                                                                                                                                                                                                                     |
| liquidatedPrice       | string | Estimating strong parity, triggering the estimated strong parity at the time of strong parity, only available for strong parity orders                                                                                                                                                                                                       |
| liquidatedMarginRatio | string | Strong average margin rate, which triggers the strong average margin rate at the time of strong average, only available for strong average orders                                                                                                                                                                                            |
| workingType           | string | StopPrice trigger price types: MARK_PRICE, CONTRACT_PRICE, default MARK_PRICE                                                                                                                                                                                                                                                                |
| filledTime            | string | Match the transaction time in the format of 2006-01-02T15:04:05.999+0800                                                                                                                                                                                                                                                                     |
| side                  | string | buying and selling direction                                                                                                                                                                                                                                                                                                                 |
| type                  | string | LIMIT: Limit Order / MARKET: Market Order / STOP_MARKET: Stop Market Order / TAKE_PROFIT_MARKET: Take Profit Market Order / STOP: Stop Limit Order / TAKE_PROFIT: Take Profit Limit Order / TRIGGER_LIMIT: Stop Limit Order with Trigger / TRIGGER_MARKET: Stop Market Order with Trigger / TRAILING_STOP_MARKET: Trailing Stop Market Order |
| positionSide          | string | Position direction, required for single position as BOTH, for both long and short positions only LONG or SHORT can be chosen, defaults to LONG if empty                                                                                                                                                                                      |
| clientOrderID         | string | Customized order ID for users                                                                                                                                                                                                                                                                                                                |
| onlyOnePosition       | bool   | is OneWay Position mode, true: yes; false: no                                                                                                                                                                                                                                                                                                |

#### Errors

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
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Query
> historical transaction
> orders](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Query
> historical transaction orders)

### Set Position Mode

POST /openApi/swap/v1/positionSide/dual

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type:request body(application/json)

Used to set the position mode of perpetual contract, supporting both dual
position mode and single position mode

\*The Position Mode applies to all contracts and can be set when there are no
active positions or pending orders.

#### Request Parameters

| Parameter Name   | Type  | Required | Description                                                  |
| ---------------- | ----- | -------- | ------------------------------------------------------------ |
| dualSidePosition | true  | Yes      | "true": dual position mode; "false": single position mode    |
| timestamp        | int64 | Yes      | Timestamp of the request in milliseconds                     |
| recvWindow       | int64 | No       | The window time for the request to be valid, in milliseconds |

#### Response Parameters

| Parameter Name   | Type   | Description                                               |
| ---------------- | ------ | --------------------------------------------------------- |
| dualSidePosition | string | "true": dual position mode; "false": single position mode |

#### Errors

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
| 80001      | margin not enough                                                                                                                                            |
| 80017      | position not exist                                                                                                                                           |
| 80001      | position is not isolated                                                                                                                                     |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Set Position
> Mode](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Set
> Position Mode)

### Query position mode

GET /openApi/swap/v1/positionSide/dual

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type:request body(application/json)

Used to get the position mode of perpetual contract, supporting both dual
position mode and single position mode

#### Request Parameters

| Parameter Name | Type  | Required | Description                                                  |
| -------------- | ----- | -------- | ------------------------------------------------------------ |
| timestamp      | int64 | Yes      | Timestamp of the request in milliseconds                     |
| recvWindow     | int64 | No       | The window time for the request to be valid, in milliseconds |

#### Response Parameters

| Parameter Name   | Type   | Description                                               |
| ---------------- | ------ | --------------------------------------------------------- |
| dualSidePosition | string | "true": dual position mode; "false": single position mode |

#### Errors

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
| 109401     | user has pending orders or position                                                                                                                          |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Query position
> mode](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Query
> position mode)

### Cancel an Existing Order and Send a New Orde

POST /openApi/swap/v1/trade/cancelReplace

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type:request body(application/json)

This api is used to cancel an order and place a new one on the same trading
pair.

#### Request Parameters

| Parameter Name      | Type    | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ------------------- | ------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| cancelReplaceMode   | string  | yes      | STOP_ON_FAILURE: If the order cancellation fails, the replacement order will not continue. ALLOW_FAILURE: Regardless of the success of the order cancellation, the replacement order will proceed.                                                                                                                                                                                                                                                        |
| cancelClientOrderId | string  | no       | The original client-defined order ID to be canceled. The system will convert this field to lowercase. Either cancelClientOrderId or cancelOrderId must be provided. If both parameters are provided, cancelOrderId takes precedence.                                                                                                                                                                                                                      |
| cancelOrderId       | int64   | no       | The platform order ID to be canceled. Either cancelClientOrderId or cancelOrderId must be provided. If both parameters are provided, cancelOrderId takes precedence.                                                                                                                                                                                                                                                                                      |
| cancelRestrictions  | string  | no       | ONLY_NEW: If the order status is NEW, the cancellation will succeed. ONLY_PENDING: If the order status is PENDING, the cancellation will succeed. ONLY_PARTIALLY_FILLED: If the order status is PARTIALLY_FILLED, the cancellation will succeed.                                                                                                                                                                                                          |
| symbol              | string  | yes      | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT                                                                                                                                                                                                                                                                                                                                                                                      |
| type                | string  | yes      | LIMIT: Limit Order / MARKET: Market Order / STOP_MARKET: Stop Market Order / TAKE_PROFIT_MARKET: Take Profit Market Order / STOP: Stop Limit Order / TAKE_PROFIT: Take Profit Limit Order / TRIGGER_LIMIT: Stop Limit Order with Trigger / TRIGGER_MARKET: Stop Market Order with Trigger / TRAILING_STOP_MARKET: Trailing Stop Market Order / TRAILING_TP_SL: Trailing TakeProfit or StopLoss                                                            |
| side                | string  | yes      | buying and selling direction SELL, BUY                                                                                                                                                                                                                                                                                                                                                                                                                    |
| positionSide        | string  | yes      | Position direction, required for single position as BOTH, for both long and short positions only LONG or SHORT can be chosen, defaults to LONG if empty                                                                                                                                                                                                                                                                                                   |
| reduceOnly          | string  | no       | true, false; Default value is false for single position mode; This parameter is not accepted for both long and short positions mode                                                                                                                                                                                                                                                                                                                       |
| price               | float64 | no       | Price, represents the trailing stop distance in TRAILING_STOP_MARKET and TRAILING_TP_SL                                                                                                                                                                                                                                                                                                                                                                   |
| quantity            | float64 | no       | Original quantity, only support units by COIN ,Ordering with quantity U is not currently supported.                                                                                                                                                                                                                                                                                                                                                       |
| stopPrice           | float64 | no       | Trigger price, only required for STOP_MARKET, TAKE_PROFIT_MARKET, STOP, TAKE_PROFIT, TRIGGER_LIMIT, TRIGGER_MARKET                                                                                                                                                                                                                                                                                                                                        |
| priceRate           | float64 | no       | For type: TRAILING_STOP_MARKET or TRAILING_TP_SL ; Maximum: 1                                                                                                                                                                                                                                                                                                                                                                                             |
| workingType         | string  | no       | StopPrice trigger price types: MARK_PRICE, CONTRACT_PRICE, default MARK_PRICE. When the type is STOP or STOP_MARKET, and stopGuaranteed is true, the workingType must only be CONTRACT_PRICE.                                                                                                                                                                                                                                                             |
| stopLoss            | string  | no       | Support setting stop loss while placing an order. Only supports type: STOP_MARKET/STOP                                                                                                                                                                                                                                                                                                                                                                    |
| takeProfit          | string  | no       | Support setting take profit while placing an order. Only supports type: TAKE_PROFIT_MARKET/TAKE_PROFIT                                                                                                                                                                                                                                                                                                                                                    |
| clientOrderId       | string  | no       | Customized order ID for users, with a limit of characters from 1 to 40. The system will convert this field to lowercase. Different orders cannot use the same clientOrderId, clientOrderId only supports LIMIT/MARKET order type                                                                                                                                                                                                                          |
| timestamp           | int64   | yes      | request timestamp, unit: millisecond                                                                                                                                                                                                                                                                                                                                                                                                                      |
| recvWindow          | int64   | no       | Request valid time window value, Unit: milliseconds                                                                                                                                                                                                                                                                                                                                                                                                       |
| closePosition       | string  | no       | true, false; all position squaring after triggering, only support STOP_MARKET and TAKE_PROFIT_MARKET; not used with quantity; comes with only position squaring effect, not used with reduceOnly                                                                                                                                                                                                                                                          |
| activationPrice     | float64 | no       | Used with TRAILING_STOP_MARKET or TRAILING_TP_SL orders, default as the latest price(supporting different workingType)                                                                                                                                                                                                                                                                                                                                    |
| stopGuaranteed      | string  | no       | true: Enables the guaranteed stop-loss and take-profit feature; false: Disables the feature. The guaranteed stop-loss feature is not enabled by default. Supported order types include: STOP_MARKET: Market stop-loss order / TAKE_PROFIT_MARKET: Market take-profit order / STOP: Limit stop-loss order / TAKE_PROFIT: Limit take-profit order / TRIGGER_LIMIT: Stop-limit order with trigger / TRIGGER_MARKET: Market order with trigger for stop-loss. |
| timeInForce         | string  | no       | Time in Force, currently supports PostOnly, GTC, IOC, and FOK                                                                                                                                                                                                                                                                                                                                                                                             |
| positionId          | int64   | no       | In the Separate Isolated mode, closing a position must be transmitted                                                                                                                                                                                                                                                                                                                                                                                     |

#### Response Parameters

| Parameter Name   | Type             | Description                                                                    |
| ---------------- | ---------------- | ------------------------------------------------------------------------------ |
| cancelResult     | string           | Cancellation result. true: Cancellation successful, false: Cancellation failed |
| cancelMsg        | string           | Reason for the cancellation failure                                            |
| cancelResponse   | CancelResponse   | Information about the canceled order                                           |
| replaceResult    | string           | Replacement result. true: Replacement successful, false: Replacement failed    |
| replaceMsg       | string           | Reason for the replacement failure                                             |
| newOrderResponse | NewOrderResponse | Information about the new order                                                |

#### Data Parameters

|                | Description                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type           | Only supports type: STOP_MARKET/STOP, TAKE_PROFIT_MARKET/TAKE_PROFIT                                                                                                                                                                                                                                                                                                                                                                                      |
| stopPrice      | Trigger price, only for STOP_MARKET, TAKE_PROFIT_MARKET, STOP, TAKE_PROFIT                                                                                                                                                                                                                                                                                                                                                                                |
| price          | Order price                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| workingType    | Trigger price type for stopPrice: MARK_PRICE, CONTRACT_PRICE, default is MARK_PRICE. When the type is STOP or STOP_MARKET, and stopGuaranteed is true, the workingType must only be CONTRACT_PRICE.                                                                                                                                                                                                                                                       |
| stopGuaranteed | true: Enables the guaranteed stop-loss and take-profit feature; false: Disables the feature. The guaranteed stop-loss feature is not enabled by default. Supported order types include: STOP_MARKET: Market stop-loss order / TAKE_PROFIT_MARKET: Market take-profit order / STOP: Limit stop-loss order / TAKE_PROFIT: Limit take-profit order / TRIGGER_LIMIT: Stop-limit order with trigger / TRIGGER_MARKET: Market order with trigger for stop-loss. |

#### Errors

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
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Cancel an
> Existing Order and Send a New
> Orde](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Cancel an
> Existing Order and Send a New Orde)

### Cancel orders in batches and place orders in batches

POST /openApi/swap/v1/trade/batchCancelReplace

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type:request body(application/json)

This api is used to cancel orders in batches and place orders in batches.

#### Request Parameters

| Parameter Name | Type   | Required | Description                                         |
| -------------- | ------ | -------- | --------------------------------------------------- |
| batchOrders    | string | yes      | A batch of orders, string form of LIST              |
| timestamp      | int64  | yes      | request timestamp, unit: millisecond                |
| recvWindow     | int64  | no       | Request valid time window value, Unit: milliseconds |

#### Response Parameters

| Parameter Name | Type          | Description                                                              |
| -------------- | ------------- | ------------------------------------------------------------------------ |
| code           | Int64         | error code, 0 means successfully response, others means response failure |
| msg            | string        | Error Details Description                                                |
| OrderResponse  | OrderResponse |                                                                          |

#### Data Parameters

|                | Description                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type           | Only supports type: STOP_MARKET/STOP, TAKE_PROFIT_MARKET/TAKE_PROFIT                                                                                                                                                                                                                                                                                                                                                                                      |
| stopPrice      | Trigger price, only for STOP_MARKET, TAKE_PROFIT_MARKET, STOP, TAKE_PROFIT                                                                                                                                                                                                                                                                                                                                                                                |
| price          | Order price                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| workingType    | Trigger price type for stopPrice: MARK_PRICE, CONTRACT_PRICE, default is MARK_PRICE. When the type is STOP or STOP_MARKET, and stopGuaranteed is true, the workingType must only be CONTRACT_PRICE.                                                                                                                                                                                                                                                       |
| stopGuaranteed | true: Enables the guaranteed stop-loss and take-profit feature; false: Disables the feature. The guaranteed stop-loss feature is not enabled by default. Supported order types include: STOP_MARKET: Market stop-loss order / TAKE_PROFIT_MARKET: Market take-profit order / STOP: Limit stop-loss order / TAKE_PROFIT: Limit take-profit order / TRIGGER_LIMIT: Stop-limit order with trigger / TRIGGER_MARKET: Market order with trigger for stop-loss. |

#### Errors

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
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Cancel orders
> in batches and place orders in
> batches](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Cancel
> orders in batches and place orders in batches)

### Cancel All After

POST /openApi/swap/v2/trade/cancelAllAfter

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type:request body(application/json)

After the countdown ends, cancel all current pending orders. This request can be
continuously maintained to constantly extend the penalty time.

Rate limit: 1 time/1s

If you have a large amount of pending orders, they will be canceled in batches,
which may take several seconds to cancel in batches. In addition, during the
process of canceling all pending orders, the system will reject further ACTIVATE
and CLOSE requests. After the system has completed the task of canceling all
pending orders, it can continue to accept ACTIVATE and CLOSE requests.

HTTP request

Interface parameters

#### Request Parameters

| Parameter Name | Type   | Required | Description                                        |
| -------------- | ------ | -------- | -------------------------------------------------- |
| type           | string | Yes      | Request type: ACTIVATE-Activate, CLOSE-Close       |
| timeOut        | int    | Yes      | Activate countdown time (seconds), range: 10s-120s |

#### Response Parameters

| Parameter Name | Type   | Description                                                                    |
| -------------- | ------ | ------------------------------------------------------------------------------ |
| triggerTime    | int    | Trigger time for deleting all pending orders                                   |
| status         | Status | ACTIVATED (Activation successful)/CLOSED (Closed successfully)/FAILED (Failed) |
| note           | string | Explanation                                                                    |

#### Errors

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
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Cancel All
> After](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Cancel
> All After)

### Close position by position ID

POST /openApi/swap/v1/trade/closePosition

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type:request body(application/json)

#### Request Parameters

| Parameter Name | Type   | Required | Description                                            |
| -------------- | ------ | -------- | ------------------------------------------------------ |
| positionId     | string | yes      | Position ID, will close the position with market price |
| timestamp      | int64  | yes      | Request timestamp, in milliseconds                     |
| recvWindow     | int64  | no       | Request valid time window value, in milliseconds       |

#### Response Parameters

| Parameter Name | Type   | Description                                                          |
| -------------- | ------ | -------------------------------------------------------------------- |
| code           | int64  | Error code, 0 indicates success, non-zero indicates abnormal failure |
| msg            | string | Error message prompt                                                 |
| data           | Data   |                                                                      |

#### Errors

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
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Close position
> by position
> ID](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Close
> position by position ID)

### All Orders

GET /openApi/swap/v1/trade/fullOrder

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

Query the user's historical orders (order status is fully executed, pending,
newly created, partially executed, or cancelled.).

- Query data within the last 7 days by default

[1\. Create Account](https://bingx.com)
[2\. Pass KYC/KYB](https://bingx.com/en-us/account/api/)
[3\. Create API KEY](https://bingx.com/en-us/account/api/)
[4\. Configure API KEY permissions](https://bingx.com/en-us/account/api/)
[5\. Understanding signature authentication](https://bingx-api.github.io/docs/#/en-us/swapV2/authentication.html#Signature%20Description)
_6\. Run the following example code_
[7\. Understand common error codes](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Common%20Error%20Codes)
[8\. Understand rate limitations](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Rate%20limit)
[9\. Understanding request timestamps](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Timestamp)
[10\. Understand fee schedule](https://bingx.com/en-us/support/costs/)
[11\. Understand trading rules](https://bingx.com/en-us/tradeInfo/perpetual/trading-rules/BTC-USDT)

request parameters https://open-api.bingx.com

#### Request Parameters

| Parameter Name | Type   | Required | Description                                                                                                                                     |
| -------------- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol         | string | no       | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT.If no symbol is specified, it will query the orders for all trading pairs. |
| orderId        | int64  | no       | Only return subsequent orders, and return the latest order by default                                                                           |
| startTime      | int64  | no       | Start time, unit: millisecond                                                                                                                   |
| endTime        | int64  | no       | End time, unit: millisecond                                                                                                                     |
| limit          | int    | yes      | number of result sets to return Default: 500 Maximum: 1000                                                                                      |
| timestamp      | int64  | yes      | request timestamp in milliseconds                                                                                                               |
| recvWindow     | int64  | no       | Request valid time window value, Unit: milliseconds                                                                                             |

#### Response Parameters

| Parameter Name | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| -------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| time           | int64  | order time, unit: millisecond                                                                                                                                                                                                                                                                                                                                                                                                                             |
| symbol         | string | trading pair, for example: BTC-USDT                                                                                                                                                                                                                                                                                                                                                                                                                       |
| side           | string | buying and selling direction                                                                                                                                                                                                                                                                                                                                                                                                                              |
| type           | string | LIMIT: Limit Order / MARKET: Market Order / STOP_MARKET: Stop Market Order / TAKE_PROFIT_MARKET: Take Profit Market Order / STOP: Stop Limit Order / TAKE_PROFIT: Take Profit Limit Order / TRIGGER_LIMIT: Stop Limit Order with Trigger / TRIGGER_MARKET: Stop Market Order with Trigger / TRAILING_STOP_MARKET: Trailing Stop Market Order                                                                                                              |
| positionSide   | string | Position direction, required for single position as BOTH, for both long and short positions only LONG or SHORT can be chosen, defaults to LONG if empty                                                                                                                                                                                                                                                                                                   |
| reduceOnly     | string | true, false; Default value is false for single position mode; This parameter is not accepted for both long and short positions mode                                                                                                                                                                                                                                                                                                                       |
| cumQuote       | string | transaction amount                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| status         | string | order status                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| stopPrice      | string | Trigger price                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| price          | string | Price                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| origQty        | string | original order quantity                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| avgPrice       | string | average transaction price                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| executedQty    | string | volume                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| orderId        | int64  | Order ID                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| profit         | string | profit and loss                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| commission     | string | Fee                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| workingType    | string | StopPrice trigger price types: MARK_PRICE, CONTRACT_PRICE, default MARK_PRICE                                                                                                                                                                                                                                                                                                                                                                             |
| updateTime     | int64  | update time, unit: millisecond                                                                                                                                                                                                                                                                                                                                                                                                                            |
| stopGuaranteed | string | true: Enables the guaranteed stop-loss and take-profit feature; false: Disables the feature. The guaranteed stop-loss feature is not enabled by default. Supported order types include: STOP_MARKET: Market stop-loss order / TAKE_PROFIT_MARKET: Market take-profit order / STOP: Limit stop-loss order / TAKE_PROFIT: Limit take-profit order / TRIGGER_LIMIT: Stop-limit order with trigger / TRIGGER_MARKET: Market order with trigger for stop-loss. |
| triggerOrderId | int64  | trigger order ID associated with this order                                                                                                                                                                                                                                                                                                                                                                                                               |
| isTwap         | bool   | Whether it is a TWAP order, true: yes, false: no                                                                                                                                                                                                                                                                                                                                                                                                          |
| mainOrderId    | string | TWAP order number                                                                                                                                                                                                                                                                                                                                                                                                                                         |

#### Errors

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
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#All
> Orders](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#All
> Orders)

### Position and Maintenance Margin Ratio

GET /openApi/swap/v1/maintMarginRatio

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

Get information on Position and Maintenance Margin Ratio

#### Request Parameters

| Parameter Name | Type   | Required | Description                                                |
| -------------- | ------ | -------- | ---------------------------------------------------------- |
| symbol         | string | Yes      | Trading pair, e.g., BTC-USDT, please use uppercase letters |
| timestamp      | int64  | Yes      | Request timestamp in milliseconds                          |
| recvWindow     | int64  | No       | Request valid time window in milliseconds                  |

#### Response Parameters

| Parameter Name   | Type   | Description                                 |
| ---------------- | ------ | ------------------------------------------- |
| tier             | string | Layer                                       |
| symbol           | string | Trading pair                                |
| minPositionVal   | string | Minimum position value                      |
| maxPositionVal   | string | Maximum position value                      |
| maintMarginRatio | string | Maintenance margin ratio                    |
| maintAmount      | string | Maintenance margin quick calculation amount |

#### Errors

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
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Position and
> Maintenance Margin
> Ratio](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Position
> and Maintenance Margin Ratio)

### Query historical transaction details

GET /openApi/swap/v2/trade/fillHistory

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

Obtain the transaction history details of a certain transaction pair

[1\. Create Account](https://bingx.com)
[2\. Pass KYC/KYB](https://bingx.com/en-us/account/api/)
[3\. Create API KEY](https://bingx.com/en-us/account/api/)
[4\. Configure API KEY permissions](https://bingx.com/en-us/account/api/)
[5\. Understanding signature authentication](https://bingx-api.github.io/docs/#/en-us/swapV2/authentication.html#Signature%20Description)
_6\. Run the following example code_
[7\. Understand common error codes](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Common%20Error%20Codes)
[8\. Understand rate limitations](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Rate%20limit)
[9\. Understanding request timestamps](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Timestamp)
[10\. Understand fee schedule](https://bingx.com/en-us/support/costs/)
[11\. Understand trading rules](https://bingx.com/en-us/tradeInfo/perpetual/trading-rules/BTC-USDT)

request parameters https://open-api.bingx.com

#### Request Parameters

| Parameter Name | Type   | Required | Description                                                                                                         |
| -------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------- |
| symbol         | string | Yes      | Trading pair, e.g., BTC-USDT, please use uppercase letters                                                          |
| currency       | string | no       | USDC or USDT                                                                                                        |
| orderId        | int64  | no       | If orderId is provided, only the filled orders of that orderId are returned                                         |
| lastFillId     | int64  | no       | The last tradeId of the last query, default is 0 if not filled in.                                                  |
| startTs        | int64  | yes      | Starting timestamp in milliseconds                                                                                  |
| endTs          | int64  | yes      | End timestamp in milliseconds                                                                                       |
| timestamp      | int64  | yes      | request timestamp, unit: millisecond                                                                                |
| recvWindow     | int64  | no       | Request valid time window value, Unit: milliseconds                                                                 |
| pageIndex      | int64  | no       | The page number must be greater than 0, if not filled in, the default is 1                                          |
| pageSize       | int64  | no       | The size of each page must be greater than 0, the maximum value is 1000, if you do not fill in, then the default 50 |

#### Response Parameters

| Parameter Name  | Type   | Description                                                                                                                                             |
| --------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol          | string | trading pair, for example: BTC-USDT                                                                                                                     |
| qty             | string | Transaction quantity                                                                                                                                    |
| price           | string | Transaction price                                                                                                                                       |
| quoteQty        | string | Transaction amount                                                                                                                                      |
| commission      | string | commission                                                                                                                                              |
| commissionAsset | string | Asset unit, usually USDT                                                                                                                                |
| orderId         | string | order id                                                                                                                                                |
| tradeId         | string | trade id                                                                                                                                                |
| filledTime      | string | Match the transaction time in the format of 2006-01-02T15:04:05.999+0800                                                                                |
| side            | string | buying and selling direction                                                                                                                            |
| positionSide    | string | Position direction, required for single position as BOTH, for both long and short positions only LONG or SHORT can be chosen, defaults to LONG if empty |
| role            | string | Active selling and buying, taker: active buying, maker: active selling                                                                                  |
| total           | int64  | total records                                                                                                                                           |

#### Errors

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
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Query
> historical transaction
> details](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Query
> historical transaction details)

### Query Position History

GET /openApi/swap/v1/trade/positionHistory

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

Query the position history of perpetual contracts under the current account.

#### Request Parameters

| Parameter Name | Type   | Required | Description                                                                                                                  |
| -------------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| symbol         | string | Yes      | Trading pair, e.g.: BTC-USDT, please use uppercase letters                                                                   |
| currency       | string | no       | USDC or USDT                                                                                                                 |
| timestamp      | int64  | Yes      | Request timestamp, in milliseconds                                                                                           |
| positionId     | int64  | No       | Position ID, if not provided, all position histories of the relevant trading pair will be returned by default                |
| startTs        | int64  | Yes      | Start timestamp, in milliseconds, maximum time span is three months, if not provided, the default start time is 90 days ago  |
| endTs          | int64  | Yes      | End timestamp, in milliseconds, maximum time span is three months, if not provided, the default end time is the current time |
| pageIndex      | int64  | No       | Page number, must be greater than 0, if not provided, the default is 1                                                       |
| pageSize       | int64  | No       | Page size, must be greater than 0, maximum value is 100, if not provided, the default is 1000                                |
| recvWindow     | int64  | No       | Request valid window value, in milliseconds                                                                                  |

#### Response Parameters

| Parameter Name     | Type    | Description                                             |
| ------------------ | ------- | ------------------------------------------------------- |
| symbol             | string  | Trading pair, e.g.: BTC-USDT                            |
| positionId         | string  | Position ID                                             |
| positionSide       | string  | Position side LONG/SHORT                                |
| isolated           | bool    | Isolated mode, true: isolated mode, false: cross margin |
| closeAllPositions  | bool    | All positions closed                                    |
| positionAmt        | string  | Position amount                                         |
| closePositionAmt   | string  | Closed position amount                                  |
| realisedProfit     | string  | Realized profit and loss                                |
| netProfit          | string  | Net profit and loss                                     |
| avgClosePrice      | float64 | Average close price                                     |
| avgPrice           | string  | Average open price                                      |
| leverage           | int     | Leverage                                                |
| positionCommission | string  | Commission fee                                          |
| totalFunding       | string  | Funding fee                                             |
| openTime           | int64   | Open time                                               |
| closeTime          | int64   | Close time                                              |

#### Errors

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
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Query Position
> History](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Query
> Position History)

### Isolated Margin Change History

GET /openApi/swap/v1/positionMargin/history

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

Used to query the history of margin adjustments for U-margin contracts in the
last 30 days.

#### Request Parameters

| Parameter Name | Type   | Required | Description                                                            |
| -------------- | ------ | -------- | ---------------------------------------------------------------------- |
| symbol         | string | Yes      | Trading pair, e.g.: BTC-USDT, please use uppercase letters             |
| positionId     | string | Yes      | Position ID                                                            |
| startTime      | int64  | Yes      | Start timestamp, in milliseconds                                       |
| endTime        | int64  | Yes      | End timestamp, in milliseconds                                         |
| pageIndex      | int64  | Yes      | Page number, must be greater than 0, if not provided, the default is 1 |
| pageSize       | int64  | Yes      | Page size, must be greater than 0, maximum value is 100                |
| timestamp      | int64  | Yes      | Request timestamp, in milliseconds                                     |
| recvWindow     | int64  | No       | Request valid window value, in milliseconds                            |

#### Response Parameters

| Parameter Name    | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ----------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol            | string | Trading pair, e.g.: BTC-USDT                                                                                                                                                                                                                                                                                                                                                                                                                             |
| positionId        | string | Position ID                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| changeReason      | string | ManualMarginAddition: Manually add margin / ManualMarginReduction: Reduce margin manually / IncreaseLeverage: Increase leverage / ReduceLeverage: Reduce leverage / OpenPosition: Open position / ClosePosition: Close position / Liquidation: Liquidation / ADL:Automatically reduce positions / CloseOpenPosition : Close first and then open a position /FundingFeeSettlement: Funding rate settlement/ AutoMarginAddition: Automatic margin addition |
| marginChange      | string | change amount                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| marginAfterChange | string | Total amount after change                                                                                                                                                                                                                                                                                                                                                                                                                                |
| time              | int64  | Change time                                                                                                                                                                                                                                                                                                                                                                                                                                              |

#### Errors

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
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Isolated
> Margin Change
> History](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Isolated
> Margin Change History)

### Apply VST

POST /openApi/swap/v1/trade/getVst

rate limitation by UID: 1/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type:request body(application/json)

Apply VST assets for demo trading

Only available for demo trading, demo domain: https://open-api-vst.bingx.com

#### Request Parameters

| Parameter Name | Type  | Required | Description                                     |
| -------------- | ----- | -------- | ----------------------------------------------- |
| timestamp      | int64 | Yes      | Request timestamp in milliseconds               |
| recvWindow     | int64 | No       | Request valid time window value in milliseconds |

#### Response Parameters

| Parameter Name | Type   | Description                           |
| -------------- | ------ | ------------------------------------- |
| amount         | flot64 | Amount of VST applied in this request |

#### Errors

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
| 109500     | Account Service Unavailable, err:symbol not exist                                                                                                            |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Apply
> VST](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Apply VST)

### Place TWAP Order

POST /openApi/swap/v1/twap/order

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type:request body(application/json)

Create a Time Weighted Order (TWAP) order. This function will help you execute
large orders in batches within 24 hours, thereby reducing the impact of large
orders on market prices, making the average transaction price closer to the
actual market price, and reducing your transaction costs.

#### Request Parameters

| Parameter Name | Type   | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                |
| -------------- | ------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol         | string | Yes      | Trading pair, for example: BTC-USDT, please use capital letters                                                                                                                                                                                                                                                                                                                                                            |
| side           | string | Yes      | Buying and selling direction SELL, BUY                                                                                                                                                                                                                                                                                                                                                                                     |
| positionSide   | string | Yes      | LONG or SHORT                                                                                                                                                                                                                                                                                                                                                                                                              |
| priceType      | string | Yes      | Price limit type; constant: price interval / percentage: slippage                                                                                                                                                                                                                                                                                                                                                          |
| priceVariance  | string | Yes      | When type is constant, it represents the price difference (unit is USDT), when type is percentage, it represents the slippage ratio (unit is %)                                                                                                                                                                                                                                                                            |
| triggerPrice   | string | Yes      | Trigger price, this price is the condition that limits the execution of strategy orders. For buying, when the market price is lower than the limit price, an order will be placed based on the set ratio or price distance of the selling price; for selling, when the market price is higher than the limit price, an order will be placed for the selling price down. Take the set ratio or price gap to place an order. |
| interval       | int64  | Yes      | After the strategic order is split, the time interval for order placing is between 5-120s.                                                                                                                                                                                                                                                                                                                                 |
| amountPerOrder | string | Yes      | The quantity of a single order. After the strategy order is split, the maximum order quantity for a single order。                                                                                                                                                                                                                                                                                                         |
| totalAmount    | string | Yes      | The total number of orders. The total trading volume of strategy orders, which may be split into multiple order executions.                                                                                                                                                                                                                                                                                                |
| timestamp      | int64  | Yes      | The timestamp of the request in milliseconds                                                                                                                                                                                                                                                                                                                                                                               |
| recvWindow     | int64  | No       | Request valid time window value, unit: milliseconds                                                                                                                                                                                                                                                                                                                                                                        |

#### Response Parameters

| Parameter Name | Type   | Description       |
| -------------- | ------ | ----------------- |
| mainOrderId    | string | twap order number |

#### Errors

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
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Place TWAP
> Order](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Place
> TWAP Order)

### Query TWAP Entrusted Order

GET /openApi/swap/v1/twap/openOrders

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

Used to query orders in TWAP orders, that is, orders that have not been executed
or are still being executed.

#### Request Parameters

| Parameter Name | Type   | Required | Description                                                     |
| -------------- | ------ | -------- | --------------------------------------------------------------- |
| symbol         | string | No       | Trading pair, for example: BTC-USDT, please use capital letters |
| timestamp      | int64  | Yes      | the timestamp of the request in milliseconds                    |
| recvWindow     | int64  | No       | Request valid time window value, unit: milliseconds             |

#### Response Parameters

| Parameter Name | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| -------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol         | string | Trading pair, for example: BTC-USDT                                                                                                                                                                                                                                                                                                                                                                                                                |
| mainOrderId    | string | TWAP order number                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| side           | string | buying and selling direction; SELL, BUY                                                                                                                                                                                                                                                                                                                                                                                                            |
| positionSide   | string | LONG or SHORT                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| priceType      | string | Price limit type, constant: price interval, percentage: slippage                                                                                                                                                                                                                                                                                                                                                                                   |
| priceVariance  | string | When type is constant, it represents the price difference (unit is USDT), when type is percentage, it represents the slippage ratio (unit is %)                                                                                                                                                                                                                                                                                                    |
| triggerPrice   | string | Trigger price, this price is the condition that limits the execution of strategy orders. For buying, when the market price is lower than the limit price, an order will be placed based on the set ratio or price distance of the selling price; for selling, when the market price is higher than the limit price, an order will be placed for the selling price down. Take the set ratio or price gap to place an order.                         |
| interval       | int64  | After the strategic order is split, the time interval for order placing is between 5-120s                                                                                                                                                                                                                                                                                                                                                          |
| amountPerOrder | string | The quantity of a single order. After the strategy order is split, the maximum order quantity for a single order.                                                                                                                                                                                                                                                                                                                                  |
| totalAmount    | string | The total number of orders. The total trading volume of strategy orders, which may be split into multiple order executions.                                                                                                                                                                                                                                                                                                                        |
| orderStatus    | string | New: New/Running: In operation/Canceling: Cancellation of order/Filled: Fully filled/PartiallyFilled: Partially filled/Pending: Not triggered/PartiallyFilledAndResidueFailed: Partially filled (remaining order failed), algorithm order status/PartiallyFilledAndResidueCancelled: Partially filled ( Remaining cancellation), algorithm order status/Cancelled: Canceled (no partial deal exists)/Failed: Order failed (no partial deal exists) |
| executedQty    | string | Volume                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| duration       | int64  | Execution time, in seconds. The order will be canceled after the execution time expires.                                                                                                                                                                                                                                                                                                                                                           |
| maxDuration    | int64  | Maximum execution time execution time, unit: seconds.                                                                                                                                                                                                                                                                                                                                                                                              |
| createdTime    | int64  | Order creation time, unit: milliseconds                                                                                                                                                                                                                                                                                                                                                                                                            |
| updateTime     | int64  | Order update time, unit: milliseconds                                                                                                                                                                                                                                                                                                                                                                                                              |

#### Errors

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
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Query TWAP
> Entrusted
> Order](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Query
> TWAP Entrusted Order)

### Query TWAP Historical Orders

GET /openApi/swap/v1/twap/historyOrders

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

Used to query TWAP historical delegation records, including partially completed,
completed, revoked and failed delegation。

#### Request Parameters

| Parameter Name | Type   | Required | Description                                                     |
| -------------- | ------ | -------- | --------------------------------------------------------------- |
| symbol         | string | No       | Trading pair, for example: BTC-USDT, please use capital letters |
| pageIndex      | int64  | Yes      | Paging parameters, the minimum value is 1                       |
| pageSize       | int64  | Yes      | Number of result sets returned; maximum: 1000                   |
| startTime      | int64  | Yes      | Start time, unit: milliseconds                                  |
| endTime        | int64  | Yes      | End time, unit: milliseconds                                    |
| timestamp      | int64  | Yes      | The timestamp of the request in milliseconds                    |
| recvWindow     | int64  | No       | Request valid time window value, unit: milliseconds             |

#### Response Parameters

| Parameter Name | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| -------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol         | string | Trading pair, for example: BTC-USDT                                                                                                                                                                                                                                                                                                                                                                                                                |
| mainOrderId    | string | twap order number                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| side           | string | buying and selling direction; SELL, BUY                                                                                                                                                                                                                                                                                                                                                                                                            |
| positionSide   | string | LONG or SHORT                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| priceType      | string | Price limit type, constant: price interval, percentage: slippage                                                                                                                                                                                                                                                                                                                                                                                   |
| priceVariance  | string | When type is constant, it represents the price difference (unit is USDT), when type is percentage, it represents the slippage ratio (unit is %)                                                                                                                                                                                                                                                                                                    |
| triggerPrice   | string | Trigger price, this price is the condition that limits the execution of strategy orders. For buying, when the market price is lower than the limit price, an order will be placed based on the set ratio or price distance of the selling price; for selling, when the market price is higher than the limit price, an order will be placed for the selling price down. Take the set ratio or price gap to place an order.                         |
| interval       | int64  | After the strategic order is split, the time interval for order placing is between 5-120s                                                                                                                                                                                                                                                                                                                                                          |
| amountPerOrder | string | The quantity of a single order. After the strategy order is split, the maximum order quantity for a single order.                                                                                                                                                                                                                                                                                                                                  |
| totalAmount    | string | The total number of orders. The total trading volume of strategy orders, which may be split into multiple order executions.                                                                                                                                                                                                                                                                                                                        |
| orderStatus    | string | New: New/Running: In operation/Canceling: Cancellation of order/Filled: Fully filled/PartiallyFilled: Partially filled/Pending: Not triggered/PartiallyFilledAndResidueFailed: Partially filled (remaining order failed), algorithm order status/PartiallyFilledAndResidueCancelled: Partially filled ( Remaining cancellation), algorithm order status/Cancelled: Canceled (no partial deal exists)/Failed: Order failed (no partial deal exists) |
| executedQty    | string | Volume                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| duration       | int64  | Execution time, in seconds. The order will be canceled after the execution time expires.                                                                                                                                                                                                                                                                                                                                                           |
| maxDuration    | int64  | Maximum execution time execution time, unit: seconds.                                                                                                                                                                                                                                                                                                                                                                                              |
| createdTime    | int64  | Order creation time, unit: milliseconds                                                                                                                                                                                                                                                                                                                                                                                                            |
| updateTime     | int64  | Order update time, unit: milliseconds                                                                                                                                                                                                                                                                                                                                                                                                              |

#### Errors

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
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Query TWAP
> Historical
> Orders](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Query
> TWAP Historical Orders)

### TWAP Order Details

GET /openApi/swap/v1/twap/orderDetail

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

Used to query the details of TWAP entrusted orders

#### Request Parameters

| Parameter Name | Type   | Required | Description                                         |
| -------------- | ------ | -------- | --------------------------------------------------- |
| mainOrderId    | string | Yes      | TWAP commission order number                        |
| timestamp      | int64  | Yes      | The timestamp of the request in milliseconds        |
| recvWindow     | int64  | No       | Request valid time window value, unit: milliseconds |

#### Response Parameters

| Parameter Name | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| -------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol         | string | Trading pair, for example: BTC-USDT                                                                                                                                                                                                                                                                                                                                                                                                                |
| mainOrderId    | string | TWAP order number                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| side           | string | buying and selling direction; SELL, BUY                                                                                                                                                                                                                                                                                                                                                                                                            |
| positionSide   | string | LONG or SHORT                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| priceType      | string | Price limit type, constant: price interval, percentage: slippage                                                                                                                                                                                                                                                                                                                                                                                   |
| priceVariance  | string | When type is constant, it represents the price difference (unit is USDT), when type is percentage, it represents the slippage ratio (unit is %)                                                                                                                                                                                                                                                                                                    |
| triggerPrice   | string | Trigger price, this price is the condition that limits the execution of strategy orders. For buying, when the market price is lower than the limit price, an order will be placed based on the set ratio or price distance of the selling price; for selling, when the market price is higher than the limit price, an order will be placed for the selling price down. Take the set ratio or price gap to place an order.                         |
| interval       | int64  | After the strategic order is split, the time interval for order placing is between 5-120s                                                                                                                                                                                                                                                                                                                                                          |
| amountPerOrder | string | The quantity of a single order. After the strategy order is split, the maximum order quantity for a single order.                                                                                                                                                                                                                                                                                                                                  |
| totalAmount    | string | The total number of orders. The total trading volume of strategy orders, which may be split into multiple order executions.                                                                                                                                                                                                                                                                                                                        |
| orderStatus    | string | New: New/Running: In operation/Canceling: Cancellation of order/Filled: Fully filled/PartiallyFilled: Partially filled/Pending: Not triggered/PartiallyFilledAndResidueFailed: Partially filled (remaining order failed), algorithm order status/PartiallyFilledAndResidueCancelled: Partially filled ( Remaining cancellation), algorithm order status/Cancelled: Canceled (no partial deal exists)/Failed: Order failed (no partial deal exists) |
| executedQty    | string | Volume                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| duration       | int64  | Execution time, in seconds. The order will be canceled after the execution time expires.                                                                                                                                                                                                                                                                                                                                                           |
| maxDuration    | int64  | Maximum execution time execution time, unit: seconds.                                                                                                                                                                                                                                                                                                                                                                                              |
| createdTime    | int64  | Order creation time, unit: milliseconds                                                                                                                                                                                                                                                                                                                                                                                                            |
| updateTime     | int64  | Order update time, unit: milliseconds                                                                                                                                                                                                                                                                                                                                                                                                              |

#### Errors

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
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#TWAP Order
> Details](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#TWAP
> Order Details)

### Cancel TWAP Order

POST /openApi/swap/v1/twap/cancelOrder

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type:request body(application/json)

Used to cancel TWAP commission orders

#### Request Parameters

| Parameter Name | Type   | Required | Description                                         |
| -------------- | ------ | -------- | --------------------------------------------------- |
| mainOrderId    | string | Yes      | TWAP order number                                   |
| timestamp      | int64  | Yes      | The timestamp of the request in milliseconds        |
| recvWindow     | int64  | No       | Request valid time window value, unit: milliseconds |

#### Response Parameters

| Parameter Name | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| -------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol         | string | Trading pair, for example: BTC-USDT                                                                                                                                                                                                                                                                                                                                                                                                                |
| mainOrderId    | string | TWAP order number                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| side           | string | buying and selling direction; SELL, BUY                                                                                                                                                                                                                                                                                                                                                                                                            |
| positionSide   | string | LONG or SHORT                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| priceType      | string | Price limit type, constant: price interval, percentage: slippage                                                                                                                                                                                                                                                                                                                                                                                   |
| priceVariance  | string | When type is constant, it represents the price difference (unit is USDT), when type is percentage, it represents the slippage ratio (unit is %)                                                                                                                                                                                                                                                                                                    |
| triggerPrice   | string | Trigger price, this price is the condition that limits the execution of strategy orders. For buying, when the market price is lower than the limit price, an order will be placed based on the set ratio or price distance of the selling price; for selling, when the market price is higher than the limit price, an order will be placed for the selling price down. Take the set ratio or price gap to place an order.                         |
| interval       | int64  | After the strategic order is split, the time interval for order placing is between 5-120s                                                                                                                                                                                                                                                                                                                                                          |
| amountPerOrder | string | The quantity of a single order. After the strategy order is split, the maximum order quantity for a single order.                                                                                                                                                                                                                                                                                                                                  |
| totalAmount    | string | The total number of orders. The total trading volume of strategy orders, which may be split into multiple order executions.                                                                                                                                                                                                                                                                                                                        |
| orderStatus    | string | New: New/Running: In operation/Canceling: Cancellation of order/Filled: Fully filled/PartiallyFilled: Partially filled/Pending: Not triggered/PartiallyFilledAndResidueFailed: Partially filled (remaining order failed), algorithm order status/PartiallyFilledAndResidueCancelled: Partially filled ( Remaining cancellation), algorithm order status/Cancelled: Canceled (no partial deal exists)/Failed: Order failed (no partial deal exists) |
| executedQty    | string | Volume                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| duration       | int64  | Execution time, in seconds. The order will be canceled after the execution time expires.                                                                                                                                                                                                                                                                                                                                                           |
| maxDuration    | int64  | Maximum execution time execution time, unit: seconds.                                                                                                                                                                                                                                                                                                                                                                                              |
| createdTime    | int64  | Order creation time, unit: milliseconds                                                                                                                                                                                                                                                                                                                                                                                                            |
| updateTime     | int64  | Order update time, unit: milliseconds                                                                                                                                                                                                                                                                                                                                                                                                              |

#### Errors

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
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Cancel TWAP
> Order](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Cancel
> TWAP Order)

### Switch Multi-Assets Mode

POST /openApi/swap/v1/trade/assetMode

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type:request body(application/json)

Switch account multi-assets mode

Only available for live trading, live trading domain: https://open-api.bingx.com

#### Request Parameters

| Parameter Name | Type   | Required | Description                                           |
| -------------- | ------ | -------- | ----------------------------------------------------- |
| assetMode      | string | Yes      | multi-assets mode, singleAssetMode or multiAssetsMode |
| timestamp      | int64  | yes      | request timestamp in milliseconds                     |
| recvWindow     | int64  | no       | Request valid time window value, Unit: milliseconds   |

#### Response Parameters

| Parameter Name | Type   | Description                                           |
| -------------- | ------ | ----------------------------------------------------- |
| assetMode      | string | multi-assets mode, singleAssetMode or multiAssetsMode |

#### Errors

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
| 109500     | Account Service Unavailable, err:symbol not exist                                                                                                            |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Switch
> Multi-Assets
> Mode](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Switch
> Multi-Assets Mode)

### Query Multi-Assets Mode

GET /openApi/swap/v1/trade/assetMode

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type:request body(application/json)

Query account multi-assets mode

Only available for live trading, live trading domain: https://open-api.bingx.com

#### Request Parameters

| Parameter Name | Type  | Required | Description                                         |
| -------------- | ----- | -------- | --------------------------------------------------- |
| timestamp      | int64 | yes      | request timestamp in milliseconds                   |
| recvWindow     | int64 | no       | Request valid time window value, Unit: milliseconds |

#### Response Parameters

| Parameter Name | Type   | Description                                           |
| -------------- | ------ | ----------------------------------------------------- |
| assetMode      | string | multi-assets mode, singleAssetMode or multiAssetsMode |

#### Errors

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
| 109500     | Account Service Unavailable, err:symbol not exist                                                                                                            |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Query
> Multi-Assets
> Mode](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Query
> Multi-Assets Mode)

### Query Multi-Assets Rules

GET /openApi/swap/v1/trade/multiAssetsRules

API KEY permission: No API KEY signature required

Content-Type:request body(application/json)

Query platform-defined multi-assets rules

Only available for live trading, live trading domain: https://open-api.bingx.com

rate limitation by IP in group Number: 1

#### Request Parameters

| Parameter Name | Type  | Required | Description                                         |
| -------------- | ----- | -------- | --------------------------------------------------- |
| timestamp      | int64 | yes      | request timestamp in milliseconds                   |
| recvWindow     | int64 | no       | Request valid time window value, Unit: milliseconds |

#### Response Parameters

| Parameter Name       | Type   | Description                                                                         |
| -------------------- | ------ | ----------------------------------------------------------------------------------- |
| marginAssets         | string | Margin assets, such as BTC, ETH, etc.                                               |
| ltv                  | string | Loan-to-Value ratio, value conversion ratio used when calculating available margin. |
| collateralValueRatio | string | Collateral ratio, value conversion ratio used when calculating risk rate.           |
| maxTransfer          | string | Transfer limit, maximum amount that can be transferred in. Empty means no limit.    |
| indexPrice           | string | Current latest USD index price for the asset.                                       |

#### Errors

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
| 109500     | Account Service Unavailable, err:symbol not exist                                                                                                            |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Query
> Multi-Assets
> Rules](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Query
> Multi-Assets Rules)

### Query Multi-Assets Margin

GET /openApi/swap/v1/user/marginAssets

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type:request body(application/json)

Query multi-assets margin

Only available for live trading, live trading domain: https://open-api.bingx.com

#### Request Parameters

| Parameter Name | Type  | Required | Description                                     |
| -------------- | ----- | -------- | ----------------------------------------------- |
| timestamp      | int64 | Yes      | Request timestamp in milliseconds               |
| recvWindow     | int64 | No       | Request valid time window value in milliseconds |

#### Response Parameters

| Parameter Name       | Type   | Description                                                                                                        |
| -------------------- | ------ | ------------------------------------------------------------------------------------------------------------------ |
| currency             | string | Margin assets, such as BTC and ETH etc.                                                                            |
| totalAmount          | string | Total amount of margin assets.                                                                                     |
| availableTransfer    | string | Current available amount for transfer out, dynamic data needs to be re-queried and calculated after each transfer. |
| latestMortgageAmount | string | Latest collateral amount available.                                                                                |

#### Errors

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
| 109500     | Account Service Unavailable, err:symbol not exist                                                                                                            |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Query
> Multi-Assets
> Margin](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Query
> Multi-Assets Margin)

### One-Click Reverse Position

POST /openApi/swap/v1/trade/reverse

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

One-Click Reverse Position

#### Request Parameters

| Parameter Name | Type   | Required | Description                                                                                       |
| -------------- | ------ | -------- | ------------------------------------------------------------------------------------------------- |
| type           | string | Yes      | Reverse type, Reverse: immediate reverse, TriggerReverse: planned reverse                         |
| symbol         | string | Yes      | Trading pair, e.g.: BTC-USDT                                                                      |
| triggerPrice   | string | No       | Trigger price, required for planned reverse                                                       |
| workingType    | string | No       | TriggerPrice price type: MARK_PRICE, CONTRACT_PRICE, CONTRACT_PRICE. Required for planned reverse |
| timestamp      | int64  | Yes      | Request timestamp in milliseconds                                                                 |
| recvWindow     | int64  | No       | Request valid time window value in milliseconds                                                   |

#### Response Parameters

| Parameter Name     | Type    | Description                                                                         |
| ------------------ | ------- | ----------------------------------------------------------------------------------- |
| type               | string  | Reverse type, Reverse: immediate reverse, TriggerReverse: planned reverse           |
| positionId         | string  | Original position ID                                                                |
| newPositionId      | string  | New position ID                                                                     |
| symbol             | string  | Trading pair, e.g.: BTC-USDT                                                        |
| positionSide       | string  | Position side LONG/SHORT                                                            |
| isolated           | bool    | Whether in isolated mode, true: isolated mode, false: cross margin                  |
| positionAmt        | string  | Position amount                                                                     |
| availableAmt       | string  | Available amount for closing                                                        |
| unrealizedProfit   | string  | Unrealized profit and loss                                                          |
| realisedProfit     | string  | Realized profit and loss                                                            |
| initialMargin      | string  | Initial margin                                                                      |
| margin             | string  | Margin                                                                              |
| liquidationPrice   | float64 | Liquidation price                                                                   |
| avgPrice           | string  | Average entry price                                                                 |
| leverage           | int64   | Leverage                                                                            |
| positionValue      | string  | Position value                                                                      |
| markPrice          | string  | Mark price                                                                          |
| riskRate           | string  | Risk rate, position will be force-reduced or liquidated when risk rate reaches 100% |
| maxMarginReduction | string  | Maximum reducible margin                                                            |
| pnlRatio           | string  | Unrealized PNL ratio                                                                |
| updateTime         | int64   | Position update time in milliseconds                                                |

#### Errors

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
| 109500     | Account Service Unavailable, err:symbol not exist                                                                                                            |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#One-Click
> Reverse
> Position](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#One-Click
> Reverse Position)

### Hedge mode Position - Automatic Margin Addition

POST /openApi/swap/v1/trade/autoAddMargin

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type:request body(application/json)

In Hedge mode, it supports setting and canceling 'automatic margin addition'.

#### Request Parameters

| Parameter Name | Type   | Required | Description                                                                           |
| -------------- | ------ | -------- | ------------------------------------------------------------------------------------- |
| symbol         | string | Yes      | Trading pair, e.g., BTC-USDT, please use uppercase letters.                           |
| positionId     | int64  | Yes      | Position ID                                                                           |
| functionSwitch | string | Yes      | Whether to enable the automatic margin addition feature, true: enable, false: disable |
| amount         | string | No       | Amount of margin to be added, in USDT. Must be specified when enabling the feature.   |
| timestamp      | int64  | Yes      | Timestamp of the request, in milliseconds.                                            |
| recvWindow     | int64  | No       | Request validity window, in milliseconds.                                             |

#### Response Parameters

| Parameter Name | Type   | Description                                                                              |
| -------------- | ------ | ---------------------------------------------------------------------------------------- |
| code           | int64  | Error code, 0 means success, non-zero means failure                                      |
| msg            | string | Error message                                                                            |
| symbol         | string | Trading pair, e.g., BTC-USDT, please use uppercase letters.                              |
| positionId     | int64  | Position ID                                                                              |
| functionSwitch | string | Whether the automatic margin addition feature is enabled, true: enabled, false: disabled |
| amount         | string | Amount of margin added, in USDT                                                          |

#### Errors

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
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Hedge mode
> Position - Automatic Margin
> Addition](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Hedge
> mode Position - Automatic Margin Addition)

---
