# GET Kline Data of Mark Price

**Source:** [Get Kline Data of Mark Price](https://www.htx.com/en-us/opend/newApiPages/?id=5d517ae2-77b6-11ed-9966-0242ac110003)

**Category:** Swap Market Data interface

## Authentication

Required (Private Endpoint)

### /index/market/history/swap\_mark\_price\_kline (Get Kline Data of Mark Price)

Request type: GET

Signature verification: No

Interface permission: Read

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code | "BTC-USD","ETH-USD"... |  |
| period | string | true | period type | 1min, 5min, 15min, 30min, 60min,4hour,1day, 1week,1mon |  |
| size | int | true | size | \[1,2000\] |  |

Notes:  
At one time 2000 at most  
The input parameters are not case sensitive and all support

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| ch | string | true | channel, formation: market.period |  |
| DATA\_START | object array | true |  |  |
| id | long | true | id |  |
| vol | string | true | trade vol(cont), value is 0 |  |
| count | string | true | trade count, value is 0 |  |
| open | string | true | open price |  |
| close | string | true | close price |  |
| low | string | true | low price |  |
| high | string | true | hight price |  |
| amount | string | true | trade amount(coin), value is 0 |  |
| trade\_turnover | string | true | trade turnover, value is 0 |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit：Millisecond |  |

#### Request example

`curl "https://api.hbdm.com/index/market/history/swap_mark_price_kline?contract_code=BTC-USD&period=1day&size=200"`

#### Response Example

##### Success Example

{

"ch":

"market.BTC-USD.mark\_price.5min"

"data":\[

0:{

"amount":

"0"

"close":

"37127.6145"

"count":

"0"

"high":

"37213.4724"

"id":

1611112800

"low":

"37127.6145"

"open":

"37200.3785"

"trade\_turnover":

"0"

"vol":

"0"

}

1:{

"amount":

"0"

"close":

"37200.1849"

"count":

"0"

"high":

"37249.2345"

"id":

1611113100

"low":

"37127.6145"

"open":

"37127.6145"

"trade\_turnover":

"0"

"vol":

"0"

}

\]

"status":

"ok"

"ts":

1611127713984

}