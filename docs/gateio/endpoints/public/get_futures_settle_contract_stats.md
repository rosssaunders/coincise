# GET /futures/{settle}/contract_stats

**Source:**
[/futures/{settle}/contract_stats](https://www.gate.io/docs/developers/apiv4/en/#listcontractstats-parameters)

## Authentication

Not Required (Public Endpoint)

## [#](#futures-statistics) Futures statistics

`GET /futures/{settle}/contract_stats`

_Futures statistics_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listcontractstats-parameters](https://www.gate.io/docs/developers/apiv4/en/#listcontractstats-parameters)

| Name     | In    | Type           | Required | Description      |
| -------- | ----- | -------------- | -------- | ---------------- |
| settle   | path  | string         | true     | Settle currency  |
| contract | query | string         | true     | Futures contract |
| from     | query | integer(int64) | false    | Start timestamp  |
| interval | query | string         | false    | none             |
| limit    | query | integer        | false    | none             |

#### [#](#enumerated-values-39) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```json
[
  {
    "time": 1603865400,
    "lsr_taker": 100,
    "lsr_account": 0.5,
    "long_liq_size": 0,
    "short_liq_size": 0,
    "open_interest": 124724,
    "short_liq_usd": 0,
    "mark_price": "8865",
    "top_lsr_size": 1.02,
    "short_liq_amount": 0,
    "long_liq_amount": 0,
    "open_interest_usd": 1511,
    "top_lsr_account": 1.5,
    "long_liq_usd": 0
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listcontractstats-responses](https://www.gate.io/docs/developers/apiv4/en/#listcontractstats-responses)

| Status | Meaning                                                                    | Description                 | Schema     |
| ------ | -------------------------------------------------------------------------- | --------------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved successfully | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listcontractstats-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listcontractstats-responseschema)

Status Code **200**

| Name                | Type           | Description                                 |
| ------------------- | -------------- | ------------------------------------------- |
| » time              | integer(int64) | Stat timestamp                              |
| » lsr_taker         | number         | Long/short taker ratio                      |
| » lsr_account       | number         | Long/short position user ratio              |
| » long_liq_size     | integer(int64) | Long liquidation size (contracts)           |
| » long_liq_amount   | number(double) | Long liquidation amount (base currency)     |
| » long_liq_usd      | number(double) | Long liquidation volume (quote currency)    |
| » short_liq_size    | integer(int64) | Short liquidation size (contracts)          |
| » short_liq_amount  | number(double) | Short liquidation amount (base currency)    |
| » short_liq_usd     | number(double) | Short liquidation volume (quote currency)   |
| » open_interest     | integer(int64) | Total open interest size (contracts)        |
| » open_interest_usd | number(double) | Total open interest volume (quote currency) |
| » top_lsr_account   | number(double) | Top trader long/short account ratio         |
| » top_lsr_size      | number(double) | Top trader long/short position ratio        |
| » mark_price        | number(double) | 标记Price                                   |

This operation does not require authentication

## [#](#query-index-constituents) Query index constituents

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-index-constituents](https://www.gate.io/docs/developers/apiv4/en/#query-index-constituents)

> Code samples
