# GET /api/v1/market/stats

**Source:** [/api/v1/market/stats](https://www.kucoin.com/docs/rest//api/v1/market/stats)

## Authentication

Not Required (Public Endpoint)

## Description

Get 24hr Stats

Request via this endpoint to get the statistics of the specified ticker in the last 24 hours.

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

