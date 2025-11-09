# POST /loan/multi_collateral/repay

**Source:** [/loan/multi_collateral/repay](https://www.gate.io/docs/developers/apiv4/en/#repaymulticollateralloan-parameters)

## Authentication

Required (Private Endpoint)

## [#](#multi-currency-collateral-repayment) Multi-currency collateral repayment

`POST /loan/multi_collateral/repay`

_Multi-currency collateral repayment_

> Body parameter

```
{
  "order_id": 10005578,
  "repay_items": [
    {
      "currency": "btc",
      "amount": "1",
      "repaid_all": false
    }
  ]
}
```

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#repaymulticollateralloan-parameters](https://www.gate.io/docs/developers/apiv4/en/#repaymulticollateralloan-parameters)

| Name                  | In   | Type           | Required | Description                                                                   |
| --------------------- | ---- | -------------- | -------- | ----------------------------------------------------------------------------- |
| body                  | body | object         | true     | none                                                                          |
| » order_id            | body | integer(int64) | true     | Order ID                                                                      |
| » repay_items         | body | array          | true     | Repay Currency Item                                                           |
| »» MultiLoanRepayItem | body | object         | false    | none                                                                          |
| »»» currency          | body | string         | false    | Repayment currency                                                            |
| »»» amount            | body | string         | false    | Amount                                                                        |
| »»» repaid_all        | body | boolean        | false    | Repayment method, set to true for full repayment, false for partial repayment |

> Example responses

> 200 Response

```
{
  "order_id": 10005679,
  "repaid_currencies": [
    {
      "succeeded": false,
      "label": "INVALID_PARAM_VALUE",
      "message": "Invalid parameter value",
      "currency": "BTC",
      "repaid_principal": "1",
      "repaid_interest": "0.0001"
    },
    {
      "succeeded": true,
      "currency": "BTC",
      "repaid_principal": "1",
      "repaid_interest": "0.0001"
    }
  ]
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#repaymulticollateralloan-responses](https://www.gate.io/docs/developers/apiv4/en/#repaymulticollateralloan-responses)

| Status | Meaning                                                                    | Description          | Schema |
| ------ | -------------------------------------------------------------------------- | -------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Operation successful | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#repaymulticollateralloan-responseschema](https://www.gate.io/docs/developers/apiv4/en/#repaymulticollateralloan-responseschema)

Status Code **200**

_Multi-currency collateral repayment_

| Name                 | Type           | Description                                                    |
| -------------------- | -------------- | -------------------------------------------------------------- |
| » order_id           | integer(int64) | Order ID                                                       |
| » repaid_currencies  | array          | Repay Currency List                                            |
| »» RepayCurrencyRes  | object         | none                                                           |
| »»» succeeded        | boolean        | Whether the repayment was successful                           |
| »»» label            | string         | Error identifier for failed operations; empty when successful  |
| »»» message          | string         | Error description for failed operations; empty when successful |
| »»» currency         | string         | Repayment currency                                             |
| »»» repaid_principal | string         | Principal                                                      |
| »»» repaid_interest  | string         | Principal                                                      |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-multi-currency-collateral-repayment-records) Query multi-currency collateral repayment records

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-multi-currency-collateral-repayment-records](https://www.gate.io/docs/developers/apiv4/en/#query-multi-currency-collateral-repayment-records)

> Code samples
