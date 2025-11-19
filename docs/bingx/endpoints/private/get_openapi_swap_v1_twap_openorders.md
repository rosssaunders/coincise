# GET /openApi/swap/v1/twap/openOrders

**Source:**
[/openApi/swap/v1/twap/openOrders](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Query TWAP Entrusted Order

GET /openApi/swap/v1/twap/openOrders

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type   | Required | Description                                                     |
| -------------- | ------ | -------- | --------------------------------------------------------------- |
| symbol         | string | No       | Trading pair, for example: BTC-USDT, please use capital letters |
| timestamp      | int64  | Yes      | the timestamp of the request in milliseconds                    |
| recvWindow     | int64  | No       | Request valid time window value, unit: milliseconds             |

### Response Parameters

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

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html)
