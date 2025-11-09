# GET /api/v1/mark-price/{symbol}/current

**Source:** [/api/v1/mark-price/{symbol}/current](https://www.kucoin.com/docs/rest//api/v1/mark-price/{symbol}/current)

## Authentication

Not Required (Public Endpoint)

## Description

Get Mark Price Detail

This endpoint returns the current Mark price for specified margin trading pairs.

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
| data.symbol | required | string | symbol |
| data.timePoint | required | integer | Timestamp (milliseconds) |
| data.value | required | number | Mark price |

