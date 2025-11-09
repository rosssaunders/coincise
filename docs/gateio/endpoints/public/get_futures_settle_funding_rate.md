# GET /futures/{settle}/funding_rate

**Source:**
[/futures/{settle}/funding_rate](https://www.gate.io/docs/developers/apiv4/en/#listfuturesfundingratehistory-parameters)

## Authentication

Not Required (Public Endpoint)

## [#](#futures-market-historical-funding-rate) Futures market historical funding rate

`GET /futures/{settle}/funding_rate`

_Futures market historical funding rate_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listfuturesfundingratehistory-parameters](https://www.gate.io/docs/developers/apiv4/en/#listfuturesfundingratehistory-parameters)

| Name     | In    | Type           | Required | Description                                         |
| -------- | ----- | -------------- | -------- | --------------------------------------------------- |
| settle   | path  | string         | true     | Settle currency                                     |
| contract | query | string         | true     | Futures contract                                    |
| limit    | query | integer        | false    | Maximum number of records returned in a single list |
| from     | query | integer(int64) | false    | Start timestamp                                     |
| to       | query | integer(int64) | false    | Termination Timestamp                               |

#### [#](#detailed-descriptions-24) Detailed descriptions

**from**: Start timestamp

Specify start time, time format is Unix timestamp. If not specified, it defaults
to (the data start time of the time range actually returned by to and limit)

**to**: Termination Timestamp

Specify the end time. If not specified, it defaults to the current time, and the
time format is a Unix timestamp

#### [#](#enumerated-values-37) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```
[
  {
    "t": 1543968000,
    "r": "0.000157"
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listfuturesfundingratehistory-responses](https://www.gate.io/docs/developers/apiv4/en/#listfuturesfundingratehistory-responses)

| Status | Meaning                                                                    | Description              | Schema     |
| ------ | -------------------------------------------------------------------------- | ------------------------ | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | History query successful | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listfuturesfundingratehistory-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listfuturesfundingratehistory-responseschema)

Status Code **200**

| Name | Type           | Description               |
| ---- | -------------- | ------------------------- |
| » t  | integer(int64) | Unix timestamp in seconds |
| » r  | string         | Funding rate              |

This operation does not require authentication

## [#](#futures-market-insurance-fund-history) Futures market insurance fund history

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#futures-market-insurance-fund-history](https://www.gate.io/docs/developers/apiv4/en/#futures-market-insurance-fund-history)

> Code samples
