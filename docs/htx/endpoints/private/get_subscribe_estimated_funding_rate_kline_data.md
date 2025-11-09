# GET Subscribe Estimated Funding Rate Kline Data

**Source:** [Subscribe Estimated Funding Rate Kline Data](https://www.htx.com/en-us/opend/newApiPages/?id=5d514e8d-77b6-11ed-9966-0242ac110003)

**Category:** WebSocket Index and Basis Interface

## Authentication

Required (Private Endpoint)

### market.$contract\_code.estimated\_rate.$period (Subscribe Estimated Funding Rate Kline Data)

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
| period | string | true | index symbol | 1min, 5min, 15min, 30min, 60min,4hour,1day, 1week, 1mon |  |

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| ch | string | true | Data channel，Format： market.period" |  |
| TICK\_START | object array | true |  |  |
| id | long | true | kline id,the same as kline timestamp |  |
| vol | string | true | Trade volume(Cont.). The value is 0. |  |
| count | string | true | count. The value is 0. |  |
| open | string | true | open price |  |
| close | string | true | close price |  |
| low | string | true | low price |  |
| high | string | true | high price |  |
| amount | string | true | amount based on coins. |  |
| TICK\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

#### Subscription Example

{

"req":

"market.BTC-USD.estimated\_rate.1min"

"id":

"id4"

"from":

1579247342

"to":

1579247342

}

#### Example of a Successful Subscription

{

"id":

"id7"

"status":

"ok"

"subbed":

"market.btc-usd.estimated\_rate.1min"

"ts":

1489474081631

}

#### Example of a Data Update

{

"ch":

"market.BTC-USD.estimated\_rate.1min"

"ts":

1603877220317

"tick":{

"id":

1603877220

"open":

"0.0001"

"close":

"0.0001"

"high":

"0.0001"

"low":

"0.0001"

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

"market.btc-usd.estimated\_rate.1min"

"id":

"id7"

}