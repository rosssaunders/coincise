# POST /api/v1/stop-order

**Source:**
[/api/v1/stop-order](https://www.kucoin.com/docs/rest//api/v1/stop-order)

## Authentication

Required (Private Endpoint)

## Description

Add Stop Order

Place stop order to the Spot trading system, you can place two major types of
orders: limit and market. Orders can only be placed if your account has
sufficient funds. Once an order is placed, your funds will be put on hold for
the duration of the order. The amount of funds on hold depends on the order type
and parameters specified.

## Request Body

| Parameter | Required | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| --------- | -------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| clientOid | optional | string | Client Order Id，The ClientOid field is a unique ID created by the user（we recommend using a UUID）, and can only contain numbers, letters, underscores （\_）, and hyphens （-）. This field is returned when order information is obtained. You can use clientOid to tag your orders. ClientOid is different from the order ID created by the service provider. Please do not initiate requests using the same clientOid. The maximum length for the ClientOid is 40 characters. |

Please remember the orderId created by the service provider, it used to check
for updates in order status. | | side | required | string | specify if the order
is to 'buy' or 'sell' | | symbol | required | string | symbol | | type |
required | string | specify if the order is an 'limit' order or 'market' order.

The type of order you specify when you place your order determines whether or
not you need to request other parameters and also affects the execution of the
matching engine.

When placing a limit order, you must specify a price and size. The system will
try to match the order according to market price or a price better than market
price. If the order cannot be immediately matched, it will stay in the order
book until it is matched or the user cancels.

Unlike limit orders, the price for market orders fluctuates with market prices.
When placing a market order, you do not need to specify a price, you only need
to specify a quantity. Market orders are filled immediately and will not enter
the order book. All market orders are takers and a taker fee will be charged. |
| remark | optional | string | Order placement remarks, length cannot exceed 20
characters (ASCII) | | stp | optional | string |
[Self Trade Prevention](https://www.kucoin.com/docs-new/doc-338146) is divided
into four strategies: CN, CO, CB , and DC | | price | optional | string |
Specify price for order, not need for market order.

When placing a limit order, the price must be based on priceIncrement for the
trading pair. The price increment (priceIncrement) is the price precision for
the trading pair. For example, for the BTC-USDT trading pair, the priceIncrement
is 0.00001000. So the price for your orders cannot be less than 0.00001000 and
must be a multiple of priceIncrement. Otherwise, the order will return an
invalid priceIncrement error. | | size | optional | string | Specify quantity
for order

When **type** is limit, size refers to the amount of trading targets (the asset
name written in front) for the trading pair. Teh Size must be based on the
baseIncrement of the trading pair. The baseIncrement represents the precision
for the trading pair. The size of an order must be a positive-integer multiple
of baseIncrement and must be between baseMinSize and baseMaxSize.

When **type** is market, select one out of two: size or funds | | timeInForce |
optional | string | [Time in force](https://www.kucoin.com/docs-new/doc-338146)
is a special strategy used during trading. Required for limit orders. | |
postOnly | optional | boolean | passive order labels, this is disabled when the
order timing strategy is IOC or FOK if **type** is limit. | | hidden | optional
| boolean | [Hidden order](https://www.kucoin.com/docs-new/doc-338146) or not
(not shown in order book) | | iceberg | optional | boolean | Whether or not only
visible portions of orders are shown in
[Iceberg orders](https://www.kucoin.com/docs-new/doc-338146) | | visibleSize |
optional | string | When **type** is limit, this is Maximum visible quantity in
iceberg orders. | | cancelAfter | optional | integer | Cancel after n seconds,
the order timing strategy is GTT, -1 means it will not be cancelled
automatically, the default value is -1 | | funds | optional | string | When
**type** is market, select one out of two: size or funds | | stopPrice |
required | string | The trigger price. | | tradeType | optional | string | The
type of trading : TRADE（Spot）, MARGIN_TRADE (Cross Margin),
MARGIN_ISOLATED_TRADE (Isolated Margin). Default is TRADE |

## Responses

### 200

| Parameter    | Required | Type   | Description                                                                                                                  |
| ------------ | -------- | ------ | ---------------------------------------------------------------------------------------------------------------------------- |
| code         | required | string |                                                                                                                              |
| data         | required | object |                                                                                                                              |
| data.orderId | required | string | The unique order id generated by the trading system,which can be used later for further actions such as canceling the order. |
