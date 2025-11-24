# GET /earn/dual/investment_plan

**Source:** [/earn/dual/investment_plan](https://www.gate.io/docs/developers/apiv4/en/#listdualinvestmentplans-parameters)

## Authentication

Not Required (Public Endpoint)

## [#](#dual-investment-product-list) Dual Investment product list

`GET /earn/dual/investment_plan`

_Dual Investment product list_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listdualinvestmentplans-parameters](https://www.gate.io/docs/developers/apiv4/en/#listdualinvestmentplans-parameters)

| Name    | In    | Type           | Required | Description          |
| ------- | ----- | -------------- | -------- | -------------------- |
| plan_id | query | integer(int64) | false    | Financial project ID |

> Example responses

> 200 Response

```json
[
  {
    "id": 272,
    "instrument_name": "DOGE-17NOV23-0.067-P",
    "type": "put",
    "invest_currency": "USDT",
    "exercise_currency": "DOGE",
    "exercise_price": 0.067,
    "delivery_time": 1700208000,
    "min_copies": 1,
    "max_copies": 1000,
    "start_time": 1697685172,
    "end_time": 1697685172,
    "status": "ONGOING",
    "apy_display": "0.0114000000",
    "per_value": "1"
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listdualinvestmentplans-responses](https://www.gate.io/docs/developers/apiv4/en/#listdualinvestmentplans-responses)

| Status | Meaning                                                                    | Description            | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listdualinvestmentplans-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listdualinvestmentplans-responseschema)

Status Code **200**

| Name                | Type           | Description      |
| ------------------- | -------------- | ---------------- |
| » id                | integer(int32) | Product ID       |
| » instrument_name   | string         | Product Name     |
| » invest_currency   | string         | Investment Token |
| » exercise_currency | string         | Strike Token     |
| » exercise_price    | number(double) | Strike price     |
| » delivery_time     | integer(int32) | Settlement time  |
| » min_copies        | integer(int32) | Minimum Units    |
| » max_copies        | integer(int32) | Maximum Units    |
| » per_value         | string         | Value Per Unit   |
| » apy_display       | string         | Annual Yield     |
| » start_time        | integer(int32) | Start Time       |
| » end_time          | integer(int32) | End time         |
| » status            | string         | Status:          |

`NOTSTARTED`\-Not Started  
`ONGOING`\-In Progress  
`ENDED`\-Ended |

This operation does not require authentication

## [#](#dual-investment-order-list) Dual Investment order list

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#dual-investment-order-list](https://www.gate.io/docs/developers/apiv4/en/#dual-investment-order-list)

> Code samples
