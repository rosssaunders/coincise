# GET /options/my_settlements

**Source:**
[/options/my_settlements](https://www.gate.io/docs/developers/apiv4/en/#listmyoptionssettlements-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-personal-settlement-records) Query personal settlement records

`GET /options/my_settlements`

_Query personal settlement records_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listmyoptionssettlements-parameters](https://www.gate.io/docs/developers/apiv4/en/#listmyoptionssettlements-parameters)

| Name       | In    | Type           | Required | Description                                          |
| ---------- | ----- | -------------- | -------- | ---------------------------------------------------- |
| underlying | query | string         | true     | Underlying (Obtained by listing underlying endpoint) |
| contract   | query | string         | false    | Options contract name                                |
| limit      | query | integer        | false    | Maximum number of records returned in a single list  |
| offset     | query | integer        | false    | List offset, starting from 0                         |
| from       | query | integer(int64) | false    | Start timestamp                                      |
| to         | query | integer(int64) | false    | Termination Timestamp                                |

#### [#](#detailed-descriptions-44) Detailed descriptions

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
    "size": -1,
    "settle_profit": "0",
    "contract": "BTC_USDT-20220624-26000-C",
    "strike_price": "26000",
    "time": 1656057600,
    "settle_price": "20917.461281337048",
    "underlying": "BTC_USDT",
    "realised_pnl": "-0.00116042",
    "fee": "0"
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listmyoptionssettlements-responses](https://www.gate.io/docs/developers/apiv4/en/#listmyoptionssettlements-responses)

| Status | Meaning                                                                    | Description                 | Schema     |
| ------ | -------------------------------------------------------------------------- | --------------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved successfully | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listmyoptionssettlements-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listmyoptionssettlements-responseschema)

Status Code **200**

| Name            | Type           | Description                                                                                                           |
| --------------- | -------------- | --------------------------------------------------------------------------------------------------------------------- |
| » time          | number(double) | Settlement time                                                                                                       |
| » underlying    | string         | Underlying                                                                                                            |
| » contract      | string         | Options contract name                                                                                                 |
| » strike_price  | string         | Strike price (quote currency)                                                                                         |
| » settle_price  | string         | Settlement price (quote currency)                                                                                     |
| » size          | integer(int64) | Settlement size                                                                                                       |
| » settle_profit | string         | Settlement profit (quote currency)                                                                                    |
| » fee           | string         | Settlement fee (quote currency)                                                                                       |
| » realised_pnl  | string         | Accumulated profit and loss from opening positions, including premium, fees, settlement profit, etc. (quote currency) |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-options-contract-order-book) Query options contract order book

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-options-contract-order-book](https://www.gate.io/docs/developers/apiv4/en/#query-options-contract-order-book)

> Code samples
