# GET /v4/public/trade/recent

**Source:** [https://doc.xt.com/docs/spot/Market/QueryRecentTransactions](https://doc.xt.com/docs/spot/Market/QueryRecentTransactions)

## Description

This endpoint retrieves operations on /v4/public/trade/recent.

## Authentication

Not Required (Public Endpoint)

## Rate Limit

10/s/ip

## HTTP Request

`GET /v4/public/trade/recent`

## Request Parameters

| name | type | Required | default | description | ranges |
| --- | --- | --- | --- | --- | --- |
| symbol | string | Yes |  | trading pair |  |
| limit | number | No | 200 |  | 1~1000 |

## Request Example

```bash
  curl --location --request GET 'https://sapi.xt.com/v4/public/trade/recent?symbol=XT_USDT&limit=200' \    --header 'accept: */*' \    --header 'Content-Type: application/json' \
```

## Response Example

```json
{  "rc": 0,  "mc": "string",  "ma": [{}],  "result": [    {      "i": 0,
```