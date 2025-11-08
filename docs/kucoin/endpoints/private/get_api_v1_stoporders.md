# GET /api/v1/stopOrders

**Source:** [/api/v1/stopOrders](https://www.kucoin.com/docs/rest//api/v1/stopOrders)

## Authentication

Required (Private Endpoint)

## Description

Get Stop Order List

Get the un-triggered stop orders list. Stop orders that have been triggered can be queried through the general order interface

## Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| symbol | optional | string | Symbol of the contract, Please refer to [Get Symbol endpoint: symbol](https://www.kucoin.com/docs-new/api-3470220)  |
| side | optional | string | buy or sell |
| type | optional | string | limit, market |
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

