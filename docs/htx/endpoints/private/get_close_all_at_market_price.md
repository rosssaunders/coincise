# GET Close All at Market Price

**Source:**
[Close All at Market Price](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-19589572764)

**Category:** Orders

## Authentication

Required (Private Endpoint)

### /v5/trade/position_all (Close All at Market Price)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID (Trade Interface: at most 72 times every
3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is
shared by all the altcoins contracts delivered by different date).

Interface description: Sell all positions at market price.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online (preferred by aws customers) | https://api.hbdm.vn  |
| Online                              | https://api.hbdm.com |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --------- | --------- | -------- | ----------- | ----------- | ------------- |

#### Response Parameter

| Parameter       | Data Type | Required | Description    | Value Range |
| --------------- | --------- | -------- | -------------- | ----------- |
| order_id        | String    | true     | Order ID (UUID |             |
| client_order_id | String    | false    | Your order ID  |             |

#### Request example

`no`

#### Response Example

##### Success Example

{

"code":

200

"data":\[

0:{

"client_order_id":

1339201278633681000

"code":

200

"message":

"Success"

"order_id":

1339201278633681000

}

\]

"message":

"Success"

"ts":

1739332065995

}
