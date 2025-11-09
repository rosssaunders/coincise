# GET /v3/kline

**Title:** Get candles data

**Source:**
[Get candles data](https://docs.digifinex.com/en-ww/spot/v3/rest.html#get-candles-data)

## Authentication

Not Required (Public Endpoint)

---

## Get candles data

### HTTP Request

- GET `https://openapi.digifinex.com/v3/kline`

### Request Parameters

| Field      | Request Type | Mandatory | Description                                                          |
| ---------- | ------------ | --------- | -------------------------------------------------------------------- |
| symbol     | string       | true      | "btc_usdt"                                                           |
| period     | str          | true      | Candle timeframe type: 1,5,15,30,60,240,720,1D,1W                    |
| start_time | int          | false     | Candle starting time in timestamp, default 200 period befor end_time |
| end_time   | int          | false     | Candle ending time in timestamp, default current timestamp           |

Get candles data by symbol, up to 500 at one time.

> Response:

```

{
    "data": [
        [1589426100, 621.4565, 9342.7, 9349.99, 9305.86, 9307.96],
        [1589427000, 378.1678, 9333.71, 9344.25, 9318.26, 9342.23],
        ...,
    ],
    "code": 0
}

```

### Response Content

| Field | Mandatory | Request Type | Description                                                                    |
| ----- | --------- | ------------ | ------------------------------------------------------------------------------ |
| data  | true      | object       | Candles Data\[timestamp,vol,close,high,low,open\],last one is most recent data |
| code  | true      | int          | Status                                                                         |
