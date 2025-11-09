# GET Submit Cancel for Multiple Orders by IDs

**Source:**
[Submit Cancel for Multiple Orders by IDs](https://www.htx.com/en-us/opend/newApiPages/?id=7ec4ea21-7773-11ed-9966-0242ac110003)

**Category:** Trading

## Authentication

Required (Private Endpoint)

### /v1/order/orders/batchcancel ( Submit Cancel for Multiple Orders by IDs)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 50times/2s

Interface description: This endpoint submit cancellation for multiple orders at
once with given ids. It is suggested to use order-ids instead of
client-order-ids, so that the cancellation is faster, more accurate and more
stable.

#### Request Address

| Environment                         | Address                   |
| ----------------------------------- | ------------------------- |
| Online                              | https://api.huobi.pro     |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter        | Data Type | Required | Description                                                                                                                                                                                          | Value Range | Default Value                      |
| ---------------- | --------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ---------------------------------- |
| order-ids        | string    | false    | The order ids to cancel (Either order-ids or client-order-ids can be filled in one batch request). It is suggest to use order-ids rather than client-order-ids, the former is faster and more stable |             | No more than 50 orders per request |
| client-order-ids | string    | false    | The client order ids to cancel (Either order-ids or client-order-ids can be filled in one batch request), it must exist already, otherwise it is not allowed to use when placing a new order         |             | No more than 50 orders per request |

#### Response Parameter

| Parameter       | Data Type | Required | Description | Value Range |
| --------------- | --------- | -------- | ----------- | ----------- |
| status          | string    | false    |             |             |
| DATA_START      | object    | false    |             |             |
| success         | array     | false    |             |             |
| FAILED_START    | object    | false    |             |             |
| order-id        | string    | false    |             |             |
| client-order-id | string    | false    |             |             |
| err-code        | string    | false    |             |             |
| err-msg         | string    | false    |             |             |
| order-state     | string    | false    |             |             |
| FAILED_END      |           | false    |             |             |
| DATA_END        |           | false    |             |             |

#### Request example

{

"client-order-ids":\[

0

:

"12345"

1

:

"123456"

\]

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"success":\[

0

:

"12345"

\]

"failed":\[

0:{

"err-msg":

"Incorrect order state"

"order-state":

"7"

"order-id":

"357631450723117"

"err-code":

"order-orderstate-error"

"client-order-id":

"123456"

}

\]

}

}
