# GET /v4/trade

**Source:** [https://doc.xt.com/docs/spot/Trade/QueryTrade](https://doc.xt.com/docs/spot/Trade/QueryTrade)

## Description

This endpoint retrieves operations on /v4/trade.

## Authentication

Required (Private Endpoint)

## HTTP Request

`GET /v4/trade`

## Request Parameters

| name | type | Required | default | description | ranges |
| --- | --- | --- | --- | --- | --- |
| symbol | string | No | N/A | Trading pair, if not filled, represents all |  |
| bizType | string | No | N/A | Business type: `SPOT`, `LEVER` |  |
| orderSide | string | No | N/A | Order side: `BUY`, `SELL` |  |
| orderType | string | No | N/A | Order type: `LIMIT`, `MARKET` |  |
| orderId | number | No | N/A | Order ID |  |
| fromId | number | No | N/A | Start ID |  |
| direction | string | No | N/A | Query direction: `PREV`, `NEXT` |  |
| limit | number | No | 20 | Limit number, max 100 |  |
| startTime | number | No | N/A | Start time (e.g. `1657682804112`) |  |
| endTime | number | No | N/A | End time |  |

## Response Example

```json
{  "rc": 0,  "mc": "string",  "ma": [{}],  "result": {    "hasPrev": true,    "hasNext": true,    "items": [      {        "symbol": "BTC_USDT",
```