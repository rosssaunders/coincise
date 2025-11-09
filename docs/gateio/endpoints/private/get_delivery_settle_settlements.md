# GET /delivery/{settle}/settlements

**Source:**
[/delivery/{settle}/settlements](https://www.gate.io/docs/developers/apiv4/en/#listdeliverysettlements-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-settlement-records) Query settlement records

`GET /delivery/{settle}/settlements`

_Query settlement records_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listdeliverysettlements-parameters](https://www.gate.io/docs/developers/apiv4/en/#listdeliverysettlements-parameters)

| Name     | In    | Type    | Required | Description                                         |
| -------- | ----- | ------- | -------- | --------------------------------------------------- |
| settle   | path  | string  | true     | Settle currency                                     |
| contract | query | string  | false    | Futures contract                                    |
| limit    | query | integer | false    | Maximum number of records returned in a single list |
| at       | query | integer | false    | Specify settlement timestamp                        |

#### [#](#enumerated-values-111) Enumerated Values

| Parameter | Value |
| --------- | ----- |
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
    "settle_price": "3421.54",
    "profit": "-6.87498",
    "fee": "0.03079386"
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listdeliverysettlements-responses](https://www.gate.io/docs/developers/apiv4/en/#listdeliverysettlements-responses)

| Status | Meaning                                                                    | Description                 | Schema     |
| ------ | -------------------------------------------------------------------------- | --------------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved successfully | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listdeliverysettlements-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listdeliverysettlements-responseschema)

Status Code **200**

| Name           | Type           | Description         |
| -------------- | -------------- | ------------------- |
| » time         | integer(int64) | Liquidation time    |
| » contract     | string         | Futures contract    |
| » leverage     | string         | Position leverage   |
| » size         | integer(int64) | Position size       |
| » margin       | string         | Position margin     |
| » entry_price  | string         | Average entry price |
| » settle_price | string         | Settled price       |
| » profit       | string         | Profit              |
| » fee          | string         | Fee deducted        |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-risk-limit-tiers-2) Query risk limit tiers

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-risk-limit-tiers-2](https://www.gate.io/docs/developers/apiv4/en/#query-risk-limit-tiers-2)

> Code samples
