# GET Cancel All Trigger Orders

**Source:** [Cancel All Trigger Orders](https://www.htx.com/en-us/opend/newApiPages/?id=5d51b14a-77b6-11ed-9966-0242ac110003)

**Category:** Swap Strategy Order Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap\_trigger\_cancelall (Cancel All Trigger Orders)

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
| contract\_code | string | true | contract code,"BTC-USD" ... |  |  |
| direction | string | false | Transaction direction(if not filled in means all) \["buy" , "sell"\] |  |  |
| offset | string | false | offset direction（if not filled in means all） \["open" , "close"\] |  |  |

Notes:  
You can fill in only one of direction and offset to cancel the orders. (such as direction=buy, all buy orders will be cancelled, including "open" and "close" offset)  
The frequency limit of this interface is 5 times per second.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | status | "ok" , "error" |
| DATA\_START |  | false |  |  |
| LIST>(DATA NAME: ERRORS\_START |  | false |  |  |
| order\_id | string | true | order id |  |
| err\_code | int | true | error code |  |
| err\_msg | string | true | error message |  |
| LIST\_END |  | false |  |  |
| successes | string | true | successful orders |  |
| DATA\_END |  | false |  |  |
| ts | long | true | response timestamp in millseconds |  |

#### Request example

{

"contract\_code":

"BTC-USD"

"trade\_type":

0

"status":

"0"

"create\_date":

30

"page\_index":

1

"page\_size":

20

"sort\_by":

"created\_at"

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"errors":\[\]

"successes":

"7002240,7002241"

}

"ts":

1603874352762

}