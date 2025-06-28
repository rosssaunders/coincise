# WebSocket Subscription

## Overview

### Server URL

Public Channel: `wss://openapi-ws-v2.bitmart.com/api?protocol=1.1`

Private Channel: `wss://openapi-ws-v2.bitmart.com/user?protocol=1.1`

## Format

The message format sent by the client to the BitMart server.

`{"action":"<operation>", "args":["<topic1>","<topic2>"]}`

**Explain**:

*   `operation` request action, value: \[`subscribe`\=Subscribe channel, `unsubscribe`\=Unsubscribe channel, `login`\=Account login\]
*   `args` request parameter, value: channel array or parameters required for login
*   `topic` channel topic, composed of `<channel>:<filter>`
    *   channel is composed of business/name
    *   filter is filterable data, refer to each channel description for details

**Example**:

*   Example 1: `{"action": "subscribe", "args": ["futures/depth50:BTCUSDT"]}`
    *   Means to subscribe to the depth data of the trading pair BTCUSDT
*   Example 2: `{"action": "login", "args": ["80618e45710812162b04892c7ee5ead4a3cc3e56", "1589267764859", "3ceeb7e1b8cb165a975e28a2e2dfaca4d30b358873c0351c1a071d8c83314556", "web"]}`
    *   Login request before private channel subscription

* * *

### Successful Response Format

The format of the success message returned by the BitMart server to the client.

Return `success` field is `ture`

> Successful Response Format

`When action=access ： {"action":"access","success":true}  When action=unsubscribe ： {"action":"unsubscribe","group":"Depth:1","success":true,"request":{"action":"unsubscribe","args":["Depth:1"]}}  When action=subscribe ： {"action":"subscribe","group":"Depth:1","success":true,"request":{"action":"subscribe","args":["Depth:1"]}}`

**Example**:

*   Example 1：`{"action":"access","success":true}`
    *   Means successful login
*   Example 2：`{"action":"unsubscribe","group":"futures/depth50:BTCUSDT","success":true,"request":{"action":"unsubscribe","args":["futures/depth50:BTCUSDT"]}}`
    *   Means successful cancellation of depth50 subscription for trading pair BTCUSDT
*   Example 3：`{"action":"subscribe","group":"futures/depth50:BTCUSDT","success":true,"request":{"action":"subscribe","args":["futures/depth50:BTCUSDT"]}}`
    *   Means successful subscribe of depth50 subscription for trading pair BTCUSDT
*   Example 4：`{"group":"futures/depth50:BTCUSDT","data":{"symbol":"BTCUSDT","way":2,"depths":[{"price":"30107.7","vol":"234"},{"price":"30107.8","vol":"1587"}]}}`
    *   Means the depth50 subscription of spot trading pair BTCUSDT, generates data, and returns it to the client

* * *

### Failed Response Format

The format of the failed message returned by the BitMart server to the client.

Return `success` field is `false`

> Failed Response Format

`{"action":"subscribe","group":"Depth:1","success":false,"error":"authentication is temporarily unavailable"}`

*   Example 1：`{"action":"subscribe","group":"futures/order","success":false,"error":"futures/order need authenication"}`
    *   Means you need to log in
*   Example 2：`{"action":"access","success":false,"error":"access failed: openapi auth: apiKey 880d5edecs**** failed: openapi auth failed"}`
    *   Means login failed, your sign is wrong
*   Example 3：`{"action":"subscribe","group":"sfutures/depth50:BTCUSDT","success":false,"request":{"action":"subscribe","args":["sfutures/depth50:BTCUSDT"]},"error":"group [sfutures/depth50:BTCUSDT] not exist"}`
    *   Means subscription failed, your parameter is invalid, this channel does not exist

## Stay Connected And Limit

\* If there is a network problem, the connection will be automatically disconnected, please set up the reconnection mechanism  

### How Stay Connected

WebSocket uses the Ping/Pong mechanism to maintain the connection. Once the connection is opened, a Ping frame is sent every N seconds, and the remote endpoint will return a Pong frame to keep responding. This is an approach to stay active. It helps to keep the connection open, especially if there is a short timeout proxy on an inactive connection.

**If no data is returned after connecting to WebSocket, the link will be automatically disconnected after 20s. It is recommended that the user do the following:**

