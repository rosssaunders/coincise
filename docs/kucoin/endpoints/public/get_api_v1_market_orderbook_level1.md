# GET /api/v1/market/orderbook/level1

**Source:**
[/api/v1/market/orderbook/level1](https://www.kucoin.com/docs/rest//api/v1/market/orderbook/level1)

## Authentication

Not Required (Public Endpoint)

## Description

Get Ticker

Request via this endpoint to get Level 1 Market Data. The returned value
includes the best bid price and size, the best ask price and size as well as the
last traded price and the last traded size.

## Parameters

| Parameter | Required | Type   | Description |
| --------- | -------- | ------ | ----------- |
| symbol    | required | string | symbol      |

## Responses

### 200

| Parameter        | Required | Type    | Description       |
| ---------------- | -------- | ------- | ----------------- |
| code             | required | string  |                   |
| data             | required | object  |                   |
| data.time        | required | integer | timestamp         |
| data.sequence    | required | string  | Sequence          |
| data.price       | required | string  | Last traded price |
| data.size        | required | string  | Last traded size  |
| data.bestBid     | required | string  | Best bid price    |
| data.bestBidSize | required | string  | Best bid size     |
| data.bestAsk     | required | string  | Best ask price    |
| data.bestAskSize | required | string  | Best ask size     |
