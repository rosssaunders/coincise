# GET [Cross] Cancel Trigger Order

**Source:** [[Cross] Cancel Trigger Order](https://www.htx.com/en-us/opend/newApiPages/?id=8cb87056-77b5-11ed-9966-0242ac110003)

**Category:** Swap Strategy Order Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_cross\_trigger\_cancel (\[Cross\] Cancel Trigger Order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 5 times per second.

Interface description: The interface only supports cross margin mode. The frequency limit of this interface is 5 times per second. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625. one of (pair+contract\_type) and contract\_code must be filled in(if all of them not filled in, will get 1014 error code); and all filled in, the contract\_code is the preferred.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |
| pair | string | false | pair | BTC-USDT |  |
| contract\_type | string | false | contract type | swap, this\_week, next\_week, quarter, next\_quarter |  |
| order\_id | string | true | order id. multiple orderids need to be joined by ",".Max number of order ids is 10 once. |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| DATA\_START | object | true |  |  |
| ERRORS\_START | object array | true |  |  |
| order\_id | string | false | order ID |  |
| err\_code | int | false | error code |  |
| err\_msg | string | false | error message |  |
| ERRORS\_END |  | false |  |  |
| successes | string | true | the list order which's successful，joined by "," |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

#### Request example

{

"contract\_code":

"BTC-USDT"

"pair":

"BTC-USDT"

"contract\_type":

"swap"

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

"1888"

"err\_code":

1061

"err\_msg":

"This order doesnt exist."

}

\]

"successes":

"1880"

}

"ts":

1606977508308

}