1.  After each message is received, the user sets a timer for N seconds (N<20).
2.  If the timer is triggered (no new message is received within N seconds), send a ping frame or send a string 'ping'.
3.  Expect for a text string 'pong' as a response. If not received within N seconds, please issue an error or reconnect.
4.  We do not actively disconnect when there is a continuous message interaction between the two parties.

**The following is the data format of ping:** (Example in Java pseudocode)

*   Standard Ping frame

`ws.send(new PingWebSocketFrame());`

*   Ping Text

`ws.send(new TextWebSocketFrame('{"action":"ping"}'));`

### Connection Limit

*   A maximum of 500 connections can be maintained between each IP and BitMart server.

#### Lifeless connection

Connection that do not send task subscription data within 5 seconds will be considered lifeless and the server will close the connection.

## Subscription

Users can subscribe to one or more channels, and the total length of multiple channels cannot exceed 4096 bytes

### Subscribe Message Format

`{"action":"subscribe","args":["<topic>"]}`

#### Parameter Instructions

*   `action` = subscribe
*   `args` = The content of the args array is the subscribed topic
*   `topic` is composed of `<channel>:<filter>`
    *   channel is composed of business/name
    *   filter can filter data, refer to the description of each channel for details

### Example

1.  Send message to BitMart server
    
    `{"action":"subscribe","args":["futures/klineBin1m:BTCUSDT"]}`
    
2.  The BitMart server returns the subscription result, success=true means the subscription is successful
    
    `{"action":"subscribe","group":"futures/klineBin1m:BTCUSDT","success":true,"request":{"action":"subscribe","args":["futures/klineBin1m:BTCUSDT"]}}`
    

## Unsubscribe

Cancel subscription to one or more channels

### Unsubscribe Message Format

`{"action": "unsubscribe", "args": ["<topic>"]}`

#### Parameter Instruction

*   `action` = unsubscribe
*   `args` = The content of the args array is the subscribed topic
*   `topic` is composed of `<channel>:<filter>`
    *   channel is composed of business/name
    *   filter can filter data, refer to the description of each channel for details

### Example

1.  Send message to BitMart server
    
    `{"action": "unsubscribe", "args": ["futures/klineBin1m:BTCUSDT"]}`
    
2.  The BitMart server returns the subscription result, success=true means the subscription is successful
    
    `{"action":"unsubscribe","group":"futures/klineBin1m:BTCUSDT","success":true,"request":{"action":"unsubscribe","args":["futures/klineBin1m:BTCUSDT"]}}`
    

## 【Public】Ticker Channel

Get the latest transaction price, bid one price, ask for one price, and 24 trading volumes of all perpetual contracts on the platform

### Pushing Rules

1.  No user login required
2.  After subscribing, then the changes will be pushed
3.  Sent once in 1 second after subscription

### Request

> Request

`{   "action":"subscribe",   "args":["futures/ticker:BTCUSDT"] }`

Message Format:

`{"action":"subscribe","args":["<channel>:<symbol>"]}`

*   actions: `subscribe`
*   channel: Channel name `futures/ticker`, fixed value
*   symbol: Trading pair, such as `BTCUSDT`

### Response

> Response

`{     "data": {         "symbol": "BTCUSDT",         "last_price": "97153.6",         "volume_24": "25502894",         "range": "0.0016599204475393",         "mark_price": "97153.7",         "index_price": "97185.614",         "ask_price": "97153.9",         "ask_vol": "28",         "bid_price": "97153.4",         "bid_vol": "428"     },     "group": "futures/ticker:BTCUSDT" }`

Return data description:

| Field | Type | Description |
| --- | --- | --- |
| symbol | String | Symbol of the contract(like BTCUSDT) 
| last_price | String | Latest Price 
| volume_24 | String | Volume of 24-hour transactions 
| range | String | Up or Down 
| mark_price | String | Mark Price 
| index_price | String | Index Price 
| ask_price | String | Sell depths first price 
| ask_vol | String | Sell depths first vol 
| bid_price | String | Buy depths first price 
| bid_vol | String | Buy depths first vol 

## 【Public】Funding Rate Channel

Return funding Rate data

### Pushing Rules

1.  No user login required
2.  After subscribing, the current data will be returned directly, and updates will be pushed every minute.

### Request

> Subscribe Request

`{   "action":"subscribe",   "args":["futures/fundingRate:BTCUSDT"] }`

