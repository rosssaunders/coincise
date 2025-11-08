# GET /api/v1/level2/snapshot

**Source:** [/api/v1/level2/snapshot](https://www.kucoin.com/docs/rest//api/v1/level2/snapshot)

## Authentication

Not Required (Public Endpoint)

## Description

Get Full OrderBook

Query for Full orderbook depth data (aggregated by price). It is generally used by professional traders because it uses more server resources and traffic, and we have strict access rate limit control.  To maintain an up-to-date Order Book, please use Websocket incremental feed after retrieving the OrderBook.

## Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| symbol | optional | string | Symbol of the contract. Please refer to [Get Symbol endpoint: symbol](https://www.kucoin.com/docs-new/api-3470220) 
 |

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string | 200000 is for success, other is error |
| data | required | object |  |

