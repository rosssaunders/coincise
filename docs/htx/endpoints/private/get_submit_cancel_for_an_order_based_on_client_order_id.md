# GET Submit Cancel for an Order (based on client order ID)

**Source:**
[Submit Cancel for an Order (based on client order ID)](https://www.htx.com/en-us/opend/newApiPages/?id=7ec4ef06-7773-11ed-9966-0242ac110003)

**Category:** Trading

## Authentication

Required (Private Endpoint)

### /v1/order/orders/submitCancelClientOrder ( Submit Cancel for an Order (based on client order ID))

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 100times/2s

Interface description: This endpoint submit a request to cancel an order based
on client-order-id . It is suggested to use
/v1/order/orders/{order-id}/submitcancel to cancel a single order, which is
faster and more stable This only submits the cancel request, the actual result
of the canel request needs to be checked by order status or match result
endpoints

#### Request Address

| Environment                         | Address                   |
| ----------------------------------- | ------------------------- |
| Online                              | https://api.huobi.pro     |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter       | Data Type | Required | Description                 | Value Range | Default Value |
| --------------- | --------- | -------- | --------------------------- | ----------- | ------------- |
| client-order-id | string    | false    | User-generated order number |             |               |

#### Response Parameter

| Parameter | Data Type | Required | Description         | Value Range     |
| --------- | --------- | -------- | ------------------- | --------------- |
| status    | string    | false    | status              | "OK" or "Error" |
| data      | long      | false    | cancel order number |                 |

#### Request example

{

"client-order-id":

"a0001"

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":

10

}
