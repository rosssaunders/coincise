# BingX Coin-Futures API - Trading

## Trades Endpoints

### Trade order

POST /openApi/cswap/v1/trade/order

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type:request body(application/json)

The current account places an order on the specified symbol contract. (Supports
limit orders, market orders, planned entrusted market orders, planned entrusted
limit orders, position stop-profit and stop-loss orders, and position closing.)

- LIMIT: Mandatory parameters: quantity, price

- MARKET: Mandatory parameters: quantity

#### 1\. Opening/closing a position: How to use the same api to open a position (long/short) and close a position (long/short)? Please refer to the following request payload combination:

open/buy LONG: side=BUY & positionSide=LONG

close/sell LONG: side=SELL & positionSide=LONG

open/sell SHORT: side=SELL & positionSide=SHORT

close/buy SHORT: side=BUY & positionSide=SHORT

{"symbol": "ETH-USD","side": "BUY","positionSide": "LONG", "type": "MARKET",
"quantity": 5}

#### 2\. Set take-profit and stop-loss separately: This api can also be used to set take-profit and stop-loss separately, but you need to open a position first;

{"symbol": "ETH-USD","side": "BUY","positionSide": "LONG", "type":
"TAKE_PROFIT_MARKET", "quantity": 3, "stopPrice": 31968.0}

#### 3\. Set take profit and stop loss when opening and adding positions: use takeProfit or stopLoss field

{"symbol": "BTC-USD","side": "BUY","positionSide": "LONG","type":
"MARKET","quantity": 5,"takeProfit": "{\\"type\\": \\"TAKE_PROFIT_MARKET\\",
\\"stopPrice\\": 31968.0,\\"price\\":
31968.0,\\"workingType\\":\\"MARK_PRICE\\"}"}

The triggering of a conditional order must:

#### STOP/STOP_MARKET Stop loss order:

- The cumulative quantity of placed stop-loss orders cannot be greater than the
  position quantity

- Buy: The mark price is higher than or equal to the trigger price stopPrice

- Sell: The mark price is lower than or equal to the trigger price stopPrice

#### TAKE_PROFIT/TAKE_PROFIT_MARKET Take profit order:

- The cumulative quantity of pending stop-profit orders cannot be greater than
  the position quantity

- Buy: The mark price is lower than or equal to the trigger price stopPrice

- Sell: The mark price is higher than or equal to the trigger price stopPrice

Request Parameters

#### Request Parameters

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

#### Response Parameters

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

#### Data Parameters

|             | Description                                                                                              |
| ----------- | -------------------------------------------------------------------------------------------------------- |
| type        | Only supports type: STOP_MARKET/STOP, TAKE_PROFIT_MARKET/TAKE_PROFIT                                     |
| stopPrice   | Trigger price, only STOP_MARKET, TAKE_PROFIT_MARKET, STOP, TAKE_PROFIT. When type is STOP or STOP_MARKET |
| price       | Commission price                                                                                         |
| workingType | stopPrice trigger price price type: MARK_PRICE, CONTRACT_PRICE, default MARK_PRICE                       |

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

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/cswap/trade-api.html#Trade
> order](https://bingx-api.github.io/docs/#/en-us/cswap/trade-api.html#Trade
> order)

### Query Trade Commission Rate

GET /openApi/cswap/v1/user/commissionRate

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

#### Request Parameters

| Parameter Name | Type  | Required | Description                                  |
| -------------- | ----- | -------- | -------------------------------------------- |
| timestamp      | int64 | Yes      | Request timestamp, unit: millisecond         |
| recvWindow     | int64 | No       | Request valid time window, unit: millisecond |

#### Response Parameters

| Parameter Name | Type   | Description                                      |
| -------------- | ------ | ------------------------------------------------ |
| code           | int32  | Status Code                                      |
| msg            | string | Description                                      |
| timestamp      | int64  | Response Generated Time Point, unit: millisecond |
| data           | List   |                                                  |

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

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/cswap/trade-api.html#Query Trade
> Commission
> Rate](https://bingx-api.github.io/docs/#/en-us/cswap/trade-api.html#Query
> Trade Commission Rate)

