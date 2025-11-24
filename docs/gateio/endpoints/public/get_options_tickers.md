# GET /options/tickers

**Source:** [/options/tickers](https://www.gate.io/docs/developers/apiv4/en/#listoptionstickers-parameters)

## Authentication

Not Required (Public Endpoint)

## [#](#query-options-market-ticker-information) Query options market ticker information

`GET /options/tickers`

_Query options market ticker information_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listoptionstickers-parameters](https://www.gate.io/docs/developers/apiv4/en/#listoptionstickers-parameters)

| Name       | In    | Type   | Required | Description                                          |
| ---------- | ----- | ------ | -------- | ---------------------------------------------------- |
| underlying | query | string | true     | Underlying (Obtained by listing underlying endpoint) |

> Example responses

> 200 Response

```json
[
  {
    "name": "BTC_USDT-20211130-65000-C",
    "last_price": "13000",
    "mark_price": "14010",
    "position_size": 10,
    "ask1_size": 0,
    "ask1_price": "0",
    "bid1_size": 1,
    "bid1_price": "11",
    "vega": "41.41202",
    "theta": "-120.1506",
    "rho": "6.52485",
    "gamma": "0.00004",
    "delta": "0.33505",
    "mark_iv": "0.123",
    "bid_iv": "0.023",
    "ask_iv": "0.342",
    "leverage": "13"
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listoptionstickers-responses](https://www.gate.io/docs/developers/apiv4/en/#listoptionstickers-responses)

| Status | Meaning                                                                    | Description      | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listoptionstickers-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listoptionstickers-responseschema)

Status Code **200**

| Name             | Type           | Description                                                       |
| ---------------- | -------------- | ----------------------------------------------------------------- |
| » _None_         | object         | Options contract details                                          |
| »» name          | string         | Options contract name                                             |
| »» last_price    | string         | Last trade price (quote currency)                                 |
| »» mark_price    | string         | Current mark price (quote currency)                               |
| »» index_price   | string         | Current index price (quote currency)                              |
| »» ask1_size     | integer(int64) | Best ask size                                                     |
| »» ask1_price    | string         | Best ask price                                                    |
| »» bid1_size     | integer(int64) | Best bid size                                                     |
| »» bid1_price    | string         | Best bid price                                                    |
| »» position_size | integer(int64) | Current total long position size                                  |
| »» mark_iv       | string         | Implied volatility                                                |
| »» bid_iv        | string         | Bid side implied volatility                                       |
| »» ask_iv        | string         | Ask side implied volatility                                       |
| »» leverage      | string         | Current leverage. Formula: underlying_price / mark_price \* delta |
| »» delta         | string         | Greek letter delta                                                |
| »» gamma         | string         | Greek letter gamma                                                |
| »» vega          | string         | Greek letter vega                                                 |
| »» theta         | string         | Greek letter theta                                                |
| »» rho           | string         | Rho                                                               |

This operation does not require authentication

## [#](#query-underlying-ticker-information) Query underlying ticker information

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-underlying-ticker-information](https://www.gate.io/docs/developers/apiv4/en/#query-underlying-ticker-information)

> Code samples
