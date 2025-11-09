# GET /v4/public/depth

**Source:**
[https://doc.xt.com/docs/spot/Market/GetDepthData](https://doc.xt.com/docs/spot/Market/GetDepthData)

## Description

This endpoint retrieves operations on /v4/public/depth.

## Authentication

Not Required (Public Endpoint)

## Rate Limit

10/s/ip

## HTTP Request

`GET /v4/public/depth`

## Request Parameters

| name   | type   | Required | default | description                      | ranges |
| ------ | ------ | -------- | ------- | -------------------------------- | ------ |
| symbol | string | Yes      |         | trading pair eg:btc_usdt         |        |
| limit  | number | No       | 100     | minimum number of queries is 100 | 1~500  |

## Request Example

```bash
  curl --location --request GET 'https://sapi.xt.com/v4/public/depth?symbol=XT_USDT&limit=100' \    --header 'accept: */*' \    --header 'Content-Type: application/json' \
```

## Response Example

```json
{
  "rc": 0,
  "mc": "SUCCESS",
  "ma": [],
  "result": {
    "timestamp": 1662445330524,
    "lastUpdateId": 137333589606963580,
    "bids": [
      ["200.0000", "0.996000"],
      ["100.0000", "0.001000"],
      ["20.0000", "10.000000"]
    ],
    "asks": []
  }
}
```
