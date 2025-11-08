# GET /api/v1/timestamp

**Source:** [/api/v1/timestamp](https://www.kucoin.com/docs/rest//api/v1/timestamp)

## Authentication

Not Required (Public Endpoint)

## Description

Get Server Time

Get the API server time. This is the Unix timestamp.

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | integer | ServerTime (milliseconds) |

