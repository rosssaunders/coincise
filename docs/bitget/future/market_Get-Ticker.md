# Get Ticker

Frequency limit: 20 times/1s (IP)

### Description[​](#description "Direct link to Description")

Get ticker data of the given 'productType' and 'symbol'

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   GET /api/v2/mix/market/ticker

Request Example

```
curl "https://api.bitget.com/api/v2/mix/market/ticker?productType=COIN-FUTURES&symbol=ETHUSDM24"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| symbol | String | Yes | Trading pair 
| productType | String | Yes | Product type<br><code>USDT-FUTURES</code> USDT-M Futures<br><code>COIN-FUTURES</code> Coin-M Futures<br><code>USDC-FUTURES</code> USDC-M Futures 

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1695794095685,    "data": [        {            "symbol": "ETHUSD_231229",            "lastPr": "1829.3",            "askPr": "1829.8",            "bidPr": "1829.3",            "bidSz": "0.054",            "askSz": "0.785",            "high24h": "0",            "low24h": "0",            "ts": "1695794098184",            "change24h": "0",            "baseVolume": "0",            "quoteVolume": "0",            "usdtVolume": "0",            "openUtc": "0",            "changeUtc24h": "0",            "indexPrice": "1822.15",            "fundingRate": "0",            "holdingAmount": "9488.49",            "deliveryStartTime": "1693538723186",            "deliveryTime": "1703836799000",            "deliveryStatus": "delivery_normal",            "open24h": "0",            "markPrice": "1829"        }    ]}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| &gt; symbol | String | Trading pair name 
| &gt; lastPr | String | Last price 
| &gt; askPr | String | Ask price 
| &gt; bidPr | String | Bid price 
| &gt; bidSz | String | Buying amount 
| &gt; askSz | String | Selling amount 
| &gt; high24h | String | 24h high 
| &gt; low24h | String | 24h low 
| &gt; ts | String | Milliseconds format of current data timestamp Unix, e.g. 1597026383085 
| &gt; change24h | String | Price increase or decrease (24 hours) 
| &gt; baseVolume | String | Trading volume of the coin 
| &gt; quoteVolume | String | Trading volume of quote currency 
| &gt; usdtVolume | String | Trading volume of USDT 
| &gt; openUtc | String | UTC0 opening price 
| &gt; changeUtc24h | String | UTC0 24-hour price increase and decrease 
| &gt; indexPrice | String | Index price 
| &gt; fundingRate | String | Funding rate 
| &gt; holdingAmount | String | Current holding positions(base coin) 
| &gt; open24h | String | Entry price of the last 24 hours<br>The opening time is compared on a 24-hour basis. i.e.: Now it is 7:00 PM of the 2nd day of the month, then the corresponding opening time is 7:00 PM of the 1st day of the month. 
| &gt; deliveryStartTime | String | Delivery start time (only for delivery contracts) 
| &gt; deliveryTime | String | Delivery time (only for delivery contracts） 
| &gt; deliveryStatus | String | Delivery status (only for delivery contracts; <code>delivery_config_period</code>: Newly listed currency pairs are configured<br><code>delivery_normal</code>: Trading normally<br><code>delivery_before</code>: 10 minutes before delivery, opening positions are prohibited<br><code>delivery_period</code>: Delivery, opening, closing, and canceling orders are prohibited 
| &gt; markPrice | String | Mark price

> **Source:** https://www.bitget.com/api-doc/contract/market/Get-Ticker
