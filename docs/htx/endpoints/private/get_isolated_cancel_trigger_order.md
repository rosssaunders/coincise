# GET [Isolated] Cancel Trigger Order

**Source:** [[Isolated] Cancel Trigger Order](https://www.htx.com/en-us/opend/newApiPages/?id=8cb86f61-77b5-11ed-9966-0242ac110003)

**Category:** Swap Strategy Order Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_trigger\_cancel (\[Isolated\] Cancel Trigger Order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 5 times per second.

Interface description: This interface only supports isolated margin mode. The frequency limit of this interface is 5 times per second.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | 1 | false | Case-Insenstive.Both uppercase and lowercase are supported.BTC-USDT... |  |  |
| order\_id | 1 | false | order id. multiple orderids need to be joined by ",".Max number of order ids is 20 once. |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | response status | "ok" , "error" |
| DATA\_START |  | false |  |  |
| ERRORS\_START |  | false |  |  |
| order\_id | string | true | order id |  |
| err\_code | int | true | error code |  |
| err\_msg | string | true | error messages |  |
| ERRORS\_END |  | false |  |  |
| successes | string | true | successful orders |  |
| DATA\_END |  | false |  |  |
| ts | long | true | response timestamp millseconds |  |

#### Request example

{

"contract\_code":

"BTC-USDT"

"order\_id":

"456789123"

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

"34"

"err\_code":

1061

"err\_msg":

"This order doesnt exist."

}

\]

"successes":

"1"

}

"ts":

1603704887184

}