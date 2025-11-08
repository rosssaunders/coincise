# Get Next Funding Time

Frequency limit: 20 times/1s (IP)

### Description[​](#description "Direct link to Description")

Get the next settlement time of the contract and the settlement period of the contract

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   GET /api/v2/mix/market/funding-time

Request Example

```
curl "https://api.bitget.com/api/v2/mix/market/funding-time?symbol=BTCUSDT&productType=usdt-futures"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| symbol | String | Yes | Trading pair 
| productType | String | Yes | Product type<br><code>USDT-FUTURES</code> USDT-M Futures<br><code>COIN-FUTURES</code> Coin-M Futures<br><code>USDC-FUTURES</code> USDC-M Futures 

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1695796425096,    "data": [        {            "symbol": "BTCUSDT",            "nextFundingTime": "1695801600000",            "ratePeriod": "8"        }    ]}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| &gt; symbol | String | Trading pair name 
| &gt; nextFundingTime | String | Next settlement time(ms) 
| &gt; ratePeriod | String | Rate settlement cycle<br>The unit is hour.

> **Source:** https://www.bitget.com/api-doc/contract/market/Get-Symbol-Next-Funding-Time
