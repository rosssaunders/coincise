# Introduction

## Connection Limits

A single websocket is limited to a maximum of 200 topics; exceeding this will return error code 100416.

A single IP is limited to a maximum of 60 websockets; exceeding this will return error code 100419.

## Access

Market Websocket access URL: wss://open-api-ws.bingx.com/market

## Data Compression

All response data from Websocket server are compressed into GZIP format. Clients have to decompress them for further use.

## Heartbeats

Once the Websocket Client and Websocket Server get connected, the server will send a heartbeat- ping message every 5 seconds (the frequency might change).

{"ping":"2177c68e4d0e45679965f482929b59c2","time":"2022-06-07T16:27:36.323+0800"}

When the Websocket Client receives this heartbeat message, it should return pong message.

{"pong":"2177c68e4d0e45679965f482929b59c2","time":"2022-06-07T16:27:36.323+0800"}

## Unsubscribe

The format of unsubscription is as follows:

{ "id": "id1", "reqType": "unsub", "dataType": "data to unsub"}

Confirmation of Unsubscription:

{ "id": "id1", "code": 0, "msg": "" }

### Symbol Description

Symbol must be fully capitalized

## Subscriptions

After successfully establishing a connection with the Websocket server, the Websocket client sends the following request to subscribe to a specific topic:

{ "id": "id1", "reqType": "sub", "dataType": "data to sub" }

-   ID is the unique ID passed in by the user, which will be returned when returned, used for distinguishing idempotence checks by the user

After a successful subscription, the Websocket client will receive a confirmation message:

{ "id": "id1", "code": 0, "msg": "" }

After that, once the subscribed data is updated, the Websocket client will receive the update message pushed by the server.

-   Code Error Code Description

0:"SUCCESS"

/\*\*

\* 100xxx is a universal status code.

\*/

// No data found in server search

100204:"SEARCH\_NO\_CONTENT"

// Duplicate Request

100205:"REPEAT\_REQUEST"

// Client request parameter error

100400:"ILLEGAL\_ARGUMENT"

// Client authentication failed

100401:"AUTHENTICATION\_FAIL"

// Client permission verification failed

100403:"AUTHORIZATION\_FAIL"

// Client request frequency limit

100410:"FREQUENCY\_LIMIT"

// Server error

100500:"INTERNAL\_SERVER\_ERROR"

// Server Busy

100503:"SERVER\_BUSY"

---

# Listen Key

websocket interface

wss://open-api-ws.bingx.com/market

account subscription data stream /market?listenKey=

wss://open-api-ws.bingx.com/market?listenKey=a8ea75681542e66f1a50a1616dd06ed77dab61baa0c296bca03a9b13ee5f2dd7

## generate Listen Key

POST /openApi/user/auth/userDataStream

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

listen key Valid for 1 hour

interface

CURL

response

{"listenKey":"a8ea75681542e66f1a50a1616dd06ed77dab61baa0c296bca03a9b13ee5f2dd7"}

### Request Parameters

| Parameter Name | Type | Required | Description |  |
| --- | --- | --- | --- | --- |
| X-BX-APIKEY | string | no | API KEY |

### Response Parameters

| Parameter Name | Type | Description |  |
| --- | --- | --- | --- |
| listenKey | string | listen Key |

### Errors

| Error Code | Description |
| --- | --- |
| 80014 | timestamp is invalid |
| 100421 | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets |
| 100419 | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set |
| 100410 | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249 |
| 100410 | rate limited |
| 100413 | Incorrect apiKey |
| 100410 | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155 |

## extend Listen Key Validity period

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

The validity period is extended to 60 minutes after this call, and it is recommended to send a ping every 30 minutes.

CURL

response

-   http status 200 success

-   http status 204 not content

-   http status 404 not find key

