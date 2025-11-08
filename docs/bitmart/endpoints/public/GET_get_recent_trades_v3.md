# GET Get Recent Trades (V3)

**Source:** [Get Recent Trades (V3)](https://developer-pro.bitmart.com/en/spot/)

**API Type:** Spot

## Authentication

Not Required (Public Endpoint)

## Get Recent Trades (V3)

`Get the latest trade records of the specified trading pair. Note that the interface is not real-time data, if you need real-time data, please use websocket to subscribe Trade channel`

#### Request URL

`GET https://api-cloud.bitmart.com/spot/quotation/v3/trades`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl https://api-cloud.bitmart.com/spot/quotation/v3/trades?symbol=BMX_ETH&limit=10`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | Yes | Trading pair (e.g. `BMX_USDT`) |
| limit | Int | No | Number of returned items, maximum is 50, default 50 |

#### Response Data

> Response

`{   "code": 1000,   "trace":"886fb6ae-456b-4654-b4e0-1231",   "message": "success",   "data": [     [       "BMX_ETH", // symbol       "1691743270994", // ts       "1.00000000", // price       "1.0", // size       "sell" // side     ]   ] }`

| Field | Type | Description |
| --- | --- | --- |
| symbol | String | Trading pair |
| ts | String | Trade time (in milliseconds) |
| price | String | Trade price |
| size | String | Trade number |
| side | String | Order Side  
\- `buy`  
\- `sell` |