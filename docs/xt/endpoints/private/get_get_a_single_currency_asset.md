# GET /v4/balance

**Source:**
[https://doc.xt.com/docs/spot/Balance/GetSingleCurrencyAsset](https://doc.xt.com/docs/spot/Balance/GetSingleCurrencyAsset)

## Description

This endpoint retrieves operations on the resource.

## Authentication

Required (Private Endpoint)

## HTTP Request

`GET /v4/balance`

## Request Parameters

| Name     | Type   | Required | Default | Description   | Ranges |
| -------- | ------ | -------- | ------- | ------------- | ------ |
| currency | string | Yes      | N/A     | Example: usdt | \-     |

## Request Example

```bash
  curl --location --request GET 'https://sapi.xt.com/v4/balance?currency=XT' \    --header 'accept: */*' \    --header 'Content-Type: application/json' \    --header 'validate-algorithms: HmacSHA256' \    --header 'validate-recvwindow: 60000' \    --header 'validate-appkey: xxxxxxxxxx' \    --header 'validate-timestamp: xxxxxxxxxx' \    --header 'validate-signature: xxxxxxxxxx' \
```

## Response Example

```json
{
  "rc": 0,
  "mc": "string",
  "ma": [{}],
  "result": {
    "currency": "usdt",
    "currencyId": 0,
    "frozenAmount": 0,
    "availableAmount": 0,
    "totalAmount": 0,
    "convertBtcAmount": 0
  }
}
```
