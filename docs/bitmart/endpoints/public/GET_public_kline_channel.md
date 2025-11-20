# GET 【Public】KLine Channel

**Source:** [【Public】KLine Channel](https://developer-pro.bitmart.com/en/spot/)

**API Type:** Spot

## Authentication

Not Required (Public Endpoint)

## 【Public】KLine Channel

Get the spot K-line data

### Pushing Rules

1.  No user login required
2.  After subscribing, the current data will be returned directly, and then the changes will be pushed
3.  Push frequency: The fastest is 500ms once

### Subscribe Request

> Subscribe Request

```json
{
  "op": "subscribe",
  "args": [
    "spot/kline1m:BTC_USDT"
  ]
}
```

Message Format:

```json
{
  "op": "subscribe",
  "args": [
    "<channel>:<symbol>"
  ]
}
```

-   channel: Channel name, such as `spot/kline1m`
-   symbol: Trading pair, such as `BTC_USDT`

#### Parameters Channel Name List

| Channel Name | Description |
| --- | --- |
| spot/kline1m | 1-min KLine Channel |
| spot/kline5m | 5-min KLine Channel |
| spot/kline15m | 15-min KLine Channel |
| spot/kline30m | 30-min KLine Channel |
| spot/kline1H | 1-hour KLine Channel |
| spot/kline2H | 2-hour KLine Channel |
| spot/kline4H | 4-hour KLine Channel |
| spot/kline1D | 1-day KLine Channel |
| spot/kline1W | 1-week KLine Channel |
| spot/kline1M | 1-month KLine Channel |

### Subscription successful

> Subscription successful

```json
{
  "topic": "spot/kline1m:BTC_USDT",
  "event": "subscribe"
}
```

```json
{
  "event": "subscribe",
  "topic": "<channel>:<symbol>"
}
```

### After successful subscription, push data

> Push data

```json
{
  "data": [
    {
      "candle": [
        1709025360,
        "162.01",
        "162.02",
        "162.03",
        "162.04",
        "336.452694"
      ],
      "symbol": "BTC_USDT"
    }
  ],
  "table": "spot/kline1m"
}
```

Return data description:

| Field | Type | Description |
| --- | --- | --- |
| symbol | String | Trading pair, `BTC_USDT` |
| candle | List | KLine data |

An example of returned KLine values: \[1709025360, "162.01", "162.02", "162.03", "162.04", "336.452694"\]. Open time (in seconds), opening price, highest price, lowest price, closing price, trading volume.