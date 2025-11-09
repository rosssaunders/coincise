# GET Point Transfer

**Source:**
[Point Transfer](https://www.htx.com/en-us/opend/newApiPages/?id=7ec515bf-7773-11ed-9966-0242ac110003)

**Category:** Account

## Authentication

Required (Private Endpoint)

### /v2/point/transfer ( Point Transfer)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 2times/s

Interface description: Via this endpoint, parent user should be able to transfer
points between parent user and sub user, sub user should be able to transfer
point to parent user. Both ‘termless’ and ‘terminable’ points are transferrable.
Via this endpoint, user could only transfer ‘termless’ and ‘terminable’ points
instead of any other cryptocurrencies. Parent user could transfer point between
parent user and sub user in two ways. Sub user could only transfer point from
sub user to parent user. Before parent user trying to transfer the terminable
points back from sub user's account, parent user should query the sub user's
point balance first in order to get the corresponding groupId.

#### Request Address

| Environment                         | Address                   |
| ----------------------------------- | ------------------------- |
| Online                              | https://api.huobi.pro     |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description                                           | Value Range | Default Value |
| --------- | --------- | -------- | ----------------------------------------------------- | ----------- | ------------- |
| fromUid   | string    | false    | Transferer’s UID                                      |             |               |
| toUid     | string    | false    | Transferee’s UID                                      |             |               |
| groupId   | long      | false    | Group ID                                              |             |               |
| amount    | string    | false    | Transfer amount (precision: maximum 8 decimal places) |             |               |

Notes:  
\- If groupId=0, it implicates an ‘termless’ point transfer request.

#### Response Parameter

| Parameter    | Data Type | Required | Description                                 | Value Range |
| ------------ | --------- | -------- | ------------------------------------------- | ----------- |
| code         | integer   | false    | Status code                                 |             |
| message      | string    | false    | Error message (if any)                      |             |
| success      | string    | false    |                                             |             |
| DATA_START   | object    | false    |                                             |             |
| transactId   | string    | false    | Transaction ID                              |             |
| transactTime | long      | false    | Transaction time (unix time in millisecond) |             |
| DATA_END     |           | false    |                                             |             |

#### Request example

{

"fromUid":

"178911"

"toUid":

"178211"

"groupId":

178911

"amount":

"178911"

}

#### Response Example

##### Success Example

{

"code":

200

"data":{

"transactId":

"74"

"transactTime":

1594370136458

}

"success":

true

}
