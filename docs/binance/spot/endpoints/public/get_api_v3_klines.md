## Kline/Candlestick data​

```
GET /api/v3/klines
```

Kline/candlestick bars for a symbol. Klines are uniquely identified by their
open time.

**Weight:** 2

**Parameters:**

| Name      | Type   | Mandatory | Description                  |
| --------- | ------ | --------- | ---------------------------- |
| symbol    | STRING | YES       |                              |
| interval  | ENUM   | YES       |                              |
| startTime | LONG   | NO        |                              |
| endTime   | LONG   | NO        |                              |
| timeZone  | STRING | NO        | Default: 0 (UTC)             |
| limit     | INT    | NO        | Default: 500; Maximum: 1000. |

Supported kline intervals (case-sensitive):

| Interval | `interval` value                    |
| -------- | ----------------------------------- |
| seconds  | `1s`                                |
| minutes  | `1m`, `3m`, `5m`, `15m`, `30m`      |
| hours    | `1h`, `2h`, `4h`, `6h`, `8h`, `12h` |
| days     | `1d`, `3d`                          |
| weeks    | `1w`                                |
| months   | `1M`                                |

**Notes:**

- If `startTime` and `endTime` are not sent, the most recent klines are
  returned.
- Supported values for `timeZone`:
  - Hours and minutes (e.g. `-1:00`, `05:45`)
  - Only hours (e.g. `0`, `8`, `4`)
  - Accepted range is strictly \[-12:00 to +14:00\] inclusive
- If `timeZone` provided, kline intervals are interpreted in that timezone
  instead of UTC.
- Note that `startTime` and `endTime` are always interpreted in UTC, regardless
  of `timeZone`.

**Data Source:** Database

**Response:**

```
[
  [
    1499040000000,      // Kline open time
    "0.01634790",       // Open price
    "0.80000000",       // High price
    "0.01575800",       // Low price
    "0.01577100",       // Close price
    "148976.11427815",  // Volume
    1499644799999,      // Kline Close time
    "2434.19055334",    // Quote asset volume
    308,                // Number of trades
    "1756.87402397",    // Taker buy base asset volume
    "28.46694368",      // Taker buy quote asset volume
    "0"                 // Unused field, ignore.
  ]
]
```

> Source:
> [https://developers.binance.com/docs/binance-spot-api-docs/rest-api/market-data-endpoints](https://developers.binance.com/docs/binance-spot-api-docs/rest-api/market-data-endpoints)
