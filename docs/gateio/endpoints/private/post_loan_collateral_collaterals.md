# POST /loan/collateral/collaterals

**Source:** [/loan/collateral/collaterals](https://www.gate.io/docs/developers/apiv4/en/#operatecollateral-parameters)

## Authentication

Required (Private Endpoint)

## [#](#increase-or-redeem-collateral) Increase or redeem collateral

`POST /loan/collateral/collaterals`

_Increase or redeem collateral_

> Body parameter

```json
{
  "collateral_amount": "1212",
  "collateral_currency": "BTC",
  "order_id": 1130,
  "type": "append"
}
```

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#operatecollateral-parameters](https://www.gate.io/docs/developers/apiv4/en/#operatecollateral-parameters)

| Name                  | In   | Type           | Required | Description                                                           |
| --------------------- | ---- | -------------- | -------- | --------------------------------------------------------------------- |
| body                  | body | object         | true     | none                                                                  |
| » order_id            | body | integer(int64) | true     | Order ID                                                              |
| » collateral_currency | body | string         | true     | Collateral currency                                                   |
| » collateral_amount   | body | string         | true     | Collateral amount                                                     |
| » type                | body | string         | true     | Operation type: append - add collateral, redeem - withdraw collateral |

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#operatecollateral-responses](https://www.gate.io/docs/developers/apiv4/en/#operatecollateral-responses)

| Status | Meaning                                                                            | Description          | Schema |
| ------ | ---------------------------------------------------------------------------------- | -------------------- | ------ |
| 204    | [No Content (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.5) | Operation successful | None   |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-collateral-adjustment-records) Query collateral adjustment records

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-collateral-adjustment-records](https://www.gate.io/docs/developers/apiv4/en/#query-collateral-adjustment-records)

> Code samples
