# GET /margin/auto_repay

**Source:** [/margin/auto_repay](https://www.gate.io/docs/developers/apiv4/en/#getisolatedautorepaystatus-responses)

## Authentication

Required (Private Endpoint)

## [#](#query-user-auto-repayment-settings) Query user auto repayment settings

`GET /margin/auto_repay`

_Query user auto repayment settings_

> Example responses

> 200 Response

```
{
  "status": "on"
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getisolatedautorepaystatus-responses](https://www.gate.io/docs/developers/apiv4/en/#getisolatedautorepaystatus-responses)

| Status | Meaning                                                                    | Description                            | Schema |
| ------ | -------------------------------------------------------------------------- | -------------------------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | User's current auto repayment settings | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getisolatedautorepaystatus-responseschema](https://www.gate.io/docs/developers/apiv4/en/#getisolatedautorepaystatus-responseschema)

Status Code **200**

_AutoRepaySetting_

| Name     | Type   | Description                                             |
| -------- | ------ | ------------------------------------------------------- |
| » status | string | Auto repayment status: `on` - enabled, `off` - disabled |

#### [#](#enumerated-values-7) Enumerated Values

| Property | Value |
| -------- | ----- |
| status   | on    |
| status   | off   |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-maximum-transferable-amount-for-isolated-margin) Get maximum transferable amount for isolated margin

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#get-maximum-transferable-amount-for-isolated-margin](https://www.gate.io/docs/developers/apiv4/en/#get-maximum-transferable-amount-for-isolated-margin)

> Code samples
