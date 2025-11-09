# GET Cancel Multiple Orders

**Source:**
[Cancel Multiple Orders](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-195894d0de8)

**Category:** Orders

## Authentication

Required (Private Endpoint)

### /v5/trade/cancel_batch_orders (Cancel Multiple Orders)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID (Trade Interface: at most 72 times every
3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is
shared by all the altcoins contracts delivered by different date).

Interface description: Cancel orders in a batch. A maximum of 10 orders can be
cancelled per request.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter       | Data Type       | Required | Description   | Value Range | Default Value |
| --------------- | --------------- | -------- | ------------- | ----------- | ------------- |
| contract_code   | String          | true     | Symbol        |             |               |
| order_id        | Array of string | false    | Order ID      |             |               |
| client_order_id | Array of string | false    | Your order ID |             |               |

#### Response Parameter

| Parameter       | Data Type | Required | Description   | Value Range |
| --------------- | --------- | -------- | ------------- | ----------- |
| order_id        | String    | true     | Order ID      |             |
| client_order_id | String    | true     | Your order ID |             |

#### Request example

{

"contract_code":

"BTC-USDT-241115"

"order_id":\[

0

:

"1329854623927160832"

1

:

"1329854624082350080"

2

:

"1329854624141070336"

3

:

"1329854624195596288"

\]

"client_order_id":\[

0

:

"1329854623927160832"

1

:

"1329854624082350080"

2

:

"1329854624141070336"

3

:

"1329854624195596288"

\]

}

#### Response Example

##### Success Example

{

"code":

200

"data":\[

0:{

"client_order_id":

"1329854624141070336"

"code":

200

"message":

"成功"

"order_id":

"1329854624141070336"

}

1:{

"client_order_id":

"1329854624082350080"

"code":

200

"message":

"成功"

"order_id":

"1329854624082350080"

}

2:{

"client_order_id":

"1329854623927160832"

"code":

200

"message":

"成功"

"order_id":

"1329854623927160832"

}

3:{

"client_order_id":

"1329854624195596288"

"code":

200

"message":

"成功"

"order_id":

"1329854624195596288"

}

\]

"message":

"Success"

"ts":

1737103890390

}
