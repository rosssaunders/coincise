# GET /options/position_close

**Source:** [/options/position_close](https://www.gate.io/docs/developers/apiv4/en/#listoptionspositionclose-parameters)

## Authentication

Required (Private Endpoint)

## [#](#list-user-s-liquidation-history-of-specified-underlying) List user's liquidation history of specified underlying

`GET /options/position_close`

_List user's liquidation history of specified underlying_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listoptionspositionclose-parameters](https://www.gate.io/docs/developers/apiv4/en/#listoptionspositionclose-parameters)

| Name       | In    | Type   | Required | Description                                          |
| ---------- | ----- | ------ | -------- | ---------------------------------------------------- |
| underlying | query | string | true     | Underlying (Obtained by listing underlying endpoint) |
| contract   | query | string | false    | Options contract name                                |

> Example responses

> 200 Response

```json
[
  {
    "time": 1631764800,
    "pnl": "-42914.291",
    "settle_size": "-10001",
    "side": "short",
    "contract": "BTC_USDT-20210916-5000-C",
    "text": "settled"
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listoptionspositionclose-responses](https://www.gate.io/docs/developers/apiv4/en/#listoptionspositionclose-responses)

| Status | Meaning                                                                    | Description                 | Schema     |
| ------ | -------------------------------------------------------------------------- | --------------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved successfully | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listoptionspositionclose-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listoptionspositionclose-responseschema)

Status Code **200**

| Name       | Type           | Description           |
| ---------- | -------------- | --------------------- |
| » time     | number(double) | Position close time   |
| » contract | string         | Options contract name |
| » side     | string         | Position side         |

\- `long`: Long position  
\- `short`: Short position | | » pnl | string | PnL | | » text | string | Source
of close order. See `order.text` field for specific values | | » settle_size |
string | Settlement size |

#### [#](#enumerated-values-123) Enumerated Values

| Property | Value |
| -------- | ----- |
| side     | long  |
| side     | short |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#create-an-options-order) Create an options order

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#create-an-options-order](https://www.gate.io/docs/developers/apiv4/en/#create-an-options-order)

> Code samples
