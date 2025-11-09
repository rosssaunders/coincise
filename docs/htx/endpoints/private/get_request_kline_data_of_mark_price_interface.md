# GET Request Kline Data of Mark Price interface

**Source:** [Request Kline Data of Mark Price interface](https://www.htx.com/en-us/opend/newApiPages/?id=28c34584-77ae-11ed-9966-0242ac110003)

**Category:** WebSocket Index and Basis Interface

## Authentication

Required (Private Endpoint)

### market.$symbol.mark\_price.$period (Request Kline Data of Mark Price interface)

Signature verification: No

Interface permission: Read

Rate Limit: The rate limit for “req” request is 50 times at once. No limit for “sub” request as the data will be pushed by sever voluntarily.

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
| symbol | string | true | symbol |  | "BTC\_CW" represents BTC “This Week”, "BTC\_NW" represents BTC “Next Week”, "BTC\_CQ" represents BTC “Quarter”."BTC\_NQ" represents BTC “Next Quarter”. Contract code is supported to query data. e.g.: "BTC200918"(weekly), "BTC200925"(Bi-weekly),"BTC201225"(quarterly),"BTC210326"(next quarterly) |
| period | string | true | kline period |  | 1min, 5min, 15min, 30min, 60min,4hour,1day, 1week, 1mon |

Notes:  
At one time 2000 at most

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| rep | string | true | channel |  |
| status | string | true | status | "ok" , "error" |
| id | string | true | as same as request id |  |
| wsid | long | true | wsid |  |
| ts | number | true | Time of Respond Generation, Unit: Millisecond |  |
| DATA\_START | object array | true |  |  |
| id | long | true | kline id |  |
| vol | string | true | trade vol(cont), value is 0 |  |
| count | string | true | trade count, value is 0 |  |
| open | string | true | open price |  |
| close | string | true | close price |  |
| low | string | true | low price |  |
| high | string | true | high price |  |
| amount | string | true | trade amount(coin), value is 0 |  |
| DATA\_END |  | false |  |  |

Notes:  
Data will be available after the marked price goes online on March 15, 2021. Please be aware that there is no historical data before.

#### Subscription Example

{

"req":

"market.BTC\_CW.mark\_price.1imin"

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

"market.BTC\_CW.mark\_price.15min"

"wsid":

2998253842

"ts":

1615773843201

"status":

"ok"

"data":\[

0:{

"id":

1615651200

"open":

"60284.67"

"close":

"60362.04"

"low":

"60270.85"

"high":

"60468.55"

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