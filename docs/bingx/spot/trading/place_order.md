## Place order

POST /openApi/spot/v1/trade/order

rate limitation by UID: 5/s & rate limitation by IP in group Number: 3

API KEY permission: Spot Trading

Content-Type:request body(application/json)

### Description

Can be used to place 1 order on spot

Notice:

- For limit orders, price is required.
- or limit orders, either quantity or quoteOrderQty is required. When two
  parameters are passed at the same time, the server uses the parameter quantity
  first.
- For buy-side market orders, quoteOrderQty is required.
- For sell-side market orders, quantity is required.

Trading Rules:

- Trading Rules:
  [https://bingx.com/en/spot/trading-rules/](https://bingx.com/en/spot/trading-rules/)
- About price accuracy and quantity accuracy reference interface:
  [https://open-api.bingx.com/openApi/spot/v1/common/symbols](https://open-api.bingx.com/openApi/spot/v1/common/symbols)
- If the accuracy exceeds the range of the current period, the current API order
  will still be successful, but it will be truncated. For example, the price
  requirement is: 0.0001, if the order is 0.123456, it will be successfully
  submitted with 0.1234.

- For price reference, please check:
  [GET /openApi/spot/v1/ticker/24hr](https://bingx-api.github.io/docs/#/en-us/spot/market-api.html#24-hour%20price%20changes)
- For Minimum/Maximum transaction amount reference, please check:
  [GET /openApi/spot/v1/common/symbols](https://bingx-api.github.io/docs/#/en-us/spot/market-api.html#Query%20Symbols)

If the spot trader of copy trading has enabled the function

- The order frequency can only be 1/s, exceeding it will be limited frequency.
- BUY can use this endpoint:POST /openApi/spot/v1/trade/order
- SELL need to use another specific
  endpoint:[POST /openApi/copyTrading/v1/spot/trader/sellOrder](http://localhost:1024/#/en-us/copyTrade/trader-interface.html#Trader%20sells%20spot%20assets%20based%20on%20buy%20order%20number)

### Order Type

MARKET: Market Price

LIMITED: Limit Price

TAKE\_ STOP\_ Limit: Limit Price Stop Profit Stop Loss Order

TAKE\_ STOP\_ MARKET: Market price stop loss order

TRIGGER\_ Limit: Price limit plan commission

TRIGGER\_ Market: Market price plan commission

### Request Parameters

| Parameter Name   | Type    | Required | Description                                                                                                                                                                                       |
| ---------------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol           | string  | yes      | Trading pair, e.g., BTC-USDT                                                                                                                                                                      |
| side             | string  | yes      | BUY/SELL                                                                                                                                                                                          |
| type             | string  | yes      | MARKET/LIMIT/TAKE_STOP_LIMIT/TAKE_STOP_MARKET/TRIGGER_LIMIT/TRIGGER_MARKET                                                                                                                        |
| stopPrice        | string  | 是       | order trigger price, used for TAKE\_ STOP\_ LIMITED,TAKE\_ STOP\_ MARKET, TRIGGER\_ LIMITED, TRIGGER\_ Market type orders.                                                                        |
| quantity         | float64 | no       | Original quantity, e.g., 0.1BTC                                                                                                                                                                   |
| quoteOrderQty    | float64 | no       | Quote order quantity, e.g., 100USDT,if quantity and quoteOrderQty are input at the same time, quantity will be used first, and quoteOrderQty will be discarded                                    |
| price            | float64 | no       | Price, e.g., 10000USDT                                                                                                                                                                            |
| newClientOrderId | string  | no       | Only letters, numbers and \_,Customized order ID for users, with a limit of characters from 1 to 40. Different orders cannot use the same newClientOrderId,Only supports a query range of 2 hours |
| timeInForce      | string  | no       | Time in force, currently supports PostOnly, GTC, IOC, FOK. Default is GTC if not specified.                                                                                                       |
| recvWindow       | float64 | no       | Request valid time window value, Unit: milliseconds                                                                                                                                               |
| timestamp        | int64   | yes      | Timestamp of initiating the request, Unit: milliseconds                                                                                                                                           |

### Response Parameters

| Parameter Name      | Type   | Description                                                            |
| ------------------- | ------ | ---------------------------------------------------------------------- |
| symbol              | string | Trading pair                                                           |
| orderId             | int64  | Order ID                                                               |
| transactTime        | int64  | Transaction timestamp                                                  |
| price               | string | Price                                                                  |
| origQty             | string | Original quantity                                                      |
| executedQty         | string | Executed quantity                                                      |
| cummulativeQuoteQty | string | Cumulative quote asset transacted quantity                             |
| status              | string | Order status: NEW, PENDING, PARTIALLY_FILLED, FILLED, CANCELED, FAILED |
| type                | string | MARKET/LIMIT                                                           |
| side                | string | BUY/SELL                                                               |
| clientOrderID       | string | Customized order ID for users                                          |

### Errors

| Error Code | Description                                                                                                                                                                                                                                      |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 80014      | timestamp is invalid                                                                                                                                                                                                                             |
| 100421     | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets                                                                                     |
| 100419     | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set                                                                                                                                    |
| 100410     | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249                                                                                                              |
| 100410     | rate limited                                                                                                                                                                                                                                     |
| 100413     | Incorrect apiKey                                                                                                                                                                                                                                 |
| 100410     | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155                                                                                                                  |
| 100202     | Insufficient assets, please verify the assets status                                                                                                                                                                                             |
| 100421     | traders prohibit openApi from placing orders                                                                                                                                                                                                     |
| 100414     | Your account is under risk control or without KYC, it's not allowed to place spot order via api,currently,please contact customer service                                                                                                        |
| 100400     | check limit entrust value fail, entrust volume too low, userID: \*\*\*, minVolume:69.93, entrustVolume: 54.02                                                                                                                                    |
| 100400     | check param fail:entrust volume and value is 0.0                                                                                                                                                                                                 |
| 100414     | risk control check fail, code(1), reason()                                                                                                                                                                                                       |
| 100490     | spot symbol is offline                                                                                                                                                                                                                           |
| 100500     | order open error:The current system is busy, please try again later, and the previous cancel order request result:false, order not exist                                                                                                         |
| 100440     | check price diverge fail, entrustPrice to high, userID: \*\*\*,entrustPrice:0.4950, indexPrice:0.0910,tradePrice: 0.0910, maxEntrustPriceDiverge:0.4550, minEntrustPriceDiverge:0.0182,minDivergeRatio:0.2000000000,maxDivergeRatio:5.0000000000 |
| 100400     | price can't be lte 0 in limit order                                                                                                                                                                                                              |
| 100421     | The symbol you request is not available to place order currently, please verify symbol's status by api:/openApi/spot/v1/common/symbols                                                                                                           |
| 100421     | CheckUserAndSymbol: contract not exist                                                                                                                                                                                                           |
| 100421     | cancel fail, order not exist                                                                                                                                                                                                                     |
| 100400     | the order you want to cancel is FILLED or CANCELLED already, or is not a valid order id ,please verify                                                                                                                                           |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/spot/trade-api.html](https://bingx-api.github.io/docs/#/en-us/spot/trade-api.html)
