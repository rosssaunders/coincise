# GET /earn/uni/lend_records

**Source:** [/earn/uni/lend_records](https://www.gate.io/docs/developers/apiv4/en/#listunilendrecords-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-lending-transaction-records) Query lending transaction records

`GET /earn/uni/lend_records`

_Query lending transaction records_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listunilendrecords-parameters](https://www.gate.io/docs/developers/apiv4/en/#listunilendrecords-parameters)

| Name     | In    | Type           | Required | Description                                                              |
| -------- | ----- | -------------- | -------- | ------------------------------------------------------------------------ |
| currency | query | string         | false    | Query by specified currency name                                         |
| page     | query | integer(int32) | false    | Page number                                                              |
| limit    | query | integer(int32) | false    | Maximum number of items returned. Default: 100, minimum: 1, maximum: 100 |
| from     | query | integer(int64) | false    | Start timestamp                                                          |
| to       | query | integer(int64) | false    | Termination Timestamp                                                    |
| type     | query | string         | false    | Operation type: lend - Lend, redeem - Redeem                             |

#### [#](#detailed-descriptions-53) Detailed descriptions

**from**: Start timestamp

Specify start time, time format is Unix timestamp. If not specified, it defaults
to (the data start time of the time range actually returned by to and limit)

**to**: Termination Timestamp

Specify the end time. If not specified, it defaults to the current time, and the
time format is a Unix timestamp

#### [#](#enumerated-values-134) Enumerated Values

| Parameter | Value  |
| --------- | ------ |
| type      | lend   |
| type      | redeem |

> Example responses

> 200 Response

```
[
  {
    "type": "lend",
    "currency": "BTC",
    "amount": "1",
    "last_wallet_amount": "0.2",
    "last_lent_amount": "0",
    "last_frozen_amount": "0",
    "create_time": 1673247054000
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listunilendrecords-responses](https://www.gate.io/docs/developers/apiv4/en/#listunilendrecords-responses)

| Status | Meaning                                                                    | Description      | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listunilendrecords-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listunilendrecords-responseschema)

Status Code **200**

| Name                  | Type           | Description                               |
| --------------------- | -------------- | ----------------------------------------- |
| » _None_              | object         | Lending Record                            |
| »» currency           | string         | Currency name                             |
| »» amount             | string         | Current Amount                            |
| »» last_wallet_amount | string         | Previous Available Amount                 |
| »» last_lent_amount   | string         | Previous Lent Amount                      |
| »» last_frozen_amount | string         | Previous Frozen Amount                    |
| »» type               | string         | Record Type: lend - Lend, redeem - Redeem |
| »» create_time        | integer(int64) | Created time                              |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-user-s-total-interest-income-for-specified-currency) Query user's total interest income for specified currency

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-user-s-total-interest-income-for-specified-currency](https://www.gate.io/docs/developers/apiv4/en/#query-user-s-total-interest-income-for-specified-currency)

> Code samples
