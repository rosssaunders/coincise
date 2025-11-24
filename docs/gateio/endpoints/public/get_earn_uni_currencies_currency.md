# GET /earn/uni/currencies/{currency}

**Source:** [/earn/uni/currencies/{currency}](https://www.gate.io/docs/developers/apiv4/en/#getunicurrency-parameters)

## Authentication

Not Required (Public Endpoint)

## [#](#query-single-lending-currency-details) Query single lending currency details

`GET /earn/uni/currencies/{currency}`

_Query single lending currency details_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getunicurrency-parameters](https://www.gate.io/docs/developers/apiv4/en/#getunicurrency-parameters)

| Name     | In   | Type   | Required | Description |
| -------- | ---- | ------ | -------- | ----------- |
| currency | path | string | true     | Currency    |

> Example responses

> 200 Response

```json
{
  "currency": "AE",
  "min_lend_amount": "100",
  "max_lend_amount": "200000000",
  "max_rate": "0.00057",
  "min_rate": "0.000001"
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getunicurrency-responses](https://www.gate.io/docs/developers/apiv4/en/#getunicurrency-responses)

| Status | Meaning                                                                    | Description      | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getunicurrency-responseschema](https://www.gate.io/docs/developers/apiv4/en/#getunicurrency-responseschema)

Status Code **200**

_Currency detail_

| Name              | Type   | Description                                             |
| ----------------- | ------ | ------------------------------------------------------- |
| » currency        | string | Currency name                                           |
| » min_lend_amount | string | The minimum lending amount, in the unit of the currency |
| » max_lend_amount | string | The total maximum lending amount, in USDT               |
| » max_rate        | string | Maximum rate (Hourly)                                   |
| » min_rate        | string | Minimum rate (Hourly)                                   |

This operation does not require authentication

## [#](#create-lending-or-redemption) Create lending or redemption

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#create-lending-or-redemption](https://www.gate.io/docs/developers/apiv4/en/#create-lending-or-redemption)

> Code samples
