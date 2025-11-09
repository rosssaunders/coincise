## New Order list - OCO (TRADE)​

```
POST /api/v3/orderList/oco
```

Send in an one-cancels-the-other (OCO) pair, where activation of one order
immediately cancels the other.

- An OCO has 2 orders called the **above order** and **below order**.
- One of the orders must be a `LIMIT_MAKER/TAKE_PROFIT/TAKE_PROFIT_LIMIT` order
  and the other must be `STOP_LOSS` or `STOP_LOSS_LIMIT` order.
- Price restrictions
  - If the OCO is on the `SELL` side:
    - `LIMIT_MAKER/TAKE_PROFIT_LIMIT` `price` > Last Traded Price >
      `STOP_LOSS/STOP_LOSS_LIMIT` `stopPrice`
    - `TAKE_PROFIT stopPrice` > Last Traded Price >
      `STOP_LOSS/STOP_LOSS_LIMIT stopPrice`
  - If the OCO is on the `BUY` side:
    - `LIMIT_MAKER/TAKE_PROFIT_LIMIT price` < Last Traded Price < `stopPrice`
    - `TAKE_PROFIT stopPrice` < Last Traded Price <
      `STOP_LOSS/STOP_LOSS_LIMIT stopPrice`
- OCOs add **2 orders** to the `EXCHANGE_MAX_ORDERS` filter and the
  `MAX_NUM_ORDERS` filter.

**Weight:** 1

**Unfilled Order Count:** 2

**Parameters:**

| Name              | Type   | Mandatory | Description                                                                      |
| ----------------- | ------ | --------- | -------------------------------------------------------------------------------- |
| symbol            | STRING | Yes       |                                                                                  |
| listClientOrderId | STRING | No        | Arbitrary unique ID among open order lists. Automatically generated if not sent. |

