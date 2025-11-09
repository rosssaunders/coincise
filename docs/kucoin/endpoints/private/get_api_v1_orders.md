# GET /api/v1/orders

**Source:** [/api/v1/orders](https://www.kucoin.com/docs/rest//api/v1/orders)

## Authentication

Required (Private Endpoint)

## Description

Get Order List

List your current orders.

## Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| status | optional | string | active or done, done as default. Only list orders for a specific status |
| symbol | optional | string | Symbol of the contract, Please refer to [Get Symbol endpoint: symbol](https://www.kucoin.com/docs-new/api-3470220)  |
| side | optional | string | buy or sell |
| type | optional | string | Order Type |
| startAt | optional | integer | Start time (milisecond) |
| endAt | optional | integer | End time (milisecond) |
| currentPage | optional | integer | Current request page, The default currentPage is 1 |
| pageSize | optional | integer | pageSize, The default pageSize is 50, The maximum cannot exceed 1000 |

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | object |  |
| data.currentPage | required | integer | Current request page, The default currentPage is 1 |
| data.pageSize | required | integer | pageSize, The default pageSize is 50, The maximum cannot exceed 1000 |
| data.totalNum | required | integer |  |
| data.totalPage | required | integer |  |
| data.items | required | array |  |
| data.items[].id | required | string | Order ID |
| data.items[].symbol | required | string | Symbol of the contract, Please refer to [Get Symbol endpoint: symbol](https://www.kucoin.com/docs-new/api-3470220)  |
| data.items[].type | required | string | Order type, market order or limit order
 |
| data.items[].side | required | string | Transaction side |
| data.items[].price | required | string | Order price |
| data.items[].size | required | integer | Order quantity |
| data.items[].value | required | string | Order value |
| data.items[].dealValue | required | string | Executed size of funds
 |
| data.items[].dealSize | required | integer | Executed quantity |
| data.items[].stp | required | string | self trade prevention |
| data.items[].stop | required | string | A mark to the stop order type |
| data.items[].stopPriceType | required | string | Trigger price type of stop orders |
| data.items[].stopTriggered | required | boolean | Mark to show whether the stop order is triggered |
| data.items[].stopPrice | required | integer | Trigger price of stop orders |
| data.items[].timeInForce | required | string | Time in force policy type |
| data.items[].postOnly | required | boolean | Mark of post only |
| data.items[].hidden | required | boolean | Mark of the hidden order |
| data.items[].iceberg | required | boolean | Mark of the iceberg order |
| data.items[].leverage | required | string | Leverage of the order |
| data.items[].forceHold | required | boolean | A mark to forcely hold the funds for an order |
| data.items[].closeOrder | required | boolean | A mark to close the position |
| data.items[].visibleSize | required | integer | Visible size of the iceberg order |
| data.items[].clientOid | required | string | Unique order id created by users to identify their orders |
| data.items[].remark | required | string | Remark of the order |
| data.items[].tags | required | string | tag order source |
| data.items[].isActive | required | boolean | Mark of the active orders |
| data.items[].cancelExist | required | boolean | Mark of the canceled orders |
| data.items[].createdAt | required | integer | Time the order created |
| data.items[].updatedAt | required | integer | last update time |
| data.items[].endAt | required | integer | End time |
| data.items[].orderTime | required | integer | Order create time in nanosecond |
| data.items[].settleCurrency | required | string | settlement currency |
| data.items[].marginMode | required | string | Margin mode: ISOLATED (isolated), CROSS (cross margin). |
| data.items[].avgDealPrice | required | string | Average transaction price, forward contract average transaction price = sum (transaction value) / sum (transaction quantity), reverse contract average transaction price = sum (transaction quantity) / sum (transaction value). Transaction quantity = lots * multiplier |
| data.items[].status | required | string | order status: “open” or “done” |
| data.items[].filledSize | required | integer | Value of the executed orders |
| data.items[].filledValue | required | string | Executed order quantity |
| data.items[].reduceOnly | required | boolean | A mark to reduce the position size only |

