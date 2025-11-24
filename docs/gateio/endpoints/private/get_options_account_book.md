# GET /options/account_book

**Source:** [/options/account_book](https://www.gate.io/docs/developers/apiv4/en/#listoptionsaccountbook-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-account-change-history) Query account change history

`GET /options/account_book`

_Query account change history_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listoptionsaccountbook-parameters](https://www.gate.io/docs/developers/apiv4/en/#listoptionsaccountbook-parameters)

| Name   | In    | Type           | Required | Description                                         |
| ------ | ----- | -------------- | -------- | --------------------------------------------------- |
| limit  | query | integer        | false    | Maximum number of records returned in a single list |
| offset | query | integer        | false    | List offset, starting from 0                        |
| from   | query | integer(int64) | false    | Start timestamp                                     |
| to     | query | integer(int64) | false    | Termination Timestamp                               |
| type   | query | string         | false    | Change types:                                       |

#### [#](#detailed-descriptions-48) Detailed descriptions

**from**: Start timestamp

Specify start time, time format is Unix timestamp. If not specified, it defaults
to (the data start time of the time range actually returned by to and limit)

**to**: Termination Timestamp

Specify the end time. If not specified, it defaults to the current time, and the
time format is a Unix timestamp

**type**: Change types:

- dnw: Deposit & Withdrawal
- prem: Trading premium
- fee: Trading fee
- refr: Referrer rebate
- set: Settlement P&L

#### [#](#enumerated-values-122) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| type      | dnw   |
| type      | prem  |
| type      | fee   |
| type      | refr  |
| type      | set   |

> Example responses

> 200 Response

```json
[
  {
    "time": 1636426005,
    "change": "-0.16",
    "balance": "7378.189",
    "text": "BTC_USDT-20211216-5000-P:25",
    "type": "fee"
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listoptionsaccountbook-responses](https://www.gate.io/docs/developers/apiv4/en/#listoptionsaccountbook-responses)

| Status | Meaning                                                                    | Description                 | Schema     |
| ------ | -------------------------------------------------------------------------- | --------------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved successfully | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listoptionsaccountbook-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listoptionsaccountbook-responseschema)

Status Code **200**

| Name      | Type           | Description                               |
| --------- | -------------- | ----------------------------------------- |
| » time    | number(double) | Change time                               |
| » change  | string         | Amount changed (USDT)                     |
| » balance | string         | Account total balance after change (USDT) |
| » type    | string         | Changing Type:                            |

\- dnw: Deposit & Withdraw  
\- prem: Trading premium  
\- fee: Trading fee  
\- refr: Referrer rebate  
\- point_dnw: point_fee: POINT Trading fee  
\- point_refr: POINT Referrer rebate | | » text | string | Note |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-user-s-positions-of-specified-underlying) List user's positions of specified underlying

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#list-user-s-positions-of-specified-underlying](https://www.gate.io/docs/developers/apiv4/en/#list-user-s-positions-of-specified-underlying)

> Code samples
