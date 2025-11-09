# GET Market By Price (incremental update)

**Source:**
[Market By Price (incremental update)](https://www.htx.com/en-us/opend/newApiPages/?id=7ec5362b-7773-11ed-9966-0242ac110003)

**Category:** Websocket Market Data

## Authentication

Required (Private Endpoint)

### market.$symbol.mbp.$levels ( Market By Price (incremental update))

Signature verification: No

Interface description: User could subscribe to this channel to receive
incremental update of Market By Price order book. Refresh message, the full
image of the order book, are acquirable from the same channel, upon "req"
request. Under the premise of the same link and the same currency, assuming that
you subscribe to both market.$symbol.mbp.$levels and
market.$symbol.mbp.refresh.$levels, the data will be pushed in the following
order. Push in this order: Incremental ----> Full MBP incremental channel & its
REQ channel) wss://api.huobi.pro/feed or wss://api-aws.huobi.pro/feed Suggested
downstream data processing: 1) Subscribe to incremental updates and start to
cache them; 2) Request refresh message (with same number of levels), and base on
its "seqNum" to align it with the cached incremental message which has the same
"prevSeqNum"; 3) Start to continuously process incremental messages to build up
MBP book; 4) The "prevSeqNum" of the current incremental message must be the
same with "seqNum" of the previous message, otherwise it implicates message loss
which should require another round of refresh message retrieval and
alignment; 5) Once received a new price level from incremental message, that
price level should be inserted into appropriate position of existing MBP
book; 6) Once received an updated "size" at the existing price level from
incremental message, the size should be replaced directly by the new value; 7)
Once received a "size=0" at existing price level from incremental message, that
price level should be removed from MBP book; 8) If one incremental message
includes updates of multiple price levels, all of those levels should be updated
simultaneously in MBP book. Currently HTX only supports 5-level/20-level MBP
incremental channel and 150-level/400-level incremental channel, the differences
between them are - 1) Different depth of market. 2) 5-level/20-level incremental
MBP is a tick by tick feed, which means whenever there is an order book change
at that level, it pushes an update; 150-levels/400-level incremental MBP feed is
based on the gap between two snapshots at 100ms interval. 3) While there is
single side order book update, either bid or ask, the incremental message sent
from 5-level/20-level MBP feed only contains that side update. But the
incremental message from 150-levels/400-level MBP feed contains not only that
side update and also a blank object for another side. In the near future, HTX
will align the update behavior of 150-level//400-level incremental channel with
5-level/20-level, which means while single side order book changed (either bid
or ask), the update message will be no longer including a blank object for
another side. 4) While there is nothing change between two snapshots in past
100ms, the 150-levels/400-level incremental MBP feed still sends out a message
which contains two blank objects – bids & asks. But 5-level/20-level incremental
channel won’t disseminate any update in such a case. In the future, HTX will
align the update behavior of 150-level/400-level incremental channel with
5-level/20-level, which means while there is no order book change at all, the
channel will be no longer disseminating messages of blank object any more. 5)
20-level incremental channel only supports the following symbols at this stage:
btcusdt, ethusdt, xrpusdt, eosusdt, ltcusdt, etcusdt, adausdt, dashusdt,
bsvusdt, htusdt, dotusdt, linkusdt, iotausdt, zecusdt, trxusdt, xmrusdt, arusdt,
dfausdt, nftusdt, uniusdt, dogeusdt, solusdt, xecusdt, lunausdt, bchusdt,
maticusdt, vetusdt, xlmusdt, filusdt, thetausdt. while 150-level/400-level
incremental channel supports all symbols. 6) All trading pairs support 5-level
incremental push. REQ channel supports refreshing message for 5-level, 20-level,
and 150-level.

#### Subscription Address

| Environment                         | Address                      |
| ----------------------------------- | ---------------------------- |
| Online                              | wss://api.huobi.pro/feed     |
| Online (preferred by aws customers) | wss://api-aws.huobi.pro/feed |

#### Request Parameter

| Field Name | Type   | Description                            |
| ---------- | ------ | -------------------------------------- |
| ch         | string | Required； Operator Name， sub、unsub; |
| params     | string | parameters                             |
| cid        | string | request id                             |

#### Rule description

| Subscribe(sub)                                                       | Unsubscribe( unsub )                                                 | Rule        |
| -------------------------------------------------------------------- | -------------------------------------------------------------------- | ----------- |
| "market.btcusdt.mbp.5"                                               | "market.btcusdt.mbp.5"                                               | Allowed     |
| "market.btcusdt.mbp.5","market.ethusdt.mbp.5","market.htxusdt.mbp.5" | "market.btcusdt.mbp.5","market.ethusdt.mbp.5","market.htxusdt.mbp.5" | Allowed     |
| "market.btcusdt.mbp.5","market.ethusdt.mbp.5","market.htxusdt.mbp.5" | "market.bnbusdt.mbp.5"                                               | Not Allowed |

#### Subscription Parameter

| Parameter | Data Type | Required | Description                                        | Value Range                                                                        | Default Value |
| --------- | --------- | -------- | -------------------------------------------------- | ---------------------------------------------------------------------------------- | ------------- |
| symbol    | Array     | false    | Trading symbol (wildcard inacceptable)             |                                                                                    |               |
| levels    | Array     | false    | Number of price levels (Valid value: 5,20,150,400) | Only support the number of price levels at 5, 20,150 or 400 at this point of time. |               |
| cid       | string    | false    | Current request's ID                               |                                                                                    |               |

#### Data Update

| Parameter  | Data Type | Required | Description                                                    | Value Range |
| ---------- | --------- | -------- | -------------------------------------------------------------- | ----------- |
| seqNum     | integer   | false    | Sequence number of the message                                 |             |
| prevSeqNum | integer   | false    | Sequence number of previous message                            |             |
| bids       | object    | false    | Bid side, (in descending order of "price"), \["price","size"\] |             |
| asks       | object    | false    | Ask side, (in ascending order of "price"), \["price","size"\]  |             |

#### Subscription Example

{

"sub":\[

0

:

"market.btcusdt.mbp.5"

1

:

"market.ethusdt.mbp.5"

2

:

"market.htxusdt.mbp.5"

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

"market.btcusdt.mbp.5"

"ts":

1489474081631

}

#### Example of a Data Update

{

"ch":

"market.btcusdt.mbp.5"

"ts":

1573199608679

"tick":{

"seqNum":

100020146795

"prevSeqNum":

100020146794

"asks":\[

0:\[

0

:

645.14

1

:

26.75597395914065

\]

\]

}

}

#### Example of a Subscription Cancellation

{

"unsub":

"market.btcusdt.mbp.5"

"id":

"id1"

}
