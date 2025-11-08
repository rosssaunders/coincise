# GET /api/v1/allTickers

**Source:** [/api/v1/allTickers](https://www.kucoin.com/docs/rest//api/v1/allTickers)

## Authentication

Not Required (Public Endpoint)

## Description

Get All Tickers

This endpoint returns "last traded price/size", "best bid/ask price/size" etc. of a single symbol. These messages can also be obtained through Websocket.

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string | 200000 is for success, other is error |
| data | required | array |  |

