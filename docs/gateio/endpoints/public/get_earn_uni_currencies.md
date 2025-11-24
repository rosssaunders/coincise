# GET /earn/uni/currencies

**Source:**
[/earn/uni/currencies](https://www.gate.io/docs/developers/apiv4/en/#listunicurrencies-responses)

## Authentication

Not Required (Public Endpoint)

## [#](#query-lending-currency-list) Query lending currency list

`GET /earn/uni/currencies`

_Query lending currency list_

> Example responses

> 200 Response

```json
[
  {
    "currency": "AE",
    "min_lend_amount": "100",
    "max_lend_amount": "200000000",
    "max_rate": "0.00057",
    "min_rate": "0.000001"
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listunicurrencies-responses](https://www.gate.io/docs/developers/apiv4/en/#listunicurrencies-responses)

| Status | Meaning                                                                    | Description      | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listunicurrencies-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listunicurrencies-responseschema)

Status Code **200**

| Name               | Type   | Description                                             |
| ------------------ | ------ | ------------------------------------------------------- |
| _None_             | array  | \[Currency detail\]                                     |
| » _None_           | object | Currency detail                                         |
| »» currency        | string | Currency name                                           |
| »» min_lend_amount | string | The minimum lending amount, in the unit of the currency |
| »» max_lend_amount | string | The total maximum lending amount, in USDT               |
| »» max_rate        | string | Maximum rate (Hourly)                                   |
| »» min_rate        | string | Minimum rate (Hourly)                                   |

This operation does not require authentication

## [#](#query-single-lending-currency-details) Query single lending currency details

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-single-lending-currency-details](https://www.gate.io/docs/developers/apiv4/en/#query-single-lending-currency-details)

> Code samples
