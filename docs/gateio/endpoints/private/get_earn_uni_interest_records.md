# GET /earn/uni/interest_records

**Source:** [/earn/uni/interest_records](https://www.gate.io/docs/developers/apiv4/en/#listuniinterestrecords-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-user-dividend-records) Query user dividend records

`GET /earn/uni/interest_records`

_Query user dividend records_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listuniinterestrecords-parameters](https://www.gate.io/docs/developers/apiv4/en/#listuniinterestrecords-parameters)

| Name     | In    | Type           | Required | Description                                                              |
| -------- | ----- | -------------- | -------- | ------------------------------------------------------------------------ |
| currency | query | string         | false    | Query by specified currency name                                         |
| page     | query | integer(int32) | false    | Page number                                                              |
| limit    | query | integer(int32) | false    | Maximum number of items returned. Default: 100, minimum: 1, maximum: 100 |
| from     | query | integer(int64) | false    | Start timestamp                                                          |
| to       | query | integer(int64) | false    | Termination Timestamp                                                    |

#### [#](#detailed-descriptions-54) Detailed descriptions

**from**: Start timestamp

Specify start time, time format is Unix timestamp. If not specified, it defaults
to (the data start time of the time range actually returned by to and limit)

**to**: Termination Timestamp

Specify the end time. If not specified, it defaults to the current time, and the
time format is a Unix timestamp

> Example responses

> 200 Response

```
[
  {
    "status": 1,
    "currency": "AE",
    "actual_rate": "0.0005",
    "interest": "0.05",
    "interest_status": "interest_dividend",
    "create_time": 1673247054000
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listuniinterestrecords-responses](https://www.gate.io/docs/developers/apiv4/en/#listuniinterestrecords-responses)

| Status | Meaning                                                                    | Description      | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listuniinterestrecords-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listuniinterestrecords-responseschema)

Status Code **200**

| Name               | Type           | Description                                                                                     |
| ------------------ | -------------- | ----------------------------------------------------------------------------------------------- |
| » _None_           | object         | Interest Record                                                                                 |
| »» status          | integer        | Status: 0 - fail, 1 - success                                                                   |
| »» currency        | string         | Currency                                                                                        |
| »» actual_rate     | string         | Actual Rate                                                                                     |
| »» interest        | string         | Interest                                                                                        |
| »» interest_status | string         | Interest status: interest_dividend - Normal dividend, interest_reinvest - Interest reinvestment |
| »» create_time     | integer(int64) | Created time                                                                                    |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-currency-interest-compounding-status) Query currency interest compounding status

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-currency-interest-compounding-status](https://www.gate.io/docs/developers/apiv4/en/#query-currency-interest-compounding-status)

> Code samples
