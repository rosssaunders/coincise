# GET 【Public】Individual Symbol Book Ticker Channel

**Source:** [【Public】Individual Symbol Book Ticker Channel](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Not Required (Public Endpoint)

## 【Public】Individual Symbol Book Ticker Channel

Pushes any update to the best bid or ask's price or quantity in real-time for a specified symbol

### Pushing Rules

1.  No user login required
2.  After subscribing, then the changes will be pushed
3.  Real-time push

### Request

> Request

```json
{
  "action": "subscribe",
  "args": [
    "futures/bookticker:BTCUSDT"
  ]
}
```

Message Format:

```json
{
  "action": "subscribe",
  "args": [
    "<channel:symbol>"
  ]
}
```

-   actions: `subscribe`
-   channel: Channel name, such as `futures/bookticker`
-   symbol: Trading pair, such as `BTCUSDT`

### Response

> Response

```json
{
  "data": {
    "symbol": "BTCUSDT",
    "best_bid_price": "97315",
    "best_bid_vol": "156",
    "best_ask_price": "97315.4",
    "best_ask_vol": "333",
    "ms_t": 1733891542244
  },
  "group": "futures/bookticker:BTCUSDT"
}
```

Return data description:

| Field | Type | Description |
| --- | --- | --- |
| symbol | String | Symbol of the contract(like `BTCUSDT`) |
| best\_bid\_price | String | Best bid price |
| best\_bid\_vol | String | Best bid volume |
| best\_ask\_price | String | Best ask price |
| best\_ask\_vol | String | Best ask volume |
| ms\_t | Long | Data push timestamp (in millisecond) |

* * *