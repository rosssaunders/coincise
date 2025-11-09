# GET [Cross] Cancel All Trigger Orders

**Source:** [[Cross] Cancel All Trigger Orders](https://www.htx.com/en-us/opend/newApiPages/?id=8cb872c3-77b5-11ed-9966-0242ac110003)

**Category:** Swap Strategy Order Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_cross\_trigger\_cancelall (\[Cross\] Cancel All Trigger Orders)

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
| direction | string | false | Transaction direction(if not filled in means all) | \["buy" , "sell"\] |  |
| offset | string | false | offset direction（if not filled in means all） | \["open" , "close"\] |  |

Notes:  
You can fill in only one of direction and offset to cancel the orders. (such as direction=buy, all buy orders will be cancelled, including "open" and "close" offset)

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

"errors":\[\]

"successes":

"1879,1878"

}

"ts":

1606977712328

}