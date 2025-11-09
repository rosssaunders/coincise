# POST /margin/uni/loans

**Source:**
[/margin/uni/loans](https://www.gate.io/docs/developers/apiv4/en/#createisolateduniloan-parameters)

## Authentication

Required (Private Endpoint)

## [#](#borrow-or-repay-2) Borrow or repay

`POST /margin/uni/loans`

_Borrow or repay_

> Body parameter

```
{
  "currency": "BTC",
  "amount": "0.1",
  "type": "borrow",
  "currency_pair": "BTC_USDT",
  "repaid_all": false
}
```

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#createisolateduniloan-parameters](https://www.gate.io/docs/developers/apiv4/en/#createisolateduniloan-parameters)

| Name            | In   | Type    | Required | Description                                                                                               |
| --------------- | ---- | ------- | -------- | --------------------------------------------------------------------------------------------------------- |
| body            | body | object  | true     | none                                                                                                      |
| » currency      | body | string  | true     | Currency                                                                                                  |
| » type          | body | string  | true     | Type: `borrow` - borrow, `repay` - repay                                                                  |
| » amount        | body | string  | true     | Borrow or repayment amount                                                                                |
| » repaid_all    | body | boolean | false    | Full repayment. For repayment operations only. When `true`, overrides `amount` and repays the full amount |
| » currency_pair | body | string  | true     | Trading pair                                                                                              |

#### [#](#enumerated-values-8) Enumerated Values

| Parameter | Value  |
| --------- | ------ |
| » type    | borrow |
| » type    | repay  |

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#createisolateduniloan-responses](https://www.gate.io/docs/developers/apiv4/en/#createisolateduniloan-responses)

| Status | Meaning                                                                            | Description          | Schema |
| ------ | ---------------------------------------------------------------------------------- | -------------------- | ------ |
| 204    | [No Content (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.5) | Operation successful | None   |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-loans-2) Query loans

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-loans-2](https://www.gate.io/docs/developers/apiv4/en/#query-loans-2)

> Code samples
