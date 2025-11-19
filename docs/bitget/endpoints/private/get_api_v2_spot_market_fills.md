# Get Recent Trades

Frequency limit: 10 times/1s (IP)

### Description[​](#description "Direct link to Description")

Get Recent Trades

### HTTP Request[​](#http-request "Direct link to HTTP Request")

-   GET /api/v2/spot/market/fills

Request Example

```
curl "https://api.bitget.com/api/v2/spot/market/fills?symbol=BTCUSDT&limit=100"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| symbol | String | Yes | Trading pair name, e.g. BTCUSDT |
| limit | String | No | Default: 100, maximum: 500 |

Response Example

```json
{
  "code": "00000",
  "msg": "success",
  "requestTime": 1695808949356,
  "data": [
    {
      "symbol": "BFTUSDT",
      "tradeId": "1",
      "side": "buy",
      "price": "2.38735",
      "size": "2470.6224",
      "ts": "1622097282536"
    },
    {
      "symbol": "BFTUSDT",
      "tradeId": "2",
      "side": "sell",
      "price": "2.38649",
      "size": "3239.7976",
      "ts": "1622097280642"
    }
  ]
}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| symbol | String | Trading pair |
| tradeId | String | Order ID  
Descending |
| side | String | Direction  
Buy  
Sell |
| price | String | Order price |
| size | String | Filled quantity |
| ts | String | Transaction time, Unix millisecond timestamp, e.g. 1690196141868 |

> **Source:** https://www.bitget.com/api-doc/spot/market/Get-Recent-Trades
