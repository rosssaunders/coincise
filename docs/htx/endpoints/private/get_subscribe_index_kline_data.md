# GET Subscribe Index Kline Data

**Source:** [Subscribe Index Kline Data](https://www.htx.com/en-us/opend/newApiPages/?id=5d514a6e-77b6-11ed-9966-0242ac110003)

**Category:** WebSocket Index and Basis Interface

## Authentication

Required (Private Endpoint)

### market.$contract\_code.index.$period (Subscribe Index Kline Data)

Signature verification: Yes

Interface permission: Read

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/ws\_index |
| Online (preferred by aws customers) | wss://api.hbdm.vn/ws\_index |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | index symbol | Case-Insenstive.Both uppercase and lowercase are supported.."BTC-USD","ETH-USD"… |  |
| period | string | true | kline type | 1min, 5min, 15min, 30min, 60min,4hour,1day, 1mon |  |

Notes:  
Pushed once the index data is changed.  
Periodical Push when the index data hasn't changed according to the kline period.

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| ch | string | false | Data channel，Format：market.$contract\_code.index.$period |  |
| ts | long | false | Time of Respond Generation, Unit: Millisecond |  |
| TICK\_START | object array | false |  |  |
| id | string | false | index kline id,the same as kline timestamp,kline start timestamp |  |
| vol | string | false | Trade Volume. The value is 0. |  |
| count | decimal | false | count. The value is 0. |  |
| open | string | false | open index price |  |
| close | string | false | close index price |  |
| low | string | false | lowest index price |  |
| high | string | false | highest index price |  |
| amount | string | false | amount based on coins. |  |
| TICK\_END |  | false |  |  |

#### Subscription Example

{

"req":

"market.btc-usd.index.1min"

"id":

"id4"

"from":

1571000000

"to":

1573098606

}

#### Example of a Successful Subscription

{

"id":

"id1"

"status":

"ok"

"subbed":

"market.BTC-USD.index.1min"

"ts":

1489474081631

}

#### Example of a Data Update

{

"ch":

"market.BTC-USD.index.1min"

"ts":

1604387688243

"tick":{

"id":

1604387640

"open":

"13419.4325"

"close":

"13420.3325"

"high":

"13424.4925"

"low":

"13419.4325"

"amount":

"0"

"vol":

"0"

"count":

0

}

}

#### Example of a Subscription Cancellation

{

"unsub":

"market.BTC-USD.index.1min"

"id":

"id1"

}