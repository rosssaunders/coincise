# POST /api/v1/orders/test

**Source:** [/api/v1/orders/test](https://www.kucoin.com/docs/rest//api/v1/orders/test)

## Authentication

Required (Private Endpoint)

## Description

Add Order Test

Place order to the futures trading system just for validation

## Request Body

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| clientOid | required | string | Unique order id created by users to identify their orders, the maximum length cannot exceed 40, e.g. UUID, Only allows numbers, characters, underline(_), and separator(-) |
| side | required | string | specify if the order is to 'buy' or 'sell' |
| symbol | required | string | Symbol of the contract, Please refer to [Get Symbol endpoint: symbol](https://www.kucoin.com/docs-new/api-3470220)  |
| leverage | required | integer | Used to calculate the margin to be frozen for the order. If you are to close the position, this parameter is not required. |
| type | required | string | specify if the order is an 'limit' order or 'market' order |
| remark | optional | string | remark for the order, length cannot exceed 100 utf8 characters |
| stop | optional | string | Either 'down' or 'up'.  If stop is used,parameter stopPrice and stopPriceType also need to be provieded. |
| stopPriceType | optional | string | Either 'TP', 'IP' or 'MP', Need to be defined if stop is specified. |
| stopPrice | optional | string | Need to be defined if stop is specified.  |
| reduceOnly | optional | boolean | A mark to reduce the position size only. Set to false by default. Need to set the position size when reduceOnly is true. If set to true, only the orders reducing the position size will be executed. If the reduce-only order size exceeds the position size, the extra size will be canceled. |
| closeOrder | optional | boolean | A mark to close the position. Set to false by default. If closeOrder is set to true, the system will close the position and the position size will become 0. Side, Size and Leverage fields can be left empty and the system will determine the side and size automatically. |
| forceHold | optional | boolean | A mark to forcely hold the funds for an order, even though it's an order to reduce the position size. This helps the order stay on the order book and not get canceled when the position size changes. Set to false by default. The system will forcely freeze certain amount of funds for this order, including orders whose direction is opposite to the current positions. This feature is to ensure that the order won’t be canceled by the matching engine in such a circumstance that not enough funds are frozen for the order. |
| stp | optional | string | [Self Trade Prevention](https://www.kucoin.com/docs-new/doc-338146) is divided into these strategies: CN, CO, CB. Not supported DC at the moment. |
| marginMode | optional | string | Margin mode: ISOLATED, CROSS, default: ISOLATED |
| price | optional | string | Required for type is 'limit' order, indicating the operating price |
| size | optional | integer | **Choose one of size, qty, valueQty**, Order size (Lot), must be a positive integer. The quantity unit of coin-swap contracts is size(lot), and other units are not supported. |
| timeInForce | optional | string | Optional for type is 'limit' order, [Time in force](https://www.kucoin.com/docs-new/doc-338146) is a special strategy used during trading, default is GTC |
| postOnly | optional | boolean | Optional for type is 'limit' order,  post only flag, invalid when timeInForce is IOC. When postOnly is true, not allowed choose hidden or iceberg. The post-only flag ensures that the trader always pays the maker fee and provides liquidity to the order book. If any part of the order is going to pay taker fee, the order will be fully rejected. |
| hidden | optional | boolean | Optional for type is 'limit' order, orders not displaying in order book. When hidden chose, not allowed choose postOnly. |
| iceberg | optional | boolean | Optional for type is 'limit' order, Only visible portion of the order is displayed in the order book. When iceberg chose, not allowed choose postOnly. |
| visibleSize | optional | string | Optional for type is 'limit' order, The maximum visible size of an iceberg order. please place order in size (lots), The units of qty (base currency) and valueQty (value) are not supported. Need to be defined if iceberg is specified. |
| qty | optional | string | **Choose one of size, qty, valueQty**, Order size (Base currency) must be an integer multiple of the multiplier. The unit of the quantity of coin-swap is size(lot), which is not supported |
| valueQty | optional | string | **Choose one of size, qty, valueQty**, Order size (Value), USDS-Swap correspond to USDT or USDC. The unit of the quantity of coin-swap is size(lot), which is not supported |

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | object |  |

