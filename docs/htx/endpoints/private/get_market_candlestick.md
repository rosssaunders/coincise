# GET Market Candlestick

**Source:**
[Market Candlestick](https://www.htx.com/en-us/opend/newApiPages/?id=7ec53241-7773-11ed-9966-0242ac110003)

**Category:** Websocket Market Data

## Authentication

Required (Private Endpoint)

### market.$symbol$.kline.$period$ ( Market Candlestick)

Signature verification: No

Interface description: This topic sends a new candlestick whenever it is
available.

#### Subscription Address

| Environment                         | Address                    |
| ----------------------------------- | -------------------------- |
| Online                              | wss://api.huobi.pro/ws     |
| Online (preferred by aws customers) | wss://api-aws.huobi.pro/ws |

#### Request Parameter

| Field Name | Type   | Description                            |
| ---------- | ------ | -------------------------------------- |
| ch         | string | Required； Operator Name， sub、unsub; |
| params     | string | parameters                             |
| cid        | string | request id                             |

#### Rule description

| Subscribe(sub)                                                                       | Unsubscribe( unsub )                                                                 | Rule        |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ----------- |
| "market.btcusdt.kline.1min"                                                          | "market.btcusdt.kline.1min"                                                          | Allowed     |
| "market.btcusdt.kline.1min","market.ethusdt.kline.5min","market.solusdt.kline.15min" | "market.btcusdt.kline.1min","market.ethusdt.kline.5min","market.solusdt.kline.15min" | Allowed     |
| "market.btcusdt.kline.1min","market.ethusdt.kline.5min","market.solusdt.kline.15min" | "market.btcusdt.kline.30min"                                                         | Not Allowed |

#### Subscription Parameter

| Parameter | Data Type | Required | Description          | Value Range                                                                                                                                                       | Default Value |
| --------- | --------- | -------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| symbol    | Array     | false    | Trading symbol       | All supported trading symbol, e.g. btcusdt, bccbtc. (to retrieve candlesticks for ETP NAV, symbol = ETP trading symbol + suffix 'nav'，for example: btc3lusdtnav) |               |
| period    | Array     | false    | Candlestick interval | 1min, 5min, 15min, 30min, 60min, 4hour, 1day, 1mon, 1week, 1year                                                                                                  |               |
| cid       | string    | false    | Current request's ID |                                                                                                                                                                   |               |

#### Data Update

| Parameter  | Data Type | Required | Description                                                      | Value Range |
| ---------- | --------- | -------- | ---------------------------------------------------------------- | ----------- |
| ch         | string    | false    | Data belonged channel，Format：market.$symbol.kline.$period      |             |
| ts         | long      | false    | Time of Respond Generation, Unit: Millisecond                    |             |
| TICK_START | object    | false    |                                                                  |             |
| id         | integer   | false    | UNIX epoch timestamp in second as response id                    |             |
| amount     | float     | false    | Aggregated trading volume during the interval (in base currency) |             |
| count      | integer   | false    | Number of trades during the interval                             |             |
| open       | float     | false    | Opening price during the interval                                |             |
| close      | float     | false    | Closing price during the interval                                |             |
| low        | float     | false    | Low price during the interval                                    |             |
| high       | float     | false    | High price during the interval                                   |             |
| vol        | float     | false    | Aggregated trading value during the interval (in quote currency) |             |
| TICK_END   |           | false    |                                                                  |             |

#### Subscription Example

{

"id":

"id1"

"sub":\[

0

:

"market.btcusdt.kline.1min"

1

:

"market.ethusdt.kline.5min"

2

:

"market.solusdt.kline.15min"

\]

}

#### Example of a Successful Subscription

{

"id":

"id1"

"status":

"ok"

"subbed":

"market.ethbtc.kline.1min"

"ts":

1489474081631

}

#### Example of a Data Update

{

"ch":

"market.ethbtc.kline.1min"

"ts":

1630981694370

"tick":{

"id":

1630981680

"open":

0.074849

"close":

0.074848

"low":

0.074848

"high":

0.074849

"amount":

2.4448

"vol":

0.1829884187

"count":

3

}

}

#### Example of a Subscription Cancellation

{

"unsub":

"market.ethbtc.kline.1min"

"id":

"id1"

}