> Funding rate data Request

`{    "action": "request",    "args":["futures/fundingRate:BTCUSDT"] }`

Message Format:

`{"action": "<op>", "args": ["<channel:symbol>"]}`

*   op: `subscribe`\=Subscribe, You will receive a message that the subscription is successful, and then you will receive funding rate data pushed every minute. `request`\=Single request for the latest funding rate data, You will receive a funding rate data immediately.
*   channel:Channel name, such as`futures/fundingRate`
*   symbol: Trading pair, such as`BTCUSDT`

### Response

> Funding rate data

`{     "data": {         "symbol": "BTCUSDT",         "fundingRate": "0.000098800809",         "fundingTime": 1732525864000,         "nextFundingRate": "0.0000947",         "nextFundingTime": 1732550400000,         "funding_upper_limit": "0.0375",         "funding_lower_limit": "-0.0375",         "ts": 1732525864601     },     "group": "futures/fundingRate:BTCUSDT" }`

Return data description:

| Field | Type | Description |
| --- | --- | --- |
| symbol | String | Symbol of the contract (like <code>BTCUSDT</code>) 
| fundingRate | String | Current funding rate 
| fundingTime | Long | Funding time of the upcoming settlement, Unix timestamp format in milliseconds 
| nextFundingRate | String | Forecasted funding rate for the next period 
| nextFundingTime | Long | Forecasted funding time for the next period, Unix timestamp format in milliseconds 
| funding_upper_limit | String | The upper limit of the predicted funding rate of the next cycle 
| funding_lower_limit | String | The lower limit of the predicted funding rate of the next cycle 
| ts | Long | Data return time, Unix timestamp format in milliseconds 

## 【Public】Depth Channel

Get depth data

### Pushing Rules

1.  No user login required
2.  After subscribing, then the changes will be pushed

### Request

> Request

`{   "action":"subscribe",   "args":["futures/depth20:BTCUSDT@200ms"] }`

Message Format:

`{"action":"subscribe","args":["<channel:symbol><@speed>"]}`

*   actions: `subscribe`
*   channel: Channel name, such as `futures/depth20`
*   symbol: Trading pair, such as `BTCUSDT`
*   speed: Update speed, support `200ms` or `100ms`

#### Parameters Channel Name List

| Channel Name | Description |
| --- | --- |
| futures/depth5 | 5 Level Depth Channel 
| futures/depth20 | 20 Level Depth Channel 
| futures/depth50 | 50 Level Depth Channel 

### Response

> Response

`{     "group":"futures/depth20:BTCUSDT@200ms",     "data":{             "symbol":"BTCUSDT",             "way":1,             "depths":[               {"price":"5","vol":"97"}             ],             "ms_t": 1542337219120         } }`

Return data description:

| Field | Type | Description |
| --- | --- | --- |
| symbol | String | Symbol of the contract(like <code>BTCUSDT</code>) 
| way | Long | Trading side<br>-<code>1</code>=bid<br>-<code>2</code>=ask 
| depths | List | Array of depth details 
| ms_t | Long | Data push timestamp (in millisecond) 

**Instruction**

Description of the `depths` details field:

| Field | Type | Description |
| --- | --- | --- |
| price | String | price 
| vol | String | volume 

An example of the array of depths values: {"price":"20159.6","vol":"7284"}. price field is the price, and vol field is the quantity.

* * *

## 【Public】Depth-All Channel

Return depth data, each push is the full data

### Pushing Rules

1.  No user login required
2.  After subscribing, then the changes will be pushed

### Request

> Request

`{   "action":"subscribe",   "args":["futures/depthAll20:BTCUSDT@200ms"] }`

Message Format:

`{"action":"subscribe","args":["<channel:symbol><@speed>"]}`

*   channel: Channel name, such as`futures/depthAll20`
*   symbol: Trading pair, such as`BTCUSDT`
*   speed: Update speed, support `200ms` or `100ms`

Parameters Channel Name List

| Channel Name | Description |
| --- | --- |
| futures/depthAll5 | 5 Level Depth Channel 
| futures/depthAll20 | 20 Level Depth Channel 
| futures/depthAll50 | 50 Level Depth Channel 

### Response

> Response

