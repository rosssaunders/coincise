# GET /futures/{settle}/candlesticks

**Source:**
[/futures/{settle}/candlesticks](https://www.gate.io/docs/developers/apiv4/en/#listfuturescandlesticks-parameters)

## Authentication

Not Required (Public Endpoint)

## [#](#futures-market-k-line-chart) Futures market K-line chart

`GET /futures/{settle}/candlesticks`

_Futures market K-line chart_

Return specified contract candlesticks. If prefix `contract` with `mark_`, the
contract's mark price candlesticks are returned; if prefix with `index_`, index
price candlesticks will be returned.

Maximum of 2000 points are returned in one query. Be sure not to exceed the
limit when specifying `from`, `to` and `interval`

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listfuturescandlesticks-parameters](https://www.gate.io/docs/developers/apiv4/en/#listfuturescandlesticks-parameters)

| Name     | In    | Type           | Required | Description                                                                                                                                                        |
| -------- | ----- | -------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| settle   | path  | string         | true     | Settle currency                                                                                                                                                    |
| contract | query | string         | true     | Futures contract                                                                                                                                                   |
| from     | query | integer(int64) | false    | Start time of candlesticks, formatted in Unix timestamp in seconds. Default to`to - 100 * interval` if not specified                                               |
| to       | query | integer(int64) | false    | Specify the end time of the K-line chart, defaults to current time if not specified, note that the time format is Unix timestamp with second precision             |
| limit    | query | integer        | false    | Maximum number of recent data points to return. `limit` conflicts with `from` and `to`. If either `from` or `to` is specified, request will be rejected.           |
| interval | query | string         | false    | Interval time between data points. Note that `1w` means natural week(Mon-Sun), while `7d` means every 7d since unix 0. 30d represents a natural month, not 30 days |
| timezone | query | string         | false    | Time zone: all/utc0/utc8, default utc0                                                                                                                             |

#### [#](#enumerated-values-34) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |
| interval  | 10s   |
| interval  | 1m    |
| interval  | 5m    |
| interval  | 15m   |
| interval  | 30m   |
| interval  | 1h    |
| interval  | 4h    |
| interval  | 8h    |
| interval  | 1d    |
| interval  | 7d    |

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
    "o": "1.032",
    "sum": "3580"
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listfuturescandlesticks-responses](https://www.gate.io/docs/developers/apiv4/en/#listfuturescandlesticks-responses)

| Status | Meaning                                                                    | Description      | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listfuturescandlesticks-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listfuturescandlesticks-responseschema)

Status Code **200**

| Name     | Type           | Description                                                              |
| -------- | -------------- | ------------------------------------------------------------------------ |
| _None_   | array          | \[data point in every timestamp\]                                        |
| » _None_ | object         | data point in every timestamp                                            |
| »» t     | number(double) | Unix timestamp in seconds                                                |
| »» v     | integer(int64) | size volume (contract size). Only returned if `contract` is not prefixed |
| »» c     | string         | Close price (quote currency)                                             |
| »» h     | string         | Highest price (quote currency)                                           |
| »» l     | string         | Lowest price (quote currency)                                            |
| »» o     | string         | Open price (quote currency)                                              |
| »» sum   | string         | Trading volume (unit: Quote currency)                                    |

This operation does not require authentication

## [#](#premium-index-k-line-chart) Premium Index K-line chart

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#premium-index-k-line-chart](https://www.gate.io/docs/developers/apiv4/en/#premium-index-k-line-chart)

> Code samples
