## Order lists​

##### New OCO - Deprecated (TRADE)

```
POST /api/v3/order/oco
```

Send in a new OCO.

-   Price Restrictions:
    -   `SELL`: Limit Price > Last Price > Stop Price
    -   `BUY`: Limit Price < Last Price < Stop Price
-   Quantity Restrictions:
    -   Both legs must have the same quantity.
    -   `ICEBERG` quantities however do not have to be the same
-   `OCO` adds **2 orders** to the `EXCHANGE_MAX_ORDERS` filter and the `MAX_NUM_ORDERS` filter.

**Weight:** 1

**Unfilled Order Count:** 2

**Parameters:**

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| symbol | STRING | YES |  |
| listClientOrderId | STRING | NO | A unique Id for the entire orderList |
| side | ENUM | YES |  |
| quantity | DECIMAL | YES |  |
| limitClientOrderId | STRING | NO | A unique Id for the limit order |
| price | DECIMAL | YES |  |
| limitStrategyId | LONG | NO |  |
| limitStrategyType | INT | NO | The value cannot be less than `1000000`. |
| limitIcebergQty | DECIMAL | NO | Used to make the `LIMIT_MAKER` leg an iceberg order. |
| trailingDelta | LONG | NO |  |
| stopClientOrderId | STRING | NO | A unique Id for the stop loss/stop loss limit leg |
| stopPrice | DECIMAL | YES |  |
| stopStrategyId | LONG | NO |  |
| stopStrategyType | INT | NO | The value cannot be less than `1000000`. |
| stopLimitPrice | DECIMAL | NO | If provided, `stopLimitTimeInForce` is required. |
| stopIcebergQty | DECIMAL | NO | Used with `STOP_LOSS_LIMIT` leg to make an iceberg order. |
| stopLimitTimeInForce | ENUM | NO | Valid values are `GTC`/`FOK`/`IOC` |
| newOrderRespType | ENUM | NO | Set the response JSON. |
| selfTradePreventionMode | ENUM | NO | The allowed enums is dependent on what is configured on the symbol. The possible supported values are: [STP Modes](/docs/binance-spot-api-docs/enums#stpmodes). |
| recvWindow | DECIMAL | NO | The value cannot be greater than `60000`.  
Supports up to three decimal places of precision (e.g., 6000.346) so that microseconds may be specified. |
| timestamp | LONG | YES |  |

**Data Source:** Matching Engine

**Response:**

```
{  "orderListId": 0,  "contingencyType": "OCO",  "listStatusType": "EXEC_STARTED",  "listOrderStatus": "EXECUTING",  "listClientOrderId": "JYVpp3F0f5CAG15DhtrqLp",  "transactionTime": 1563417480525,  "symbol": "LTCBTC",  "orders": [    {      "symbol": "LTCBTC",      "orderId": 2,      "clientOrderId": "Kk7sqHb9J6mJWTMDVW7Vos"    },    {      "symbol": "LTCBTC",      "orderId": 3,      "clientOrderId": "xTXKaGYd4bluPVp78IVRvl"    }  ],  "orderReports": [    {      "symbol": "LTCBTC",      "orderId": 2,      "orderListId": 0,      "clientOrderId": "Kk7sqHb9J6mJWTMDVW7Vos",      "transactTime": 1563417480525,      "price": "0.000000",      "origQty": "0.624363",      "executedQty": "0.000000",      "origQuoteOrderQty": "0.000000",      "cummulativeQuoteQty": "0.000000",      "status": "NEW",      "timeInForce": "GTC",      "type": "STOP_LOSS",      "side": "BUY",      "stopPrice": "0.960664",      "workingTime": -1,      "selfTradePreventionMode": "NONE"    },    {      "symbol": "LTCBTC",      "orderId": 3,      "orderListId": 0,      "clientOrderId": "xTXKaGYd4bluPVp78IVRvl",      "transactTime": 1563417480525,      "price": "0.036435",      "origQty": "0.624363",      "executedQty": "0.000000",      "origQuoteOrderQty": "0.000000",      "cummulativeQuoteQty": "0.000000",      "status": "NEW",      "timeInForce": "GTC",      "type": "LIMIT_MAKER",      "side": "BUY",      "workingTime": 1563417480525,      "selfTradePreventionMode": "NONE"    }  ]}
```

##### New Order list - OCO (TRADE)

```
POST /api/v3/orderList/oco
```

Send in an one-cancels-the-other (OCO) pair, where activation of one order immediately cancels the other.

-   An OCO has 2 orders called the **above order** and **below order**.
-   One of the orders must be a `LIMIT_MAKER/TAKE_PROFIT/TAKE_PROFIT_LIMIT` order and the other must be `STOP_LOSS` or `STOP_LOSS_LIMIT` order.
-   Price restrictions
    -   If the OCO is on the `SELL` side:
        -   `LIMIT_MAKER/TAKE_PROFIT_LIMIT` `price` > Last Traded Price > `STOP_LOSS/STOP_LOSS_LIMIT` `stopPrice`
        -   `TAKE_PROFIT stopPrice` > Last Traded Price > `STOP_LOSS/STOP_LOSS_LIMIT stopPrice`
    -   If the OCO is on the `BUY` side:
        -   `LIMIT_MAKER/TAKE_PROFIT_LIMIT price` < Last Traded Price < `stopPrice`
        -   `TAKE_PROFIT stopPrice` < Last Traded Price < `STOP_LOSS/STOP_LOSS_LIMIT stopPrice`
-   OCOs add **2 orders** to the `EXCHANGE_MAX_ORDERS` filter and the `MAX_NUM_ORDERS` filter.

**Weight:** 1

**Unfilled Order Count:** 2

**Parameters:**

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| symbol | STRING | Yes |  |
| listClientOrderId | STRING | No | Arbitrary unique ID among open order lists. Automatically generated if not sent.  
A new order list with the same `listClientOrderId` is accepted only when the previous one is filled or completely expired.  
`listClientOrderId` is distinct from the `aboveClientOrderId` and the `belowCLientOrderId`. |
| side | ENUM | Yes | `BUY` or `SELL` |
| quantity | DECIMAL | Yes | Quantity for both orders of the order list. |
| aboveType | ENUM | Yes | Supported values: `STOP_LOSS_LIMIT`, `STOP_LOSS`, `LIMIT_MAKER`, `TAKE_PROFIT`, `TAKE_PROFIT_LIMIT` |
| aboveClientOrderId | STRING | No | Arbitrary unique ID among open orders for the above order. Automatically generated if not sent |
| aboveIcebergQty | LONG | No | Note that this can only be used if `aboveTimeInForce` is `GTC`. |
| abovePrice | DECIMAL | No | Can be used if `aboveType` is `STOP_LOSS_LIMIT` , `LIMIT_MAKER`, or `TAKE_PROFIT_LIMIT` to specify the limit price. |
| aboveStopPrice | DECIMAL | No | Can be used if `aboveType` is `STOP_LOSS`, `STOP_LOSS_LIMIT`, `TAKE_PROFIT`, `TAKE_PROFIT_LIMIT`.  
Either `aboveStopPrice` or `aboveTrailingDelta` or both, must be specified. |
| aboveTrailingDelta | LONG | No | See [Trailing Stop order FAQ](/docs/binance-spot-api-docs/faqs/trailing-stop-faq). |
| aboveTimeInForce | ENUM | No | Required if `aboveType` is `STOP_LOSS_LIMIT` or `TAKE_PROFIT_LIMIT` |
| aboveStrategyId | LONG | No | Arbitrary numeric value identifying the above order within an order strategy. |
| aboveStrategyType | INT | No | Arbitrary numeric value identifying the above order strategy.  
Values smaller than 1000000 are reserved and cannot be used. |
| abovePegPriceType | ENUM | NO | See [Pegged Orders](/docs/binance-spot-api-docs/rest-api/trading-endpoints#pegged-orders-info) |
| abovePegOffsetType | ENUM | NO |  |
| abovePegOffsetValue | INT | NO |  |
| belowType | ENUM | Yes | Supported values: `STOP_LOSS`, `STOP_LOSS_LIMIT`, `TAKE_PROFIT`,`TAKE_PROFIT_LIMIT` |
| belowClientOrderId | STRING | No | Arbitrary unique ID among open orders for the below order. Automatically generated if not sent |
| belowIcebergQty | LONG | No | Note that this can only be used if `belowTimeInForce` is `GTC`. |
| belowPrice | DECIMAL | No | Can be used if `belowType` is `STOP_LOSS_LIMIT`, `LIMIT_MAKER`, or `TAKE_PROFIT_LIMIT` to specify the limit price. |
| belowStopPrice | DECIMAL | No | Can be used if `belowType` is `STOP_LOSS`, `STOP_LOSS_LIMIT, TAKE_PROFIT` or `TAKE_PROFIT_LIMIT`  
Either belowStopPrice or belowTrailingDelta or both, must be specified. |
| belowTrailingDelta | LONG | No | See [Trailing Stop order FAQ](/docs/binance-spot-api-docs/faqs/trailing-stop-faq). |
| belowTimeInForce | ENUM | No | Required if `belowType` is `STOP_LOSS_LIMIT` or `TAKE_PROFIT_LIMIT`. |
| belowStrategyId | LONG | No | Arbitrary numeric value identifying the below order within an order strategy. |
| belowStrategyType | INT | No | Arbitrary numeric value identifying the below order strategy.  
Values smaller than 1000000 are reserved and cannot be used. |
| belowPegPriceType | ENUM | NO | See [Pegged Orders](/docs/binance-spot-api-docs/rest-api/trading-endpoints#pegged-orders-info) |
| belowPegOffsetType | ENUM | NO |  |
| belowPegOffsetValue | INT | NO |  |
| newOrderRespType | ENUM | No | Select response format: `ACK`, `RESULT`, `FULL` |
| selfTradePreventionMode | ENUM | No | The allowed enums is dependent on what is configured on the symbol. Supported values: [STP Modes](/docs/binance-spot-api-docs/enums#stpmodes) |
| recvWindow | DECIMAL | No | The value cannot be greater than `60000`.  
Supports up to three decimal places of precision (e.g., 6000.346) so that microseconds may be specified. |
| timestamp | LONG | Yes |  |

**Data Source:** Matching Engine

**Response:**

Response format for `orderReports` is selected using the `newOrderRespType` parameter. The following example is for the `RESULT` response type. See [`POST /api/v3/order`](/docs/binance-spot-api-docs/rest-api/trading-endpoints#new-order-trade) for more examples.

```
{    "orderListId": 1,    "contingencyType": "OCO",    "listStatusType": "EXEC_STARTED",    "listOrderStatus": "EXECUTING",    "listClientOrderId": "lH1YDkuQKWiXVXHPSKYEIp",    "transactionTime": 1710485608839,    "symbol": "LTCBTC",    "orders": [        {            "symbol": "LTCBTC",            "orderId": 10,            "clientOrderId": "44nZvqpemY7sVYgPYbvPih"        },        {            "symbol": "LTCBTC",            "orderId": 11,            "clientOrderId": "NuMp0nVYnciDiFmVqfpBqK"        }    ],    "orderReports": [        {            "symbol": "LTCBTC",            "orderId": 10,            "orderListId": 1,            "clientOrderId": "44nZvqpemY7sVYgPYbvPih",            "transactTime": 1710485608839,            "price": "1.00000000",            "origQty": "5.00000000",            "executedQty": "0.00000000",            "origQuoteOrderQty": "0.000000",            "cummulativeQuoteQty": "0.00000000",            "status": "NEW",            "timeInForce": "GTC",            "type": "STOP_LOSS_LIMIT",            "side": "SELL",            "stopPrice": "1.00000000",            "workingTime": -1,            "icebergQty": "1.00000000",            "selfTradePreventionMode": "NONE"        },        {            "symbol": "LTCBTC",            "orderId": 11,            "orderListId": 1,            "clientOrderId": "NuMp0nVYnciDiFmVqfpBqK",            "transactTime": 1710485608839,            "price": "3.00000000",            "origQty": "5.00000000",            "executedQty": "0.00000000",            "origQuoteOrderQty": "0.000000",            "cummulativeQuoteQty": "0.00000000",            "status": "NEW",            "timeInForce": "GTC",            "type": "LIMIT_MAKER",            "side": "SELL",            "workingTime": 1710485608839,            "selfTradePreventionMode": "NONE"        }    ]}
```

##### New Order list - OTO (TRADE)

```
POST /api/v3/orderList/oto
```

Place an OTO.

-   An OTO (One-Triggers-the-Other) is an order list comprised of 2 orders.
-   The first order is called the **working order** and must be `LIMIT` or `LIMIT_MAKER`. Initially, only the working order goes on the order book.
-   The second order is called the **pending order**. It can be any order type except for `MARKET` orders using parameter `quoteOrderQty`. The pending order is only placed on the order book when the working order gets **fully filled**.
-   If either the working order or the pending order is cancelled individually, the other order in the order list will also be canceled or expired.
-   When the order list is placed, if the working order gets **immediately fully filled**, the placement response will show the working order as `FILLED` but the pending order will still appear as `PENDING_NEW`. You need to query the status of the pending order again to see its updated status.
-   OTOs add **2 orders** to the `EXCHANGE_MAX_NUM_ORDERS` filter and `MAX_NUM_ORDERS` filter.

**Weight:** 1

**Unfilled Order Count:** 2

**Parameters:**

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| symbol | STRING | YES |  |
| listClientOrderId | STRING | NO | Arbitrary unique ID among open order lists. Automatically generated if not sent.  
A new order list with the same listClientOrderId is accepted only when the previous one is filled or completely expired.  
`listClientOrderId` is distinct from the `workingClientOrderId` and the `pendingClientOrderId`. |
| newOrderRespType | ENUM | NO | Format of the JSON response. Supported values: [Order Response Type](/docs/binance-spot-api-docs/enums#orderresponsetype) |
| selfTradePreventionMode | ENUM | NO | The allowed values are dependent on what is configured on the symbol. Supported values: [STP Modes](/docs/binance-spot-api-docs/enums#stpmodes) |
| workingType | ENUM | YES | Supported values: `LIMIT`,`LIMIT_MAKER` |
| workingSide | ENUM | YES | Supported values: [Order Side](/docs/binance-spot-api-docs/enums#side) |
| workingClientOrderId | STRING | NO | Arbitrary unique ID among open orders for the working order.  
Automatically generated if not sent. |
| workingPrice | DECIMAL | YES |  |
| workingQuantity | DECIMAL | YES | Sets the quantity for the working order. |
| workingIcebergQty | DECIMAL | NO | This can only be used if `workingTimeInForce` is `GTC`, or if `workingType` is `LIMIT_MAKER`. |
| workingTimeInForce | ENUM | NO | Supported values: [Time In Force](/docs/binance-spot-api-docs/enums#timeinforce) |
| workingStrategyId | LONG | NO | Arbitrary numeric value identifying the working order within an order strategy. |
| workingStrategyType | INT | NO | Arbitrary numeric value identifying the working order strategy.  
Values smaller than 1000000 are reserved and cannot be used. |
| workingPegPriceType | ENUM | NO | See [Pegged Orders](/docs/binance-spot-api-docs/rest-api/trading-endpoints#pegged-orders-info) |
| workingPegOffsetType | ENUM | NO |  |
| workingPegOffsetValue | INT | NO |  |
| pendingType | ENUM | YES | Supported values: [Order Types](/docs/binance-spot-api-docs/rest-api/trading-endpoints#order-type)  
Note that `MARKET` orders using `quoteOrderQty` are not supported. |
| pendingSide | ENUM | YES | Supported values: [Order Side](/docs/binance-spot-api-docs/enums#side) |
| pendingClientOrderId | STRING | NO | Arbitrary unique ID among open orders for the pending order.  
Automatically generated if not sent. |
| pendingPrice | DECIMAL | NO |  |
| pendingStopPrice | DECIMAL | NO |  |
| pendingTrailingDelta | DECIMAL | NO |  |
| pendingQuantity | DECIMAL | YES | Sets the quantity for the pending order. |
| pendingIcebergQty | DECIMAL | NO | This can only be used if `pendingTimeInForce` is `GTC` or if `pendingType` is `LIMIT_MAKER`. |
| pendingTimeInForce | ENUM | NO | Supported values: [Time In Force](/docs/binance-spot-api-docs/enums#timeinforce) |
| pendingStrategyId | LONG | NO | Arbitrary numeric value identifying the pending order within an order strategy. |
| pendingStrategyType | INT | NO | Arbitrary numeric value identifying the pending order strategy.  
Values smaller than 1000000 are reserved and cannot be used. |
| pendingPegPriceType | ENUM | NO | See [Pegged Orders](/docs/binance-spot-api-docs/rest-api/trading-endpoints#pegged-orders-info) |
| pendingPegOffsetType | ENUM | NO |  |
| pendingPegOffsetValue | INT | NO |  |
| recvWindow | DECIMAL | NO | The value cannot be greater than `60000`.  
Supports up to three decimal places of precision (e.g., 6000.346) so that microseconds may be specified. |
| timestamp | LONG | YES |  |

**Mandatory parameters based on `pendingType` or `workingType`**

Depending on the `pendingType` or `workingType`, some optional parameters will become mandatory.

| Type | Additional mandatory parameters | Additional information |
| --- | --- | --- |
| `workingType` = `LIMIT` | `workingTimeInForce` |  |
| `pendingType` = `LIMIT` | `pendingPrice`, `pendingTimeInForce` |  |
| `pendingType` = `STOP_LOSS` or `TAKE_PROFIT` | `pendingStopPrice` and/or `pendingTrailingDelta` |  |
| `pendingType` = `STOP_LOSS_LIMIT` or `TAKE_PROFIT_LIMIT` | `pendingPrice`, `pendingStopPrice` and/or `pendingTrailingDelta`, `pendingTimeInForce` |  |

**Data Source:**

Matching Engine

**Response:**

```
{    "orderListId": 0,    "contingencyType": "OTO",    "listStatusType": "EXEC_STARTED",    "listOrderStatus": "EXECUTING",    "listClientOrderId": "yl2ERtcar1o25zcWtqVBTC",    "transactionTime": 1712289389158,    "symbol": "LTCBTC",    "orders": [        {            "symbol": "LTCBTC",            "orderId": 4,            "clientOrderId": "Bq17mn9fP6vyCn75Jw1xya"        },        {            "symbol": "LTCBTC",            "orderId": 5,            "clientOrderId": "arLFo0zGJVDE69cvGBaU0d"        }    ],    "orderReports": [        {            "symbol": "LTCBTC",            "orderId": 4,            "orderListId": 0,            "clientOrderId": "Bq17mn9fP6vyCn75Jw1xya",            "transactTime": 1712289389158,            "price": "1.00000000",            "origQty": "1.00000000",            "executedQty": "0.00000000",            "origQuoteOrderQty": "0.000000",            "cummulativeQuoteQty": "0.00000000",            "status": "NEW",            "timeInForce": "GTC",            "type": "LIMIT",            "side": "SELL",            "workingTime": 1712289389158,            "selfTradePreventionMode": "NONE"        },        {            "symbol": "LTCBTC",            "orderId": 5,            "orderListId": 0,            "clientOrderId": "arLFo0zGJVDE69cvGBaU0d",            "transactTime": 1712289389158,            "price": "0.00000000",            "origQty": "5.00000000",            "executedQty": "0.00000000",            "origQuoteOrderQty": "0.000000",            "cummulativeQuoteQty": "0.00000000",            "status": "PENDING_NEW",            "timeInForce": "GTC",            "type": "MARKET",            "side": "BUY",            "workingTime": -1,            "selfTradePreventionMode": "NONE"        }    ]}
```

**Note:** The payload above does not show all fields that can appear. Please refer to [Conditional fields in Order Responses](/docs/binance-spot-api-docs/rest-api/trading-endpoints#conditional-fields-in-order-responses).

##### New Order list - OTOCO (TRADE)

```
POST /api/v3/orderList/otoco
```

Place an OTOCO.

-   An OTOCO (One-Triggers-One-Cancels-the-Other) is an order list comprised of 3 orders.
-   The first order is called the **working order** and must be `LIMIT` or `LIMIT_MAKER`. Initially, only the working order goes on the order book.
    -   The behavior of the working order is the same as the [OTO](/docs/binance-spot-api-docs/rest-api/trading-endpoints#new-order-list---oto-trade).
-   OTOCO has 2 pending orders (pending above and pending below), forming an OCO pair. The pending orders are only placed on the order book when the working order gets **fully filled**.
    -   The rules of the pending above and pending below follow the same rules as the [Order list OCO](/docs/binance-spot-api-docs/rest-api/trading-endpoints#new-order-list---oco-trade).
-   OTOCOs add **3 orders** to the `EXCHANGE_MAX_NUM_ORDERS` filter and `MAX_NUM_ORDERS` filter.

**Weight:** 1

**Unfilled Order Count:** 3

**Parameters:**

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| symbol | STRING | YES |  |
| listClientOrderId | STRING | NO | Arbitrary unique ID among open order lists. Automatically generated if not sent.  
A new order list with the same listClientOrderId is accepted only when the previous one is filled or completely expired.  
`listClientOrderId` is distinct from the `workingClientOrderId`, `pendingAboveClientOrderId`, and the `pendingBelowClientOrderId`. |
| newOrderRespType | ENUM | NO | Format of the JSON response. Supported values: [Order Response Type](/docs/binance-spot-api-docs/enums#orderresponsetype) |
| selfTradePreventionMode | ENUM | NO | The allowed values are dependent on what is configured on the symbol. Supported values: [STP Modes](/docs/binance-spot-api-docs/enums#stpmodes) |
| workingType | ENUM | YES | Supported values: `LIMIT`, `LIMIT_MAKER` |
| workingSide | ENUM | YES | Supported values: [Order side](/docs/binance-spot-api-docs/enums#side) |
| workingClientOrderId | STRING | NO | Arbitrary unique ID among open orders for the working order.  
Automatically generated if not sent. |
| workingPrice | DECIMAL | YES |  |
| workingQuantity | DECIMAL | YES |  |
| workingIcebergQty | DECIMAL | NO | This can only be used if `workingTimeInForce` is `GTC`. |
| workingTimeInForce | ENUM | NO | Supported values: [Time In Force](/docs/binance-spot-api-docs/enums#timeinforce) |
| workingStrategyId | LONG | NO | Arbitrary numeric value identifying the working order within an order strategy. |
| workingStrategyType | INT | NO | Arbitrary numeric value identifying the working order strategy.  
Values smaller than 1000000 are reserved and cannot be used. |
| workingPegPriceType | ENUM | NO | See [Pegged Orders](/docs/binance-spot-api-docs/rest-api/trading-endpoints#pegged-orders-info) |
| workingPegOffsetType | ENUM | NO |  |
| workingPegOffsetValue | INT | NO |  |
| pendingSide | ENUM | YES | Supported values: [Order side](/docs/binance-spot-api-docs/enums#side) |
| pendingQuantity | DECIMAL | YES |  |
| pendingAboveType | ENUM | YES | Supported values: `STOP_LOSS_LIMIT`, `STOP_LOSS`, `LIMIT_MAKER`, `TAKE_PROFIT`, `TAKE_PROFIT_LIMIT` |
| pendingAboveClientOrderId | STRING | NO | Arbitrary unique ID among open orders for the pending above order.  
Automatically generated if not sent. |
| pendingAbovePrice | DECIMAL | NO | Can be used if `pendingAboveType` is `STOP_LOSS_LIMIT` , `LIMIT_MAKER`, or `TAKE_PROFIT_LIMIT` to specify the limit price. |
| pendingAboveStopPrice | DECIMAL | NO | Can be used if `pendingAboveType` is `STOP_LOSS`, `STOP_LOSS_LIMIT`, `TAKE_PROFIT`, `TAKE_PROFIT_LIMIT` |
| pendingAboveTrailingDelta | DECIMAL | NO | See [Trailing Stop FAQ](/docs/binance-spot-api-docs/faqs/trailing-stop-faq) |
| pendingAboveIcebergQty | DECIMAL | NO | This can only be used if `pendingAboveTimeInForce` is `GTC` or if `pendingAboveType` is `LIMIT_MAKER`. |
| pendingAboveTimeInForce | ENUM | NO |  |
| pendingAboveStrategyId | LONG | NO | Arbitrary numeric value identifying the pending above order within an order strategy. |
| pendingAboveStrategyType | INT | NO | Arbitrary numeric value identifying the pending above order strategy.  
Values smaller than 1000000 are reserved and cannot be used. |
| pendingAbovePegPriceType | ENUM | NO | See [Pegged Orders](/docs/binance-spot-api-docs/rest-api/trading-endpoints#pegged-orders-info) |
| pendingAbovePegOffsetType | ENUM | NO |  |
| pendingAbovePegOffsetValue | INT | NO |  |
| pendingBelowType | ENUM | NO | Supported values: `STOP_LOSS`, `STOP_LOSS_LIMIT`, `TAKE_PROFIT`,`TAKE_PROFIT_LIMIT` |
| pendingBelowClientOrderId | STRING | NO | Arbitrary unique ID among open orders for the pending below order.  
Automatically generated if not sent. |
| pendingBelowPrice | DECIMAL | NO | Can be used if `pendingBelowType` is `STOP_LOSS_LIMIT` or `TAKE_PROFIT_LIMIT` to specify limit price |
| pendingBelowStopPrice | DECIMAL | NO | Can be used if `pendingBelowType` is `STOP_LOSS`, `STOP_LOSS_LIMIT, TAKE_PROFIT or TAKE_PROFIT_LIMIT`.  
Either `pendingBelowStopPrice` or `pendingBelowTrailingDelta` or both, must be specified. |
| pendingBelowTrailingDelta | DECIMAL | NO |  |
| pendingBelowIcebergQty | DECIMAL | NO | This can only be used if `pendingBelowTimeInForce` is `GTC`, or if `pendingBelowType` is `LIMIT_MAKER`. |
| pendingBelowTimeInForce | ENUM | NO | Supported values: [Time In Force](/docs/binance-spot-api-docs/enums#timeinforce) |
| pendingBelowStrategyId | LONG | NO | Arbitrary numeric value identifying the pending below order within an order strategy. |
| pendingBelowStrategyType | INT | NO | Arbitrary numeric value identifying the pending below order strategy.  
Values smaller than 1000000 are reserved and cannot be used. |
| pendingBelowPegPriceType | ENUM | NO | See [Pegged Orders](/docs/binance-spot-api-docs/rest-api/trading-endpoints#pegged-orders-info) |
| pendingBelowPegOffsetType | ENUM | NO |  |
| pendingBelowPegOffsetValue | INT | NO |  |
| recvWindow | DECIMAL | NO | The value cannot be greater than `60000`.  
Supports up to three decimal places of precision (e.g., 6000.346) so that microseconds may be specified. |
| timestamp | LONG | YES |  |

**Mandatory parameters based on `pendingAboveType`, `pendingBelowType` or `workingType`**

Depending on the `pendingAboveType`/`pendingBelowType` or `workingType`, some optional parameters will become mandatory.

| Type | Additional mandatory parameters | Additional information |
| --- | --- | --- |
| `workingType` = `LIMIT` | `workingTimeInForce` |  |
| `pendingAboveType`\= `LIMIT_MAKER` | `pendingAbovePrice` |  |
| `pendingAboveType` = `STOP_LOSS/TAKE_PROFIT` | `pendingAboveStopPrice` and/or `pendingAboveTrailingDelta` |  |
| `pendingAboveType=STOP_LOSS_LIMIT/TAKE_PROFIT_LIMIT` | `pendingAbovePrice`, `pendingAboveStopPrice` and/or `pendingAboveTrailingDelta`, `pendingAboveTimeInForce` |  |
| `pendingBelowType`\= `LIMIT_MAKER` | `pendingBelowPrice` |  |
| `pendingBelowType= STOP_LOSS/TAKE_PROFIT` | `pendingBelowStopPrice` and/or `pendingBelowTrailingDelta` |  |
| `pendingBelowType=STOP_LOSS_LIMIT/TAKE_PROFIT_LIMIT` | `pendingBelowPrice`, `pendingBelowStopPrice` and/or `pendingBelowTrailingDelta`, `pendingBelowTimeInForce` |  |

**Data Source:**

Matching Engine

**Response:**

```
{    "orderListId": 1,    "contingencyType": "OTO",    "listStatusType": "EXEC_STARTED",    "listOrderStatus": "EXECUTING",    "listClientOrderId": "RumwQpBaDctlUu5jyG5rs0",    "transactionTime": 1712291372842,    "symbol": "LTCBTC",    "orders": [        {            "symbol": "LTCBTC",            "orderId": 6,            "clientOrderId": "fM9Y4m23IFJVCQmIrlUmMK"        },        {            "symbol": "LTCBTC",            "orderId": 7,            "clientOrderId": "6pcQbFIzTXGZQ1e2MkGDq4"        },        {            "symbol": "LTCBTC",            "orderId": 8,            "clientOrderId": "r4JMv9cwAYYUwwBZfbussx"        }    ],    "orderReports": [        {            "symbol": "LTCBTC",            "orderId": 6,            "orderListId": 1,            "clientOrderId": "fM9Y4m23IFJVCQmIrlUmMK",            "transactTime": 1712291372842,            "price": "1.00000000",            "origQty": "1.00000000",            "executedQty": "0.00000000",            "origQuoteOrderQty": "0.000000",            "cummulativeQuoteQty": "0.00000000",            "status": "NEW",            "timeInForce": "GTC",            "type": "LIMIT",            "side": "SELL",            "workingTime": 1712291372842,            "selfTradePreventionMode": "NONE"        },        {            "symbol": "LTCBTC",            "orderId": 7,            "orderListId": 1,            "clientOrderId": "6pcQbFIzTXGZQ1e2MkGDq4",            "transactTime": 1712291372842,            "price": "1.00000000",            "origQty": "5.00000000",            "executedQty": "0.00000000",            "origQuoteOrderQty": "0.000000",            "cummulativeQuoteQty": "0.00000000",            "status": "PENDING_NEW",            "timeInForce": "IOC",            "type": "STOP_LOSS_LIMIT",            "side": "BUY",            "stopPrice": "6.00000000",            "workingTime": -1,            "selfTradePreventionMode": "NONE"        },        {            "symbol": "LTCBTC",            "orderId": 8,            "orderListId": 1,            "clientOrderId": "r4JMv9cwAYYUwwBZfbussx",            "transactTime": 1712291372842,            "price": "3.00000000",            "origQty": "5.00000000",            "executedQty": "0.00000000",            "origQuoteOrderQty": "0.000000",            "cummulativeQuoteQty": "0.00000000",            "status": "PENDING_NEW",            "timeInForce": "GTC",            "type": "LIMIT_MAKER",            "side": "BUY",            "workingTime": -1,            "selfTradePreventionMode": "NONE"        }    ]}
```

**Note:** The payload above does not show all fields that can appear. Please refer to [Conditional fields in Order Responses](/docs/binance-spot-api-docs/rest-api/trading-endpoints#conditional-fields-in-order-responses).

##### Cancel Order list (TRADE)

```
DELETE /api/v3/orderList
```

Cancel an entire Order list

**Weight:** 1

**Parameters:**

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| symbol | STRING | YES |  |
| orderListId | LONG | NO | Either `orderListId` or `listClientOrderId` must be provided |
| listClientOrderId | STRING | NO | Either `orderListId` or `listClientOrderId` must be provided |
| newClientOrderId | STRING | NO | Used to uniquely identify this cancel. Automatically generated by default |
| recvWindow | DECIMAL | NO | The value cannot be greater than `60000`.  
Supports up to three decimal places of precision (e.g., 6000.346) so that microseconds may be specified. |
| timestamp | LONG | YES |  |

**Notes:**

-   Canceling an individual order from an order list will cancel the entire order list.
-   If both `orderListId` and `listClientOrderId` parameters are provided, the `orderListId` is searched first, then the `listClientOrderId` from that result is checked against that order. If both conditions are not met the request will be rejected.

**Data Source:** Matching Engine

**Response:**

```
{  "orderListId": 0,  "contingencyType": "OCO",  "listStatusType": "ALL_DONE",  "listOrderStatus": "ALL_DONE",  "listClientOrderId": "C3wyj4WVEktd7u9aVBRXcN",  "transactionTime": 1574040868128,  "symbol": "LTCBTC",  "orders": [    {      "symbol": "LTCBTC",      "orderId": 2,      "clientOrderId": "pO9ufTiFGg3nw2fOdgeOXa"    },    {      "symbol": "LTCBTC",      "orderId": 3,      "clientOrderId": "TXOvglzXuaubXAaENpaRCB"    }  ],  "orderReports": [    {      "symbol": "LTCBTC",      "origClientOrderId": "pO9ufTiFGg3nw2fOdgeOXa",      "orderId": 2,      "orderListId": 0,      "clientOrderId": "unfWT8ig8i0uj6lPuYLez6",      "transactTime": 1688005070874,      "price": "1.00000000",      "origQty": "10.00000000",      "executedQty": "0.00000000",      "origQuoteOrderQty": "0.000000",      "cummulativeQuoteQty": "0.00000000",      "status": "CANCELED",      "timeInForce": "GTC",      "type": "STOP_LOSS_LIMIT",      "side": "SELL",      "stopPrice": "1.00000000",      "selfTradePreventionMode": "NONE"    },    {      "symbol": "LTCBTC",      "origClientOrderId": "TXOvglzXuaubXAaENpaRCB",      "orderId": 3,      "orderListId": 0,      "clientOrderId": "unfWT8ig8i0uj6lPuYLez6",      "transactTime": 1688005070874,      "price": "3.00000000",      "origQty": "10.00000000",      "executedQty": "0.00000000",      "origQuoteOrderQty": "0.000000",      "cummulativeQuoteQty": "0.00000000",      "status": "CANCELED",      "timeInForce": "GTC",      "type": "LIMIT_MAKER",      "side": "SELL",      "selfTradePreventionMode": "NONE"    }  ]}
```

> Source: [https://developers.binance.com/docs/binance-spot-api-docs/rest-api/trading-endpoints](https://developers.binance.com/docs/binance-spot-api-docs/rest-api/trading-endpoints)
