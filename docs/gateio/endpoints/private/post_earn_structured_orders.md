# POST /earn/structured/orders

**Source:** [/earn/structured/orders](https://www.gate.io/docs/developers/apiv4/en/#placestructuredorder-parameters)

## Authentication

Required (Private Endpoint)

## [#](#place-structured-product-order) Place Structured Product Order

`POST /earn/structured/orders`

_Place Structured Product Order_

> Body parameter

```
{
  "pid": "1",
  "amount": "0.5"
}
```

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#placestructuredorder-parameters](https://www.gate.io/docs/developers/apiv4/en/#placestructuredorder-parameters)

| Name     | In   | Type   | Required | Description  |
| -------- | ---- | ------ | -------- | ------------ |
| body     | body | object | true     | none         |
| » pid    | body | string | false    | Product ID   |
| » amount | body | string | false    | Buy Quantity |

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#placestructuredorder-responses](https://www.gate.io/docs/developers/apiv4/en/#placestructuredorder-responses)

| Status | Meaning                                                                    | Description               | Schema |
| ------ | -------------------------------------------------------------------------- | ------------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Order placed successfully | None   |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#staking-coins) Staking coins

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#staking-coins](https://www.gate.io/docs/developers/apiv4/en/#staking-coins)

> Code samples
