# DELETE /withdrawals/{withdrawal_id}

**Source:** [/withdrawals/{withdrawal_id}](https://www.gate.io/docs/developers/apiv4/en/#cancelwithdrawal-parameters)

## Authentication

Required (Private Endpoint)

## [#](#cancel-withdrawal-with-specified-id) Cancel withdrawal with specified ID

`DELETE /withdrawals/{withdrawal_id}`

_Cancel withdrawal with specified ID_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#cancelwithdrawal-parameters](https://www.gate.io/docs/developers/apiv4/en/#cancelwithdrawal-parameters)

| Name          | In   | Type   | Required | Description |
| ------------- | ---- | ------ | -------- | ----------- |
| withdrawal_id | path | string | true     | none        |

> Example responses

> 202 Response

```
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
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#cancelwithdrawal-responses](https://www.gate.io/docs/developers/apiv4/en/#cancelwithdrawal-responses)

| Status | Meaning                                                                          | Description                                                                | Schema |
| ------ | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ------ |
| 202    | [Accepted (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.3) | Cancellation request accepted. Check record status for cancellation result | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#cancelwithdrawal-responseschema](https://www.gate.io/docs/developers/apiv4/en/#cancelwithdrawal-responseschema)

Status Code **202**

| Name                | Type   | Description                                                                                                                                                                               |
| ------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| » id                | string | Record ID                                                                                                                                                                                 |
| » txid              | string | Hash record of the withdrawal                                                                                                                                                             |
| » withdraw_order_id | string | User-defined order number for withdrawal. Default is empty. When not empty, the specified user-defined order number record will be queried                                                |
| » timestamp         | string | Operation time                                                                                                                                                                            |
| » amount            | string | Token amount                                                                                                                                                                              |
| » currency          | string | Currency name                                                                                                                                                                             |
| » address           | string | Withdrawal address. Required for withdrawals                                                                                                                                              |
| » memo              | string | Additional remarks with regards to the withdrawal                                                                                                                                         |
| » withdraw_id       | string | Withdrawal record ID starts with 'w', such as: w1879219868. When withdraw_id is not empty, only this specific withdrawal record will be queried, and time-based querying will be disabled |
| » asset_class       | string | Withdrawal record currency type, empty by default. Supports users to query withdrawal records in main area and innovation area on demand.                                                 |

Valid values: SPOT, PILOT

SPOT: Main area  
PILOT: Innovation area | | » status | string | Transaction status

\- DONE: Completed  
\- CANCEL: Cancelled  
\- REQUEST: Requesting  
\- MANUAL: Pending manual review  
\- BCODE: GateCode operation  
\- EXTPEND: Sent, waiting for confirmation  
\- FAIL: Failed on chain, waiting for confirmation  
\- INVALID: Invalid order  
\- VERIFY: Verifying  
\- PROCES: Processing  
\- PEND: Processing  
\- DMOVE: Pending manual review  
\- REVIEW: Under review | | » chain | string | Name of the chain used in
withdrawals |

WARNING

To perform this operation, you must be authenticated by API key and secret