`{     "data": {         "symbol": "BTCUSDT",         "asks": [             {                 "price": "70294.4",                 "vol": "455"             }         ],         "bids": [             {                 "price": "70293.9",                 "vol": "1856"             }         ],         "ms_t": 1730399750402     },     "group": "futures/depthAll20:BTCUSDT@200ms" }`

Return data description:

| Field | Type | Description |
| --- | --- | --- |
| symbol | String | Symbol of the contract（like <code>BTCUSDT</code>） 
| asks | List | Asks Depth Array 
| bids | List | Bids Depth Array 
| ms_t | Long | Data push timestamp (in millisecond) 

**Instruction** Description of the `asks` `bids` details field:

| Field | Type | Description |
| --- | --- | --- |
| price | String | price 
| vol | String | volume 

An example of the array of depths values: {"price":"20159.6","vol":"7284"}. price field is the price, and vol field is the quantity.

* * *

## 【Public】Depth-Increase Channel

Return depth data, support the creation of a local full depth cache data

### Pushing Rules

1.  No user login required
2.  After subscribing, the current data will be returned directly, and then the changes will be pushed

### Request

> Subscribe Request

`{   "action":"subscribe",   "args":["futures/depthIncrease20:BTCUSDT@200ms"] }`

> Full depth snapshot data Request

`{    "action": "request",    "args":["futures/depthIncrease20:BTCUSDT@200ms"] }`

Message Format:

`{"action":"<op>","args":["<channel:symbol><@speed>"]}`

*   op: `subscribe`\=Subscribe, You will receive a message that the subscription is successful, and then you will receive incremental depth data pushed in real time. `request`\=Single request for the latest depth snapshot, You will receive a full depth of data immediately.
*   channel:Channel name, such as `futures/depthIncrease20`
*   symbol: Trading pair, such as `BTCUSDT`
*   speed: Update speed, support `200ms` or `100ms`

Parameters Channel Name List

| Channel Name | Description |
| --- | --- |
| futures/depthIncrease5 | 5 Level Depth Channel 
| futures/depthIncrease20 | 20 Level Depth Channel 
| futures/depthIncrease50 | 50 Level Depth Channel 

### Response

> Full depth snapshot data

`{     "data": {         "symbol": "BTCUSDT",         "asks": [             {                 "price": "70391.6",                 "vol": "3550"             }         ],         "bids": [             {                 "price": "70391.2",                 "vol": "1335"             }         ],         "ms_t": 1730400086184,         "version": 980361,         "type": "snapshot"     },     "group": "futures/depthIncrease20:BTCUSDT@200ms" }`

> Incremental depth data

`{     "data": {         "symbol": "BTCUSDT",         "asks": [             {                 "price": "70395.3",                 "vol": "341"             },             {                 "price": "70395.4",                 "vol": "323"             }         ],         "bids": [             {                 "price": "70391.2",                 "vol": "0"             },             {                 "price": "70353.4",                 "vol": "11435"             }         ],         "ms_t": 1730400086194,         "version": 980362,         "type": "update"     },     "group": "futures/depthIncrease20:BTCUSDT@200ms" }`

Return data description:

| Field | Type | Description |
| --- | --- | --- |
| symbol | String | Symbol of the contract (like <code>BTCUSDT</code>) 
| asks | List | Asks Depth Array 
| bids | List | Bids Depth Array 
| ms_t | Long | Data push timestamp (in millisecond) 
| version | Long | data version 
| type | String | data type<br>-<code>snapshot</code>=Full depth snapshot data<br>-<code>update</code>=Incremental depth data 

**Instruction**

Description of the `asks` `bids` details field:

| Field | Type | Description |
| --- | --- | --- |
| price | String | price 
| vol | String | volume 

An example of the array of depths values: {"price":"20159.6","vol":"7284"}. price field is the price, and vol field is the quantity.

### How to correctly maintain a copy of OrderBook locally:

1.  First, the client send a subscription request `{"action": "subscribe", "args": ["futures/depthIncrease20:<symbol>"] }`
2.  After successful subscription, you will receive two types of messages, type=`snapshot`(full data)和type=`update`(update)
3.  If a type=snapshot type message is received, update the deep snapshot content to the`local cache`. If there is no `local cache`, create one.
4.  If a type=update message is received, update the data in the deep snapshot to `local cache`. The update rules are as follows:
    *   4.1 If the field version number in the received new message is less than or equal to the version in the local cache(new version<=local version), this data can be discarded.
    *   4.2 If the field version number in the new message received is equal to the version in the local cache plus 1(new version==local version+1), the quantity of the corresponding price will be `updated to the local cache`.
    *   4.3 If the field version number in the new message received is greater than the version in the local cache plus 1(new version>local version+1), please obtain the latest depth snapshot from step 7 and overwrite the `local cache`.
