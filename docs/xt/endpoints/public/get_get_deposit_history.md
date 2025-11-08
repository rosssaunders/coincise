# GET Get deposit history

Source: [https://doc.xt.com/docs/spot/Deposit&Withdrawal/GetDepositHistory](https://doc.xt.com/docs/spot/Deposit&Withdrawal/GetDepositHistory)

# Get history records of deposit

**Type:** GET **Description:** `/v4/deposit/history`

### Parameters[​](#parameters "Direct link to Parameters")

| name | type | mandatory | default | description | ranges |
| --- | --- | --- | --- | --- | --- |
| currency | string | true | N/A | Currency name, from **Get supported currencies for deposit/withdrawal** API |  |
| chain | string | true | N/A | Transfer network, from **Get supported currencies for deposit/withdrawal** API |  |
| status | string | false | N/A | Deposit status | SUBMIT, REVIEW, AUDITED, PENDING, SUCCESS, FAIL, CANCEL |
| fromId | long | false | N/A | Start ID (e.g. `6216559590087220004`) |  |
| direction | string | false | NEXT | Query direction | PREV, NEXT |
| limit | int | false | 10 | Limit number, max 200 | 1 ≤ limit ≤ 200 |
| startTime | long | false | N/A | Start time for filtering deposit list (timestamp in ms) |  |
| endTime | long | false | N/A | End time for filtering deposit list (timestamp in ms) |  |

### Notes[​](#notes "Direct link to Notes")

This endpoint retrieves the historical deposit records of a user.

-   Supports pagination using `fromId` and `direction`.
-   Status values reference: [depositWithdrawStatus](#depositWithdrawStatus).
-   Some currencies require **memo/tag** to be filled when depositing.

### Response Example[​](#response-example "Direct link to Response Example")

Response

```
{  "rc": 0,  "mc": "string",  "ma": [{}],  "result": {    "hasPrev": true, // Is there a previous page    "hasNext": true, // Is there a next page    "items": [      {        "id": 169669597, // Unique ID of the deposit record        "currency": "xlm2", // Currency name        "chain": "XLM", // Transfer network        "memo": "441824256", // Memo/Tag        "status": "SUCCESS", // Deposit status        "amount": "0.1", // Deposit amount        "confirmations": 12, // Number of block confirmations        "transactionId": "28dd15b5c119e00886517f129e5e1f8283f0286b277bcd3cd1f95f7fd4a1f7fc", // Transaction hash        "address": "GBY6UIYEYLAAXRQXVO7X5I4BSSCS54EAHTUILXWMW6ONPM3PNEA3LWEC", // Target address        "fromAddr": "GBTISB3JK65DG6LEEYYFW33RMMDHBQ65AEUPE5VDBTCLYYFS533FTG6Q", // From address        "createdTime": 1667260957000 // Time of deposit record (ms)      }    ]  }}
```

[Edit this page](https://github.com/facebook/docusaurus/edit/main/website/docs/spot/Deposit&Withdrawal/historyDepositGet.mdx)