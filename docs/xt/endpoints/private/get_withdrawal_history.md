# GET /v4/withdraw/history

**Source:**
[https://doc.xt.com/docs/spot/Deposit&Withdrawal/WithdrawHistory](https://doc.xt.com/docs/spot/Deposit&Withdrawal/WithdrawHistory)

## Description

This endpoint retrieves operations on /v4/withdraw/history.

## Authentication

Required (Private Endpoint)

## HTTP Request

`GET /v4/withdraw/history`

## Request Parameters

| name      | type   | Required | default | description                                                                                                        | ranges                                                                 |
| --------- | ------ | -------- | ------- | ------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| currency  | string | Yes      | N/A     | Currency name, from **Get supported currencies for deposit/withdrawal** API                                        |                                                                        |
| chain     | string | Yes      | N/A     | Transfer network, from **Get supported currencies for deposit/withdrawal** API                                     |                                                                        |
| status    | string | No       | N/A     | Withdrawal status (see [depositWithdrawStatus](/docs/spot/Access Description/PublicModule#depositwithdraw-status)) | SUBMIT, REVIEW, AUDITED, AUDITED_AGAIN, PENDING, SUCCESS, FAIL, CANCEL |
| fromId    | long   | No       | N/A     | The last pagination ID, i.e. the primary key ID of the record                                                      |                                                                        |
| direction | string | No       | NEXT    | Pagination direction                                                                                               | NEXT = next page, PREV = previous page                                 |
| limit     | int    | No       | 10      | Number of records per page (max 200)                                                                               | 1 ≤ limit ≤ 200                                                        |
| startTime | long   | No       | N/A     | Query range start boundary (timestamp in ms)                                                                       |                                                                        |
| endTime   | long   | No       | N/A     | Query range end boundary (timestamp in ms)                                                                         |                                                                        |

## Request Example

```bash
  curl --location --request GET 'https://sapi.xt.com/v4/withdraw/history?currency=XT&chain=XT%20Smart%20Chain&limit=100' \    --header 'accept: */*' \    --header 'Content-Type: application/json' \    --header 'validate-algorithms: HmacSHA256' \    --header 'validate-recvwindow: 60000' \    --header 'validate-appkey: xxxxxxxxxx' \    --header 'validate-timestamp: xxxxxxxxxx' \    --header 'validate-signature: xxxxxxxxxx' \
```

## Response Example

```json
{
  "rc": 0,
  "mc": "string",
  "ma": [{}],
  "result": {
    "hasPrev": true,
    "hasNext": true,
    "items": [
      {
        "id": 763111,
        "clientOrderId": 10,
        "type": 0,
        "currency": "usdt",
        "chain": "Ethereum",
        "address": "0xfa3abf",
        "memo": "",
        "status": "REVIEW",
        "amount": "30",
        "fee": "0",
        "confirmations": 0,
        "transactionId": "",
        "createdTime": 1667763470000
      },
      {
        "id": 763107,
        "clientOrderId": 10,
        "type": 0,
        "currency": "usdt",
        "chain": "Tron",
        "address": "TYnJJw",
        "memo": "",
        "status": "REVIEW",
        "amount": "50",
        "fee": "1",
        "confirmations": 0,
        "transactionId": "",
        "createdTime": 1667428286000
      }
    ]
  }
}
```
