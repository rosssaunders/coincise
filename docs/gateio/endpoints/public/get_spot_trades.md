# GET /spot/trades

**Source:** [/spot/trades](https://www.gate.io/docs/developers/apiv4/en/#listtrades-parameters)

## Authentication

Not Required (Public Endpoint)

## [#](#query-market-transaction-records) Query market transaction records

`GET /spot/trades`

_Query market transaction records_

Supports querying by time range using `from` and `to` parameters or pagination
based on `last_id`. By default, queries the last 30 days.

Pagination based on `last_id` is no longer recommended. If `last_id` is
specified, the time range query parameters will be ignored.

When using limit&page pagination to retrieve data, the maximum number of pages
is 100,000, that is, limit \* (page - 1) <= 100,000.

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listtrades-parameters](https://www.gate.io/docs/developers/apiv4/en/#listtrades-parameters)

| Name          | In    | Type           | Required | Description                                                                                    |
| ------------- | ----- | -------------- | -------- | ---------------------------------------------------------------------------------------------- |
| currency_pair | query | string         | true     | Trading pair                                                                                   |
| limit         | query | integer(int32) | false    | Maximum number of items returned in list. Default: 100, minimum: 1, maximum: 1000              |
| last_id       | query | string         | false    | Specify the currency name to query in batches, and support up to 100 pass parameters at a time |
| reverse       | query | boolean        | false    | Whether to retrieve data less than `last_id`. Default returns records greater than `last_id`.  |
| from          | query | integer(int64) | false    | Start timestamp for the query                                                                  |
| to            | query | integer(int64) | false    | End timestamp for the query, defaults to current time if not specified                         |
| page          | query | integer(int32) | false    | Page number                                                                                    |

#### [#](#detailed-descriptions-10) Detailed descriptions

**reverse**: Whether to retrieve data less than `last_id`. Default returns
records greater than `last_id`.

Set to `true` to trace back market trade records, `false` to get latest trades.

No effect when `last_id` is not set.

> Example responses

> 200 Response

```
[
  {
    "id": "1232893232",
    "create_time": "1548000000",
    "create_time_ms": "1548000000123.456",
    "order_id": "4128442423",
    "side": "buy",
    "role": "maker",
    "amount": "0.15",
    "price": "0.03",
    "fee": "0.0005",
    "fee_currency": "ETH",
    "point_fee": "0",
    "gt_fee": "0",
    "sequence_id": "588018",
    "text": "t-test"
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listtrades-responses](https://www.gate.io/docs/developers/apiv4/en/#listtrades-responses)

| Status | Meaning                                                                    | Description                 | Schema     |
| ------ | -------------------------------------------------------------------------- | --------------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved successfully | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listtrades-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listtrades-responseschema)

Status Code **200**

| Name                                                     | Type   | Description                                                    |
| -------------------------------------------------------- | ------ | -------------------------------------------------------------- |
| _None_                                                   | array  | none                                                           |
| » id                                                     | string | Fill ID                                                        |
| » create_time                                            | string | Fill Time                                                      |
| » create_time_ms                                         | string | Trading time, with millisecond precision                       |
| » currency_pair                                          | string | Currency pair                                                  |
| » side                                                   | string | Buy or sell order                                              |
| » role                                                   | string | Trade role, not returned in public endpoints                   |
| » amount                                                 | string | Trade amount                                                   |
| » price                                                  | string | Order price                                                    |
| » order_id                                               | string | Related order ID, not returned in public endpoints             |
| » fee                                                    | string | Fee deducted, not returned in public endpoints                 |
| » fee_currency                                           | string | Fee currency unit, not returned in public endpoints            |
| » point_fee                                              | string | Points used to deduct fee, not returned in public endpoints    |
| » gt_fee                                                 | string | GT used to deduct fee, not returned in public endpoints        |
| » amend_text                                             | string | The custom data that the user remarked when amending the order |
| » sequence_id                                            | string | Consecutive trade ID within a single market.                   |
| Used to track and identify trades in the specific market |
| » text                                                   | string | User-defined information, not returned in public endpoints     |

#### [#](#enumerated-values-13) Enumerated Values

| Property | Value |
| -------- | ----- |
| side     | buy   |
| side     | sell  |
| role     | taker |
| role     | maker |

This operation does not require authentication

## [#](#market-k-line-chart) Market K-line chart

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#market-k-line-chart](https://www.gate.io/docs/developers/apiv4/en/#market-k-line-chart)

> Code samples
