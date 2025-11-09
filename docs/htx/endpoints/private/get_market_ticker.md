# GET Market Ticker

**Source:** [Market Ticker](https://www.htx.com/en-us/opend/newApiPages/?id=7ec538cf-7773-11ed-9966-0242ac110003)

**Category:** Websocket Market Data

## Authentication

Required (Private Endpoint)

### market.$symbol.ticker ( Market Ticker)

Signature verification: No

Interface description: Retrieve the market ticker,data is pushed every 100ms.

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
| "market.btcusdt.mbp.refresh.20" | "market.btcusdt.mbp.refresh.20" | Allowed |
| "market.btcusdt.mbp.refresh.20","market.ethusdt.mbp.refresh.20","market.htxusdt.mbp.refresh.20" | "market.btcusdt.mbp.refresh.20","market.ethusdt.mbp.refresh.20","market.htxusdt.mbp.refresh.20" | Allowed |
| "market.btcusdt.mbp.refresh.20","market.ethusdt.mbp.refresh.20","market.htxusdt.mbp.refresh.20" | "market.bnbusdt.mbp.5" | Not Allowed |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbol | Array | false | The trading symbol to query | All supported trading symbol, e.g. btcusdt, bccbtc.Refer to /v1/common/symbols |  |
| cid | string | false | Current request's ID |  |  |

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| ch | string | false | Data belonged channel，Format：market.$symbol.ticker |  |
| ts | long | false | Time of Respond Generation, Unit: Millisecond |  |
| TICK\_START | object | false |  |  |
| amount | float | false | Accumulated trading volume of last 24 hours (rotating 24h), in base currency |  |
| count | integer | false | The number of completed trades (rotating 24h) |  |
| open | float | false | The opening price of last 24 hours (rotating 24h) |  |
| close | float | false | The last price of last 24 hours (rotating 24h) |  |
| low | float | false | The lowest price of last 24 hours (rotating 24h) |  |
| high | float | false | The highest price of last 24 hours (rotating 24h) |  |
| vol | float | false | Accumulated trading value of last 24 hours (rotating 24h), in quote currency |  |
| bid | float | false | Best bid price |  |
| bidSize | float | false | Best bid size |  |
| ask | float | false | Best ask price |  |
| askSize | float | false | Best ask size |  |
| lastPrice | float | false | Last traded price |  |
| lastSize | float | false | Last traded size |  |
| TICK\_END |  | false |  |  |

#### Subscription Example

{

"sub":\[

0

:

"market.btcusdt.mbp.refresh.20"

1

:

"market.ethusdt.mbp.refresh.20"

2

:

"market.htxusdt.mbp.refresh.20"

\]

}

#### Example of a Successful Subscription

{

"id":

"id1"

"status":

"ok"

"subbed":

"market.btcusdt.ticker"

"ts":

1489474081631

}

#### Example of a Data Update

{

"ch":

"market.btcusdt.ticker"

"ts":

1630982370526

"tick":{

"open":

51732

"high":

52785.64

"low":

51000

"close":

52735.63

"amount":

13259.24137056181

"vol":

687640987.4125315

"count":

448737

"bid":

52732.88

"bidSize":

0.036

"ask":

52732.89

"askSize":

0.583653

"lastPrice":

52735.63

"lastSize":

0.03

}

}

#### Example of a Subscription Cancellation

{

"unsub":

"market.btcusdt.ticker"

}