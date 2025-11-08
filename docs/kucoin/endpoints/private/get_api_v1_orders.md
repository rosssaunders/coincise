# GET /api/v1/orders

**Source:** [/api/v1/orders](https://www.kucoin.com/docs/rest//api/v1/orders)

## Authentication

Required (Private Endpoint)

## Description

Get Order List

List your current orders.

## Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| status | optional | string | active or done, done as default. Only list orders for a specific status |
| symbol | optional | string | Symbol of the contract, Please refer to [Get Symbol endpoint: symbol](https://www.kucoin.com/docs-new/api-3470220)  |
| side | optional | string | buy or sell |
| type | optional | string | Order Type |
| startAt | optional | integer | Start time (milisecond) |
| endAt | optional | integer | End time (milisecond) |
| currentPage | optional | integer | Current request page, The default currentPage is 1 |
| pageSize | optional | integer | pageSize, The default pageSize is 50, The maximum cannot exceed 1000 |

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | object |  |

