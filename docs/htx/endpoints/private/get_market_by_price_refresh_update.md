# GET Market By Price (refresh update)

**Source:**
[Market By Price (refresh update)](https://www.htx.com/en-us/opend/newApiPages/?id=7ec5378b-7773-11ed-9966-0242ac110003)

**Category:** Websocket Market Data

## Authentication

Required (Private Endpoint)

### market.$symbol.mbp.refresh.$levels ( Market By Price (refresh update))

Signature verification: No

Interface description: User could subscribe to this channel to receive refresh
update of Market By Price order book. The update interval is around 100ms.

#### Subscription Address

| Environment                         | Address                      |
| ----------------------------------- | ---------------------------- |
| Online                              | wss://api.huobi.pro/feed     |
| Online (preferred by aws customers) | wss://api-aws.huobi.pro/feed |

Notes: Originally, the wss://api.huobi.pro/ws and wss://api-aws.huobi.pro/ws
addresses will still provide services, but may be offline in the future.

#### Request Parameter

| Field Name | Type   | Description                            |
| ---------- | ------ | -------------------------------------- |
| ch         | string | Required； Operator Name， sub、unsub; |
| params     | string | parameters                             |
| cid        | string | request id                             |

#### Rule description

| Subscribe(sub)                                                                                  | Unsubscribe( unsub )                                                                            | Rule        |
| ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ----------- |
| "market.btcusdt.mbp.refresh.20"                                                                 | "market.btcusdt.mbp.refresh.20"                                                                 | Allowed     |
| "market.btcusdt.mbp.refresh.20","market.ethusdt.mbp.refresh.20","market.htxusdt.mbp.refresh.20" | "market.btcusdt.mbp.refresh.20","market.ethusdt.mbp.refresh.20","market.htxusdt.mbp.refresh.20" | Allowed     |
| "market.btcusdt.mbp.refresh.20","market.ethusdt.mbp.refresh.20","market.htxusdt.mbp.refresh.20" | "market.bnbusdt.mbp.5"                                                                          | Not Allowed |

#### Subscription Parameter

| Parameter | Data Type | Required | Description                            | Value Range | Default Value |
| --------- | --------- | -------- | -------------------------------------- | ----------- | ------------- |
| symbol    | Array     | false    | Trading symbol (wildcard inacceptable) |             |               |
| levels    | Array     | false    | Number of price levels                 | 5,10,20     |               |
| cid       | string    | false    | Current request's ID                   |             |               |

#### Data Update

| Parameter | Data Type | Required | Description                                                    | Value Range |
| --------- | --------- | -------- | -------------------------------------------------------------- | ----------- |
| seqNum    | integer   | false    | Sequence number of the message                                 |             |
| bids      | object    | false    | Bid side, (in descending order of "price"), \["price","size"\] |             |
| asks      | object    | false    | Ask side, (in ascending order of "price"), \["price","size"\]  |             |

#### Subscription Example

{

"sub":\[

0

:

"market.btcusdt.mbp.refresh.20"

1

:

"market.ethusdt.mbp.refresh.20"

2

:

"market.htxusdt.mbp.refresh.20"

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

"market.btcusdt.mbp.refresh.20"

"ts":

1489474081631

}

#### Example of a Data Update

{

"ch":

"market.btcusdt.mbp.refresh.20"

"ts":

1573199608679

"tick":{

"seqNum":

100020142010

"bids":\[

0:\[

0

:

618.37

1

:

71.594

\]

1:\[

0

:

423.33

1

:

77.726

\]

2:\[

0

:

223.18

1

:

47.997

\]

3:\[

0

:

219.34

1

:

24.82

\]

4:\[

0

:

210.34

1

:

94.463

\]

\]

"asks":\[

0:\[

0

:

650.59

1

:

14.909733438479636

\]

1:\[

0

:

650.63

1

:

97.996

\]

2:\[

0

:

650.77

1

:

97.465

\]

3:\[

0

:

651.23

1

:

83.973

\]

4:\[

0

:

651.42

1

:

34.465

\]

\]

}

}

#### Example of a Subscription Cancellation

{

"unsub":

"market.btcusdt.mbp.refresh.20"

"id":

"id1"

}
