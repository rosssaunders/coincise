# GET the Last Trade

**Source:** [Get the Last Trade](https://www.htx.com/en-us/opend/newApiPages/?id=7ec4aa2b-7773-11ed-9966-0242ac110003)

**Category:** Market Data

## Authentication

Required (Private Endpoint)

### /market/trade ( Get the Last Trade)

Request type: GET

Signature verification: No

Rate Limit: 4,500 5 minutes

Interface description: This endpoint retrieves the latest trade with its price, volume, and direction.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbol | string | false | The trading symbol to query | Refer to GET /v1/common/symbols |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false | Request Processing Result "ok","error" |  |
| ch | string | false | Data belonged channel，Format：market.$symbol.trade.detail |  |
| ts | long | false | Time of Respond Generation, Unit: Millisecond |  |
| TICK\_START | object | false |  |  |
| id | long | false | global transaction ID |  |
| ts | long | false | Latest Creation Time |  |
| DATA\_START | object | false |  |  |
| id | integer | false | The unique trade id of this trade (to be obsoleted) |  |
| trade-id | integer | false | The unique trade id (NEW) |  |
| amount | float | false | The trading volume in base currency |  |
| price | float | false | The trading price in quote currency |  |
| ts | integer | false | The UNIX timestamp in milliseconds adjusted to Singapore time |  |
| direction | string | false | The direction of the taker trade: 'buy' or 'sell' |  |
| DATA\_END |  | false |  |  |
| TICK\_END |  | false |  |  |

#### Request example

`curl"https://api.huobi.pro/market/trade?symbol=btcusdt"`

#### Response Example

##### Success Example

{

"ch":

"market.btcusdt.trade.detail"

"status":

"ok"

"ts":

1629792192037

"tick":{

"id":

136107843051

"ts":

1629792191928

"data":\[

0:{

"id":

1.361078430513484e+26

"ts":

1629792191928

"trade-id":

102517374388

"amount":

0.028416

"price":

49806

"direction":

"buy"

}

1:{

"id":

1.361078430513484e+26

"ts":

1629792191928

"trade-id":

102517374387

"amount":

0.025794

"price":

49806

"direction":

"buy"

}

\]

}

}