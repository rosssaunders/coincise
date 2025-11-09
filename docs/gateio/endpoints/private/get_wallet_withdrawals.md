# GET /wallet/withdrawals

**Source:** [/wallet/withdrawals](https://www.gate.io/docs/developers/apiv4/en/#listwithdrawals-parameters)

## Authentication

Required (Private Endpoint)

## [#](#get-withdrawal-records) Get withdrawal records

`GET /wallet/withdrawals`

_Get withdrawal records_

Record query time range cannot exceed 30 days

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listwithdrawals-parameters](https://www.gate.io/docs/developers/apiv4/en/#listwithdrawals-parameters)

| Name              | In    | Type           | Required | Description                                                                                                                                                                               |
| ----------------- | ----- | -------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| currency          | query | string         | false    | Specify the currency. If not specified, returns all currencies                                                                                                                            |
| withdraw_id       | query | string         | false    | Withdrawal record ID starts with 'w', such as: w1879219868. When withdraw_id is not empty, only this specific withdrawal record will be queried, and time-based querying will be disabled |
| asset_class       | query | string         | false    | Currency type of withdrawal record, empty by default. Supports querying withdrawal records in main zone and innovation zone on demand.                                                    |
| withdraw_order_id | query | string         | false    | User-defined order number for withdrawal. Default is empty. When not empty, the specified user-defined order number record will be queried                                                |
| from              | query | integer(int64) | false    | Start time for querying records, defaults to 7 days before current time if not specified                                                                                                  |
| to                | query | integer(int64) | false    | End timestamp for the query, defaults to current time if not specified                                                                                                                    |
| limit             | query | integer        | false    | Maximum number of records returned in a single list                                                                                                                                       |
| offset            | query | integer        | false    | List offset, starting from 0                                                                                                                                                              |

#### [#](#detailed-descriptions-2) Detailed descriptions

**asset_class**: Currency type of withdrawal record, empty by default. Supports
querying withdrawal records in main zone and innovation zone on demand. Value
range: SPOT, PILOT

SPOT: Main Zone PILOT: Innovation Zone

> Example responses

> 200 Response

```
[
  [
    {
      "id": "w1879219868",
      "currency": "USDT",
      "address": "THISISTESTADDRESSFORGATEPAY",
      "amount": "4.023",
      "fee": "0",
      "txid": "Internal transaction 260594131",
      "chain": "BSC",
      "timestamp": "1745220149",
      "status": "DONE",
      "withdraw_order_id": "202504211521368538928",
      "block_number": "1000",
      "fail_reason": "",
      "type": "appbankgp",
      "timestamp2": "1745220149",
      "memo": ""
    }
  ]
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listwithdrawals-responses](https://www.gate.io/docs/developers/apiv4/en/#listwithdrawals-responses)

| Status | Meaning                                                                    | Description                 | Schema     |
| ------ | -------------------------------------------------------------------------- | --------------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved successfully | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listwithdrawals-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listwithdrawals-responseschema)

Status Code **200**

| Name                | Type   | Description                                                                                              |
| ------------------- | ------ | -------------------------------------------------------------------------------------------------------- |
| » id                | string | Record ID                                                                                                |
| » txid              | string | Hash record of the withdrawal                                                                            |
| » block_number      | string | Block Number                                                                                             |
| » withdraw_order_id | string | Client order id, up to 32 length and can only include 0-9, A-Z, a-z, underscore(\_), hyphen(-) or dot(.) |
| » timestamp         | string | Operation time                                                                                           |
| » amount            | string | Token amount                                                                                             |
| » fee               | string | Fee                                                                                                      |
| » currency          | string | Currency name                                                                                            |
| » address           | string | Withdrawal address                                                                                       |
| » fail_reason       | string | Reason for withdrawal failure. Has a value when status = CANCEL, empty for all other statuses            |
| » timestamp2        | string | Withdrawal final time, i.e.: withdrawal cancellation time or withdrawal success time                     |

When status = CANCEL, corresponds to cancellation time  
When status = DONE and block_number > 0, it is the withdrawal success time | | »
memo | string | Additional remarks with regards to the withdrawal | | » status |
string | Transaction status

\- DONE: Completed (block_number > 0 is considered to be truly completed)  
\- CANCEL: Canceled  
\- REQUEST: Requesting  
\- MANUAL: Pending manual review  
\- BCODE: Recharge code operation  
\- EXTPEND: Sent awaiting confirmation  
\- FAIL: Failure on the chain awaiting confirmation  
\- INVALID: Invalid order  
\- VERIFY: Verifying  
\- PROCES: Processing  
\- PEND: Processing  
\- DMOVE: pending manual review  
\- REVIEW: Under review | | » chain | string | Name of the chain used in
withdrawals |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-deposit-records) Get deposit records

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#get-deposit-records](https://www.gate.io/docs/developers/apiv4/en/#get-deposit-records)

> Code samples
