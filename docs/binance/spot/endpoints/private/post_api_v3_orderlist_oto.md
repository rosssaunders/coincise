## New Order list - OTO (TRADE)​

```
POST /api/v3/orderList/oto
```

Place an OTO.

- An OTO (One-Triggers-the-Other) is an order list comprised of 2 orders.
- The first order is called the **working order** and must be `LIMIT` or
  `LIMIT_MAKER`. Initially, only the working order goes on the order book.
- The second order is called the **pending order**. It can be any order type
  except for `MARKET` orders using parameter `quoteOrderQty`. The pending order
  is only placed on the order book when the working order gets **fully filled**.
- If either the working order or the pending order is cancelled individually,
  the other order in the order list will also be canceled or expired.
- When the order list is placed, if the working order gets **immediately fully
  filled**, the placement response will show the working order as `FILLED` but
  the pending order will still appear as `PENDING_NEW`. You need to query the
  status of the pending order again to see its updated status.
- OTOs add **2 orders** to the `EXCHANGE_MAX_NUM_ORDERS` filter and
  `MAX_NUM_ORDERS` filter.

**Weight:** 1

**Unfilled Order Count:** 2

**Parameters:**

| Name              | Type   | Mandatory | Description                                                                      |
| ----------------- | ------ | --------- | -------------------------------------------------------------------------------- |
| symbol            | STRING | YES       |                                                                                  |
| listClientOrderId | STRING | NO        | Arbitrary unique ID among open order lists. Automatically generated if not sent. |

