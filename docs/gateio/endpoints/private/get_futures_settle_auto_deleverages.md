# GET /futures/{settle}/auto_deleverages

**Source:** [/futures/{settle}/auto_deleverages](https://www.gate.io/docs/developers/apiv4/en/#listautodeleverages-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-adl-auto-deleveraging-order-information) Query ADL auto-deleveraging order information

`GET /futures/{settle}/auto_deleverages`

_Query ADL auto-deleveraging order information_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listautodeleverages-parameters](https://www.gate.io/docs/developers/apiv4/en/#listautodeleverages-parameters)

| Name     | In    | Type           | Required | Description                                             |
| -------- | ----- | -------------- | -------- | ------------------------------------------------------- |
| settle   | path  | string         | true     | Settle currency                                         |
| contract | query | string         | false    | Futures contract, return related data only if specified |
| limit    | query | integer        | false    | Maximum number of records returned in a single list     |
| offset   | query | integer        | false    | List offset, starting from 0                            |
| from     | query | integer(int64) | false    | Start timestamp                                         |
| to       | query | integer(int64) | false    | Termination Timestamp                                   |
| at       | query | integer        | false    | Specify auto-deleveraging timestamp                     |

#### [#](#detailed-descriptions-36) Detailed descriptions

**from**: Start timestamp

Specify start time, time format is Unix timestamp. If not specified, it defaults
to (the data start time of the time range actually returned by to and limit)

**to**: Termination Timestamp

Specify the end time. If not specified, it defaults to the current time, and the
time format is a Unix timestamp

#### [#](#enumerated-values-74) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```json
[
  {
    "time": 1675841679,
    "contract": "ACH_USDT",
    "order_id": 73873128,
    "user": 1666,
    "cross_leverage_limit": "0",
    "leverage": "0",
    "entry_price": "2649.648633636364",
    "fill_price": "2790.8082",
    "position_size": 1,
    "trade_size": -10
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listautodeleverages-responses](https://www.gate.io/docs/developers/apiv4/en/#listautodeleverages-responses)

| Status | Meaning                                                                    | Description                 | Schema     |
| ------ | -------------------------------------------------------------------------- | --------------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved successfully | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listautodeleverages-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listautodeleverages-responseschema)

Status Code **200**

| Name                   | Type           | Description                                             |
| ---------------------- | -------------- | ------------------------------------------------------- |
| » time                 | integer(int64) | Automatic deleveraging time                             |
| » user                 | integer(int64) | User ID                                                 |
| » order_id             | integer(int64) | Order ID. Order IDs before 2023-02-20 are null          |
| » contract             | string         | Futures contract                                        |
| » leverage             | string         | Position leverage                                       |
| » cross_leverage_limit | string         | Cross margin leverage (valid only when `leverage` is 0) |
| » entry_price          | string         | Average entry price                                     |
| » fill_price           | string         | Average fill price                                      |
| » trade_size           | integer(int64) | Trading size                                            |
| » position_size        | integer(int64) | Positions after auto-deleveraging                       |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#countdown-cancel-orders-2) Countdown cancel orders

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#countdown-cancel-orders-2](https://www.gate.io/docs/developers/apiv4/en/#countdown-cancel-orders-2)

> Code samples
