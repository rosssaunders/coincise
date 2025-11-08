# GET / RSI back testing (public)

Source: [https://www.okx.com/docs-v5/en/#order-book-trading-grid-trading-get-rsi-back-testing-public](https://www.okx.com/docs-v5/en/#order-book-trading-grid-trading-get-rsi-back-testing-public)

### GET / RSI back testing (public)

Authentication is not required for this public endpoint.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: IP

#### Permission: Read

#### HTTP Request

`GET /api/v5/tradingBot/public/rsi-back-testing`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| instId | String | Yes | Instrument ID, e.g. `BTC-USDT`  
Only applicable to `SPOT` |
| timeframe | String | Yes | K-line type  
`3m`, `5m`, `15m`, `30m` (`m`: minute)  
`1H`, `4H` (`H`: hour)  
`1D` (`D`: day) |
| thold | String | Yes | Threshold  
The value should be an integer between 1 to 100 |
| timePeriod | String | Yes | Time Period  
`14` |
| triggerCond | String | No | Trigger condition  
`cross_up`  
`cross_down`  
`above`  
`below`  
`cross`  
Default is `cross_down` |
| duration | String | No | Back testing duration  
`1M` (`M`: month)  
Default is `1M` |

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| triggerNum | String | Trigger number |