A new order list with the same listClientOrderId is accepted only when the
previous one is filled or completely expired.  
`listClientOrderId` is distinct from the `workingClientOrderId` and the
`pendingClientOrderId`. | | newOrderRespType | ENUM | NO | Format of the JSON
response. Supported values:
[Order Response Type](/docs/binance-spot-api-docs/enums#orderresponsetype) | |
selfTradePreventionMode | ENUM | NO | The allowed values are dependent on what
is configured on the symbol. Supported values:
[STP Modes](/docs/binance-spot-api-docs/enums#stpmodes) | | workingType | ENUM |
YES | Supported values: `LIMIT`,`LIMIT_MAKER` | | workingSide | ENUM | YES |
Supported values: [Order Side](/docs/binance-spot-api-docs/enums#side) | |
workingClientOrderId | STRING | NO | Arbitrary unique ID among open orders for
the working order.  
Automatically generated if not sent. | | workingPrice | DECIMAL | YES | | |
workingQuantity | DECIMAL | YES | Sets the quantity for the working order. | |
workingIcebergQty | DECIMAL | NO | This can only be used if `workingTimeInForce`
is `GTC`, or if `workingType` is `LIMIT_MAKER`. | | workingTimeInForce | ENUM |
NO | Supported values:
[Time In Force](/docs/binance-spot-api-docs/enums#timeinforce) | |
workingStrategyId | LONG | NO | Arbitrary numeric value identifying the working
order within an order strategy. | | workingStrategyType | INT | NO | Arbitrary
numeric value identifying the working order strategy.  
Values smaller than 1000000 are reserved and cannot be used. | |
workingPegPriceType | ENUM | NO | See
[Pegged Orders](/docs/binance-spot-api-docs/rest-api/trading-endpoints#pegged-orders-info)
| | workingPegOffsetType | ENUM | NO | | | workingPegOffsetValue | INT | NO | |
| pendingType | ENUM | YES | Supported values:
[Order Types](/docs/binance-spot-api-docs/rest-api/trading-endpoints#order-type)  
Note
that `MARKET` orders using `quoteOrderQty` are not supported. | | pendingSide |
ENUM | YES | Supported values:
[Order Side](/docs/binance-spot-api-docs/enums#side) | | pendingClientOrderId |
STRING | NO | Arbitrary unique ID among open orders for the pending order.  
Automatically generated if not sent. | | pendingPrice | DECIMAL | NO | | |
pendingStopPrice | DECIMAL | NO | | | pendingTrailingDelta | DECIMAL | NO | | |
pendingQuantity | DECIMAL | YES | Sets the quantity for the pending order. | |
pendingIcebergQty | DECIMAL | NO | This can only be used if `pendingTimeInForce`
is `GTC` or if `pendingType` is `LIMIT_MAKER`. | | pendingTimeInForce | ENUM |
NO | Supported values:
[Time In Force](/docs/binance-spot-api-docs/enums#timeinforce) | |
pendingStrategyId | LONG | NO | Arbitrary numeric value identifying the pending
order within an order strategy. | | pendingStrategyType | INT | NO | Arbitrary
numeric value identifying the pending order strategy.  
Values smaller than 1000000 are reserved and cannot be used. | |
pendingPegPriceType | ENUM | NO | See
[Pegged Orders](/docs/binance-spot-api-docs/rest-api/trading-endpoints#pegged-orders-info)
| | pendingPegOffsetType | ENUM | NO | | | pendingPegOffsetValue | INT | NO | |
| recvWindow | DECIMAL | NO | The value cannot be greater than `60000`.  
Supports up to three decimal places of precision (e.g., 6000.346) so that
microseconds may be specified. | | timestamp | LONG | YES | |

**Mandatory parameters based on `pendingType` or `workingType`**

Depending on the `pendingType` or `workingType`, some optional parameters will
become mandatory.

| Type                                                     | Additional mandatory parameters                                                        | Additional information |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------- | ---------------------- |
| `workingType` = `LIMIT`                                  | `workingTimeInForce`                                                                   |                        |
| `pendingType` = `LIMIT`                                  | `pendingPrice`, `pendingTimeInForce`                                                   |                        |
| `pendingType` = `STOP_LOSS` or `TAKE_PROFIT`             | `pendingStopPrice` and/or `pendingTrailingDelta`                                       |                        |
| `pendingType` = `STOP_LOSS_LIMIT` or `TAKE_PROFIT_LIMIT` | `pendingPrice`, `pendingStopPrice` and/or `pendingTrailingDelta`, `pendingTimeInForce` |                        |

**Data Source:**

Matching Engine

**Response:**

```
{    "orderListId": 0,    "contingencyType": "OTO",    "listStatusType": "EXEC_STARTED",    "listOrderStatus": "EXECUTING",    "listClientOrderId": "yl2ERtcar1o25zcWtqVBTC",    "transactionTime": 1712289389158,    "symbol": "LTCBTC",    "orders": [        {            "symbol": "LTCBTC",            "orderId": 4,            "clientOrderId": "Bq17mn9fP6vyCn75Jw1xya"        },        {            "symbol": "LTCBTC",            "orderId": 5,            "clientOrderId": "arLFo0zGJVDE69cvGBaU0d"        }    ],    "orderReports": [        {            "symbol": "LTCBTC",            "orderId": 4,            "orderListId": 0,            "clientOrderId": "Bq17mn9fP6vyCn75Jw1xya",            "transactTime": 1712289389158,            "price": "1.00000000",            "origQty": "1.00000000",            "executedQty": "0.00000000",            "origQuoteOrderQty": "0.000000",            "cummulativeQuoteQty": "0.00000000",            "status": "NEW",            "timeInForce": "GTC",            "type": "LIMIT",            "side": "SELL",            "workingTime": 1712289389158,            "selfTradePreventionMode": "NONE"        },        {            "symbol": "LTCBTC",            "orderId": 5,            "orderListId": 0,            "clientOrderId": "arLFo0zGJVDE69cvGBaU0d",            "transactTime": 1712289389158,            "price": "0.00000000",            "origQty": "5.00000000",            "executedQty": "0.00000000",            "origQuoteOrderQty": "0.000000",            "cummulativeQuoteQty": "0.00000000",            "status": "PENDING_NEW",            "timeInForce": "GTC",            "type": "MARKET",            "side": "BUY",            "workingTime": -1,            "selfTradePreventionMode": "NONE"        }    ]}
```

**Note:** The payload above does not show all fields that can appear. Please
refer to
[Conditional fields in Order Responses](/docs/binance-spot-api-docs/rest-api/trading-endpoints#conditional-fields-in-order-responses).

> Source:
> [https://developers.binance.com/docs/binance-spot-api-docs/rest-api/trading-endpoints](https://developers.binance.com/docs/binance-spot-api-docs/rest-api/trading-endpoints)
