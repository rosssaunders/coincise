# GET /unified/leverage/user_currency_setting

**Source:** [/unified/leverage/user_currency_setting](https://www.gate.io/docs/developers/apiv4/en/#getuserleveragecurrencysetting-parameters)

## Authentication

Required (Private Endpoint)

## [#](#get-user-currency-leverage) Get user currency leverage

`GET /unified/leverage/user_currency_setting`

_Get user currency leverage_

Get user currency leverage. If currency is not specified, query all currencies

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getuserleveragecurrencysetting-parameters](https://www.gate.io/docs/developers/apiv4/en/#getuserleveragecurrencysetting-parameters)

| Name     | In    | Type   | Required | Description |
| -------- | ----- | ------ | -------- | ----------- |
| currency | query | string | false    | Currency    |

> Example responses

> 200 Response

```
[
  {
    "currency": "BTC",
    "leverage": "3"
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getuserleveragecurrencysetting-responses](https://www.gate.io/docs/developers/apiv4/en/#getuserleveragecurrencysetting-responses)

| Status | Meaning                                                                    | Description      | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getuserleveragecurrencysetting-responseschema](https://www.gate.io/docs/developers/apiv4/en/#getuserleveragecurrencysetting-responseschema)

Status Code **200**

| Name        | Type   | Description                                    |
| ----------- | ------ | ---------------------------------------------- |
| _None_      | array  | \[Leverage multiplier for borrowing currency\] |
| » _None_    | object | Leverage multiplier for borrowing currency     |
| »» currency | string | Currency name                                  |
| »» leverage | string | Multiplier                                     |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#set-loan-currency-leverage) Set loan currency leverage

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#set-loan-currency-leverage](https://www.gate.io/docs/developers/apiv4/en/#set-loan-currency-leverage)

> Code samples
