# PATCH /earn/uni/lends

**Source:**
[/earn/uni/lends](https://www.gate.io/docs/developers/apiv4/en/#changeunilend-parameters)

## Authentication

Required (Private Endpoint)

## [#](#amend-user-lending-information) Amend user lending information

`PATCH /earn/uni/lends`

_Amend user lending information_

Currently only supports amending minimum interest rate (hourly)

> Body parameter

```json
{
  "currency": "AE",
  "min_rate": "0.0001"
}
```

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#changeunilend-parameters](https://www.gate.io/docs/developers/apiv4/en/#changeunilend-parameters)

| Name       | In   | Type   | Required | Description           |
| ---------- | ---- | ------ | -------- | --------------------- |
| body       | body | object | true     | none                  |
| » currency | body | string | false    | Currency name         |
| » min_rate | body | string | false    | Minimum interest rate |

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#changeunilend-responses](https://www.gate.io/docs/developers/apiv4/en/#changeunilend-responses)

| Status | Meaning                                                                            | Description          | Schema |
| ------ | ---------------------------------------------------------------------------------- | -------------------- | ------ |
| 204    | [No Content (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.5) | Updated successfully | None   |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-lending-transaction-records) Query lending transaction records

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-lending-transaction-records](https://www.gate.io/docs/developers/apiv4/en/#query-lending-transaction-records)

> Code samples
