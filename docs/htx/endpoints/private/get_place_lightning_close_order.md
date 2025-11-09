# GET Place Lightning Close Order

**Source:** [Place Lightning Close Order](https://www.htx.com/en-us/opend/newApiPages/?id=5d51ae6b-77b6-11ed-9966-0242ac110003)

**Category:** Swap Trade Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap\_lightning\_close\_position (Place Lightning Close Order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USD" |  |  |
| volume | long | true | Order Quantity(volume) |  |  |
| direction | string | true | “buy”:Open，“sell”:Close |  |  |
| client\_order\_id | long | false | Client needs to provide unique API and have to maintain the API themselves afterwards. | \[1, 9223372036854775807\] |  |
| order\_price\_type | string | false | "lightning" by default. "lightning\_fok": lightning FOK type,"lightning\_ioc": lightning IOC type |  |  |

Notes:  
Lightning Close Position，is order with rival price and optimal 30 grades. And the unsettled part will be automatically converted into a limited price order.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" :Order placed successfully, "error"：Order failed |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |
| DATA\_START |  | false |  | Dictionary |
| order\_id | long | true | Order ID |  |
| order\_id\_str | string | true | Order ID |  |
| client\_order\_id | long | false | user’s own order ID |  |
| DATA\_END |  | false |  |  |

#### Request example

{

"sub\_uid":

"123456789"

"contract\_code":

"BTC\_USD"

"amount":

"123"

"type":

"master\_to\_sub"

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"order\_id":

770434885714452500

"order\_id\_str":

"770434885714452480"

"client\_order\_id":

9086

}

"ts":

158797866555

}