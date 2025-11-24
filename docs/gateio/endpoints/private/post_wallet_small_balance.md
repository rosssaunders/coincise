# POST /wallet/small_balance

**Source:** [/wallet/small_balance](https://www.gate.io/docs/developers/apiv4/en/#convertsmallbalance-parameters)

## Authentication

Required (Private Endpoint)

## [#](#convert-small-balance-currency) Convert small balance currency

`POST /wallet/small_balance`

_Convert small balance currency_

> Body parameter

```json
{
  "currency": [
    "FLOKI",
    "MBLK"
  ],
  "is_all": true
}
```

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#convertsmallbalance-parameters](https://www.gate.io/docs/developers/apiv4/en/#convertsmallbalance-parameters)

| Name       | In   | Type    | Required | Description              |
| ---------- | ---- | ------- | -------- | ------------------------ |
| body       | body | object  | true     | none                     |
| » currency | body | array   | false    | Currency to be converted |
| » is_all   | body | boolean | false    | Whether to convert all   |

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#convertsmallbalance-responses](https://www.gate.io/docs/developers/apiv4/en/#convertsmallbalance-responses)

| Status | Meaning                                                                    | Description | Schema |
| ------ | -------------------------------------------------------------------------- | ----------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success     | None   |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-convertible-small-balance-currency-history) Get convertible small balance currency history

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#get-convertible-small-balance-currency-history](https://www.gate.io/docs/developers/apiv4/en/#get-convertible-small-balance-currency-history)

> Code samples
