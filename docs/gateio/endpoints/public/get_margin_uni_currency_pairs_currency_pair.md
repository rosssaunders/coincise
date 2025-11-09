# GET /margin/uni/currency_pairs/{currency_pair}

**Source:** [/margin/uni/currency_pairs/{currency_pair}](https://www.gate.io/docs/developers/apiv4/en/#getisolatedunicurrencypair-parameters)

## Authentication

Not Required (Public Endpoint)

## [#](#get-lending-market-details) Get lending market details

`GET /margin/uni/currency_pairs/{currency_pair}`

_Get lending market details_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getisolatedunicurrencypair-parameters](https://www.gate.io/docs/developers/apiv4/en/#getisolatedunicurrencypair-parameters)

| Name          | In   | Type   | Required | Description  |
| ------------- | ---- | ------ | -------- | ------------ |
| currency_pair | path | string | true     | Trading pair |

> Example responses

> 200 Response

```
{
  "currency_pair": "AE_USDT",
  "base_min_borrow_amount": "100",
  "quote_min_borrow_amount": "100",
  "leverage": "3"
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getisolatedunicurrencypair-responses](https://www.gate.io/docs/developers/apiv4/en/#getisolatedunicurrencypair-responses)

| Status | Meaning                                                                    | Description      | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getisolatedunicurrencypair-responseschema](https://www.gate.io/docs/developers/apiv4/en/#getisolatedunicurrencypair-responseschema)

Status Code **200**

_Currency pair of the loan_

| Name                      | Type   | Description                             |
| ------------------------- | ------ | --------------------------------------- |
| » currency_pair           | string | Trading pair                            |
| » base_min_borrow_amount  | string | Minimum borrow amount of base currency  |
| » quote_min_borrow_amount | string | Minimum borrow amount of quote currency |
| » leverage                | string | Position leverage                       |

This operation does not require authentication

## [#](#estimate-interest-rate-for-isolated-margin-currencies) Estimate interest rate for isolated margin currencies

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#estimate-interest-rate-for-isolated-margin-currencies](https://www.gate.io/docs/developers/apiv4/en/#estimate-interest-rate-for-isolated-margin-currencies)

> Code samples
