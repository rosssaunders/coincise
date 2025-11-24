# GET 【Public】MarkPrice KlineBin Channel

**Source:**
[【Public】MarkPrice KlineBin Channel](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Required (Private Endpoint)

## 【Public】MarkPrice KlineBin Channel

Get individual contract K-line data

### Pushing Rules

1.  No user login required
2.  After subscribing, then the changes will be pushed

### Request

> Request

```json
{
  "action": "subscribe",
  "args": ["futures/markPriceKlineBin1m:BTCUSDT"]
}
```

Message Format:

```json
{
  "action": "subscribe",
  "args": ["<channel:symbol>", "<channel:symbol>"]
}
```

- channel: Channel name, such as `futures/markPriceKlineBin1m`
- symbol: Trading pair, such as `BTCUSDT`

#### Parameters Channel Name List

| Channel Name                 | Description             |
| ---------------------------- | ----------------------- |
| futures/markPriceKlineBin1m  | 1-min klineBin Channel  |
| futures/markPriceKlineBin5m  | 5-min klineBin Channel  |
| futures/markPriceKlineBin15m | 15-min klineBin Channel |
| futures/markPriceKlineBin30m | 30-min klineBin Channel |
| futures/markPriceKlineBin1H  | 1-hour klineBin Channel |
| futures/markPriceKlineBin2H  | 2-hour klineBin Channel |
| futures/markPriceKlineBin4H  | 4-hour klineBin Channel |
| futures/markPriceKlineBin1D  | 1-day klineBin Channel  |
| futures/markPriceKlineBin1W  | 1-week klineBin Channel |

### Response

> Response

```json
{
  "group": "futures/markPriceKlineBin1m:BTCUSDT",
  "data": {
    "symbol": "BTCUSDT",
    "o": "146.24",
    "h": "146.24",
    "l": "146.24",
    "c": "146.24",
    "v": "146",
    "ts": 1700533801
  }
}
```

Return data description:

| Field  | Type   | Description                          |
| ------ | ------ | ------------------------------------ |
| symbol | String | Symbol of the contract(like BTCUSDT) |
| o      | String | Opening Price                        |
| h      | String | Highest Price                        |
| l      | String | Lowest Price                         |
| c      | String | Closing Price                        |
| v      | String | Turnover                             |
| ts     | Long   | Data push timestamp (in second)      |
