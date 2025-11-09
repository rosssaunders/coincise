# GET /unified/leverage/user_currency_config

**Source:** [/unified/leverage/user_currency_config](https://www.gate.io/docs/developers/apiv4/en/#getuserleveragecurrencyconfig-parameters)

## Authentication

Required (Private Endpoint)

## [#](#maximum-and-minimum-currency-leverage-that-can-be-set) Maximum and minimum currency leverage that can be set

`GET /unified/leverage/user_currency_config`

_Maximum and minimum currency leverage that can be set_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getuserleveragecurrencyconfig-parameters](https://www.gate.io/docs/developers/apiv4/en/#getuserleveragecurrencyconfig-parameters)

| Name     | In    | Type   | Required | Description |
| -------- | ----- | ------ | -------- | ----------- |
| currency | query | string | true     | Currency    |

> Example responses

> 200 Response

```
{
  "current_leverage": "2",
  "min_leverage": "0",
  "max_leverage": "0",
  "debit": "0",
  "available_margin": "0",
  "borrowable": "0",
  "except_leverage_borrowable": "0"
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getuserleveragecurrencyconfig-responses](https://www.gate.io/docs/developers/apiv4/en/#getuserleveragecurrencyconfig-responses)

| Status | Meaning                                                                    | Description      | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getuserleveragecurrencyconfig-responseschema](https://www.gate.io/docs/developers/apiv4/en/#getuserleveragecurrencyconfig-responseschema)

Status Code **200**

| Name                         | Type   | Description                                                                           |
| ---------------------------- | ------ | ------------------------------------------------------------------------------------- |
| » current_leverage           | string | Current leverage ratio                                                                |
| » min_leverage               | string | Minimum adjustable leverage ratio                                                     |
| » max_leverage               | string | Maximum adjustable leverage ratio                                                     |
| » debit                      | string | Current liabilities                                                                   |
| » available_margin           | string | Available Margin                                                                      |
| » borrowable                 | string | Maximum borrowable amount at current leverage                                         |
| » except_leverage_borrowable | string | Maximum borrowable from margin and maximum borrowable from Earn, whichever is smaller |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-user-currency-leverage) Get user currency leverage

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#get-user-currency-leverage](https://www.gate.io/docs/developers/apiv4/en/#get-user-currency-leverage)

> Code samples
