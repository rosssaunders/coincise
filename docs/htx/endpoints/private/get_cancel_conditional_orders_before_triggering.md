# GET Cancel conditional orders (before triggering)

**Source:**
[Cancel conditional orders (before triggering)](https://www.htx.com/en-us/opend/newApiPages/?id=7ec50be1-7773-11ed-9966-0242ac110003)

**Category:** Conditional Order

## Authentication

Required (Private Endpoint)

### /v2/algo-orders/cancellation (Cancel conditional orders (before triggering))

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 20times/2sec

Interface description: This endpoint only supports order cancellation for those
conditional orders which have not triggered yet. To cancel a triggered order,
please refer to the endpoints in "Trading" section. Before a conditional order
triggering, it can be only cancelled via this endpoint instead of any endpoint
in "Trading" section.

#### Request Address

| Environment                         | Address                   |
| ----------------------------------- | ------------------------- |
| Online                              | https://api.huobi.pro     |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter      | Data Type | Required | Description                                                                       | Value Range | Default Value |
| -------------- | --------- | -------- | --------------------------------------------------------------------------------- | ----------- | ------------- |
| clientOrderIds | string    | false    | Client order ID (maximum 50 orders are allowed, Transfer in the form of as array) |             |               |

#### Response Parameter

| Parameter  | Data Type  | Required | Description                 | Value Range |
| ---------- | ---------- | -------- | --------------------------- | ----------- |
| code       | integer    | false    | Status code                 |             |
| message    | string     | false    | Error message (if any)      |             |
| DATA_START | object     | false    |                             |             |
| accepted   | string\[\] | false    | Accepted clientOrderId list |             |
| rejected   | string\[\] | false    | Rejected clientOrderId list |             |
| DATA_END   |            | false    |                             |             |

#### Request example

{

"clientOrderIds":\[

0

:

"zy0002"

1

:

"zy0003"

\]

}

#### Response Example

##### Success Example

{

"code":

200

"data":{

"accepted":\[

0

:

"zy0002"

1

:

"zy0003"

\]

"rejected":\[\]

}

}
