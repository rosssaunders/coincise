# GET /delivery/{settle}/liquidates

**Source:** [/delivery/{settle}/liquidates](https://www.gate.io/docs/developers/apiv4/en/#listdeliveryliquidates-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-liquidation-history-2) Query liquidation history

`GET /delivery/{settle}/liquidates`

_Query liquidation history_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listdeliveryliquidates-parameters](https://www.gate.io/docs/developers/apiv4/en/#listdeliveryliquidates-parameters)

| Name     | In    | Type    | Required | Description                                         |
| -------- | ----- | ------- | -------- | --------------------------------------------------- |
| settle   | path  | string  | true     | Settle currency                                     |
| contract | query | string  | false    | Futures contract                                    |
| limit    | query | integer | false    | Maximum number of records returned in a single list |
| at       | query | integer | false    | Specify liquidation timestamp                       |

#### [#](#enumerated-values-110) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | usdt  |

> Example responses

> 200 Response

```json
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
[https://www.gate.io/docs/developers/apiv4/en/#listdeliveryliquidates-responses](https://www.gate.io/docs/developers/apiv4/en/#listdeliveryliquidates-responses)

| Status | Meaning                                                                    | Description                 | Schema     |
| ------ | -------------------------------------------------------------------------- | --------------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved successfully | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listdeliveryliquidates-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listdeliveryliquidates-responseschema)

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

## [#](#query-settlement-records) Query settlement records

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-settlement-records](https://www.gate.io/docs/developers/apiv4/en/#query-settlement-records)

> Code samples
