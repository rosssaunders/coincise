# GET Cancel Order

**Source:**
[Cancel Order](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-1958947efe6)

**Category:** Orders

## Authentication

Required (Private Endpoint)

### /v5/trade/cancel_order (Cancel Order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID (Trade Interface: at most 72 times every
3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is
shared by all the altcoins contracts delivered by different date).

Interface description: The interface is used to cancel an order in futures
trading.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter       | Data Type | Required | Description   | Value Range | Default Value |
| --------------- | --------- | -------- | ------------- | ----------- | ------------- |
| contract_code   | String    | true     | Symbol        |             |               |
| order_id        | String    | false    | Order ID      |             |               |
| client_order_id | String    | false    | Your order ID |             |               |

#### Response Parameter

| Parameter       | Data Type | Required | Description   | Value Range |
| --------------- | --------- | -------- | ------------- | ----------- |
| order_id        | String    | true     | Order ID      |             |
| client_order_id | String    | true     | Your order ID |             |

#### Request example

{

"contract_code":

"BTC-USDT-241115"

"order_id":

1329854625038651400

"client_order_id":

1329854625038651400

}

#### Response Example

##### Success Example

{

"code":

200

"data":{

"client_order_id":

"1329854625038651392"

"order_id":

"1329854625038651392"

}

"message":

"Success"

"ts":

1737104050245

}
