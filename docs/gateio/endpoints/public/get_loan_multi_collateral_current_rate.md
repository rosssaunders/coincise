# GET /loan/multi_collateral/current_rate

**Source:**
[/loan/multi_collateral/current_rate](https://www.gate.io/docs/developers/apiv4/en/#getmulticollateralcurrentrate-parameters)

## Authentication

Not Required (Public Endpoint)

## [#](#query-currency-s-current-interest-rate) Query currency's current interest rate

`GET /loan/multi_collateral/current_rate`

_Query currency's current interest rate_

Query currency's current interest rate for the previous hour, current interest
rate updates hourly

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getmulticollateralcurrentrate-parameters](https://www.gate.io/docs/developers/apiv4/en/#getmulticollateralcurrentrate-parameters)

| Name       | In    | Type            | Required | Description                                                               |
| ---------- | ----- | --------------- | -------- | ------------------------------------------------------------------------- |
| currencies | query | array\[string\] | true     | Specify currency name query array, separated by commas, maximum 100 items |
| vip_level  | query | string          | false    | VIP level, defaults to 0 if not specified                                 |

> Example responses

> 200 Response

```
[
  {
    "currency": "BTC",
    "current_rate": "0.000023"
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getmulticollateralcurrentrate-responses](https://www.gate.io/docs/developers/apiv4/en/#getmulticollateralcurrentrate-responses)

| Status | Meaning                                                                    | Description      | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getmulticollateralcurrentrate-responseschema](https://www.gate.io/docs/developers/apiv4/en/#getmulticollateralcurrentrate-responseschema)

Status Code **200**

| Name            | Type   | Description                            |
| --------------- | ------ | -------------------------------------- |
| » _None_        | object | Multi-collateral current interest rate |
| »» currency     | string | Currency                               |
| »» current_rate | string | Currency current interest rate         |

This operation does not require authentication
