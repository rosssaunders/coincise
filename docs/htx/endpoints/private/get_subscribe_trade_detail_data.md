# GET Subscribe Trade Detail Data

**Source:** [Subscribe Trade Detail Data](https://www.htx.com/en-us/opend/newApiPages/?id=5d514984-77b6-11ed-9966-0242ac110003)

**Category:** WebSocket Market Interface

## Authentication

Required (Private Endpoint)

### market.$contract\_code.trade.detail (Subscribe Trade Detail Data)

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
| ch | string | true | Data channel,format: market.$contract\_code.trade.detail |  |
| ts | long | true | Request time |  |
| TICK\_START |  | false |  |  |
| id | long | true | Unique Order Id(symbol level) |  |
| ts | long | true | tick time |  |
| DATA\_START |  | false |  |  |
| amount | decimal | true | quantity(Cont.). Sum of both buy and sell sides |  |
| ts | long | true | trade timestamp |  |
| id | long | true | Unique Transaction Id(symbol level) |  |
| price | decimal | true | Price |  |
| direction | string | true | The direction to buy or sell is the direction of the taker (active transaction) |  |
| quantity | decimal | true | trading quantity(coin) |  |
| DATA\_END |  | false |  |  |
| TICK\_END |  | false |  |  |

#### Subscription Example

{

"op":

"sub"

"topic":

"matchOrders.BTC-USD"

"cid":

"40sG903yz80oDFWr"

}

#### Example of a Successful Subscription

{

"id":

"id7"

"status":

"ok"

"cid":

"40sG903yz80oDFWr"

"subbed":

"market.BTC-USD.trade.detail"

"ts":

1489474081631

}

#### Example of a Data Update

{

"ch":

"market.BTC-USD.trade.detail"

"ts":

1603876416535

"tick":{

"id":

50998035853

"ts":

1603876416513

"data":\[

0:{

"amount":

4

"ts":

1603876416513

"id":

509980358530000

"price":

13686

"direction":

"sell"

"quantity":

0.0031

}

\]

}

}

#### Example of a Subscription Cancellation

{

"unsub":

"market.BTC-USD.trade.detail"

"id":

"id7"

}