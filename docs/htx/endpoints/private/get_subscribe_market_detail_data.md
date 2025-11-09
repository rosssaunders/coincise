# GET Subscribe Market Detail Data

**Source:** [Subscribe Market Detail Data](https://www.htx.com/en-us/opend/newApiPages/?id=5d514672-77b6-11ed-9966-0242ac110003)

**Category:** WebSocket Market Interface

## Authentication

Required (Private Endpoint)

### market.$contract\_code.detail (Subscribe Market Detail Data)

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
| ch | string | true | Data channel，Format： market.$contract\_code.detail |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |
| TICK\_START |  | false |  |  |
| id | long | true | ID |  |
| mrid | long | true | Order ID |  |
| open | decimal | true | Open Price |  |
| close | decimal | true | Clos Price, the price from the latest kline is the last order price |  |
| high | decimal | true | High Price |  |
| low | decimal | true | Low Price |  |
| amount | decimal | true | Trade Amount(Coins), Trade amount(Coin)=SUM(quantity(cont.)\*face value/ order price. Sum of both buy and sell sides |  |
| vol | decimal | true | Trade volume(Cont.)， the sum volume of both buy and sell sides |  |
| count | decimal | true | fulfilled order quantity. Sum of both buy and sell sides |  |
| ask | array | true | Sell,\[price(Ask price), vol(Ask orders (cont.) )\] |  |
| bid | array | true | Buy,\[price(Bid price), vol(Bid orders(Cont.))\] |  |
| TICK\_END |  | false |  |  |

#### Subscription Example

{

"sub":

"market.btc-usd.estimated\_rate.1min"

"id":

"id7"

}

#### Example of a Successful Subscription

{

"id":

"id6"

"status":

"ok"

"subbed":

"market.BTC-USD.depth.size\_20.high\_freq"

"ts":

1489474081631

}

#### Example of a Data Update

{

"ch":

"market.BTC-USD.detail"

"ts":

1603876084386

"tick":{

"id":

1603876080

"mrid":

50997295506

"open":

13616.9

"close":

13687.4

"high":

13873.5

"low":

13531.2

"amount":

417937.43298296945

"vol":

56697298

"count":

488112

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

}

}

#### Example of a Subscription Cancellation

{

"unsub":

"market.BTC-USD.detail"

"id":

"id6"

}