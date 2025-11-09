# GET 【Public】Ticker Channel

**Source:**
[【Public】Ticker Channel](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Not Required (Public Endpoint)

## 【Public】Ticker Channel

Get the latest transaction price, bid one price, ask for one price, and 24
trading volumes of all perpetual contracts on the platform

### Pushing Rules

1.  No user login required
2.  After subscribing, then the changes will be pushed
3.  Sent once in 1 second after subscription

### Request

> Request

`{   "action":"subscribe",   "args":["futures/ticker:BTCUSDT"] }`

Message Format:

`{"action":"subscribe","args":["<channel>:<symbol>"]}`

- actions: `subscribe`
- channel: Channel name `futures/ticker`, fixed value
- symbol: Trading pair, such as `BTCUSDT`

### Response

> Response

`{     "data": {         "symbol": "BTCUSDT",         "last_price": "97153.6",         "volume_24": "25502894",         "range": "0.0016599204475393",         "mark_price": "97153.7",         "index_price": "97185.614",         "ask_price": "97153.9",         "ask_vol": "28",         "bid_price": "97153.4",         "bid_vol": "428"     },     "group": "futures/ticker:BTCUSDT" }`

Return data description:

| Field       | Type   | Description                          |
| ----------- | ------ | ------------------------------------ |
| symbol      | String | Symbol of the contract(like BTCUSDT) |
| last_price  | String | Latest Price                         |
| volume_24   | String | Volume of 24-hour transactions       |
| range       | String | Up or Down                           |
| mark_price  | String | Mark Price                           |
| index_price | String | Index Price                          |
| ask_price   | String | Sell depths first price              |
| ask_vol     | String | Sell depths first vol                |
| bid_price   | String | Buy depths first price               |
| bid_vol     | String | Buy depths first vol                 |
