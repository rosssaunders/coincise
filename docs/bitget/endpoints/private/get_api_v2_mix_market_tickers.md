# Get All Tickers

Frequency limit: 20 times/1s (IP)

### Description[​](#description "Direct link to Description")

Get all ticker data of the given 'productType'

### HTTP Request[​](#http-request "Direct link to HTTP Request")

-   GET /api/v2/mix/market/tickers

Request Example

```
curl "https://api.bitget.com/api/v2/mix/market/tickers?productType=COIN-FUTURES"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| productType | String | Yes | Product type  
`USDT-FUTURES` USDT-M Futures  
`COIN-FUTURES` Coin-M Futures  
`USDC-FUTURES` USDC-M Futures |

Response Example

```json
{
  "code": "00000",
  "msg": "success",
  "requestTime": 1695794269124,
  "data": [
    {
      "symbol": "BTCUSD",
      "lastPr": "29904.5",
      "askPr": "29904.5",
      "bidPr": "29903.5",
      "bidSz": "0.5091",
      "askSz": "2.2694",
      "high24h": "0",
      "low24h": "0",
      "ts": "1695794271400",
      "change24h": "0",
      "baseVolume": "0",
      "quoteVolume": "0",
      "usdtVolume": "0",
      "openUtc": "0",
      "changeUtc24h": "0",
      "indexPrice": "29132.353333",
      "fundingRate": "-0.0007",
      "holdingAmount": "125.6844",
      "deliveryStartTime": null,
      "deliveryTime": null,
      "deliveryStatus": "delivery_normal",
      "open24h": "0",
      "markPrice": "12345"
    },
    {
      "symbol": "ETHUSD_231229",
      "lastPr": "1829.3",
      "askPr": "1829.8",
      "bidPr": "1829.3",
      "bidSz": "0.054",
      "askSz": "0.785",
      "high24h": "0",
      "low24h": "0",
      "ts": "1695794271400",
      "change24h": "0",
      "baseVolume": "0",
      "quoteVolume": "0",
      "usdtVolume": "0",
      "openUtc": "0",
      "changeUtc24h": "0",
      "indexPrice": "1822.15",
      "fundingRate": "0",
      "holdingAmount": "9488.49",
      "deliveryStartTime": "1693538723186",
      "deliveryTime": "1703836799000",
      "deliveryStatus": "delivery_normal",
      "open24h": "0",
      "markPrice": "1234"
    }
  ]
}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| \> symbol | String | Trading pair name |
| \> lastPr | String | Last price |
| \> askPr | String | Ask price |
| \> bidPr | String | Bid price |
| \> bidSz | String | Buying amount |
| \> askSz | String | Selling amount |
| \> high24h | String | 24h high |
| \> low24h | String | 24h low |
| \> ts | String | Milliseconds format of current data timestamp Unix, e.g. 1597026383085 |
| \> change24h | String | Price increase or decrease (24 hours) |
| \> baseVolume | String | Trading volume of the coin |
| \> quoteVolume | String | Trading volume of quote currency |
| \> usdtVolume | String | Trading volume of USDT |
| \> openUtc | String | UTC0 opening price |
| \> changeUtc24h | String | UTC0 24-hour price increase and decrease |
| \> indexPrice | String | Index price |
| \> fundingRate | String | Funding rate |
| \> holdingAmount | String | Current positions in the unit of number of coins traded. |
| \> open24h | String | Entry price of the last 24 hours  
The opening time is compared on a 24-hour basis. i.e.: Now it is 7:00 PM of the 2nd day of the month, then the corresponding opening time is 7:00 PM of the 1st day of the month. |
| \> deliveryStartTime | String | Delivery start time (only for delivery contracts) |
| \> deliveryTime | String | Delivery time (only for delivery contracts） |
| \> deliveryStatus | String | Delivery status (only for delivery contracts; `delivery_config_period`: Newly listed currency pairs are configured  
`delivery_normal`: Trading normally  
`delivery_before`: 10 minutes before delivery, opening positions are prohibited  
`delivery_period`: Delivery, opening, closing, and canceling orders are prohibited |
| \> markPrice | String | Mark price |

> **Source:** https://www.bitget.com/api-doc/contract/market/Get-All-Symbol-Ticker
