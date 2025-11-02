## Place order in demo trading

POST /openApi/swap/v2/trade/order

rate limitation by UID: 5/s & rate limitation by IP in group Number: 3

API KEY permission: Perpetual Futures Trading

Content-Type:request body(application/json)

### Description

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

### 1\. Open/Close: How to use the same endpoint to open (Long/Short) and close (Long/Short) positions? Please refer to the following request payload combination:

open/buy LONG: side=BUY & positionSide=LONG

close/sell LONG: side=SELL & positionSide=LONG

open/sell SHORT: side=SELL & positionSide=SHORT

close/buy SHORT: side=BUY & positionSide=SHORT

{"symbol": "ETH-USDT","side": "BUY","positionSide": "LONG", "type": "MARKET",
"quantity": 5}

### 2\. Set take profit and stop loss: This endpoint can also be used to set take profit and stop loss, but the position needs to be opened first;

{"symbol": "ETH-USDT","side": "BUY","positionSide": "LONG", "type":
"TAKE_PROFIT_MARKET", "quantity": 3, "stopPrice": 31968.0}

### 3\. set stopLoss and takeProfit when open position:using takeProfit and stopLoss fields

{"symbol": "BTC-USDT","side": "BUY","positionSide": "LONG","type":
"MARKET","quantity": 5,"takeProfit": "{\\"type\\": \\"TAKE_PROFIT_MARKET\\",
\\"stopPrice\\": 31968.0,\\"price\\":
31968.0,\\"workingType\\":\\"MARK_PRICE\\"}"}

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

### Response Parameters

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

### Data Parameters

|                | Description                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type           | Only supports type: STOP_MARKET/STOP, TAKE_PROFIT_MARKET/TAKE_PROFIT                                                                                                                                                                                                                                                                                                                                                                                      |
| stopPrice      | Trigger price, only for STOP_MARKET, TAKE_PROFIT_MARKET, STOP, TAKE_PROFIT                                                                                                                                                                                                                                                                                                                                                                                |
| price          | Order price                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| workingType    | Trigger price type for stopPrice: MARK_PRICE, CONTRACT_PRICE, default is MARK_PRICE. When the type is STOP or STOP_MARKET, and stopGuaranteed is true, the workingType must only be CONTRACT_PRICE.                                                                                                                                                                                                                                                       |
| stopGuaranteed | true: Enables the guaranteed stop-loss and take-profit feature; false: Disables the feature. The guaranteed stop-loss feature is not enabled by default. Supported order types include: STOP_MARKET: Market stop-loss order / TAKE_PROFIT_MARKET: Market take-profit order / STOP: Limit stop-loss order / TAKE_PROFIT: Limit take-profit order / TRIGGER_LIMIT: Stop-limit order with trigger / TRIGGER_MARKET: Market order with trigger for stop-loss. |

### Errors

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
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html)
