# GET [General] Subscribe Market Depth Data

**Source:** [[General] Subscribe Market Depth Data](https://www.htx.com/en-us/opend/newApiPages/?id=8cb7c385-77b5-11ed-9966-0242ac110003)

**Category:** WebSocket Market Interface

## Authentication

Required (Private Endpoint)

### market.$contract\_code.depth.$type (\[General\] Subscribe Market Depth Data)

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
| type | string | true | Depth Type | Get depth data within step 150, use step0, step1, step2, step3, step4, step5, step14, step15, step16, step17（merged depth data 0-5,14-17）；when step is 0，depth data will not be merged; Get depth data within step 20, use step6, step7, step8, step9, step10, step11, step12, step13, step18, step19(merged depth data 7-13,18-19); when step is 6, depth data will not be merged. |  |

Notes:  
When clients choose merged depth data, WebSocket server will only display the merged price within price steps in order book. Please note that the merged depth price will not make any change on the actual order price.  
step16, step17, step18, and step19 are only for SHIB-USDT contract, and the other contracts is not supported now.  
steps between step1 and step5, step14 and step17 are merged orderbook data of step 150. steps between step7 and step13, step18, step19 are merged orderbook data of step 20. Details are below:  
Depth precision  
step16、step18 0.0000001  
step17、step19 0.000001  
step1、step7 0.00001  
step2、step8 0.0001  
step3、step9 0.001  
step4、step10 0.01  
step5、step11 0.1  
step14、step12 1  
step15、step13 10  

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| ts | string | true | Time of Respond Generation, Unit: Millisecond |  |
| ch | long | true | Data channel, Format： market.period |  |
| TICK\_START |  | false |  |  |
| mrid | long | true | Order ID |  |
| id | long | true | tick ID |  |
| asks | object | false | Sell,\[price(Ask price), vol(Ask orders (cont.) )\], price in ascending sequence |  |
| bids | object | false | Buy,\[price(Bid price), vol(Bid orders(Cont.))\], Price in descending sequence |  |
| ts | long | true | Timestamp for depth generation; generated once every 100ms, unit: millisecond |  |
| version | long | true | version ID |  |
| ch | string | true | Data channel, Format： market.period |  |
| TICK\_END |  | false |  |  |

#### Subscription Example

{

"sub":

"market.BTC-USDT.depth.step0"

"id":

"id5"

}

#### Example of a Successful Subscription

{

"id":

"id1"

"status":

"ok"

"subbed":

"market.BTC-USDT.depth.step0"

"ts":

1489474081631

}

#### Example of a Data Update

{

"ch":

"market.BTC-USDT.depth.step6"

"ts":

1603707576468

"tick":{

"mrid":

131596447

"id":

1603707576

"bids":\[

0:\[

0

:

13071.9

1

:

38

\]

1:\[

0

:

13068

1

:

5

\]

\]

"asks":\[

0:\[

0

:

13081.9

1

:

197

\]

1:\[

0

:

13099.7

1

:

371

\]

\]

"ts":

1603707576467

"version":

1603707576

"ch":

"market.BTC-USDT.depth.step6"

}

}

#### Example of a Subscription Cancellation

{

"unsub":

"market.BTC-USDT.depth.step0"

"id":

"id5"

}