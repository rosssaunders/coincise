# DigiFinex Public API Documentation

This documentation covers the public endpoints of the DigiFinex API.

Source: https://docs.digifinex.com/en-ww/spot/v3/rest.html

---

# Introduction

## API Introduction

# Common

## Server ping

### HTTP Request

- GET `https://openapi.digifinex.com/v3/ping`

### Request Parameters

No parameter is available for this endpoint.

> Response:

```

{
    "msg": "pong",
    "code": 0
}

```

### Response Content

| Field | Mandatory | Request Type | Description |
| ----- | --------- | ------------ | ----------- |
| msg   | true      | string       | Response    |
| code  | true      | int          | Status      |

## Server timestamp

### HTTP Request

## All the market description

### HTTP Request

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

## Get candles data

### HTTP Request

### HTTP Request

- GET `https://openapi.digifinex.com/v3/spot/symbols`

### Request Parameters

No parameter is available for this endpoint.

> Response:

```

{
  "code": 0,
  "total": 0,
  "free": 0,
  "unrealized_pnl": 0,
  "list": [
    {
      "currency": "BTC",
      "valuation_rate": 1,
      "free": 4723846.89208129,
      "total": 0
    }
  ]
}

```

### Request Parameters

说明：以市场价格平掉仓位

| Field  | Request Type | Mandatory | Description |
| ------ | ------------ | --------- | ----------- |
| symbol | str          | true      | Symbol Name |

> Response:

```

{
  "code": 0
}

```

### Response Content

| Field | Mandatory | Request Type | Description |
| ----- | --------- | ------------ | ----------- |
| code  | true      | int          | Status      |

### Request parameters

| fieldname | if necessary | types  | fieldname | value range                 |
| --------- | ------------ | ------ | --------- | --------------------------- |
| currency  | true         | string | crypto    | btc, ltc, bch, eth, etc ... |

> Response:

```
{
    "code": 200,
    "data": [
        {
            "currency": "btc",
            "address": "1PSRjPg53cX7hMRYAXGJnL8mqHtzmQgPUs",
            "addressTag": "",
            "chain": ""
        }
    ]
}
```

### Status code

| status code | error message | Error scenario description |
| ----------- | ------------- | -------------------------- |
| 200         | success       | success                    |

### Status code

| status code | error message | error scenario description |
| ----------- | ------------- | -------------------------- |
| 200         | success       | success                    |

### Status code

| status code | error message | error scenario description |
| ----------- | ------------- | -------------------------- |
| 200         | success       | success                    |

# Sample Code

## PHP
