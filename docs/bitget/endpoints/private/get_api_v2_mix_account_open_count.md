# My Estimated Open Count

Frequency limit: 10 times/1s (uid)

### Description[​](#description "Direct link to Description")

The result for the estimated openable quantity does not include current positions and existing orders.

### HTTP Request[​](#http-request "Direct link to HTTP Request")

-   GET /api/v2/mix/account/open-count

Request Example

```
curl "https://api.bitget.com/api/v2/mix/account/open-count?productType=usdt-futures&symbol=ethusdt&marginCoin=USDT&openPrice=23189.5&leverage=20&openAmount=5000" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" 
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| symbol | String | Yes | Trading pair, e.g. ETHUSDT |
| productType | String | Yes | Product type  
`USDT-FUTURES` USDT-M Futures  
`COIN-FUTURES` Coin-M Futures  
`USDC-FUTURES` USDC-M Futures |
| marginCoin | String | Yes | Margin coin |
| openAmount | String | Yes | Margin amount |
| openPrice | String | Yes | Price of the order |
| leverage | String | No | Leverage  
default 20 |

Response Example

```json
{
  "code": "00000",
  "msg": "success",
  "requestTime": 1695812285073,
  "data": {
    "size": "0.47"
  }
}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| size | String | Estimated open size |

> **Source:** https://www.bitget.com/api-doc/contract/account/Est-Open-Count
