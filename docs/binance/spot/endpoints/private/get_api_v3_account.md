## Account information (USER\_DATA)​

```
GET /api/v3/account
```

Get current account information.

**Weight:** 20

**Parameters:**

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| omitZeroBalances | BOOLEAN | NO | When set to `true`, emits only the non-zero balances of an account.  
Default value: `false` |
| recvWindow | DECIMAL | NO | The value cannot be greater than `60000`.  
Supports up to three decimal places of precision (e.g., 6000.346) so that microseconds may be specified. |
| timestamp | LONG | YES |  |

**Data Source:** Memory => Database

**Response:**

```
{  "makerCommission": 15,  "takerCommission": 15,  "buyerCommission": 0,  "sellerCommission": 0,  "commissionRates": {    "maker": "0.00150000",    "taker": "0.00150000",    "buyer": "0.00000000",    "seller": "0.00000000"  },  "canTrade": true,  "canWithdraw": true,  "canDeposit": true,  "brokered": false,  "requireSelfTradePrevention": false,  "preventSor": false,  "updateTime": 123456789,  "accountType": "SPOT",  "balances": [    {      "asset": "BTC",      "free": "4723846.89208129",      "locked": "0.00000000"    },    {      "asset": "LTC",      "free": "4763368.68006011",      "locked": "0.00000000"    }  ],  "permissions": [    "SPOT"  ],  "uid": 354937868}
```

> Source: [https://developers.binance.com/docs/binance-spot-api-docs/rest-api/account-endpoints](https://developers.binance.com/docs/binance-spot-api-docs/rest-api/account-endpoints)
