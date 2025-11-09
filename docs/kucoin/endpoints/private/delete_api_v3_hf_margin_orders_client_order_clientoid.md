# DELETE /api/v3/hf/margin/orders/client-order/{clientOid}

**Source:**
[/api/v3/hf/margin/orders/client-order/{clientOid}](https://www.kucoin.com/docs/rest//api/v3/hf/margin/orders/client-order/{clientOid})

## Authentication

Required (Private Endpoint)

## Description

Cancel Order By ClientOid

This endpoint can be used to cancel a margin order by clientOid. This endpoint
only sends cancellation requests. The results of the requests must be obtained
by checking the order status or subscribing to Websocket.

## Parameters

| Parameter | Required | Type   | Description                                            |
| --------- | -------- | ------ | ------------------------------------------------------ |
| symbol    | required | string | symbol                                                 |
| clientOid | required | string | Client Order Id, unique identifier created by the user |

## Responses

### 200

| Parameter      | Required | Type   | Description                                            |
| -------------- | -------- | ------ | ------------------------------------------------------ |
| code           | required | string |                                                        |
| data           | required | object |                                                        |
| data.clientOid | required | string | Client Order Id, unique identifier created by the user |