5.  The pending order volume in each returned message represents the `absolute value` of the current pending order volume at this price, rather than the relative change.
6.  How to update local cache? Under the premise of 4.2:
    *   6.1 New: If the same price is not already in the local cache, it means that it is a new pending order and needs to be added to the cache.
    *   6.2 Modify or Remove: If the same price is already in the local cache, it means that the quantity has changed. If the quantity is 0, it will be directly removed from the cache. Otherwise, just change the quantity.
7.  Request through request `{"action": "request", "args": ["futures/depthIncrease20:<symbol>"] }`to obtain the latest depth snapshot (type=snapshot in the message), and add the depth The content in the snapshot is overwritten to the `local cache`, and then the logic continues from step 2.

*   Abnormal Situation:
    1.  Because the depth snapshot has a limit on the number of price tiers, price tiers outside the initial snapshot and without quantity changes will not appear in the incremental depth update information. Therefore, even if all updates from the incremental depth are applied, these price brackets will not be visible in the local order book, so there may be some differences between the local order book and the real order book.

## 【Public】Individual Symbol Book Ticker Channel

Pushes any update to the best bid or ask's price or quantity in real-time for a specified symbol

### Pushing Rules

1.  No user login required
2.  After subscribing, then the changes will be pushed
3.  Real-time push

### Request

> Request

`{   "action":"subscribe",   "args":["futures/bookticker:BTCUSDT"] }`

Message Format:

`{"action":"subscribe","args":["<channel:symbol>"]}`

*   actions: `subscribe`
*   channel: Channel name, such as `futures/bookticker`
*   symbol: Trading pair, such as `BTCUSDT`

### Response

> Response

`{     "data": {         "symbol": "BTCUSDT",         "best_bid_price": "97315",         "best_bid_vol": "156",         "best_ask_price": "97315.4",         "best_ask_vol": "333",         "ms_t": 1733891542244     },     "group": "futures/bookticker:BTCUSDT" }`

Return data description:

| Field | Type | Description |
| --- | --- | --- |
| symbol | String | Symbol of the contract(like <code>BTCUSDT</code>) 
| best_bid_price | String | Best bid price 
| best_bid_vol | String | Best bid volume 
| best_ask_price | String | Best ask price 
| best_ask_vol | String | Best ask volume 
| ms_t | Long | Data push timestamp (in millisecond) 

* * *

## 【Public】Trade Channel

Get trade data

### Pushing Rules

1.  No user login required
2.  After subscribing, then the changes will be pushed

### Request

> Request

`{   "action":"subscribe",   "args":["futures/trade:BTCUSDT"] }`

Message Format:

`{"action":"subscribe","args":["<channel:symbol>","<channel:symbol>"]}`

*   actions: `subscribe`
*   channel: Channel name `futures/trade`, fixed value
*   symbol: Trading pair, such as `BTCUSDT`

### Response

> Response

`{   "group":"futures/trade:BTCUSDT",   "data":[{     "trade_id":1409495322,     "symbol":"BTCUSDT",     "deal_price":"117387.58",     "deal_vol":"1445",     "m":true,     "created_at":"2023-02-24T07:54:11.124940968Z"   }] }`

Return data description:

| Field | Type | Description |
| --- | --- | --- |
| symbol | String | symbol 
| deal_price | String | deal price 
| trade_id | Long | trade id 
| deal_vol | String | deal vol 
| way | Int | Trading type<br>-<code>1</code>=buy_open_long sell_open_short<br>-<code>2</code>=buy_open_long sell_close_long<br>-<code>3</code>=buy_close_short sell_open_short<br>-<code>4</code>=buy_close_short sell_close_long<br>-<code>5</code>=sell_open_short buy_open_long<br>-<code>6</code>=sell_open_short buy_close_short<br>-<code>7</code>=sell_close_long buy_open_long<br>-<code>8</code>=sell_close_long buy_close_short 
| m | Bool | -<code>true</code>=buyer is maker<br>-<code>false</code>=seller is maker 
| created_at | String | transaction create time(ms) 

