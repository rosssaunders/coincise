# GET /spot/candlesticks

**Source:** [/spot/candlesticks](https://www.gate.io/docs/developers/apiv4/en/#listcandlesticks-parameters)

## Authentication

Not Required (Public Endpoint)

## [#](#market-k-line-chart) Market K-line chart

`GET /spot/candlesticks`

_Market K-line chart_

Maximum of 1000 points can be returned in a query. Be sure not to exceed the
limit when specifying from, to and interval

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listcandlesticks-parameters](https://www.gate.io/docs/developers/apiv4/en/#listcandlesticks-parameters)

| Name          | In    | Type           | Required | Description                                                                                                                                              |
| ------------- | ----- | -------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| currency_pair | query | string         | true     | Trading pair                                                                                                                                             |
| limit         | query | integer        | false    | Maximum number of recent data points to return. `limit` conflicts with `from` and `to`. If either `from` or `to` is specified, request will be rejected. |
| from          | query | integer(int64) | false    | Start time of candlesticks, formatted in Unix timestamp in seconds. Default to`to - 100 * interval` if not specified                                     |
| to            | query | integer(int64) | false    | Specify the end time of the K-line chart, defaults to current time if not specified, note that the time format is Unix timestamp with second precision   |
| interval      | query | string         | false    | Time interval between data points. Note that `30d` represents a calendar month, not aligned to 30 days                                                   |

#### [#](#enumerated-values-14) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| interval  | 1s    |
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
| interval  | 30d   |

> Example responses

> 200 Response

```json
[
  [
    "1539852480",
    "971519.677",
    "0.0021724",
    "0.0021922",
    "0.0021724",
    "0.0021737",
    "true"
  ]
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listcandlesticks-responses](https://www.gate.io/docs/developers/apiv4/en/#listcandlesticks-responses)

| Status | Meaning                                                                    | Description      | Schema         |
| ------ | -------------------------------------------------------------------------- | ---------------- | -------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | \[\[string\]\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listcandlesticks-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listcandlesticks-responseschema)

Status Code **200**

| Name     | Type  | Description                                                     |
| -------- | ----- | --------------------------------------------------------------- |
| » _None_ | array | Candlestick data for each time granularity, from left to right: |

\- Unix timestamp with second precision  
\- Trading volume in quote currency  
\- Closing price  
\- Highest price  
\- Lowest price  
\- Opening price  
\- Trading volume in base currency  
\- Whether window is closed; true means this candlestick data segment is
complete, false means not yet complete |

This operation does not require authentication

## [#](#query-account-fee-rates) Query account fee rates

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-account-fee-rates](https://www.gate.io/docs/developers/apiv4/en/#query-account-fee-rates)

> Code samples
