# GET /margin/uni/borrowable

**Source:**
[/margin/uni/borrowable](https://www.gate.io/docs/developers/apiv4/en/#getisolateduniborrowable-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-maximum-borrowable-amount-by-currency) Query maximum borrowable amount by currency

`GET /margin/uni/borrowable`

_Query maximum borrowable amount by currency_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getisolateduniborrowable-parameters](https://www.gate.io/docs/developers/apiv4/en/#getisolateduniborrowable-parameters)

| Name          | In    | Type   | Required | Description                      |
| ------------- | ----- | ------ | -------- | -------------------------------- |
| currency      | query | string | true     | Query by specified currency name |
| currency_pair | query | string | true     | Trading pair                     |

> Example responses

> 200 Response

```json
{
  "currency": "AE",
  "borrowable": "1123.344",
  "currency_pair": "AE_USDT"
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getisolateduniborrowable-responses](https://www.gate.io/docs/developers/apiv4/en/#getisolateduniborrowable-responses)

| Status | Meaning                                                                    | Description      | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getisolateduniborrowable-responseschema](https://www.gate.io/docs/developers/apiv4/en/#getisolateduniborrowable-responseschema)

Status Code **200**

_MaxUniBorrowable_

| Name            | Type   | Description        |
| --------------- | ------ | ------------------ |
| » currency      | string | Currency           |
| » currency_pair | string | Trading pair       |
| » borrowable    | string | Maximum borrowable |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-user-s-own-leverage-lending-tiers-in-current-market) Query user's own leverage lending tiers in current market

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-user-s-own-leverage-lending-tiers-in-current-market](https://www.gate.io/docs/developers/apiv4/en/#query-user-s-own-leverage-lending-tiers-in-current-market)

> Code samples
