# GET /api/v3/margin/symbols

**Source:** [/api/v3/margin/symbols](https://www.kucoin.com/docs/rest//api/v3/margin/symbols)

## Authentication

Not Required (Public Endpoint)

## Description

Get Symbols - Cross Margin

This endpoint allows querying the configuration of cross margin symbol.

## Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| symbol | optional | string | If not provided, all cross margin symbol will be queried. If provided, only the specified symbol will be queried. |

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | object |  |

