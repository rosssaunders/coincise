# GET /api/v1/stop-order

**Source:**
[/api/v1/stop-order](https://www.kucoin.com/docs/rest//api/v1/stop-order)

## Authentication

Required (Private Endpoint)

## Description

Get Stop Orders List

This interface is to obtain all Spot active stop order lists

## Parameters

| Parameter   | Required | Type    | Description                                                                                                                 |
| ----------- | -------- | ------- | --------------------------------------------------------------------------------------------------------------------------- |
| symbol      | optional | string  | Only list orders for a specific symbol                                                                                      |
| side        | optional | string  | buy or sell                                                                                                                 |
| type        | optional | string  | limit, market                                                                                                               |
| tradeType   | optional | string  | The type of trading : TRADE（Spot）, MARGIN_TRADE (Cross Margin), MARGIN_ISOLATED_TRADE (Isolated Margin). Default is TRADE |
| startAt     | optional | integer | Start time (milisecond)                                                                                                     |
| endAt       | optional | integer | End time (milisecond)                                                                                                       |
| currentPage | optional | integer | Current page                                                                                                                |
|             |
| orderIds    | optional | string  | Comma seperated order ID list                                                                                               |
| pageSize    | optional | integer | Page size                                                                                                                   |
| stop        | optional | string  | Order type: stop: stop loss order, oco: oco order                                                                           |

## Responses

### 200

| Parameter                      | Required | Type    | Description                                                                                                |
| ------------------------------ | -------- | ------- | ---------------------------------------------------------------------------------------------------------- |
| code                           | required | string  |                                                                                                            |
| data                           | required | object  |                                                                                                            |
| data.currentPage               | required | integer | current page id                                                                                            |
| data.pageSize                  | required | integer |                                                                                                            |
| data.totalNum                  | required | integer | the stop order count                                                                                       |
| data.totalPage                 | required | integer | total page count of the list                                                                               |
| data.items                     | required | array   | the list of stop orders                                                                                    |
| data.items[].id                | required | string  | Order ID, the ID of an order.                                                                              |
| data.items[].symbol            | required | string  | Symbol name                                                                                                |
| data.items[].userId            | required | string  | User ID                                                                                                    |
| data.items[].status            | required | string  | Order status, include NEW, TRIGGERED                                                                       |
| data.items[].type              | required | string  | Order type                                                                                                 |
| data.items[].side              | required | string  | transaction direction,include buy and sell                                                                 |
| data.items[].price             | required | string  | order price                                                                                                |
| data.items[].size              | required | string  | order quantity                                                                                             |
| data.items[].funds             | optional | string  | order funds                                                                                                |
| data.items[].stp               | optional | string  |                                                                                                            |
| data.items[].timeInForce       | required | string  | time InForce,include GTC,GTT,IOC,FOK                                                                       |
| data.items[].cancelAfter       | required | integer | cancel orders after n seconds，requires timeInForce to be GTT                                              |
| data.items[].postOnly          | required | boolean | postOnly                                                                                                   |
| data.items[].hidden            | required | boolean | hidden order                                                                                               |
| data.items[].iceberg           | required | boolean | Iceberg order                                                                                              |
| data.items[].visibleSize       | optional | string  | displayed quantity for iceberg order                                                                       |
| data.items[].channel           | required | string  | order source                                                                                               |
| data.items[].clientOid         | required | string  | user-entered order unique mark                                                                             |
| data.items[].remark            | required | string  | Remarks at stop order creation                                                                             |
| data.items[].tags              | optional | string  | tag order source                                                                                           |
| data.items[].orderTime         | required | integer | Time of place a stop order, accurate to nanoseconds                                                        |
| data.items[].domainId          | required | string  | domainId, e.g: kucoin                                                                                      |
| data.items[].tradeSource       | required | string  | trade source: USER（Order by user）, MARGIN_SYSTEM（Order by margin system）                               |
| data.items[].tradeType         | required | string  | The type of trading : TRADE（Spot）, MARGIN_TRADE (Cross Margin), MARGIN_ISOLATED_TRADE (Isolated Margin). |
| data.items[].feeCurrency       | required | string  | The currency of the fee                                                                                    |
| data.items[].takerFeeRate      | required | string  | Fee Rate of taker                                                                                          |
| data.items[].makerFeeRate      | required | string  | Fee Rate of maker                                                                                          |
| data.items[].createdAt         | required | integer | order creation time                                                                                        |
| data.items[].stop              | required | string  | Stop order type, include loss and entry                                                                    |
| data.items[].stopTriggerTime   | optional | integer | The trigger time of the stop order                                                                         |
| data.items[].stopPrice         | required | string  | stop price                                                                                                 |
| data.items[].relatedNo         | optional | string  |                                                                                                            |
| data.items[].limitPrice        | optional | string  |                                                                                                            |
| data.items[].pop               | optional | string  |                                                                                                            |
| data.items[].activateCondition | optional | string  |                                                                                                            |
