# GET Query Index Kline Data

**Source:** [Query Index Kline Data](https://www.htx.com/en-us/opend/newApiPages/?id=28c2eaf2-77ae-11ed-9966-0242ac110003)

**Category:** Future Market Data interface

## Authentication

Required (Private Endpoint)

### /index/market/history/index (Query Index Kline Data)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: all products(futures, coin margined swap, usdt margined Contracts ) 800 times/second for one IP at most

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbol | string | true | index symbol |  | Case-Insenstive.Both uppercase and lowercase are supported..e.g."BTC-USD","ETH-USD"... |
| period | string | true | kline type |  | 1min, 5min, 15min, 30min, 60min,4hour,1day, 1mon |
| size | integer | true | data size |  | \[1,2000\] |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| ch | string | true | data channel |  |
| DATA\_START |  | false | object |  |
| id | decimal | true | index kline id,the same as kline timestamp, kline start timestamp |  |
| vol | decimal | true | Trade Volume(Cont.) The value is 0 |  |
| count | decimal | true | Order Quantity The value is 0 |  |
| open | decimal | true | Opening Index Price |  |
| close | decimal | true | Closing Index Price, the price in the last kline is the latest order price |  |
| low | decimal | true | Lowest Index Price |  |
| high | decimal | true | Highest Index Price |  |
| amount | decimal | true | Trade Amount(Coin), The value is 0. ) |  |
| DATA\_END |  | false |  |  |
| status | string | true | process status |  |
| ts | long | true | timestamp of the response of the server |  |

#### Request example

`curl"https://api.hbdm.com/index/market/history/index?symbol=BTC-USD&period=1min&size=150"`

#### Response Example

##### Success Example

{

"ch":

"market.BTC-USD.index.60min"

"data":\[

0:{

"amount":

0

"close":

13703.4175

"count":

0

"high":

13720.84

"id":

1604293200

"low":

13658.245

"open":

13709.6175

"vol":

0

}

1:{

"amount":

0

"close":

13751.6

"count":

0

"high":

13771.21

"id":

1604296800

"low":

13693.16

"open":

13703.365

"vol":

0

}

\]

"status":

"ok"

"ts":

1604299755097

}