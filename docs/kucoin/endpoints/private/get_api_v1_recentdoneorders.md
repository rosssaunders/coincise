# GET /api/v1/recentDoneOrders

**Source:** [/api/v1/recentDoneOrders](https://www.kucoin.com/docs/rest//api/v1/recentDoneOrders)

## Authentication

Required (Private Endpoint)

## Description

Get Recent Closed Orders

Get a list of recent 1000 closed orders in the last 24 hours.  If you need to get your recent traded order history with low latency, you may query this endpoint.

## Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| symbol | optional | string | Symbol of the contract, Please refer to [Get Symbol endpoint: symbol](https://www.kucoin.com/docs-new/api-3470220)  |

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | array |  |

