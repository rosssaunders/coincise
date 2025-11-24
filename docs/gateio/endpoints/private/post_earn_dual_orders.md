# POST /earn/dual/orders

**Source:** [/earn/dual/orders](https://www.gate.io/docs/developers/apiv4/en/#placedualorder-parameters)

## Authentication

Required (Private Endpoint)

## [#](#place-dual-investment-order) Place Dual Investment order

`POST /earn/dual/orders`

_Place Dual Investment order_

> Body parameter

```json
{
  "plan_id": "176",
  "amount": "1",
  "text": "t-custom-text"
}
```

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#placedualorder-parameters](https://www.gate.io/docs/developers/apiv4/en/#placedualorder-parameters)

| Name      | In   | Type   | Required | Description                                                                                                          |
| --------- | ---- | ------ | -------- | -------------------------------------------------------------------------------------------------------------------- |
| body      | body | object | true     | none                                                                                                                 |
| » plan_id | body | string | true     | Product ID                                                                                                           |
| » amount  | body | string | true     | Subscription amount, mutually exclusive with copies field                                                            |
| » text    | body | string | false    | Order custom information. Users can set custom ID with this field. Custom fields must meet the following conditions: |

#### [#](#detailed-descriptions-56) Detailed descriptions

**» text**: Order custom information. Users can set custom ID with this field.
Custom fields must meet the following conditions:

1.  Must start with `t-`
2.  Excluding `t-`, length cannot exceed 28 bytes
3.  Can only contain numbers, letters, underscore(\_), hyphen(-) or dot(.)

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#placedualorder-responses](https://www.gate.io/docs/developers/apiv4/en/#placedualorder-responses)

| Status | Meaning                                                                    | Description               | Schema |
| ------ | -------------------------------------------------------------------------- | ------------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Order placed successfully | None   |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#structured-product-list) Structured Product List

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#structured-product-list](https://www.gate.io/docs/developers/apiv4/en/#structured-product-list)

> Code samples
