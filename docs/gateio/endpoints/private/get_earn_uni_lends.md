# GET /earn/uni/lends

**Source:** [/earn/uni/lends](https://www.gate.io/docs/developers/apiv4/en/#listuserunilends-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-user-s-lending-order-list) Query user's lending order list

`GET /earn/uni/lends`

_Query user's lending order list_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listuserunilends-parameters](https://www.gate.io/docs/developers/apiv4/en/#listuserunilends-parameters)

| Name     | In    | Type           | Required | Description                                                              |
| -------- | ----- | -------------- | -------- | ------------------------------------------------------------------------ |
| currency | query | string         | false    | Query by specified currency name                                         |
| page     | query | integer(int32) | false    | Page number                                                              |
| limit    | query | integer(int32) | false    | Maximum number of items returned. Default: 100, minimum: 1, maximum: 100 |

> Example responses

> 200 Response

```
[
  {
    "currency": "BTC",
    "current_amount": "20.999992",
    "amount": "20.999992",
    "lent_amount": "0",
    "frozen_amount": "0",
    "min_rate": "0.1",
    "interest_status": "interest_dividend",
    "reinvest_left_amount": 0,
    "create_time": 1673247054000,
    "update_time": 1673247054000
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listuserunilends-responses](https://www.gate.io/docs/developers/apiv4/en/#listuserunilends-responses)

| Status | Meaning                                                                    | Description      | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listuserunilends-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listuserunilends-responseschema)

Status Code **200**

| Name                    | Type           | Description                                                                                     |
| ----------------------- | -------------- | ----------------------------------------------------------------------------------------------- |
| » _None_                | object         | Loan record                                                                                     |
| »» currency             | string         | Currency                                                                                        |
| »» current_amount       | string         | Current amount                                                                                  |
| »» amount               | string         | Total Lending Amount                                                                            |
| »» lent_amount          | string         | Lent Amount                                                                                     |
| »» frozen_amount        | string         | Pending Redemption Amount                                                                       |
| »» min_rate             | string         | Minimum interest rate                                                                           |
| »» interest_status      | string         | Interest status: interest_dividend - Normal dividend, interest_reinvest - Interest reinvestment |
| »» reinvest_left_amount | string         | Non-reinvested Amount                                                                           |
| »» create_time          | integer(int64) | Lending Order Creation Time                                                                     |
| »» update_time          | integer(int64) | Lending Order Last Update Time                                                                  |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#amend-user-lending-information) Amend user lending information

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#amend-user-lending-information](https://www.gate.io/docs/developers/apiv4/en/#amend-user-lending-information)

> Code samples
