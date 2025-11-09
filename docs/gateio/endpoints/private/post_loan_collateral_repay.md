# POST /loan/collateral/repay

**Source:** [/loan/collateral/repay](https://www.gate.io/docs/developers/apiv4/en/#repaycollateralloan-parameters)

## Authentication

Required (Private Endpoint)

## [#](#collateral-loan-repayment) Collateral loan repayment

`POST /loan/collateral/repay`

_Collateral loan repayment_

> Body parameter

```
{
  "order_id": 37438962,
  "repay_amount": "1000",
  "repaid_all": false
}
```

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#repaycollateralloan-parameters](https://www.gate.io/docs/developers/apiv4/en/#repaycollateralloan-parameters)

| Name           | In   | Type           | Required | Description                                                                            |
| -------------- | ---- | -------------- | -------- | -------------------------------------------------------------------------------------- |
| body           | body | object         | true     | none                                                                                   |
| » order_id     | body | integer(int64) | true     | Order ID                                                                               |
| » repay_amount | body | string         | true     | Repayment amount, it is mandatory when making partial repayments                       |
| » repaid_all   | body | boolean        | true     | Repayment method, set to `true` for full repayment, and `false` for partial repayment; |

#### [#](#detailed-descriptions-55) Detailed descriptions

**» repaid_all**: Repayment method, set to `true` for full repayment, and
`false` for partial repayment; When partial repayment, the repay_amount
parameter cannot be greater than the remaining amount to be repaid by the user.

> Example responses

> 200 Response

```
{
  "repaid_principal": "11",
  "repaid_interest": "111"
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#repaycollateralloan-responses](https://www.gate.io/docs/developers/apiv4/en/#repaycollateralloan-responses)

| Status | Meaning                                                                    | Description          | Schema |
| ------ | -------------------------------------------------------------------------- | -------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Operation successful | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#repaycollateralloan-responseschema](https://www.gate.io/docs/developers/apiv4/en/#repaycollateralloan-responseschema)

Status Code **200**

_Repay_

| Name               | Type   | Description |
| ------------------ | ------ | ----------- |
| » repaid_principal | string | Principal   |
| » repaid_interest  | string | Interest    |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-collateral-loan-repayment-records) Query collateral loan repayment records

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-collateral-loan-repayment-records](https://www.gate.io/docs/developers/apiv4/en/#query-collateral-loan-repayment-records)

> Code samples
