# POST /loan/collateral/orders

**Source:** [/loan/collateral/orders](https://www.gate.io/docs/developers/apiv4/en/#createcollateralloan-parameters)

## Authentication

Required (Private Endpoint)

## [#](#place-collateral-loan-order) Place collateral loan order

`POST /loan/collateral/orders`

_Place collateral loan order_

> Body parameter

```json
{
  "collateral_amount": "1",
  "collateral_currency": "BTC",
  "borrow_amount": "49",
  "borrow_currency": "USDT"
}
```

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#createcollateralloan-parameters](https://www.gate.io/docs/developers/apiv4/en/#createcollateralloan-parameters)

| Name                  | In   | Type   | Required | Description         |
| --------------------- | ---- | ------ | -------- | ------------------- |
| body                  | body | object | true     | none                |
| » collateral_amount   | body | string | true     | Collateral amount   |
| » collateral_currency | body | string | true     | Collateral currency |
| » borrow_amount       | body | string | true     | Borrowed amount     |
| » borrow_currency     | body | string | true     | Borrowed currency   |

> Example responses

> 200 Response

```json
{
  "order_id": 10005578
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#createcollateralloan-responses](https://www.gate.io/docs/developers/apiv4/en/#createcollateralloan-responses)

| Status | Meaning                                                                    | Description               | Schema |
| ------ | -------------------------------------------------------------------------- | ------------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Order placed successfully | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#createcollateralloan-responseschema](https://www.gate.io/docs/developers/apiv4/en/#createcollateralloan-responseschema)

Status Code **200**

| Name       | Type           | Description |
| ---------- | -------------- | ----------- |
| » order_id | integer(int64) | Order ID    |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-collateral-loan-order-list) Query collateral loan order list

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-collateral-loan-order-list](https://www.gate.io/docs/developers/apiv4/en/#query-collateral-loan-order-list)

> Code samples
