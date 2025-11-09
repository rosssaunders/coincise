# POST /unified/loans

**Source:** [/unified/loans](https://www.gate.io/docs/developers/apiv4/en/#createunifiedloan-parameters)

## Authentication

Required (Private Endpoint)

## [#](#borrow-or-repay) Borrow or repay

`POST /unified/loans`

_Borrow or repay_

When borrowing, ensure the borrowed amount is not below the minimum borrowing
threshold for the specific cryptocurrency and does not exceed the maximum
borrowing limit set by the platform and user.

Loan interest will be automatically deducted from the account at regular
intervals. Users are responsible for managing repayment of borrowed amounts.

For repayment, use `repaid_all=true` to repay all available amounts

> Body parameter

```
{
  "currency": "BTC",
  "amount": "0.1",
  "type": "borrow",
  "repaid_all": false,
  "text": "t-test"
}
```

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#createunifiedloan-parameters](https://www.gate.io/docs/developers/apiv4/en/#createunifiedloan-parameters)

| Name         | In   | Type    | Required | Description                                                                                                                    |
| ------------ | ---- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------ |
| body         | body | object  | true     | none                                                                                                                           |
| » currency   | body | string  | true     | Currency                                                                                                                       |
| » type       | body | string  | true     | Type: `borrow` - borrow, `repay` - repay                                                                                       |
| » amount     | body | string  | true     | Borrow or repayment amount                                                                                                     |
| » repaid_all | body | boolean | false    | Full repayment, only used for repayment operations. When set to `true`, overrides `amount` and directly repays the full amount |
| » text       | body | string  | false    | User defined custom ID                                                                                                         |

#### [#](#enumerated-values-4) Enumerated Values

| Parameter | Value  |
| --------- | ------ |
| » type    | borrow |
| » type    | repay  |

> Example responses

> 200 Response

```
{
  "tran_id": 9527
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#createunifiedloan-responses](https://www.gate.io/docs/developers/apiv4/en/#createunifiedloan-responses)

| Status | Meaning                                                                    | Description          | Schema |
| ------ | -------------------------------------------------------------------------- | -------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Operation successful | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#createunifiedloan-responseschema](https://www.gate.io/docs/developers/apiv4/en/#createunifiedloan-responseschema)

Status Code **200**

_Unified account borrowing and repayment response result_

| Name      | Type           | Description    |
| --------- | -------------- | -------------- |
| » tran_id | integer(int64) | Transaction ID |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-loans) Query loans

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-loans](https://www.gate.io/docs/developers/apiv4/en/#query-loans)

> Code samples
