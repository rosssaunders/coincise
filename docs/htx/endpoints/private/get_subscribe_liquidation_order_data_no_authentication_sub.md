# GET Subscribe Liquidation Order Data(No authentication) (sub)

**Source:** [Subscribe Liquidation Order Data(No authentication) (sub)](https://www.htx.com/en-us/opend/newApiPages/?id=28c34bd5-77ae-11ed-9966-0242ac110003)

**Category:** Orders and Accounts WebSocket Interfaces

## Authentication

Required (Private Endpoint)

### public.$symbol.liquidation\_orders (Subscribe Liquidation Order Data(No authentication) (sub))

Signature verification: Yes

Interface permission: Read

Rate Limit: The rate limit for “req” request is 50 times at once. No limit for “sub” request as the data will be pushed by sever voluntarily.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/notification |
| Online (preferred by aws customers) | wss://api.hbdm.vn/notification |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |
| op | string | Required； Operator Name，value for unsubscribe is unsub; |
| cid | string | Optional; ID Client requests unique ID |
| topic | string | Required；Unsubscribe Topic Name, format: orders.$contract\_code; For parameter details please check req Subscribe Parameter |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |
| positions.\* | positions.\* | Allowed |
| positions.contract\_code1 | positions.\* | Allowed |
| positions.contract\_code1 | positions.contract\_code1 | Allowed |
| positions.contract\_code1 | positions.contract\_code1 | Not Allowed |
| positions.\* | positions.symbol1 | Not Allowed |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| op | string | false | Required； Operator Name，required subscribe value is sub |  |  |
| cid | string | false | Optional; ID Client requests unique ID |  |  |
| topic | string | false | Required；Topic name format: public.$symbol.liquidation\_orders. symbol is case-insenstive.Both uppercase and lowercase are supported. e.g:"BTC" |  |  |

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| op | string | false | value:"notify" |  |
| topic | string | false | topic subscribed |  |
| ts | long | false | Time of Respond Generation，Unit：Millisecond |  |
| DATA\_START | array object | false |  |  |
| symbol | string | false | Coin |  |
| contract\_code | string | false | contract code |  |
| direction | string | false | Long or short |  |
| offset | string | false | Open or close |  |
| volume | decimal | false | liquidated volume(cont) |  |
| amount | decimal | false | liquidation amount (token) |  |
| price | decimal | false | bankruptcy price |  |
| created\_at | long | false | Order Creation Time |  |
| DATA\_END |  | false |  |  |

#### Subscription Example

{

"op":

"sub"

"cid":

"40sG903yz80oDFWr"

"topic":

"public.BTC.liquidation\_orders"

}

#### Example of a Successful Subscription

{

"op":

"sub"

"cid":

"40sG903yz80oDFWr"

"topic":

"public.BTC.liquidation\_orders"

"ts":

1670903745088

"err-code":

0

}

#### Example of a Data Update

{

"op":

"notify"

"topic":

"public.BTC.liquidation\_orders"

"ts":

1580815422403

"data":\[

0:{

"contract\_code":

"BTC201225"

"symbol":

"BTC"

"direction":

"buy"

"offset":

"close"

"volume":

26

"price":

19674.96

"created\_at":

1606293144641

"amount":

0.13214766383260754

}

\]

}

#### Example of a Subscription Cancellation

{

"op":

"unsub"

"topic":

"public.EOS.liquidation\_orders"

"cid":

"40sG903yz80oDFWr"

}