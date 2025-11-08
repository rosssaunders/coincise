# GET /api/v3/purchase/orders

**Source:** [/api/v3/purchase/orders](https://www.kucoin.com/docs/rest//api/v3/purchase/orders)

## Authentication

Required (Private Endpoint)

## Description

Get Purchase Orders

This API endpoint provides a pagination query for the purchase orders.

## Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| status | required | string | DONE-completed; PENDING-settling |
| currency | optional | string | Currency |
| purchaseOrderNo | optional | string | Purchase order ID |
| currentPage | optional | integer | Current page; default is 1 |
| pageSize | optional | integer | Page size; 1<=pageSize<=50; default is 50 |

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | object |  |

