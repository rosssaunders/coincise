# GET /account/debit_fee

**Source:**
[/account/debit_fee](https://www.gate.io/docs/developers/apiv4/en/#getdebitfee-responses)

## Authentication

Required (Private Endpoint)

## [#](#query-gt-fee-deduction-configuration) Query GT fee deduction configuration

`GET /account/debit_fee`

_Query GT fee deduction configuration_

Query the GT fee deduction configuration for the current account

> Example responses

> 200 Response

```
{
  "enabled": true
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getdebitfee-responses](https://www.gate.io/docs/developers/apiv4/en/#getdebitfee-responses)

| Status | Meaning                                                                    | Description | Schema                      |
| ------ | -------------------------------------------------------------------------- | ----------- | --------------------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success     | [DebitFee](#schemadebitfee) |

WARNING

To perform this operation, you must be authenticated by API key and secret