A new order list with the same `listClientOrderId` is accepted only when the
previous one is filled or completely expired.  
`listClientOrderId` is distinct from the `aboveClientOrderId` and the
`belowCLientOrderId`. | | side | ENUM | Yes | `BUY` or `SELL` | | quantity |
DECIMAL | Yes | Quantity for both orders of the order list. | | aboveType | ENUM
| Yes | Supported values: `STOP_LOSS_LIMIT`, `STOP_LOSS`, `LIMIT_MAKER`,
`TAKE_PROFIT`, `TAKE_PROFIT_LIMIT` | | aboveClientOrderId | STRING | No |
Arbitrary unique ID among open orders for the above order. Automatically
generated if not sent | | aboveIcebergQty | LONG | No | Note that this can only
be used if `aboveTimeInForce` is `GTC`. | | abovePrice | DECIMAL | No | Can be
used if `aboveType` is `STOP_LOSS_LIMIT` , `LIMIT_MAKER`, or `TAKE_PROFIT_LIMIT`
to specify the limit price. | | aboveStopPrice | DECIMAL | No | Can be used if
`aboveType` is `STOP_LOSS`, `STOP_LOSS_LIMIT`, `TAKE_PROFIT`,
`TAKE_PROFIT_LIMIT`.  
Either `aboveStopPrice` or `aboveTrailingDelta` or both, must be specified. | |
aboveTrailingDelta | LONG | No | See
[Trailing Stop order FAQ](/docs/binance-spot-api-docs/faqs/trailing-stop-faq). |
| aboveTimeInForce | ENUM | No | Required if `aboveType` is `STOP_LOSS_LIMIT` or
`TAKE_PROFIT_LIMIT` | | aboveStrategyId | LONG | No | Arbitrary numeric value
identifying the above order within an order strategy. | | aboveStrategyType |
INT | No | Arbitrary numeric value identifying the above order strategy.  
Values smaller than 1000000 are reserved and cannot be used. | |
abovePegPriceType | ENUM | NO | See
[Pegged Orders](/docs/binance-spot-api-docs/rest-api/trading-endpoints#pegged-orders-info)
| | abovePegOffsetType | ENUM | NO | | | abovePegOffsetValue | INT | NO | | |
belowType | ENUM | Yes | Supported values: `STOP_LOSS`, `STOP_LOSS_LIMIT`,
`TAKE_PROFIT`,`TAKE_PROFIT_LIMIT` | | belowClientOrderId | STRING | No |
Arbitrary unique ID among open orders for the below order. Automatically
generated if not sent | | belowIcebergQty | LONG | No | Note that this can only
be used if `belowTimeInForce` is `GTC`. | | belowPrice | DECIMAL | No | Can be
used if `belowType` is `STOP_LOSS_LIMIT`, `LIMIT_MAKER`, or `TAKE_PROFIT_LIMIT`
to specify the limit price. | | belowStopPrice | DECIMAL | No | Can be used if
`belowType` is `STOP_LOSS`, `STOP_LOSS_LIMIT, TAKE_PROFIT` or
`TAKE_PROFIT_LIMIT`  
Either belowStopPrice or belowTrailingDelta or both, must be specified. | |
belowTrailingDelta | LONG | No | See
[Trailing Stop order FAQ](/docs/binance-spot-api-docs/faqs/trailing-stop-faq). |
| belowTimeInForce | ENUM | No | Required if `belowType` is `STOP_LOSS_LIMIT` or
`TAKE_PROFIT_LIMIT`. | | belowStrategyId | LONG | No | Arbitrary numeric value
identifying the below order within an order strategy. | | belowStrategyType |
INT | No | Arbitrary numeric value identifying the below order strategy.  
Values smaller than 1000000 are reserved and cannot be used. | |
belowPegPriceType | ENUM | NO | See
[Pegged Orders](/docs/binance-spot-api-docs/rest-api/trading-endpoints#pegged-orders-info)
| | belowPegOffsetType | ENUM | NO | | | belowPegOffsetValue | INT | NO | | |
newOrderRespType | ENUM | No | Select response format: `ACK`, `RESULT`, `FULL` |
| selfTradePreventionMode | ENUM | No | The allowed enums is dependent on what
is configured on the symbol. Supported values:
[STP Modes](/docs/binance-spot-api-docs/enums#stpmodes) | | recvWindow | DECIMAL
| No | The value cannot be greater than `60000`.  
Supports up to three decimal places of precision (e.g., 6000.346) so that
microseconds may be specified. | | timestamp | LONG | Yes | |

**Data Source:** Matching Engine

**Response:**

Response format for `orderReports` is selected using the `newOrderRespType`
parameter. The following example is for the `RESULT` response type. See
[`POST /api/v3/order`](/docs/binance-spot-api-docs/rest-api/trading-endpoints#new-order-trade)
for more examples.

```
{    "orderListId": 1,    "contingencyType": "OCO",    "listStatusType": "EXEC_STARTED",    "listOrderStatus": "EXECUTING",    "listClientOrderId": "lH1YDkuQKWiXVXHPSKYEIp",    "transactionTime": 1710485608839,    "symbol": "LTCBTC",    "orders": [        {            "symbol": "LTCBTC",            "orderId": 10,            "clientOrderId": "44nZvqpemY7sVYgPYbvPih"        },        {            "symbol": "LTCBTC",            "orderId": 11,            "clientOrderId": "NuMp0nVYnciDiFmVqfpBqK"        }    ],    "orderReports": [        {            "symbol": "LTCBTC",            "orderId": 10,            "orderListId": 1,            "clientOrderId": "44nZvqpemY7sVYgPYbvPih",            "transactTime": 1710485608839,            "price": "1.00000000",            "origQty": "5.00000000",            "executedQty": "0.00000000",            "origQuoteOrderQty": "0.000000",            "cummulativeQuoteQty": "0.00000000",            "status": "NEW",            "timeInForce": "GTC",            "type": "STOP_LOSS_LIMIT",            "side": "SELL",            "stopPrice": "1.00000000",            "workingTime": -1,            "icebergQty": "1.00000000",            "selfTradePreventionMode": "NONE"        },        {            "symbol": "LTCBTC",            "orderId": 11,            "orderListId": 1,            "clientOrderId": "NuMp0nVYnciDiFmVqfpBqK",            "transactTime": 1710485608839,            "price": "3.00000000",            "origQty": "5.00000000",            "executedQty": "0.00000000",            "origQuoteOrderQty": "0.000000",            "cummulativeQuoteQty": "0.00000000",            "status": "NEW",            "timeInForce": "GTC",            "type": "LIMIT_MAKER",            "side": "SELL",            "workingTime": 1710485608839,            "selfTradePreventionMode": "NONE"        }    ]}
```

> Source:
> [https://developers.binance.com/docs/binance-spot-api-docs/rest-api/trading-endpoints](https://developers.binance.com/docs/binance-spot-api-docs/rest-api/trading-endpoints)
