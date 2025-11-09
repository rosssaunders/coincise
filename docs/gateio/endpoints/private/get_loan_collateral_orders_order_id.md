# GET /loan/collateral/orders/{order_id}

**Source:** [/loan/collateral/orders/{order_id}](https://www.gate.io/docs/developers/apiv4/en/#getcollateralloanorderdetail-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-single-order-details-5) Query single order details

`GET /loan/collateral/orders/{order_id}`

_Query single order details_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getcollateralloanorderdetail-parameters](https://www.gate.io/docs/developers/apiv4/en/#getcollateralloanorderdetail-parameters)

| Name     | In   | Type           | Required | Description                                          |
| -------- | ---- | -------------- | -------- | ---------------------------------------------------- |
| order_id | path | integer(int64) | true     | Order ID returned when order is successfully created |

> Example responses

> 200 Response

```
{
  "order_id": 10000421,
  "collateral_currency": "BTC",
  "borrow_currency": "USDT",
  "collateral_amount": "1",
  "borrow_amount": "1000",
  "repaid_amount": "10",
  "repaid_principal": "10",
  "repaid_interest": "0",
  "init_ltv": "0.0003934533764831",
  "current_ltv": "0.0004521768651985",
  "liquidate_ltv": "0.9",
  "status": "initial_status",
  "borrow_time": 1688462668,
  "left_repay_total": "990.0219384",
  "left_repay_interest": "0.0219384"
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getcollateralloanorderdetail-responses](https://www.gate.io/docs/developers/apiv4/en/#getcollateralloanorderdetail-responses)

| Status | Meaning                                                                    | Description                        | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Order details queried successfully | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getcollateralloanorderdetail-responseschema](https://www.gate.io/docs/developers/apiv4/en/#getcollateralloanorderdetail-responseschema)

Status Code **200**

_Collateral order_

| Name                  | Type           | Description                        |
| --------------------- | -------------- | ---------------------------------- |
| » order_id            | integer(int64) | Order ID                           |
| » collateral_currency | string         | Collateral currency                |
| » collateral_amount   | string         | Collateral amount                  |
| » borrow_currency     | string         | Borrowed currency                  |
| » borrow_amount       | string         | Borrowed amount                    |
| » repaid_amount       | string         | Repaid amount                      |
| » repaid_principal    | string         | Repaid principal                   |
| » repaid_interest     | string         | Repaid interest                    |
| » init_ltv            | string         | Initial collateralization rate     |
| » current_ltv         | string         | Current collateralization rate     |
| » liquidate_ltv       | string         | Liquidation collateralization rate |
| » status              | string         | Order status:                      |

\- initial: Initial state after placing the order  
\- collateral_deducted: Collateral deduction successful  
\- collateral_returning: Loan failed - Collateral return pending  
\- lent: Loan successful  
\- repaying: Repayment in progress  
\- liquidating: Liquidation in progress  
\- finished: Order completed  
\- closed_liquidated: Liquidation and repayment completed | | » borrow_time |
integer(int64) | Borrowing time, timestamp in seconds | | » left_repay_total |
string | Outstanding principal and interest (outstanding principal + outstanding
interest) | | » left_repay_principal | string | Outstanding principal | | »
left_repay_interest | string | Outstanding interest |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#collateral-loan-repayment) Collateral loan repayment

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#collateral-loan-repayment](https://www.gate.io/docs/developers/apiv4/en/#collateral-loan-repayment)

> Code samples
