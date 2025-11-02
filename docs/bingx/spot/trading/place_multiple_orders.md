## Place multiple orders

POST /openApi/spot/v1/trade/batchOrders

rate limitation by UID: 2/s & rate limitation by IP in group Number: 3

API KEY permission: Spot Trading

Content-Type:request body(application/json)

### Description

Can be used to place orders in bulk on spot

Notes

- For a limit order, the "price" parameter must be included.
- For a limit order, either "quantity" or "quoteOrderQty" must be included. If
  both parameters are provided, the server will prioritize the "quantity"
  parameter.
- For a market buy order, the "quoteOrderQty" parameter must be included.
- For a market sell order, the "quantity" parameter must be included.
- Orders created through the api will not be displayed on the app and web pages.

If you need to calculate the maximum and minimum order quantities for a currency
pair, you can use the formula: U (minNotional or maxNotional) / (Limit price or
Market price)

- For price reference, please check:
  [GET /openApi/spot/v1/ticker/24hr](https://bingx-api.github.io/docs/#/en-us/spot/market-api.html#24-hour%20price%20changes)
- For Minimum/Maximum transaction amount reference, please check:
  [GET /openApi/spot/v1/common/symbols](https://bingx-api.github.io/docs/#/en-us/spot/market-api.html#Query%20Symbols)

Trading Rules:

- Trading Rules:
  [https://bingx.com/en/spot/trading-rules/](https://bingx.com/en/spot/trading-rules/)
- About price accuracy and quantity accuracy reference interface:
  [https://open-api.bingx.com/openApi/spot/v1/common/symbols](https://open-api.bingx.com/openApi/spot/v1/common/symbols)
- If the accuracy exceeds the range of the current period, the current API order
  will still be successful, but it will be truncated. For example, the price
  requirement is: 0.0001, if the order is 0.123456, it will be successfully
  submitted with 0.1234.

- place batch orders, how to sign the request? please refer to
  [Perpetual: place batch orders](https://bingx-api.github.io/docs/#/swapV2/trade-api.html#Bulk%20order)

### Request Parameters

| Parameter Name | Type  | Required | Description                                                                                                                                                                                                                     |
| -------------- | ----- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| data           | array | Yes      | The request array for placing orders, limited to 5 orders.                                                                                                                                                                      |
| sync           | bool  | no       | sync=false (default false if not filled in): parallel ordering (but all orders need to have the same symbol/side/type), sync = true (multiple orders are ordered serially, all orders do not require the same symbol/side/type) |

### Response Parameters

| Parameter Name | Type  | Description                       |
| -------------- | ----- | --------------------------------- |
| orders         | array | Response array for a single order |

### Data Parameters

|                  | Description                                                                                                                                                                                       |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol           | Trading symbol, for example: BTC-USDT, please use capital letters.                                                                                                                                |
| side             | Transaction type, BUY = buy SELL = sell                                                                                                                                                           |
| type             | MARKET/LIMIT/TAKE_STOP_LIMIT/TAKE_STOP_MARKET/TRIGGER_LIMIT/TRIGGER_MARKET                                                                                                                        |
| stopPrice        | order trigger price, used for TAKE\_ STOP\_ LIMITED,TAKE\_ STOP\_ MARKET, TRIGGER\_ LIMITED, TRIGGER\_ Market type orders.                                                                        |
| quantity         | Order quantity, for example: 0.1BTC                                                                                                                                                               |
| quoteOrderQty    | Order amount, for example: 100 USDT                                                                                                                                                               |
| price            | Order price, for example: 10,000 USDT                                                                                                                                                             |
| newClientOrderId | Only letters, numbers and \_,Customized order ID for users, with a limit of characters from 1 to 40. Different orders cannot use the same newClientOrderId,Only supports a query range of 2 hours |
| timeInForce      | Time in force, currently supports PostOnly, GTC, IOC, FOK. Default is GTC if not specified.                                                                                                       |
| recvWindow       | Request validity time window, unit: milliseconds                                                                                                                                                  |
| timestamp        | Request timestamp, unit: milliseconds                                                                                                                                                             |

### Order Parameters

|                     | Description                                                                                                                                                                 |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol              | Trading symbol, for example: BTC-USDT, please use capital letters.                                                                                                          |
| orderId             | Order number, please watch out for numeric overflow                                                                                                                         |
| transactTime        | Transaction timestamp, in milliseconds                                                                                                                                      |
| price               | Order price                                                                                                                                                                 |
| origQty             | Order quantity                                                                                                                                                              |
| executedQty         | Filled amount                                                                                                                                                               |
| cummulativeQuoteQty | Volume                                                                                                                                                                      |
| status              | Order status, NEW = New order PENDING = Pending order PARTIALLY_FILLED = Partially filled order FILLED = Fully filled order CANCELED = Canceled order FAILED = Failed order |
| type                | Order type, MARKET = market price LIMIT = limit price                                                                                                                       |
| side                | Transaction type, BUY = buy SELL = sell                                                                                                                                     |
| clientOrderID       | Customized order ID for users                                                                                                                                               |

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
> [https://bingx-api.github.io/docs/#/en-us/spot/trade-api.html](https://bingx-api.github.io/docs/#/en-us/spot/trade-api.html)
