# GET /wallet/small_balance

**Source:** [/wallet/small_balance](https://www.gate.io/docs/developers/apiv4/en/#listsmallbalance-responses)

## Authentication

Required (Private Endpoint)

## [#](#get-list-of-convertible-small-balance-currencies) Get list of convertible small balance currencies

`GET /wallet/small_balance`

_Get list of convertible small balance currencies_

> Example responses

> 200 Response

```json
[
  [
    {
      "currency": "FLOKI",
      "available_balance": "182.29400000",
      "estimated_as_btc": "0.00000012",
      "convertible_to_gt": "0.001080"
    },
    {
      "currency": "MBLK",
      "available_balance": "0.91723337",
      "estimated_as_btc": "0.00000102",
      "convertible_to_gt": "0.009188"
    }
  ]
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listsmallbalance-responses](https://www.gate.io/docs/developers/apiv4/en/#listsmallbalance-responses)

| Status | Meaning                                                                    | Description | Schema     |
| ------ | -------------------------------------------------------------------------- | ----------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success     | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listsmallbalance-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listsmallbalance-responseschema)

Status Code **200**

| Name                 | Type   | Description                |
| -------------------- | ------ | -------------------------- |
| » _None_             | object | Small Balance Conversion   |
| »» currency          | string | Currency                   |
| »» available_balance | string | Available balance          |
| »» estimated_as_btc  | string | Estimated as BTC           |
| »» convertible_to_gt | string | Estimated conversion to GT |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#convert-small-balance-currency) Convert small balance currency

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#convert-small-balance-currency](https://www.gate.io/docs/developers/apiv4/en/#convert-small-balance-currency)

> Code samples