### Query Leverage

GET /openApi/cswap/v1/trade/leverage

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

#### Request Parameters

| Parameter Name | Type   | Required | Description                                        |
| -------------- | ------ | -------- | -------------------------------------------------- |
| symbol         | string | Yes      | Trading pair, e.g. BTC-USD, use uppercase letters  |
| timestamp      | int64  | Yes      | Request timestamp, unit: millisecond               |
| recvWindow     | int64  | No       | Request valid time window value, unit: millisecond |

#### Response Parameters

| Parameter Name | Type   | Description                                      |
| -------------- | ------ | ------------------------------------------------ |
| code           | int32  | Status code                                      |
| msg            | string | Description                                      |
| timestamp      | int64  | Response generation timestamp, unit: millisecond |
| data           | List   |                                                  |

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

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/cswap/trade-api.html#Query
> Leverage](https://bingx-api.github.io/docs/#/en-us/cswap/trade-api.html#Query
> Leverage)

### Modify Leverage

POST /openApi/cswap/v1/trade/leverage

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

#### Request Parameters

| Parameter Name | Type   | Required | Description                                                                                                                          |
| -------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| symbol         | string | Yes      | Trading pair, for example: BTC-USD, use capital letters                                                                              |
| side           | string | Yes      | For dual-position mode, the leverage rate of long or short positions. LONG represents long position, SHORT represents short position |
| leverage       | string | Yes      | Leverage rate                                                                                                                        |
| timestamp      | int64  | Yes      | Request timestamp, unit: millisecond                                                                                                 |
| recvWindow     | int64  | No       | Request valid time window value, unit: millisecond                                                                                   |

#### Response Parameters

| Parameter Name | Type   | Description                                      |
| -------------- | ------ | ------------------------------------------------ |
| code           | int32  | Status code                                      |
| msg            | string | Description                                      |
| timestamp      | int64  | Response generation timestamp, unit: millisecond |
| data           | List   |                                                  |

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

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/cswap/trade-api.html#Modify
> Leverage](https://bingx-api.github.io/docs/#/en-us/cswap/trade-api.html#Modify
> Leverage)

### Cancel all orders

POST /openApi/cswap/v1/trade/allOpenOrders

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

#### Request Parameters

| Parameter Name | Type   | Required | Description                                           |
| -------------- | ------ | -------- | ----------------------------------------------------- |
| symbol         | string | No       | Trading pair, example: BTC-USD, use uppercase letters |
| timestamp      | int64  | Yes      | Request timestamp in milliseconds                     |
| recvWindow     | int64  | No       | Request valid time window value, unit: milliseconds   |

#### Response Parameters

| Parameter Name | Type   | Description                                        |
| -------------- | ------ | -------------------------------------------------- |
| code           | int32  | Status code                                        |
| msg            | string | Description                                        |
| timestamp      | int64  | Response generation time point, unit: milliseconds |
| data           | Obj    |                                                    |

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

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/cswap/trade-api.html#Cancel all
> orders](https://bingx-api.github.io/docs/#/en-us/cswap/trade-api.html#Cancel
> all orders)

### Close all positions in bulk

POST /openApi/cswap/v1/trade/closeAllPositions

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

#### Request Parameters

| Parameter Name | Type   | Required | Description                                        |
| -------------- | ------ | -------- | -------------------------------------------------- |
| symbol         | string | No       | Trading pair, e.g. BTC-USD, use uppercase letters  |
| timestamp      | int64  | Yes      | Request timestamp, unit: millisecond               |
| recvWindow     | int64  | No       | Request valid time window value, unit: millisecond |

#### Response Parameters

