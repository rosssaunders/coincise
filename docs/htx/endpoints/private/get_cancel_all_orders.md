# GET Cancel All Orders

**Source:** [Cancel All Orders](https://www.htx.com/en-us/opend/newApiPages/?id=5d51a25e-77b6-11ed-9966-0242ac110003)

**Category:** Swap Trade Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap\_cancelall (Cancel All Orders)

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
| contract\_code | string | true | Case-Insenstive.Both uppercase and lowercase are supported..e.g. "BTC-USD" |  |  |
| direction | string | false | Transaction direction(if not filled in means all) \["buy" , "sell"\] |  |  |
| offset | string | false | offset direction（if not filled in means all） \["open" , "close"\] |  |  |

Notes:  
You can fill in only one of direction and offset to cancel the orders. (such as direction=buy, all buy orders will be cancelled, including "open" and "close" offset)

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| data: <dict> |  | false |  |  |
| errors: <list> |  | false |  |  |
| order\_id | string | true | Order ID |  |
| err\_code | int | true | failed order error messageError code |  |
| err\_msg | string | true | failed order information |  |
| LIST\_END |  | false |  |  |
| successes | string | true | Successful order |  |
| DICT\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

Notes:  
result of multiple order withdrawls (successful withdrew order ID, failed withdrew order ID)

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

"errors":\[\]

"successes":

"769851022939828224,770281496367714304,771038739454672896"

}

"ts":

1603871951673

}