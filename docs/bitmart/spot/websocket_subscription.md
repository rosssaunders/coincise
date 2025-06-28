# WebSocket Subscription

## Overview

### Server URL

Public Channel: `wss://ws-manager-compress.bitmart.com/api?protocol=1.1`

Private Channel: `wss://ws-manager-compress.bitmart.com/user?protocol=1.1`

## Format

The message format sent by the client to the BitMart server.

`{"op":"<operation>", "args":["<topic1>","<topic2>"]}`

**Explain**:

*   `operation` request action, value: \[`subscribe`\=Subscribe channel, `unsubscribe`\=Unsubscribe channel, `login`\=Account login\]
*   `args` request parameter, value: channel array or parameters required for login
*   `topic` channel topic, composed of `<channel>:<filter>`
    *   channel is composed of business/name
    *   filter is filterable data, refer to each channel description for details

**Example**:

*   Example 1: `{"op": "subscribe", "args": ["spot/ticker:BTC_USDT"]}`
    *   Means to subscribe to the ticker data of the spot trading pair BTC\_USDT
*   Example 2: `{"op": "login", "args": ["80618e45710812162b04892c7ee5ead4a3cc3e56", "1589267764859", "3ceeb7e1b8cb165a975e28a2e2dfaca4d30b358873c035 1c1a071d8c83314556"]}`
    *   Login request before private channel subscription

* * *

### Successful Response Format

The format of the success message returned by the BitMart server to the client.

The returned field not contains `errorCode`

> Successful Response Format

`When op=login: {"event":"<operation>"}  When op=unsubscribe: {"event":"<operation>","topic":"<topic>"}  When op=subscribe: {"table":"<topic1>","data":"[{"<value1>","<value2>"}]"} {"table":"<topic2>","data":"[{"<value1>","<value2>"}]"}`

**Example**:

*   Example 1: `{"event":"login"}`
    *   Means successful login
*   Example 2：`{"topic":"spot/ticker:BTC_USDT","event":"subscribe"}`
    *   Means successful subscription
*   Example 2: `{"event":"unsubscribe","topic":"spot/ticker:BTC_USDT"}`
    *   Means successful cancellation of ticker subscription for spot trading pair BTC\_USDT
*   Example 3: `{"table":"spot/ticker:BTC_USDT","data":"[{"<value1>","<value2>"}]"}`
    *   Means the ticker subscription of spot trading pair BTC\_USDT, generates data, and returns it to the client

* * *

### Failed Response Format

The format of the failed message returned by the BitMart server to the client.

