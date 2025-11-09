# GET Cancel a Take-profit and Stop-loss Order

**Source:** [Cancel a Take-profit and Stop-loss Order](https://www.htx.com/en-us/opend/newApiPages/?id=5d51b532-77b6-11ed-9966-0242ac110003)

**Category:** Swap Strategy Order Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap\_tpsl\_cancel (Cancel a Take-profit and Stop-loss Order)

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
| contract\_code | string | true | contract code | "BTC-USD" ... |  |
| order\_id | string | true | order ID（different IDs are separated by ",", maximum 10 orders can be withdrew at one time） |  |  |

Notes:  
The frequency limit of this interface is 5 times per second.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | status | "ok", "error" |
| DATA\_START | object | true |  | dictionary |
| ERRORS\_START | array | true |  |  |
| order\_id | string | true | order id |  |
| err\_code | long | false | error code |  |
| err\_msg | string | false | error message |  |
| ERRORS\_END |  | false |  |  |
| successes | string | true | successes orders |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation，Unit: Millisecond |  |

#### Request example

{

"contract\_code":

"BTC-USD"

"direction":

"buy"

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

"796038243887169533"

"err\_code":

1061

"err\_msg":

"This order doesnt exist."

}

\]

"successes":

"796038243887169537"

}

"ts":

1609832106183

}