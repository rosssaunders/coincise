# GET Get Ticker of a Trading Pair (V3)

**Source:** [Get Ticker of a Trading Pair (V3)](https://developer-pro.bitmart.com/en/spot/)

**API Type:** Spot

## Authentication

Not Required (Public Endpoint)

## Get Ticker of a Trading Pair (V3)

`Applicable to query the aggregated market price of a certain trading pair, and return the latest ticker information. Note that the interface is not real-time data, if you need real-time data, please use websocket to subscribe Ticker channel`

#### Request URL

`GET https://api-cloud.bitmart.com/spot/quotation/v3/ticker`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl https://api-cloud.bitmart.com/spot/quotation/v3/ticker?symbol=BTC_USDT`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | Yes | Trading pair (e.g. BMX\_USDT) |

#### Response Data

> Response

`{   "code": 1000,   "trace":"886fb6ae-456b-4654-b4e0-1231",   "message": "success",   "data": {     "symbol": "BTC_USDT",     "last": "30000.00",     "v_24h": "582.08066",     "qv_24h": "4793098.48",     "open_24h": "28596.30",     "high_24h": "31012.44",     "low_24h": "12.44",     "fluctuation": "0.04909",     "bid_px": "30000",     "bid_sz": "1",     "ask_px": "31012.44",     "ask_sz": "69994.75267",     "ts": "1691671061919"   } }`

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

1.If no corresponding trading pair is found, this trading pair has been delisted.  
2.For frequent query needs, we recommend using this endpoint to obtain aggregated ticker for a single trading pair.