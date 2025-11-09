## New Order list - OTOCO (TRADE)​

```
POST /api/v3/orderList/otoco
```

Place an OTOCO.

- An OTOCO (One-Triggers-One-Cancels-the-Other) is an order list comprised of 3
  orders.
- The first order is called the **working order** and must be `LIMIT` or
  `LIMIT_MAKER`. Initially, only the working order goes on the order book.
  - The behavior of the working order is the same as the
    [OTO](/docs/binance-spot-api-docs/rest-api/trading-endpoints#new-order-list---oto-trade).
- OTOCO has 2 pending orders (pending above and pending below), forming an OCO
  pair. The pending orders are only placed on the order book when the working
  order gets **fully filled**.
  - The rules of the pending above and pending below follow the same rules as
    the
    [Order list OCO](/docs/binance-spot-api-docs/rest-api/trading-endpoints#new-order-list---oco-trade).
- OTOCOs add **3 orders** to the `EXCHANGE_MAX_NUM_ORDERS` filter and
  `MAX_NUM_ORDERS` filter.

**Weight:** 1

**Unfilled Order Count:** 3

**Parameters:**

| Name              | Type   | Mandatory | Description                                                                      |
| ----------------- | ------ | --------- | -------------------------------------------------------------------------------- |
| symbol            | STRING | YES       |                                                                                  |
| listClientOrderId | STRING | NO        | Arbitrary unique ID among open order lists. Automatically generated if not sent. |

A new order list with the same listClientOrderId is accepted only when the
previous one is filled or completely expired.  
`listClientOrderId` is distinct from the `workingClientOrderId`,
`pendingAboveClientOrderId`, and the `pendingBelowClientOrderId`. | |
newOrderRespType | ENUM | NO | Format of the JSON response. Supported values:
[Order Response Type](/docs/binance-spot-api-docs/enums#orderresponsetype) | |
selfTradePreventionMode | ENUM | NO | The allowed values are dependent on what
is configured on the symbol. Supported values:
[STP Modes](/docs/binance-spot-api-docs/enums#stpmodes) | | workingType | ENUM |
YES | Supported values: `LIMIT`, `LIMIT_MAKER` | | workingSide | ENUM | YES |
Supported values: [Order side](/docs/binance-spot-api-docs/enums#side) | |
workingClientOrderId | STRING | NO | Arbitrary unique ID among open orders for
the working order.  
Automatically generated if not sent. | | workingPrice | DECIMAL | YES | | |
workingQuantity | DECIMAL | YES | | | workingIcebergQty | DECIMAL | NO | This
can only be used if `workingTimeInForce` is `GTC`. | | workingTimeInForce | ENUM
| NO | Supported values:
[Time In Force](/docs/binance-spot-api-docs/enums#timeinforce) | |
workingStrategyId | LONG | NO | Arbitrary numeric value identifying the working
order within an order strategy. | | workingStrategyType | INT | NO | Arbitrary
numeric value identifying the working order strategy.  
Values smaller than 1000000 are reserved and cannot be used. | |
workingPegPriceType | ENUM | NO | See
[Pegged Orders](/docs/binance-spot-api-docs/rest-api/trading-endpoints#pegged-orders-info)
| | workingPegOffsetType | ENUM | NO | | | workingPegOffsetValue | INT | NO | |
| pendingSide | ENUM | YES | Supported values:
[Order side](/docs/binance-spot-api-docs/enums#side) | | pendingQuantity |
DECIMAL | YES | | | pendingAboveType | ENUM | YES | Supported values:
`STOP_LOSS_LIMIT`, `STOP_LOSS`, `LIMIT_MAKER`, `TAKE_PROFIT`,
`TAKE_PROFIT_LIMIT` | | pendingAboveClientOrderId | STRING | NO | Arbitrary
unique ID among open orders for the pending above order.  
Automatically generated if not sent. | | pendingAbovePrice | DECIMAL | NO | Can
be used if `pendingAboveType` is `STOP_LOSS_LIMIT` , `LIMIT_MAKER`, or
`TAKE_PROFIT_LIMIT` to specify the limit price. | | pendingAboveStopPrice |
DECIMAL | NO | Can be used if `pendingAboveType` is `STOP_LOSS`,
`STOP_LOSS_LIMIT`, `TAKE_PROFIT`, `TAKE_PROFIT_LIMIT` | |
pendingAboveTrailingDelta | DECIMAL | NO | See
[Trailing Stop FAQ](/docs/binance-spot-api-docs/faqs/trailing-stop-faq) | |
pendingAboveIcebergQty | DECIMAL | NO | This can only be used if
`pendingAboveTimeInForce` is `GTC` or if `pendingAboveType` is `LIMIT_MAKER`. |
| pendingAboveTimeInForce | ENUM | NO | | | pendingAboveStrategyId | LONG | NO |
Arbitrary numeric value identifying the pending above order within an order
strategy. | | pendingAboveStrategyType | INT | NO | Arbitrary numeric value
identifying the pending above order strategy.  
Values smaller than 1000000 are reserved and cannot be used. | |
pendingAbovePegPriceType | ENUM | NO | See
[Pegged Orders](/docs/binance-spot-api-docs/rest-api/trading-endpoints#pegged-orders-info)
| | pendingAbovePegOffsetType | ENUM | NO | | | pendingAbovePegOffsetValue | INT
| NO | | | pendingBelowType | ENUM | NO | Supported values: `STOP_LOSS`,
`STOP_LOSS_LIMIT`, `TAKE_PROFIT`,`TAKE_PROFIT_LIMIT` | |
pendingBelowClientOrderId | STRING | NO | Arbitrary unique ID among open orders
for the pending below order.  
Automatically generated if not sent. | | pendingBelowPrice | DECIMAL | NO | Can
be used if `pendingBelowType` is `STOP_LOSS_LIMIT` or `TAKE_PROFIT_LIMIT` to
specify limit price | | pendingBelowStopPrice | DECIMAL | NO | Can be used if
`pendingBelowType` is `STOP_LOSS`,
`STOP_LOSS_LIMIT, TAKE_PROFIT or TAKE_PROFIT_LIMIT`.  
Either `pendingBelowStopPrice` or `pendingBelowTrailingDelta` or both, must be
specified. | | pendingBelowTrailingDelta | DECIMAL | NO | | |
pendingBelowIcebergQty | DECIMAL | NO | This can only be used if
`pendingBelowTimeInForce` is `GTC`, or if `pendingBelowType` is `LIMIT_MAKER`. |
| pendingBelowTimeInForce | ENUM | NO | Supported values:
[Time In Force](/docs/binance-spot-api-docs/enums#timeinforce) | |
pendingBelowStrategyId | LONG | NO | Arbitrary numeric value identifying the
pending below order within an order strategy. | | pendingBelowStrategyType | INT
| NO | Arbitrary numeric value identifying the pending below order strategy.  
Values smaller than 1000000 are reserved and cannot be used. | |
pendingBelowPegPriceType | ENUM | NO | See
[Pegged Orders](/docs/binance-spot-api-docs/rest-api/trading-endpoints#pegged-orders-info)
| | pendingBelowPegOffsetType | ENUM | NO | | | pendingBelowPegOffsetValue | INT
| NO | | | recvWindow | DECIMAL | NO | The value cannot be greater than
`60000`.  
Supports up to three decimal places of precision (e.g., 6000.346) so that
microseconds may be specified. | | timestamp | LONG | YES | |

**Mandatory parameters based on `pendingAboveType`, `pendingBelowType` or
`workingType`**

Depending on the `pendingAboveType`/`pendingBelowType` or `workingType`, some
optional parameters will become mandatory.

| Type                                                 | Additional mandatory parameters                                                                            | Additional information |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------- |
| `workingType` = `LIMIT`                              | `workingTimeInForce`                                                                                       |                        |
| `pendingAboveType`\= `LIMIT_MAKER`                   | `pendingAbovePrice`                                                                                        |                        |
| `pendingAboveType` = `STOP_LOSS/TAKE_PROFIT`         | `pendingAboveStopPrice` and/or `pendingAboveTrailingDelta`                                                 |                        |
| `pendingAboveType=STOP_LOSS_LIMIT/TAKE_PROFIT_LIMIT` | `pendingAbovePrice`, `pendingAboveStopPrice` and/or `pendingAboveTrailingDelta`, `pendingAboveTimeInForce` |                        |
| `pendingBelowType`\= `LIMIT_MAKER`                   | `pendingBelowPrice`                                                                                        |                        |
| `pendingBelowType= STOP_LOSS/TAKE_PROFIT`            | `pendingBelowStopPrice` and/or `pendingBelowTrailingDelta`                                                 |                        |
| `pendingBelowType=STOP_LOSS_LIMIT/TAKE_PROFIT_LIMIT` | `pendingBelowPrice`, `pendingBelowStopPrice` and/or `pendingBelowTrailingDelta`, `pendingBelowTimeInForce` |                        |

**Data Source:**

Matching Engine

**Response:**

```
{    "orderListId": 1,    "contingencyType": "OTO",    "listStatusType": "EXEC_STARTED",    "listOrderStatus": "EXECUTING",    "listClientOrderId": "RumwQpBaDctlUu5jyG5rs0",    "transactionTime": 1712291372842,    "symbol": "LTCBTC",    "orders": [        {            "symbol": "LTCBTC",            "orderId": 6,            "clientOrderId": "fM9Y4m23IFJVCQmIrlUmMK"        },        {            "symbol": "LTCBTC",            "orderId": 7,            "clientOrderId": "6pcQbFIzTXGZQ1e2MkGDq4"        },        {            "symbol": "LTCBTC",            "orderId": 8,            "clientOrderId": "r4JMv9cwAYYUwwBZfbussx"        }    ],    "orderReports": [        {            "symbol": "LTCBTC",            "orderId": 6,            "orderListId": 1,            "clientOrderId": "fM9Y4m23IFJVCQmIrlUmMK",            "transactTime": 1712291372842,            "price": "1.00000000",            "origQty": "1.00000000",            "executedQty": "0.00000000",            "origQuoteOrderQty": "0.000000",            "cummulativeQuoteQty": "0.00000000",            "status": "NEW",            "timeInForce": "GTC",            "type": "LIMIT",            "side": "SELL",            "workingTime": 1712291372842,            "selfTradePreventionMode": "NONE"        },        {            "symbol": "LTCBTC",            "orderId": 7,            "orderListId": 1,            "clientOrderId": "6pcQbFIzTXGZQ1e2MkGDq4",            "transactTime": 1712291372842,            "price": "1.00000000",            "origQty": "5.00000000",            "executedQty": "0.00000000",            "origQuoteOrderQty": "0.000000",            "cummulativeQuoteQty": "0.00000000",            "status": "PENDING_NEW",            "timeInForce": "IOC",            "type": "STOP_LOSS_LIMIT",            "side": "BUY",            "stopPrice": "6.00000000",            "workingTime": -1,            "selfTradePreventionMode": "NONE"        },        {            "symbol": "LTCBTC",            "orderId": 8,            "orderListId": 1,            "clientOrderId": "r4JMv9cwAYYUwwBZfbussx",            "transactTime": 1712291372842,            "price": "3.00000000",            "origQty": "5.00000000",            "executedQty": "0.00000000",            "origQuoteOrderQty": "0.000000",            "cummulativeQuoteQty": "0.00000000",            "status": "PENDING_NEW",            "timeInForce": "GTC",            "type": "LIMIT_MAKER",            "side": "BUY",            "workingTime": -1,            "selfTradePreventionMode": "NONE"        }    ]}
```

**Note:** The payload above does not show all fields that can appear. Please
refer to
[Conditional fields in Order Responses](/docs/binance-spot-api-docs/rest-api/trading-endpoints#conditional-fields-in-order-responses).

> Source:
> [https://developers.binance.com/docs/binance-spot-api-docs/rest-api/trading-endpoints](https://developers.binance.com/docs/binance-spot-api-docs/rest-api/trading-endpoints)
