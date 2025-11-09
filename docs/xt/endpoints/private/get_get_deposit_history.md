# GET /v4/deposit/history

**Source:**
[https://doc.xt.com/docs/spot/Deposit&Withdrawal/GetDepositHistory](https://doc.xt.com/docs/spot/Deposit&Withdrawal/GetDepositHistory)

## Description

This endpoint retrieves operations on /v4/deposit/history.

## Authentication

Required (Private Endpoint)

## HTTP Request

`GET /v4/deposit/history`

## Request Parameters

| name      | type   | Required | default | description                                                                    | ranges                                                  |
| --------- | ------ | -------- | ------- | ------------------------------------------------------------------------------ | ------------------------------------------------------- |
| currency  | string | Yes      | N/A     | Currency name, from **Get supported currencies for deposit/withdrawal** API    |                                                         |
| chain     | string | Yes      | N/A     | Transfer network, from **Get supported currencies for deposit/withdrawal** API |                                                         |
| status    | string | No       | N/A     | Deposit status                                                                 | SUBMIT, REVIEW, AUDITED, PENDING, SUCCESS, FAIL, CANCEL |
| fromId    | long   | No       | N/A     | Start ID (e.g. `6216559590087220004`)                                          |                                                         |
| direction | string | No       | NEXT    | Query direction                                                                | PREV, NEXT                                              |
| limit     | int    | No       | 10      | Limit number, max 200                                                          | 1 ≤ limit ≤ 200                                         |
| startTime | long   | No       | N/A     | Start time for filtering deposit list (timestamp in ms)                        |                                                         |
| endTime   | long   | No       | N/A     | End time for filtering deposit list (timestamp in ms)                          |                                                         |

## Request Example

```bash
  curl --location --request GET 'https://sapi.xt.com/v4/deposit/history?currency=XT&chain=XT%20Smart%20Chain&limit=100' \    --header 'accept: */*' \    --header 'Content-Type: application/json' \    --header 'validate-algorithms: HmacSHA256' \    --header 'validate-recvwindow: 60000' \    --header 'validate-appkey: xxxxxxxxxx' \    --header 'validate-timestamp: xxxxxxxxxx' \    --header 'validate-signature: xxxxxxxxxx' \
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
        "id": 169669597,
        "currency": "xlm2",
        "chain": "XLM",
        "memo": "441824256",
        "status": "SUCCESS",
        "amount": "0.1",
        "confirmations": 12,
        "transactionId": "28dd15b5c119e00886517f129e5e1f8283f0286b277bcd3cd1f95f7fd4a1f7fc",
        "address": "GBY6UIYEYLAAXRQXVO7X5I4BSSCS54EAHTUILXWMW6ONPM3PNEA3LWEC",
        "fromAddr": "GBTISB3JK65DG6LEEYYFW33RMMDHBQ65AEUPE5VDBTCLYYFS533FTG6Q",
        "createdTime": 1667260957000
      }
    ]
  }
}
```
