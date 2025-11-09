# GET /futures/{settle}/liquidates

**Source:**
[/futures/{settle}/liquidates](https://www.gate.io/docs/developers/apiv4/en/#listliquidates-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-liquidation-history) Query liquidation history

`GET /futures/{settle}/liquidates`

_Query liquidation history_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listliquidates-parameters](https://www.gate.io/docs/developers/apiv4/en/#listliquidates-parameters)

| Name     | In    | Type           | Required | Description                                             |
| -------- | ----- | -------------- | -------- | ------------------------------------------------------- |
| settle   | path  | string         | true     | Settle currency                                         |
| contract | query | string         | false    | Futures contract, return related data only if specified |
| limit    | query | integer        | false    | Maximum number of records returned in a single list     |
| offset   | query | integer        | false    | List offset, starting from 0                            |
| from     | query | integer(int64) | false    | Start timestamp                                         |
| to       | query | integer(int64) | false    | Termination Timestamp                                   |
| at       | query | integer        | false    | Specify liquidation timestamp                           |

#### [#](#detailed-descriptions-35) Detailed descriptions

**from**: Start timestamp

Specify start time, time format is Unix timestamp. If not specified, it defaults
to (the data start time of the time range actually returned by to and limit)

**to**: Termination Timestamp

Specify the end time. If not specified, it defaults to the current time, and the
time format is a Unix timestamp

#### [#](#enumerated-values-73) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```
[
  {
    "time": 1548654951,
    "contract": "BTC_USDT",
    "size": 600,
    "leverage": "25",
    "margin": "0.006705256878",
    "entry_price": "3536.123",
    "liq_price": "3421.54",
    "mark_price": "3420.27",
    "order_id": 317393847,
    "order_price": "3405",
    "fill_price": "3424",
    "left": 0
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listliquidates-responses](https://www.gate.io/docs/developers/apiv4/en/#listliquidates-responses)

| Status | Meaning                                                                    | Description                 | Schema     |
| ------ | -------------------------------------------------------------------------- | --------------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved successfully | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listliquidates-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listliquidates-responseschema)

Status Code **200**

| Name          | Type           | Description                                            |
| ------------- | -------------- | ------------------------------------------------------ |
| _None_        | array          | none                                                   |
| » time        | integer(int64) | Liquidation time                                       |
| » contract    | string         | Futures contract                                       |
| » leverage    | string         | Position leverage. Not returned in public endpoints    |
| » size        | integer(int64) | Position size                                          |
| » margin      | string         | Position margin. Not returned in public endpoints      |
| » entry_price | string         | Average entry price. Not returned in public endpoints  |
| » liq_price   | string         | Liquidation price. Not returned in public endpoints    |
| » mark_price  | string         | Mark price. Not returned in public endpoints           |
| » order_id    | integer(int64) | Liquidation order ID. Not returned in public endpoints |
| » order_price | string         | Liquidation order price                                |
| » fill_price  | string         | Liquidation order average taker price                  |
| » left        | integer(int64) | Liquidation order maker size                           |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-adl-auto-deleveraging-order-information) Query ADL auto-deleveraging order information

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-adl-auto-deleveraging-order-information](https://www.gate.io/docs/developers/apiv4/en/#query-adl-auto-deleveraging-order-information)

> Code samples
