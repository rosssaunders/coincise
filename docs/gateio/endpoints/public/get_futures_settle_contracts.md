# GET /futures/{settle}/contracts

**Source:** [/futures/{settle}/contracts](https://www.gate.io/docs/developers/apiv4/en/#listfuturescontracts-parameters)

## Authentication

Not Required (Public Endpoint)

## [#](#query-all-futures-contracts) Query all futures contracts

`GET /futures/{settle}/contracts`

_Query all futures contracts_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listfuturescontracts-parameters](https://www.gate.io/docs/developers/apiv4/en/#listfuturescontracts-parameters)

| Name   | In    | Type    | Required | Description                                         |
| ------ | ----- | ------- | -------- | --------------------------------------------------- |
| settle | path  | string  | true     | Settle currency                                     |
| limit  | query | integer | false    | Maximum number of records returned in a single list |
| offset | query | integer | false    | List offset, starting from 0                        |

#### [#](#enumerated-values-30) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```
[
  {
    "name": "BTC_USDT",
    "type": "direct",
    "quanto_multiplier": "0.0001",
    "ref_discount_rate": "0",
    "order_price_deviate": "0.5",
    "maintenance_rate": "0.005",
    "mark_type": "index",
    "last_price": "38026",
    "mark_price": "37985.6",
    "index_price": "37954.92",
    "funding_rate_indicative": "0.000219",
    "mark_price_round": "0.01",
    "funding_offset": 0,
    "in_delisting": false,
    "risk_limit_base": "1000000",
    "interest_rate": "0.0003",
    "order_price_round": "0.1",
    "order_size_min": 1,
    "ref_rebate_rate": "0.2",
    "funding_interval": 28800,
    "risk_limit_step": "1000000",
    "leverage_min": "1",
    "leverage_max": "100",
    "risk_limit_max": "8000000",
    "maker_fee_rate": "-0.00025",
    "taker_fee_rate": "0.00075",
    "funding_rate": "0.002053",
    "order_size_max": 1000000,
    "funding_next_apply": 1610035200,
    "short_users": 977,
    "config_change_time": 1609899548,
    "trade_size": 28530850594,
    "position_size": 5223816,
    "long_users": 455,
    "funding_impact_value": "60000",
    "orders_limit": 50,
    "trade_id": 10851092,
    "orderbook_id": 2129638396,
    "enable_bonus": true,
    "enable_credit": true,
    "create_time": 1669688556,
    "funding_cap_ratio": "0.75",
    "status": "trading",
    "launch_time": 1609899548,
    "delisting_time": 1609899548,
    "delisted_time": 1609899548
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listfuturescontracts-responses](https://www.gate.io/docs/developers/apiv4/en/#listfuturescontracts-responses)

| Status | Meaning                                                                    | Description                 | Schema                          |
| ------ | -------------------------------------------------------------------------- | --------------------------- | ------------------------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved successfully | \[[Contract](#schemacontract)\] |

This operation does not require authentication

## [#](#query-single-contract-information) Query single contract information

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-single-contract-information](https://www.gate.io/docs/developers/apiv4/en/#query-single-contract-information)

> Code samples
