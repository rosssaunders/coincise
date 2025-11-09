# GET /unified/loans

**Source:** [/unified/loans](https://www.gate.io/docs/developers/apiv4/en/#listunifiedloans-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-loans) Query loans

`GET /unified/loans`

_Query loans_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listunifiedloans-parameters](https://www.gate.io/docs/developers/apiv4/en/#listunifiedloans-parameters)

| Name     | In    | Type           | Required | Description                                                              |
| -------- | ----- | -------------- | -------- | ------------------------------------------------------------------------ |
| currency | query | string         | false    | Query by specified currency name                                         |
| page     | query | integer(int32) | false    | Page number                                                              |
| limit    | query | integer(int32) | false    | Maximum number of items returned. Default: 100, minimum: 1, maximum: 100 |
| type     | query | string         | false    | Loan type: platform borrowing - platform, margin borrowing - margin      |

> Example responses

> 200 Response

```
[
  {
    "currency": "USDT",
    "currency_pari": "GT_USDT",
    "amount": "1",
    "type": "margin",
    "change_time": 1673247054000,
    "create_time": 1673247054000
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listunifiedloans-responses](https://www.gate.io/docs/developers/apiv4/en/#listunifiedloans-responses)

| Status | Meaning                                                                    | Description      | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listunifiedloans-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listunifiedloans-responseschema)

Status Code **200**

| Name             | Type           | Description                                                         |
| ---------------- | -------------- | ------------------------------------------------------------------- |
| _None_           | array          | \[Borrowing\]                                                       |
| » _None_         | object         | Borrowing                                                           |
| »» currency      | string         | Currency                                                            |
| »» currency_pair | string         | Trading pair                                                        |
| »» amount        | string         | Amount to Repay                                                     |
| »» type          | string         | Loan type: platform borrowing - platform, margin borrowing - margin |
| »» create_time   | integer(int64) | Created time                                                        |
| »» update_time   | integer(int64) | Last Update Time                                                    |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-loan-records) Query loan records

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-loan-records](https://www.gate.io/docs/developers/apiv4/en/#query-loan-records)

> Code samples
