# GET /loan/multi_collateral/currency_quota

**Source:** [/loan/multi_collateral/currency_quota](https://www.gate.io/docs/developers/apiv4/en/#listusercurrencyquota-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-user-s-collateral-and-borrowing-currency-quota-information) Query user's collateral and borrowing currency quota information

`GET /loan/multi_collateral/currency_quota`

_Query user's collateral and borrowing currency quota information_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listusercurrencyquota-parameters](https://www.gate.io/docs/developers/apiv4/en/#listusercurrencyquota-parameters)

| Name     | In    | Type   | Required | Description                                                                                                                                                    |
| -------- | ----- | ------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type     | query | string | true     | Currency type: collateral - Collateral currency, borrow - Borrowing currency                                                                                   |
| currency | query | string | true     | When it is a collateral currency, multiple currencies can be provided separated by commas; when it is a borrowing currency, only one currency can be provided. |

> Example responses

> 200 Response

```
[
  {
    "currency": "BTC",
    "index_price": "35306.1",
    "min_quota": "0",
    "left_quota": "2768152.4958445218723677",
    "left_quote_usdt": "97732668833.536273678"
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listusercurrencyquota-responses](https://www.gate.io/docs/developers/apiv4/en/#listusercurrencyquota-responses)

| Status | Meaning                                                                    | Description      | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listusercurrencyquota-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listusercurrencyquota-responseschema)

Status Code **200**

| Name               | Type   | Description                                           |
| ------------------ | ------ | ----------------------------------------------------- |
| » _None_           | object | Currency Quota                                        |
| »» currency        | string | Currency                                              |
| »» index_price     | string | Currency Index Price                                  |
| »» min_quota       | string | Minimum borrowing/collateral limit for the currency   |
| »» left_quota      | string | Remaining borrowing/collateral quota for the currency |
| »» left_quote_usdt | string | Remaining currency limit converted to USDT            |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-supported-borrowing-and-collateral-currencies-for-multi-currency-collateral) Query supported borrowing and collateral currencies for multi-currency collateral

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-supported-borrowing-and-collateral-currencies-for-multi-currency-collateral](https://www.gate.io/docs/developers/apiv4/en/#query-supported-borrowing-and-collateral-currencies-for-multi-currency-collateral)

> Code samples
