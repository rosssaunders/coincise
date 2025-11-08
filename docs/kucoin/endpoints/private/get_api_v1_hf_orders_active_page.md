# GET /api/v1/hf/orders/active/page

**Source:** [/api/v1/hf/orders/active/page](https://www.kucoin.com/docs/rest//api/v1/hf/orders/active/page)

## Authentication

Required (Private Endpoint)

## Description

Get Open Orders By Page

This interface is to obtain Spot active order (uncompleted order) lists by page. The returned data is sorted in descending order according to the create time of the order.  After the user successfully places an order, the order is in Active state, and the user can use inOrderBook to determine whether the order has entered the order. Canceled or fully filled orders are marked as completed Done status.

## Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| symbol | required | string | Symbol |
| pageNum | optional | integer | Current page |
| pageSize | optional | integer | Size per page |

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | object |  |

