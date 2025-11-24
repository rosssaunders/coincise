# GET /earn/uni/chart

**Source:** [/earn/uni/chart](https://www.gate.io/docs/developers/apiv4/en/#listunichart-parameters)

## Authentication

Required (Private Endpoint)

## [#](#uniloan-currency-annualized-trend-chart) UniLoan currency annualized trend chart

`GET /earn/uni/chart`

_UniLoan currency annualized trend chart_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listunichart-parameters](https://www.gate.io/docs/developers/apiv4/en/#listunichart-parameters)

| Name  | In    | Type           | Required | Description                                      |
| ----- | ----- | -------------- | -------- | ------------------------------------------------ |
| from  | query | integer(int64) | true     | Start timestamp in seconds, maximum span 30 days |
| to    | query | integer(int64) | true     | End timestamp in seconds, maximum span 30 days   |
| asset | query | string         | true     | Currency name                                    |

> Example responses

> 200 Response

```json
[
  {
    "time": 1719705600,
    "value": "0.01"
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listunichart-responses](https://www.gate.io/docs/developers/apiv4/en/#listunichart-responses)

| Status | Meaning                                                                    | Description | Schema     |
| ------ | -------------------------------------------------------------------------- | ----------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listunichart-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listunichart-responseschema)

Status Code **200**

| Name    | Type           | Description |
| ------- | -------------- | ----------- |
| » time  | integer(int64) | none        |
| » value | string         | none        |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#currency-estimated-annualized-interest-rate) Currency estimated annualized interest rate

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#currency-estimated-annualized-interest-rate](https://www.gate.io/docs/developers/apiv4/en/#currency-estimated-annualized-interest-rate)

> Code samples
