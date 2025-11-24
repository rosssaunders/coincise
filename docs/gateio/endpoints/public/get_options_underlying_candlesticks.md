# GET /options/underlying/candlesticks

**Source:** [/options/underlying/candlesticks](https://www.gate.io/docs/developers/apiv4/en/#listoptionsunderlyingcandlesticks-parameters)

## Authentication

Not Required (Public Endpoint)

## [#](#underlying-index-price-candlestick-chart) Underlying index price candlestick chart

`GET /options/underlying/candlesticks`

_Underlying index price candlestick chart_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listoptionsunderlyingcandlesticks-parameters](https://www.gate.io/docs/developers/apiv4/en/#listoptionsunderlyingcandlesticks-parameters)

| Name       | In    | Type           | Required | Description                                          |
| ---------- | ----- | -------------- | -------- | ---------------------------------------------------- |
| underlying | query | string         | true     | Underlying (Obtained by listing underlying endpoint) |
| limit      | query | integer        | false    | Maximum number of records returned in a single list  |
| from       | query | integer(int64) | false    | Start timestamp                                      |
| to         | query | integer(int64) | false    | Termination Timestamp                                |
| interval   | query | string         | false    | Time interval between data points                    |

#### [#](#detailed-descriptions-46) Detailed descriptions

**from**: Start timestamp

Specify start time, time format is Unix timestamp. If not specified, it defaults
to (the data start time of the time range actually returned by to and limit)

**to**: Termination Timestamp

Specify the end time. If not specified, it defaults to the current time, and the
time format is a Unix timestamp

#### [#](#enumerated-values-120) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| interval  | 1m    |
| interval  | 5m    |
| interval  | 15m   |
| interval  | 30m   |
| interval  | 1h    |

> Example responses

> 200 Response

```json
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
[https://www.gate.io/docs/developers/apiv4/en/#listoptionsunderlyingcandlesticks-responses](https://www.gate.io/docs/developers/apiv4/en/#listoptionsunderlyingcandlesticks-responses)

| Status | Meaning                                                                    | Description      | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listoptionsunderlyingcandlesticks-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listoptionsunderlyingcandlesticks-responseschema)

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

## [#](#market-trade-records) Market trade records

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#market-trade-records](https://www.gate.io/docs/developers/apiv4/en/#market-trade-records)

> Code samples
