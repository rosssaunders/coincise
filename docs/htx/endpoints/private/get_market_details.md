# GET Market Details

**Source:**
[Market Details](https://www.htx.com/en-us/opend/newApiPages/?id=7ec53561-7773-11ed-9966-0242ac110003)

**Category:** Websocket Market Data

## Authentication

Required (Private Endpoint)

### market.$symbol.detail ( Market Details)

Signature verification: No

Interface description: This topic sends the latest market stats with 24h
summary. It updates in snapshot mode, in frequency of no more than 10 times per
second.

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

| Subscribe(sub)                                                                         | Unsubscribe( unsub )                                                                   | Rule        |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ----------- |
| "market.btcusdt.depth.step0",                                                          | "market.btcusdt.depth.step0",                                                          | Allowed     |
| "market.btcusdt.depth.step0","market.ethusdt.depth.step0","market.trxusdt.depth.step0" | "market.btcusdt.depth.step0","market.ethusdt.depth.step0","market.trxusdt.depth.step0" | Allowed     |
| "market.btcusdt.depth.step0","market.ethusdt.depth.step0","market.trxusdt.depth.step0" | "market.bnbusdt.depth.step0",                                                          | Not Allowed |

#### Subscription Parameter

| Parameter | Data Type | Required | Description          | Value Range                     | Default Value |
| --------- | --------- | -------- | -------------------- | ------------------------------- | ------------- |
| symbol    | Array     | false    | Trading symbol       | Refer to GET /v1/common/symbols |               |
| cid       | string    | false    | Current request's ID |                                 |               |

#### Data Update

| Parameter  | Data Type | Required | Description                                              | Value Range |
| ---------- | --------- | -------- | -------------------------------------------------------- | ----------- |
| ch         | string    | false    | Data belonged channel，Format：market.btcusdt.detail     |             |
| ts         | long      | false    | Time of Respond Generation, Unit: Millisecond            |             |
| TICK_START | object    | false    |                                                          |             |
| id         | integer   | false    | UNIX epoch timestamp in second as response id            |             |
| amount     | float     | false    | Aggregated trading volume in past 24H (in base currency) |             |
| count      | integer   | false    | Number of trades in past 24H                             |             |
| open       | float     | false    | Opening price in past 24H                                |             |
| close      | float     | false    | Last price                                               |             |
| low        | float     | false    | Low price in past 24H                                    |             |
| high       | float     | false    | High price in past 24H                                   |             |
| vol        | float     | false    | Aggregated trading value in past 24H (in quote currency) |             |
| version    | long      | false    | version                                                  |             |
| TICK_END   |           | false    |                                                          |             |

#### Subscription Example

{

"sub":\[

0

:

"market.btcusdt.depth.step0"

1

:

"market.ethusdt.depth.step0"

2

:

"market.trxusdt.depth.step0"

\]

"id":

"id1"

}

#### Example of a Successful Subscription

{

"id":

"id1"

"status":

"ok"

"subbed":

"market.btcusdt.detail"

"ts":

1489474081631

}

#### Example of a Data Update

{

"ch":

"market.btcusdt.detail"

"ts":

1630998026649

"tick":{

"id":

273956868110

"low":

51000

"high":

52924.14

"open":

51823.62

"close":

52379.99

"vol":

727676440.200527

"amount":

13991.028076056185

"version":

273956868110

"count":

471348

}

}

#### Example of a Subscription Cancellation

{

"unsub":

"market.btcusdt.detail"

"id":

"id1"

}
