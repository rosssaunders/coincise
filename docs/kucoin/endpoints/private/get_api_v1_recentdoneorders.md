# GET /api/v1/recentDoneOrders

**Source:**
[/api/v1/recentDoneOrders](https://www.kucoin.com/docs/rest//api/v1/recentDoneOrders)

## Authentication

Required (Private Endpoint)

## Description

Get Recent Closed Orders

Get a list of recent 1000 closed orders in the last 24 hours. If you need to get
your recent traded order history with low latency, you may query this endpoint.

## Parameters

| Parameter | Required | Type   | Description                                                                                                        |
| --------- | -------- | ------ | ------------------------------------------------------------------------------------------------------------------ |
| symbol    | optional | string | Symbol of the contract, Please refer to [Get Symbol endpoint: symbol](https://www.kucoin.com/docs-new/api-3470220) |

## Responses

### 200

| Parameter             | Required | Type    | Description                                                                                                                                                                                                                                                                |
| --------------------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| code                  | required | string  |                                                                                                                                                                                                                                                                            |
| data                  | required | array   |                                                                                                                                                                                                                                                                            |
| data[].id             | required | string  | Order ID                                                                                                                                                                                                                                                                   |
| data[].symbol         | required | string  | Symbol of the contract, Please refer to [Get Symbol endpoint: symbol](https://www.kucoin.com/docs-new/api-3470220)                                                                                                                                                         |
| data[].type           | required | string  | Order type, market order or limit order                                                                                                                                                                                                                                    |
| data[].side           | required | string  | Transaction side                                                                                                                                                                                                                                                           |
| data[].price          | required | string  | Order price                                                                                                                                                                                                                                                                |
| data[].size           | required | integer | Order quantity                                                                                                                                                                                                                                                             |
| data[].value          | required | string  | Order value                                                                                                                                                                                                                                                                |
|                       |
| data[].dealValue      | required | string  | Executed size of funds                                                                                                                                                                                                                                                     |
|                       |
| data[].dealSize       | required | integer | Executed quantity                                                                                                                                                                                                                                                          |
|                       |
| data[].stp            | required | string  | self trade prevention                                                                                                                                                                                                                                                      |
| data[].stop           | required | string  | A mark to the stop order type                                                                                                                                                                                                                                              |
| data[].stopPriceType  | required | string  | Trigger price type of stop orders                                                                                                                                                                                                                                          |
| data[].stopTriggered  | required | boolean | Mark to show whether the stop order is triggered                                                                                                                                                                                                                           |
| data[].stopPrice      | required | integer | Trigger price of stop orders                                                                                                                                                                                                                                               |
|                       |
| data[].timeInForce    | required | string  | Time in force policy type                                                                                                                                                                                                                                                  |
|                       |
| data[].postOnly       | required | boolean | Mark of post only                                                                                                                                                                                                                                                          |
|                       |
| data[].hidden         | required | boolean | Mark of the hidden order                                                                                                                                                                                                                                                   |
|                       |
| data[].iceberg        | required | boolean | Mark of the iceberg order                                                                                                                                                                                                                                                  |
|                       |
| data[].leverage       | required | string  | Leverage of the order                                                                                                                                                                                                                                                      |
|                       |
| data[].forceHold      | required | boolean | A mark to forcely hold the funds for an order                                                                                                                                                                                                                              |
|                       |
| data[].closeOrder     | required | boolean | A mark to close the position                                                                                                                                                                                                                                               |
|                       |
| data[].visibleSize    | required | integer | Visible size of the iceberg order                                                                                                                                                                                                                                          |
|                       |
| data[].clientOid      | required | string  | Unique order id created by users to identify their orders                                                                                                                                                                                                                  |
|                       |
| data[].remark         | required | string  | Remark of the order                                                                                                                                                                                                                                                        |
|                       |
| data[].tags           | required | string  | tag order source                                                                                                                                                                                                                                                           |
|                       |
| data[].isActive       | required | boolean | Mark of the active orders                                                                                                                                                                                                                                                  |
|                       |
| data[].cancelExist    | required | boolean | Mark of the canceled orders                                                                                                                                                                                                                                                |
|                       |
| data[].createdAt      | required | integer | Time the order created                                                                                                                                                                                                                                                     |
|                       |
| data[].updatedAt      | required | integer | last update time                                                                                                                                                                                                                                                           |
|                       |
| data[].endAt          | required | integer | End time                                                                                                                                                                                                                                                                   |
|                       |
| data[].orderTime      | required | integer | Order create time in nanosecond                                                                                                                                                                                                                                            |
|                       |
| data[].settleCurrency | required | string  | settlement currency                                                                                                                                                                                                                                                        |
|                       |
| data[].marginMode     | required | string  | Margin mode: ISOLATED (isolated), CROSS (cross margin).                                                                                                                                                                                                                    |
|                       |
| data[].avgDealPrice   | required | string  | Average transaction price, forward contract average transaction price = sum (transaction value) / sum (transaction quantity), reverse contract average transaction price = sum (transaction quantity) / sum (transaction value). Transaction quantity = lots \* multiplier |
|                       |
| data[].filledSize     | required | integer | Value of the executed orders                                                                                                                                                                                                                                               |
|                       |
| data[].filledValue    | required | string  | Executed order quantity                                                                                                                                                                                                                                                    |
|                       |
| data[].status         | required | string  | order status: “open” or “done”                                                                                                                                                                                                                                             |
|                       |
| data[].reduceOnly     | required | boolean | A mark to reduce the position size only                                                                                                                                                                                                                                    |
|                       |
