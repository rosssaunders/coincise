# GET [Isolated] Cancel All Orders

**Source:** [[Isolated] Cancel All Orders](https://www.htx.com/en-us/opend/newApiPages/?id=8cb84dae-77b5-11ed-9966-0242ac110003)

**Category:** Swap Trade Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_cancelall (\[Isolated\] Cancel All Orders)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: This interface only supports isolated margin mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | Case-Insenstive.Both uppercase and lowercase are supported..e.g. "BTC-USDT" |  |  |
| direction | string | false | Transaction direction(if not filled in means all) \["buy" , "sell"\] |  |  |
| offset | string | false | offset direction（if not filled in means all） \["open" , "close"\] |  |  |

Notes:  
You can fill in only one of direction and offset to cancel the orders. (such as direction=buy, all buy orders will be cancelled, including "open" and "close" offset)

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| DATA\_START | object | false |  |  |
| ERRORS\_START | array | false |  |  |
| order\_id | string | true | Order ID |  |
| err\_code | int | true | failed order error messageError code |  |
| err\_msg | string | true | failed order information |  |
| ERRORS\_END |  | false |  |  |
| successes | string | true | Successful order |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

#### Request example

{

"contract\_code":

"BTC-USDT"

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

"768883002062282752,770325103371542528,770325103388319744"

}

"ts":

1603701437838

}