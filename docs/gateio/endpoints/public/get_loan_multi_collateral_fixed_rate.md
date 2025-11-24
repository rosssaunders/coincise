# GET /loan/multi_collateral/fixed_rate

**Source:** [/loan/multi_collateral/fixed_rate](https://www.gate.io/docs/developers/apiv4/en/#getmulticollateralfixrate-responses)

## Authentication

Not Required (Public Endpoint)

## [#](#query-currency-s-7-day-and-30-day-fixed-interest-rates) Query currency's 7-day and 30-day fixed interest rates

`GET /loan/multi_collateral/fixed_rate`

_Query currency's 7-day and 30-day fixed interest rates_

> Example responses

> 200 Response

```json
[
  {
    "currency": "BTC",
    "rate_7d": "0.000023",
    "rate_30d": "0.1",
    "update_time": 1703820105
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getmulticollateralfixrate-responses](https://www.gate.io/docs/developers/apiv4/en/#getmulticollateralfixrate-responses)

| Status | Meaning                                                                    | Description      | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getmulticollateralfixrate-responseschema](https://www.gate.io/docs/developers/apiv4/en/#getmulticollateralfixrate-responseschema)

Status Code **200**

| Name           | Type           | Description                                   |
| -------------- | -------------- | --------------------------------------------- |
| » _None_       | object         | Multi-collateral fixed interest rate          |
| »» currency    | string         | Currency                                      |
| »» rate_7d     | string         | Fixed interest rate for 7-day lending period  |
| »» rate_30d    | string         | Fixed interest rate for 30-day lending period |
| »» update_time | integer(int64) | Update time, timestamp in seconds             |

This operation does not require authentication

## [#](#query-currency-s-current-interest-rate) Query currency's current interest rate

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-currency-s-current-interest-rate](https://www.gate.io/docs/developers/apiv4/en/#query-currency-s-current-interest-rate)

> Code samples
