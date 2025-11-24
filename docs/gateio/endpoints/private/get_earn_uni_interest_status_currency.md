# GET /earn/uni/interest_status/{currency}

**Source:**
[/earn/uni/interest_status/{currency}](https://www.gate.io/docs/developers/apiv4/en/#getuniintereststatus-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-currency-interest-compounding-status) Query currency interest compounding status

`GET /earn/uni/interest_status/{currency}`

_Query currency interest compounding status_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getuniintereststatus-parameters](https://www.gate.io/docs/developers/apiv4/en/#getuniintereststatus-parameters)

| Name     | In   | Type   | Required | Description |
| -------- | ---- | ------ | -------- | ----------- |
| currency | path | string | true     | Currency    |

> Example responses

> 200 Response

```json
{
  "currency": "BTC",
  "interest_status": "interest_dividend"
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getuniintereststatus-responses](https://www.gate.io/docs/developers/apiv4/en/#getuniintereststatus-responses)

| Status | Meaning                                                                    | Description      | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getuniintereststatus-responseschema](https://www.gate.io/docs/developers/apiv4/en/#getuniintereststatus-responseschema)

Status Code **200**

_UniCurrencyInterest_

| Name              | Type   | Description                                                                                     |
| ----------------- | ------ | ----------------------------------------------------------------------------------------------- |
| » currency        | string | Currency                                                                                        |
| » interest_status | string | Interest status: interest_dividend - Normal dividend, interest_reinvest - Interest reinvestment |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#uniloan-currency-annualized-trend-chart) UniLoan currency annualized trend chart

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#uniloan-currency-annualized-trend-chart](https://www.gate.io/docs/developers/apiv4/en/#uniloan-currency-annualized-trend-chart)

> Code samples
