# DELETE /api/v1/orders/{orderId}

**Source:**
[/api/v1/orders/{orderId}](https://www.kucoin.com/docs/rest//api/v1/orders/{orderId})

## Authentication

Required (Private Endpoint)

## Description

Cancel Order By OrderId

Cancel order by system generated orderId.

## Parameters

| Parameter | Required | Type   | Description |
| --------- | -------- | ------ | ----------- |
| orderId   | required | string |             |

## Responses

### 200

| Parameter              | Required | Type   | Description                        |
| ---------------------- | -------- | ------ | ---------------------------------- |
| code                   | required | string |                                    |
| data                   | required | object |                                    |
| data.cancelledOrderIds | required | array  | The orderId that is to be canceled |
