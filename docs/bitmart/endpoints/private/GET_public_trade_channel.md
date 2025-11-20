# GET 【Public】Trade Channel

**Source:** [【Public】Trade Channel](https://developer-pro.bitmart.com/en/spot/)

**API Type:** Spot

## Authentication

Required (Private Endpoint)

## 【Public】Trade Channel

Get the latest real-time transaction data

### Pushing Rules

1.  No user login required
2.  After successful subscription, incremental trade messages will be pushed(Taker trade message)
3.  Push frequency: Push when changes

### Subscribe Request

> Subscribe Request

```json
{
  "op": "subscribe",
  "args": [
    "spot/trade:BTC_USDT"
  ]
}
```

Message Format:

```json
{
  "op": "subscribe",
  "args": [
    "spot/trade:<symbol>"
  ]
}
```

-   symbol: Trading pair, such as `BTC_USDT`

### Subscription successful

> Subscription successful

```json
{
  "event": "subscribe",
  "topic": "spot/trade:BTC_USDT"
}
```

```json
{
  "event": "subscribe",
  "topic": "spot/trade:<symbol>"
}
```

### After successful subscription, push data

> Push data

```json
{
  "table": "spot/trade",
  "data": [
    {
      "symbol": "ETH_USDT",
      "price": "162.12",
      "side": "buy",
      "size": "11.085",
      "s_t": 1542337219,
      "ms_t": 1542337219120
    }
  ]
}
```

Return data description:

| Field | Type | Description |
| --- | --- | --- |
| symbol | String | Trading pair, `BTC_USDT` |
| side | String | Side of trade for taker order（`buy` or `sell`） |
| price | String | Trade price for taker order |
| size | String | Trade quantity for taker order |
| s\_t | Long | Order execution time (Timestamp in seconds) (The field will be removed, please use the ms\_t field) |
| ms\_t | Long | Order execution time (Timestamp in millisecond) |