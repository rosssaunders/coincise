# GET /loan/collateral/currencies

**Source:** [/loan/collateral/currencies](https://www.gate.io/docs/developers/apiv4/en/#listcollateralcurrencies-parameters)

## Authentication

Not Required (Public Endpoint)

## [#](#query-supported-borrowing-and-collateral-currencies) Query supported borrowing and collateral currencies

`GET /loan/collateral/currencies`

_Query supported borrowing and collateral currencies_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listcollateralcurrencies-parameters](https://www.gate.io/docs/developers/apiv4/en/#listcollateralcurrencies-parameters)

| Name          | In    | Type   | Required | Description                                                                                                                                                                    |
| ------------- | ----- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| loan_currency | query | string | false    | Parameter loan_currency. If omitted, returns all supported borrowing currencies; if provided, returns the array of collateral currencies supported for that borrowing currency |

> Example responses

> 200 Response

```
[
  {
    "loan_currency": "BTC",
    "collateral_currency": [
      "BTC",
      "ETH",
      "GT"
    ]
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listcollateralcurrencies-responses](https://www.gate.io/docs/developers/apiv4/en/#listcollateralcurrencies-responses)

| Status | Meaning                                                                    | Description      | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listcollateralcurrencies-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listcollateralcurrencies-responseschema)

Status Code **200**

| Name                   | Type   | Description                                   |
| ---------------------- | ------ | --------------------------------------------- |
| » _None_               | object | Supported borrowing and collateral currencies |
| »» loan_currency       | string | Borrowed currency                             |
| »» collateral_currency | array  | List of supported collateral currencies       |

This operation does not require authentication
