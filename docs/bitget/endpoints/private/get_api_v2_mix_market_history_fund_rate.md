# Get Historical Funding Rates

Frequency limit: 20 times/1s (IP)

### Description[​](#description "Direct link to Description")

Get the historical funding rate of the contract

### HTTP Request[​](#http-request "Direct link to HTTP Request")

-   GET /api/v2/mix/market/history-fund-rate

Request Example

```
curl "https://api.bitget.com/api/v2/mix/market/history-fund-rate?symbol=BTCUSDT&productType=usdt-futures"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| symbol | String | Yes | Trading pair |
| productType | String | Yes | Product type  
`USDT-FUTURES` USDT-M Futures  
`COIN-FUTURES` Coin-M Futures  
`USDC-FUTURES` USDC-M Futures |
| pageSize | String | No | Number of queries: Default: 20, maximum: 100. |
| pageNo | String | No | page number |

Response Example

```json
{
  "code": "00000",
  "msg": "success",
  "requestTime": 1695796546319,
  "data": [
    {
      "symbol": "BTCUSDT",
      "fundingRate": "0.0005",
      "fundingTime": "1695776400000"
    },
    {
      "symbol": "BTCUSDT",
      "fundingRate": "0.000013",
      "fundingTime": "1695715200000"
    }
  ]
}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| \>symbol | String | Trading pair name |
| \>fundingRate | String | Funding rate |
| \>fundingTime | String | Settlement time |

> **Source:** https://www.bitget.com/api-doc/contract/market/Get-History-Funding-Rate
