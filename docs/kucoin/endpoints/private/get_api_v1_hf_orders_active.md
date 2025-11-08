# GET /api/v1/hf/orders/active

**Source:** [/api/v1/hf/orders/active](https://www.kucoin.com/docs/rest//api/v1/hf/orders/active)

## Authentication

Required (Private Endpoint)

## Description

Get Open Orders

This interface is to obtain all Spot active order lists, and the return value of the active order interface is the paged data of all uncompleted order lists. The returned data is sorted in descending order according to the latest update time of the order.  After the user successfully places an order, the order is in Active state, and the user can use inOrderBook to determine whether the order has entered the order. Canceled or fully filled orders are marked as completed Done status.

## Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| symbol | required | string | symbol |

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | array |  |

