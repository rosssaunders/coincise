# GET /loan/multi_collateral/currencies

**Source:**
[/loan/multi_collateral/currencies](https://www.gate.io/docs/developers/apiv4/en/#listmulticollateralcurrencies-responses)

## Authentication

Not Required (Public Endpoint)

## [#](#query-supported-borrowing-and-collateral-currencies-for-multi-currency-collateral) Query supported borrowing and collateral currencies for multi-currency collateral

`GET /loan/multi_collateral/currencies`

_Query supported borrowing and collateral currencies for multi-currency
collateral_

> Example responses

> 200 Response

```json
{
  "loan_currencies": [
    {
      "currency": "BTC",
      "price": "1212"
    },
    {
      "currency": "GT",
      "price": "12"
    }
  ],
  "collateral_currencies": [
    {
      "currency": "BTC",
      "index_price": "1212",
      "discount": "0.7"
    }
  ]
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listmulticollateralcurrencies-responses](https://www.gate.io/docs/developers/apiv4/en/#listmulticollateralcurrencies-responses)

| Status | Meaning                                                                    | Description      | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listmulticollateralcurrencies-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listmulticollateralcurrencies-responseschema)

Status Code **200**

_Borrowing and collateral currencies supported for Multi-Collateral_

| Name                     | Type   | Description                             |
| ------------------------ | ------ | --------------------------------------- |
| » loan_currencies        | array  | List of supported borrowing currencies  |
| »» MultiLoanItem         | object | none                                    |
| »»» currency             | string | Currency                                |
| »»» price                | string | Latest price of the currency            |
| »» collateral_currencies | array  | List of supported collateral currencies |
| »»» MultiCollateralItem  | object | none                                    |
| »»»» currency            | string | Currency                                |
| »»»» index_price         | string | Currency Index Price                    |
| »»»» discount            | string | Discount                                |

This operation does not require authentication

## [#](#query-collateralization-ratio-information) Query collateralization ratio information

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-collateralization-ratio-information](https://www.gate.io/docs/developers/apiv4/en/#query-collateralization-ratio-information)

> Code samples
