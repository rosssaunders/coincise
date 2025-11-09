# GET /v4/deposit/address

**Source:** [https://doc.xt.com/docs/spot/Deposit&Withdrawal/GetDepositAddress](https://doc.xt.com/docs/spot/Deposit&Withdrawal/GetDepositAddress)

## Description

This endpoint retrieves operations on /v4/deposit/address.

## Authentication

Required (Private Endpoint)

## HTTP Request

`GET /v4/deposit/address`

## Request Parameters

| name | type | Required | default | description | ranges |
| --- | --- | --- | --- | --- | --- |
| chain | string | Yes | N/A | Network for deposit |  |
| currency | string | Yes | N/A | Currency name |  |

## Request Example

```bash
  curl --location --request GET 'https://sapi.xt.com/v4/deposit/address?chain=XT%20Smart%20Chain&currency=XT' \    --header 'accept: */*' \    --header 'Content-Type: application/json' \    --header 'validate-algorithms: HmacSHA256' \    --header 'validate-recvwindow: 60000' \    --header 'validate-appkey: xxxxxxxxxx' \    --header 'validate-timestamp: xxxxxxxxxx' \    --header 'validate-signature: xxxxxxxxxx' \
```

## Response Example

```json
{  "rc": 0,  "mc": "string",  "ma": [{}],  "result": {    "address": "0xfa3abfa50eb2006f5be7831658b17aca240d8526",
```