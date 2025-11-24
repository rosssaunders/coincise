# GET /delivery/{settle}/position_close

**Source:**
[/delivery/{settle}/position_close](https://www.gate.io/docs/developers/apiv4/en/#listdeliverypositionclose-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-position-close-history-2) Query position close history

`GET /delivery/{settle}/position_close`

_Query position close history_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listdeliverypositionclose-parameters](https://www.gate.io/docs/developers/apiv4/en/#listdeliverypositionclose-parameters)

| Name     | In    | Type    | Required | Description                                         |
| -------- | ----- | ------- | -------- | --------------------------------------------------- |
| settle   | path  | string  | true     | Settle currency                                     |
| contract | query | string  | false    | Futures contract                                    |
| limit    | query | integer | false    | Maximum number of records returned in a single list |

#### [#](#enumerated-values-108) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | usdt  |

> Example responses

> 200 Response

```json
[
  {
    "time": 1546487347,
    "pnl": "0.00013",
    "pnl_pnl": "0.00011",
    "pnl_fund": "0.00001",
    "pnl_fee": "0.00001",
    "side": "long",
    "contract": "BTC_USDT",
    "text": "web",
    "max_size": "100",
    "accum_size": "100",
    "first_open_time": 1546487347,
    "long_price": "2026.87",
    "short_price": "2544.4"
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listdeliverypositionclose-responses](https://www.gate.io/docs/developers/apiv4/en/#listdeliverypositionclose-responses)

| Status | Meaning                                                                    | Description                 | Schema     |
| ------ | -------------------------------------------------------------------------- | --------------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved successfully | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listdeliverypositionclose-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listdeliverypositionclose-responseschema)

Status Code **200**

| Name       | Type           | Description         |
| ---------- | -------------- | ------------------- |
| _None_     | array          | none                |
| » time     | number(double) | Position close time |
| » contract | string         | Futures contract    |
| » side     | string         | Position side       |

\- `long`: Long position  
\- `short`: Short position | | » pnl | string | PnL | | » pnl_pnl | string |
PNL - Position P/L | | » pnl_fund | string | PNL - Funding Fees | | » pnl_fee |
string | PNL - Transaction Fees | | » text | string | Source of close order. See
`order.text` field for specific values | | » max_size | string | Max Trade Size
| | » accum_size | string | Cumulative closed position volume | | »
first_open_time | integer(int64) | First Open Time | | » long_price | string |
When side is 'long', it indicates the opening average price; when side is
'short', it indicates the closing average price | | » short_price | string |
When side is 'long', it indicates the closing average price; when side is
'short', it indicates the opening average price |

#### [#](#enumerated-values-109) Enumerated Values

| Property | Value |
| -------- | ----- |
| side     | long  |
| side     | short |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-liquidation-history-2) Query liquidation history

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-liquidation-history-2](https://www.gate.io/docs/developers/apiv4/en/#query-liquidation-history-2)

> Code samples
