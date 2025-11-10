# POST /loan/multi_collateral/orders

**Source:**
[/loan/multi_collateral/orders](https://www.gate.io/docs/developers/apiv4/en/#createmulticollateral-parameters)

## Authentication

Required (Private Endpoint)

## [#](#place-multi-currency-collateral-order) Place multi-currency collateral order

`POST /loan/multi_collateral/orders`

_Place multi-currency collateral order_

> Body parameter

```
{
  "order_id": 1721387470,
  "order_type": "fixed",
  "fixed_type": "7d",
  "fixed_rate": 0.00001,
  "auto_renew": true,
  "auto_repay": true,
  "borrow_currency": "BTC",
  "borrow_amount": "1",
  "collateral_currencies": [
    {
      "currency": "USDT",
      "amount": "1000"
    }
  ]
}
```

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#createmulticollateral-parameters](https://www.gate.io/docs/developers/apiv4/en/#createmulticollateral-parameters)

| Name                    | In   | Type    | Required | Description                                                                             |
| ----------------------- | ---- | ------- | -------- | --------------------------------------------------------------------------------------- |
| body                    | body | object  | true     | none                                                                                    |
| » order_id              | body | string  | false    | Order ID                                                                                |
| » order_type            | body | string  | false    | current - current rate, fixed - fixed rate, defaults to current if not specified        |
| » fixed_type            | body | string  | false    | Fixed interest rate lending period: 7d - 7 days, 30d - 30 days. Required for fixed rate |
| » fixed_rate            | body | string  | false    | Fixed interest rate, required for fixed rate                                            |
| » auto_renew            | body | boolean | false    | Fixed interest rate, auto-renewal                                                       |
| » auto_repay            | body | boolean | false    | Fixed interest rate, auto-repayment                                                     |
| » borrow_currency       | body | string  | true     | Borrowed currency                                                                       |
| » borrow_amount         | body | string  | true     | Borrowed amount                                                                         |
| » collateral_currencies | body | array   | false    | Collateral currency and amount                                                          |
| »» CollateralCurrency   | body | object  | false    | none                                                                                    |
| »»» currency            | body | string  | false    | Currency                                                                                |
| »»» amount              | body | string  | false    | Amount                                                                                  |

> Example responses

> 200 Response

```
{
  "order_id": 10005578
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#createmulticollateral-responses](https://www.gate.io/docs/developers/apiv4/en/#createmulticollateral-responses)

| Status | Meaning                                                                    | Description               | Schema |
| ------ | -------------------------------------------------------------------------- | ------------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Order placed successfully | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#createmulticollateral-responseschema](https://www.gate.io/docs/developers/apiv4/en/#createmulticollateral-responseschema)

Status Code **200**

| Name       | Type           | Description |
| ---------- | -------------- | ----------- |
| » order_id | integer(int64) | Order ID    |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-multi-currency-collateral-order-list) Query multi-currency collateral order list

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-multi-currency-collateral-order-list](https://www.gate.io/docs/developers/apiv4/en/#query-multi-currency-collateral-order-list)

> Code samples
