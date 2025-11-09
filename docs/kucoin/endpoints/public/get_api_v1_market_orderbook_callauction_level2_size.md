# GET /api/v1/market/orderbook/callauction/level2_{size}

**Source:** [/api/v1/market/orderbook/callauction/level2_{size}](https://www.kucoin.com/docs/rest//api/v1/market/orderbook/callauction/level2_{size})

## Authentication

Not Required (Public Endpoint)

## Description

Get Call Auction Part OrderBook

Query for call auction part orderbook depth data. (aggregated by price). It is recommended that you request via this endpoint, as the system response will be faster and consume less traffic.

## Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| symbol | required | string | symbol |
| size | required | integer | Get the depth layer, optional value: 20, 100 |

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | object |  |
| data.time | required | integer | Timestamp (milliseconds) |
| data.sequence | required | string | Sequence number |
| data.bids | required | array | bids, from high to low |
| data.asks | required | array | asks, from low to high |