## 【Public】KlineBin Channel

Get individual contract K-line data

### Pushing Rules

1.  No user login required
2.  After subscribing, then the changes will be pushed

### Request

> Request

`{"action":"subscribe","args":["futures/klineBin1m:BTCUSDT"]}`

Message Format:

`{"action":"subscribe","args":["<channel:symbol>","<channel:symbol>"]}`

*   channel: Channel name, such as `futures/klineBin1m`
*   symbol: Trading pair, such as `BTCUSDT`

#### Parameters Channel Name List

| Channel Name | Description |
| --- | --- |
| futures/klineBin1m | 1-min klineBin Channel 
| futures/klineBin5m | 5-min klineBin Channel 
| futures/klineBin15m | 15-min klineBin Channel 
| futures/klineBin30m | 30-min klineBin Channel 
| futures/klineBin1H | 1-hour klineBin Channel 
| futures/klineBin2H | 2-hour klineBin Channel 
| futures/klineBin4H | 4-hour klineBin Channel 
| futures/klineBin1D | 1-day klineBin Channel 
| futures/klineBin1W | 1-week klineBin Channel 

### Response

> Response

`{     "group":"futures/klineBin1m:BTCUSDT",     "data":{             "symbol":"BTCUSDT",             "o":"146.24",             "h":"146.24",             "l":"146.24",             "c":"146.24",             "v":"146",             "ts":1700533801         } }`

Return data description:

| Field | Type | Description |
| --- | --- | --- |
| symbol | String | Symbol of the contract(like BTCUSDT) 
| o | String | Opening Price 
| h | String | Highest Price 
| l | String | Lowest Price 
| c | String | Closing Price 
| v | String | Turnover 
| ts | Long | K-line timestamp（in second） 

## 【Public】MarkPrice KlineBin Channel

Get individual contract K-line data

### Pushing Rules

1.  No user login required
2.  After subscribing, then the changes will be pushed

### Request

> Request

`{"action":"subscribe","args":["futures/markPriceKlineBin1m:BTCUSDT"]}`

Message Format:

`{"action":"subscribe","args":["<channel:symbol>","<channel:symbol>"]}`

*   channel: Channel name, such as `futures/markPriceKlineBin1m`
*   symbol: Trading pair, such as `BTCUSDT`

#### Parameters Channel Name List

| Channel Name | Description |
| --- | --- |
| futures/markPriceKlineBin1m | 1-min klineBin Channel 
| futures/markPriceKlineBin5m | 5-min klineBin Channel 
| futures/markPriceKlineBin15m | 15-min klineBin Channel 
| futures/markPriceKlineBin30m | 30-min klineBin Channel 
| futures/markPriceKlineBin1H | 1-hour klineBin Channel 
| futures/markPriceKlineBin2H | 2-hour klineBin Channel 
| futures/markPriceKlineBin4H | 4-hour klineBin Channel 
| futures/markPriceKlineBin1D | 1-day klineBin Channel 
| futures/markPriceKlineBin1W | 1-week klineBin Channel 

### Response

> Response

`{     "group":"futures/markPriceKlineBin1m:BTCUSDT",     "data":{             "symbol":"BTCUSDT",             "o":"146.24",             "h":"146.24",             "l":"146.24",             "c":"146.24",             "v":"146",             "ts":1700533801         } }`

Return data description:

| Field | Type | Description |
| --- | --- | --- |
| symbol | String | Symbol of the contract(like BTCUSDT) 
| o | String | Opening Price 
| h | String | Highest Price 
| l | String | Lowest Price 
| c | String | Closing Price 
| v | String | Turnover 
| ts | Long | Data push timestamp (in second) 

## 【Private】Login

### Login Subscription Format

> Request Format

`{"action":"access","args":["<API_KEY>","<timestamp>","<sign>","<dev>"]}`

Please note that the following parameters are all of type `String`

*   `API_KEY`: The user's API key
*   `timestamp`: Timestamp, the unit is milliseconds, it will expire after 60 seconds
*   `sign`: Signature, sign=CryptoJS.HmacSHA256(timestamp + "#" + your\_api\_memo + "#" + "bitmart.WebSocket", your\_api\_secret\_key)
*   `dev`: Device, web eg.

### Example

> Login Example

