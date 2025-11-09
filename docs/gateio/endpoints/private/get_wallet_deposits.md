# GET /wallet/deposits

**Source:** [/wallet/deposits](https://www.gate.io/docs/developers/apiv4/en/#listdeposits-parameters)

## Authentication

Required (Private Endpoint)

## [#](#get-deposit-records) Get deposit records

`GET /wallet/deposits`

_Get deposit records_

Record query time range cannot exceed 30 days

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listdeposits-parameters](https://www.gate.io/docs/developers/apiv4/en/#listdeposits-parameters)

| Name     | In    | Type           | Required | Description                                                                              |
| -------- | ----- | -------------- | -------- | ---------------------------------------------------------------------------------------- |
| currency | query | string         | false    | Specify the currency. If not specified, returns all currencies                           |
| from     | query | integer(int64) | false    | Start time for querying records, defaults to 7 days before current time if not specified |
| to       | query | integer(int64) | false    | End timestamp for the query, defaults to current time if not specified                   |
| limit    | query | integer        | false    | Maximum number of entries returned in the list, limited to 500 transactions              |
| offset   | query | integer        | false    | List offset, starting from 0                                                             |

> Example responses

> 200 Response

```
[
  {
    "id": "210496",
    "timestamp": "1542000000",
    "withdraw_order_id": "order_123456",
    "currency": "USDT",
    "address": "1HkxtBAMrA3tP5ENnYY2CZortjZvFDH5Cs",
    "txid": "128988928203223323290",
    "amount": "222.61",
    "memo": "",
    "status": "DONE",
    "chain": "TRX"
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listdeposits-responses](https://www.gate.io/docs/developers/apiv4/en/#listdeposits-responses)

| Status | Meaning                                                                    | Description                 | Schema     |
| ------ | -------------------------------------------------------------------------- | --------------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved successfully | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listdeposits-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listdeposits-responseschema)

Status Code **200**

| Name                | Type   | Description                                                                                              |
| ------------------- | ------ | -------------------------------------------------------------------------------------------------------- |
| » id                | string | Record ID                                                                                                |
| » txid              | string | Hash record of the withdrawal                                                                            |
| » withdraw_order_id | string | Client order id, up to 32 length and can only include 0-9, A-Z, a-z, underscore(\_), hyphen(-) or dot(.) |
| » timestamp         | string | Operation time                                                                                           |
| » amount            | string | Token amount                                                                                             |
| » currency          | string | Currency name                                                                                            |
| » address           | string | Withdrawal address. Required for withdrawals                                                             |
| » memo              | string | Additional remarks with regards to the withdrawal                                                        |
| » status            | string | Trading Status                                                                                           |

\- REVIEW: Recharge review (compliance review)  
\- PEND: Processing  
\- DONE: Waiting for funds to be unlocked  
\- INVALID: Invalid data  
\- TRACK: Track the number of confirmations, waiting to add funds to the user
(spot)  
\- BLOCKED: Rejected Recharge  
\- DEP_CREDITED: Recharge to account, withdrawal is not unlocked | | » chain |
string | Name of the chain used in withdrawals |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#transfer-between-trading-accounts) Transfer between trading accounts

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#transfer-between-trading-accounts](https://www.gate.io/docs/developers/apiv4/en/#transfer-between-trading-accounts)

> Code samples
