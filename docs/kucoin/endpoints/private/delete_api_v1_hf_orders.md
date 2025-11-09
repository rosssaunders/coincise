# DELETE /api/v1/hf/orders

**Source:**
[/api/v1/hf/orders](https://www.kucoin.com/docs/rest//api/v1/hf/orders)

## Authentication

Required (Private Endpoint)

## Description

Cancel All Orders By Symbol

This endpoint can cancel all spot orders for specific symbol. This endpoint only
sends cancellation requests. The results of the requests must be obtained by
checking the order status or subscribing to websocket.

## Parameters

| Parameter | Required | Type   | Description |
| --------- | -------- | ------ | ----------- |
| symbol    | required | string | symbol      |

## Responses

### 200

| Parameter | Required | Type   | Description |
| --------- | -------- | ------ | ----------- |
| code      | required | string |             |
| data      | required | string |             |
