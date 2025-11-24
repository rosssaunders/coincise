# GET /options/settlements

**Source:** [/options/settlements](https://www.gate.io/docs/developers/apiv4/en/#listoptionssettlements-parameters)

## Authentication

Not Required (Public Endpoint)

## [#](#list-settlement-history) List settlement history

`GET /options/settlements`

_List settlement history_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listoptionssettlements-parameters](https://www.gate.io/docs/developers/apiv4/en/#listoptionssettlements-parameters)

| Name       | In    | Type           | Required | Description                                          |
| ---------- | ----- | -------------- | -------- | ---------------------------------------------------- |
| underlying | query | string         | true     | Underlying (Obtained by listing underlying endpoint) |
| limit      | query | integer        | false    | Maximum number of records returned in a single list  |
| offset     | query | integer        | false    | List offset, starting from 0                         |
| from       | query | integer(int64) | false    | Start timestamp                                      |
| to         | query | integer(int64) | false    | Termination Timestamp                                |

#### [#](#detailed-descriptions-43) Detailed descriptions

**from**: Start timestamp

Specify start time, time format is Unix timestamp. If not specified, it defaults
to (the data start time of the time range actually returned by to and limit)

**to**: Termination Timestamp

Specify the end time. If not specified, it defaults to the current time, and the
time format is a Unix timestamp

> Example responses

> 200 Response

```json
[
  {
    "time": 1598839200,
    "profit": "312.35",
    "fee": "0.3284",
    "settle_price": "11687.65",
    "contract": "BTC-WEEKLY-200824-11000-P",
    "strike_price": "12000"
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listoptionssettlements-responses](https://www.gate.io/docs/developers/apiv4/en/#listoptionssettlements-responses)

| Status | Meaning                                                                    | Description                 | Schema     |
| ------ | -------------------------------------------------------------------------- | --------------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved successfully | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listoptionssettlements-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listoptionssettlements-responseschema)

Status Code **200**

| Name           | Type           | Description                                     |
| -------------- | -------------- | ----------------------------------------------- |
| _None_         | array          | none                                            |
| » time         | number(double) | Last configuration update time                  |
| » contract     | string         | Options contract name                           |
| » profit       | string         | Settlement profit per contract (quote currency) |
| » fee          | string         | Settlement fee per contract (quote currency)    |
| » strike_price | string         | Strike price (quote currency)                   |
| » settle_price | string         | Settlement price (quote currency)               |

This operation does not require authentication

## [#](#get-specified-contract-settlement-information) Get specified contract settlement information

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#get-specified-contract-settlement-information](https://www.gate.io/docs/developers/apiv4/en/#get-specified-contract-settlement-information)

> Code samples
