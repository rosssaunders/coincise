# GET /margin/uni/currency_pairs

**Source:** [/margin/uni/currency_pairs](https://www.gate.io/docs/developers/apiv4/en/#listisolatedunicurrencypairs-responses)

## Authentication

Not Required (Public Endpoint)

## [#](#list-lending-markets) List lending markets

`GET /margin/uni/currency_pairs`

_List lending markets_

> Example responses

> 200 Response

```
[
  {
    "currency_pair": "AE_USDT",
    "base_min_borrow_amount": "100",
    "quote_min_borrow_amount": "100",
    "leverage": "3"
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listisolatedunicurrencypairs-responses](https://www.gate.io/docs/developers/apiv4/en/#listisolatedunicurrencypairs-responses)

| Status | Meaning                                                                    | Description      | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listisolatedunicurrencypairs-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listisolatedunicurrencypairs-responseschema)

Status Code **200**

| Name                       | Type   | Description                             |
| -------------------------- | ------ | --------------------------------------- |
| _None_                     | array  | \[Currency pair of the loan\]           |
| » _None_                   | object | Currency pair of the loan               |
| »» currency_pair           | string | Trading pair                            |
| »» base_min_borrow_amount  | string | Minimum borrow amount of base currency  |
| »» quote_min_borrow_amount | string | Minimum borrow amount of quote currency |
| »» leverage                | string | Position leverage                       |

This operation does not require authentication

## [#](#get-lending-market-details) Get lending market details

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#get-lending-market-details](https://www.gate.io/docs/developers/apiv4/en/#get-lending-market-details)

> Code samples
