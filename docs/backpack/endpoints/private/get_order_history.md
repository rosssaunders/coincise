# GET order history.

**Source:**
[order history.](https://docs.backpack.exchange/#tag/History/operation/get_order_history)

## Authentication

Required (Private Endpoint)

## [](#tag/History/operation/get_order_history)Get order history.

Retrieves the order history for the user. This includes orders that have been
filled and are no longer on the book. It may include orders that are on the
book, but the `/orders` endpoint contains more up to date data.

**Instruction:** `orderHistoryQueryAll`

##### query Parameters

| Parameter     | Required | Type             | Description                                          |
| ------------- | -------- | ---------------- | ---------------------------------------------------- |
| orderId       | optional | string           | Filter to the given order.                           |
| strategyId    | optional | string           | Filter to the given strategy.                        |
| symbol        | optional | string           | Filter to the given symbol.                          |
| limit         | optional | integer <uint64> | Maximum number to return. Default 100, maximum 1000. |
| offset        | optional | integer <uint64> | Offset. Default 0.                                   |
| marketType    | optional | strings          | Market type.                                         |
| sortDirection | optional | string           | Sort direction.                                      |

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

| Parameter                     | Required | Type             | Description |
| ----------------------------- | -------- | ---------------- | ----------- |
| ACCESS-CONTROL-EXPOSE-HEADERS | required | string           |             |
| X-PAGE-COUNT                  | required | integer <uint64> |             |
| X-CURRENT-PAGE                | required | integer <uint64> |             |
| X-PAGE-SIZE                   | required | integer <uint64> |             |
| X-TOTAL                       | required | integer <uint64> |             |

##### Response Schema: application/json; charset=utf-8

Array

| Parameter              | Required | Type                     | Description                                                                                                 |
| ---------------------- | -------- | ------------------------ | ----------------------------------------------------------------------------------------------------------- |
| id                     | required | string                   | Unique ID of the order.                                                                                     |
| createdAt              | required | string <naive-date-time> | Time the order was created.                                                                                 |
| executedQuantity       | optional | string <decimal>         | Quantity of the order that has been filled.                                                                 |
| executedQuoteQuantity  | optional | string <decimal>         | Quantity of the order that has been filled in the quote asset.                                              |
| expiryReason           | optional | string                   | Order expiry reason.                                                                                        |
| orderType              | required | string                   | Type of order.                                                                                              |
| postOnly               | optional | boolean                  | Whether the order is post only or not.                                                                      |
| price                  | optional | string <decimal>         | Price that the order was submitted at (if orderType is Limit)                                               |
| quantity               | optional | string <decimal>         | Quantity of the order.                                                                                      |
| quoteQuantity          | optional | string <decimal>         | Quantity of the order in quote the quote asset.                                                             |
| selfTradePrevention    | required | string                   | Self trade prevention setting of the order. Default is RejectTaker.                                         |
| status                 | required | string                   | Status of the order.                                                                                        |
| side                   | required | string                   | Side of the order.                                                                                          |
| stopLossTriggerPrice   | optional | string                   | Stop loss price (price the stop loss order will be triggered at).                                           |
| stopLossLimitPrice     | optional | string <decimal>         | Stop loss limit price. If set the stop loss will be a limit order, otherwise it will be a market order.     |
| stopLossTriggerBy      | optional | string                   | Reference price that should trigger the stop loss order.                                                    |
| symbol                 | required | string                   | Market symbol of the order.                                                                                 |
| takeProfitTriggerPrice | optional | string                   | Take profit price (price the take profit order will be triggered at).                                       |
| takeProfitLimitPrice   | optional | string <decimal>         | Take profit limit price. If set the take profit will be a limit order, otherwise it will be a market order. |
| takeProfitTriggerBy    | optional | string                   | Reference price that should trigger the take profit order.                                                  |
| timeInForce            | required | string                   | Time in force of the order.                                                                                 |
| triggerBy              | optional | string                   | Reference price that should trigger the order.                                                              |
| triggerPrice           | optional | string                   | Price the order was set to trigger at.                                                                      |
| triggerQuantity        | optional | string                   | Trigger quantity.                                                                                           |
| clientId               | optional | integer <uint32>         | Custom order ID.                                                                                            |
| systemOrderType        | optional | string                   | The type of system order, if applicable.                                                                    |
| strategyId             | optional | string                   | Strategy ID of the order, if any.                                                                           |
| slippageTolerance      | optional | string <decimal>         | Slippage tolerance allowed for the order.                                                                   |
| slippageToleranceType  | optional | string                   | Slippage tolerance type                                                                                     |

**400**

Bad request.

**401**

Unauthorized.

**500**

Internal server error.

##### Response Schema: application/json; charset=utf-8

| Parameter | Required | Type   | Description |
| --------- | -------- | ------ | ----------- |
| code      | required | string |             |
| message   | required | string |             |
