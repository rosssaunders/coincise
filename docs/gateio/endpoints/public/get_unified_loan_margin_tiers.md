# GET /unified/loan_margin_tiers

**Source:** [/unified/loan_margin_tiers](https://www.gate.io/docs/developers/apiv4/en/#listloanmargintiers-responses)

## Authentication

Not Required (Public Endpoint)

## [#](#query-unified-account-tiered-loan-margin) Query unified account tiered loan margin

`GET /unified/loan_margin_tiers`

_Query unified account tiered loan margin_

> Example responses

> 200 Response

```json
[
  {
    "currency": "USDT",
    "margin_tiers": [
      {
        "tier": "1",
        "margin_rate": "0.02",
        "lower_limit": "200000",
        "upper_limit": "400000",
        "leverage": "3"
      }
    ]
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listloanmargintiers-responses](https://www.gate.io/docs/developers/apiv4/en/#listloanmargintiers-responses)

| Status | Meaning                                                                    | Description      | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listloanmargintiers-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listloanmargintiers-responseschema)

Status Code **200**

| Name             | Type   | Description                                            |
| ---------------- | ------ | ------------------------------------------------------ |
| » _None_         | object | Unified account borrowing margin tiers                 |
| »» currency      | string | Currency name                                          |
| »» margin_tiers  | array  | Tiered margin                                          |
| »»» MarginTiers  | object | none                                                   |
| »»»» tier        | string | Tier                                                   |
| »»»» margin_rate | string | Discount                                               |
| »»»» lower_limit | string | Lower limit                                            |
| »»»» upper_limit | string | Upper limit, "" indicates greater than (the last tier) |
| »»»» leverage    | string | Position leverage                                      |

This operation does not require authentication

## [#](#portfolio-margin-calculator) Portfolio margin calculator

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#portfolio-margin-calculator](https://www.gate.io/docs/developers/apiv4/en/#portfolio-margin-calculator)

> Code samples
