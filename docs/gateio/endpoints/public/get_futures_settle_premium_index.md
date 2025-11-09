# GET /futures/{settle}/premium_index

**Source:**
[/futures/{settle}/premium_index](https://www.gate.io/docs/developers/apiv4/en/#listfuturespremiumindex-parameters)

## Authentication

Not Required (Public Endpoint)

## [#](#premium-index-k-line-chart) Premium Index K-line chart

`GET /futures/{settle}/premium_index`

_Premium Index K-line chart_

Maximum of 1000 points can be returned in a query. Be sure not to exceed the
limit when specifying from, to and interval

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listfuturespremiumindex-parameters](https://www.gate.io/docs/developers/apiv4/en/#listfuturespremiumindex-parameters)

| Name     | In    | Type           | Required | Description                                                                                                                                              |
| -------- | ----- | -------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| settle   | path  | string         | true     | Settle currency                                                                                                                                          |
| contract | query | string         | true     | Futures contract                                                                                                                                         |
| from     | query | integer(int64) | false    | Start time of candlesticks, formatted in Unix timestamp in seconds. Default to`to - 100 * interval` if not specified                                     |
| to       | query | integer(int64) | false    | Specify the end time of the K-line chart, defaults to current time if not specified, note that the time format is Unix timestamp with second precision   |
| limit    | query | integer        | false    | Maximum number of recent data points to return. `limit` conflicts with `from` and `to`. If either `from` or `to` is specified, request will be rejected. |
| interval | query | string         | false    | Time interval between data points                                                                                                                        |

#### [#](#enumerated-values-35) Enumerated Values

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
    "c": "0",
    "h": "0.00023",
    "l": "0",
    "o": "0"
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listfuturespremiumindex-responses](https://www.gate.io/docs/developers/apiv4/en/#listfuturespremiumindex-responses)

| Status | Meaning                                                                    | Description      | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listfuturespremiumindex-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listfuturespremiumindex-responseschema)

Status Code **200**

| Name     | Type           | Description                   |
| -------- | -------------- | ----------------------------- |
| » _None_ | object         | data point in every timestamp |
| »» t     | number(double) | Unix timestamp in seconds     |
| »» c     | string         | Close price                   |
| »» h     | string         | Highest price                 |
| »» l     | string         | Lowest price                  |
| »» o     | string         | Open price                    |

This operation does not require authentication

## [#](#get-all-futures-trading-statistics) Get all futures trading statistics

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#get-all-futures-trading-statistics](https://www.gate.io/docs/developers/apiv4/en/#get-all-futures-trading-statistics)

> Code samples
