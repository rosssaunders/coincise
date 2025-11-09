# POST public/get-tickers

**Source:**
[public/get-tickers](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#public-get-tickers)

## Authentication

Not Required (Public Endpoint)

## public/get-tickers

> Request Sample

```
https://{URL}/public/get-tickers?instrument_name=BTCUSD-PERP
```

> Response Sample

```
{
  "id": -1,
  "method": "public/get-tickers",
  "code": 0,
  "result": {
    "data": [{
      "h": "51790.00",        // Price of the 24h highest trade
      "l": "47895.50",        // Price of the 24h lowest trade, null if there weren't any trades
      "a": "51174.500000",    // The price of the latest trade, null if there weren't any trades
      "i": "BTCUSD-PERP",     // Instrument name
      "v": "879.5024",        // The total 24h traded volume
      "vv": "26370000.12",    // The total 24h traded volume value (in USD)
      "oi": "12345.12",       // Open interest
      "c": "0.03955106",      // 24-hour price change, null if there weren't any trades
      "b": "51170.000000",    // The current best bid price, null if there aren't any bids
      "k": "51180.000000",    // The current best ask price, null if there aren't any asks
      "t": 1613580710768      // The published timestamp in ms
    }]
  }
}
```

Fetches the public tickers for all or a particular instrument.

### Request Params

| Name            | Type   | Required | Description      |
| --------------- | ------ | -------- | ---------------- |
| instrument_name | string | N        | e.g. BTCUSD-PERP |

### Applies To

REST

### REST Method

GET

### Response Attributes

| Name | Type   | Description                                                     |
| ---- | ------ | --------------------------------------------------------------- |
| h    | string | Price of the 24h highest trade                                  |
| l    | string | Price of the 24h lowest trade, null if there weren't any trades |
| a    | string | The price of the latest trade, null if there weren't any trades |
| i    | string | Instrument name                                                 |
| v    | string | The total 24h traded volum                                      |
| vv   | string | The total 24h traded volume value (in USD)                      |
| oi   | string | The open interest                                               |
| c    | string | 24-hour price change, null if there weren't any trades          |
| b    | string | The current best bid price, null if there aren't any bids       |
| k    | string | The current best ask price, null if there aren't any asks       |
| t    | number | The published timestamp in ms                                   |
