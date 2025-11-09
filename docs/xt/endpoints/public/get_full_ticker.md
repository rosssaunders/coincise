# GET /v4/public/ticker

**Source:** [https://doc.xt.com/docs/spot/Market/FullTicker](https://doc.xt.com/docs/spot/Market/FullTicker)

## Description

This endpoint retrieves operations on the resource.

## Authentication

Not Required (Public Endpoint)

## Rate Limit

1.  Single symbol: 10 requests/second/ip
2.  Multiple symbols: 10 requests/second/ip

## HTTP Request

`GET /v4/public/ticker`

## Request Parameters

| Name | Type | Required | Default | Description | Ranges |
| --- | --- | --- | --- | --- | --- |
| symbol | string | No | N/A | Trading pair, e.g. `btc_usdt` | \- |
| symbols | array | No | N/A | Collection of trading pairs. Priority is higher than symbol, e.g. `btc_usdt,eth_usdt` | \- |
| tags | string | No | N/A | Set of tags, separated by commas. Currently only supports `spot` | \- |

## Request Example

```bash
  curl --location --request GET 'https://sapi.xt.com/v4/public/ticker?symbol=XT_USDT' \    --header 'accept: */*' \    --header 'Content-Type: application/json' \
```

## Response Example

```json
{  "rc": 0,  "mc": "SUCCESS",  "ma": [],  "result": [{      "s": "btc_usdt",
```