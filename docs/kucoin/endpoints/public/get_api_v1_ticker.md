# GET /api/v1/ticker

**Source:** [/api/v1/ticker](https://www.kucoin.com/docs/rest//api/v1/ticker)

## Authentication

Not Required (Public Endpoint)

## Description

Get Ticker

This endpoint returns "last traded price/size", "best bid/ask price/size" etc. of a single symbol. These messages can also be obtained through Websocket.

## Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| symbol | required | string | Symbol of the contract. Please refer to [Get Symbol endpoint: symbol](https://www.kucoin.com/docs-new/api-3470220) 

 |

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string | 200000 is for success, other is error |
| data | required | object |  |

