# GET /margin/loan_margin_tiers

**Source:**
[/margin/loan_margin_tiers](https://www.gate.io/docs/developers/apiv4/en/#getisolatedmarketmargintier-parameters)

## Authentication

Not Required (Public Endpoint)

## [#](#query-current-market-leverage-lending-tiers) Query current market leverage lending tiers

`GET /margin/loan_margin_tiers`

_Query current market leverage lending tiers_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getisolatedmarketmargintier-parameters](https://www.gate.io/docs/developers/apiv4/en/#getisolatedmarketmargintier-parameters)

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
[https://www.gate.io/docs/developers/apiv4/en/#getisolatedmarketmargintier-responses](https://www.gate.io/docs/developers/apiv4/en/#getisolatedmarketmargintier-responses)

| Status | Meaning                                                                    | Description      | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getisolatedmarketmargintier-responseschema](https://www.gate.io/docs/developers/apiv4/en/#getisolatedmarketmargintier-responseschema)

Status Code **200**

| Name           | Type   | Description                     |
| -------------- | ------ | ------------------------------- |
| _None_         | array  | \[Market gradient information\] |
| » _None_       | object | Market gradient information     |
| »» upper_limit | string | Maximum loan limit              |
| »» mmr         | string | Maintenance margin rate         |
| »» leverage    | string | Maximum leverage multiple       |

This operation does not require authentication

## [#](#set-user-market-leverage-multiplier) Set user market leverage multiplier

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#set-user-market-leverage-multiplier](https://www.gate.io/docs/developers/apiv4/en/#set-user-market-leverage-multiplier)

> Code samples
