# GET /api/v1/market/orderbook/level2\_{size}

**Source:**
[/api/v1/market/orderbook/level2\_{size}](https://www.kucoin.com/docs/rest//api/v1/market/orderbook/level2_{size})

## Authentication

Not Required (Public Endpoint)

## Description

Get Part OrderBook

Query for part orderbook depth data. (aggregated by price) You are recommended
to request via this endpoint as the system reponse would be faster and cosume
less traffic.

## Parameters

| Parameter | Required | Type    | Description                                  |
| --------- | -------- | ------- | -------------------------------------------- |
| symbol    | required | string  | symbol                                       |
| size      | required | integer | Get the depth layer, optional value: 20, 100 |

## Responses

### 200

| Parameter     | Required | Type    | Description            |
| ------------- | -------- | ------- | ---------------------- |
| code          | required | string  |                        |
| data          | required | object  |                        |
| data.time     | required | integer | Timestamp(millisecond) |
| data.sequence | required | string  | Sequence number        |
| data.bids     | required | array   | bids, from high to low |
| data.asks     | required | array   | asks, from low to high |
