# GET Get Depth (V3)

**Source:** [Get Depth (V3)](https://developer-pro.bitmart.com/en/spot/)

**API Type:** Spot

## Authentication

Not Required (Public Endpoint)

## Get Depth (V3)

`Get full depth of trading pairs. Note that the interface is not real-time data, if you need real-time data, please use websocket to subscribe Depth channel`

#### Request URL

`GET https://api-cloud.bitmart.com/spot/quotation/v3/books`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl https://api-cloud.bitmart.com/spot/quotation/v3/books?symbol=BTC_USDT&limit=1`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | Yes | Trading pair (e.g. `BMX_USDT`) |
| limit | Int | No | Order book depth per side. Maximum 50, e.g. 50 bids + 50 asks. Default returns to 35 depth data, e.g. 35 bids + 35 asks. |

#### Response Data

> Response

`{   "code": 1000,   "trace":"886fb6ae-456b-4654-b4e0-1231",   "message": "success",   "data": {     "ts": "1691672864874",     "symbol": "BTC_USDT",     "asks": [       [         "31012.44",  // price         "69994.75267"  // amount       ]     ],     "bids": [       [         "30000.00", // price         "1.00000"  // amount       ]     ]   } }`

| Field | Type | Description |
| --- | --- | --- |
| ts | String | Create time(Timestamp in milliseconds) |
| symbol | String | Trading pair |
| asks | List\[\] | Order book on sell side |
| bids | List\[\] | Order book on buy side |
| amount | String | Total number of current price depth |
| price | String | The price at current depth |