# GET /v4/public/kline

**Source:**
[https://doc.xt.com/docs/spot/Market/GetKlineData](https://doc.xt.com/docs/spot/Market/GetKlineData)

## Description

This endpoint retrieves operations on /v4/public/kline.

## Authentication

Not Required (Public Endpoint)

## Rate Limit

10/s/ip

## HTTP Request

`GET /v4/public/kline`

## Request Parameters

| name      | type                                                | Required | default | description              | ranges |
| --------- | --------------------------------------------------- | -------- | ------- | ------------------------ | ------ |
| symbol    | string                                              | Yes      |         | trading pair eg:btc_usdt |        |
| interval  | string                                              | Yes      |         | K line type,             |
| eg:1m     | `[1m;3m;5m;15m;30m;1h;2h;4h;6h;8h;12h;1d;3d;1w;1M]` |
| startTime | number                                              | No       |         | start timestamp          |        |
| endTime   | number                                              | No       |         | end timestamp            |        |
| limit     | number                                              | No       | '100'   |                          | 1~1000 |

## Request Example

```bash
  curl --location --request GET 'https://sapi.xt.com/v4/public/kline?symbol=XT_USDT&interval=3m&startTime=xxxxxxxxx&endTime=xxxxxxxxx&limit=100' \    --header 'accept: */*' \    --header 'Content-Type: application/json' \
```

## Response Example

```json
{
  "rc": 0,
  "mc": "string",
  "ma": [{}],
  "result": [
    {
      "t": 1662601014832,
      "o": "30000",
      "c": "32000",
      "h": "35000",
      "l": "25000",
      "q": "512",
      "v": "15360000"
    }
  ]
}
```
