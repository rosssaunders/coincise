# GET Best Bid/Offer

**Source:**
[Best Bid/Offer](https://www.htx.com/en-us/opend/newApiPages/?id=7ec5333f-7773-11ed-9966-0242ac110003)

**Category:** Websocket Market Data

## Authentication

Required (Private Endpoint)

### market.$symbol.bbo ( Best Bid/Offer)

Signature verification: No

Interface description: User can receive BBO (Best Bid/Offer) update in tick by
tick mode.

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

| Subscribe(sub)                                                 | Unsubscribe( unsub )                                           | Rule        |
| -------------------------------------------------------------- | -------------------------------------------------------------- | ----------- |
| "market.btcusdt.bbo"                                           | "market.btcusdt.bbo"                                           | Allowed     |
| "market.btcusdt.bbo","market.ethusdt.bbo","market.htxusdt.bbo" | "market.btcusdt.bbo","market.ethusdt.bbo","market.htxusdt.bbo" | Allowed     |
| "market.btcusdt.bbo","market.ethusdt.bbo","market.htxusdt.bbo" | "market.bnbusdt.bbo"                                           | Not Allowed |

#### Subscription Parameter

| Parameter | Data Type | Required | Description          | Value Range                     | Default Value |
| --------- | --------- | -------- | -------------------- | ------------------------------- | ------------- |
| symbol    | Array     | false    | Trading symbol       | Refer to GET /v1/common/symbols |               |
| cid       | string    | false    | Current request's ID |                                 |               |

#### Data Update

| Parameter  | Data Type | Required | Description                                                 | Value Range |
| ---------- | --------- | -------- | ----------------------------------------------------------- | ----------- |
| ch         | string    | false    | Data belonged channel，Format：market.$symbol.kline.$period |             |
| ts         | long      | false    | Time of Respond Generation, Unit: Millisecond               |             |
| DATA_START | object    | false    |                                                             |             |
| symbol     | string    | false    | Trading symbol                                              |             |
| quoteTime  | long      | false    | Quote time                                                  |             |
| bid        | float     | false    | Best bid                                                    |             |
| bidSize    | float     | false    | Best bid size                                               |             |
| ask        | float     | false    | Best ask                                                    |             |
| askSize    | float     | false    | Best ask size                                               |             |
| seqId      | int       | false    | Sequence number                                             |             |
| DATA_END   |           | false    |                                                             |             |

#### Subscription Example

{

"sub":\[

0

:

"market.btcusdt.bbo"

1

:

"market.ethusdt.bbo"

2

:

"market.htxusdt.bbo"

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

"market.btcusdt.bbo"

"ts":

1489474081631

}

#### Example of a Data Update

{

"ch":

"market.btcusdt.bbo"

"ts":

1630994555540

"tick":{

"seqId":

137005210233

"ask":

52665.02

"askSize":

1.502181

"bid":

52665.01

"bidSize":

0.178567

"quoteTime":

1630994555539

"symbol":

"btcusdt"

}

}

#### Example of a Subscription Cancellation

{

"unsub":

"market.btcusdt.bbo"

"id":

"id1"

}
