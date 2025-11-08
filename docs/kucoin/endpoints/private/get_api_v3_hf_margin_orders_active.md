# GET /api/v3/hf/margin/orders/active

**Source:** [/api/v3/hf/margin/orders/active](https://www.kucoin.com/docs/rest//api/v3/hf/margin/orders/active)

## Authentication

Required (Private Endpoint)

## Description

Get Open Orders

This interface is to obtain all Margin active order lists, and the return value of the active order interface is the paged data of all uncompleted order lists. The returned data is sorted in descending order according to the latest update time of the order.  After the user successfully places an order, the order is in the Active state, and the user can use inOrderBook to determine whether the order has entered the order. Canceled or fully filled orders are marked as completed Done status.

## Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| symbol | required | string | symbol |
| tradeType | required | string | Order type: MARGIN_TRADE - cross margin trading order, MARGIN_ISOLATED_TRADE - isolated margin trading order |

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | array |  |