| Parameter Name | Type   | Description                                      |
| -------------- | ------ | ------------------------------------------------ |
| code           | int32  | Status code                                      |
| msg            | string | Description                                      |
| timestamp      | int64  | Response generation timestamp, unit: millisecond |
| data           | Obj    |                                                  |

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

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/cswap/trade-api.html#Close all
> positions in
> bulk](https://bingx-api.github.io/docs/#/en-us/cswap/trade-api.html#Close all
> positions in bulk)

### Query warehouse

GET /openApi/cswap/v1/user/positions

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

HTTP request

API parameters

#### Request Parameters

| Parameter Name | Type   | Required | Description                                           |
| -------------- | ------ | -------- | ----------------------------------------------------- |
| symbol         | string | No       | Trading pair, example: BTC-USD, use uppercase letters |
| timestamp      | int64  | Yes      | Request time stamp, unit: millisecond                 |
| recvWindow     | int64  | No       | Request valid time window value, unit: millisecond    |

#### Response Parameters

| Parameter Name | Type   | Description                                       |
| -------------- | ------ | ------------------------------------------------- |
| code           | int32  | Status code                                       |
| msg            | string | Description information                           |
| timestamp      | int64  | Response generation time point, unit: millisecond |
| data           | List   | Warehouse list                                    |

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

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/cswap/trade-api.html#Query
> warehouse](https://bingx-api.github.io/docs/#/en-us/cswap/trade-api.html#Query
> warehouse)

### Query Account Assets

GET /openApi/cswap/v1/user/balance

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

HTTP request

API parameters

#### Request Parameters

| Parameter Name | Type   | Required | Description                                        |
| -------------- | ------ | -------- | -------------------------------------------------- |
| symbol         | string | No       | Trading pair, e.g. BTC-USD, use uppercase letters  |
| timestamp      | int64  | Yes      | Request timestamp, unit: millisecond               |
| recvWindow     | int64  | No       | Request valid time window value, unit: millisecond |

#### Response Parameters

| Parameter Name | Type   | Description                                       |
| -------------- | ------ | ------------------------------------------------- |
| code           | int32  | Status code                                       |
| msg            | string | Description message                               |
| timestamp      | int64  | Response generation time point, unit: millisecond |
| data           | List   | Asset list                                        |

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

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/cswap/trade-api.html#Query Account
> Assets](https://bingx-api.github.io/docs/#/en-us/cswap/trade-api.html#Query
> Account Assets)

### Query force orders

GET /openApi/cswap/v1/trade/forceOrders

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

#### Request Parameters

| Parameter Name | Type   | Required | Description                                                                             |
| -------------- | ------ | -------- | --------------------------------------------------------------------------------------- |
| symbol         | string | No       | Trading pair, for example: BTC-USD, use uppercase letters                               |
| autoCloseType  | string | No       | LIQUIDATION:Force order, ADL:Reduce order                                               |
| startTime      | int64  | No       | Start time, unit: milliseconds                                                          |
| endTime        | int64  | No       | End time, unit: milliseconds                                                            |
| limit          | int64  | No       | The number of results in the returned result set, default value: 50, maximum value: 100 |
| timestamp      | int64  | Yes      | Request time stamp, unit: milliseconds                                                  |
| recvWindow     | int64  | No       | Request effective time window value, unit: milliseconds                                 |

#### Response Parameters

| Parameter Name | Type   | Description                                        |
| -------------- | ------ | -------------------------------------------------- |
| code           | int32  | Status code                                        |
| msg            | string | Description information                            |
| timestamp      | int64  | Response generation time point, unit: milliseconds |
| data           | List   | Force order list                                   |

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

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/cswap/trade-api.html#Query force
> orders](https://bingx-api.github.io/docs/#/en-us/cswap/trade-api.html#Query
> force orders)

### Query Order Trade Detail

GET /openApi/cswap/v1/trade/allFillOrders

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

#### Request Parameters

