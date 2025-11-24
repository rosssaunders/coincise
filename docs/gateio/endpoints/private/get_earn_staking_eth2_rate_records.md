# GET /earn/staking/eth2/rate_records

**Source:** [/earn/staking/eth2/rate_records](https://www.gate.io/docs/developers/apiv4/en/#ratelisteth2-responses)

## Authentication

Required (Private Endpoint)

## [#](#eth2-historical-return-rate-query) ETH2 historical return rate query

`GET /earn/staking/eth2/rate_records`

_ETH2 historical return rate query_

Query ETH earnings rate records for the last 31 days

> Example responses

> 200 Response

```json
[
  {
    "date_time": 1690348815,
    "date": "2023-07-26",
    "rate": "60.00"
  },
  {
    "date_time": 1690435215,
    "date": "2023-07-27",
    "rate": "20.00"
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#ratelisteth2-responses](https://www.gate.io/docs/developers/apiv4/en/#ratelisteth2-responses)

| Status | Meaning                                                                    | Description            | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#ratelisteth2-responseschema](https://www.gate.io/docs/developers/apiv4/en/#ratelisteth2-responseschema)

Status Code **200**

| Name        | Type           | Description     |
| ----------- | -------------- | --------------- |
| » date_time | integer(int64) | Date Timestamp  |
| » date      | string         | Date            |
| » rate      | string         | Percentage Rate |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#dual-investment-product-list) Dual Investment product list

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#dual-investment-product-list](https://www.gate.io/docs/developers/apiv4/en/#dual-investment-product-list)

> Code samples
