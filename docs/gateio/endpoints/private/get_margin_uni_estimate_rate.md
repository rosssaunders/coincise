# GET /margin/uni/estimate_rate

**Source:**
[/margin/uni/estimate_rate](https://www.gate.io/docs/developers/apiv4/en/#getisolatedmarginuniestimaterate-parameters)

## Authentication

Required (Private Endpoint)

## [#](#estimate-interest-rate-for-isolated-margin-currencies) Estimate interest rate for isolated margin currencies

`GET /margin/uni/estimate_rate`

_Estimate interest rate for isolated margin currencies_

Interest rates change hourly based on lending depth, so completely accurate
rates cannot be provided.

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getisolatedmarginuniestimaterate-parameters](https://www.gate.io/docs/developers/apiv4/en/#getisolatedmarginuniestimaterate-parameters)

| Name       | In    | Type            | Required | Description                                  |
| ---------- | ----- | --------------- | -------- | -------------------------------------------- |
| currencies | query | array\[string\] | true     | Array of currency names to query, maximum 10 |

> Example responses

> 200 Response

```
{
  "BTC": "0.000002",
  "GT": "0.000001"
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getisolatedmarginuniestimaterate-responses](https://www.gate.io/docs/developers/apiv4/en/#getisolatedmarginuniestimaterate-responses)

| Status | Meaning                                                                    | Description      | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getisolatedmarginuniestimaterate-responseschema](https://www.gate.io/docs/developers/apiv4/en/#getisolatedmarginuniestimaterate-responseschema)

Status Code **200**

_Estimate current hourly lending rates, returned by currency_

| Name                       | Type   | Description |
| -------------------------- | ------ | ----------- |
| » **additionalProperties** | string | none        |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#borrow-or-repay-2) Borrow or repay

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#borrow-or-repay-2](https://www.gate.io/docs/developers/apiv4/en/#borrow-or-repay-2)

> Code samples
