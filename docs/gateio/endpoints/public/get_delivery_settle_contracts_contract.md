# GET /delivery/{settle}/contracts/{contract}

**Source:**
[/delivery/{settle}/contracts/{contract}](https://www.gate.io/docs/developers/apiv4/en/#getdeliverycontract-parameters)

## Authentication

Not Required (Public Endpoint)

## [#](#query-single-contract-information-2) Query single contract information

`GET /delivery/{settle}/contracts/{contract}`

_Query single contract information_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getdeliverycontract-parameters](https://www.gate.io/docs/developers/apiv4/en/#getdeliverycontract-parameters)

| Name     | In   | Type   | Required | Description      |
| -------- | ---- | ------ | -------- | ---------------- |
| settle   | path | string | true     | Settle currency  |
| contract | path | string | true     | Futures contract |

#### [#](#enumerated-values-87) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | usdt  |

> Example responses

> 200 Response

```json
{
  "name": "BTC_USDT_20200814",
  "underlying": "BTC_USDT",
  "cycle": "WEEKLY",
  "type": "direct",
  "quanto_multiplier": "0.0001",
  "mark_type": "index",
  "last_price": "9017",
  "mark_price": "9019",
  "index_price": "9005.3",
  "basis_rate": "0.185095",
  "basis_value": "13.7",
  "basis_impact_value": "100000",
  "settle_price": "0",
  "settle_price_interval": 60,
  "settle_price_duration": 1800,
  "settle_fee_rate": "0.0015",
  "expire_time": 1593763200,
  "order_price_round": "0.1",
  "mark_price_round": "0.1",
  "leverage_min": "1",
  "leverage_max": "100",
  "maintenance_rate": "1000000",
  "risk_limit_base": "140.726652109199",
  "risk_limit_step": "1000000",
  "risk_limit_max": "8000000",
  "maker_fee_rate": "-0.00025",
  "taker_fee_rate": "0.00075",
  "ref_discount_rate": "0",
  "ref_rebate_rate": "0.2",
  "order_price_deviate": "0.5",
  "order_size_min": 1,
  "order_size_max": 1000000,
  "orders_limit": 50,
  "orderbook_id": 63,
  "trade_id": 26,
  "trade_size": 435,
  "position_size": 130,
  "config_change_time": 1593158867,
  "in_delisting": false
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getdeliverycontract-responses](https://www.gate.io/docs/developers/apiv4/en/#getdeliverycontract-responses)

| Status | Meaning                                                                    | Description          | Schema                                      |
| ------ | -------------------------------------------------------------------------- | -------------------- | ------------------------------------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Contract information | [DeliveryContract](#schemadeliverycontract) |

This operation does not require authentication

## [#](#query-futures-market-depth-information-2) Query futures market depth information

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-futures-market-depth-information-2](https://www.gate.io/docs/developers/apiv4/en/#query-futures-market-depth-information-2)

> Code samples
