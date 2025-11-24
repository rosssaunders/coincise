# GET /futures/{settle}/positions/{contract}

**Source:**
[/futures/{settle}/positions/{contract}](https://www.gate.io/docs/developers/apiv4/en/#getposition-parameters)

## Authentication

Required (Private Endpoint)

## [#](#get-single-position-information) Get single position information

`GET /futures/{settle}/positions/{contract}`

_Get single position information_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getposition-parameters](https://www.gate.io/docs/developers/apiv4/en/#getposition-parameters)

| Name     | In   | Type   | Required | Description      |
| -------- | ---- | ------ | -------- | ---------------- |
| settle   | path | string | true     | Settle currency  |
| contract | path | string | true     | Futures contract |

#### [#](#enumerated-values-47) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```json
{
  "user": 10000,
  "contract": "BTC_USDT",
  "size": -9440,
  "leverage": "0",
  "risk_limit": "100",
  "leverage_max": "100",
  "maintenance_rate": "0.005",
  "value": "3568.62",
  "margin": "4.431548146258",
  "entry_price": "3779.55",
  "liq_price": "99999999",
  "mark_price": "3780.32",
  "unrealised_pnl": "-0.000507486844",
  "realised_pnl": "0.045543982432",
  "pnl_pnl": "0.045543982432",
  "pnl_fund": "0",
  "pnl_fee": "0",
  "history_pnl": "0",
  "last_close_pnl": "0",
  "realised_point": "0",
  "history_point": "0",
  "adl_ranking": 5,
  "pending_orders": 16,
  "close_order": {
    "id": 232323,
    "price": "3779",
    "is_liq": false
  },
  "mode": "single",
  "update_time": 1684994406,
  "update_id": 1,
  "cross_leverage_limit": "0",
  "risk_limit_table": "BIG_HOT_COIN_50X_V2",
  "average_maintenance_rate": "0.005"
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getposition-responses](https://www.gate.io/docs/developers/apiv4/en/#getposition-responses)

| Status | Meaning                                                                    | Description          | Schema                      |
| ------ | -------------------------------------------------------------------------- | -------------------- | --------------------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Position information | [Position](#schemaposition) |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#update-position-margin) Update position margin

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#update-position-margin](https://www.gate.io/docs/developers/apiv4/en/#update-position-margin)

> Code samples