| Parameter Name | Type   | Required | Description                                        |
| -------------- | ------ | -------- | -------------------------------------------------- |
| orderId        | string | Yes      | Order ID                                           |
| pageIndex      | int64  | No       | Page number, default 1                             |
| pageSize       | int64  | No       | Number per page, default 100, max 1000             |
| timestamp      | int64  | Yes      | Request timestamp, unit: millisecond               |
| recvWindow     | int64  | No       | Request valid time window value, unit: millisecond |

#### Response Parameters

| Parameter Name | Type   | Description                                           |
| -------------- | ------ | ----------------------------------------------------- |
| code           | int32  | Status code                                           |
| msg            | string | Description                                           |
| timestamp      | int64  | Response generated timestamp point, unit: millisecond |
| data           | List   | Trade detail list                                     |

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

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/cswap/trade-api.html#Query Order
> Trade
> Detail](https://bingx-api.github.io/docs/#/en-us/cswap/trade-api.html#Query
> Order Trade Detail)

### Cancel an Order

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

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

DELETE /openApi/cswap/v1/trade/cancelOrder

#### Request Parameters

| Parameter Name | Type   | Required | Description                                                         |
| -------------- | ------ | -------- | ------------------------------------------------------------------- |
| orderId        | int64  | no       | Order ID                                                            |
| symbol         | string | yes      | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USD |
| clientOrderId  | string | no       | Customized order ID for users                                       |
| timestamp      | int64  | yes      | request timestamp, unit: millisecond                                |
| recvWindow     | int64  | no       | Request valid time window value, Unit: milliseconds                 |

#### Response Parameters

| Parameter Name | Type   | Description                                                                                                                                                                                                                                                                                                                                  |
| -------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| time           | int64  | order time, unit: millisecond                                                                                                                                                                                                                                                                                                                |
| symbol         | string | trading pair, for example: BTC-USD                                                                                                                                                                                                                                                                                                           |
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
| clientOrderId  | string | Customized order ID for users                                                                                                                                                                                                                                                                                                                |

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

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/cswap/trade-api.html#Cancel an
> Order](https://bingx-api.github.io/docs/#/en-us/cswap/trade-api.html#Cancel an
> Order)

### Query all current pending orders

GET /openApi/cswap/v1/trade/openOrders

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

Query all orders that the user is currently entrusted with.

#### Request Parameters

| Parameter Name | Type   | Required | Description                                                                                                                                                                              |
| -------------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol         | string | no       | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USD,When not filled, query all pending orders. When filled, query the pending orders for the corresponding currency pair |
| timestamp      | int64  | yes      | request timestamp in milliseconds                                                                                                                                                        |
| recvWindow     | int64  | no       | Request valid time window value, Unit: milliseconds                                                                                                                                      |

#### Response Parameters

