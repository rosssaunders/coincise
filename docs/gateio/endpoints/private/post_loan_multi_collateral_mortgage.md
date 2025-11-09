# POST /loan/multi_collateral/mortgage

**Source:**
[/loan/multi_collateral/mortgage](https://www.gate.io/docs/developers/apiv4/en/#operatemulticollateral-parameters)

## Authentication

Required (Private Endpoint)

## [#](#add-or-withdraw-collateral) Add or withdraw collateral

`POST /loan/multi_collateral/mortgage`

_Add or withdraw collateral_

> Body parameter

```
{
  "order_id": 10005578,
  "type": "append",
  "collaterals": [
    {
      "currency": "btc",
      "amount": "0.5"
    }
  ]
}
```

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#operatemulticollateral-parameters](https://www.gate.io/docs/developers/apiv4/en/#operatemulticollateral-parameters)

| Name          | In   | Type           | Required | Description                                                           |
| ------------- | ---- | -------------- | -------- | --------------------------------------------------------------------- |
| body          | body | object         | true     | none                                                                  |
| » order_id    | body | integer(int64) | true     | Order ID                                                              |
| » type        | body | string         | true     | Operation type: append - add collateral, redeem - withdraw collateral |
| » collaterals | body | array          | false    | Collateral currency list                                              |
| »» currency   | body | string         | false    | Currency                                                              |
| »» amount     | body | string         | false    | Amount                                                                |

> Example responses

> 200 Response

```
{
  "order_id": 10005679,
  "collateral_currencies": [
    {
      "succeeded": true,
      "currency": "btc",
      "amount": "0.5"
    }
  ]
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#operatemulticollateral-responses](https://www.gate.io/docs/developers/apiv4/en/#operatemulticollateral-responses)

| Status | Meaning                                                                    | Description          | Schema |
| ------ | -------------------------------------------------------------------------- | -------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Operation successful | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#operatemulticollateral-responseschema](https://www.gate.io/docs/developers/apiv4/en/#operatemulticollateral-responseschema)

Status Code **200**

_Multi-collateral adjustment result_

| Name                     | Type           | Description                                                     |
| ------------------------ | -------------- | --------------------------------------------------------------- |
| » order_id               | integer(int64) | Order ID                                                        |
| » collateral_currencies  | array          | Collateral currency information                                 |
| »» CollateralCurrencyRes | object         | none                                                            |
| »»» succeeded            | boolean        | Update success status                                           |
| »»» label                | string         | Error identifier for failed operations; empty when successful   |
| »»» message              | string         | Error description for failed operations; empty when successful  |
| »»» currency             | string         | Currency                                                        |
| »»» amount               | string         | Successfully operated collateral quantity; 0 if operation fails |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-collateral-adjustment-records-2) Query collateral adjustment records

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-collateral-adjustment-records-2](https://www.gate.io/docs/developers/apiv4/en/#query-collateral-adjustment-records-2)

> Code samples
