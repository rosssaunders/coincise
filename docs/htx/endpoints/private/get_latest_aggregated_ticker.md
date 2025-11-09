# GET Latest Aggregated Ticker

**Source:** [Get Latest Aggregated Ticker](https://www.htx.com/en-us/opend/newApiPages/?id=7ec4a3b6-7773-11ed-9966-0242ac110003)

**Category:** Market Data

## Authentication

Required (Private Endpoint)

### /market/detail/merged ( Get Latest Aggregated Ticker)

Request type: GET

Signature verification: No

Rate Limit: 4,500 5 minutes

Interface description: This endpoint retrieves the latest ticker with some important 24h aggregated market data.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbol | string | false | The trading symbol to query | All supported trading symbol, e.g. btcusdt, bccbtc.Refer to /v1/common/symbols |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false | Request Processing Result "ok","error" |  |
| ch | string | false | Data belonged channel，Format：market.$symbol.detail.merged |  |
| ts | long | false | Time of Respond Generation, Unit: Millisecond |  |
| TICK\_START | object | false |  |  |
| id | long | false | The internal identity |  |
| amount | float | false | Accumulated trading volume of last 24 hours (rotating 24h), in base currency |  |
| count | integer | false | The number of completed trades (rotating 24h) |  |
| open | float | false | The opening price of last 24 hours (rotating 24h) |  |
| close | float | false | The last price of last 24 hours (rotating 24h) |  |
| low | float | false | The lowest price of last 24 hours (rotating 24h) |  |
| high | float | false | The highest price of last 24 hours (rotating 24h) |  |
| vol | float | false | Accumulated trading value of last 24 hours (rotating 24h), in quote currency |  |
| bid | object | false | The current best bid in format \[price, size\] |  |
| ask | object | false | The current best ask in format \[price, size\] |  |
| TICK\_END |  | false |  |  |

#### Request example

`curl"https://api.huobi.pro/market/detail/merged?symbol=ethusdt"`

#### Response Example

##### Success Example

{

"ch":

"market.btcusdt.detail.merged"

"status":

"ok"

"ts":

1629788763750

"tick":{

"id":

272156789143

"version":

272156789143

"open":

50080

"close":

49820.92

"low":

48767

"high":

50500

"amount":

12055.365781937457

"vol":

598561868.5709001

"count":

420573

"bid":\[

0

:

49819.48

1

:

2.58112

\]

"ask":\[

0

:

49819.49

1

:

0.002411

\]

}

}