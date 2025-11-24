# GET /futures/{settle}/liq_orders

**Source:**
[/futures/{settle}/liq_orders](https://www.gate.io/docs/developers/apiv4/en/#listliquidatedorders-parameters)

## Authentication

Not Required (Public Endpoint)

## [#](#query-liquidation-order-history) Query liquidation order history

`GET /futures/{settle}/liq_orders`

_Query liquidation order history_

The time interval between from and to is maximum 3600. Some private fields are
not returned by public interfaces, refer to field descriptions for details

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listliquidatedorders-parameters](https://www.gate.io/docs/developers/apiv4/en/#listliquidatedorders-parameters)

| Name     | In    | Type           | Required | Description                                             |
| -------- | ----- | -------------- | -------- | ------------------------------------------------------- |
| settle   | path  | string         | true     | Settle currency                                         |
| contract | query | string         | false    | Futures contract, return related data only if specified |
| from     | query | integer(int64) | false    | Start timestamp                                         |
| to       | query | integer(int64) | false    | Termination Timestamp                                   |
| limit    | query | integer        | false    | Maximum number of records returned in a single list     |

#### [#](#detailed-descriptions-25) Detailed descriptions

**from**: Start timestamp

Specify start time, time format is Unix timestamp. If not specified, it defaults
to (the data start time of the time range actually returned by to and limit)

**to**: Termination Timestamp

Specify the end time. If not specified, it defaults to the current time, and the
time format is a Unix timestamp

#### [#](#enumerated-values-41) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```json
[
  {
    "time": 1548654951,
    "contract": "BTC_USDT",
    "size": 600,
    "order_size": -600,
    "order_price": "3405",
    "fill_price": "3424",
    "left": 0
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listliquidatedorders-responses](https://www.gate.io/docs/developers/apiv4/en/#listliquidatedorders-responses)

| Status | Meaning                                                                    | Description                 | Schema     |
| ------ | -------------------------------------------------------------------------- | --------------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved successfully | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listliquidatedorders-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listliquidatedorders-responseschema)

Status Code **200**

| Name          | Type           | Description                           |
| ------------- | -------------- | ------------------------------------- |
| » time        | integer(int64) | Liquidation time                      |
| » contract    | string         | Futures contract                      |
| » size        | integer(int64) | User position size                    |
| » order_size  | integer(int64) | Number of forced liquidation orders   |
| » order_price | string         | Liquidation order price               |
| » fill_price  | string         | Liquidation order average taker price |
| » left        | integer(int64) | System liquidation order maker size   |

This operation does not require authentication

## [#](#query-risk-limit-tiers) Query risk limit tiers

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-risk-limit-tiers](https://www.gate.io/docs/developers/apiv4/en/#query-risk-limit-tiers)

> Code samples
