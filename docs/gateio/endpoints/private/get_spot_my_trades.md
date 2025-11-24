# GET /spot/my_trades

**Source:**
[/spot/my_trades](https://www.gate.io/docs/developers/apiv4/en/#listmytrades-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-personal-trading-records) Query personal trading records

`GET /spot/my_trades`

_Query personal trading records_

By default query of transaction records for spot, unified account and
warehouse-by-site leverage accounts.

The history within a specified time range can be queried by specifying `from` or
(and) `to`.

- If no time parameters are specified, only data for the last 7 days can be
  obtained.
- If only any parameter of `from` or `to` is specified, only 7-day data from the
  start (or end) of the specified time is returned.
- The range not allowed to exceed 30 days.

The parameters of the time range filter are processed according to the order end
time.

The maximum number of pages when searching data using limit&page paging function
is 100,0, that is, limit \* (page - 1) <= 100,0.

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listmytrades-parameters](https://www.gate.io/docs/developers/apiv4/en/#listmytrades-parameters)

| Name          | In    | Type           | Required | Description                                                                                      |
| ------------- | ----- | -------------- | -------- | ------------------------------------------------------------------------------------------------ |
| currency_pair | query | string         | false    | Retrieve results with specified currency pair                                                    |
| limit         | query | integer        | false    | Maximum number of items returned in list. Default: 100, minimum: 1, maximum: 1000                |
| page          | query | integer(int32) | false    | Page number                                                                                      |
| order_id      | query | string         | false    | Filter trades with specified order ID. `currency_pair` is also required if this field is present |
| account       | query | string         | false    | Specify query account                                                                            |
| from          | query | integer(int64) | false    | Start timestamp for the query                                                                    |
| to            | query | integer(int64) | false    | End timestamp for the query, defaults to current time if not specified                           |

> Example responses

> 200 Response

```json
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
[https://www.gate.io/docs/developers/apiv4/en/#listmytrades-responses](https://www.gate.io/docs/developers/apiv4/en/#listmytrades-responses)

| Status | Meaning                                                                    | Description                 | Schema     |
| ------ | -------------------------------------------------------------------------- | --------------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved successfully | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listmytrades-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listmytrades-responseschema)

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

#### [#](#enumerated-values-25) Enumerated Values

| Property | Value |
| -------- | ----- |
| side     | buy   |
| side     | sell  |
| role     | taker |
| role     | maker |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-server-current-time) Get server current time

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#get-server-current-time](https://www.gate.io/docs/developers/apiv4/en/#get-server-current-time)

> Code samples
