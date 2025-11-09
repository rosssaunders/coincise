# GET Cancel a Trailing Order

**Source:** [Cancel a Trailing Order](https://www.htx.com/en-us/opend/newApiPages/?id=5d51be6e-77b6-11ed-9966-0242ac110003)

**Category:** Swap Strategy Order Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap\_track\_cancel (Cancel a Trailing Order)

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
| contract\_code | string | true | contract code | BTC-USD |  |
| order\_id | string | true | User's trailing order id (multiple order IDs are separated by ",", a maximum of 10 orders are allowed to be withdrawn at a time) |  |  |

Notes:  
The frequency limit of this interface is 5 times per second.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | the result of server handling to request | "ok" :success, "error": failed |
| DATA\_START | object | true |  | dictionary |
| ERRORS\_START | object | true |  | dictionary |
| order\_id | string | true | trailing order id\[Globally Unique\] |  |
| err\_code | long | false | error code |  |
| err\_msg | string | false | error msg |  |
| ERRORS\_END |  | false |  |  |
| successes | string | true | the orders that are success |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

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

"825057948169748481"

"err\_code":

1061

"err\_msg":

"This order doesnt exist."

}

\]

"successes":

"825057948169748480"

}

"ts":

1616750767892

}