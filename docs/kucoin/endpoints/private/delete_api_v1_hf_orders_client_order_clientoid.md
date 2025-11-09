# DELETE /api/v1/hf/orders/client-order/{clientOid}

**Source:** [/api/v1/hf/orders/client-order/{clientOid}](https://www.kucoin.com/docs/rest//api/v1/hf/orders/client-order/{clientOid})

## Authentication

Required (Private Endpoint)

## Description

Cancel Order By ClientOid

This endpoint can be used to cancel a spot order by clientOid. This endpoint only sends cancellation requests. The results of the requests must be obtained by checking the order status or subscribing to websocket.

## Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| clientOid | required | string | Client Order Id，unique identifier created by the user |
| symbol | required | string | symbol |

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | object |  |
| data.clientOid | required | string | Client Order Id，unique identifier created by the user |

