# Get Recent Transactions

Frequency limit: 20 times/1s (IP)

### Description[​](#description "Direct link to Description")

Get the record of last 100 transactions

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   GET /api/v2/mix/market/fills

Request Example

```
curl "https://api.bitget.com/api/v2/mix/market/fills?symbol=BTCUSDT&productType=usdt-futures"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| symbol | String | Yes | Trading pair 
| productType | String | Yes | Product type<br><code>USDT-FUTURES</code> USDT-M Futures<br><code>COIN-FUTURES</code> Coin-M Futures<br><code>USDC-FUTURES</code> USDC-M Futures 
| limit | String | No | Number of queries: Default: 100, maximum: 100 

Response Example

```
{    "code": "00000",    "data": [        {            "tradeId": "1",            "price": "29990.5",            "size": "0.0166",            "side": "sell",            "ts": "1627116776464",            "symbol": "BTCUSDT"        },        {            "tradeId": "2",            "price": "30007.0",            "size": "0.0166",            "side": "buy",            "ts": "1627116600875",            "symbol": "BTCUSDT"        }    ],    "msg": "success",    "requestTime": 1690313813709}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| &gt;&gt; tradeId | String | Transaction ID 
| &gt;&gt; price | String | Price 
| &gt;&gt; size | String | Quantity 
| &gt;&gt; side | String | Direction 
| &gt;&gt; ts | String | Milliseconds format of current data timestamp Unix, e.g. 1597026383085 
| &gt;&gt; symbol | String | Trading Pair name e.g. ETHUSDT

> **Source:** https://www.bitget.com/api-doc/contract/market/Get-Recent-Fills
