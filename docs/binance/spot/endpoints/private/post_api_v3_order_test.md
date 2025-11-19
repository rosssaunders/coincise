## Test new order (TRADE)​

```
POST /api/v3/order/test
```

Test new order creation and signature/recvWindow long. Creates and validates a new order but does not send it into the matching engine.

**Weight:**

| Condition | Request Weight |
| --- | --- |
| Without `computeCommissionRates` | 1 |
| With `computeCommissionRates` | 20 |

**Parameters:**

In addition to all parameters accepted by [`POST /api/v3/order`](/docs/binance-spot-api-docs/rest-api/trading-endpoints#new-order-trade), the following optional parameters are also accepted:

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| computeCommissionRates | BOOLEAN | NO | Default: `false`  
See [Commissions FAQ](/docs/binance-spot-api-docs/faqs/commission_faq#test-order-diferences) to learn more. |

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
  "specialCommissionForOrder": {    //Special commission rates on trades from the order.
    "maker": "0.05000000",
    "taker": "0.06000000"
  },
  "taxCommissionForOrder": {       //Tax commission rates for trades from the order.
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

> Source: [https://developers.binance.com/docs/binance-spot-api-docs/rest-api/trading-endpoints](https://developers.binance.com/docs/binance-spot-api-docs/rest-api/trading-endpoints)
