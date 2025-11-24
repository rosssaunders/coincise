# GET /spot/account_book

**Source:**
[/spot/account_book](https://www.gate.io/docs/developers/apiv4/en/#listspotaccountbook-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-spot-account-transaction-history) Query spot account transaction history

`GET /spot/account_book`

_Query spot account transaction history_

Record query time range cannot exceed 30 days.

When using limit&page pagination to retrieve data, the maximum number of pages
is 100,000, that is, limit \* (page - 1) <= 100,000.

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listspotaccountbook-parameters](https://www.gate.io/docs/developers/apiv4/en/#listspotaccountbook-parameters)

| Name     | In    | Type           | Required | Description                                                                                                                            |
| -------- | ----- | -------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| currency | query | string         | false    | Query by specified currency name                                                                                                       |
| from     | query | integer(int64) | false    | Start timestamp for the query                                                                                                          |
| to       | query | integer(int64) | false    | End timestamp for the query, defaults to current time if not specified                                                                 |
| page     | query | integer(int32) | false    | Page number                                                                                                                            |
| limit    | query | integer        | false    | Maximum number of records returned in a single list                                                                                    |
| type     | query | string         | false    | Query by specified account change type. If not specified, all change types will be included.                                           |
| code     | query | string         | false    | Specify account change code for query. If not specified, all change types are included. This parameter has higher priority than `type` |

> Example responses

> 200 Response

```json
[
  {
    "id": "123456",
    "time": 1547633726123,
    "currency": "BTC",
    "change": "1.03",
    "balance": "4.59316525194",
    "type": "margin_in",
    "text": "3815099"
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listspotaccountbook-responses](https://www.gate.io/docs/developers/apiv4/en/#listspotaccountbook-responses)

| Status | Meaning                                                                    | Description                 | Schema     |
| ------ | -------------------------------------------------------------------------- | --------------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved successfully | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listspotaccountbook-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listspotaccountbook-responseschema)

Status Code **200**

| Name       | Type           | Description                                                                               |
| ---------- | -------------- | ----------------------------------------------------------------------------------------- |
| » id       | string         | Balance change record ID                                                                  |
| » time     | integer(int64) | The timestamp of the change (in milliseconds)                                             |
| » currency | string         | Currency changed                                                                          |
| » change   | string         | Amount changed. Positive value means transferring in, while negative out                  |
| » balance  | string         | Balance after change                                                                      |
| » type     | string         | Account book type. Please refer to [account book type](#accountbook-type) for more detail |
| » code     | string         | Account change code, see \[Asset Record Code\] (Asset Record Code)                        |
| » text     | string         | Additional information                                                                    |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#batch-place-orders) Batch place orders

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#batch-place-orders](https://www.gate.io/docs/developers/apiv4/en/#batch-place-orders)

> Code samples
