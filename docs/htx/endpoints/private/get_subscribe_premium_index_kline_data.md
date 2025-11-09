# GET Subscribe Premium Index Kline Data

**Source:** [Subscribe Premium Index Kline Data](https://www.htx.com/en-us/opend/newApiPages/?id=5d514c37-77b6-11ed-9966-0242ac110003)

**Category:** WebSocket Index and Basis Interface

## Authentication

Required (Private Endpoint)

### market.$contract\_code.premium\_index.$period (Subscribe Premium Index Kline Data)

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
| contract\_code | string | true | contract code | Case-Insenstive.Both uppercase and lowercase are supported.."BTC-USD","ETH-USD"… |  |
| period | string | true | kline type | 1min, 5min, 15min, 30min, 60min,4hour,1day, 1week, 1mon |  |

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| ch | string | true | Data channel，Format： market.period |  |
| TICK\_START | object array | true |  |  |
| id | long | true | index kline id,the same as kline timestamp, kline start timestamp |  |
| vol | string | true | Trade volume(Cont.). The value is 0. |  |
| count | string | true | count. The value is 0. |  |
| open | string | true | open index price |  |
| close | string | true | close index price |  |
| low | string | true | lowest index price |  |
| high | string | true | highest index price |  |
| amount | string | true | amount based on coins. |  |
| TICK\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

#### Subscription Example

{

"req":

"market.BTC-USD.premium\_index.1min"

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

"id7"

"status":

"ok"

"subbed":

"market.BTC-USD.premium\_index.1min"

"ts":

1489474081631

}

#### Example of a Data Update

{

"ch":

"market.BTC-USD.premium\_index.1min"

"ts":

1603876800359

"tick":{

"id":

1603876800

"open":

"-0.0002521241137087"

"close":

"-0.0002521241137087"

"high":

"-0.0002521241137087"

"low":

"-0.0002521241137087"

"amount":

"0"

"vol":

"0"

"count":

"0"

}

}

#### Example of a Subscription Cancellation

{

"unsub":

"market.BTC-USD.premium\_index.1min"

"id":

"id7"

}