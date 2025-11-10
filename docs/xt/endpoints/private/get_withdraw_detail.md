# GET /v4/withdraw

**Source:**
[https://doc.xt.com/docs/spot/Deposit&Withdrawal/WithdrawDetail](https://doc.xt.com/docs/spot/Deposit&Withdrawal/WithdrawDetail)

## Description

This endpoint retrieves operations on /v4/withdraw.

## Authentication

Required (Private Endpoint)

## HTTP Request

`GET /v4/withdraw`

## Request Parameters

| name          | type   | Required | default | description                                                                                   | ranges |
| ------------- | ------ | -------- | ------- | --------------------------------------------------------------------------------------------- | ------ |
| recordId      | string | No       | N/A     | Withdrawal record ID, obtained from the **Withdraw** endpoint. Recommended to use this first. |        |
| clientOrderId | string | No       | N/A     | Custom client ID                                                                              |        |

## Request Example

```bash
  curl --location --request GET 'https://sapi.xt.com/v4/withdraw?recordId=xxxxxxxxx' \    --header 'accept: */*' \    --header 'Content-Type: application/json' \    --header 'validate-algorithms: HmacSHA256' \    --header 'validate-recvwindow: 60000' \    --header 'validate-appkey: xxxxxxxxxx' \    --header 'validate-timestamp: xxxxxxxxxx' \    --header 'validate-signature: xxxxxxxxxx' \
```

## Response Example

```json
{
  "rc": 0,
  "mc": "SUCCESS",
  "ma": [],
  "result": {
    "id": 100,
    "clientOrderId": 10,
    "type": 0,
    "currency": "btc",
    "address": "xxxxx",
    "status": "REVIEW",
    "amount": 0.1,
    "fee": 0.0001,
    "chain": "Tron",
    "memo": "yyyyy",
    "confirmations": 2,
    "transactionId": "490267492",
    "createdTime": 1737093343000
  }
}
```
