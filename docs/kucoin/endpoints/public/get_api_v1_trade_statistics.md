# GET /api/v1/trade-statistics

**Source:** [/api/v1/trade-statistics](https://www.kucoin.com/docs/rest//api/v1/trade-statistics)

## Authentication

Not Required (Public Endpoint)

## Description

Get 24hr stats

Get the statistics of the platform futures trading volume in the last 24 hours.

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | object |  |
| data.turnoverOf24h | required | number | 24-hour platform Futures trading volume. Unit is USD |