[1\. Create Account](https://bingx.com) [2\. Pass KYC/KYB](https://bingx.com/en-us/account/api/) [3\. Create API KEY](https://bingx.com/en-us/account/api/) [4\. Configure API KEY permissions](https://bingx.com/en-us/account/api/) [5\. Understanding signature authentication](https://bingx-api.github.io/docs/#/en-us/swapV2/authentication.html#Signature%20Description) _6\. Run the following example code_ [7\. Understand common error codes](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Common%20Error%20Codes) [8\. Understand rate limitations](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Rate%20limit) [9\. Understanding request timestamps](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Timestamp) [10\. Understand fee schedule](https://bingx.com/en-us/support/costs/) [11\. Understand trading rules](https://bingx.com/en-us/tradeInfo/perpetual/trading-rules/BTC-USDT)

request parameters https://open-api.bingx.com

PUT /openApi/user/auth/userDataStream

### Request Parameters

| Parameter Name | Type | Required | Description |  |
| --- | --- | --- | --- | --- |
| listenKey | string | yes | listen Key |

### Errors

| Error Code | Description |
| --- | --- |
| 80014 | timestamp is invalid |
| 100421 | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets |
| 100419 | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set |
| 100410 | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249 |
| 100410 | rate limited |
| 100413 | Incorrect apiKey |
| 100410 | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155 |

## delete Listen Key

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

delete User data flow.

CURL

response

-   http status 200 success

-   http status 204 not content

-   http status 404 not find key

[1\. Create Account](https://bingx.com) [2\. Pass KYC/KYB](https://bingx.com/en-us/account/api/) [3\. Create API KEY](https://bingx.com/en-us/account/api/) [4\. Configure API KEY permissions](https://bingx.com/en-us/account/api/) [5\. Understanding signature authentication](https://bingx-api.github.io/docs/#/en-us/swapV2/authentication.html#Signature%20Description) _6\. Run the following example code_ [7\. Understand common error codes](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Common%20Error%20Codes) [8\. Understand rate limitations](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Rate%20limit) [9\. Understanding request timestamps](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Timestamp) [10\. Understand fee schedule](https://bingx.com/en-us/support/costs/) [11\. Understand trading rules](https://bingx.com/en-us/tradeInfo/perpetual/trading-rules/BTC-USDT)

request parameters https://open-api.bingx.com

DELETE /openApi/user/auth/userDataStream

### Request Parameters

| Parameter Name | Type | Required | Description |  |
| --- | --- | --- | --- | --- |
| listenKey | string | yes | listen Key |

### Errors

| Error Code | Description |
| --- | --- |
| 80014 | timestamp is invalid |
| 100421 | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets |
| 100419 | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set |
| 100410 | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249 |
| 100410 | rate limited |
| 100413 | Incorrect apiKey |
| 100410 | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155 |

---

# Websocket Market Data

## Subscription transaction by transaction

Subscribe to the trade detail data of a trading pair

Due to multi-threaded push, it cannot be guaranteed that the push transaction ID is orderedg

Subscription Type

The dataType is <symbol>@trade E.g. BTC-USDT@trade ETH-USDT@trade

Subscription example

{"id":"24dd0e35-56a4-4f7a-af8a-394c7060909c","reqType": "sub","dataType":"BTC-USDT@trade"}

Subscription Parameters

### Request Parameters

| Parameter Name | Type | Required | Field Description |  |
| --- | --- | --- | --- | --- |
| symbol | string | yes | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT |

### Data Parameters

|  | Description |  |
| --- | --- | --- |
| e | Event Type |
| E | event time |
| s | trading pair |
| t | Transaction ID |
| p | transaction price |
| q | Executed quantity |
| T | transaction time |
| m | Whether the buyer is a market maker. If true, this transaction is an active sell order, otherwise it is an active buy order. |

## K-line Streams

Subscribe to market k-line data of one trading pair

Subscription Type

The dataType is <symbol>@kline\_<interval> E.g.BTC-USDT@kline\_1min

Subscription Example

{"id":"e745cd6d-d0f6-4a70-8d5a-043e4c741b40","reqType": "sub","dataType":"BTC-USDT@kline\_1min"}

Subscription Parameters

### Request Parameters

| Parameter Name | Type | Required | Field Description |  |
| --- | --- | --- | --- | --- |
| symbol | string | yes | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT |
| interval | string | yes | Reference field description, K-line type |

### Data Parameters

|  | Description |  |
| --- | --- | --- |
| E | event time |
| K | data |
| e | Event Type |
| s | trading pair |

### Order Parameters

|  | Description |  |
| --- | --- | --- |
| T | The end time of this K-line |
| c | The last transaction price during this K-line period |
| h | The highest transaction price during this K-line period |
| i | K-line interval |
| l | The lowest transaction price during this K-line period |
| n | Number of transactions during this K-line period |
| o | The first transaction price during this K-line period |
| q | Transaction volume during this K-line period |
| s | trading pair |
| t | The starting time of this K-line |
| v | Trading volume during this K-line period |

## Subscribe Market Depth Data

Push limited file depth information every 300ms .default level 20

Subscription Type

The dataType is <symbol>@depth<level> E.g.BTC-USDT@depth50

Subscription example

{"id":"975f7385-7f28-4ef1-93af-df01cb9ebb53","reqType": "sub","dataType":"BTC-USDT@depth50"}

Subscription Parameters

### Request Parameters

| Parameter Name | Type | Required | Field Description |  |
| --- | --- | --- | --- | --- |
| symbol | string | yes | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT |

### Order Parameters

|  | Description |  |
| --- | --- | --- |
| level5 | level 5 |
| level10 | level 10 |
| level20 | level 20 |
| level50 | level 50 |
| level100 | level 100 |

## Subscribe to 24-hour Price Change

Pushes data of 24-hour price change every 1000ms

Subscription Type

dataType is <symbol>@ticker, for example, BTC\_USDT@ticker

Subscription Example

{"id":"975f7385-7f28-4ef1-93af-df01cb9ebb53","reqType": "sub","dataType":"BTC-USDT@ticker"}

Subscription Parameters

### Request Parameters

| Parameter Name | Type | Required | Field Description |  |
| --- | --- | --- | --- | --- |
| symbol | string | Yes | Trading pair, e.g., BTC-USDT |

## Spot Latest Trade Price

Real-time Push

Subscription Type

dataType is <symbol>@lastPrice, for example, BTC\_USDT@lastPrice

Subscription Example

{"id":"975f7385-7f28-4ef1-93af-df01cb9ebb53","reqType": "sub","dataType":"BTC-USDT@lastPrice"}

Subscription Parameters

### Request Parameters

| Parameter Name | Type | Required | Field Description |  |
| --- | --- | --- | --- | --- |
| symbol | string | Yes | Trading pair, e.g., BTC-USDT |

## Spot Best Order Book

Real-time Push

Subscription Type

dataType is <symbol>@bookTicker, for example, BTC\_USDT@bookTicker

Subscription Example

{"id":"975f7385-7f28-4ef1-93af-df01cb9ebb53","reqType": "sub","dataType":"BTC-USDT@bookTicker"}

Subscription Parameters

### Request Parameters

| Parameter Name | Type | Required | Field Description |  |
| --- | --- | --- | --- | --- |
| symbol | string | Yes | Trading pair, e.g., BTC-USDT |

## Incremental and Full Depth Information

Push incremental depth information of 1000 levels every 500ms.

How the client should maintain incremental depth locally

1\. After successfully subscribing, a full depth with an action field value of 'all' will be returned, along with a lastUpdateId used to handle the continuity of subsequent incremental depth. After receiving the full depth, the WebSocket should cache the full depth data in memory.

2\. Subsequent depth changes will return incremental depth, with the action field set to 'update'. The value of the Nth incremental depth's lastUpdateId should be the N-1th depth's lastUpdateId + 1.

3\. In rare cases where lastUpdateId is not continuous, you can choose to reconnect, or cache the last three incremental depths and try to merge the data by finding continuous lastUpdateId from the cache (because due to multithreading or network routing issues, data order may not be strongly guaranteed).

4\. Then, iterate over the received incremental depth and compare it with the current depth one by one. It's recommended to consider thread-safe design and coding practices (as the push frequency may increase later). The data structure could be a sorted map, such as TreeMap:

(1) If the price level does not exist in the current depth, it means a new price level should be added. (Add)

(2) If the quantity corresponding to the price is 0, the price level should be removed from the current depth. (Delete)

(3) If the quantity corresponding to the price is different from the current value, replace it with the quantity returned by the incremental depth. (Update)

(4) After traversing, you will obtain the latest depth, update the depth cache, and remember to update the lastUpdateId.

Subscription Type

dataType is <symbol>@incrDepth, for example, BTC-USDT@incrDepth

Subscription Example

{"id":"975f7385-7f28-4ef1-93af-df01cb9ebb53","reqType": "sub","dataType":"BTC-USDT@incrDepth"}

Subscription Parameters

### Request Parameters

| Parameter Name | Type | Required | Field Description |  |
| --- | --- | --- | --- | --- |
| symbol | string | Yes | Symbol name, the symbol must include a '-' like BTC-USDT |

---

