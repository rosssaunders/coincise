# GET /futures/{settle}/risk_limit_table

**Source:**
[/futures/{settle}/risk_limit_table](https://www.gate.io/docs/developers/apiv4/en/#getfuturesrisklimittable-parameters)

## Authentication

Not Required (Public Endpoint)

## [#](#query-risk-limit-table-by-table-id) Query risk limit table by table_id

`GET /futures/{settle}/risk_limit_table`

_Query risk limit table by table_id_

Just pass table_id

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getfuturesrisklimittable-parameters](https://www.gate.io/docs/developers/apiv4/en/#getfuturesrisklimittable-parameters)

| Name     | In    | Type   | Required | Description         |
| -------- | ----- | ------ | -------- | ------------------- |
| settle   | path  | string | true     | Settle currency     |
| table_id | query | string | true     | Risk limit table ID |

#### [#](#enumerated-values-80) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```
[
  {
    "tier": 1,
    "risk_limit": "10000",
    "initial_rate": "0.025",
    "maintenance_rate": "0.015",
    "leverage_max": "40",
    "deduction": "0"
  },
  {
    "tier": 2,
    "risk_limit": "30000",
    "initial_rate": "0.03333",
    "maintenance_rate": "0.02",
    "leverage_max": "30",
    "deduction": "50"
  },
  {
    "tier": 3,
    "risk_limit": "50000",
    "initial_rate": "0.04545",
    "maintenance_rate": "0.03",
    "leverage_max": "22",
    "deduction": "350"
  },
  {
    "tier": 4,
    "risk_limit": "70000",
    "initial_rate": "0.05555",
    "maintenance_rate": "0.04",
    "leverage_max": "18",
    "deduction": "850"
  },
  {
    "tier": 5,
    "risk_limit": "100000",
    "initial_rate": "0.1",
    "maintenance_rate": "0.085",
    "leverage_max": "10",
    "deduction": "4000"
  },
  {
    "tier": 6,
    "risk_limit": "150000",
    "initial_rate": "0.333",
    "maintenance_rate": "0.3",
    "leverage_max": "3",
    "deduction": "25500"
  },
  {
    "tier": 7,
    "risk_limit": "200000",
    "initial_rate": "0.5",
    "maintenance_rate": "0.45",
    "leverage_max": "2",
    "deduction": "48000"
  },
  {
    "tier": 8,
    "risk_limit": "300000",
    "initial_rate": "1",
    "maintenance_rate": "0.95",
    "leverage_max": "1",
    "deduction": "148000"
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getfuturesrisklimittable-responses](https://www.gate.io/docs/developers/apiv4/en/#getfuturesrisklimittable-responses)

| Status | Meaning                                                                    | Description      | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getfuturesrisklimittable-responseschema](https://www.gate.io/docs/developers/apiv4/en/#getfuturesrisklimittable-responseschema)

Status Code **200**

| Name                | Type         | Description                                                |
| ------------------- | ------------ | ---------------------------------------------------------- |
| » _None_            | object       | Information for each tier of the gradient risk limit table |
| »» tier             | integer(int) | Tier                                                       |
| »» risk_limit       | string       | Position risk limit                                        |
| »» initial_rate     | string       | Initial margin rate                                        |
| »» maintenance_rate | string       | Maintenance margin rate                                    |
| »» leverage_max     | string       | Maximum leverage                                           |
| »» deduction        | string       | Maintenance margin quick calculation deduction amount      |

This operation does not require authentication

## [#](#create-price-triggered-order-2) Create price-triggered order

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#create-price-triggered-order-2](https://www.gate.io/docs/developers/apiv4/en/#create-price-triggered-order-2)

> Code samples
