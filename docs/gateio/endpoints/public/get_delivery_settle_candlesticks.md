# GET /delivery/{settle}/candlesticks

**Source:** [/delivery/{settle}/candlesticks](https://www.gate.io/docs/developers/apiv4/en/#listdeliverycandlesticks-parameters)

## Authentication

Not Required (Public Endpoint)

## [#](#futures-market-k-line-chart-2) Futures market K-line chart

`GET /delivery/{settle}/candlesticks`

_Futures market K-line chart_

Return specified contract candlesticks. If prefix `contract` with `mark_`, the
contract's mark price candlesticks are returned; if prefix with `index_`, index
price candlesticks will be returned.

Maximum of 2000 points are returned in one query. Be sure not to exceed the
limit when specifying `from`, `to` and `interval`

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listdeliverycandlesticks-parameters](https://www.gate.io/docs/developers/apiv4/en/#listdeliverycandlesticks-parameters)

| Name     | In    | Type           | Required | Description                                                                                                                                              |
| -------- | ----- | -------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| settle   | path  | string         | true     | Settle currency                                                                                                                                          |
| contract | query | string         | true     | Futures contract                                                                                                                                         |
| from     | query | integer(int64) | false    | Start time of candlesticks, formatted in Unix timestamp in seconds. Default to`to - 100 * interval` if not specified                                     |
| to       | query | integer(int64) | false    | Specify the end time of the K-line chart, defaults to current time if not specified, note that the time format is Unix timestamp with second precision   |
| limit    | query | integer        | false    | Maximum number of recent data points to return. `limit` conflicts with `from` and `to`. If either `from` or `to` is specified, request will be rejected. |
| interval | query | string         | false    | Time interval between data points, note that 1w represents a natural week, 7d time is aligned with Unix initial time                                     |

#### [#](#enumerated-values-90) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | usdt  |
| interval  | 10s   |
| interval  | 30s   |
| interval  | 1m    |
| interval  | 5m    |
| interval  | 15m   |
| interval  | 30m   |
| interval  | 1h    |
| interval  | 2h    |
| interval  | 4h    |
| interval  | 6h    |
| interval  | 8h    |
| interval  | 12h   |
| interval  | 1d    |
| interval  | 7d    |
| interval  | 1w    |
| interval  | 30d   |

> Example responses

> 200 Response

```
[
  {
    "t": 1539852480,
    "v": 97151,
    "c": "1.032",
    "h": "1.032",
    "l": "1.032",
    "o": "1.032"
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listdeliverycandlesticks-responses](https://www.gate.io/docs/developers/apiv4/en/#listdeliverycandlesticks-responses)

| Status | Meaning                                                                    | Description      | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listdeliverycandlesticks-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listdeliverycandlesticks-responseschema)

Status Code **200**

| Name     | Type           | Description                                                              |
| -------- | -------------- | ------------------------------------------------------------------------ |
| » _None_ | object         | data point in every timestamp                                            |
| »» t     | number(double) | Unix timestamp in seconds                                                |
| »» v     | integer(int64) | size volume (contract size). Only returned if `contract` is not prefixed |
| »» c     | string         | Close price (quote currency)                                             |
| »» h     | string         | Highest price (quote currency)                                           |
| »» l     | string         | Lowest price (quote currency)                                            |
| »» o     | string         | Open price (quote currency)                                              |

This operation does not require authentication

## [#](#get-all-futures-trading-statistics-2) Get all futures trading statistics

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#get-all-futures-trading-statistics-2](https://www.gate.io/docs/developers/apiv4/en/#get-all-futures-trading-statistics-2)

> Code samples