| Parameter Name | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                       |
| -------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| time           | int64  | order time, unit: millisecond                                                                                                                                                                                                                                                                                                                                                                     |
| symbol         | string | trading pair, for example: BTC-USD                                                                                                                                                                                                                                                                                                                                                                |
| side           | string | buying and selling direction                                                                                                                                                                                                                                                                                                                                                                      |
| type           | string | LIMIT: Limit Order / MARKET: Market Order / STOP_MARKET: Stop Market Order / TAKE_PROFIT_MARKET: Take Profit Market Order / STOP: Stop Limit Order / TAKE_PROFIT: Take Profit Limit Order / TRIGGER_LIMIT: Stop Limit Order with Trigger / TRIGGER_MARKET: Stop Market Order with Trigger / TRAILING_STOP_MARKET: Trailing Stop Market Order/ TRIGGER_REVERSE_MARKET:trigger reverse Market order |
| positionSide   | string | Position direction, required for single position as BOTH, for both long and short positions only LONG or SHORT can be chosen, defaults to LONG if empty                                                                                                                                                                                                                                           |
| reduceOnly     | string | true, false; Default value is false for single position mode; This parameter is not accepted for both long and short positions mode                                                                                                                                                                                                                                                               |
| cumQuote       | string | transaction amount                                                                                                                                                                                                                                                                                                                                                                                |
| status         | string | order status                                                                                                                                                                                                                                                                                                                                                                                      |
| stopPrice      | string | Trigger price                                                                                                                                                                                                                                                                                                                                                                                     |
| price          | string | Price                                                                                                                                                                                                                                                                                                                                                                                             |
| origQty        | string | original order quantity                                                                                                                                                                                                                                                                                                                                                                           |
| avgPrice       | string | average transaction price                                                                                                                                                                                                                                                                                                                                                                         |
| executedQty    | string | volume                                                                                                                                                                                                                                                                                                                                                                                            |
| orderId        | int64  | Order ID                                                                                                                                                                                                                                                                                                                                                                                          |
| profit         | string | profit and loss                                                                                                                                                                                                                                                                                                                                                                                   |
| commission     | string | Fee                                                                                                                                                                                                                                                                                                                                                                                               |
| workingType    | string | StopPrice trigger price types: MARK_PRICE, CONTRACT_PRICE, default MARK_PRICE                                                                                                                                                                                                                                                                                                                     |
| updateTime     | int64  | update time, unit: millisecond                                                                                                                                                                                                                                                                                                                                                                    |
| postOnly       | bool   | Maker only                                                                                                                                                                                                                                                                                                                                                                                        |
| timeInForce    | string | Effective method, currently supports GTC, IOC, FOK and PostOnly                                                                                                                                                                                                                                                                                                                                   |
| clientOrderId  | string | Customized order ID for users                                                                                                                                                                                                                                                                                                                                                                     |

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

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/cswap/trade-api.html#Query all
> current pending
> orders](https://bingx-api.github.io/docs/#/en-us/cswap/trade-api.html#Query
> all current pending orders)

### Query Order

GET /openApi/cswap/v1/trade/orderDetail

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

Query order details

#### Request Parameters

| Parameter Name | Type   | Required | Description                                                         |
| -------------- | ------ | -------- | ------------------------------------------------------------------- |
| symbol         | string | yes      | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USD |
| orderId        | int64  | no       | Order ID                                                            |
| clientOrderId  | string | no       | Customized order ID for users                                       |
| timestamp      | int64  | yes      | request timestamp in milliseconds                                   |
| recvWindow     | int64  | no       | Request valid time window value, Unit: milliseconds                 |

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
| timeInForce    | string | Effective method, currently supports GTC, IOC, FOK and PostOnly                                                                                                                                                                                                                                                                              |
| clientOrderId  | string | Customized order ID for users                                                                                                                                                                                                                                                                                                                |

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

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/cswap/trade-api.html#Query
> Order](https://bingx-api.github.io/docs/#/en-us/cswap/trade-api.html#Query
> Order)

### User's History Orders

GET /openApi/cswap/v1/trade/orderHistory

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

Query the user's historical orders (order status is completed or canceled).

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

| Parameter Name | Type   | Required | Description                                                                                                                                               |
| -------------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol         | string | no       | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USD.If no symbol is specified, it will query the historical orders for all trading pairs. |
| orderId        | int64  | no       | Only return subsequent orders, and return the latest order by default                                                                                     |
| startTime      | int64  | no       | Start time, unit: millisecond                                                                                                                             |
| endTime        | int64  | no       | End time, unit: millisecond                                                                                                                               |
| limit          | int    | yes      | number of result sets to return Default: 500 Maximum: 1000                                                                                                |
| timestamp      | int64  | yes      | request timestamp in milliseconds                                                                                                                         |
| recvWindow     | int64  | no       | Request valid time window value, Unit: milliseconds                                                                                                       |

#### Response Parameters

