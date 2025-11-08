# GET Get Ticker of All Pairs (V3)

**Source:** [Get Ticker of All Pairs (V3)](https://developer-pro.bitmart.com/en/spot/)

**API Type:** Spot

## Authentication

Not Required (Public Endpoint)

## Get Ticker of All Pairs (V3)

`Get all trading pairs with a volume greater than 0 within 24 hours. Market data includes: latest transaction price, best bid price, best ask price and 24-hour transaction volume snapshot information. Note that the interface is not real-time data, if you need real-time data, please use websocket to subscribe Ticker channel`

#### Request URL

`GET https://api-cloud.bitmart.com/spot/quotation/v3/tickers`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

Copy Success

Copy to Clipboard

`` curl https://api-cloud.bitmart.com/spot/quotation/v3/tickers` ``

None

#### Response Data

> Response

Copy Success

Copy to Clipboard

`{   "code": 1000,   "trace":"886fb6ae-456b-4654-b4e0-1231",   "message": "success",   "data": [     [       "BTC_USDT",  // symbol       "30000.00",  // last       "582.08066", // v_24h       "4793098.48", // qv_24h       "28596.30", // open_24h       "31012.44", // high_24h       "12.44", // low_24h       "0.04909", // fluctuation       "30000", // bid_px       "1",  // bid_sz       "31012.44",  // ask_px       "69994.75267", // ask_sz       "1691671091933" // ts     ],     [       "ETH_USDT",       "1840.00",       "2.00000",       "3680.00",       "1842.18",       "1842.18",       "1840.00",       "-0.00118",       "1812.35",       "4.61989",       "1859.34",       "4.07793",       "1691671094213"     ]   ] }`

| Field | Type | Description |
| --- | --- | --- |
| symbol | String | Trading pair |
| last | String | Latest price |
| v\_24h | String | 24-hour trade volume in base currency |
| qv\_24h | String | 24-hour trade volume in quote currency |
| open\_24h | String | 24-hour open price |
| high\_24h | String | 24-hour highest price |
| low\_24h | String | 24-hour lowest price |
| fluctuation | String | 24-hour price change |
| bid\_px | String | top buy price |
| bid\_sz | String | Size of top buy order |
| ask\_px | String | top sell price |
| ask\_sz | String | Size of top sell order |
| ts | String | Time of generation(in milliseconds) |