`{"action": "access", "args": ["80618e45710812162b04892c7ee5ead4a3cc3e56", "1589267764859", "3ceeb7e1b8cb165a975e28a2e2dfaca4d30b358873c0351c1a071d8c83314556","web"]}`

> Response

`{"action":"access","success":true}`

Assume that the values of the API requested by the user is as follows:

*   timestamp=1589267764859
*   API\_KEY = "80618e45710812162b04892c7ee5ead4a3cc3e56"
*   API\_SECRET = "6c6c98544461bbe71db2bca4c6d7fd0021e0ba9efc215f9c6ad41852df9d9df9"
*   API\_MEMO = "test001";

Ues Javascript create param `sign`: sign = `CryptoJS.HmacSHA256(1589267764859 + "#" + test001 + "#" + "bitmart.WebSocket", '6c6c98544461bbe71db2bca4c6d7fd0021e0ba9efc215f9c6ad41852df9d9df9')` = 3ceeb7e1b8cb165a975e28a2e2dfaca4d30b358873c0351c1a071d8c83314556

Ues Shell create param `sign`: sign = `echo -n '1589267764859#test001#bitmart.WebSocket' | openssl dgst -sha256 -hmac "6c6c98544461bbe71db2bca4c6d7fd0021e0ba9efc215f9c6ad41852df9d9df9"` (stdin)= 3ceeb7e1b8cb165a975e28a2e2dfaca4d30b358873c0351c1a071d8c83314556

The final login parameters are:

`{"action": "access", "args": ["80618e45710812162b04892c7ee5ead4a3cc3e56", "1589267764859", "3ceeb7e1b8cb165a975e28a2e2dfaca4d30b358873c0351c1a071d8c83314556","web"]}`

#### Note

1\. If success field of return data is true, it indicates success  
2\. If the login fails, the link will be automatically disconnected  

## 【Private】Assets Channel

Get asset balance change

### Pushing Rules

1.  User login required
2.  After subscribing, then the changes will be pushed

### Request

> Request

`{     "action": "subscribe",     "args":["futures/asset:USDT", "futures/asset:BTC", "futures/asset:ETH"] }`

Message Format:

`{"action":"subscribe","args":["<channel:currency>","<channel:currency>"]}`

*   actions: `subscribe`
*   channel: Channel name `futures/asset`, fixed value
*   currency: Currency, such as `BTC`, asset types that support subscriptions are: USDT (U-native), BTC (coin-native), ETH (coin-native)

### Response

> Response

`{   "group": "futures/asset:BTC",   "data": {     "currency": "BTC",     "available_balance": "1000",     "position_deposit": "1000",     "frozen_balance": "1000"   } }`

Return data description:

| Field | Type | Description |
| --- | --- | --- |
| currency | String | Currency 
| available_balance | String | Available Amount 
| position_deposit | String | Position Margin 
| frozen_balance | String | Transaction Frozen Amount 

## 【Private】Position Channel

Get Position Data

### Pushing Rules

1.  User login required
2.  After subscribing, then the changes will be pushed
3.  10 seconds timed push

### Request

> Request

`{     "action": "subscribe",     "args":["futures/position"] }`

Message Format:

`{"action":"subscribe","args":["<channel>"]}`

*   actions: `subscribe`
*   channel: Channel name `futures/position`, fixed value

### Response

> Response

`{   "group": "futures/position",   "data": [     {       "symbol": "BTCUSDT",       "hold_volume": "2000",       "position_type": 1,       "open_type": 1,       "frozen_volume": "0",       "close_volume": "0",       "hold_avg_price": "19406.2092",       "close_avg_price": "0",       "open_avg_price": "19406.2092",       "liquidate_price": "15621.998406",       "create_time": 1662692862255,       "update_time": 1662692862255,       "position_mode": "hedge_mode"     }   ] }`

Return data description:

| Field | Type | Description |
| --- | --- | --- |
| symbol | String | Contract pair (e.g. BTCUSDT) 
| hold_volume | String | Number of positions 
| position_type | Int | Position type<br>-<code>1</code>=long<br>-<code>2</code>=short 
| open_type | Int | Open position type<br>-<code>1</code>=isolated<br>-<code>2</code>=cross 
| frozen_volume | String | Frozen volume 
| close_volume | String | Close volume 
| hold_avg_price | String | Average price of a position 
| close_avg_price | String | Average close price 
| open_avg_price | String | Average opening price 
| liquidate_price | String | Liquidation price 
| create_time | Long | Position created timestamp (ms) 
| update_time | Long | Position updated timestamp (ms) 
| position_mode | String | Position mode<br>-<code>hedge_mode</code><br>-<code>one_way_mode</code> 

