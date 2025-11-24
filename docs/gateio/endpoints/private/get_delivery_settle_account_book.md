# GET /delivery/{settle}/account_book

**Source:** [/delivery/{settle}/account_book](https://www.gate.io/docs/developers/apiv4/en/#listdeliveryaccountbook-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-futures-account-change-history-2) Query futures account change history

`GET /delivery/{settle}/account_book`

_Query futures account change history_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listdeliveryaccountbook-parameters](https://www.gate.io/docs/developers/apiv4/en/#listdeliveryaccountbook-parameters)

| Name   | In    | Type           | Required | Description                                         |
| ------ | ----- | -------------- | -------- | --------------------------------------------------- |
| settle | path  | string         | true     | Settle currency                                     |
| limit  | query | integer        | false    | Maximum number of records returned in a single list |
| from   | query | integer(int64) | false    | Start timestamp                                     |
| to     | query | integer(int64) | false    | Termination Timestamp                               |
| type   | query | string         | false    | Changing Type:                                      |

#### [#](#detailed-descriptions-40) Detailed descriptions

**from**: Start timestamp

Specify start time, time format is Unix timestamp. If not specified, it defaults
to (the data start time of the time range actually returned by to and limit)

**to**: Termination Timestamp

Specify the end time. If not specified, it defaults to the current time, and the
time format is a Unix timestamp

**type**: Changing Type:

- dnw: Deposit & Withdraw
- pnl: Profit & Loss by reducing position
- fee: Trading fee
- refr: Referrer rebate
- fund: Funding
- point_dnw: point_fee: POINT Trading fee
- point_refr: POINT Referrer rebate

#### [#](#enumerated-values-94) Enumerated Values

| Parameter | Value      |
| --------- | ---------- |
| settle    | usdt       |
| type      | dnw        |
| type      | pnl        |
| type      | fee        |
| type      | refr       |
| type      | fund       |
| type      | point_dnw  |
| type      | point_fee  |
| type      | point_refr |

> Example responses

> 200 Response

```json
[
  {
    "time": 1682294400.123456,
    "change": "0.000010152188",
    "balance": "4.59316525194",
    "text": "ETH_USD:6086261",
    "type": "fee",
    "contract": "ETH_USD",
    "trade_id": "1",
    "id": "1"
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listdeliveryaccountbook-responses](https://www.gate.io/docs/developers/apiv4/en/#listdeliveryaccountbook-responses)

| Status | Meaning                                                                    | Description                 | Schema     |
| ------ | -------------------------------------------------------------------------- | --------------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved successfully | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listdeliveryaccountbook-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listdeliveryaccountbook-responseschema)

Status Code **200**

| Name      | Type           | Description          |
| --------- | -------------- | -------------------- |
| _None_    | array          | none                 |
| » time    | number(double) | Change time          |
| » change  | string         | Change amount        |
| » balance | string         | Balance after change |
| » type    | string         | Changing Type：      |

\- dnw: Deposit & Withdraw  
\- pnl: Profit & Loss by reducing position  
\- fee: Trading fee  
\- refr: Referrer rebate  
\- fund: Funding  
\- point_dnw: point_fee: POINT Trading fee  
\- point_refr: POINT Referrer rebate  
\- bonus_offset: bouns deduction | | » text | string | Comment | | » contract |
string | Futures contract, the field is only available for data after 2023-10-30
| | » trade_id | string | trade id | | » id | string | Account change record ID
|

#### [#](#enumerated-values-95) Enumerated Values

| Property | Value        |
| -------- | ------------ |
| type     | dnw          |
| type     | pnl          |
| type     | fee          |
| type     | refr         |
| type     | fund         |
| type     | point_dnw    |
| type     | point_fee    |
| type     | point_refr   |
| type     | bonus_offset |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-user-position-list-2) Get user position list

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#get-user-position-list-2](https://www.gate.io/docs/developers/apiv4/en/#get-user-position-list-2)

> Code samples
