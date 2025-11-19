# POST /openApi/spot/v1/trade/order

**Source:** [/openApi/spot/v1/trade/order](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Place order

POST /openApi/spot/v1/trade/order

rate limitation by UID: 5/s & rate limitation by IP in group Number: 3

API KEY permission: Spot Trading

Content-Type: request body(application/json)

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

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/spot/trade-api.html](https://bingx-api.github.io/docs/#/en-us/spot/trade-api.html)
