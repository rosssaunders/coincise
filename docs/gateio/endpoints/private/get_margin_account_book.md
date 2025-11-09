# GET /margin/account_book

**Source:**
[/margin/account_book](https://www.gate.io/docs/developers/apiv4/en/#listisolatedmarginaccountbook-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-margin-account-balance-change-history) Query margin account balance change history

`GET /margin/account_book`

_Query margin account balance change history_

Currently only provides transfer history to and from margin accounts. Query time
range cannot exceed 30 days

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listisolatedmarginaccountbook-parameters](https://www.gate.io/docs/developers/apiv4/en/#listisolatedmarginaccountbook-parameters)

| Name          | In    | Type           | Required | Description                                                                                                       |
| ------------- | ----- | -------------- | -------- | ----------------------------------------------------------------------------------------------------------------- |
| currency      | query | string         | false    | Query history for specified currency. If `currency` is specified, `currency_pair` must also be specified.         |
| currency_pair | query | string         | false    | Specify margin account currency pair. Used in combination with `currency`. Ignored if `currency` is not specified |
| type          | query | string         | false    | Query by specified account change type. If not specified, all change types will be included.                      |
| from          | query | integer(int64) | false    | Start timestamp                                                                                                   |
| to            | query | integer(int64) | false    | Termination Timestamp                                                                                             |
| page          | query | integer(int32) | false    | Page number                                                                                                       |
| limit         | query | integer        | false    | Maximum number of records returned in a single list                                                               |

#### [#](#detailed-descriptions-8) Detailed descriptions

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
    "id": "123456",
    "time": "1547633726",
    "time_ms": 1547633726123,
    "currency": "BTC",
    "currency_pair": "BTC_USDT",
    "change": "1.03",
    "balance": "4.59316525194"
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listisolatedmarginaccountbook-responses](https://www.gate.io/docs/developers/apiv4/en/#listisolatedmarginaccountbook-responses)

| Status | Meaning                                                                    | Description                 | Schema     |
| ------ | -------------------------------------------------------------------------- | --------------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved successfully | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listisolatedmarginaccountbook-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listisolatedmarginaccountbook-responseschema)

Status Code **200**

| Name            | Type           | Description                                                                               |
| --------------- | -------------- | ----------------------------------------------------------------------------------------- |
| » id            | string         | Balance change record ID                                                                  |
| » time          | string         | Account change timestamp                                                                  |
| » time_ms       | integer(int64) | The timestamp of the change (in milliseconds)                                             |
| » currency      | string         | Currency changed                                                                          |
| » currency_pair | string         | Account trading pair                                                                      |
| » change        | string         | Amount changed. Positive value means transferring in, while negative out                  |
| » balance       | string         | Balance after change                                                                      |
| » type          | string         | Account book type. Please refer to [account book type](#accountbook-type) for more detail |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#funding-account-list) Funding account list

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#funding-account-list](https://www.gate.io/docs/developers/apiv4/en/#funding-account-list)

> Code samples
