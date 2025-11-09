# GET ws cancel all Orders

**Source:** [ws cancel all Orders](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-1902a38ba20)

**Category:** Websocket Trade

## Authentication

Required (Private Endpoint)

### cancelall (ws cancel all Orders)

Signature verification: Yes

Interface permission: Trade

Rate Limit: Shared REST frequency limit

Interface description: This interface supports websocket cancel all orders placement for Coin-M Swaps.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/swap-trade |
| Online (preferred by aws customers) | wss://api.hbdm.vn/swap-trade |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |
| op | string | Required； Operator Name，cancelall |
| cid | string | Optional; ID Client requests unique ID |
| data | string | All cancellation parameters |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | Case-Insenstive.Both uppercase and lowercase are supported..e.g. "BTC-USD" |  |  |
| direction | string | false | Transaction direction(if not filled in means all) \["buy" , "sell"\] |  |  |
| offset | string | false | offset direction（if not filled in means all） \["open" , "close"\] |  |  |
| cid | string | false | Current request's ID |  |  |

Notes: You can fill in only one of direction and offset to cancel the orders. (such as direction=buy, all buy orders will be cancelled, including "open" and "close" offset)

#### Data Update

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

Notes: result of multiple order withdrawls (successful withdrew order ID, failed withdrew order ID)

#### Subscription Example

{

"op":

"cancelall"

"cid":

"40sG903yz80oDFWr"

"data":{

"contract\_code":

"BTC-USD"

"direction":

"buy"

"offset":

"open"

}

}

#### Example of a Successful Subscription

{

"status":

"ok"

"cid":

"40sG903yz80oDFWr"

"data":{

"errors":\[\]

"successes":

"769851022939828224,770281496367714304,771038739454672896"

}

"ts":

1603871951673

}

#### Example of a Data Update

No data

#### Example of a Subscription Cancellation

No data