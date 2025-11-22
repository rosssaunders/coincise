## SOR​

##### New order using SOR (TRADE)

```
POST /api/v3/sor/order
```

Places an order using smart order routing (SOR).

This adds 1 order to the `EXCHANGE_MAX_ORDERS` filter and the `MAX_NUM_ORDERS`
filter.

Read [SOR FAQ](/docs/binance-spot-api-docs/faqs/sor_faq) to learn more.

**Weight:** 1

**Unfilled Order Count:** 1

**Parameters:**

| Name                                                                                                                                | Type    | Mandatory | Description                                                                                                                                                     |
| ----------------------------------------------------------------------------------------------------------------------------------- | ------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol                                                                                                                              | STRING  | YES       |                                                                                                                                                                 |
| side                                                                                                                                | ENUM    | YES       |                                                                                                                                                                 |
| type                                                                                                                                | ENUM    | YES       |                                                                                                                                                                 |
| timeInForce                                                                                                                         | ENUM    | NO        |                                                                                                                                                                 |
| quantity                                                                                                                            | DECIMAL | YES       |                                                                                                                                                                 |
| price                                                                                                                               | DECIMAL | NO        |                                                                                                                                                                 |
| newClientOrderId                                                                                                                    | STRING  | NO        | A unique id among open orders. Automatically generated if not sent.                                                                                             |
| Orders with the same `newClientOrderID` can be accepted only when the previous one is filled, otherwise the order will be rejected. |
| strategyId                                                                                                                          | LONG    | NO        |                                                                                                                                                                 |
| strategyType                                                                                                                        | INT     | NO        | The value cannot be less than `1000000`.                                                                                                                        |
| icebergQty                                                                                                                          | DECIMAL | NO        | Used with `LIMIT` to create an iceberg order.                                                                                                                   |
| newOrderRespType                                                                                                                    | ENUM    | NO        | Set the response JSON. `ACK`, `RESULT`, or `FULL`. Default to `FULL`                                                                                            |
| selfTradePreventionMode                                                                                                             | ENUM    | NO        | The allowed enums is dependent on what is configured on the symbol. The possible supported values are: [STP Modes](/docs/binance-spot-api-docs/enums#stpmodes). |
| recvWindow                                                                                                                          | DECIMAL | NO        | The value cannot be greater than `60000`.                                                                                                                       |
| Supports up to three decimal places of precision (e.g., 6000.346) so that microseconds may be specified.                            |
| timestamp                                                                                                                           | LONG    | YES       |                                                                                                                                                                 |

**Note:** `POST /api/v3/sor/order` only supports `LIMIT` and `MARKET` orders.
`quoteOrderQty` is not supported.

**Data Source:** Matching Engine

**Response:**

```
{
  "symbol": "BTCUSDT",
  "orderId": 2,
  "orderListId": -1,
  "clientOrderId": "sBI1KM6nNtOfj5tccZSKly",
  "transactTime": 1689149087774,
  "price": "31000.00000000",
  "origQty": "0.50000000",
  "executedQty": "0.50000000",
  "origQuoteOrderQty": "0.000000",
  "cummulativeQuoteQty": "14000.00000000",
  "status": "FILLED",
  "timeInForce": "GTC",
  "type": "LIMIT",
  "side": "BUY",
  "workingTime": 1689149087774,
  "fills": [
    {
      "matchType": "ONE_PARTY_TRADE_REPORT",
      "price": "28000.00000000",
      "qty": "0.50000000",
      "commission": "0.00000000",
      "commissionAsset": "BTC",
      "tradeId": -1,
      "allocId": 0
    }
  ],
  "workingFloor": "SOR",
  "selfTradePreventionMode": "NONE",
  "usedSor": true
}
```

##### Test new order using SOR (TRADE)

```
POST /api/v3/sor/order/test
```

Test new order creation and signature/recvWindow using smart order routing
(SOR). Creates and validates a new order but does not send it into the matching
engine.

**Weight:**

| Condition                        | Request Weight |
| -------------------------------- | -------------- |
| Without `computeCommissionRates` | 1              |
| With `computeCommissionRates`    | 20             |

**Parameters:**

In addition to all parameters accepted by
[`POST /api/v3/sor/order`](/docs/binance-spot-api-docs/rest-api/trading-endpoints#new-order-using-sor-trade),
the following optional parameters are also accepted:

| Name                   | Type    | Mandatory | Description      |
| ---------------------- | ------- | --------- | ---------------- |
| computeCommissionRates | BOOLEAN | NO        | Default: `false` |

**Data Source:** Memory

**Response:**

Without `computeCommissionRates`

```
{}
```

With `computeCommissionRates`

```
{
  "standardCommissionForOrder": {  //Standard commission rates on trades from the order.
    "maker": "0.00000112",
    "taker": "0.00000114"
  },
  "taxCommissionForOrder": {       //Tax commission rates for trades from the order
    "maker": "0.00000112",
    "taker": "0.00000114"
  },
  "discount": {                    //Discount on standard commissions when paying in BNB.
    "enabledForAccount": true,
    "enabledForSymbol": true,
    "discountAsset": "BNB",
    "discount": "0.25000000"       //Standard commission is reduced by this rate when paying commission in BNB.
  }
}
```

> Source:
> [https://developers.binance.com/docs/binance-spot-api-docs/rest-api/trading-endpoints](https://developers.binance.com/docs/binance-spot-api-docs/rest-api/trading-endpoints)
