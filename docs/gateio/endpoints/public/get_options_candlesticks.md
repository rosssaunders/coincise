# GET /options/candlesticks

**Source:**
[/options/candlesticks](https://www.gate.io/docs/developers/apiv4/en/#listoptionscandlesticks-parameters)

## Authentication

Not Required (Public Endpoint)

## [#](#options-contract-market-candlestick-chart) Options contract market candlestick chart

`GET /options/candlesticks`

_Options contract market candlestick chart_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listoptionscandlesticks-parameters](https://www.gate.io/docs/developers/apiv4/en/#listoptionscandlesticks-parameters)

| Name     | In    | Type           | Required | Description                                         |
| -------- | ----- | -------------- | -------- | --------------------------------------------------- |
| contract | query | string         | true     | Options contract name                               |
| limit    | query | integer        | false    | Maximum number of records returned in a single list |
| from     | query | integer(int64) | false    | Start timestamp                                     |
| to       | query | integer(int64) | false    | Termination Timestamp                               |
| interval | query | string         | false    | Time interval between data points                   |

#### [#](#detailed-descriptions-45) Detailed descriptions

**from**: Start timestamp

Specify start time, time format is Unix timestamp. If not specified, it defaults
to (the data start time of the time range actually returned by to and limit)

**to**: Termination Timestamp

Specify the end time. If not specified, it defaults to the current time, and the
time format is a Unix timestamp

#### [#](#enumerated-values-119) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| interval  | 1m    |
| interval  | 5m    |
| interval  | 15m   |
| interval  | 30m   |
| interval  | 1h    |

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
[https://www.gate.io/docs/developers/apiv4/en/#listoptionscandlesticks-responses](https://www.gate.io/docs/developers/apiv4/en/#listoptionscandlesticks-responses)

| Status | Meaning                                                                    | Description      | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listoptionscandlesticks-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listoptionscandlesticks-responseschema)

Status Code **200**

| Name     | Type           | Description                                                                 |
| -------- | -------------- | --------------------------------------------------------------------------- |
| » _None_ | object         | data point in every timestamp                                               |
| »» t     | number(double) | Unix timestamp in seconds                                                   |
| »» v     | integer(int64) | size volume (contract size). Only returned if `contract` is not prefixed    |
| »» c     | string         | Close price (quote currency, unit: underlying corresponding option price)   |
| »» h     | string         | Highest price (quote currency, unit: underlying corresponding option price) |
| »» l     | string         | Lowest price (quote currency, unit: underlying corresponding option price)  |
| »» o     | string         | Open price (quote currency, unit: underlying corresponding option price)    |

This operation does not require authentication

## [#](#underlying-index-price-candlestick-chart) Underlying index price candlestick chart

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#underlying-index-price-candlestick-chart](https://www.gate.io/docs/developers/apiv4/en/#underlying-index-price-candlestick-chart)

> Code samples
