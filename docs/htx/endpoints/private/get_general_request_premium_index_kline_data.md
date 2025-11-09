# GET [General] Request Premium Index Kline Data

**Source:** [[General] Request Premium Index Kline Data](https://www.htx.com/en-us/opend/newApiPages/?id=8cb7d029-77b5-11ed-9966-0242ac110003)

**Category:** WebSocket Index and Basis Interface

## Authentication

Required (Private Endpoint)

### market.$contract\_code.premium\_index.$period (\[General\] Request Premium Index Kline Data)

Signature verification: Yes

Interface permission: Read

Rate Limit: For public interface to get market data such as Get Kline data, Get Market Data Overview, Get Contract Information,Get market in-depth data, Get premium index Kline, Get real-time forecast capital rate kline, Get basis data, Get the last Trade of a Contract and so on： For websocket: The rate limit for “req” request is 50 times at once. No limit for “sub” request as the data will be pushed by sever voluntarily.

Interface description: The interface supports cross margin mode and isolated margin mode.

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
| contract\_code | string | true | contract code | Case-Insenstive.Both uppercase and lowercase are supported.."BTC-USDT","ETH-USDT"... |  |
| period | string | true | kline type | 1min, 5min, 15min, 30min, 60min,4hour,1day, 1week, 1mon |  |

Notes:  
Pushed once the index data is updated.

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| rep | string | true | Data channel，Format： market.period |  |
| status | string | true | Request processing result |  |
| id | string | true | ID |  |
| wsid | long | true | wsid |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |
| DATA\_START | object array | true |  |  |
| id | long | true | index kline id,the same as kline timestamp, kline start timestamp |  |
| vol | string | true | Trade Volume(Cont.). The value is 0. |  |
| count | string | true | count. The value is 0. |  |
| open | string | true | open index price |  |
| close | string | true | close index price |  |
| low | string | true | lowest index price |  |
| high | string | true | highest index price |  |
| amount | string | true | amount based on coins. |  |
| DATA\_END |  | false |  |  |

#### Subscription Example

{

"req":

"market.BTC-USDT.premium\_index.1min"

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

"id4"

"rep":

"market.BTC-USDT.premium\_index.15min"

"wsid":

1524762738

"ts":

1603782744066

"status":

"ok"

"data":\[

0:{

"id":

1603641600

"open":

"0"

"close":

"0.0000970833333333"

"low":

"0"

"high":

"0.0000997916666666"

"amount":

"0"

"vol":

"0"

"count":

"0"

}

\]

}

#### Example of a Data Update

No data

#### Example of a Subscription Cancellation

No data