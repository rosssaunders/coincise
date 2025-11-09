# GET /v4/public/trade/history

**Source:**
[https://doc.xt.com/docs/spot/Market/QueryHistoricalTransactions](https://doc.xt.com/docs/spot/Market/QueryHistoricalTransactions)

## Description

This endpoint retrieves operations on /v4/public/trade/history.

## Authentication

Not Required (Public Endpoint)

## Rate Limit

10/s/ip

## HTTP Request

`GET /v4/public/trade/history`

## Request Parameters

| name      | type   | Required | default | description                        | ranges                                 |
| --------- | ------ | -------- | ------- | ---------------------------------- | -------------------------------------- |
| symbol    | string | Yes      |         | trading pair                       |                                        |
| limit     | number | No       | 200     |                                    | 1~1000                                 |
| direction | string | Yes      |         | query direction                    | PREV - previous page, NEXT - next page |
| fromId    | number | No       |         | Start ID, e.g. 6216559590087220004 |                                        |

## Request Example

```bash
  curl --location --request GET 'https://sapi.xt.com/v4/public/trade/history?symbol=XT_USDT&limit=200&direction=NEXT' \    --header 'accept: */*' \    --header 'Content-Type: application/json' \
```

## Response Example

```json
{
  "rc": 0,
  "mc": "string",
  "ma": [{}],
  "result": [
    {
      "i": 0,
      "t": 0,
      "p": "string",
      "q": "string",
      "v": "string",
      "b": true
    }
  ]
}
```
