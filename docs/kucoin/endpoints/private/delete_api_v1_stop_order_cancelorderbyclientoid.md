# DELETE /api/v1/stop-order/cancelOrderByClientOid

**Source:** [/api/v1/stop-order/cancelOrderByClientOid](https://www.kucoin.com/docs/rest//api/v1/stop-order/cancelOrderByClientOid)

## Authentication

Required (Private Endpoint)

## Description

Cancel Stop Order By ClientOid

This endpoint can be used to cancel a spot  stop order by clientOid. 

## Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| symbol | optional | string | symbol |
| clientOid | required | string | Unique order id created by users to identify their orders |

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | object |  |
| data.clientOid | required | string | Client Order Id，unique identifier created by the user |
| data.cancelledOrderId | required | string | Unique ID of the cancelled order |

