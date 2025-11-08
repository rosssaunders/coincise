# Get Futures Active Buy Sell Volume Data

Rate limit: 1 req/s (IP)

### Description[​](#description "Direct link to Description")

Get Futures Active Buy Sell Volume Data

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   GET /api/v2/mix/market/taker-buy-sell

Request Example

```
curl "https://api.bitget.com/api/v2/mix/market/taker-buy-sell?symbol=BTCUSDT"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| symbol | String | Yes | Trading pair 
| period | String | No | - default:5m, support:<br><code>5m</code><br><code>15m</code><br><code>30m</code><br><code>1h</code><br><code>2h</code><br><code>4h</code><br><code>6h</code><br><code>12h</code><br><code>1d</code> 

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1656589586807,    "data": [        {            "buyVolume": "0.01",            "sellVolume": "0.12",            "ts": "1714020600000"        },        {            "buyVolume": "0.01",            "sellVolume": "0.12",            "ts": "1714020600000"        }    ]}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| sellVolume | String | Sell Volume 
| buyVolume | String | Buy volume 
| ts | String | Millseconds time

> **Source:** https://www.bitget.com/api-doc/common/apidata/Taker-Buy-Sell
