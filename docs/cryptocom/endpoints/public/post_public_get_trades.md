# POST public/get-trades

**Source:**
[public/get-trades](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#public-get-trades)

## Authentication

Not Required (Public Endpoint)

## public/get-trades

> Request Sample

```
https://{URL}/public/get-trades?instrument_name=BTCUSD-PERP&count=5
```

> Response Sample

```
{
  "id": 1,
  "method": "public/get-trades",
  "code": 0,
  "result": {
    "data": [{
      "d": "15281981878",          // Trade ID
      "t": 1613547060925,          // Trade timestamp milliseconds
      "tn": "1613547060925523623", // Trade timestamp nanoseconds
      "q": "0.181900",             // Quantity
      "p": "50772.000000",         // Price
      "s": "SELL",                 // Side
      "i": "BTCUSD-PERP"           // Instrument name
      "m": "76423"                 // Trade match ID
    }]
  }
}
```

Fetches the public trades for a particular instrument.

### Request Params

| Name            | Type   | Required | Description                                   |
| --------------- | ------ | -------- | --------------------------------------------- |
| instrument_name | string | Y        | e.g. BTCUSD-PERP                              |
| count           | number | N        | The maximum number of trades to be retrieved. |

Default: 25  
Max: 150 | | start_ts | number or string | N | Start time in Unix time format
(`inclusive`).  
Default: `end_time - 1 day`.  
Nanosecond is recommended for accurate pagination | | end_ts | number or string
| N | End time in Unix time format (`exclusive`)  
Default: current system timestamp.  
Nanosecond is recommended for accurate pagination |

**Note**: get-trades time window can only be up to 7 days for maximum.

### Applies To

REST

### REST Method

GET

### Response Attributes

| Name | Type             | Description                                                 |
| ---- | ---------------- | ----------------------------------------------------------- |
| d    | string of number | Trade ID                                                    |
| t    | number           | Trade timestamp in milliseconds                             |
| tn   | string of number | Trade timestamp in nanoseconds                              |
| q    | number           | Trade quantity                                              |
| p    | number           | Trade price                                                 |
| s    | string           | Side (`BUY` or `SELL`). Side is the side of the taker order |
| i    | string           | Instrument name e.g. BTCUSD-PERP                            |
| m    | string of number | Trade match ID                                              |
