# GET /margin/user/loan_margin_tiers

**Source:**
[/margin/user/loan_margin_tiers](https://www.gate.io/docs/developers/apiv4/en/#getisolatedusermargintier-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-user-s-own-leverage-lending-tiers-in-current-market) Query user's own leverage lending tiers in current market

`GET /margin/user/loan_margin_tiers`

_Query user's own leverage lending tiers in current market_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getisolatedusermargintier-parameters](https://www.gate.io/docs/developers/apiv4/en/#getisolatedusermargintier-parameters)

| Name          | In    | Type   | Required | Description  |
| ------------- | ----- | ------ | -------- | ------------ |
| currency_pair | query | string | true     | Trading pair |

> Example responses

> 200 Response

```
[
  {
    "tier_amount": "100",
    "mmr": "0.9",
    "leverage": "1"
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getisolatedusermargintier-responses](https://www.gate.io/docs/developers/apiv4/en/#getisolatedusermargintier-responses)

| Status | Meaning                                                                    | Description      | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getisolatedusermargintier-responseschema](https://www.gate.io/docs/developers/apiv4/en/#getisolatedusermargintier-responseschema)

Status Code **200**

| Name           | Type   | Description                     |
| -------------- | ------ | ------------------------------- |
| _None_         | array  | \[Market gradient information\] |
| » _None_       | object | Market gradient information     |
| »» upper_limit | string | Maximum loan limit              |
| »» mmr         | string | Maintenance margin rate         |
| »» leverage    | string | Maximum leverage multiple       |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-current-market-leverage-lending-tiers) Query current market leverage lending tiers

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-current-market-leverage-lending-tiers](https://www.gate.io/docs/developers/apiv4/en/#query-current-market-leverage-lending-tiers)

> Code samples
