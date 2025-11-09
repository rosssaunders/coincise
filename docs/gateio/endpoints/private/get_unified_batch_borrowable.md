# GET /unified/batch_borrowable

**Source:** [/unified/batch_borrowable](https://www.gate.io/docs/developers/apiv4/en/#getunifiedborrowablelist-parameters)

## Authentication

Required (Private Endpoint)

## [#](#batch-query-unified-account-maximum-borrowable-amount) Batch query unified account maximum borrowable amount

`GET /unified/batch_borrowable`

_Batch query unified account maximum borrowable amount_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getunifiedborrowablelist-parameters](https://www.gate.io/docs/developers/apiv4/en/#getunifiedborrowablelist-parameters)

| Name       | In    | Type            | Required | Description                                                                                 |
| ---------- | ----- | --------------- | -------- | ------------------------------------------------------------------------------------------- |
| currencies | query | array\[string\] | true     | Specify currency names for querying in an array, separated by commas, maximum 10 currencies |

> Example responses

> 200 Response

```
[
  {
    "currency": "BTC",
    "amount": "123456"
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getunifiedborrowablelist-responses](https://www.gate.io/docs/developers/apiv4/en/#getunifiedborrowablelist-responses)

| Status | Meaning                                                                    | Description      | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getunifiedborrowablelist-responseschema](https://www.gate.io/docs/developers/apiv4/en/#getunifiedborrowablelist-responseschema)

Status Code **200**

| Name                | Type   | Description                                            |
| ------------------- | ------ | ------------------------------------------------------ |
| » UnifiedBorrowable | object | Batch query unified account maximum borrowable results |
| »» currency         | string | Currency detail                                        |
| »» amount           | string | Maximum borrowable amount                              |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#borrow-or-repay) Borrow or repay

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#borrow-or-repay](https://www.gate.io/docs/developers/apiv4/en/#borrow-or-repay)

> Code samples
