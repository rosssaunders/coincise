# GET 【Private】Position Channel

**Source:**
[【Private】Position Channel](https://developer-pro.bitmart.com/en/futuresv2/)

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

```json
{
  "action": "subscribe",
  "args": ["futures/position"]
}
```

Message Format:

```json
{
  "action": "subscribe",
  "args": ["<channel>"]
}
```

- actions: `subscribe`
- channel: Channel name `futures/position`, fixed value

### Response

> Response

```json
{
  "group": "futures/position",
  "data": [
    {
      "symbol": "BTCUSDT",
      "hold_volume": "2000",
      "position_type": 1,
      "open_type": 1,
      "frozen_volume": "0",
      "close_volume": "0",
      "hold_avg_price": "19406.2092",
      "close_avg_price": "0",
      "open_avg_price": "19406.2092",
      "liquidate_price": "15621.998406",
      "create_time": 1662692862255,
      "update_time": 1662692862255,
      "position_mode": "hedge_mode"
    }
  ]
}
```

Return data description:

| Field         | Type   | Description                  |
| ------------- | ------ | ---------------------------- |
| symbol        | String | Contract pair (e.g. BTCUSDT) |
| hold_volume   | String | Number of positions          |
| position_type | Int    | Position type                |

\-`1`\=long  
\-`2`\=short | | open_type | Int | Open position type  
\-`1`\=isolated  
\-`2`\=cross | | frozen_volume | String | Frozen volume | | close_volume |
String | Close volume | | hold_avg_price | String | Average price of a position
| | close_avg_price | String | Average close price | | open_avg_price | String |
Average opening price | | liquidate_price | String | Liquidation price | |
create_time | Long | Position created timestamp (ms) | | update_time | Long |
Position updated timestamp (ms) | | position_mode | String | Position mode  
\-`hedge_mode`  
\-`one_way_mode` |
