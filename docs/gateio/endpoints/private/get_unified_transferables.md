# GET /unified/transferables

**Source:**
[/unified/transferables](https://www.gate.io/docs/developers/apiv4/en/#getunifiedtransferables-parameters)

## Authentication

Required (Private Endpoint)

## [#](#batch-query-maximum-transferable-amount-for-unified-accounts-each-currency-shows-the-maximum-value-after-user-withdrawal-the-transferable-amount-for-all-currencies-will-change) Batch query maximum transferable amount for unified accounts. Each currency shows the maximum value. After user withdrawal, the transferable amount for all currencies will change

`GET /unified/transferables`

_Batch query maximum transferable amount for unified accounts. Each currency
shows the maximum value. After user withdrawal, the transferable amount for all
currencies will change_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getunifiedtransferables-parameters](https://www.gate.io/docs/developers/apiv4/en/#getunifiedtransferables-parameters)

| Name       | In    | Type   | Required | Description                                                                                    |
| ---------- | ----- | ------ | -------- | ---------------------------------------------------------------------------------------------- |
| currencies | query | string | true     | Specify the currency name to query in batches, and support up to 100 pass parameters at a time |

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
[https://www.gate.io/docs/developers/apiv4/en/#getunifiedtransferables-responses](https://www.gate.io/docs/developers/apiv4/en/#getunifiedtransferables-responses)

| Status | Meaning                                                                    | Description      | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getunifiedtransferables-responseschema](https://www.gate.io/docs/developers/apiv4/en/#getunifiedtransferables-responseschema)

Status Code **200**

| Name                  | Type   | Description                                              |
| --------------------- | ------ | -------------------------------------------------------- |
| » TransferablesResult | object | Batch query unified account maximum transferable results |
| »» currency           | string | Currency detail                                          |
| »» amount             | string | Maximum transferable amount                              |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#batch-query-unified-account-maximum-borrowable-amount) Batch query unified account maximum borrowable amount

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#batch-query-unified-account-maximum-borrowable-amount](https://www.gate.io/docs/developers/apiv4/en/#batch-query-unified-account-maximum-borrowable-amount)

> Code samples
