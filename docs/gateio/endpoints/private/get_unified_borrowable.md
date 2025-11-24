# GET /unified/borrowable

**Source:** [/unified/borrowable](https://www.gate.io/docs/developers/apiv4/en/#getunifiedborrowable-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-maximum-borrowable-amount-for-unified-account) Query maximum borrowable amount for unified account

`GET /unified/borrowable`

_Query maximum borrowable amount for unified account_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getunifiedborrowable-parameters](https://www.gate.io/docs/developers/apiv4/en/#getunifiedborrowable-parameters)

| Name     | In    | Type   | Required | Description                      |
| -------- | ----- | ------ | -------- | -------------------------------- |
| currency | query | string | true     | Query by specified currency name |

> Example responses

> 200 Response

```json
{
  "currency": "ETH",
  "amount": "10000"
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getunifiedborrowable-responses](https://www.gate.io/docs/developers/apiv4/en/#getunifiedborrowable-responses)

| Status | Meaning                                                                    | Description      | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getunifiedborrowable-responseschema](https://www.gate.io/docs/developers/apiv4/en/#getunifiedborrowable-responseschema)

Status Code **200**

_UnifiedBorrowable_

| Name       | Type   | Description           |
| ---------- | ------ | --------------------- |
| » currency | string | Currency detail       |
| » amount   | string | Max borrowable amount |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-maximum-transferable-amount-for-unified-account) Query maximum transferable amount for unified account

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-maximum-transferable-amount-for-unified-account](https://www.gate.io/docs/developers/apiv4/en/#query-maximum-transferable-amount-for-unified-account)

> Code samples
