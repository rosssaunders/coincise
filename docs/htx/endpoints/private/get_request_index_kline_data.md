# GET Request Index Kline Data

**Source:** [Request Index Kline Data](https://www.htx.com/en-us/opend/newApiPages/?id=5d514b52-77b6-11ed-9966-0242ac110003)

**Category:** WebSocket Index and Basis Interface

## Authentication

Required (Private Endpoint)

### market.$contract\_code.index.$period (Request Index Kline Data)

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
| from | long | true | start time, from 3017-07-38T00:00:00+08:00 to 3050-01-01T00:00:00+08:00. timestamp unit：seconds |  |  |
| to | long | true | end time, from 3017-07-38T00:00:00+08:00 to 3050-01-01T00:00:00+08:00. timestamp unit：seconds. larger than 'from' value |  |  |
| contract\_code | string | true | index symbol | Case-Insenstive.Both uppercase and lowercase are supported.."BTC-USD","ETH-USD"… |  |
| period | string | true | kline type | 1min, 5min, 15min, 30min, 60min,4hour,1day, 1mon |  |

Notes:  
Pushed once the index data is changed.

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| req | string | true | Data channel，Format：market.$contract\_code.index.$period |  |
| status | string | true | Request processing result |  |
| id | string | true | ID |  |
| wsid | long | true | wsid |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |
| TICK\_START | object array | false |  |  |
| id | decimal | true | index kline id,the same as kline timestamp,kline start timestamp |  |
| vol | decimal | true | Trade Volume. The value is 0. |  |
| count | decimal | true | count. The value is 0. |  |
| open | decimal | true | open index price |  |
| close | decimal | true | close index price |  |
| low | decimal | true | lowest index price |  |
| high | decimal | true | highest index price |  |
| amount | decimal | true | amount based on coins. |  |
| TICK\_END |  | false |  |  |

#### Subscription Example

{

"sub":

"market.BTC-USD.kline.1min"

"id":

"id1"

}

#### Example of a Successful Subscription

{

"id":

"id4"

"rep":

"market.BTC-USD.index.60min"

"wsid":

915217437

"status":

"ok"

"data":\[

0:{

"id":

1604160000

"open":

13862.65

"close":

13832.615

"low":

13822.41

"high":

13890.2225

"amount":

0

"vol":

0

"count":

0

}

1:{

"id":

1604163600

"open":

13832.7725

"close":

13788.6625

"low":

13751.9075

"high":

13833.41

"amount":

0

"vol":

0

"count":

0

}

\]

}

#### Example of a Data Update

No data

#### Example of a Subscription Cancellation

No data