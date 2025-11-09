# GET /unified/transferable

**Source:** [/unified/transferable](https://www.gate.io/docs/developers/apiv4/en/#getunifiedtransferable-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-maximum-transferable-amount-for-unified-account) Query maximum transferable amount for unified account

`GET /unified/transferable`

_Query maximum transferable amount for unified account_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getunifiedtransferable-parameters](https://www.gate.io/docs/developers/apiv4/en/#getunifiedtransferable-parameters)

| Name     | In    | Type   | Required | Description                      |
| -------- | ----- | ------ | -------- | -------------------------------- |
| currency | query | string | true     | Query by specified currency name |

> Example responses

> 200 Response

```
{
  "currency": "ETH",
  "amount": "10000"
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getunifiedtransferable-responses](https://www.gate.io/docs/developers/apiv4/en/#getunifiedtransferable-responses)

| Status | Meaning                                                                    | Description      | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getunifiedtransferable-responseschema](https://www.gate.io/docs/developers/apiv4/en/#getunifiedtransferable-responseschema)

Status Code **200**

_UnifiedTransferable_

| Name       | Type   | Description                 |
| ---------- | ------ | --------------------------- |
| » currency | string | Currency detail             |
| » amount   | string | Maximum transferable amount |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#batch-query-maximum-transferable-amount-for-unified-accounts-each-currency-shows-the-maximum-value-after-user-withdrawal-the-transferable-amount-for-all-currencies-will-change) Batch query maximum transferable amount for unified accounts. Each currency shows the maximum value. After user withdrawal, the transferable amount for all currencies will change

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#batch-query-maximum-transferable-amount-for-unified-accounts-each-currency-shows-the-maximum-value-after-user-withdrawal-the-transferable-amount-for-all-currencies-will-change](https://www.gate.io/docs/developers/apiv4/en/#batch-query-maximum-transferable-amount-for-unified-accounts-each-currency-shows-the-maximum-value-after-user-withdrawal-the-transferable-amount-for-all-currencies-will-change)

> Code samples
