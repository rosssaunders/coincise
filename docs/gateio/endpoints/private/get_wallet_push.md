# GET /wallet/push

**Source:** [/wallet/push](https://www.gate.io/docs/developers/apiv4/en/#listpushorders-parameters)

## Authentication

Required (Private Endpoint)

## [#](#get-uid-transfer-history) Get UID transfer history

`GET /wallet/push`

_Get UID transfer history_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listpushorders-parameters](https://www.gate.io/docs/developers/apiv4/en/#listpushorders-parameters)

| Name             | In    | Type           | Required | Description                                                                                                              |
| ---------------- | ----- | -------------- | -------- | ------------------------------------------------------------------------------------------------------------------------ |
| id               | query | integer(int32) | false    | Order ID                                                                                                                 |
| from             | query | integer(int32) | false    | Start time for querying records. If not specified, defaults to 7 days before the current time. Unix timestamp in seconds |
| to               | query | integer(int32) | false    | End time for querying records. If not specified, defaults to the current time. Unix timestamp in seconds                 |
| limit            | query | integer(int32) | false    | Maximum number of items returned in the list, default value is 100                                                       |
| offset           | query | integer(int32) | false    | List offset, starting from 0                                                                                             |
| transaction_type | query | string         | false    | Order type returned in the list: `withdraw`, `deposit`. Default is `withdraw`.                                           |

> Example responses

> 200 Response

```
[
  {
    "id": 111,
    "push_uid": 1132,
    "receive_uid": 12324,
    "currency": "BTC",
    "amount": "1.2",
    "status": "PENDING",
    "create_time": 1706670777,
    "message": "The other party has not completed KYC,There is a security risk in your account, please contact customer service",
    "transaction_type": "withdraw"
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listpushorders-responses](https://www.gate.io/docs/developers/apiv4/en/#listpushorders-responses)

| Status | Meaning                                                                    | Description | Schema     |
| ------ | -------------------------------------------------------------------------- | ----------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success     | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listpushorders-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listpushorders-responseschema)

Status Code **200**

| Name          | Type           | Description        |
| ------------- | -------------- | ------------------ |
| » id          | integer(int64) | Order ID           |
| » push_uid    | integer(int64) | Initiator User ID  |
| » receive_uid | integer(int64) | Recipient User ID  |
| » currency    | string         | Currency name      |
| » amount      | string         | Transfer amount    |
| » create_time | integer(int64) | Creation time      |
| » status      | string         | Withdrawal status: |

\- CREATING: Creating  
\- PENDING: Waiting for recipient (Please contact the recipient to accept the
transfer on Gate official website)  
\- CANCELLING: Cancelling  
\- CANCELLED: Cancelled  
\- REFUSING: Refusing  
\- REFUSED: Refused  
\- RECEIVING: Receiving  
\- RECEIVED: Success | | » message | string | PENDING reason tips | | »
transaction_type | string | Order Type |

WARNING

To perform this operation, you must be authenticated by API key and secret
