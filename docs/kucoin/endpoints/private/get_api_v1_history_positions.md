# GET /api/v1/history-positions

**Source:** [/api/v1/history-positions](https://www.kucoin.com/docs/rest//api/v1/history-positions)

## Authentication

Required (Private Endpoint)

## Description

Get Positions History

This interface can query position history information records.

## Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| symbol | optional | string | Symbol of the contract, Please refer to [Get Symbol endpoint: symbol](https://www.kucoin.com/docs-new/api-3470220)  |
| from | optional | integer | Closing start time(ms)
 |
| to | optional | integer | Closing end time(ms)
 |
| limit | optional | integer | Number of requests per page, max 200, default 10
 |
| pageId | optional | integer | Current page number, default 1
 |

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | object |  |

