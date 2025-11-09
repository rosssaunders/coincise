# GET Cancel Trigger Order

**Source:** [Cancel Trigger Order](https://www.htx.com/en-us/opend/newApiPages/?id=5d51b077-77b6-11ed-9966-0242ac110003)

**Category:** Swap Strategy Order Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap\_trigger\_cancel (Cancel Trigger Order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 5 times per second

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | Case-Insenstive.Both uppercase and lowercase are supported.BTC-USD... |  |  |
| order\_id | string | true | order id. multiple orderids need to be joined by ",".Max number of order ids is 10 once. |  |  |

Notes:  
The frequency limit of this interface is 5 times per second.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | response status | "ok" , "error" |
| DATA\_START |  | false |  |  |
| successes | string | true | successful orders |  |
| LIST>(FIELD NAME: ERRORS\_START |  | false |  |  |
| order\_id | string | true | order id |  |
| err\_code | int | true | error code |  |
| err\_msg | string | true | error messages |  |
| LIST\_END |  | false |  |  |
| DATA\_END |  | false |  |  |
| ts | long | true | response timestamp millseconds |  |

#### Request example

{

"contract\_code":

"BTC-USD"

"direction":

"buy"

"offset":

"open"

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"errors":\[

0:{

"order\_id":

"7002236"

"err\_code":

1061

"err\_msg":

"This order doesnt exist."

}

\]

"successes":

"7002242"

}

"ts":

1603874307323

}