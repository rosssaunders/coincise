# DELETE /api/v1/hf/orders/cancelAll

**Source:** [/api/v1/hf/orders/cancelAll](https://www.kucoin.com/docs/rest//api/v1/hf/orders/cancelAll)

## Authentication

Required (Private Endpoint)

## Description

Cancel All Orders

This endpoint can cancel all spot orders for all symbol. This endpoint only sends cancellation requests. The results of the requests must be obtained by checking the order status or subscribing to websocket.

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | object |  |

