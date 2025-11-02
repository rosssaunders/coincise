## Trade order

POST /openApi/cswap/v1/trade/order

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type:request body(application/json)

The current account places an order on the specified symbol contract. (Supports
limit orders, market orders, planned entrusted market orders, planned entrusted
limit orders, position stop-profit and stop-loss orders, and position closing.)

- LIMIT: Mandatory parameters: quantity, price

- MARKET: Mandatory parameters: quantity

### 1\. Opening/closing a position: How to use the same api to open a position (long/short) and close a position (long/short)? Please refer to the following request payload combination:

open/buy LONG: side=BUY & positionSide=LONG

close/sell LONG: side=SELL & positionSide=LONG

open/sell SHORT: side=SELL & positionSide=SHORT

close/buy SHORT: side=BUY & positionSide=SHORT

{"symbol": "ETH-USD","side": "BUY","positionSide": "LONG", "type": "MARKET",
"quantity": 5}

### 2\. Set take-profit and stop-loss separately: This api can also be used to set take-profit and stop-loss separately, but you need to open a position first;

{"symbol": "ETH-USD","side": "BUY","positionSide": "LONG", "type":
"TAKE_PROFIT_MARKET", "quantity": 3, "stopPrice": 31968.0}

### 3\. Set take profit and stop loss when opening and adding positions: use takeProfit or stopLoss field

{"symbol": "BTC-USD","side": "BUY","positionSide": "LONG","type":
"MARKET","quantity": 5,"takeProfit": "{\\"type\\": \\"TAKE_PROFIT_MARKET\\",
\\"stopPrice\\": 31968.0,\\"price\\":
31968.0,\\"workingType\\":\\"MARK_PRICE\\"}"}

The triggering of a conditional order must:

### STOP/STOP_MARKET Stop loss order:

- The cumulative quantity of placed stop-loss orders cannot be greater than the
  position quantity

- Buy: The mark price is higher than or equal to the trigger price stopPrice

- Sell: The mark price is lower than or equal to the trigger price stopPrice

### TAKE_PROFIT/TAKE_PROFIT_MARKET Take profit order:

- The cumulative quantity of pending stop-profit orders cannot be greater than
  the position quantity

- Buy: The mark price is lower than or equal to the trigger price stopPrice

- Sell: The mark price is higher than or equal to the trigger price stopPrice

Request Parameters

### Request Parameters

| Parameter Name | Type    | Required | Description                                                                                                                                                                               |
| -------------- | ------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol         | string  | yes      | Trading pair, for example: BTC-USD, please use capital letters                                                                                                                            |
| type           | string  | yes      | LIMIT: Limit order/MARKET: Market order/STOP_MARKET: Market stop loss order/TAKE_PROFIT_MARKET: Market take profit order/STOP: Limit stop loss order/TAKE_PROFIT: Limit stop profit order |
| side           | string  | yes      | Buying and selling direction SELL, BUY                                                                                                                                                    |
| positionSide   | string  | no       | Position direction, single position must fill in BOTH, two-way position can only choose LONG or SHORT, if it is empty, the default is LONG                                                |
| price          | float64 | no       | Commission price                                                                                                                                                                          |
| quantity       | float64 | no       | The order quantity and the number of contracts. It is not supported to place orders with U quantity at the moment.                                                                        |
| stopPrice      | float64 | no       | Trigger price, only STOP_MARKET,TAKE_PROFIT_MARKET,STOP,TAKE_PROFIT require this parameter                                                                                                |
| workingType    | string  | no       | stopPrice trigger price price type: MARK_PRICE, CONTRACT_PRICE, default MARK_PRICE                                                                                                        |
| timestamp      | int64   | yes      | Requested timestamp, unit: milliseconds                                                                                                                                                   |
| stopLoss       | string  | no       | Support placing orders and setting stop loss at the same time. But only supports type: STOP_MARKET/STOP                                                                                   |
| takeProfit     | string  | no       | Support placing orders and setting take profit at the same time. But only supports type: TAKE_PROFIT_MARKET/TAKE_PROFIT                                                                   |
| recvWindow     | int64   | no       | Request valid time window value, unit: milliseconds                                                                                                                                       |
| timeInForce    | string  | no       | Effective method, currently supports GTC, IOC, FOK and PostOnly                                                                                                                           |
| clientOrderId  | string  | no       | Customized order ID for users                                                                                                                                                             |

### Response Parameters

| Parameter Name | Type    | Description                                                                                                                                                                               |
| -------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol         | string  | Trading pair, for example: BTC-USD, please use capital letters                                                                                                                            |
| side           | string  | Buying and selling direction SELL, BUY                                                                                                                                                    |
| type           | string  | LIMIT: Limit order/MARKET: Market order/STOP_MARKET: Market stop loss order/TAKE_PROFIT_MARKET: Market take profit order/STOP: Limit stop loss order/TAKE_PROFIT: Limit stop profit order |
| positionSide   | string  | Position direction, single position must fill in BOTH, two-way position can only choose LONG or SHORT, if it is empty, the default is LONG                                                |
| orderId        | int64   | order id                                                                                                                                                                                  |
| price          | float64 | Commission price                                                                                                                                                                          |
| stopPrice      | float64 | Trigger price, only STOP_MARKET, TAKE_PROFIT_MARKET, STOP, TAKE_PROFIT. When type is STOP or STOP_MARKET                                                                                  |
| workingType    | string  | stopPrice trigger price price type: MARK_PRICE, CONTRACT_PRICE, default MARK_PRICE                                                                                                        |
| timeInForce    | string  | Effective method, currently supports GTC, IOC, FOK and PostOnly                                                                                                                           |
| clientOrderId  | string  | Customized order ID for users                                                                                                                                                             |

### Data Parameters

|             | Description                                                                                              |
| ----------- | -------------------------------------------------------------------------------------------------------- |
| type        | Only supports type: STOP_MARKET/STOP, TAKE_PROFIT_MARKET/TAKE_PROFIT                                     |
| stopPrice   | Trigger price, only STOP_MARKET, TAKE_PROFIT_MARKET, STOP, TAKE_PROFIT. When type is STOP or STOP_MARKET |
| price       | Commission price                                                                                         |
| workingType | stopPrice trigger price price type: MARK_PRICE, CONTRACT_PRICE, default MARK_PRICE                       |

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
> [https://bingx-api.github.io/docs//#/en-us/cswap/trade-api.html](https://bingx-api.github.io/docs//#/en-us/cswap/trade-api.html)
