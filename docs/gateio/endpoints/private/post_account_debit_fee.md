# POST /account/debit_fee

**Source:** [/account/debit_fee](https://www.gate.io/docs/developers/apiv4/en/#setdebitfee-parameters)

## Authentication

Required (Private Endpoint)

## [#](#configure-gt-fee-deduction) Configure GT fee deduction

`POST /account/debit_fee`

_Configure GT fee deduction_

Enable or disable GT fee deduction for the current account

> Body parameter

```json
{
  "enabled": true
}
```

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#setdebitfee-parameters](https://www.gate.io/docs/developers/apiv4/en/#setdebitfee-parameters)

| Name      | In   | Type                        | Required | Description                         |
| --------- | ---- | --------------------------- | -------- | ----------------------------------- |
| body      | body | [DebitFee](#schemadebitfee) | true     | none                                |
| » enabled | body | boolean                     | true     | Whether GT fee deduction is enabled |

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#setdebitfee-responses](https://www.gate.io/docs/developers/apiv4/en/#setdebitfee-responses)

| Status | Meaning                                                                    | Description | Schema |
| ------ | -------------------------------------------------------------------------- | ----------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success     | None   |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-gt-fee-deduction-configuration) Query GT fee deduction configuration

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-gt-fee-deduction-configuration](https://www.gate.io/docs/developers/apiv4/en/#query-gt-fee-deduction-configuration)

> Code samples