If the returned field contains `errorCode`, it means failure. For the reason of failure, please refer to: [WebSocket Error Code](#websocket-error-code)

> Failed Response Format

`{"event":"<operation>","errorMessage":"<error_message>","errorCode":"<error_code>"}`

*   Example 1: `{"event":"login","errorCode":"91002","errorMessage":"API KEY not found"}`
    *   Means login failed, your API KEY does not exist
*   Example 2: `{"event":"subscribe","errorCode":"90004","errorMessage":"Invalid channel param"}`
    *   Means subscription failed, your parameter is invalid, this channel does not exist

## Stay Connected And Limit

\* If there is a network problem, the connection will be automatically disconnected, please set up the reconnection mechanism  

### How Stay Connected

WebSocket uses the Ping/Pong mechanism to maintain the connection. Once the connection is opened, a text 'ping' is sent every N seconds, and the remote endpoint will return a text 'pong' to keep responding. This is an approach to stay active. It helps to keep the connection open, especially if there is a short timeout proxy on an inactive connection.

**If no data is returned after connecting to WebSocket, the link will be automatically disconnected after 20s. It is recommended that the user do the following:**

1.  After each message is received, the user sets a timer for N seconds (N<20).
2.  If the timer is triggered (no new message is received within N seconds), send a text string 'ping'. **(Ping frames are not supported)**
3.  Expect for a text string 'pong' as a response. If not received within N seconds, please issue an error or reconnect.
4.  We do not actively disconnect when there is a continuous message interaction between the two parties.

**The following is the data format of ping:** (Example in Java pseudocode)

*   Ping Text

`ws.send(new TextWebSocketFrame("ping");`

### Connection Limit(Public Channel)

*   Each IP can maintain up to 20 connections with the BitMart public channel server
*   Once connected, allows clients to subscribe to up to 115 channels per connection.
*   Send message rate limit:
    1.  Initiate connection: Clients can initiate a maximum of 30 requests to connect to the BitMart server within 1 minute.  
        
    2.  Once connected: Clients can sending a maximum of 100 subscription messages within 10 seconds, message includes: PING text, JSON format messages (subscription and unsubscription).
    3.  Once connected: A maximum of 20 messages arrays can be sent by clients for a single subscription.  
        
*   If the user sends more messages than the limit, the connection will be disconnected. IPs that are repeatedly disconnected will be blocked by the server.

### Connection Limit(Private Channel)

*   Each IP can maintain up to 10 connections with the BitMart private channel server.
*   Once connected, allows clients to subscribe to up to 100 channels per connection.
*   Send message rate limit:
    1.  Initiate connection: Clients can initiate a maximum of 30 requests to connect to the BitMart server within 1 minute.
    2.  Once connected: Clients can sending a maximum of 100 subscription messages within 10 seconds, message includes: PING text, JSON format messages (subscription and unsubscription).
    3.  Once connected: A maximum of 20 messages arrays can be sent by clients for a single subscription.
*   If the user sends more messages than the limit, the connection will be disconnected. IPs that are repeatedly disconnected will be blocked by the server.

#### How to subscribe to more than 1000 Public channels?

Create 20 connectors and 1 receiving function in your code, and each connector subscribes to 100 channels, so that you can easily subscribe to 2000 channels.

##### Need to pay attention to?

*   Subscribe to fewer channels and respond faster. It is recommended that you only subscribe to the channels you want  
    
*   If the number of messages sent exceeds the limit, the connection will be disconnected. IPs that are repeatedly disconnected will be blocked by the server  
    
*   The connection limits for private channels and public channels are calculated separately, which means that a single IP is allowed to maintain 10 private channel connections and 20 public channel connections at the same time

#### Lifeless connection

Connection that do not send task subscription data within 5 minutes will be considered lifeless and the server will close the connection.

## Data Compression

Only when the market data is returned after subscription, the remote service will compress the data and return it to the client. The remote service returns data in two formats, Binary format and Text format. When the binary format is returned, the data has been compressed by the remote service and the client needs to decompress it.

#### Compression Introduction

zlib is a library for data compression, developed by Jean-loup Gailly and Mark Adler. The first version (v0.9) was published on May 1, 1995. zlib uses the abstract DEFLATE algorithm, originally written for the libpng library, and later generally used by many software. This library is free. [Official link http://zlib.net/](http://zlib.net/)

#### Decompression Example

For more and more complete programming codes, please refer to the [Quick Start API](/en/quick/#python-quick-start)

> Python

`import zlib  def inflate(data):     decompress = zlib.decompressobj(             -zlib.MAX_WBITS     )     inflated = decompress.decompress(data)     inflated += decompress.flush()     return inflated.decode('UTF-8')`

> Nodejs

`const zlib = require('zlib');  zlib.inflateRawSync(data);`

> Golang

`import (     "compress/flate" )  func zipDecode(in []byte) ([]byte, error) {     reader := flate.NewReader(bytes.NewReader(in))     defer reader.Close()      return ioutil.ReadAll(reader) }  string(zipDecode(data))`

> php

`@link https://php.net/manual/en/function.gzinflate.php  gzinflate($data)`

> Java

`import java.util.zip.*;  public class StringCompressUtil {      private static String uncompress(ByteBuf buf) {         try {             byte[] temp = new byte[buf.readableBytes()];             ByteBufInputStream bis = new ByteBufInputStream(buf);             bis.read(temp);             bis.close();             Inflater decompresser = new Inflater(true);             decompresser.setInput(temp, 0, temp.length);             StringBuilder sb = new StringBuilder();             byte[] result = new byte[1024];             while (!decompresser.finished()) {                 int resultLength = decompresser.inflate(result);                 sb.append(new String(result, 0, resultLength, "UTF-8"));             }             decompresser.end();             return sb.toString();         }catch (Exception e) {             e.printStackTrace();         }         return "";     }      public static String decode(ByteBuf content){         byte[] bytes = new byte[content.readableBytes()];         content.readBytes(bytes);         ByteBuf byteBuf = Unpooled.wrappedBuffer(bytes);         String str = uncompress(byteBuf);         return str;     }  }  StringCompressUtil.decode(data)`

## Subscribe

Users can subscribe to one or more channels, and the total length of multiple channels cannot exceed 4096 bytes

> subscribe

`{"op": "subscribe", "args": ["<topic>"]}`

### Parameter Instructions

*   op=subscribe
*   The content of the args array is the subscribed topic
*   topic is composed of `<channel>:<filter>`
    *   channel is composed of business/name
    *   filter can filter data, refer to the description of each channel for details

### Example

> Subscribe Request

`{"op": "subscribe", "args": ["spot/ticker:BTC_USDT"]}`

> Subscription successful

`{"event": "subscribe","topic": "spot/ticker:BTC_USDT"}`

> After successful subscription, push data

`{"table":"spot/ticker:BTC_USDT","data":[]}`

## Unsubscribe

Cancel subscription to one or more channels

> unsubscribe

`{"op": "unsubscribe", "args": ["<topic>"]}`

### Parameter Instruction

*   op=unsubscribe
*   The content of the args array is the subscribed topic
*   topic is composed of `<channel>:<filter>`
    *   channel is composed of business/name
    *   filter can filter data, refer to the description of each channel for details

### Example

> Unsubscribe Request

`{"op": "unsubscribe", "args": ["spot/ticker:BTC_USDT", "spot/ticker:ETH_USDT"]}`

> Unsubscribe successful

`{"event":"unsubscribe","topic":"spot/ticker:BTC_USDT"} {"event":"unsubscribe","topic":"spot/ticker:ETH_USDT"}`

## 【Public】Ticker Channel

Get the latest price, bid price, ask price and 24-hour trading volume

### Pushing Rules

1.  No user login required
2.  After subscribing, the current data will be returned directly, and the latest price, bid price, ask price will be pushed only after they change.
3.  Push frequency: The fastest is 500ms once

### Subscribe Request

> Subscribe Request

`{   "op": "subscribe",    "args": ["spot/ticker:BTC_USDT"] }`

Message Format:

`{"op": "subscribe", "args": ["spot/ticker:<symbol>"]}`

*   symbol: Trading pair, such as `BTC_USDT`

### Subscription successful

> Subscription successful

`{   "event":  "subscribe",   "topic":  "spot/ticker:BTC_USDT" }`

`{"event":"subscribe","topic":"spot/ticker:<symbol>"}`

### After successful subscription, push data

> Push data

`{   "data":  [     {       "ask_px":  "36000",       "ask_sz":  "1.021",       "base_volume_24h":  "2.02000",       "bid_px":  "35000",       "bid_sz":  "11",       "fluctuation":  "-0.0001",       "high_24h":  "35003.04",       "last_price":  "35000.00",       "low_24h":  "35000.00",       "ms_t":  1709024652967,       "open_24h":  "35003.03",       "quote_volume_24h":  "70700.00",       "s_t":  1709024652,       "symbol":  "BTC_USDT"     }   ],   "table":  "spot/ticker" }`

Return data description:

| Field | Type | Description |
| --- | --- | --- |
| symbol | String | Trading pair, <code>BTC_USDT</code> 
| last_price | String | Last trading price 
| high_24h | String | 24-hour highest price 
| low_24h | String | 24-hour lowest price 
| open_24h | String | 24-hour open price 
| base_volume_24h | String | 24-hour traded volume in base currency 
| quote_volume_24h | String | 24-hour traded volume in quote currency 
| s_t | Long | Create Time (timestamp in seconds) (The field will be removed, please use the ms_t field) 
| ms_t | Long | Data push Timestamp (timestamp in millisecond) 
| fluctuation | String | 24-hour Price change 
| bid_px | String | Best bid price 
| bid_sz | String | Best bid quantity 
| ask_px | String | Best ask price 
| ask_sz | String | Best bid quantity 

## 【Public】KLine Channel

Get the spot K-line data

### Pushing Rules

1.  No user login required
2.  After subscribing, the current data will be returned directly, and then the changes will be pushed
3.  Push frequency: The fastest is 500ms once

### Subscribe Request

> Subscribe Request

`{   "op": "subscribe",    "args": ["spot/kline1m:BTC_USDT"] }`

Message Format:

`{"op": "subscribe", "args": ["<channel>:<symbol>"]}`

*   channel: Channel name, such as `spot/kline1m`
*   symbol: Trading pair, such as `BTC_USDT`

#### Parameters Channel Name List

| Channel Name | Description |
| --- | --- |
| spot/kline1m | 1-min KLine Channel 
| spot/kline5m | 5-min KLine Channel 
| spot/kline15m | 15-min KLine Channel 
| spot/kline30m | 30-min KLine Channel 
| spot/kline1H | 1-hour KLine Channel 
| spot/kline2H | 2-hour KLine Channel 
| spot/kline4H | 4-hour KLine Channel 
| spot/kline1D | 1-day KLine Channel 
| spot/kline1W | 1-week KLine Channel 
| spot/kline1M | 1-month KLine Channel 

### Subscription successful

> Subscription successful

`{   "topic":  "spot/kline1m:BTC_USDT",   "event":  "subscribe" }`

`{"event":"subscribe","topic":"<channel>:<symbol>"}`

### After successful subscription, push data

> Push data

`{   "data":  [     {       "candle":  [         1709025360,         "162.01",         "162.02",         "162.03",         "162.04",         "336.452694"       ],       "symbol":  "BTC_USDT"     }   ],   "table":  "spot/kline1m" }`

Return data description:

| Field | Type | Description |
| --- | --- | --- |
| symbol | String | Trading pair, <code>BTC_USDT</code> 
| candle | List<string></string> | KLine data 

An example of returned KLine values: \[1709025360, "162.01", "162.02", "162.03", "162.04", "336.452694"\]. Open time (in seconds), opening price, highest price, lowest price, closing price, trading volume.

## 【Public】Depth-All Channel

Return depth data, each push is the full data

### Pushing Rules

1.  No user login required
2.  After subscribing, the current data will be returned directly, and then the changes will be pushed
3.  Push frequency: The fastest is 500ms once

### Subscribe Request

> Subscribe Request

`{   "op": "subscribe",    "args": ["spot/depth5:BTC_USDT"] }`

Message Format:

`{"op": "subscribe", "args": ["<channel>:<symbol>"]}`

*   channel: Channel name, such as `spot/depth5`
*   symbol: Trading pair, such as `BTC_USDT`

#### Parameters Channel Name List

| Channel Name | Description |
| --- | --- |
| spot/depth5 | 5 Level Depth Channel 
| spot/depth20 | 20 Level Depth Channel 
| spot/depth50 | 50 Level Depth Channel 

### Subscription successful

> Subscription successful

`{   "topic":  "spot/depth5:BTC_USDT",   "event":  "subscribe" }`

`{"event":"subscribe","topic":"<channel>:<symbol>"}`

### After successful subscription, push data

> Push data

`{     "table":"spot/depth5",     "data":[         {             "asks":[                 [                     "161.96",                     "7.37567"                 ]             ],             "bids":[                 [                     "161.94",                     "4.552355"                 ]             ],             "symbol":"ETH_USDT",             "ms_t": 1542337219120         }     ] }`

Return data description:

| Field | Type | Description |
| --- | --- | --- |
| symbol | String | Trading pair, <code>BTC_USDT</code> 
| asks | List<string></string> | Ask depth 
| bids | List<string></string> | Bid depth 
| ms_t | Long | Data push Timestamp (Timestamp in millisecond) 

An example of the array of asks and bids values: \["161.96","7.37567"\], 161.96 is the price, and 7.37567 is the quantity.

## 【Public】Depth-Increase Channel

Return depth data, support the creation of a local full depth cache data

### Pushing Rules

1.  No user login required
2.  After subscribing, the current data will be returned directly, and then the changes will be pushed
3.  Push frequency: The fastest is 100ms once

### Subscribe Request

> Subscribe Request

`{    "op": "subscribe",    "args": ["spot/depth/increase100:BTC_USDT"] }`

> Full depth snapshot data Request

`{    "op": "request",    "args": ["spot/depth/increase100:BTC_USDT"] }`

Message Format:

`{"op": "<op>", "args": ["spot/depth/increase100:<symbol>"]}`

*   op: `subscribe`\=Subscribe, You will receive a message that the subscription is successful, and then you will receive incremental depth data pushed in real time. `request`\=Single request for the latest depth snapshot, You will receive a full depth of data immediately.
*   channel: Channel name, fixed value `spot/depth/increase100`, Support 100 levels
*   symbol: Trading pair, such as `BTC_USDT`

### Subscription successful

> Subscription successful

`{   "topic":  "spot/depth/increase100:BTC_USDT",   "event":  "subscribe" }`

`{"event":"subscribe","topic":"spot/depth/increase100:<symbol>"}`

### Response

> Full depth snapshot data

`{   "data": [{     "asks": [       ["23200", "0.69959"],       ["28000.00", "0.20000"]     ],     "bids": [       ["23105", "1.80114"]     ],     "ms_t": 1698292343610,     "symbol": "BTC_USDT",     "type": "snapshot",     "version": 4   }],   "table": "spot/depth/increase100" }`

> Incremental depth data

`{     "data": [{         "asks": [             ["23200", "0.59959"]         ],         "bids": [],         "ms_t": 1698292358292,         "symbol": "BTC_USDT",         "type": "update",         "version": 5     }],     "table": "spot/depth/increase100" }`

Return data description:

| Field | Type | Description |
| --- | --- | --- |
| symbol | String | Trading pair, <code>BTC_USDT</code> 
| asks | List<string></string> | Ask depth 
| bids | List<string></string> | Bid depth 
| ms_t | Long | Data push Timestamp (Timestamp in millisecond) 
| version | Long | data version 
| type | String | data type<br>-<code>snapshot</code>=Full depth snapshot data<br>-<code>update</code>=Incremental depth data 

An example of the array of asks and bids values: \["411.8","10"\]. 411.8 is the price, and 10 is the quantity.

### How to correctly maintain a copy of OrderBook locally:

1.  First, the client send a subscription request `{"op": "subscribe", "args": ["spot/depth/increase100:<symbol>"] }`
2.  After successful subscription, you will receive two types of messages, `type=snapshot` (full data) and `type=update` (update)
3.  If a type=snapshot type message is received, update the deep snapshot content to the `local cache`. If there is no `local cache`, create one.
4.  If a type=update message is received, update the data in the deep snapshot to `local cache`. The update rules are as follows:
    *   4.1 If the field version number in the received new message is less than or equal to the version in the local cache(new version<=local version), this data can be discarded.
    *   4.2 If the field version number in the new message received is equal to the version in the local cache plus 1(new version==local version+1), the quantity of the corresponding price will be `updated to the local cache`.
    *   4.3 If the field version number in the new message received is greater than the version in the local cache plus 1(new version>local version+1), please obtain the latest depth snapshot from step 7 and overwrite the `local cache`.
5.  The pending order volume in each returned message represents the `absolute value` of the current pending order volume at this price, rather than the relative change.
6.  How to update local cache? Under the premise of 4.2:
    *   6.1 New: If the same price is not already in the local cache, it means that it is a new pending order and needs to be added to the cache.
    *   6.2 Modify or Remove: If the same price is already in the local cache, it means that the quantity has changed. If the quantity is 0, it will be directly removed from the cache. Otherwise, just change the quantity.
7.  Request through request `{"op": "request", "args": ["spot/depth/increase100:<symbol>"] }`to obtain the latest depth snapshot (type=snapshot in the message), and add the depth The content in the snapshot is overwritten to the `local cache`, and then the logic continues from step 2.

*   Abnormal Situation:
    1.  If there is no deep update for a period of time, an empty message 'asks': \[\], 'bids': \[\] will be sent to notify the user that the connection is normal. The pushed version is the same as the previous message. The empty message version=local cache version. can be discarded directly
    2.  Because the depth snapshot has a limit on the number of price tiers, price tiers outside the initial snapshot and without quantity changes will not appear in the incremental depth update information. Therefore, even if all updates from the incremental depth are applied, these price brackets will not be visible in the local order book, so there may be some differences between the local order book and the real order book.

#### Flow Chart

![PNG](../../images/spot_ws_depth_increase_en-7b8d2d05.png)

## 【Public】Trade Channel

Get the latest real-time transaction data

### Pushing Rules

1.  No user login required
2.  After successful subscription, incremental trade messages will be pushed(Taker trade message)
3.  Push frequency: Push when changes

### Subscribe Request

> Subscribe Request

`{   "op": "subscribe",    "args": ["spot/trade:BTC_USDT"] }`

Message Format:

`{"op": "subscribe", "args": ["spot/trade:<symbol>"]}`

*   symbol: Trading pair, such as `BTC_USDT`

### Subscription successful

> Subscription successful

`{   "event":  "subscribe",   "topic":  "spot/trade:BTC_USDT" }`

`{"event":"subscribe","topic":"spot/trade:<symbol>"}`

### After successful subscription, push data

> Push data

`{     "table": "spot/trade",     "data": [{         "symbol": "ETH_USDT",         "price": "162.12",         "side": "buy",         "size": "11.085",         "s_t": 1542337219,         "ms_t": 1542337219120     }] }`

Return data description:

| Field | Type | Description |
| --- | --- | --- |
| symbol | String | Trading pair, <code>BTC_USDT</code> 
| side | String | Side of trade for taker order（<code>buy</code> or <code>sell</code>） 
| price | String | Trade price for taker order 
| size | String | Trade quantity for taker order 
| s_t | Long | Order execution time (Timestamp in seconds) (The field will be removed, please use the ms_t field) 
| ms_t | Long | Order execution time (Timestamp in millisecond) 

## 【Private】Login

### Login Subscription Format

> Request Format

`{"op":"login","args":["<YOUR_API_KEY>", "<timestamp>", "<sign>"]}`

*   API\_KEY: The user's API key
*   timestamp: Timestamp, the unit is milliseconds, it will expire after 60 seconds
*   sign: Signature, sign=CryptoJS.HmacSHA256(timestamp + "#" + api\_memo + "#" + "bitmart.WebSocket", secret)

### Example

> Login Example

`{"op": "login", "args": ["80618e45710812162b04892c7ee5ead4a3cc3e56", "1589267764859", "3ceeb7e1b8cb165a975e28a2e2dfaca4d30b358873c0351c1a071d8c83314556"]}`

> Response

`{"event":"login"}`

Assume that the values of the API requested by the user is as follows:

*   timestamp=1589267764859
*   API\_KEY = "80618e45710812162b04892c7ee5ead4a3cc3e56"
*   API\_SECRET = "6c6c98544461bbe71db2bca4c6d7fd0021e0ba9efc215f9c6ad41852df9d9df9"
*   API\_MEMO = "test001";

Ues Javascript create param `sign`: sign = `CryptoJS.HmacSHA256(1589267764859 + "#" + test001 + "#" + "bitmart.WebSocket", '6c6c98544461bbe71db2bca4c6d7fd0021e0ba9efc215f9c6ad41852df9d9df9')` = 3ceeb7e1b8cb165a975e28a2e2dfaca4d30b358873c0351c1a071d8c83314556

Ues Shell create param `sign`: sign = `echo -n '1589267764859#test001#bitmart.WebSocket' | openssl dgst -sha256 -hmac "6c6c98544461bbe71db2bca4c6d7fd0021e0ba9efc215f9c6ad41852df9d9df9"` (stdin)= 3ceeb7e1b8cb165a975e28a2e2dfaca4d30b358873c0351c1a071d8c83314556

The final login parameters are:

`{"op": "login", "args": ["80618e45710812162b04892c7ee5ead4a3cc3e56", "1589267764859", "3ceeb7e1b8cb165a975e28a2e2dfaca4d30b358873c0351c1a071d8c83314556"]}`

#### Note

1\. If return data does not contain the error\_code field, it indicates success  
2\. If the login fails, the link will be automatically disconnected  

## 【Private】Order Progress

Subscribe to the order execution progress of a single trading pair, or you can subscribe to the order execution progress of all trading pairs at once.

### Pushing Rules

1.  User login required
2.  Qualified orders will be pushed (Successfully placed an order, Partially filled, Fully filled, Canceled)
3.  Push frequency: Push when changes

### Subscribe Request

> Order transaction progress subscription request for a single trading pair

`{   "op": "subscribe",    "args": ["spot/user/order:BTC_USDT"] }`

> Order transaction progress subscription request for all trading pairs

`{   "op": "subscribe",    "args": ["spot/user/orders:ALL_SYMBOLS"] }`

Message Format:

1.The order transaction progress subscription of a single trading pair:

`{"op": "subscribe", "args": ["spot/user/order:<symbol>"]}`

*   channel: Channel name, such as `spot/user/order`
*   symbol: Trading pair, such as `BTC_USDT`

2.The order transaction progress of all trading pairs:

*   channel: Channel name, such as `spot/user/orders`
*   symbol: All Trading pair, fixed value: `ALL_SYMBOLS`

**Note: The channel names subscribed to for a single trading pair and all trading pairs are different**

### Subscription successful

> Single trading pair subscription successful

`{   "event":  "subscribe",   "topic":  "spot/user/order:BTC_USDT" }`

1.The order transaction progress subscription of a single trading pair was successfully subscribed.

`{"event":"subscribe","topic":"spot/user/order:<symbol>"}`

> All trading pairs subscription successful

`{   "event":  "subscribe",   "topic":  "spot/user/orders:ALL_SYMBOLS" }`

2.The order transaction progress of all trading pairs has been successfully subscribed.

`{"event":"subscribe","topic":"spot/user/orders:ALL_SYMBOLS"}`

### After successful subscription, push data

> Push data

`{     "data":[         {             "symbol":"BTC_USDT",             "side":"buy",             "type":"market",             "notional":"",             "size":"1.0000000000",             "ms_t":"1609926028000",             "price":"46100.0000000000",             "filled_notional":"46100.0000000000",             "filled_size":"1.0000000000",             "margin_trading":"0",             "state":"4",             "order_id":"2147857398",             "order_type":"0",             "last_fill_time":"1609926039226",             "last_fill_price":"46100.00000",             "last_fill_count":"1.00000",             "exec_type":"M",             "detail_id":"256348632",             "client_order_id":"order4872191",             "create_time":"1609926028000",             "update_time":"1609926044000",             "order_mode":"0",             "entrust_type":"normal",             "order_state":"partially_filled",             "dealFee":"10.00",             "deal_fee_coin_name":"BMX"         }     ],     "table":"spot/user/order" }`

Return data description:

| Field | Type | Description |
| --- | --- | --- |
| symbol | string | Trading pair, <code>BTC_USDT</code> 
| order_id | string | Order ID 
| price | string | Order price 
| size | string | Order quantity 
| notional | string | The purchase amount, returned when buying at market price; otherwise, an empty string is returned 
| side | string | Side<br>-<code>buy</code><br>-<code>sell</code> 
| type | string | Type<br>-<code>limit</code><br>-<code>market</code> 
| ms_t | string | Order Create Timestamp (in milliseconds) 
| filled_size | string | Filled size (Base currency) 
| filled_notional | string | Filled notional amount (Quote currency) 
| margin_trading | string | <code>0</code>：Spot order (The field will be removed, please use the order_mode field) 
| order_type | string | Order type (The field will be removed, please use the entrust_type field)<br>-<code>0</code>=Regular<br>-<code>1</code>=Maker only(Post only)<br>-<code>2</code>=Fill or kill(FOK)<br>-<code>3</code>=Immediate or Cancel(IOC) 
| state | string | Order state (The field will be removed, please use the order_state field)<br>-<code>4</code>=Order success, Pending for fulfilment<br>-<code>5</code>=Partially filled<br>-<code>6</code>=Fully filled<br>-<code>8</code>=Canceled<br>-<code>12</code>=Canceled after Partially filled 
| last_fill_price | string | Latest trade price(0 if not filled) 
| last_fill_count | string | Latest trade quantity(0 if not filled） 
| last_fill_time | string | Latest trade time(0 if not filled) millisecond 
| exec_type | string | Whether the trade was created by a maker or a taker.<br>-<code>M</code>=Maker<br>-<code>T</code>=Taker 
| detail_id | string | Trade id 
| client_order_id | string | Client-defined OrderId 
| create_time | String | Order Create Timestamp (in milliseconds) 
| update_time | String | Order Update Timestamp (in milliseconds) 
| order_mode | String | Order mode<br>-<code>spot</code>=spot<br>-<code>iso_margin</code>=margin 
| entrust_type | String | Order Type<br>-<code>NORMAL</code>=Normal trade order(Limit Order or Market Order)<br>-<code>LIMIT_MAKER</code>=PostOnly Order<br>-<code>IOC</code>=IOC Order 
| order_state | String | Order State<br>-<code>new</code>=The order has been accepted by the engine.<br>-<code>partially_filled</code>=A part of the order has been filled.<br>-<code>filled</code>=The order has been completed.<br>-<code>canceled</code>=The order has been canceled by the user.<br>-<code>partially_canceled</code>=A part of the order has been filled , and the order has been canceled. 
| dealFee | String | Fee 
| deal_fee_coin_name | String | Fee coin name 

**Notice：This data is displayed after decompression, [Refer to Data Compression for details](#data-compression)**

## 【Private】Balance Change

Balance change push

### Pushing Rules

1.  User login required
2.  Qualified balance changes (recharge, withdrawal, transfer, transaction, BMX handling fee deduction)
3.  Push frequency: Push when changes

### Subscribe Request

> Subscribe Request

`{   "op": "subscribe",   "args": ["spot/user/balance:BALANCE_UPDATE"] }`

Message Format:

`{"op": "subscribe", "args": ["spot/user/balance:BALANCE_UPDATE"]}`

*   Includes changes in all currency balances

### Subscription successful

> Subscription successful

`{   "event":  "subscribe",   "topic":  "spot/user/balance:BALANCE_UPDATE" }`

`{"event": "subscribe","topic": "spot/user/balance:BALANCE_UPDATE"}`

### After successful subscription, push data

> Push data

`{   "data":[     {       "event_type":"TRANSACTION_COMPLETED  ",       "event_time":"1693364237000",       "balance_details":[{         "ccy": "BTC",         "av_bal": "123.22",         "fz_bal": "12.56"       }]     }   ],   "table":"spot/user/balance" }`

Return data description:

| Field | Type | Description |
| --- | --- | --- |
| event_type | string | Type for change<br>-<code>TRANSACTION_COMPLETED</code>=Trade<br>-<code>ACCOUNT_RECHARGE</code>=Recharge<br>-<code>ACCOUNT_WITHDRAWAL</code>=Withdraw<br>-<code>ACCOUNT_TRANSFER</code>=Transfer<br>-<code>BMX_DEDUCTION</code>=BMX handling fee deduction 
| event_time | string | Create time 
| balance_details | string | Detail 
| &gt;ccy | string | Changing Balance Currency 
| &gt;av_bal | string | Available balance after change 
| &gt;fz_bal | string | Freeze balance after change 

**Notice：This data is displayed after decompression, [Refer to Data Compression for details](#data-compression)**
