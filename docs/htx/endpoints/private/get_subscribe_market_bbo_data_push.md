# GET Subscribe market BBO data push

**Source:** [Subscribe market BBO data push](https://www.htx.com/en-us/opend/newApiPages/?id=5d51475e-77b6-11ed-9966-0242ac110003)

**Category:** WebSocket Market Interface

## Authentication

Required (Private Endpoint)

### market.$contract\_code.bbo (Subscribe market BBO data push)

Signature verification: Yes

Interface permission: Read

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/swap-ws |
| Online (preferred by aws customers) | wss://api.hbdm.vn/swap-ws |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | swap code |  | Case-Insenstive.Both uppercase and lowercase are supported..e.g. "BTC-USD" |

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| ch | string | true | Data channel, Format： market.$contract\_code.bbo |  |
| ts | long | true | Timestamp of Respond Generation, Unit: Millisecond |  |
| TICK\_START | object | true |  |  |
| ch | string | true | Data channel, Format： market.$contract\_code.bbo |  |
| mrid | string | true | Order ID |  |
| id | long | true | tick ID |  |
| ask | array | false | Best Ask Quotation,\[price(Ask price), vol(Ask order (cont.) )\] |  |
| bid | array | false | Best Bid Quotation,\[price(Bid price), vol(Bid order(Cont.))\] |  |
| version | long | true | version ID. |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |
| TICK\_END |  | false |  |  |

Notes:  
When any one of the buy\_one price, buy\_one quantity, sell\_one price and sell\_one quantity changes, the system will push BBO price.  
If there are multiple changes in the price or quantity of buy\_one or sell\_one at the same time, the system will push the latest price and quantity of buy\_one and sell one with the intermediate data discarded.  
When the data received by the client is failed or delayed, the old data buffer in the server will be discarded.The latest BBO will be pushed.  
version（version number). Use match id directly to ensure it is globally unique and the value of version number pushed is the largest.

#### Subscription Example

{

"sub":

"market.BTC-USD.depth.step0"

"id":

"id5"

}

#### Example of a Successful Subscription

{

"id":

"id8"

"status":

"ok"

"subbed":

"market.BTC-USD.bbo"

"ts":

1489474081631

}

#### Example of a Data Update

{

"ch":

"market.BTC-USD.bbo"

"ts":

1603876157423

"tick":{

"mrid":

50997449846

"id":

1603876157

"bid":\[

0

:

13684.5

1

:

10615

\]

"ask":\[

0

:

13684.6

1

:

3440

\]

"ts":

1603876157421

"version":

50997449846

"ch":

"market.BTC-USD.bbo"

}

}

#### Example of a Subscription Cancellation

{

"unsub":

"market.BTC-USD.bbo"

"id":

"id8"

}