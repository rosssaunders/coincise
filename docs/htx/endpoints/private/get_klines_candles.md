# GET Klines(Candles)

**Source:** [Get Klines(Candles)](https://www.htx.com/en-us/opend/newApiPages/?id=7ec4a4da-7773-11ed-9966-0242ac110003)

**Category:** Market Data

## Authentication

Required (Private Endpoint)

### /market/history/kline ( Get Klines(Candles))

Request type: GET

Signature verification: No

Rate Limit: 4,500 5 minutes

Interface description: This endpoint retrieves all klines in a specific range.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbol | string | false | The trading symbol to query | All trading symbol supported, e.g. btcusdt, bccbtcn (to retrieve candlesticks for ETP NAV, symbol = ETP trading symbol + suffix 'nav'，for example: btc3lusdtnav) |  |
| period | string | false | The period of each candle | 1min, 5min, 15min, 30min, 60min, 4hour, 1day, 1mon, 1week, 1year |  |
| size | integer | false | The number of data returns | \[1-2000\] | 150 |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false | Request Processing Result "ok","error" |  |
| ch | string | false | Data belonged channel，Format：market.$symbol.kline.$period |  |
| ts | long | false | Time of Respond Generation, Unit: Millisecond |  |
| DATA\_START | object | false |  |  |
| id | long | false | The UNIX timestamp in seconds as response id |  |
| amount | float | false | Accumulated trading volume, in base currency |  |
| count | integer | false | The number of completed trades |  |
| open | float | false | The opening price |  |
| close | float | false | The closing price |  |
| low | float | false | The low price |  |
| high | float | false | The high price |  |
| vol | float | false | Accumulated trading value, in quote currency |  |
| DATA\_END |  | false |  |  |

#### Request example

`curl"https://api.huobi.pro/market/history/kline?period=1day&size=200&symbol=btcusdt"`

#### Response Example

##### Success Example

{

"ch":

"market.btcusdt.kline.5min"

"status":

"ok"

"ts":

1629769247172

"data":\[

0:{

"id":

1629769200

"open":

49056.37

"close":

49025.51

"low":

49022.86

"high":

49056.38

"amount":

3.946281917950917

"vol":

193489.67275732

"count":

196

}

1:{

"id":

1629768900

"open":

48994.61

"close":

49056.37

"low":

48966.72

"high":

49072.46

"amount":

30.72223099519689

"vol":

1505870.732227976

"count":

1504

}

\]

}