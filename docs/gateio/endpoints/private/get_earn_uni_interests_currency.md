# GET /earn/uni/interests/{currency}

**Source:**
[/earn/uni/interests/{currency}](https://www.gate.io/docs/developers/apiv4/en/#getuniinterest-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-user-s-total-interest-income-for-specified-currency) Query user's total interest income for specified currency

`GET /earn/uni/interests/{currency}`

_Query user's total interest income for specified currency_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getuniinterest-parameters](https://www.gate.io/docs/developers/apiv4/en/#getuniinterest-parameters)

| Name     | In   | Type   | Required | Description |
| -------- | ---- | ------ | -------- | ----------- |
| currency | path | string | true     | Currency    |

> Example responses

> 200 Response

```
{
  "currency": "AE",
  "interest": "123.345"
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getuniinterest-responses](https://www.gate.io/docs/developers/apiv4/en/#getuniinterest-responses)

| Status | Meaning                                                                    | Description      | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getuniinterest-responseschema](https://www.gate.io/docs/developers/apiv4/en/#getuniinterest-responseschema)

Status Code **200**

_UniLendInterest_

| Name       | Type   | Description     |
| ---------- | ------ | --------------- |
| » currency | string | Currency        |
| » interest | string | Interest income |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-user-dividend-records) Query user dividend records

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-user-dividend-records](https://www.gate.io/docs/developers/apiv4/en/#query-user-dividend-records)

> Code samples
