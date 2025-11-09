# GET 【Public】Depth-Increase Channel

**Source:**
[【Public】Depth-Increase Channel](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Not Required (Public Endpoint)

## 【Public】Depth-Increase Channel

Return depth data, support the creation of a local full depth cache data

### Pushing Rules

1.  No user login required
2.  After subscribing, the current data will be returned directly, and then the
    changes will be pushed

### Request

> Subscribe Request

`{   "action":"subscribe",   "args":["futures/depthIncrease20:BTCUSDT@200ms"] }`

> Full depth snapshot data Request

`{   "action": "request",   "args":["futures/depthIncrease20:BTCUSDT@200ms"] }`

Message Format:

`{"action":"<op>","args":["<channel:symbol><@speed>"]}`

- op: `subscribe`\=Subscribe, You will receive a message that the subscription
  is successful, and then you will receive incremental depth data pushed in real
  time. `request`\=Single request for the latest depth snapshot, You will
  receive a full depth of data immediately.
- channel:Channel name, such as `futures/depthIncrease20`
- symbol: Trading pair, such as `BTCUSDT`
- speed: Update speed, support `200ms` or `100ms`

Parameters Channel Name List

| Channel Name            | Description            |
| ----------------------- | ---------------------- |
| futures/depthIncrease5  | 5 Level Depth Channel  |
| futures/depthIncrease20 | 20 Level Depth Channel |
| futures/depthIncrease50 | 50 Level Depth Channel |

### Response

> Full depth snapshot data

`{     "data": {         "symbol": "BTCUSDT",         "asks": [             {                 "price": "70391.6",                 "vol": "3550"             }         ],         "bids": [             {                 "price": "70391.2",                 "vol": "1335"             }         ],         "ms_t": 1730400086184,         "version": 980361,         "type": "snapshot"     },     "group": "futures/depthIncrease20:BTCUSDT@200ms" }`

> Incremental depth data

`{     "data": {         "symbol": "BTCUSDT",         "asks": [             {                 "price": "70395.3",                 "vol": "341"             },             {                 "price": "70395.4",                 "vol": "323"             }         ],         "bids": [             {                 "price": "70391.2",                 "vol": "0"             },             {                 "price": "70353.4",                 "vol": "11435"             }         ],         "ms_t": 1730400086194,         "version": 980362,         "type": "update"     },     "group": "futures/depthIncrease20:BTCUSDT@200ms" }`

Return data description:

| Field   | Type   | Description                             |
| ------- | ------ | --------------------------------------- |
| symbol  | String | Symbol of the contract (like `BTCUSDT`) |
| asks    | List   | Asks Depth Array                        |
| bids    | List   | Bids Depth Array                        |
| ms_t    | Long   | Data push timestamp (in millisecond)    |
| version | Long   | data version                            |
| type    | String | data type                               |

\-`snapshot`\=Full depth snapshot data  
\-`update`\=Incremental depth data |

**Instruction**

Description of the `asks` `bids` details field:

| Field | Type   | Description |
| ----- | ------ | ----------- |
| price | String | price       |
| vol   | String | volume      |

An example of the array of depths values: {"price":"20159.6","vol":"7284"}.
price field is the price, and vol field is the quantity.

### How to correctly maintain a copy of OrderBook locally:

1.  First, the client send a subscription request
    `{"action": "subscribe", "args": ["futures/depthIncrease20:<symbol>"] }`
2.  After successful subscription, you will receive two types of messages,
    type=`snapshot`(full data)和type=`update`(update)
3.  If a type=snapshot type message is received, update the deep snapshot
    content to the`local cache`. If there is no `local cache`, create one.
4.  If a type=update message is received, update the data in the deep snapshot
    to `local cache`. The update rules are as follows:
    - 4.1 If the field version number in the received new message is less than
      or equal to the version in the local cache(new version<=local version),
      this data can be discarded.
    - 4.2 If the field version number in the new message received is equal to
      the version in the local cache plus 1(new version==local version+1), the
      quantity of the corresponding price will be `updated to the local cache`.
    - 4.3 If the field version number in the new message received is greater
      than the version in the local cache plus 1(new version>local version+1),
      please obtain the latest depth snapshot from step 7 and overwrite the
      `local cache`.
5.  The pending order volume in each returned message represents the
    `absolute value` of the current pending order volume at this price, rather
    than the relative change.
6.  How to update local cache? Under the premise of 4.2:
    - 6.1 New: If the same price is not already in the local cache, it means
      that it is a new pending order and needs to be added to the cache.
    - 6.2 Modify or Remove: If the same price is already in the local cache, it
      means that the quantity has changed. If the quantity is 0, it will be
      directly removed from the cache. Otherwise, just change the quantity.
7.  Request through request
    `{"action": "request", "args": ["futures/depthIncrease20:<symbol>"] }`to
    obtain the latest depth snapshot (type=snapshot in the message), and add the
    depth The content in the snapshot is overwritten to the `local cache`, and
    then the logic continues from step 2.

- Abnormal Situation:
  1.  Because the depth snapshot has a limit on the number of price tiers, price
      tiers outside the initial snapshot and without quantity changes will not
      appear in the incremental depth update information. Therefore, even if all
      updates from the incremental depth are applied, these price brackets will
      not be visible in the local order book, so there may be some differences
      between the local order book and the real order book.
