# POST /api/v1/hf/orders/multi/sync

**Source:**
[/api/v1/hf/orders/multi/sync](https://www.kucoin.com/docs/rest//api/v1/hf/orders/multi/sync)

## Authentication

Required (Private Endpoint)

## Description

Batch Add Orders Sync

This endpoint supports sequential batch order placement from a single endpoint.
A maximum of 5 orders can be placed simultaneously. The order types must be
limit orders of the same trading pair

## Request Body

| Parameter               | Required | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ----------------------- | -------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| orderList               | required | array  | Order List                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| orderList[].clientOid   | optional | string | Client Order ID: The ClientOid field is a unique ID created by the user (we recommend using a UUID), and can only contain numbers, letters, underscores (\_), and hyphens (-). This field is returned when order information is obtained. You can use clientOid to tag your orders. ClientOid is different from the order ID created by the service provider. Please do not initiate requests using the same clientOid. The maximum length for the ClientOid is 40 characters. |
|                         |
| orderList[].symbol      | required | string | symbol                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| orderList[].type        | required | string | Specify if the order is a 'limit' order or 'market' order.                                                                                                                                                                                                                                                                                                                                                                                                                     |
| orderList[].timeInForce | optional | string | [Time in force](https://www.kucoin.com/docs-new/doc-338146) is a special strategy used during trading                                                                                                                                                                                                                                                                                                                                                                          |
| orderList[].side        | required | string | Specify if the order is to 'buy' or 'sell'.                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| orderList[].price       | required | string | Specify price for order                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| orderList[].size        | optional | string | Specify quantity for order.                                                                                                                                                                                                                                                                                                                                                                                                                                                    |

When **type** is limited, select one out of two: size or funds. Size refers to
the amount of trading targets (the asset name written in front) for the trading
pair. The Size must be based on the baseIncrement of the trading pair. The
baseIncrement represents the precision for the trading pair. The size of an
order must be a positive-integer multiple of baseIncrement and must be between
baseMinSize and baseMaxSize.

When **type** is market, select one out of two: size or funds | |
orderList[].stp | optional | string |
[Self Trade Prevention](https://www.kucoin.com/docs-new/doc-338146) is divided
into four strategies: CN, CO, CB , and DC | | orderList[].cancelAfter | optional
| integer | Cancel after n seconds, the order timing strategy is GTT, -1 means
it will not be cancelled automatically, the default value is -1 | |
orderList[].postOnly | optional | boolean | passive order labels, this is
disabled when the order timing strategy is IOC or FOK | | orderList[].hidden |
optional | boolean | [Hidden order](https://www.kucoin.com/docs-new/doc-338146)
or not (not shown in order book) | | orderList[].iceberg | optional | boolean |
Whether or not only visible portions of orders are shown in
[Iceberg orders](https://www.kucoin.com/docs-new/doc-338146) | |
orderList[].visibleSize | optional | string | Maximum visible quantity in
iceberg orders | | orderList[].tags | optional | string | Order tag, length
cannot exceed 20 characters (ASCII) | | orderList[].remark | optional | string |
Order placement remarks, length cannot exceed 20 characters (ASCII) | |
orderList[].funds | optional | string | When **type** is market, select one out
of two: size or funds | | orderList[].allowMaxTimeWindow | optional | integer |
Order failed after timeout of specified milliseconds, If clientTimestamp +
allowMaxTimeWindow < Gateway received the message time, this order will fail. |
| orderList[].clientTimestamp | optional | integer | Equal to KC-API-TIMESTAMP.
Needs to be defined if allowMaxTimeWindow is specified. |

## Responses

### 200

| Parameter           | Required | Type    | Description                                                                                                                   |
| ------------------- | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------- |
| code                | required | string  |                                                                                                                               |
| data                | required | array   |                                                                                                                               |
| data[].orderId      | optional | string  | The unique order ID generated by the trading system, which can be used later for further actions such as canceling the order. |
| data[].clientOid    | optional | string  | The user self-defined order ID.                                                                                               |
| data[].orderTime    | optional | integer |                                                                                                                               |
| data[].originSize   | optional | string  | Original order size                                                                                                           |
| data[].dealSize     | optional | string  | Deal size                                                                                                                     |
| data[].remainSize   | optional | string  | Remain size                                                                                                                   |
| data[].canceledSize | optional | string  | Cumulative canceled size                                                                                                      |
| data[].status       | optional | string  | Order Status. open: order is active; done: order has been completed                                                           |
| data[].matchTime    | optional | integer |                                                                                                                               |
| data[].success      | required | boolean | Add order success/failure                                                                                                     |
| data[].failMsg      | optional | string  | Error message                                                                                                                 |
