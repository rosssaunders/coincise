# Get Futures Active Long Short Position Data

Rate limit: 1 req/s (IP)

### Description[​](#description "Direct link to Description")

Get Futures Active Long Short Position Data

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   GET /api/v2/mix/market/position-long-short

Request Example

```
curl "https://api.bitget.com/api/v2/mix/market/position-long-short?symbol=BTCUSDT"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| symbol | String | Yes | Trading pair 
| period | String | No | - default:5m, support:<br><code>5m</code><br><code>15m</code><br><code>30m</code><br><code>1h</code><br><code>2h</code><br><code>4h</code><br><code>6h</code><br><code>12h</code><br><code>1d</code> 

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1656589586807,    "data": [        {            "longPositionRatio": "0.01",            "shortPositionRatio": "0.12",            "longShortPositionRatio": "1.2",            "ts": "1714020600000"        },        {            "longPositionRatio": "0.01",            "shortPositionRatio": "0.12",            "longShortPositionRatio": "1.2",            "ts": "1714020600000"        }    ]}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| longPositionRatio | String | Long Position Ratio 
| shortPositionRatio | String | Short Position Ratio 
| longShortPositionRatio | String | Long Short Position Ratio 
| ts | String | Millseconds time

> **Source:** https://www.bitget.com/api-doc/common/apidata/Position-Long-Short
