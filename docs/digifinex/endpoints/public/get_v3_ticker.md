# GET /v3/ticker

**Title:** ticker price

**Source:**
[ticker price](https://docs.digifinex.com/en-ww/spot/v3/rest.html#ticker-price)

## Authentication

Not Required (Public Endpoint)

---

## ticker price

### HTTP Request

- GET `https://openapi.digifinex.com/v3/ticker`

### Request Parameters

| Field  | Request Type | Mandatory | Description |
| ------ | ------------ | --------- | ----------- |
| symbol | string       | false     | "btc_usdt"  |

> Response:

```

{
    "ticker": [{
        "vol": 40717.4461,
        "change": -1.91,
        "base_vol": 392447999.65374,
        "sell": 9592.23,
        "last": 9592.22,
        "symbol": "btc_usdt",
        "low": 9476.24,
        "buy": 9592.03,
        "high": 9793.87
    }],
    "date": 1589874294,
    "code": 0
}

```

### Response Content

| Field    | Mandatory | Request Type | Description              |
| -------- | --------- | ------------ | ------------------------ |
| ticker   | true      | object       | Trading Pair Information |
| vol      | true      | float        | 24h Volume               |
| change   | true      | float        | 24h Change               |
| base_vol | true      | float        | 24h Amount               |
| sell     | true      | float        | Ask1 Price               |
| last     | true      | float        | Last Price               |
| symbol   | true      | string       | Symbol Name              |
| low      | true      | float        | 24h Low Price            |
| buy      | true      | float        | Bid1 Price               |
| high     | true      | float        | 24h High Price           |
| date     | true      | int          | Timestamp                |
| code     | true      | int          | Status                   |
