# GET /earn/uni/rate

**Source:** [/earn/uni/rate](https://www.gate.io/docs/developers/apiv4/en/#listunirate-responses)

## Authentication

Required (Private Endpoint)

## [#](#currency-estimated-annualized-interest-rate) Currency estimated annualized interest rate

`GET /earn/uni/rate`

_Currency estimated annualized interest rate_

> Example responses

> 200 Response

```json
[
  {
    "currency": "USDT",
    "est_rate": "0.0226"
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listunirate-responses](https://www.gate.io/docs/developers/apiv4/en/#listunirate-responses)

| Status | Meaning                                                                    | Description | Schema     |
| ------ | -------------------------------------------------------------------------- | ----------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listunirate-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listunirate-responseschema)

Status Code **200**

| Name       | Type   | Description            |
| ---------- | ------ | ---------------------- |
| » currency | string | none                   |
| » est_rate | string | Unconverted percentage |

WARNING

To perform this operation, you must be authenticated by API key and secret
