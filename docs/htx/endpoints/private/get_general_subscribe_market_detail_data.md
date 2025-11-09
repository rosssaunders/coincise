# GET [General] Subscribe Market Detail Data

**Source:** [[General] Subscribe Market Detail Data](https://www.htx.com/en-us/opend/newApiPages/?id=8cb7c694-77b5-11ed-9966-0242ac110003)

**Category:** WebSocket Market Interface

## Authentication

Required (Private Endpoint)

### market.$contract\_code.detail (\[General\] Subscribe Market Detail Data)

Signature verification: No

Interface permission: Read

Rate Limit: For public interface to get market data such as Get Kline data, Get Market Data Overview, Get Contract Information,Get market in-depth data, Get premium index Kline, Get real-time forecast capital rate kline, Get basis data, Get the last Trade of a Contract and so on： For websocket: The rate limit for “req” request is 50 times at once. No limit for “sub” request as the data will be pushed by sever voluntarily.

Interface description: The interface supports cross margin mode and isolated margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625; and supports contract type: BTC-USDT, BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/linear-swap-ws |
| Online (preferred by aws customers) | wss://api.hbdm.vn/linear-swap-ws |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code or contract type | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... or BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ |  |

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
| vol | decimal | true | Trade volume(Cont.)， the sum volume of both buy and sell sides. Sum of both buy and sell sides |  |
| count | decimal | true | fulfilled order quantity. Sum of both buy and sell sides |  |
| trade\_turnover | decimal | true | Transaction amount, that is, sum (transaction quantity \* contract face value \* transaction price). Sum of both buy and sell sides |  |
| ask | array | true | Sell,\[price(Ask price), vol(Ask orders (cont.) )\] |  |
| bid | array | true | Buy,\[price(Bid price), vol(Bid orders(Cont.))\] |  |
| TICK\_END |  | false |  |  |

Notes:  
Bid price(p1) and ask price(p1) are not updated in real time, there will be some delay (about 500ms).  
The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625; and supports contract type: BTC-USDT, BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ.

#### Subscription Example

{

"sub":

"market.BTC-USDT.detail"

"id":

"id6"

}

#### Example of a Successful Subscription

{

"id":

"id6"

"status":

"ok"

"subbed":

"market.BTC-USDT.detail"

"ts":

1489474081631

}

#### Example of a Data Update

{

"ch":

"market.BTC-USDT.detail"

"ts":

1603707870528

"tick":{

"id":

1603707840

"mrid":

131599205

"open":

12916.2

"close":

13065.8

"high":

13205.3

"low":

12852.8

"amount":

30.316

"vol":

30316

"trade\_turnover":

395073.4918

"count":

2983

"asks":\[

0

:

13081.9

1

:

206

\]

"bids":\[

0

:

13071.9

1

:

38

\]

}

}

#### Example of a Subscription Cancellation

{

"unsub":

"market.BTC-USDT.detail"

"id":

"id6"

}