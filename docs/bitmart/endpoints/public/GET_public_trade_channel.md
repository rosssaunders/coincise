# GET 【Public】Trade Channel

**Source:**
[【Public】Trade Channel](https://developer-pro.bitmart.com/en/futuresv2/)

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

```json
{
  "action": "subscribe",
  "args": ["futures/trade:BTCUSDT"]
}
```

Message Format:

```json
{
  "action": "subscribe",
  "args": ["<channel:symbol>", "<channel:symbol>"]
}
```

- actions: `subscribe`
- channel: Channel name `futures/trade`, fixed value
- symbol: Trading pair, such as `BTCUSDT`

### Response

> Response

```json
{
  "group": "futures/trade:BTCUSDT",
  "data": [
    {
      "trade_id": 1409495322,
      "symbol": "BTCUSDT",
      "deal_price": "117387.58",
      "deal_vol": "1445",
      "m": true,
      "created_at": "2023-02-24T07:54:11.124940968Z"
    }
  ]
}
```

Return data description:

| Field      | Type   | Description  |
| ---------- | ------ | ------------ |
| symbol     | String | symbol       |
| deal_price | String | deal price   |
| trade_id   | Long   | trade id     |
| deal_vol   | String | deal vol     |
| way        | Int    | Trading type |

\-`1`\=buy_open_long sell_open_short  
\-`2`\=buy_open_long sell_close_long  
\-`3`\=buy_close_short sell_open_short  
\-`4`\=buy_close_short sell_close_long  
\-`5`\=sell_open_short buy_open_long  
\-`6`\=sell_open_short buy_close_short  
\-`7`\=sell_close_long buy_open_long  
\-`8`\=sell_close_long buy_close_short | | m | Bool | \-`true`\=buyer is maker  
\-`false`\=seller is maker | | created_at | String | transaction create time(ms)
|
