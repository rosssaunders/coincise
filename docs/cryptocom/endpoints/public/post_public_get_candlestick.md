# POST public/get-candlestick

**Source:**
[public/get-candlestick](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#public-get-candlestick)

## Authentication

Not Required (Public Endpoint)

## public/get-candlestick

> Request Sample

```
https://{URL}/public/get-candlestick?instrument_name=BTCUSD-PERP&timeframe=M5
```

> Response Sample

```
{
  "id": 1,
  "method": "public/get-candlestick",
  "code": 0,
  "result": {
    "interval": "M5",
    "data": [{
      "o": "50508.500000",    // Open price
      "h": "50548.500000",    // High price
      "l": "50172.500000",    // Low price
      "c": "50202.000000",    // Close price
      "v": "17.203200",       // Volume
      "t": 1613544000000      // Start time
    }
    ],
    "instrument_name": "BTCUSD-PERP"
  }
}
```

Retrieves candlesticks (k-line data history) over a given period for an
instrument (e.g. BTCUSD-PERP).

### Request Params

| Name            | Type   | Required | Description                                        |
| --------------- | ------ | -------- | -------------------------------------------------- |
| instrument_name | string | Y        | e.g. BTCUSD-PERP                                   |
| timeframe       | string | N        | The `period` value as show below. Default is `M1`. |
| count           | number | N        | Default is 25                                      |
| start_ts        | number | N        | Default timestamp is 1 day ago (Unix timestamp)    |
| end_ts          | number | N        | Default timestamp is current time (Unix timestamp) |

`period` can be:

- `1m` : one minute. (Legacy format: `M1`)
- `5m` : five minutes. (Legacy format: `M5`)
- `15m` : 15 minutes. (Legacy format: `M15`)
- `30m`: 30 minutes. (Legacy format: `M30`)
- `1h` : one hour. (Legacy format: `H1`)
- `2h` : two hours. (Legacy format: `H2`)
- `4h` : 4 hours. (Legacy format: `H4`)
- `12h`: 12 hours. (Legacy format: `H12`)
- `1D` : one day. (Legacy format: `D1` and `1d`)
- `7D` : 1 week starting at 00:00 UTC each Monday
- `14D`: 2 week intervals starting at _Monday, Oct-28-2019, 00:00 UTC_
- `1M` : 1 month starting at first day of each calendar month, 00:00 UTC

Lagacy format is still supported until further notice.

### Applies To

REST

### Response Attributes

| Name            | Type   | Description          |
| --------------- | ------ | -------------------- |
| instrument_name | string | e.g. BTCUSD-PERP     |
| interval        | string | The period (e.g. M5) |
| data            | array  | See below            |

`data` consists of:

| Name | Type   | Description                                |
| ---- | ------ | ------------------------------------------ |
| t    | long   | Start time of candlestick (Unix timestamp) |
| o    | number | Open                                       |
| h    | number | High                                       |
| l    | number | Low                                        |
| c    | number | Close                                      |
| v    | number | Volume                                     |
