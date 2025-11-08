## Query Commission Rates (USER\_DATA)​

```
GET /api/v3/account/commission
```

Get current account commission rates.

**Weight:** 20

**Parameters:**

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| symbol | STRING | YES |  |

**Data Source:** Database

**Response:**

```
{  "symbol": "BTCUSDT",  "standardCommission": {         //Commission rates on trades from the order.    "maker": "0.00000010",    "taker": "0.00000020",    "buyer": "0.00000030",    "seller": "0.00000040"  },  "specialCommission": {         // Special commission rates from the order.    "maker": "0.01000000",    "taker": "0.02000000",    "buyer": "0.03000000",    "seller": "0.04000000"  },  "taxCommission": {              //Tax commission rates for trades from the order.    "maker": "0.00000112",    "taker": "0.00000114",    "buyer": "0.00000118",    "seller": "0.00000116"  },  "discount": {                   //Discount commission when paying in BNB    "enabledForAccount": true,    "enabledForSymbol": true,    "discountAsset": "BNB",    "discount": "0.75000000"      //Standard commission is reduced by this rate when paying commission in BNB.  }}
```

> Source: [https://developers.binance.com/docs/binance-spot-api-docs/rest-api/account-endpoints](https://developers.binance.com/docs/binance-spot-api-docs/rest-api/account-endpoints)
