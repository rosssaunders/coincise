# GET the Last 24h Market Summary

**Source:** [Get the Last 24h Market Summary](https://www.htx.com/en-us/opend/newApiPages/?id=7ec4a2cd-7773-11ed-9966-0242ac110003)

**Category:** Market Data

## Authentication

Required (Private Endpoint)

### /market/detail ( Get the Last 24h Market Summary)

Request type: GET

Signature verification: No

Rate Limit: 4,500 5 minutes

Interface description: This endpoint retrieves the summary of trading in the market for the last 24 hours.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbol | string | false | The trading symbol to query | Refer to /v1/common/symbols |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false | Request Processing Result "ok","error" |  |
| ch | string | false | Data belonged channel，Format： market.$symbol.detail |  |
| ts | long | false | Time of Respond Generation, Unit: Millisecond |  |
| TICK\_START | object | false |  |  |
| id | integer | false | The internal identity |  |
| amount | float | false | The aggregated trading volume in USDT of last 24 hours (rotating 24h) |  |
| count | integer | false | The number of completed trades of last 24 hours (rotating 24h) |  |
| open | float | false | The opening price of last 24 hours (rotating 24h) |  |
| close | float | false | The closing price of last 24 hours (rotating 24h) |  |
| low | float | false | The lowest price of last 24 hours (rotating 24h) |  |
| high | float | false | The highest price of last 24 hours (rotating 24h) |  |
| vol | float | false | The trading volume in base currency of last 24 hours (rotating 24h) |  |
| version | integer | false | Internal data |  |
| TICK\_END |  | false |  |  |

#### Request example

`curl"https://api.huobi.pro/market/detail?symbol=ethusdt"`

#### Response Example

##### Success Example

{

"ch":

"market.btcusdt.detail"

"status":

"ok"

"ts":

1629795484817

"tick":{

"id":

272164011416

"low":

48767.7

"high":

50500.6

"open":

50266.89

"close":

49728.71

"vol":

601037933.6834868

"amount":

12110.642402972368

"version":

272164011416

"count":

420452

}

}