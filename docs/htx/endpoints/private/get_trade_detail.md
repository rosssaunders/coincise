# GET Trade Detail

**Source:** [Trade Detail](https://www.htx.com/en-us/opend/newApiPages/?id=7ec53b69-7773-11ed-9966-0242ac110003)

**Category:** Websocket Market Data

## Authentication

Required (Private Endpoint)

### market.$symbol.trade.detail ( Trade Detail)

Signature verification: No

Interface description: This topic sends the latest completed trades. It updates in tick by tick mode.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.huobi.pro/ws |
| Online (preferred by aws customers) | wss://api-aws.huobi.pro/ws |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |
| ch | string | Required； Operator Name， sub、unsub; |
| params | string | parameters |
| cid | string | request id |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |
|  "market.btcusdt.trade.detail" |  "market.btcusdt.trade.detail" | Allowed |
|  "market.btcusdt.trade.detail", "market.ethusdt.trade.detail", "market.htxusdt.trade.detail" |  "market.btcusdt.trade.detail", "market.ethusdt.trade.detail", "market.htxusdt.trade.detail" | Allowed |
|  "market.btcusdt.trade.detail", "market.ethusdt.trade.detail", "market.htxusdt.trade.detail" | "market.bnbusdt.trade.detail" | Not Allowed |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbol | Array | false | Trading symbol | Refer to GET /v1/common/symbols |  |
| cid | string | false | Current request's ID |  |  |

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| ch | string | false | Data belonged channel，Format：market.$symbol.trade.detail |  |
| ts | long | false | Time of Respond Generation, Unit: Millisecond |  |
| TICK\_START | object | false |  |  |
| id | long | false | global transaction ID |  |
| ts | long | false | Latest Creation Time |  |
| DATA\_START | object | false |  |  |
| id | integer | false | Unique trade id (to be obsoleted) |  |
| tradeId | long | false | Unique trade id (NEW) |  |
| amount | float | false | The volume of the trade (buy side or sell side) |  |
| price | float | false | The price of the trade |  |
| ts | long | false | timestamp (UNIX epoch time in millisecond) |  |
| direction | string | false | direction of the trade (taker): 'buy' or 'sell' |  |
| DATA\_END |  | false |  |  |
| TICK\_END |  | false |  |  |

#### Subscription Example

`{ "sub":[ "market.btcusdt.trade.detail", "market.ethusdt.trade.detail", "market.htxusdt.trade.detail"], "id": "id1" }`

#### Example of a Successful Subscription

{

"id":

"id1"

"status":

"ok"

"subbed":

"market.btcusdt.trade.detail"

"ts":

1489474081631

}

#### Example of a Data Update

{

"ch":

"market.btcusdt.trade.detail"

"ts":

1630994963175

"tick":{

"id":

137005445109

"ts":

1630994963173

"data":\[

0:{

"id":

1.3700544510935929e+26

"ts":

1630994963173

"tradeId":

102523573486

"amount":

0.006754

"price":

52648.62

"direction":

"buy"

}

\]

}

}

#### Example of a Subscription Cancellation

{

"unsub":

"market.btcusdt.trade.detail"

"id":

"id1"

}