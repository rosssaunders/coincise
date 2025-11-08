# GET 【Public】Trade Channel

**Source:** [【Public】Trade Channel](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Not Required (Public Endpoint)

## 【Public】Trade Channel

Get trade data

### Pushing Rules

1.  No user login required
2.  After subscribing, then the changes will be pushed

### Request

> Request

Copy Success

Copy to Clipboard

`{   "action":"subscribe",   "args":["futures/trade:BTCUSDT"] }`

Message Format:

`{"action":"subscribe","args":["<channel:symbol>","<channel:symbol>"]}`

-   actions: `subscribe`
-   channel: Channel name `futures/trade`, fixed value
-   symbol: Trading pair, such as `BTCUSDT`

### Response

> Response

Copy Success

Copy to Clipboard

`{   "group":"futures/trade:BTCUSDT",   "data":[{     "trade_id":1409495322,     "symbol":"BTCUSDT",     "deal_price":"117387.58",     "deal_vol":"1445",     "m":true,     "created_at":"2023-02-24T07:54:11.124940968Z"   }] }`

Return data description:

| Field | Type | Description |
| --- | --- | --- |
| symbol | String | symbol |
| deal\_price | String | deal price |
| trade\_id | Long | trade id |
| deal\_vol | String | deal vol |
| way | Int | Trading type  
\-`1`\=buy\_open\_long sell\_open\_short  
\-`2`\=buy\_open\_long sell\_close\_long  
\-`3`\=buy\_close\_short sell\_open\_short  
\-`4`\=buy\_close\_short sell\_close\_long  
\-`5`\=sell\_open\_short buy\_open\_long  
\-`6`\=sell\_open\_short buy\_close\_short  
\-`7`\=sell\_close\_long buy\_open\_long  
\-`8`\=sell\_close\_long buy\_close\_short |
| m | Bool | \-`true`\=buyer is maker  
\-`false`\=seller is maker |
| created\_at | String | transaction create time(ms) |