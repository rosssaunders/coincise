# GET open orders.

**Source:**
[open orders.](https://docs.backpack.exchange/#tag/Order/operation/get_open_orders)

## Authentication

Required (Private Endpoint)

## [](#tag/Order/operation/get_open_orders)Get open orders.

Retrieves all open orders. If a symbol is provided, only open orders for that
market will be returned, otherwise all open orders are returned.

**Instruction:** `orderQueryAll`

##### query Parameters

| Parameter  | Required | Type   | Description                               |
| ---------- | -------- | ------ | ----------------------------------------- |
| marketType | optional | string | The market for the orders (SPOT or PERP). |
| symbol     | optional | string | The symbol of the market for the orders.  |

##### header Parameters

| Parameter   | Required | Type             | Description                                                                 |
| ----------- | -------- | ---------------- | --------------------------------------------------------------------------- |
| X-API-KEY   | optional | string           | API key                                                                     |
| X-SIGNATURE | optional | string           | Signature of the request                                                    |
| X-TIMESTAMP | optional | integer <int64>  | Timestamp of the request in milliseconds                                    |
| X-WINDOW    | optional | integer <uint64> | Time the request is valid for in milliseconds (default 5000, maximum 60000) |

### Responses

**200**

Success.

##### Response Schema: application/json; charset=utf-8

Array

| Parameter              | Required | Type             | Description                                                                                                           |
| ---------------------- | -------- | ---------------- | --------------------------------------------------------------------------------------------------------------------- |
| orderType              | required | string           |                                                                                                                       |
| id                     | required | string           | Unique ID of this order.                                                                                              |
| clientId               | optional | integer <uint32> | Custom order ID.                                                                                                      |
| createdAt              | required | integer <int64>  | Time the order was created.                                                                                           |
| executedQuantity       | required | string <decimal> | Quantity that has been filled.                                                                                        |
| executedQuoteQuantity  | required | string <decimal> | Quantity of the quote asset that has been filled.                                                                     |
| quantity               | optional | string <decimal> | Quantity to fill.                                                                                                     |
| quoteQuantity          | optional | string <decimal> | Quantity of the quote asset to fill.                                                                                  |
| reduceOnly             | optional | boolean          | True if reducing a futures position.                                                                                  |
| timeInForce            | required | string           | How long the order is good for.                                                                                       |
| selfTradePrevention    | required | string           | Action to take in the event the user crosses themselves in the order book. Default is RejectTaker.                    |
| side                   | required | string           | The order side. It will be matched against the resting orders on the other side of the order book.                    |
| status                 | required | string           | Status of the order.                                                                                                  |
| stopLossTriggerPrice   | optional | string           | Stop loss price (price the stop loss order will be triggered at).                                                     |
| stopLossLimitPrice     | optional | string <decimal> | Stop loss limit price. If set the stop loss will be a limit order, otherwise it will be a market order.               |
| stopLossTriggerBy      | optional | string           | Reference price that should trigger the stop loss order.                                                              |
| symbol                 | required | string           | Market symbol.                                                                                                        |
| takeProfitTriggerPrice | optional | string           | Take profit price (price the take profit order will be triggered at).                                                 |
| takeProfitLimitPrice   | optional | string <decimal> | Take profit limit price. If set the take profit will be a limit order, otherwise it will be a market order.           |
| takeProfitTriggerBy    | optional | string           | Reference price that should trigger the take profit order.                                                            |
| triggerBy              | optional | string           | Reference price that should trigger the order.                                                                        |
| triggerPrice           | optional | string           | Price the order should trigger at, if any.                                                                            |
| triggerQuantity        | optional | string           | Quantity for trigger orders.                                                                                          |
| triggeredAt            | optional | integer <int64>  |                                                                                                                       |
| relatedOrderId         | optional | string           | The ID of the related order. This may refer to a parent order or, for a trigger order, the order this trigger is for. |
| strategyId             | optional | string           | Strategy ID of the order, if any.                                                                                     |
| slippageTolerance      | optional | string <decimal> | Slippage tolerance allowed for the order.                                                                             |
| slippageToleranceType  | optional | string           | Slippage tolerance type                                                                                               |

**400**

Bad request.

**500**

Internal Server Error.

##### Response Schema: application/json; charset=utf-8

| Parameter | Required | Type   | Description |
| --------- | -------- | ------ | ----------- |
| code      | required | string |             |
| message   | required | string |             |
