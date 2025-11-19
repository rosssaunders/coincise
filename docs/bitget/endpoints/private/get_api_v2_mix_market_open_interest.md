# Get Open Interest

Frequency limit: 20 times/1s (IP)

### Description[​](#description "Direct link to Description")

Get the total positions of a certain trading pair on the platform

### HTTP Request[​](#http-request "Direct link to HTTP Request")

-   GET /api/v2/mix/market/open-interest

Request Example

```
curl "https://api.bitget.com/api/v2/mix/market/open-interest?symbol=BTCUSDT&productType=usdt-futures"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| symbol | String | Yes | Trading pair |
| productType | String | Yes | Product type  
`USDT-FUTURES` USDT-M Futures  
`COIN-FUTURES` Coin-M Futures  
`USDC-FUTURES` USDC-M Futures |

Response Example

```json
{
  "code": "00000",
  "msg": "success",
  "requestTime": 1695796780343,
  "data": {
    "openInterestList": [
      {
        "symbol": "BTCUSDT",
        "size": "34278.06"
      }
    ],
    "ts": "1695796781616"
  }
}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| \>ts | String | Milliseconds format of data time Unix timestamp, e.g.  
1672410780000 |
| \>openInterestList | String | Open interest data collection |
| \>\>symbol | String | Trading pair name |
| \>\>size | String | Total open interest of the platform  
Specific coins, eg.: ETH in ETHUSDT |

> **Source:** https://www.bitget.com/api-doc/contract/market/Get-Open-Interest
