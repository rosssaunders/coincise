# GET /api/v3/etf/info

**Source:** [/api/v3/etf/info](https://www.kucoin.com/docs/rest//api/v3/etf/info)

## Authentication

Not Required (Public Endpoint)

## Description

Get ETF Info

This interface returns leveraged token information.

## Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| currency | optional | string | ETF Currency: If empty, query all currencies
 |

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | array |  |

