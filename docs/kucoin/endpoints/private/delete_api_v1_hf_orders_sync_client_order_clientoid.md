# DELETE /api/v1/hf/orders/sync/client-order/{clientOid}

**Source:**
[/api/v1/hf/orders/sync/client-order/{clientOid}](https://www.kucoin.com/docs/rest//api/v1/hf/orders/sync/client-order/{clientOid})

## Authentication

Required (Private Endpoint)

## Description

Cancel Order By ClientOid Sync

This endpoint can be used to cancel a spot order by orderId.

## Parameters

| Parameter | Required | Type   | Description                                            |
| --------- | -------- | ------ | ------------------------------------------------------ |
| symbol    | required | string | symbol                                                 |
| clientOid | required | string | Client Order Id，unique identifier created by the user |

## Responses

### 200

| Parameter         | Required | Type   | Description                                                         |
| ----------------- | -------- | ------ | ------------------------------------------------------------------- |
| code              | required | string |                                                                     |
| data              | required | object |                                                                     |
| data.clientOid    | required | string | Client Order Id，unique identifier created by the user              |
| data.originSize   | required | string | original order size                                                 |
| data.dealSize     | required | string | deal size                                                           |
| data.remainSize   | required | string | remain size                                                         |
| data.canceledSize | required | string | Cumulative canceled size                                            |
| data.status       | required | string | Order Status. open：order is active; done：order has been completed |
