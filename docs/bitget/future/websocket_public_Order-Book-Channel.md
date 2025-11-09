# Depth Channel

### Description[​](#description "Direct link to Description")

This is the channel to get the depth data  
Default data push frequency for `books`, `books5`, `books15` is **150ms**  
Default data push frequency for `books1`:**100ms**

- `books`: All levels of depth. First update pushed is full data: `snapshot`,
  and then push the update data: `update`
- `books1`: 1st level of depth. Push `snapshot` each time
- `books5`: 5 depth levels. Push `snapshot` each time
- `books15`: 15 depth levels. Push `snapshot` each time
- The push frequency of the order book channel (books1) is optimized to 20ms.
  The symbols for this optimization are: BTCUSDT, ETHUSDT, XRPUSDT, SOLUSDT,
  SUIUSDT, DOGEUSDT, ADAUSDT, PEPEUSDT, LINKUSDT, HBARUSDT

#### Checksum[​](#checksum "Direct link to Checksum")

Calculate Checksum

```
1. More than 25 levels of bid and askA local snapshot of market depth (only 2 levels of the orderbook are shown here, while 25 levels of orderbook should actually be intercepted):    "bids": [      [ 43231.1, 4 ],   //bid1      [ 43231,   6 ]    //bid2    ]    "asks": [      [ 43232.8, 9 ],   //ask1      [ 43232.9, 8 ]    //ask2    ]Build the string to check CRC32:"43231.1:4:43232.8:9:43231:6:43232.9:8"The sequence:"bid1[price:amount]:ask1[price:amount]:bid2[price:amount]:ask2[price:amount]"2. Less than 25 levels of bid or askA local snapshot of market depth:    "bids": [      [ 3366.1, 7 ] //bid1    ]    "asks": [      [ 3366.8, 9 ],    //ask1      [ 3368  , 8 ],    //ask2      [ 3372  , 8 ]     //ask3    ]Build the string to check CRC32:"3366.1:7:3366.8:9:3368:8:3372:8"The sequence:"bid1[price:amount]:ask1[price:amount]:ask2[price:amount]:ask3[price:amount]"
```

This mechanism can assist users in checking the accuracy of depth(order book)
data.

**Merging update data into snapshot**

After subscribe to the channel (such as `books` 400 levels) of
[Order book](#order-book-channel) , user first receive the initial snapshot of
market depth. Afterwards the incremental update is subsequently received, user
are responsible to update the snapshot from client side.

1.  If there are any levels with same price from the updates, compare the amount
    with the snapshot order book:

    If the amount is 0, delete this depth data.

    If the amount changes, replace the depth data.

2.  If there is no level in the snapshot with same price from the update, insert
    the update depth information into the snapshot sort by price (bid in
    descending order, ask in ascending order).

**Calculate Checksum**

Use the first 25 bids and asks in the local snapshot to build a string (where a
colon connects the price and amount in an ask or a bid), and then calculate the
CRC32 value (32-bit signed integer).

1.  When the bid and ask depth data exceeds 25 levels, each of them will
    intercept 25 levels of data, and the string to be checked is queued in a way
    that the bid and ask depth data are alternately arranged. Such as:
    `bid1[price:amount]`:`ask1[price:amount]`:`bid2[price:amount]`:`ask2[price:amount]`...
2.  When the bid or ask depth data is less than 25 levels, the missing depth
    data will be ignored. Such as:
    `bid1[price:amount]`:`ask1[price:amount]`:`ask2[price:amount]`:`ask3[price:amount]`...
3.  If price is '0.5000', DO NOT calculate the checksum by '0.5', please DO use
    the original value

Request Example

```
{    "op": "subscribe",    "args": [        {            "instType": "USDT-FUTURES",            "channel": "books5",            "instId": "BTCUSDT"        }    ]}
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter     | Type               | Required | Description                                                                                                                                      |
| :------------ | :----------------- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| op            | String             | Yes      | Operation, subscribe unsubscribe                                                                                                                 |
| args          | List&lt;Object&gt; | Yes      | List of channels to request subscription                                                                                                         |
| &gt; instType | String             | Yes      | Product type<br><code>USDT-FUTURES</code> USDT-M Futures<br><code>COIN-FUTURES</code> Coin-M Futures<br><code>USDC-FUTURES</code> USDC-M Futures |
| &gt; channel  | String             | Yes      | Channel name: <code>books/books1/books5/books15</code>                                                                                           |
| &gt; instId   | String             | Yes      | Product ID                                                                                                                                       |

Response Example

```
{    "event": "subscribe",    "arg": {        "instType": "USDT-FUTURES",        "channel": "books5",        "instId": "BTCUSDT"    }}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter     | Type   | Description                                                                                                                                      |
| :------------ | :----- | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| event         | String | Event,                                                                                                                                           |
| arg           | Object | Subscribed channels                                                                                                                              |
| &gt; instType | String | Product type<br><code>USDT-FUTURES</code> USDT-M Futures<br><code>COIN-FUTURES</code> Coin-M Futures<br><code>USDC-FUTURES</code> USDC-M Futures |
| &gt; channel  | String | Channel name, <code>books/books1/books5/books15</code>                                                                                           |
| &gt; instId   | String | Product ID, e.g. ETHUSDT                                                                                                                         |
| msg           | String | Error message                                                                                                                                    |
| code          | String | Error code, returned only on error                                                                                                               |

Push Data

```
{    "action": "snapshot",    "arg": {        "instType": "USDT-FUTURES",        "channel": "books5",        "instId": "BTCUSDT"    },    "data": [        {            "asks": [                [                    "27000.5",                    "8.760"                ],                [                    "27001.0",                    "0.400"                ]            ],            "bids": [                [                    "27000.0",                    "2.710"                ],                [                    "26999.5",                    "1.460"                ]            ],            "checksum": 0,            "seq": 123,            "ts": "1695716059516"        }    ],    "ts": 1695716059516}
```

### Push Parameters[​](#push-parameters "Direct link to Push Parameters")

| Parameter     | Type               | Description                                                                                                                                      |
| :------------ | :----------------- | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| arg           | Object             | Channels with successful subscription                                                                                                            |
| &gt; instType | String             | Product type<br><code>USDT-FUTURES</code> USDT-M Futures<br><code>COIN-FUTURES</code> Coin-M Futures<br><code>USDC-FUTURES</code> USDC-M Futures |
| &gt; channel  | String             | Channel name, <code>books/books1/books5/books15</code>                                                                                           |
| &gt; instId   | String             | Product ID                                                                                                                                       |
| action        | String             | Push data action, Incremental push data or full volume push data                                                                                 |
| data          | List&lt;Object&gt; | Subscription data                                                                                                                                |
| &gt; asks     | List&lt;String&gt; | Seller depth                                                                                                                                     |
| &gt; bids     | List&lt;String&gt; | Buyer depth                                                                                                                                      |
| &gt; ts       | String             | Match engine timestamp(ms), e.g. 1597026383085                                                                                                   |
| &gt; checksum | Long               | Testing and                                                                                                                                      |
| &gt; seq      | Long               | Serial number.<br>It increases when the order book is updated and can be used to determine whether there is out-of-order packets.                |

> **Source:**
> https://www.bitget.com/api-doc/contract/websocket/public/Order-Book-Channel
