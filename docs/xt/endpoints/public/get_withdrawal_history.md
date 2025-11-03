# GET Withdrawal history

Source: [https://doc.xt.com/docs/spot/Deposit&Withdrawal/WithdrawHistory](https://doc.xt.com/docs/spot/Deposit&Withdrawal/WithdrawHistory)

# Withdrawal history

**Type:** GET **Description:** `/v4/withdraw/history`

### Parameters[​](#parameters "Direct link to Parameters")

| name | type | mandatory | default | description | ranges |
| --- | --- | --- | --- | --- | --- |
| currency | string | true | N/A | Currency name, from **Get supported currencies for deposit/withdrawal** API |  |
| chain | string | true | N/A | Transfer network, from **Get supported currencies for deposit/withdrawal** API |  |
| status | string | false | N/A | Withdrawal status (see [depositWithdrawStatus](#depositWithdrawStatus)) | SUBMIT, REVIEW, AUDITED, AUDITED\_AGAIN, PENDING, SUCCESS, FAIL, CANCEL |
| fromId | long | false | N/A | The last pagination ID, i.e. the primary key ID of the record |  |
| direction | string | false | NEXT | Pagination direction | NEXT = next page, PREV = previous page |
| limit | int | false | 10 | Number of records per page (max 200) | 1 ≤ limit ≤ 200 |
| startTime | long | false | N/A | Query range start boundary (timestamp in ms) |  |
| endTime | long | false | N/A | Query range end boundary (timestamp in ms) |  |

#### depositWithdrawStatus[​](#depositwithdrawstatus "Direct link to depositWithdrawStatus")

| Status | Description |
| --- | --- |
| SUBMIT | 已提交 |
| REVIEW | 审核中 |
| AUDITED | 已审核 |
| AUDITED\_AGAIN | 重新审核 |
| PENDING | 处理中 |
| SUCCESS | 成功 |
| FAIL | 失败 |
| CANCEL | 已取消 |

### Notes[​](#notes "Direct link to Notes")

-   Supports pagination using `fromId` + `direction`.
-   Limit per page is configurable with `limit` (default 10, max 200).
-   Time range filtering is supported with `startTime` and `endTime`.
-   Status values align with **Deposit/Withdrawal record status** definitions.

### Response Example[​](#response-example "Direct link to Response Example")

Response

```
{  "rc": 0,  "mc": "string",  "ma": [{}],  "result": {    "hasPrev": true, // Is there a previous page    "hasNext": true, // Is there a next page    "items": [      {        "id": 763111, // Withdrawal record ID        "clientOrderId": 10, // Client ID        "type": 0, // Type: CHAIN_TRANSFER - Blockchain withdrawal, INTERNAL_TRANSFER - Internal withdrawal        "currency": "usdt", // Currency        "chain": "Ethereum", // Withdrawal network        "address": "0xfa3abf", // Withdrawal target address        "memo": "",        "status": "REVIEW", // Withdrawal status        "amount": "30", // Withdrawal amount        "fee": "0", // Withdrawal fee        "confirmations": 0, // Number of block confirmations        "transactionId": "", // Transaction hash        "createdTime": 1667763470000 // Withdrawal application time (ms)      },      {        "id": 763107,        "clientOrderId": 10,        "type": 0,        "currency": "usdt",        "chain": "Tron",        "address": "TYnJJw",        "memo": "",        "status": "REVIEW",        "amount": "50",        "fee": "1",        "confirmations": 0,        "transactionId": "",        "createdTime": 1667428286000      }    ]  }}
```

[Edit this page](https://github.com/facebook/docusaurus/edit/main/website/docs/spot/Deposit&Withdrawal/withdrawHistory.mdx)