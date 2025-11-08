# GET /api/v3/hf/margin/orders/client-order/{clientOid}

**Source:** [/api/v3/hf/margin/orders/client-order/{clientOid}](https://www.kucoin.com/docs/rest//api/v3/hf/margin/orders/client-order/{clientOid})

## Authentication

Required (Private Endpoint)

## Description

Get Order By ClientOid

This endpoint can be used to obtain information for a single Margin order using the client order ID.  After the user successfully places an order, the order is in the Active state, and the user can use inOrderBook to determine whether the order has entered the order. Canceled or fully filled orders are marked as completed Done status.

## Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| symbol | required | string | symbol |
| clientOid | required | string | Client Order Id, unique identifier created by the user |

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | object |  |

