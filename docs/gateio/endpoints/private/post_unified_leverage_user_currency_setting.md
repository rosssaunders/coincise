# POST /unified/leverage/user_currency_setting

**Source:**
[/unified/leverage/user_currency_setting](https://www.gate.io/docs/developers/apiv4/en/#setuserleveragecurrencysetting-parameters)

## Authentication

Required (Private Endpoint)

## [#](#set-loan-currency-leverage) Set loan currency leverage

`POST /unified/leverage/user_currency_setting`

_Set loan currency leverage_

> Body parameter

```
{
  "currency": "BTC",
  "leverage": "3"
}
```

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#setuserleveragecurrencysetting-parameters](https://www.gate.io/docs/developers/apiv4/en/#setuserleveragecurrencysetting-parameters)

| Name       | In   | Type   | Required | Description   |
| ---------- | ---- | ------ | -------- | ------------- |
| body       | body | object | true     | none          |
| » currency | body | string | true     | Currency name |
| » leverage | body | string | true     | Multiplier    |

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#setuserleveragecurrencysetting-responses](https://www.gate.io/docs/developers/apiv4/en/#setuserleveragecurrencysetting-responses)

| Status | Meaning                                                                            | Description      | Schema |
| ------ | ---------------------------------------------------------------------------------- | ---------------- | ------ |
| 204    | [No Content (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.5) | Set successfully | None   |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-of-loan-currencies-supported-by-unified-account) List of loan currencies supported by unified account

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#list-of-loan-currencies-supported-by-unified-account](https://www.gate.io/docs/developers/apiv4/en/#list-of-loan-currencies-supported-by-unified-account)

> Code samples
