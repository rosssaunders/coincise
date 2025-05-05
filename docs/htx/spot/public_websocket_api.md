# HTX Public WebSocket API Documentation

## Quick Start

### Preparation

Before you use API, you need to login the website to create API Key with proper
permissions. The API key is shared for all instruments in HTX including spot,
futures, swap, options.

You can manage your API Keys [here](https://www.htx.com/apikey/).

Every user can create at most 20 API Keys, each can be applied with either
permission below:

- Read permission: It is used to query the data, such as order query, trade
  query.
- Trade permission: It is used to create order, cancel order and transfer, etc.
- Withdraw permission: It is used to create withdraw order, cancel withdraw
  order, etc.

Please remember below information after creation:

- `Access Key` It is used in API request
- `Secret Key` It is used to generate the signature (only visible once after
  creation)

The API Key can bind maximum 20 IP addresses (either host IP or network IP), we
strongly suggest you bind IP address for security purpose. The API Key without
IP binding will be expired after 90 days.

**Warning** : These two keys are important to your account safety, please don't
share **both** of them together to anyone else (including any product or person
from HTX). If you find your API Key is disposed, please remove it immediately.

### SDK and Demo

**SDK (Suggested)**

[Java](https://github.com/huobiapi/huobi_Java) |
[Python3](https://github.com/huobiapi/huobi_Python) |
[C++](https://github.com/huobiapi/huobi_Cpp) |
[C#](https://github.com/HuobiRDCenter/huobi_CSharp) |
[Go](https://github.com/huobirdcenter/huobi_golang)

**Other Demos**

[https://github.com/huobiapi?tab=repositories](https://github.com/huobiapi?tab=repositories)

### Testnet (Stopped)

The testnet has been alive for months, however the active user count is rather
low and the cost is high, after considering carefully we decide to shutdown the
testnet environment.

It is suggest you use live environment, which is more stable and has more
liquidity.

### Interface Type

There are two types of interface, you can choose the proper one according to
your scenario and preferences.

#### REST API

REST (Representational State Transfer) is one of the most popular communication
mechanism under HTTP, each URL represents a type of resource.

It is suggested to use Rest API for one-off operation, like trading and
withdraw.

#### WebSocket API

WebSocket is a new protocol in HTML5. It is full-duplex between client and
server. The connection can be established by a single handshake, and then server
can push the notification to client actively.

It is suggest to use WebSocket API to get data update, like market data and
order update.

**Authentication**

Both API has two levels of authentication:

Public API: It is for basic information and market data. It doesn't need
authentication.

Private API: It is for account related operation like trading and account
management. Each private API must be authenticated with API Key.

### Access URLs

You can compare the network latency between two domain api.huobi.pro and
api-aws.huobi.pro, and then choose the better one for you.

In general, the domain api-aws.huobi.pro is optimized for AWS client, the
latency will be lower.

**REST API**

**`https://api.huobi.pro`**

**`https://api-aws.huobi.pro`**

**Websocket Feed (market data except MBP incremental)**

**`wss://api.huobi.pro/ws`**

**`wss://api-aws.huobi.pro/ws`**

**Websocket Feed (market data only MBP incremental)**

**`wss://api.huobi.pro/feed`**

**`wss://api-aws.huobi.pro/feed`**

**Websocket Feed (account and order)**

**`wss://api.huobi.pro/ws/v2`**

**`wss://api-aws.huobi.pro/ws/v2`**

Please initiate API calls with non-China IP.

It is not recommended to use proxy to access HTX API because it will introduce
high latency and low stability.

It is recommended to access HTX API from AWS Japan for better stability. If your
server is in China mainland, it may be not stable.

### Glossary

#### Trading symbols

The trading symbols are consist of base currency and quote currency. Take the
symbol `BTC/USDT` as an example, `BTC` is the base currency, and `USDT` is the
quote currency.

#### Account

The `account-id` defines the Identity for different business type, it can be
retrieved from API `/v1/account/accounts` , where the `account-type` is the
business types.The types include:

- spot: Spot account
- otc: OTC account
- margin: Isolated margin account, the detailed currency type is defined in
  `subType`
- super-margin / cross-margin: Cross-margin account
- investment: c2c margin lending account
- borrow: c2c margin borrowing account
- point: Point card account
- minepool: Minepool account
- etf: ETF account

You can refer to [HTX Course](https://www.huobi.com/en-us/guide/) to get
detailed information

## API Access

### Overview

| Category     | URL Path                      | Description                                                         |
| ------------ | ----------------------------- | ------------------------------------------------------------------- |
| Common       | /v1/common/\*                 | Common interface, including currency, currency pair, timestamp, etc |
| Market Data  | /market/\*                    | Market data interface, including trading, depth, quotation, etc     |
| Account      | /v1/account/\* /v1/subuser/\* | Account interface, including account information, sub-user ,etc     |
| Order        | /v1/order/\*                  | Order interface, including order creation, cancellation, query, etc |
| Margin       | /v1/margin/\*                 | Margin interface, including debit, payment, query, etc              |
| Cross Margin | /v1/cross-margin/\*           | Cross margin interface, including debit, payment, query, etc        |

Above is a general category, it doesn't cover all API, you can refer to detailed
API document according to your requirement.

### New Version Rate limit Rule

- The new version rate limit is applied on UID basis, which means, the overall
  access rate, from all API keys under same UID, to single endpoint, shouldn’t
  exceed the rate limit applied on that endpoint.
- It is suggested to read HTTP Header `X-HB-RateLimit-Requests-Remain` and
  `X-HB-RateLimit-Requests-Expire` to get the remaining count of request and the
  expire time for current rate limit time window, then you can adjust the API
  access rate dynamically.

### Request Format

The API is restful and there are two method: GET and POST.

- GET request: All parameters are included in URL, and do not carry
  body(content-length>0), in otherwise will return 403 error code.
- POST request: All parameters are formatted as JSON and put int the request
  body

### Response Format

The response is JSON format.There are four fields in the top level: `status`,
`ch`, `ts` and `data`. The first three fields indicate the general status, the
business data is is under `data` field.

Below is an example of response:

```
{"status":"ok","ch":"market.btcusdt.kline.1day","ts":1499223904680,"data"://perAPIresponsedatainnestedJSONobject}
```

| Field  | Data Type | Description                                                           |
| ------ | --------- | --------------------------------------------------------------------- |
| status | string    | Status of API response                                                |
| ch     | string    | The data stream. It may be empty as some API doesn't have data stream |
| ts     | int       | The UTC timestamp when API respond, the unit is millisecond           |
| data   | object    | The body data in response                                             |

### Data Type

The JSON data type described in this document is defined as below:

- `string`: a sequence of characters that are quoted
- `int`: a 32-bit integer, mainly used for status code, size and count
- `long`: a 64-bit integer, mainly used for Id and timestamp
- `float`: a fraction represented in decimal format, mainly used for volume and
  price, recommend to use high precision decimal data types in program

### Best Practice

#### Security

- It is strongly suggested to bind your IP with your API Key to ensure that your
  API Key can only be used in your machine. Furthermore, your API Key will be
  expired after 90 days if it is not binded with any IP.
- It is strongly suggested not to share your API Key with any body or
  third-party software, otherwise your personal information and asset may be
  stolen. If your expose your API Key by accident, please do delete the API Key
  and create a new one.

#### General

**API Access**

- It is suggested not to use temporary domain or proxy, which may be not stable.
- It is suggested to use AWS Japan to access API for lower latency
- It is suggested to connect to domain `api-aws.huobi.pro` if your server is
  based on AWS, because this domain is optimized for AWS client, the latency
  will be lower.

**New Version Rate limit Rule**

- Only those endpoints marked with rate limit value separately are applied with
  new rate limit rule.
- It is suggested to read HTTP Header `X-HB-RateLimit-Requests-Remain` and
  `X-HB-RateLimit-Requests-Expire` to get the remaining count of request and the
  expire time for current rate limit time window, then you can adjust the API
  access rate dynamically.
- The overall access rate, from all API keys under same UID, to single endpoint,
  shouldn’t exceed the rate limit applied on that endpoint.

#### Market

**Market data**

- It is suggested to use WebSocket interface to subscribe the market update and
  then cache the data locally, because WebSocket notification has lower latency
  and not have rate limit.
- It is suggested not to subscribe too many topics in a single websocket
  connection, it may generate more notifications and cause network latency and
  disconnection.

**Latest trade**

- It is suggested to subscribe WebSocket topic `market.$symbol.trade.detail`,
  the response field `price` represents the latest price, and it has lower
  latency.
- It is suggested to use `tradeId` to de-duplicate if you subscribe WebSocket
  topic `market.$symbol.trade.detail`.

**Depth**

- It is suggested to subscribe WebSocket topic `market.$symbol.bbo` if you only
  need the best bid and best offer.
- It is suggested to subscribe WebSocket topic `market.$symbol.depth.$type` if
  you need multiple bid and offer with normal latency.
- It is suggested to subscribe WebSocket topic `market.$symbol.mbp.$level` if
  you need multiple bid and offer with lower latency
- It is suggested to use `version` field to de-duplicate and discard the smaller
  data if you use Rest interface `/market/depth` and WebSocket topic
  `market.$symbol.depth.$type`. It is suggest to use `seqNum` to de-duplicate
  and discard the smaller data if yo subscribe WebSocket topic
  `market.$symbol.mbp.$levels`.

#### Order

**Place an order (/v1/order/orders/place)**

- It is suggested to follow the symbol reference (`/v1/common/symbols`) to
  validate the amount and value before placing the older, otherwise you may
  place an invalid order and waste your time.
- It is suggested to provide an unique `client-order-id` field when placing the
  order, it is useful to track your orders status if you fail to get the order
  id response. Later you can use the `client-order-id` to match the WebSocket
  order notification or query order detail by interface
  `/v1/order/orders/getClientOrder`.The uniqueness of the clientOrderId passed
  in when you place an order will no longer be verified. We recommend you to
  manage clientOrderId by yourself to ensure its uniqueness. If multiple orders
  use the same clientOrderId, the latest order corresponding to the
  clientOrderId will be returned when querying/canceling an order.

**Search history olders (/v1/order/orders)**

- It is recommended to use `start-time` and `end-time` to query, that are two
  timestamps with 13 digits (millisecond). The maximum query time window is 48
  hours (2 days), the more precision you provide, the better performance you
  will get. You can query for multiple iterations.

**Order update**

- It is suggested to subscribe WebSocket topic `orders.$symbol`, which has lower
  latency and more accurate sequence.

#### Account

**Asset update**

- It is suggested to subscribe both WebSocket topic `orders.$symbol` and
  `account.update#${mode}`. The former one tells the order status update and
  arrives earlier than the latter one, and the latter one confirms the final
  asset balance.
- It is suggested not to subscribe WebSocket topic `accounts`, which is replaced
  by `accounts.update#${mode}`, and will be retired later.

## Reference Data

### Introduction

Reference data APIs provide public reference information such as system status,
market status, symbol info, currency info, chain info and server timestamp.

## Market Data

### Introduction

Market data APIs provide public market information such as varies of
candlestick, depth and trade information.

The market data is updated **once per second**.

## Websocket Market Data

### Introduction

#### Websocket URL

**Websocket Market Feed (excluding MBP incremental channel & its REQ channel)**

**`wss://api.huobi.pro/ws`** or **`wss://api-aws.huobi.pro/ws`**

**MBP incremental channel & its REQ channel)**

**`wss://api.huobi.pro/feed`** or **`wss://api-aws.huobi.pro/feed`**

#### Data Format

All return data of websocket Market APIs are compressed with GZIP so they need
to be unzipped.

#### Heartbeat and Connection

{"ping": 1492420473027}

After connected to Huobi's Websocket server, the server will send heartbeat
periodically (currently at 5s interval). The heartbeat message will have an
integer in it, e.g.

{"pong": 1492420473027}

When client receives this heartbeat message, it should respond with a matching
"pong" message which has the same integer in it, e.g.

After the server sent two consecutive heartbeat messages without receiving at
least one matching "pong" response from a client, then right before server sends
the next "ping" heartbeat, the server will be disconnected with the client
server.

#### Subscribe to Topic

Sub request:

{ "sub": "market.btcusdt.kline.1min", "id": "id1" }

To receive data you have to send a "sub" message first.

`{` `"sub": "topic to sub",` `"id": "id generate by client"` `}`

Sub response:

{ "id": "id1", "status": "ok", "subbed": "market.btcusdt.kline.1min", "ts":
1489474081631 }

After successfully subscribed, you will receive a response to confirm
subscription

Then, you will received messages when there is any update in the subcribed
topics.

#### Unsubscribe

UnSub request:

{ "unsub": "market.btcusdt.trade.detail", "id": "id4" }

To unsubscribe, you need to send below message

`{` `"unsub": "topic to unsub",` `"id": "id generate by client"` `}`

UnSub response:

{ "id": "id4", "status": "ok", "unsubbed": "market.btcusdt.trade.detail", "ts":
1494326028889 }

And you will receive a message to confirm the action.

#### Pull Data

While connected to websocket, you can also use it in pull style by sending
message to the server.

To request pull style data, you send below message

`{` `"req": "topic to req",` `"id": "id generate by client"` `}`

You will receive a response accordingly and immediately

#### Rate Limit

**Rate limt of pull style query (req)**

The limitation of single connection is 100 ms.

### Error Code

Below is the error code, error message and description returned by Market
WebSocket

| Error Code  | Error Message               | Description                            |
| ----------- | --------------------------- | -------------------------------------- |
| bad-request | invalid topic               | Parameter topic is invalid             |
| bad-request | invalid symbol              | Parammeter symbol is invalid           |
| bad-request | symbol trade not open now   | The market is not open for this symbol |
| bad-request | 429 too many request        | Request exceed limit                   |
| bad-request | unsub with not subbed topic | The topic is not subscribed            |
| bad-request | not json string             | The request is not JSON format         |
| bad-request | request timeout             | The request is time out                |

## Spot

### Introduction

Welcome to HTX API！

This is the official HTX API document, and will be continue updating. HTX will
also publish API announcement in advance for any API change. Please subscribe to
our announcements so that you can get the latest updates.

You can click [Here](https://www.huobi.pe/support/en-us/list/360000070201) to
view the announcements. If you want to subscribe, please click "Follow" button
in the top right of the page. After login and click "Follow" again, then choose
the type you want to follow. After you subscribe, the button will be changed to
"Following". If you don't have any account, you need to register first in the
login dialog.

**How to read this document**

The top of the document is the navigation menu for different API business; The
language button in the top right is for different languages, it supports Chinese
and English right now. The main content of each API document has three parts,
the left hand side is the contents, the middle part is the document body, and
the right hand side is the request and response sameple.

Below is the content for Spot API document

The first part is the overview:

- **Quick Start**: It introduces the overall knowledge of HTX API, and
  suitability for new HTX API user
- **API Explorer**: It introduces the API Explorer online tool, which is
  convenient for user to invoke and observe the API
- **FAQ**: It lists the frequently asked questions regardless the specific API
- **Contact Us**: It introduces how to contact us according to different
  subjects

The second part is detail for each API. Each API category is listed in one
section, and each each section has below contents:

- **Introduction**: It introduces notes and description for this API category
- **_Specific API_**: It introduces the usage, rate limit, request, parameters
  and response for each API
- **Error Code**: It lists the common error code and the description for this
  API category
- **FAQ**: It lists the frequently asked questions for this API category

## Endpoints

### market.\$symbol\$.kline.\$period\$ ( Market Candlestick)

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

#### Data Update

| Parameter  | Data Type | Required | Description                                                      | Value Range |
| ---------- | --------- | -------- | ---------------------------------------------------------------- | ----------- |
| ch         | string    | false    | Data belonged channel，Format：market.\$symbol.kline.\$period    |             |
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

```
{
  "id": "id1",
  "sub": [
    "market.btcusdt.kline.1min",
    "market.ethusdt.kline.5min",
    "market.solusdt.kline.15min"
  ]
}
```

#### Example of a Successful Subscription

```
{
  "id": "id1",
  "status": "ok",
  "subbed": "market.ethbtc.kline.1min",
  "ts": 1489474081631
}
```

#### Example of a Data Update

```
{
  "ch": "market.ethbtc.kline.1min",
  "ts": 1630981694370,
  "tick": {
    "id": 1630981680,
    "open": 0.074849,
    "close": 0.074848,
    "low": 0.074848,
    "high": 0.074849,
    "amount": 2.4448,
    "vol": 0.1829884187,
    "count": 3
  }
}
```

#### Example of a Subscription Cancellation

```
{
  "unsub": "market.ethbtc.kline.1min",
  "id": "id1"
}
```

### market.\$symbol.bbo ( Best Bid/Offer)

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

| Parameter | Data Type | Required | Description    | Value Range                     | Default Value |
| --------- | --------- | -------- | -------------- | ------------------------------- | ------------- |
| symbol    | Array     | false    | Trading symbol | Refer to GET /v1/common/symbols |               |

#### Data Update

| Parameter  | Data Type | Required | Description                                                   | Value Range |
| ---------- | --------- | -------- | ------------------------------------------------------------- | ----------- |
| ch         | string    | false    | Data belonged channel，Format：market.\$symbol.kline.\$period |             |
| ts         | long      | false    | Time of Respond Generation, Unit: Millisecond                 |             |
| DATA_START | object    | false    |                                                               |             |
| symbol     | string    | false    | Trading symbol                                                |             |
| quoteTime  | long      | false    | Quote time                                                    |             |
| bid        | float     | false    | Best bid                                                      |             |
| bidSize    | float     | false    | Best bid size                                                 |             |
| ask        | float     | false    | Best ask                                                      |             |
| askSize    | float     | false    | Best ask size                                                 |             |
| seqId      | int       | false    | Sequence number                                               |             |
| DATA_END   |           | false    |                                                               |             |

#### Subscription Example

```
{
  "sub": [
    "market.btcusdt.bbo",
    "market.ethusdt.bbo",
    "market.htxusdt.bbo"
  ],
  "id": "id1"
}
```

#### Example of a Successful Subscription

```
{
  "id": "id1",
  "status": "ok",
  "subbed": "market.btcusdt.bbo",
  "ts": 1489474081631
}
```

#### Example of a Data Update

```
{
  "ch": "market.btcusdt.bbo",
  "ts": 1630994555540,
  "tick": {
    "seqId": 137005210233,
    "ask": 52665.02,
    "askSize": 1.502181,
    "bid": 52665.01,
    "bidSize": 0.178567,
    "quoteTime": 1630994555539,
    "symbol": "btcusdt"
  }
}
```

#### Example of a Subscription Cancellation

```
{
  "unsub": "market.btcusdt.bbo",
  "id": "id1"
}
```

### market.\$symbol.depth.\$type ( Market Depth)

Signature verification: No

Interface description: This topic sends the latest market by price order book in
snapshot mode at 1-second interval.

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
| cid        | string | parameters                             |

#### Rule description

| Subscribe(sub)                                                                         | Unsubscribe( unsub )                                                                   | Rule        |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ----------- |
| "market.btcusdt.depth.step0",                                                          | "market.btcusdt.depth.step0",                                                          | Allowed     |
| "market.btcusdt.depth.step0","market.ethusdt.depth.step0","market.trxusdt.depth.step0" | "market.btcusdt.depth.step0","market.ethusdt.depth.step0","market.trxusdt.depth.step0" | Allowed     |
| "market.btcusdt.depth.step0","market.ethusdt.depth.step0","market.trxusdt.depth.step0" | "market.bnbusdt.depth.step0",                                                          | Not Allowed |

#### Subscription Parameter

| Parameter | Data Type | Required | Description                                   | Value Range                                                                                                                                                                                                                                               | Default Value |
| --------- | --------- | -------- | --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| symbol    | Array     | false    | Trading symbol                                | Refer to GET /v1/common/symbols                                                                                                                                                                                                                           |               |
| type      | Array     | false    | Market depth aggregation level, details below | step0：No market depth aggregation step1：Aggregation level = precision\*10 step2：Aggregation level = precision\*100 step3：Aggregation level = precision\*1000 step4：Aggregation level = precision\*10000 step5：Aggregation level = precision\*100000 | step0         |

#### Data Update

| Parameter  | Data Type | Required | Description                                                   | Value Range |
| ---------- | --------- | -------- | ------------------------------------------------------------- | ----------- |
| ch         | string    | false    | Data belonged channel，Format：market.\$symbol.depth.\$type   |             |
| ts         | long      | false    | Time of Respond Generation, Unit: Millisecond                 |             |
| TICK_START | object    | false    |                                                               |             |
| bids       | object    | false    | The current all bids in format \[price, size\]                |             |
| asks       | object    | false    | The current all asks in format \[price, size\]                |             |
| version    | integer   | false    | Internal data                                                 |             |
| ts         | integer   | false    | The UNIX timestamp in milliseconds adjusted to Singapore time |             |
| TICK_END   |           | false    |                                                               |             |

#### Subscription Example

```
{
  "sub": [
    "market.btcusdt.depth.step0",
    "market.ethusdt.depth.step0",
    "market.trxusdt.depth.step0"
  ],
  "id": "id1"
}
```

#### Example of a Successful Subscription

```
{
  "id": "id1",
  "status": "ok",
  "subbed": "market.btcusdt.depth.step0",
  "ts": 1489474081631
}
```

#### Example of a Data Update

```
{
  "ch": "market.btcusdt.depth.step0",
  "ts": 1630983549503,
  "tick": {
    "bids": [
      [
        52690.69,
        0.36281
      ],
      [
        52690.68,
        0.2
      ]
    ],
    "asks": [
      [
        52690.7,
        0.372591
      ],
      [
        52691.26,
        0.13
      ]
    ],
    "version": 136998124622,
    "ts": 1630983549500
  }
}
```

#### Example of a Subscription Cancellation

```
{
  "unsub": "market.btcusdt.mbp.refresh.20",
  "id": "id1"
}
```

### market.\$symbol.detail ( Market Details)

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

| Parameter | Data Type | Required | Description    | Value Range                     | Default Value |
| --------- | --------- | -------- | -------------- | ------------------------------- | ------------- |
| symbol    | Array     | false    | Trading symbol | Refer to GET /v1/common/symbols |               |

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

```
{
  "sub": [
    "market.btcusdt.depth.step0",
    "market.ethusdt.depth.step0",
    "market.trxusdt.depth.step0"
  ],
  "id": "id1"
}
```

#### Example of a Successful Subscription

```
{
  "id": "id1",
  "status": "ok",
  "subbed": "market.btcusdt.detail",
  "ts": 1489474081631
}
```

#### Example of a Data Update

```
{
  "ch": "market.btcusdt.detail",
  "ts": 1630998026649,
  "tick": {
    "id": 273956868110,
    "low": 51000,
    "high": 52924.14,
    "open": 51823.62,
    "close": 52379.99,
    "vol": 727676440.200527,
    "amount": 13991.028076056185,
    "version": 273956868110,
    "count": 471348
  }
}
```

#### Example of a Subscription Cancellation

```
{
  "unsub": "market.btcusdt.detail",
  "id": "id1"
}
```

### market.\$symbol.mbp.\$levels ( Market By Price (incremental update))

Signature verification: No

Interface description: User could subscribe to this channel to receive
incremental update of Market By Price order book. Refresh message, the full
image of the order book, are acquirable from the same channel, upon "req"
request. Under the premise of the same link and the same currency, assuming that
you subscribe to both market.\$symbol.mbp.\$levels and
market.\$symbol.mbp.refresh.\$levels, the data will be pushed in the following
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

#### Data Update

| Parameter  | Data Type | Required | Description                                                    | Value Range |
| ---------- | --------- | -------- | -------------------------------------------------------------- | ----------- |
| seqNum     | integer   | false    | Sequence number of the message                                 |             |
| prevSeqNum | integer   | false    | Sequence number of previous message                            |             |
| bids       | object    | false    | Bid side, (in descending order of "price"), \["price","size"\] |             |
| asks       | object    | false    | Ask side, (in ascending order of "price"), \["price","size"\]  |             |

#### Subscription Example

```
{
  "sub": [
    "market.btcusdt.mbp.5",
    "market.ethusdt.mbp.5",
    "market.htxusdt.mbp.5"
  ],
  "id": "id1"
}
```

#### Example of a Successful Subscription

```
{
  "id": "id1",
  "status": "ok",
  "subbed": "market.btcusdt.mbp.5",
  "ts": 1489474081631
}
```

#### Example of a Data Update

```
{
  "ch": "market.btcusdt.mbp.5",
  "ts": 1573199608679,
  "tick": {
    "seqNum": 100020146795,
    "prevSeqNum": 100020146794,
    "asks": [
      [
        645.14,
        26.75597395914065
      ]
    ]
  }
}
```

#### Example of a Subscription Cancellation

```
{
  "unsub": "market.btcusdt.mbp.5",
  "id": "id1"
}
```

### market.\$symbol.mbp.refresh.\$levels ( Market By Price (refresh update))

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

#### Data Update

| Parameter | Data Type | Required | Description                                                    | Value Range |
| --------- | --------- | -------- | -------------------------------------------------------------- | ----------- |
| seqNum    | integer   | false    | Sequence number of the message                                 |             |
| bids      | object    | false    | Bid side, (in descending order of "price"), \["price","size"\] |             |
| asks      | object    | false    | Ask side, (in ascending order of "price"), \["price","size"\]  |             |

#### Subscription Example

```
{
  "sub": [
    "market.btcusdt.mbp.refresh.20",
    "market.ethusdt.mbp.refresh.20",
    "market.htxusdt.mbp.refresh.20"
  ],
  "id": "id1"
}
```

#### Example of a Successful Subscription

```
{
  "id": "id1",
  "status": "ok",
  "subbed": "market.btcusdt.mbp.refresh.20",
  "ts": 1489474081631
}
```

#### Example of a Data Update

```
{
  "ch": "market.btcusdt.mbp.refresh.20",
  "ts": 1573199608679,
  "tick": {
    "seqNum": 100020142010,
    "bids": [
      [
        618.37,
        71.594
      ],
      [
        423.33,
        77.726
      ],
      [
        223.18,
        47.997
      ],
      [
        219.34,
        24.82
      ],
      [
        210.34,
        94.463
      ]
    ],
    "asks": [
      [
        650.59,
        14.909733438479636
      ],
      [
        650.63,
        97.996
      ],
      [
        650.77,
        97.465
      ],
      [
        651.23,
        83.973
      ],
      [
        651.42,
        34.465
      ]
    ]
  }
}
```

#### Example of a Subscription Cancellation

```
{
  "unsub": "market.btcusdt.mbp.refresh.20",
  "id": "id1"
}
```

### market.\$symbol.ticker ( Market Ticker)

Signature verification: No

Interface description: Retrieve the market ticker,data is pushed every 100ms.

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

| Subscribe(sub)                                                                                  | Unsubscribe( unsub )                                                                            | Rule        |
| ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ----------- |
| "market.btcusdt.mbp.refresh.20"                                                                 | "market.btcusdt.mbp.refresh.20"                                                                 | Allowed     |
| "market.btcusdt.mbp.refresh.20","market.ethusdt.mbp.refresh.20","market.htxusdt.mbp.refresh.20" | "market.btcusdt.mbp.refresh.20","market.ethusdt.mbp.refresh.20","market.htxusdt.mbp.refresh.20" | Allowed     |
| "market.btcusdt.mbp.refresh.20","market.ethusdt.mbp.refresh.20","market.htxusdt.mbp.refresh.20" | "market.bnbusdt.mbp.5"                                                                          | Not Allowed |

#### Subscription Parameter

| Parameter | Data Type | Required | Description                 | Value Range                                                                    | Default Value |
| --------- | --------- | -------- | --------------------------- | ------------------------------------------------------------------------------ | ------------- |
| symbol    | Array     | false    | The trading symbol to query | All supported trading symbol, e.g. btcusdt, bccbtc.Refer to /v1/common/symbols |               |

#### Data Update

| Parameter  | Data Type | Required | Description                                                                  | Value Range |
| ---------- | --------- | -------- | ---------------------------------------------------------------------------- | ----------- |
| ch         | string    | false    | Data belonged channel，Format：market.\$symbol.ticker                        |             |
| ts         | long      | false    | Time of Respond Generation, Unit: Millisecond                                |             |
| TICK_START | object    | false    |                                                                              |             |
| amount     | float     | false    | Accumulated trading volume of last 24 hours (rotating 24h), in base currency |             |
| count      | integer   | false    | The number of completed trades (rotating 24h)                                |             |
| open       | float     | false    | The opening price of last 24 hours (rotating 24h)                            |             |
| close      | float     | false    | The last price of last 24 hours (rotating 24h)                               |             |
| low        | float     | false    | The lowest price of last 24 hours (rotating 24h)                             |             |
| high       | float     | false    | The highest price of last 24 hours (rotating 24h)                            |             |
| vol        | float     | false    | Accumulated trading value of last 24 hours (rotating 24h), in quote currency |             |
| bid        | float     | false    | Best bid price                                                               |             |
| bidSize    | float     | false    | Best bid size                                                                |             |
| ask        | float     | false    | Best ask price                                                               |             |
| askSize    | float     | false    | Best ask size                                                                |             |
| lastPrice  | float     | false    | Last traded price                                                            |             |
| lastSize   | float     | false    | Last traded size                                                             |             |
| TICK_END   |           | false    |                                                                              |             |

#### Subscription Example

```
{
  "sub": [
    "market.btcusdt.mbp.refresh.20",
    "market.ethusdt.mbp.refresh.20",
    "market.htxusdt.mbp.refresh.20"
  ]
}
```

#### Example of a Successful Subscription

```
{
  "id": "id1",
  "status": "ok",
  "subbed": "market.btcusdt.ticker",
  "ts": 1489474081631
}
```

#### Example of a Data Update

```
{
  "ch": "market.btcusdt.ticker",
  "ts": 1630982370526,
  "tick": {
    "open": 51732,
    "high": 52785.64,
    "low": 51000,
    "close": 52735.63,
    "amount": 13259.24137056181,
    "vol": 687640987.4125315,
    "count": 448737,
    "bid": 52732.88,
    "bidSize": 0.036,
    "ask": 52732.89,
    "askSize": 0.583653,
    "lastPrice": 52735.63,
    "lastSize": 0.03
  }
}
```

#### Example of a Subscription Cancellation

```
{
  "unsub": "market.btcusdt.ticker"
}
```

### market.\$symbol.trade.detail ( Trade Detail)

Signature verification: No

Interface description: This topic sends the latest completed trades. It updates
in tick by tick mode.

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

| Subscribe(sub)                                                                               | Unsubscribe( unsub )                                                                         | Rule        |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ----------- |
|  "market.btcusdt.trade.detail"                                                               |  "market.btcusdt.trade.detail"                                                               | Allowed     |
|  "market.btcusdt.trade.detail", "market.ethusdt.trade.detail", "market.htxusdt.trade.detail" |  "market.btcusdt.trade.detail", "market.ethusdt.trade.detail", "market.htxusdt.trade.detail" | Allowed     |
|  "market.btcusdt.trade.detail", "market.ethusdt.trade.detail", "market.htxusdt.trade.detail" | "market.bnbusdt.trade.detail"                                                                | Not Allowed |

#### Subscription Parameter

| Parameter | Data Type | Required | Description    | Value Range                     | Default Value |
| --------- | --------- | -------- | -------------- | ------------------------------- | ------------- |
| symbol    | Array     | false    | Trading symbol | Refer to GET /v1/common/symbols |               |

#### Data Update

| Parameter  | Data Type | Required | Description                                                 | Value Range |
| ---------- | --------- | -------- | ----------------------------------------------------------- | ----------- |
| ch         | string    | false    | Data belonged channel，Format：market.\$symbol.trade.detail |             |
| ts         | long      | false    | Time of Respond Generation, Unit: Millisecond               |             |
| TICK_START | object    | false    |                                                             |             |
| id         | long      | false    | global transaction ID                                       |             |
| ts         | long      | false    | Latest Creation Time                                        |             |
| DATA_START | object    | false    |                                                             |             |
| id         | integer   | false    | Unique trade id (to be obsoleted)                           |             |
| tradeId    | long      | false    | Unique trade id (NEW)                                       |             |
| amount     | float     | false    | The volume of the trade (buy side or sell side)             |             |
| price      | float     | false    | The price of the trade                                      |             |
| ts         | long      | false    | timestamp (UNIX epoch time in millisecond)                  |             |
| direction  | string    | false    | direction of the trade (taker): 'buy' or 'sell'             |             |
| DATA_END   |           | false    |                                                             |             |
| TICK_END   |           | false    |                                                             |             |

#### Subscription Example

`{   "sub":[ "market.btcusdt.trade.detail", "market.ethusdt.trade.detail", "market.htxusdt.trade.detail"],   "id": "id1" }`

#### Example of a Successful Subscription

```
{
  "id": "id1",
  "status": "ok",
  "subbed": "market.btcusdt.trade.detail",
  "ts": 1489474081631
}
```

#### Example of a Data Update

```
{
  "ch": "market.btcusdt.trade.detail",
  "ts": 1630994963175,
  "tick": {
    "id": 137005445109,
    "ts": 1630994963173,
    "data": [
      {
        "id": 1.3700544510935929e+26,
        "ts": 1630994963173,
        "tradeId": 102523573486,
        "amount": 0.006754,
        "price": 52648.62,
        "direction": "buy"
      }
    ]
  }
}
```

#### Example of a Subscription Cancellation

```
{
  "unsub": "market.btcusdt.trade.detail",
  "id": "id1"
}
```
