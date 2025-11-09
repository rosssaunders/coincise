# GET /api/v3/market/orderbook/level2

**Source:** [/api/v3/market/orderbook/level2](https://www.kucoin.com/docs/rest//api/v3/market/orderbook/level2)

## Authentication

Required (Private Endpoint)

## Description

Get Full OrderBook

Query for Full orderbook depth data. (aggregated by price)  It is generally used by professional traders because it uses more server resources and traffic, and we have strict access rate limit control.  To maintain up-to-date Order Book, please use Websocket incremental feed after retrieving the OrderBook.

## Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| symbol | required | string | symbol |

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | object |  |
| data.time | required | integer | Timestamp(millisecond) |
| data.sequence | required | string | Sequence number |
| data.bids | required | array | bids, from high to low |
| data.asks | required | array | asks, from low to high |

