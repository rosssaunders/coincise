# GET /unified/interest_records

**Source:** [/unified/interest_records](https://www.gate.io/docs/developers/apiv4/en/#listunifiedloaninterestrecords-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-interest-deduction-records) Query interest deduction records

`GET /unified/interest_records`

_Query interest deduction records_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listunifiedloaninterestrecords-parameters](https://www.gate.io/docs/developers/apiv4/en/#listunifiedloaninterestrecords-parameters)

| Name     | In    | Type           | Required | Description                                                                                              |
| -------- | ----- | -------------- | -------- | -------------------------------------------------------------------------------------------------------- |
| currency | query | string         | false    | Query by specified currency name                                                                         |
| page     | query | integer(int32) | false    | Page number                                                                                              |
| limit    | query | integer(int32) | false    | Maximum number of items returned. Default: 100, minimum: 1, maximum: 100                                 |
| from     | query | integer(int64) | false    | Start timestamp for the query                                                                            |
| to       | query | integer(int64) | false    | End timestamp for the query, defaults to current time if not specified                                   |
| type     | query | string         | false    | Loan type: platform borrowing - platform, margin borrowing - margin. Defaults to margin if not specified |

> Example responses

> 200 Response

```
[
  {
    "status": 1,
    "currency_pair": "BTC_USDT",
    "currency": "USDT",
    "actual_rate": "0.00000236",
    "interest": "0.00006136",
    "type": "platform",
    "create_time": 1673247054000
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listunifiedloaninterestrecords-responses](https://www.gate.io/docs/developers/apiv4/en/#listunifiedloaninterestrecords-responses)

| Status | Meaning                                                                    | Description      | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listunifiedloaninterestrecords-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listunifiedloaninterestrecords-responseschema)

Status Code **200**

| Name             | Type           | Description                                                    |
| ---------------- | -------------- | -------------------------------------------------------------- |
| _None_           | array          | \[Interest Deduction Record\]                                  |
| » _None_         | object         | Interest Deduction Record                                      |
| »» currency      | string         | Currency name                                                  |
| »» currency_pair | string         | Trading pair                                                   |
| »» actual_rate   | string         | Actual Rate                                                    |
| »» interest      | string         | Interest                                                       |
| »» status        | integer        | Status: 0 - fail, 1 - success                                  |
| »» type          | string         | Type: platform - Platform borrowing, margin - Margin borrowing |
| »» create_time   | integer(int64) | Created time                                                   |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-user-risk-unit-details) Get user risk unit details

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#get-user-risk-unit-details](https://www.gate.io/docs/developers/apiv4/en/#get-user-risk-unit-details)

> Code samples
