# GET /margin/uni/interest_records

**Source:** [/margin/uni/interest_records](https://www.gate.io/docs/developers/apiv4/en/#listisolateduniloaninterestrecords-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-interest-deduction-records-2) Query interest deduction records

`GET /margin/uni/interest_records`

_Query interest deduction records_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listisolateduniloaninterestrecords-parameters](https://www.gate.io/docs/developers/apiv4/en/#listisolateduniloaninterestrecords-parameters)

| Name          | In    | Type           | Required | Description                                         |
| ------------- | ----- | -------------- | -------- | --------------------------------------------------- |
| currency_pair | query | string         | false    | Trading pair                                        |
| currency      | query | string         | false    | Query by specified currency name                    |
| page          | query | integer(int32) | false    | Page number                                         |
| limit         | query | integer        | false    | Maximum number of records returned in a single list |
| from          | query | integer(int64) | false    | Start timestamp                                     |
| to            | query | integer(int64) | false    | Termination Timestamp                               |

#### [#](#detailed-descriptions-9) Detailed descriptions

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
[https://www.gate.io/docs/developers/apiv4/en/#listisolateduniloaninterestrecords-responses](https://www.gate.io/docs/developers/apiv4/en/#listisolateduniloaninterestrecords-responses)

| Status | Meaning                                                                    | Description      | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listisolateduniloaninterestrecords-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listisolateduniloaninterestrecords-responseschema)

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

## [#](#query-maximum-borrowable-amount-by-currency) Query maximum borrowable amount by currency

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-maximum-borrowable-amount-by-currency](https://www.gate.io/docs/developers/apiv4/en/#query-maximum-borrowable-amount-by-currency)

> Code samples
