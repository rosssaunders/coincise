# GET /futures/{settle}/position_close

**Source:** [/futures/{settle}/position_close](https://www.gate.io/docs/developers/apiv4/en/#listpositionclose-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-position-close-history) Query position close history

`GET /futures/{settle}/position_close`

_Query position close history_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listpositionclose-parameters](https://www.gate.io/docs/developers/apiv4/en/#listpositionclose-parameters)

| Name     | In    | Type           | Required | Description                                             |
| -------- | ----- | -------------- | -------- | ------------------------------------------------------- |
| settle   | path  | string         | true     | Settle currency                                         |
| contract | query | string         | false    | Futures contract, return related data only if specified |
| limit    | query | integer        | false    | Maximum number of records returned in a single list     |
| offset   | query | integer        | false    | List offset, starting from 0                            |
| from     | query | integer(int64) | false    | Start timestamp                                         |
| to       | query | integer(int64) | false    | Termination Timestamp                                   |
| side     | query | string         | false    | Query side. long or shot                                |
| pnl      | query | string         | false    | Query profit or loss                                    |

#### [#](#detailed-descriptions-34) Detailed descriptions

**from**: Start timestamp

Specify start time, time format is Unix timestamp. If not specified, it defaults
to (the data start time of the time range actually returned by to and limit)

**to**: Termination Timestamp

Specify the end time. If not specified, it defaults to the current time, and the
time format is a Unix timestamp

#### [#](#enumerated-values-71) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
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
[https://www.gate.io/docs/developers/apiv4/en/#listpositionclose-responses](https://www.gate.io/docs/developers/apiv4/en/#listpositionclose-responses)

| Status | Meaning                                                                    | Description                 | Schema     |
| ------ | -------------------------------------------------------------------------- | --------------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved successfully | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listpositionclose-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listpositionclose-responseschema)

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

#### [#](#enumerated-values-72) Enumerated Values

| Property | Value |
| -------- | ----- |
| side     | long  |
| side     | short |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-liquidation-history) Query liquidation history

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-liquidation-history](https://www.gate.io/docs/developers/apiv4/en/#query-liquidation-history)

> Code samples
