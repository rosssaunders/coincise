# GET 【Private】Position Channel

**Source:** [【Private】Position Channel](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Required (Private Endpoint)

## 【Private】Position Channel

Get Position Data

### Pushing Rules

1.  User login required
2.  After subscribing, then the changes will be pushed
3.  10 seconds timed push

### Request

> Request

Copy Success

Copy to Clipboard

`{     "action": "subscribe",     "args":["futures/position"] }`

Message Format:

`{"action":"subscribe","args":["<channel>"]}`

-   actions: `subscribe`
-   channel: Channel name `futures/position`, fixed value

### Response

> Response

Copy Success

Copy to Clipboard

`{   "group": "futures/position",   "data": [     {       "symbol": "BTCUSDT",       "hold_volume": "2000",       "position_type": 1,       "open_type": 1,       "frozen_volume": "0",       "close_volume": "0",       "hold_avg_price": "19406.2092",       "close_avg_price": "0",       "open_avg_price": "19406.2092",       "liquidate_price": "15621.998406",       "create_time": 1662692862255,       "update_time": 1662692862255,       "position_mode": "hedge_mode"     }   ] }`

Return data description:

| Field | Type | Description |
| --- | --- | --- |
| symbol | String | Contract pair (e.g. BTCUSDT) |
| hold\_volume | String | Number of positions |
| position\_type | Int | Position type  
\-`1`\=long  
\-`2`\=short |
| open\_type | Int | Open position type  
\-`1`\=isolated  
\-`2`\=cross |
| frozen\_volume | String | Frozen volume |
| close\_volume | String | Close volume |
| hold\_avg\_price | String | Average price of a position |
| close\_avg\_price | String | Average close price |
| open\_avg\_price | String | Average opening price |
| liquidate\_price | String | Liquidation price |
| create\_time | Long | Position created timestamp (ms) |
| update\_time | Long | Position updated timestamp (ms) |
| position\_mode | String | Position mode  
\-`hedge_mode`  
\-`one_way_mode` |