| Parameter Name | Type   | Description                                                                                                                                                                                                                                                                                                                                  |
| -------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| time           | int64  | order time, unit: millisecond                                                                                                                                                                                                                                                                                                                |
| symbol         | string | trading pair, for example: BTC-USDT.If a specific pair is not provided, a history of transactions for all pairs will be returned                                                                                                                                                                                                             |
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
| workingType    | string | StopPrice trigger price types: MARK_PRICE, CONTRACT_PRICE, default MARK_PRICE                                                                                                                                                                                                                                                                |
| updateTime     | int64  | update time, unit: millisecond                                                                                                                                                                                                                                                                                                               |
| timeInForce    | string | Effective method, currently supports GTC, IOC, FOK and PostOnly                                                                                                                                                                                                                                                                              |
| clientOrderId  | string | Customized order ID for users                                                                                                                                                                                                                                                                                                                |

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

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/cswap/trade-api.html#User's History
> Orders](https://bingx-api.github.io/docs/#/en-us/cswap/trade-api.html#User's
> History Orders)

### Query Margin Type

GET /openApi/cswap/v1/trade/marginType

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

Get Margin Type

#### Request Parameters

| Parameter Name | Type   | Required | Description                                               |
| -------------- | ------ | -------- | --------------------------------------------------------- |
| symbol         | string | yes      | Trading pair, e.g., BTC-USD, please use uppercase letters |
| timestamp      | int64  | yes      | Request timestamp in milliseconds                         |
| recvWindow     | int64  | no       | Request validity window in milliseconds                   |

#### Response Parameters

| Parameter Name | Type   | Description                          |
| -------------- | ------ | ------------------------------------ |
| symbol         | string | Trading pair                         |
| marginType     | string | Margin type, e.g., CROSSED, ISOLATED |

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

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/cswap/trade-api.html#Query Margin
> Type](https://bingx-api.github.io/docs/#/en-us/cswap/trade-api.html#Query
> Margin Type)

### Set Margin Type

POST /openApi/cswap/v1/trade/marginType

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type:request body(application/json)

Set Margin Type

#### Request Parameters

| Parameter Name | Type   | Required | Description                                               |
| -------------- | ------ | -------- | --------------------------------------------------------- |
| symbol         | string | yes      | Trading pair, e.g., BTC-USD, please use uppercase letters |
| marginType     | string | yes      | Margin type, e.g., ISOLATED, CROSSED                      |
| timestamp      | int64  | yes      | Request timestamp in milliseconds                         |
| recvWindow     | int64  | no       | Request validity window in milliseconds                   |

#### Response Parameters

|     | Parameter Name | Type | Description |
| --- | -------------- | ---- | ----------- |

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

> **Source:** [https://bingx-api.github.io/docs/#/en-us/cswap/trade-api.html#Set
> Margin Type](https://bingx-api.github.io/docs/#/en-us/cswap/trade-api.html#Set
> Margin Type)

### Adjust Isolated Margin

POST /openApi/cswap/v1/trade/positionMargin

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type:request body(application/json)

Adjust the isolated margin funds for positions in isolated mode

#### Request Parameters

| Parameter Name | Type    | Required | Description                                                                    |
| -------------- | ------- | -------- | ------------------------------------------------------------------------------ |
| symbol         | string  | yes      | Trading pair, e.g., BTC-USD, please use uppercase letters                      |
| amount         | float64 | yes      | Margin funds                                                                   |
| type           | int     | yes      | Adjustment direction: 1: Increase isolated margin, 2: Decrease isolated margin |
| positionSide   | string  | yes      | Position direction, can only be LONG or SHORT                                  |
| timestamp      | int64   | yes      | Request timestamp in milliseconds                                              |
| recvWindow     | int64   | no       | Request validity window in milliseconds                                        |

#### Response Parameters

| Parameter Name | Type   | Description                                      |
| -------------- | ------ | ------------------------------------------------ |
| code           | int64  | Error code, 0 means success, non-0 means failure |
| msg            | string | Error message                                    |

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

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/cswap/trade-api.html#Adjust Isolated
> Margin](https://bingx-api.github.io/docs/#/en-us/cswap/trade-api.html#Adjust
> Isolated Margin)

---
