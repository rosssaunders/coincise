# POST /margin/leverage/user_market_setting

**Source:** [/margin/leverage/user_market_setting](https://www.gate.io/docs/developers/apiv4/en/#setisolatedusermarketleverage-parameters)

## Authentication

Required (Private Endpoint)

## [#](#set-user-market-leverage-multiplier) Set user market leverage multiplier

`POST /margin/leverage/user_market_setting`

_Set user market leverage multiplier_

> Body parameter

```
{
  "currency_pair": "BTC_USDT",
  "leverage": "10"
}
```

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#setisolatedusermarketleverage-parameters](https://www.gate.io/docs/developers/apiv4/en/#setisolatedusermarketleverage-parameters)

| Name            | In   | Type   | Required | Description       |
| --------------- | ---- | ------ | -------- | ----------------- |
| body            | body | object | true     | none              |
| » currency_pair | body | string | false    | Market            |
| » leverage      | body | string | true     | Position leverage |

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#setisolatedusermarketleverage-responses](https://www.gate.io/docs/developers/apiv4/en/#setisolatedusermarketleverage-responses)

| Status | Meaning                                                                            | Description      | Schema |
| ------ | ---------------------------------------------------------------------------------- | ---------------- | ------ |
| 204    | [No Content (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.5) | Set successfully | None   |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-user-s-isolated-margin-account-list) Query user's isolated margin account list

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-user-s-isolated-margin-account-list](https://www.gate.io/docs/developers/apiv4/en/#query-user-s-isolated-margin-account-list)

> Code samples
