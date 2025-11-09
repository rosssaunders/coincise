# GET /api/v1/stop-order/queryOrderByClientOid

**Source:** [/api/v1/stop-order/queryOrderByClientOid](https://www.kucoin.com/docs/rest//api/v1/stop-order/queryOrderByClientOid)

## Authentication

Required (Private Endpoint)

## Description

Get Stop Order By ClientOid

This interface is to obtain Spot stop order details by orderId

## Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| clientOid | required | string | The client order id |
| symbol | optional | string | symbol name |

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string | the return code |
| data | required | array | the return code |
| data[].id | optional | string | Order ID, the ID of an order. |
| data[].symbol | optional | string | Symbol name |
| data[].userId | optional | string | User ID |
| data[].status | optional | string | Order status, include NEW, TRIGGERED |
| data[].type | optional | string | Order type |
| data[].side | optional | string | transaction direction,include buy and sell |
| data[].price | optional | string | order price |
| data[].size | optional | string | order quantity |
| data[].funds | optional | string | order funds |
| data[].stp | optional | string |  |
| data[].timeInForce | optional | string | time InForce,include GTC,GTT,IOC,FOK |
| data[].cancelAfter | optional | integer | cancel orders after n seconds，requires timeInForce to be GTT |
| data[].postOnly | optional | boolean | postOnly |
| data[].hidden | optional | boolean | hidden order |
| data[].iceberg | optional | boolean | Iceberg order |
| data[].visibleSize | optional | string | displayed quantity for iceberg order |
| data[].channel | optional | string | order source |
| data[].clientOid | optional | string | user-entered order unique mark |
| data[].remark | optional | string | Remarks at stop order creation |
| data[].tags | optional | string | tag order source |
| data[].domainId | optional | string | domainId, e.g: kucoin |
| data[].tradeSource | optional | string | trade source: USER（Order by user）, MARGIN_SYSTEM（Order by margin system） |
| data[].tradeType | optional | string | The type of trading : TRADE（Spot）, MARGIN_TRADE (Cross Margin), MARGIN_ISOLATED_TRADE (Isolated Margin). |
| data[].feeCurrency | optional | string | The currency of the fee |
| data[].takerFeeRate | optional | string | Fee Rate of taker |
| data[].makerFeeRate | optional | string | Fee Rate of maker |
| data[].createdAt | optional | integer | order creation time |
| data[].stop | optional | string | Stop order type, include loss and entry |
| data[].stopTriggerTime | optional | integer | The trigger time of the stop order |
| data[].stopPrice | optional | string | stop price |
| data[].orderTime | optional | integer | Time of place a stop order, accurate to nanoseconds |

