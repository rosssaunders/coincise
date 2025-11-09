# GET /futures/{settle}/risk_limit_tiers

**Source:**
[/futures/{settle}/risk_limit_tiers](https://www.gate.io/docs/developers/apiv4/en/#listfuturesrisklimittiers-parameters)

## Authentication

Not Required (Public Endpoint)

## [#](#query-risk-limit-tiers) Query risk limit tiers

`GET /futures/{settle}/risk_limit_tiers`

_Query risk limit tiers_

When the 'contract' parameter is not passed, the default is to query the risk
limits for the top 100 markets.'Limit' and 'offset' correspond to pagination
queries at the market level, not to the length of the returned array. This only
takes effect empty.

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listfuturesrisklimittiers-parameters](https://www.gate.io/docs/developers/apiv4/en/#listfuturesrisklimittiers-parameters)

| Name     | In    | Type    | Required | Description                                             |
| -------- | ----- | ------- | -------- | ------------------------------------------------------- |
| settle   | path  | string  | true     | Settle currency                                         |
| contract | query | string  | false    | Futures contract, return related data only if specified |
| limit    | query | integer | false    | Maximum number of records returned in a single list     |
| offset   | query | integer | false    | List offset, starting from 0                            |

#### [#](#enumerated-values-42) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```
[
  {
    "maintenance_rate": "0.01",
    "tier": 1,
    "initial_rate": "0.02",
    "leverage_max": "50",
    "risk_limit": "20000",
    "contract": "ZTX_USDT",
    "deduction": "0"
  },
  {
    "maintenance_rate": "0.013",
    "tier": 2,
    "initial_rate": "0.025",
    "leverage_max": "40",
    "risk_limit": "30000",
    "contract": "ZTX_USDT",
    "deduction": "60"
  },
  {
    "maintenance_rate": "0.015",
    "tier": 3,
    "initial_rate": "0.02857",
    "leverage_max": "35",
    "risk_limit": "50000",
    "contract": "ZTX_USDT",
    "deduction": "120"
  },
  {
    "maintenance_rate": "0.02",
    "tier": 4,
    "initial_rate": "0.03333",
    "leverage_max": "30",
    "risk_limit": "70000",
    "contract": "ZTX_USDT",
    "deduction": "370"
  },
  {
    "maintenance_rate": "0.025",
    "tier": 5,
    "initial_rate": "0.04",
    "leverage_max": "25",
    "risk_limit": "100000",
    "contract": "ZTX_USDT",
    "deduction": "720"
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listfuturesrisklimittiers-responses](https://www.gate.io/docs/developers/apiv4/en/#listfuturesrisklimittiers-responses)

| Status | Meaning                                                                    | Description      | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listfuturesrisklimittiers-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listfuturesrisklimittiers-responseschema)

Status Code **200**

| Name                | Type         | Description                                                                           |
| ------------------- | ------------ | ------------------------------------------------------------------------------------- |
| _None_              | array        | \[Retrieve risk limit configurations for different tiers under a specified contract\] |
| » _None_            | object       | Retrieve risk limit configurations for different tiers under a specified contract     |
| »» tier             | integer(int) | Tier                                                                                  |
| »» risk_limit       | string       | Position risk limit                                                                   |
| »» initial_rate     | string       | Initial margin rate                                                                   |
| »» maintenance_rate | string       | Maintenance margin rate                                                               |
| »» leverage_max     | string       | Maximum leverage                                                                      |
| »» contract         | string       | Market, only visible when market pagination is requested                              |
| »» deduction        | string       | Maintenance margin quick calculation deduction amount                                 |

This operation does not require authentication

## [#](#get-futures-account) Get futures account

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#get-futures-account](https://www.gate.io/docs/developers/apiv4/en/#get-futures-account)

> Code samples
