# GET Submit Cancel for an Order

**Source:**
[Submit Cancel for an Order](https://www.htx.com/en-us/opend/newApiPages/?id=7ec4e938-7773-11ed-9966-0242ac110003)

**Category:** Trading

## Authentication

Required (Private Endpoint)

### /v1/order/orders/{order-id}/submitcancel ( Submit Cancel for an Order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 100times/2s

Interface description: This endpoint submits a request to cancel an order. The
actual result of the cancellation request needs to be checked by order status or
match result endpoints after submitting the request.

#### Request Address

| Environment                         | Address                   |
| ----------------------------------- | ------------------------- |
| Online                              | https://api.huobi.pro     |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description                                   | Value Range | Default Value |
| --------- | --------- | -------- | --------------------------------------------- | ----------- | ------------- |
| order-id  | string    | false    | order id which needs to be filled in the path |             |               |
| symbol    | string    | false    | symbol which needs to be filled in the URL    |             |               |

#### Response Parameter

| Parameter | Data Type | Required | Description         | Value Range     |
| --------- | --------- | -------- | ------------------- | --------------- |
| status    | string    | false    | status              | "OK" or "Error" |
| data      | long      | false    | cancel order number |                 |

Notes:  
The returned data object is a single string which represents the order id

#### Request example

{

"order-id":

"178211"

"symbol":

"btcusdt"

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":

"356501495694025"

}
