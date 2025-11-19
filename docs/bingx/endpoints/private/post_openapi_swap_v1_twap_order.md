# POST /openApi/swap/v1/twap/order

**Source:** [/openApi/swap/v1/twap/order](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Place TWAP Order

POST /openApi/swap/v1/twap/order

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type: request body(application/json)

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

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html)
