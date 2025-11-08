# GET /api/v1/limit/fills

**Source:** [/api/v1/limit/fills](https://www.kucoin.com/docs/rest//api/v1/limit/fills)

## Authentication

Required (Private Endpoint)

## Description

Get Recent Trade History - Old

Request a list of 1000 fills in the last 24 hours via this endpoint. The return value is the data after Pagination, sorted in descending order according to time.

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | array |  |