## 【Private】Order Channel

Order Channel, which pushes immediately when the order status, transaction amount, etc. changes.

### Pushing Rules

1.  User login required
2.  After subscribing, then the changes will be pushed

### Request

> Request

`{   "action": "subscribe",   "args": ["futures/order"] }`

Message Format:

`{"action":"subscribe","args":["<channel>"]}`

*   actions: `subscribe`
*   channel: Channel name `futures/order`, fixed value

### Response

> Response

`{   "group": "futures/order",   "data": [     {       "action": 3,       "order": {         "order_id": "220906179895578",         "client_order_id": "BM1234",         "price": "1",         "size": "1000",         "symbol": "BTCUSDT",         "state": 2,         "side": 1,         "type": "limit",         "leverage": "5",         "open_type": "isolated",         "deal_avg_price": "0",         "deal_size": "0",         "create_time": 1662368173000,         "update_time": 1662368173000,         "plan_order_id": "220901412155341",         "last_trade": {           "lastTradeID": 1247592391,           "fillQty": "1",           "fillPrice": "25667.2",           "fee": "-0.00027",           "feeCcy": "USDT"         },         "trigger_price": "-",         "trigger_price_type": "-",         "execution_price": "-",         "activation_price_type": "-",         "activation_price": "-",         "callback_rate": "-",         "position_mode": "hedge_mode"       }     }   ] }`

Return data description:

| Field | Type | Description |
| --- | --- | --- |
| action | Int | Action<br>-<code>1</code>=match deal<br>-<code>2</code>=submit order<br>-<code>3</code>=cancel order<br>-<code>4</code>=liquidate cancel order<br>-<code>5</code>=adl cancel order<br>-<code>6</code>=part liquidate<br>-<code>7</code>=bankruptcy order<br>-<code>8</code>=passive adl match deal<br>-<code>9</code>=active adl match deal 
| symbol | String | Symbol of the contract 
| order_id | String | Order ID 
| client_order_id | String | Client-defined OrderId 
| side | Int | Order side<br>hedge mode<br>-<code>1</code>=buy_open_long<br>-<code>2</code>=buy_close_short<br>-<code>3</code>=sell_close_long<br>-<code>4</code>=sell_open_short<br>oneway mode<br>-<code>1</code>=buy<br>-<code>2</code>=buy(reduce only)<br>-<code>3</code>=sell(reduce only)<br>-<code>4</code>=sell 
| type | String | Order type<br>-<code>limit</code><br>-<code>market</code><br>-<code>plan_order</code><br>-<code>trailing_order</code><br>-<code>take_profit</code><br>-<code>stop_loss</code> 
| leverage | String | Leverage order multipliers 
| open_type | String | Open type<br>-<code>cross</code><br>-<code>isolated</code> 
| deal_avg_price | String | Average deal price 
| deal_size | String | Deal amount 
| price | String | Consignment price 
| state | Int | Order status<br>-<code>1</code>=status_approval<br>-<code>2</code>=status_check<br>-<code>4</code>=status_finish 
| create_time | Long | Order created timestamp (ms) 
| update_time | Long | Order updated timestamp (ms) 
| plan_order_id | String | Trigger plan order id 
| last_trade | object | recently trade info for this order，return null if not exist 
| trigger_price | String | Trigger price of TP/SL / plan order 
| trigger_price_type | String | Trigger price type of TP/SL / plan order<br>-<code>last_price</code><br>-<code>fair_price</code> 
| execution_price | String | Execution price of TP/SL / plan order 
| activation_price | String | Activation price 
| activation_price_type | String | Activation price type<br>-<code>last_price</code><br>-<code>fair_price</code> 
| callback_rate | String | Call back rate of trailing stop order 
| position_mode | String | Position mode<br>-<code>hedge_mode</code><br>-<code>one_way_mode</code> 

`last_trade` fields describe：

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| lastTradeID | Long | recently trade id 
| fillQty | String | last trade deal vol 
| fillPrice | String | last trade deal price 
| fee | String | last trade fee 
| feeCcy | String | last trade fee coin name
