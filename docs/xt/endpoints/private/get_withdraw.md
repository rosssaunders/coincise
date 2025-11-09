# GET /v4/withdraw

**Source:** [https://doc.xt.com/docs/spot/Deposit&Withdrawal/Withdraw](https://doc.xt.com/docs/spot/Deposit&Withdrawal/Withdraw)

## Description

This endpoint retrieves operations on the resource.

## Authentication

Required (Private Endpoint)

## Rate Limit

-   1/s/apikey

## HTTP Request

`POST /v4/withdraw`

## Request Parameters

| Name | Type | Required | Default | Description | Ranges |
| --- | --- | --- | --- | --- | --- |
| currency | string | Yes | — | Currency name, obtained from `Get supported currencies for deposit/withdraw` |  |
| chain | string | No | — | Transfer network, obtained from `Get supported currencies for deposit/withdraw` |  |
| clientOrderId | string | No | — | Custom Client ID, RegEx: `^[a-zA-Z0-9_]{4,32}$` |  |
| amount | number | Yes | — | Withdrawal amount, including fees |  |
| address | string | No | — | Withdrawal address |  |
| memo | string | No | — | Memo, required for EOS-like chains |  |
| toAccountId | number | No | — | Receiving user ID |  |

## Request Example

```bash
  curl --location --request POST 'https://sapi.xt.com/v4/withdraw' \    --header 'accept: */*' \    --header 'Content-Type: application/json' \    --header 'validate-algorithms: HmacSHA256' \    --header 'validate-recvwindow: 60000' \    --header 'validate-appkey: xxxxxxxxxx' \    --header 'validate-timestamp: xxxxxxxxxx' \    --header 'validate-signature: xxxxxxxxxx' \    --data '{        "currency": "XT",        "chain": "XT Smart Chain",        "amount": 10,        "address": "xxxxxxxxxx"    }'
```

## Response Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| currency | string | - |
| chain | string | - |
| amount | number | - |
| address | string | - |
| memo | string | - |


## Response Example

```json
{  "currency": "zb",  "chain": "Ethereum",  "amount": 1000,  "address": "0xfa3abfa50eb2006f5be7831658b17aca240d8526",  "memo": ""}
```