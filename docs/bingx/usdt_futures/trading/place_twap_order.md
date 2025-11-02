## Place TWAP Order

POST /openApi/swap/v1/twap/order

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type:request body(application/json)

Create a Time Weighted Order (TWAP) order. This function will help you execute
large orders in batches within 24 hours, thereby reducing the impact of large
orders on market prices, making the average transaction price closer to the
actual market price, and reducing your transaction costs.

### Request Parameters

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

### Response Parameters

| Parameter Name | Type   | Description       |
| -------------- | ------ | ----------------- |
| mainOrderId    | string | twap order number |

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
| 109400     | CATI-USDT,symbol not exist, please verify it in api: /openApi/swap/v2/quote/contracts                                                                        |
| 80020      | risk forbidden                                                                                                                                               |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html)
