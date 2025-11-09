# GET /v4/public/ticker/24h

**Source:** [https://doc.xt.com/docs/spot/Market/Get24hStatisticsTicker](https://doc.xt.com/docs/spot/Market/Get24hStatisticsTicker)

## Description

This endpoint retrieves operations on /v4/public/ticker/24h.

## Authentication

Not Required (Public Endpoint)

## Rate Limit

1.  single symbol: `10/s/ip`
2.  multiple symbols: `10/s/ip`

## HTTP Request

`GET /v4/public/ticker/24h`

## Request Parameters

| name | type | Required | default | description | ranges |
| --- | --- | --- | --- | --- | --- |
| symbol | string | No |  | trading pair eg:btc\_usdt |  |
| symbols | array | No |  | Collection of trading pairs. Priority is higher than symbol. eg: btc\_usdt,eth\_usdt |  |
| tags | string | No |  | Set of tags, separated by commas, currently only supports spot |  |

## Request Example

```bash
  curl --location --request GET 'https://sapi.xt.com/v4/public/ticker/24h?symbol=XT_USDT' \    --header 'accept: */*' \    --header 'Content-Type: application/json' \
```

## Response Example

```json
{  "rc": 0,  "mc": "SUCCESS",  "ma": [],  "result": [    {      "s": "btc_usdt",
```