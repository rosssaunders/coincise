# GET /earn/structured/products

**Source:** [/earn/structured/products](https://www.gate.io/docs/developers/apiv4/en/#liststructuredproducts-parameters)

## Authentication

Not Required (Public Endpoint)

## [#](#structured-product-list) Structured Product List

`GET /earn/structured/products`

_Structured Product List_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#liststructuredproducts-parameters](https://www.gate.io/docs/developers/apiv4/en/#liststructuredproducts-parameters)

| Name   | In    | Type           | Required | Description                                         |
| ------ | ----- | -------------- | -------- | --------------------------------------------------- |
| type   | query | string         | false    | Product Type (Default empty to query all)           |
| status | query | string         | true     | Status (Default empty to query all)                 |
| page   | query | integer(int32) | false    | Page number                                         |
| limit  | query | integer        | false    | Maximum number of records returned in a single list |

#### [#](#detailed-descriptions-57) Detailed descriptions

**type**: Product Type (Default empty to query all)

`SharkFin2.0`\-Shark Fin `BullishSharkFin`\-Bullish Treasure
`BearishSharkFin`\-Bearish Treasure `DoubleNoTouch`\-Volatility Treasure
`RangeAccrual`\-Range Smart Yield `SnowBall`\-Snowball

**status**: Status (Default empty to query all)

`in_process`\-In progress `will_begin`\-Not started `wait_settlement`\-Pending
settlement `done`\-Completed

> Example responses

> 200 Response

```json
[
  {
    "id": 3700,
    "type": "BullishSharkFin",
    "name_en": "Bullish Sharkfin_USDT",
    "investment_period": 7,
    "min_annual_rate": "0.50",
    "mid_annual_rate": "7.50",
    "max_annual_rate": "13.00",
    "watch_market": "BTC_USDT",
    "investment_coin": "USDT",
    "start_time": 1698224400,
    "end_time": 1700902800,
    "status": "in_process"
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#liststructuredproducts-responses](https://www.gate.io/docs/developers/apiv4/en/#liststructuredproducts-responses)

| Status | Meaning                                                                    | Description            | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#liststructuredproducts-responseschema](https://www.gate.io/docs/developers/apiv4/en/#liststructuredproducts-responseschema)

Status Code **200**

| Name     | Type           | Description           |
| -------- | -------------- | --------------------- |
| » _None_ | object         | Structured Investment |
| »» id    | integer(int32) | Product ID            |
| »» type  | string         | Product Type:         |

`SharkFin2.0`\-Shark Fin 2.0  
`BullishSharkFin`\-Bullish Shark Fin  
`BearishSharkFin`\-Bearish Shark Fin  
`DoubleNoTouch`\-Double No-Touch  
`RangeAccrual`\-Range Accrual  
`SnowBall`\-Snow Ball | | »» name_en | string | Product Name | | »»
investment_coin | string | Investment Token | | »» investment_period | string |
Investment Period | | »» min_annual_rate | string | Minimum Annual Rate | | »»
mid_annual_rate | string | Intermediate Annual Rate | | »» max_annual_rate |
string | Maximum Annual Rate | | »» watch_market | string | Underlying Market |
| »» start_time | integer(int32) | Start Time | | »» end_time | integer(int32) |
End time | | »» status | string | Status:

`in_process`\-in progress  
`will_begin`\-will begin  
`wait_settlement`\-waiting for settlement  
`done`\-done |

This operation does not require authentication

## [#](#structured-product-order-list) Structured Product Order List

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#structured-product-order-list](https://www.gate.io/docs/developers/apiv4/en/#structured-product-order-list)

> Code samples
