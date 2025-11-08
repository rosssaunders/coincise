## Test new order using SOR (TRADE)​

```
POST /api/v3/sor/order/test
```

Test new order creation and signature/recvWindow using smart order routing (SOR). Creates and validates a new order but does not send it into the matching engine.

**Weight:**

| Condition | Request Weight |
| --- | --- |
| Without `computeCommissionRates` | 1 |
| With `computeCommissionRates` | 20 |

**Parameters:**

In addition to all parameters accepted by [`POST /api/v3/sor/order`](/docs/binance-spot-api-docs/rest-api/trading-endpoints#new-order-using-sor-trade), the following optional parameters are also accepted:

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| computeCommissionRates | BOOLEAN | NO | Default: `false` |

**Data Source:** Memory

**Response:**

Without `computeCommissionRates`

```
{}
```

With `computeCommissionRates`

```
{  "standardCommissionForOrder": {  //Standard commission rates on trades from the order.    "maker": "0.00000112",    "taker": "0.00000114"  },  "taxCommissionForOrder": {       //Tax commission rates for trades from the order    "maker": "0.00000112",    "taker": "0.00000114"  },  "discount": {                    //Discount on standard commissions when paying in BNB.    "enabledForAccount": true,    "enabledForSymbol": true,    "discountAsset": "BNB",    "discount": "0.25000000"       //Standard commission is reduced by this rate when paying commission in BNB.  }}
```

> Source: [https://developers.binance.com/docs/binance-spot-api-docs/rest-api/trading-endpoints](https://developers.binance.com/docs/binance-spot-api-docs/rest-api/trading-endpoints)
