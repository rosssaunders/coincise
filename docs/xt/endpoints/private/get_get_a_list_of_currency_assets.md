# GET /v4/balances

**Source:** [https://doc.xt.com/docs/spot/Balance/GetBalances](https://doc.xt.com/docs/spot/Balance/GetBalances)

## Description

This endpoint retrieves operations on the resource.

## Authentication

Required (Private Endpoint)

## Rate Limit

-   10 requests/second/apikey

## HTTP Request

`GET /v4/balances`

## Request Parameters

| Name | Type | Required | Default | Description | Ranges |
| --- | --- | --- | --- | --- | --- |
| currencies | string | No | N/A | List of currencies, comma separated, e.g. `usdt,btc` |  |

## Request Example

```bash
  curl --location --request GET 'https://sapi.xt.com/v4/balances' \    --header 'accept: */*' \    --header 'Content-Type: application/json' \    --header 'validate-algorithms: HmacSHA256' \    --header 'validate-recvwindow: 60000' \    --header 'validate-appkey: xxxxxxxxxx' \    --header 'validate-timestamp: xxxxxxxxxx' \    --header 'validate-signature: xxxxxxxxxx' \
```

## Response Example

```json
{  "rc": 0,  "mc": "string",  "ma": [{}],  "result": {    "totalBtcAmount": 0,    "assets": [      {        "currency": "string",
```