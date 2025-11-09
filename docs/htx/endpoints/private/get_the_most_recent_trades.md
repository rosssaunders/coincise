# GET the Most Recent Trades

**Source:**
[Get the Most Recent Trades](https://www.htx.com/en-us/opend/newApiPages/?id=7ec4a59d-7773-11ed-9966-0242ac110003)

**Category:** Market Data

## Authentication

Required (Private Endpoint)

### /market/history/trade ( Get the Most Recent Trades)

Request type: GET

Signature verification: No

Rate Limit: 3,000 5 minutes

Interface description: This endpoint retrieves the most recent trades with their
price, volume, and direction.

#### Request Address

| Environment                         | Address                   |
| ----------------------------------- | ------------------------- |
| Online                              | https://api.huobi.pro     |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description                 | Value Range                                                                        | Default Value |
| --------- | --------- | -------- | --------------------------- | ---------------------------------------------------------------------------------- | ------------- |
| symbol    | string    | false    | The trading symbol to query | All supported trading symbol, e.g. btcusdt, bccbtc.Refer to GET /v1/common/symbols |               |
| size      | integer   | false    | The number of data returns  | \[1-2000\]                                                                         | 1             |

#### Response Parameter

| Parameter  | Data Type | Required | Description                                                   | Value Range |
| ---------- | --------- | -------- | ------------------------------------------------------------- | ----------- |
| status     | string    | false    | Request Processing Result "ok","error"                        |             |
| ch         | string    | false    | Data belonged channel，Format：market.$symbol.trade.detail    |             |
| ts         | long      | false    | Time of Respond Generation, Unit: Millisecond                 |             |
| DATA_START | object    | false    |                                                               |             |
| id         | long      | false    | global transaction ID                                         |             |
| ts         | long      | false    | Latest Creation Time                                          |             |
| DATA_START | object    | false    |                                                               |             |
| id         | integer   | false    | The unique trade id of this trade (to be obsoleted)           |             |
| trade-id   | integer   | false    | The unique trade id (NEW)                                     |             |
| amount     | float     | false    | The trading volume in base currency                           |             |
| price      | float     | false    | The trading price in quote currency                           |             |
| ts         | integer   | false    | The UNIX timestamp in milliseconds adjusted to Singapore time |             |
| direction  | string    | false    | The direction of the taker trade: 'buy' or 'sell'             |             |
| DATA_END   |           | false    |                                                               |             |
| DATA_END   |           | false    |                                                               |             |

Notes:  
The returned data object is an array which represents one recent timestamp; each
timestamp object again is an array which represents all trades occurred at this
timestamp.

#### Request example

`curl"https://api.huobi.pro/market/history/trade?symbol=btcusdt&size=2"`

#### Response Example

##### Success Example

{

"ch":

"market.btcusdt.trade.detail"

"status":

"ok"

"ts":

1629793657842

"data":\[

0:{

"id":

136108764379

"ts":

1629793656939

"data":\[

0:{

"id":

1.361087643793484e+26

"ts":

1629793656939

"trade-id":

102517381182

"amount":

0.000124

"price":

49656.4

"direction":

"buy"

}

\]

}

1:{

"id":

136108763320

"ts":

1629793656198

"data":\[

0:{

"id":

1.361087633203484e+26

"ts":

1629793656198

"trade-id":

102517381181

"amount":

0.01125

"price":

49655

"direction":

"buy"

}

1:{

"id":

1.361087633203484e+26

"ts":

1629793656198

"trade-id":

102517381180

"amount":

0.00083

"price":

49651.35

"direction":

"buy"

}

\]

}

\]

}
