# GET [General] Request Estimated Funding Rate Kline Data

**Source:** [[General] Request Estimated Funding Rate Kline Data](https://www.htx.com/en-us/opend/newApiPages/?id=8cb7d291-77b5-11ed-9966-0242ac110003)

**Category:** WebSocket Index and Basis Interface

## Authentication

Required (Private Endpoint)

### market.$contract\_code.estimated\_rate.$period (\[General\] Request Estimated Funding Rate Kline Data)

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

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| rep | string | true | Data channel, Format： market.period |  |
| status | string | true | Request status | "ok" , "error" |
| id | string | true | ID |  |
| wsid | long | true | wsid |  |
| ts | long | true | Time of Respond Generation, unit: millisecond |  |
| DATA\_START | object array | true |  |  |
| id | long | true | index kline id,the same as kline timestamp |  |
| vol | string | true | Trade Volume(Cont.). The value is 0. |  |
| count | string | true | count. The value is 0. |  |
| open | string | true | open index price |  |
| close | string | true | close index price |  |
| low | string | true | lowest index price |  |
| high | string | true | highest index price |  |
| amount | string | true | amount based on coins. |  |
| trade\_turnover | string | true | Transaction amount, the value is 0. |  |
| DATA\_END |  | false |  |  |

#### Subscription Example

{

"req":

"market.BTC-USDT.estimated\_rate.1min"

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

"id4"

"rep":

"market.BTC-USDT.estimated\_rate.15min"

"wsid":

3674722864

"ts":

1603782867314

"status":

"ok"

"data":\[

0:{

"id":

1603641600

"open":

"0.0001"

"close":

"0.0001"

"low":

"0.0001"

"high":

"0.0001"

"amount":

"0"

"vol":

"0"

"count":

"0"

"trade\_turnover":

"0"

}

\]

}

#### Example of a Data Update

No data

#### Example of a Subscription Cancellation

No data