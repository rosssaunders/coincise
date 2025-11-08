# GET /api/v1/market/histories

**Source:** [/api/v1/market/histories](https://www.kucoin.com/docs/rest//api/v1/market/histories)

## Authentication

Not Required (Public Endpoint)

## Description

Get Trade History

Request via this endpoint to get the trade history of the specified symbol, the returned quantity is the last 100 transaction records.

## Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| symbol | required | string | symbol |

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | array |  |

