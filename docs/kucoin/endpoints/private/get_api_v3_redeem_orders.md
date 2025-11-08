# GET /api/v3/redeem/orders

**Source:** [/api/v3/redeem/orders](https://www.kucoin.com/docs/rest//api/v3/redeem/orders)

## Authentication

Required (Private Endpoint)

## Description

Get Redeem Orders

This API endpoint provides pagination query for the redeem orders.

## Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| status | required | string | DONE-completed; PENDING-settling |
| currency | optional | string | currency |
| redeemOrderNo | optional | string | Redeem order ID |
| currentPage | optional | integer | Current page; default is 1 |
| pageSize | optional | integer | Page size; 1<=pageSize<=50; default is 50 |

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | object |  |

