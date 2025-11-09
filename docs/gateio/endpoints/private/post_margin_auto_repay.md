# POST /margin/auto_repay

**Source:**
[/margin/auto_repay](https://www.gate.io/docs/developers/apiv4/en/#setisolatedautorepay-parameters)

## Authentication

Required (Private Endpoint)

## [#](#update-user-auto-repayment-settings) Update user auto repayment settings

`POST /margin/auto_repay`

_Update user auto repayment settings_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#setisolatedautorepay-parameters](https://www.gate.io/docs/developers/apiv4/en/#setisolatedautorepay-parameters)

| Name   | In    | Type   | Required | Description                                                        |
| ------ | ----- | ------ | -------- | ------------------------------------------------------------------ |
| status | query | string | true     | Whether to enable auto repayment: `on` - enabled, `off` - disabled |

> Example responses

> 200 Response

```
{
  "status": "on"
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#setisolatedautorepay-responses](https://www.gate.io/docs/developers/apiv4/en/#setisolatedautorepay-responses)

| Status | Meaning                                                                    | Description                            | Schema |
| ------ | -------------------------------------------------------------------------- | -------------------------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | User's current auto repayment settings | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#setisolatedautorepay-responseschema](https://www.gate.io/docs/developers/apiv4/en/#setisolatedautorepay-responseschema)

Status Code **200**

_AutoRepaySetting_

| Name     | Type   | Description                                             |
| -------- | ------ | ------------------------------------------------------- |
| » status | string | Auto repayment status: `on` - enabled, `off` - disabled |

#### [#](#enumerated-values-6) Enumerated Values

| Property | Value |
| -------- | ----- |
| status   | on    |
| status   | off   |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-user-auto-repayment-settings) Query user auto repayment settings

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-user-auto-repayment-settings](https://www.gate.io/docs/developers/apiv4/en/#query-user-auto-repayment-settings)

> Code samples
