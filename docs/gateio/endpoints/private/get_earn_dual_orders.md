# GET /earn/dual/orders

**Source:** [/earn/dual/orders](https://www.gate.io/docs/developers/apiv4/en/#listdualorders-parameters)

## Authentication

Required (Private Endpoint)

## [#](#dual-investment-order-list) Dual Investment order list

`GET /earn/dual/orders`

_Dual Investment order list_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listdualorders-parameters](https://www.gate.io/docs/developers/apiv4/en/#listdualorders-parameters)

| Name  | In    | Type           | Required | Description                                         |
| ----- | ----- | -------------- | -------- | --------------------------------------------------- |
| from  | query | integer(int64) | false    | Start settlement time                               |
| to    | query | integer(int64) | false    | End settlement time                                 |
| page  | query | integer(int32) | false    | Page number                                         |
| limit | query | integer        | false    | Maximum number of records returned in a single list |

> Example responses

> 200 Response

```json
[
  {
    "id": 373,
    "plan_id": 176,
    "copies": "1.0000000000",
    "invest_amount": "0.0000000000",
    "settlement_amount": "0.0000000000",
    "create_time": 1697685172,
    "complete_time": 1697685172,
    "status": "CANCELED",
    "invest_currency": "USDT",
    "exercise_currency": "BTC",
    "settlement_currency": "",
    "exercise_price": "24500.0000000000",
    "settlement_price": "0.0000000000",
    "delivery_time": 1697685172,
    "apy_display": "0.6800000000",
    "apy_settlement": "0.0000000000",
    "text": "t-custom-text"
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listdualorders-responses](https://www.gate.io/docs/developers/apiv4/en/#listdualorders-responses)

| Status | Meaning                                                                    | Description            | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listdualorders-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listdualorders-responseschema)

Status Code **200**

| Name                | Type           | Description         |
| ------------------- | -------------- | ------------------- |
| » id                | integer(int32) | Order ID            |
| » plan_id           | integer(int32) | Product ID          |
| » copies            | string         | Units               |
| » invest_amount     | string         | Investment Quantity |
| » settlement_amount | string         | Settlement Quantity |
| » create_time       | integer(int32) | Creation time       |
| » complete_time     | integer(int32) | Completed Time      |
| » status            | string         | Status:             |

`INIT`\-Created  
`SETTLEMENT_SUCCESS`\-Settlement Success  
`SETTLEMENT_PROCESSING`\-Settlement Processing  
`CANCELED`\-Canceled  
`FAILED`\-Failed | | » invest_currency | string | Investment Token | | »
exercise_currency | string | Strike Token | | » exercise_price | string | Strike
price | | » settlement_price | string | Settlement price | | »
settlement_currency | string | Settlement currency | | » apy_display | string |
Annual Yield | | » apy_settlement | string | Settlement Annual Yield | | »
delivery_time | integer(int32) | Settlement time | | » text | string | Custom
order information |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#place-dual-investment-order) Place Dual Investment order

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#place-dual-investment-order](https://www.gate.io/docs/developers/apiv4/en/#place-dual-investment-order)

> Code samples
