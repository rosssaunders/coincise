# GET 【Public】KlineBin Channel

**Source:**
[【Public】KlineBin Channel](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Not Required (Public Endpoint)

## 【Public】KlineBin Channel

Get individual contract K-line data

### Pushing Rules

1.  No user login required
2.  After subscribing, then the changes will be pushed

### Request

> Request

`{"action":"subscribe","args":["futures/klineBin1m:BTCUSDT"]}`

Message Format:

`{"action":"subscribe","args":["<channel:symbol>","<channel:symbol>"]}`

- channel: Channel name, such as `futures/klineBin1m`
- symbol: Trading pair, such as `BTCUSDT`

#### Parameters Channel Name List

| Channel Name        | Description             |
| ------------------- | ----------------------- |
| futures/klineBin1m  | 1-min klineBin Channel  |
| futures/klineBin5m  | 5-min klineBin Channel  |
| futures/klineBin15m | 15-min klineBin Channel |
| futures/klineBin30m | 30-min klineBin Channel |
| futures/klineBin1H  | 1-hour klineBin Channel |
| futures/klineBin2H  | 2-hour klineBin Channel |
| futures/klineBin4H  | 4-hour klineBin Channel |
| futures/klineBin1D  | 1-day klineBin Channel  |
| futures/klineBin1W  | 1-week klineBin Channel |

### Response

> Response

`{     "group":"futures/klineBin1m:BTCUSDT",     "data":{             "symbol":"BTCUSDT",             "o":"146.24",             "h":"146.24",             "l":"146.24",             "c":"146.24",             "v":"146",             "ts":1700533801         } }`

Return data description:

| Field  | Type   | Description                          |
| ------ | ------ | ------------------------------------ |
| symbol | String | Symbol of the contract(like BTCUSDT) |
| o      | String | Opening Price                        |
| h      | String | Highest Price                        |
| l      | String | Lowest Price                         |
| c      | String | Closing Price                        |
| v      | String | Turnover                             |
| ts     | Long   | K-line timestamp（in second）        |
