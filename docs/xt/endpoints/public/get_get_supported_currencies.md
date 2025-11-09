# GET /v4/public/wallet/support/currency

**Source:** [https://doc.xt.com/docs/spot/Deposit&Withdrawal/GetSupportedCurrencies](https://doc.xt.com/docs/spot/Deposit&Withdrawal/GetSupportedCurrencies)

## Description

This endpoint retrieves operations on /v4/public/wallet/support/currency.

## Authentication

Not Required (Public Endpoint)

## HTTP Request

`GET /v4/public/wallet/support/currency`

## Request Parameters

| name | type | Required | default | description | ranges |
| --- | --- | --- | --- | --- | --- |
| – | – | No | N/A | No parameters required | – |

## Request Example

```bash
  curl --location --request GET 'https://sapi.xt.com/v4/public/wallet/support/currency' \    --header 'accept: */*' \    --header 'Content-Type: application/json' \
```

## Response Example

```json
{  "rc": 0,  "mc": "string",  "ma": [{}],  "result": [    {      "currency": "BTC",
```