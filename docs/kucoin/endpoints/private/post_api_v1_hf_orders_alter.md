# POST /api/v1/hf/orders/alter

**Source:**
[/api/v1/hf/orders/alter](https://www.kucoin.com/docs/rest//api/v1/hf/orders/alter)

## Authentication

Required (Private Endpoint)

## Description

Modify Order

This interface can modify the price and quantity of the order according to
orderId or clientOid. The implementation of this interface is: Cancel the order
and place a new order on the same trading pair, and return the modification
result to the client synchronously. When the quantity of the new order updated
by the user is less than the filled quantity of this order, the order will be
considered as completed, and the order will be canceled, and no new order will
be placed.

## Request Body

| Parameter | Required | Type   | Description                                                                         |
| --------- | -------- | ------ | ----------------------------------------------------------------------------------- |
| clientOid | optional | string | One must be chose out of the old client order ID, orderId and clientOid             |
| symbol    | required | string | symbol                                                                              |
| orderId   | optional | string | One must be chosen out of the old order id, orderId and clientOid                   |
| newPrice  | optional | string | One must be chosen out of the modified price of the new order, newPrice and newSize |
| newSize   | optional | string | One must be chosen out of the modified size of the new order, newPrice and newSize  |

## Responses

### 200

| Parameter       | Required | Type   | Description                  |
| --------------- | -------- | ------ | ---------------------------- |
| code            | required | string |                              |
| data            | required | object |                              |
| data.newOrderId | required | string | The new order ID             |
| data.clientOid  | required | string | The original client order ID |
