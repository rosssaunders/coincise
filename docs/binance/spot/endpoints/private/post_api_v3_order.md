## New order (TRADE)​

```
POST /api/v3/order
```

Send in a new order.

This adds 1 order to the `EXCHANGE_MAX_ORDERS` filter and the `MAX_NUM_ORDERS` filter.

**Weight:** 1

**Unfilled Order Count:** 1

**Parameters:**

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| symbol | STRING | YES |  |
| side | ENUM | YES | Please see [Enums](/docs/binance-spot-api-docs/enums#side) for supported values. |
| type | ENUM | YES | Please see [Enums](/docs/binance-spot-api-docs/enums#ordertypes) for supported values. |
| timeInForce | ENUM | NO | Please see [Enums](/docs/binance-spot-api-docs/enums#timeinforce) for supported values. |
| quantity | DECIMAL | NO |  |
| quoteOrderQty | DECIMAL | NO |  |
| price | DECIMAL | NO |  |
| newClientOrderId | STRING | NO | A unique id among open orders. Automatically generated if not sent.  
Orders with the same `newClientOrderID` can be accepted only when the previous one is filled, otherwise the order will be rejected. |
| strategyId | LONG | NO |  |
| strategyType | INT | NO | The value cannot be less than `1000000`. |
| stopPrice | DECIMAL | NO | Used with `STOP_LOSS`, `STOP_LOSS_LIMIT`, `TAKE_PROFIT`, and `TAKE_PROFIT_LIMIT` orders. |
| trailingDelta | LONG | NO | See [Trailing Stop order FAQ](/docs/binance-spot-api-docs/faqs/trailing-stop-faq). |
| icebergQty | DECIMAL | NO | Used with `LIMIT`, `STOP_LOSS_LIMIT`, and `TAKE_PROFIT_LIMIT` to create an iceberg order. |
| newOrderRespType | ENUM | NO | Set the response JSON. `ACK`, `RESULT`, or `FULL`; `MARKET` and `LIMIT` order types default to `FULL`, all other orders default to `ACK`. |
| selfTradePreventionMode | ENUM | NO | The allowed enums is dependent on what is configured on the symbol. The possible supported values are: [STP Modes](/docs/binance-spot-api-docs/enums#stpmodes). |
| pegPriceType | ENUM | NO | `PRIMARY_PEG` or `MARKET_PEG`.  
See [Pegged Orders Info](/docs/binance-spot-api-docs/rest-api/trading-endpoints#pegged-orders-info) |
| pegOffsetValue | INT | NO | Price level to peg the price to (max: 100).  
See [Pegged Orders Info](/docs/binance-spot-api-docs/rest-api/trading-endpoints#pegged-orders-info) |
| pegOffsetType | ENUM | NO | Only `PRICE_LEVEL` is supported.  
See [Pegged Orders Info](/docs/binance-spot-api-docs/rest-api/trading-endpoints#pegged-orders-info) |
| recvWindow | DECIMAL | NO | The value cannot be greater than `60000`.  
Supports up to three decimal places of precision (e.g., 6000.346) so that microseconds may be specified. |
| timestamp | LONG | YES |  |

Some additional mandatory parameters based on order `type`:

| Type | Additional mandatory parameters | Additional Information |
| --- | --- | --- |
| `LIMIT` | `timeInForce`, `quantity`, `price` |  |
| `MARKET` | `quantity` or `quoteOrderQty` | `MARKET` orders using the `quantity` field specifies the amount of the `base asset` the user wants to buy or sell at the market price.  
E.g. MARKET order on BTCUSDT will specify how much BTC the user is buying or selling.  
  
`MARKET` orders using `quoteOrderQty` specifies the amount the user wants to spend (when buying) or receive (when selling) the `quote` asset; the correct `quantity` will be determined based on the market liquidity and `quoteOrderQty`.  
E.g. Using the symbol BTCUSDT:  
`BUY` side, the order will buy as many BTC as `quoteOrderQty` USDT can.  
`SELL` side, the order will sell as much BTC needed to receive `quoteOrderQty` USDT. |
| `STOP_LOSS` | `quantity`, `stopPrice` or `trailingDelta` | This will execute a `MARKET` order when the conditions are met. (e.g. `stopPrice` is met or `trailingDelta` is activated) |
| `STOP_LOSS_LIMIT` | `timeInForce`, `quantity`, `price`, `stopPrice` or `trailingDelta` |  |
| `TAKE_PROFIT` | `quantity`, `stopPrice` or `trailingDelta` | This will execute a `MARKET` order when the conditions are met. (e.g. `stopPrice` is met or `trailingDelta` is activated) |
| `TAKE_PROFIT_LIMIT` | `timeInForce`, `quantity`, `price`, `stopPrice` or `trailingDelta` |  |
| `LIMIT_MAKER` | `quantity`, `price` | This is a `LIMIT` order that will be rejected if the order immediately matches and trades as a taker.  
This is also known as a POST-ONLY order. |

Notes on using parameters for Pegged Orders:

-   These parameters are allowed for `LIMIT`, `LIMIT_MAKER`, `STOP_LOSS_LIMIT`, `TAKE_PROFIT_LIMIT` orders.
-   If `pegPriceType` is specified, `price` becomes optional. Otherwise, it is still mandatory.
-   `pegPriceType=PRIMARY_PEG` means the primary peg, that is the best price on the same side of the order book as your order.
-   `pegPriceType=MARKET_PEG` means the market peg, that is the best price on the opposite side of the order book from your order.
-   Use `pegOffsetType` and `pegOffsetValue` to request a price level other than the best one. These parameters must be specified together.

Other info:

-   Any `LIMIT` or `LIMIT_MAKER` type order can be made an iceberg order by sending an `icebergQty`.
    
-   Any order with an `icebergQty` MUST have `timeInForce` set to `GTC`.
    
-   For `STOP_LOSS`, `STOP_LOSS_LIMIT`, `TAKE_PROFIT_LIMIT` and `TAKE_PROFIT` orders, `trailingDelta` can be combined with `stopPrice`.
    
-   `MARKET` orders using `quoteOrderQty` will not break `LOT_SIZE` filter rules; the order will execute a `quantity` that will have the notional value as close as possible to `quoteOrderQty`. Trigger order price rules against market price for both MARKET and LIMIT versions:
    
-   Price above market price: `STOP_LOSS` `BUY`, `TAKE_PROFIT` `SELL`
    
-   Price below market price: `STOP_LOSS` `SELL`, `TAKE_PROFIT` `BUY`
    

**Data Source:** Matching Engine

**Response - ACK:**

```
{
  "symbol": "BTCUSDT",
  "orderId": 28,
  "orderListId": -1, // Unless it's part of an order list, value will be -1
  "clientOrderId": "6gCrw2kRUAF9CvJDGP16IP",
  "transactTime": 1507725176595
}
```

**Response - RESULT:**

```
{
  "symbol": "BTCUSDT",
  "orderId": 28,
  "orderListId": -1, // Unless it's part of an order list, value will be -1
  "clientOrderId": "6gCrw2kRUAF9CvJDGP16IP",
  "transactTime": 1507725176595,
  "price": "0.00000000",
  "origQty": "10.00000000",
  "executedQty": "10.00000000",
  "origQuoteOrderQty": "0.000000",
  "cummulativeQuoteQty": "10.00000000",
  "status": "FILLED",
  "timeInForce": "GTC",
  "type": "MARKET",
  "side": "SELL",
  "workingTime": 1507725176595,
  "selfTradePreventionMode": "NONE"
}
```

**Response - FULL:**

```
{
  "symbol": "BTCUSDT",
  "orderId": 28,
  "orderListId": -1, // Unless it's part of an order list, value will be -1
  "clientOrderId": "6gCrw2kRUAF9CvJDGP16IP",
  "transactTime": 1507725176595,
  "price": "0.00000000",
  "origQty": "10.00000000",
  "executedQty": "10.00000000",
  "origQuoteOrderQty": "0.000000",
  "cummulativeQuoteQty": "10.00000000",
  "status": "FILLED",
  "timeInForce": "GTC",
  "type": "MARKET",
  "side": "SELL",
  "workingTime": 1507725176595,
  "selfTradePreventionMode": "NONE",
  "fills": [
    {
      "price": "4000.00000000",
      "qty": "1.00000000",
      "commission": "4.00000000",
      "commissionAsset": "USDT",
      "tradeId": 56
    },
    {
      "price": "3999.00000000",
      "qty": "5.00000000",
      "commission": "19.99500000",
      "commissionAsset": "USDT",
      "tradeId": 57
    },
    {
      "price": "3998.00000000",
      "qty": "2.00000000",
      "commission": "7.99600000",
      "commissionAsset": "USDT",
      "tradeId": 58
    },
    {
      "price": "3997.00000000",
      "qty": "1.00000000",
      "commission": "3.99700000",
      "commissionAsset": "USDT",
      "tradeId": 59
    },
    {
      "price": "3995.00000000",
      "qty": "1.00000000",
      "commission": "3.99500000",
      "commissionAsset": "USDT",
      "tradeId": 60
    }
  ]
}
```

**Conditional fields in Order Responses**

There are fields in the order responses (e.g. order placement, order query, order cancellation) that appear only if certain conditions are met.

These fields can apply to order lists.

The fields are listed below:

| Field | Description | Visibility conditions | Examples |
| --- | --- | --- | --- |
| `icebergQty` | Quantity for the iceberg order | Appears only if the parameter `icebergQty` was sent in the request. | `"icebergQty": "0.00000000"` |
| `preventedMatchId` | When used in combination with `symbol`, can be used to query a prevented match. | Appears only if the order expired due to STP. | `"preventedMatchId": 0` |
| `preventedQuantity` | Order quantity that expired due to STP | Appears only if the order expired due to STP. | `"preventedQuantity": "1.200000"` |
| `stopPrice` | Price when the algorithmic order will be triggered | Appears for `STOP_LOSS`. `TAKE_PROFIT`, `STOP_LOSS_LIMIT` and `TAKE_PROFIT_LIMIT` orders. | `"stopPrice": "23500.00000000"` |
| `strategyId` | Can be used to label an order that's part of an order strategy. | Appears if the parameter was populated in the request. | `"strategyId": 37463720` |
| `strategyType` | Can be used to label an order that is using an order strategy. | Appears if the parameter was populated in the request. | `"strategyType": 1000000` |
| `trailingDelta` | Delta price change required before order activation | Appears for Trailing Stop Orders. | `"trailingDelta": 10` |
| `trailingTime` | Time when the trailing order is now active and tracking price changes | Appears only for Trailing Stop Orders. | `"trailingTime": -1` |
| `usedSor` | Field that determines whether order used SOR | Appears when placing orders using SOR | `"usedSor": true` |
| `workingFloor` | Field that determines whether the order is being filled by the SOR or by the order book the order was submitted to. | Appears when placing orders using SOR | `"workingFloor": "SOR"` |
| `pegPriceType` | Price peg type | Only for pegged orders | `"pegPriceType": "PRIMARY_PEG"` |
| `pegOffsetType` | Price peg offset type | Only for pegged orders, if requested | `"pegOffsetType": "PRICE_LEVEL"` |
| `pegOffsetValue` | Price peg offset value | Only for pegged orders, if requested | `"pegOffsetValue": 5` |
| `peggedPrice` | Current price order is pegged at | Only for pegged orders, once determined | `"peggedPrice": "87523.83710000"` |

> Source: [https://developers.binance.com/docs/binance-spot-api-docs/rest-api/trading-endpoints](https://developers.binance.com/docs/binance-spot-api-docs/rest-api/trading-endpoints)
