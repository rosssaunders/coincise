# OKX API Documentation - Public Market Data WebSocket API

### Overview

WebSocket is a new HTML5 protocol that achieves full-duplex data transmission
between the client and server, allowing data to be transferred effectively in
both directions. A connection between the client and server can be established
with just one handshake. The server will then be able to push data to the client
according to preset rules. Its advantages include:

- The WebSocket request header size for data transmission between client and
  server is only 2 bytes.
- Either the client or server can initiate data transmission.
- There's no need to repeatedly create and delete TCP connections, saving
  resources on bandwidth and server.

We recommend developers use WebSocket API to retrieve market data and order book
depth.

---

### Connect

**Connection limit**: 3 requests per second (based on IP)

When subscribing to a public channel, use the address of the public service.
When subscribing to a private channel, use the address of the private service

**Request limit**:

The total number of 'subscribe'/'unsubscribe'/'login' requests per connection is
limited to 480 times per hour.

If there’s a network problem, the system will automatically disable the
connection.

The connection will break automatically if the subscription is not established
or data has not been pushed for more than 30 seconds.

To keep the connection stable:

1\. Set a timer of N seconds whenever a response message is received, where N is
less than 30.

2\. If the timer is triggered, which means that no new message is received
within N seconds, send the String 'ping'.

3\. Expect a 'pong' as a response. If the response message is not received
within N seconds, please raise an error or reconnect.

---

### Connection count limit

The limit will be set at 30 WebSocket connections per specific WebSocket channel
per sub-account. Each WebSocket connection is identified by the unique `connId`.

The WebSocket channels subject to this limitation are as follows:

1.  [Orders channel](/docs-v5/en/#order-book-trading-trade-ws-order-channel)
2.  [Account channel](/docs-v5/en/#trading-account-websocket-account-channel)
3.  [Positions channel](/docs-v5/en/#trading-account-websocket-positions-channel)
4.  [Balance and positions channel](/docs-v5/en/#trading-account-websocket-balance-and-position-channel)
5.  [Position risk warning channel](/docs-v5/en/#trading-account-websocket-position-risk-warning)
6.  [Account greeks channel](/docs-v5/en/#trading-account-websocket-account-greeks-channel)

If users subscribe to the same channel through the same WebSocket connection
through multiple arguments, for example, by using
`{"channel": "orders", "instType": "ANY"}` and
`{"channel": "orders", "instType": "SWAP"}`, it will be counted once only. If
users subscribe to the listed channels (such as orders and accounts) using
either the same or different connections, it will not affect the counting, as
these are considered as two different channels. The system calculates the number
of WebSocket connections per channel.

The platform will send the number of active connections to clients through the
`channel-conn-count` event message **to new channel subscriptions**.

> Connection count update

When the limit is breached, generally the latest connection that sends the
subscription request will be rejected. Client will receive the usual
subscription acknowledgement followed by the `channel-conn-count-error` from the
connection that the subscription has been terminated. In exceptional
circumstances the platform may unsubscribe existing connections.

> Connection limit error

Order operations through WebSocket, including place, amend and cancel orders,
are not impacted through this change.

---

### Login

#### Request Parameters

| Parameter       | Type             | Required | Description                          |
| --------------- | ---------------- | -------- | ------------------------------------ |
| op              | String           | Yes      | Operation<br><code>login</code>      |
| args            | Array of objects | Yes      | List of account to login             |
| &gt; apiKey     | String           | Yes      | API Key                              |
| &gt; passphrase | String           | Yes      | API Key password                     |
| &gt; timestamp  | String           | Yes      | Unix Epoch time, the unit is seconds |
| &gt; sign       | String           | Yes      | Signature string                     |

#### Response parameters

| Parameter | Type   | Required | Description                                           |
| --------- | ------ | -------- | ----------------------------------------------------- |
| event     | String | Yes      | Operation<br><code>login</code><br><code>error</code> |
| code      | String | No       | Error code                                            |
| msg       | String | No       | Error message                                         |
| connId    | String | Yes      | WebSocket connection ID                               |

**apiKey**: Unique identification for invoking API. Requires user to apply one
manually.

**passphrase**: API Key password

**timestamp**: the Unix Epoch time, the unit is seconds, e.g. 1704876947

**sign**: signature string, the signature algorithm is as follows:

First concatenate `timestamp`, `method`, `requestPath`, strings, then use HMAC
SHA256 method to encrypt the concatenated string with SecretKey, and then
perform Base64 encoding.

**secretKey**: The security key generated when the user applies for API key,
e.g. `22582BD0CFF14C41EDBF1AB98506286D`

**Example of timestamp**: const timestamp = '' + Date.now() / 1,000

**Among sign example**:
sign=CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(timestamp
+'GET'+'/users/self/verify', secretKey))

**method**: always 'GET'.

**requestPath** : always '/users/self/verify'

The request will expire 30 seconds after the timestamp. If your server time
differs from the API server time, we recommended using the REST API to query the
API server time and then set the timestamp.

---

### Subscribe

**Subscription Instructions**

WebSocket channels are divided into two categories: `public` and `private`
channels.

`Public channels` -- No authentication is required, include tickers channel,
K-Line channel, limit price channel, order book channel, and mark price channel
etc.

`Private channels` -- including account channel, order channel, and position
channel, etc -- require log in.

Users can choose to subscribe to one or more channels, and the total length of
multiple channels cannot exceed 64 KB.

Below is an example of subscription parameters. The requirement of subscription
parameters for each channel is different. For details please refer to the
specification of each channels.

**Request parameters**

| Parameter       | Type             | Required | Description                                                                                                                                         |
| --------------- | ---------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| op              | String           | Yes      | Operation<br><code>subscribe</code>                                                                                                                 |
| args            | Array of objects | Yes      | List of subscribed channels                                                                                                                         |
| &gt; channel    | String           | Yes      | Channel name                                                                                                                                        |
| &gt; instType   | String           | No       | Instrument type<br><code>SPOT</code><br><code>MARGIN</code><br><code>SWAP</code><br><code>FUTURES</code><br><code>OPTION</code><br><code>ANY</code> |
| &gt; instFamily | String           | No       | Instrument family<br>Applicable to <code>FUTURES</code>/<code>SWAP</code>/<code>OPTION</code>                                                       |
| &gt; instId     | String           | No       | Instrument ID                                                                                                                                       |

**Return parameters**

| Parameter       | Type   | Required | Description                                                                                                                                         |
| --------------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| event           | String | Yes      | Event<br><code>subscribe</code><br><code>error</code>                                                                                               |
| arg             | Object | No       | Subscribed channel                                                                                                                                  |
| &gt; channel    | String | Yes      | Channel name                                                                                                                                        |
| &gt; instType   | String | No       | Instrument type<br><code>SPOT</code><br><code>MARGIN</code><br><code>SWAP</code><br><code>FUTURES</code><br><code>OPTION</code><br><code>ANY</code> |
| &gt; instFamily | String | No       | Instrument family<br>Applicable to <code>FUTURES</code>/<code>SWAP</code>/<code>OPTION</code>                                                       |
| &gt; instId     | String | No       | Instrument ID                                                                                                                                       |
| code            | String | No       | Error code                                                                                                                                          |
| msg             | String | No       | Error message                                                                                                                                       |
| connId          | String | Yes      | WebSocket connection ID                                                                                                                             |

---

### Unsubscribe

Unsubscribe from one or more channels.

**Request parameters**

| Parameter       | Type             | Required | Description                                                                                                                                         |
| --------------- | ---------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| op              | String           | Yes      | Operation<br><code>unsubscribe</code>                                                                                                               |
| args            | Array of objects | Yes      | List of channels to unsubscribe from                                                                                                                |
| &gt; channel    | String           | Yes      | Channel name                                                                                                                                        |
| &gt; instType   | String           | No       | Instrument type<br><code>SPOT</code><br><code>MARGIN</code><br><code>SWAP</code><br><code>FUTURES</code><br><code>OPTION</code><br><code>ANY</code> |
| &gt; instFamily | String           | No       | Instrument family<br>Applicable to <code>FUTURES</code>/<code>SWAP</code>/<code>OPTION</code>                                                       |
| &gt; instId     | String           | No       | Instrument ID                                                                                                                                       |

**Response parameters**

| Parameter       | Type   | Required | Description                                                                                                                     |
| --------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------- |
| event           | String | Yes      | Event<br><code>unsubscribe</code><br><code>error</code>                                                                         |
| arg             | Object | No       | Unsubscribed channel                                                                                                            |
| &gt; channel    | String | Yes      | Channel name                                                                                                                    |
| &gt; instType   | String | No       | Instrument type<br><code>SPOT</code><br><code>MARGIN</code><br><code>SWAP</code><br><code>FUTURES</code><br><code>OPTION</code> |
| &gt; instFamily | String | No       | Instrument family<br>Applicable to <code>FUTURES</code>/<code>SWAP</code>/<code>OPTION</code>                                   |
| &gt; instId     | String | No       | Instrument ID                                                                                                                   |
| code            | String | No       | Error code                                                                                                                      |
| msg             | String | No       | Error message                                                                                                                   |

---

### Notification

WebSocket has introduced a new message type (event = `notice`).

Client will receive the information in the following scenarios:

- Websocket disconnect for service upgrade

60 seconds prior to the upgrade of the WebSocket service, the notification
message will be sent to users indicating that the connection will soon be
disconnected. Users are encouraged to establish a new connection to prevent any
disruptions caused by disconnection.

The feature is supported by WebSocket Public (/ws/v5/public) and Private
(/ws/v5/private) for now.

---

### Instruments channel

The instruments will be pushed if there is any change to the instrument’s state
(such as delivery of FUTURES, exercise of OPTION, listing of new contracts /
trading pairs, trading suspension, etc.).  
(The full instrument list is not pushed since December 28, 2022,
[you can click here to view details](/docs-v5/log_en/#2022-12-06))

#### URL Path

/ws/v5/public

#### Request Parameters

| Parameter     | Type             | Required | Description                                                                                                                                                                                                                                      |
| ------------- | ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| id            | String           | No       | Unique identifier of the message<br>Provided by client. It will be returned in response message for identifying the corresponding request.<br>A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters. |
| op            | String           | Yes      | Operation<br><code>subscribe</code><br><code>unsubscribe</code><br>                                                                                                                                                                              |
| args          | Array of objects | Yes      | List of subscribed channels                                                                                                                                                                                                                      |
| &gt; channel  | String           | Yes      | Channel name<br><code>instruments</code>                                                                                                                                                                                                         |
| &gt; instType | String           | Yes      | Instrument type<br><code>SPOT</code><br><code>MARGIN</code><br><code>SWAP</code><br><code>FUTURES</code><br><code>OPTION</code>                                                                                                                  |

#### Response parameters

| Parameter     | Type   | Required | Description                                                                                                                     |
| ------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------- |
| id            | String | No       | Unique identifier of the message                                                                                                |
| event         | String | Yes      | Event<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code>                                               |
| arg           | Object | No       | Subscribed channel                                                                                                              |
| &gt; channel  | String | Yes      | Channel name                                                                                                                    |
| &gt; instType | String | Yes      | Instrument type<br><code>SPOT</code><br><code>MARGIN</code><br><code>SWAP</code><br><code>FUTURES</code><br><code>OPTION</code> |
| code          | String | No       | Error code                                                                                                                      |
| msg           | String | No       | Error message                                                                                                                   |
| connId        | String | Yes      | WebSocket connection ID                                                                                                         |

#### Push data parameters

| Parameter             | Type             | Description                                                                                                                                                                                                                                                                                                                                                   |
| --------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| arg                   | Object           | Subscribed channel                                                                                                                                                                                                                                                                                                                                            |
| &gt; channel          | String           | Channel name                                                                                                                                                                                                                                                                                                                                                  |
| &gt; instType         | String           | Instrument type                                                                                                                                                                                                                                                                                                                                               |
| data                  | Array of objects | Subscribed data                                                                                                                                                                                                                                                                                                                                               |
| &gt; instType         | String           | Instrument type                                                                                                                                                                                                                                                                                                                                               |
| &gt; instId           | String           | Instrument ID, e.g. <code>BTC-UST</code>                                                                                                                                                                                                                                                                                                                      |
| &gt; uly              | String           | Underlying, e.g. <code>BTC-USD</code><br>Only applicable to <code>FUTURES</code>/<code>SWAP</code>/<code>OPTION</code>                                                                                                                                                                                                                                        |
| &gt; instFamily       | String           | Instrument family, e.g. <code>BTC-USD</code><br>Only applicable to <code>FUTURES</code>/<code>SWAP</code>/<code>OPTION</code>                                                                                                                                                                                                                                 |
| &gt; category         | String           | Currency category. Note: this parameter is already deprecated                                                                                                                                                                                                                                                                                                 |
| &gt; baseCcy          | String           | Base currency, e.g. <code>BTC</code> in <code>BTC-USDT</code><br>Only applicable to <code>SPOT</code>/<code>MARGIN</code>                                                                                                                                                                                                                                     |
| &gt; quoteCcy         | String           | Quote currency, e.g. <code>USDT</code> in <code>BTC-USDT</code><br>Only applicable to <code>SPOT</code>/<code>MARGIN</code>                                                                                                                                                                                                                                   |
| &gt; settleCcy        | String           | Settlement and margin currency, e.g. <code>BTC</code><br>Only applicable to <code>FUTURES</code>/<code>SWAP</code>/<code>OPTION</code>                                                                                                                                                                                                                        |
| &gt; ctVal            | String           | Contract value                                                                                                                                                                                                                                                                                                                                                |
| &gt; ctMult           | String           | Contract multiplier                                                                                                                                                                                                                                                                                                                                           |
| &gt; ctValCcy         | String           | Contract value currency                                                                                                                                                                                                                                                                                                                                       |
| &gt; optType          | String           | Option type<br><code>C</code>: Call<br><code>P</code>: Put<br>Only applicable to <code>OPTION</code>                                                                                                                                                                                                                                                          |
| &gt; stk              | String           | Strike price<br>Only applicable to <code>OPTION</code>                                                                                                                                                                                                                                                                                                        |
| &gt; listTime         | String           | Listing time<br>Only applicable to <code>FUTURES</code>/<code>SWAP</code>/<code>OPTION</code>                                                                                                                                                                                                                                                                 |
| &gt; auctionEndTime   | String           | <del>The end time of call auction, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code><br>Only applicable to <code>SPOT</code> that are listed through call auctions, return "" in other cases (deprecated, use contTdSwTime)</del>                                                                                                        |
| &gt; contTdSwTime     | String           | Continuous trading switch time. The switch time from call auction, prequote to continuous trading, Unix timestamp format in milliseconds. e.g. <code>1597026383085</code>.<br>Only applicable to <code>SPOT</code>/<code>MARGIN</code> that are listed through call auction or prequote, return "" in other cases.                                            |
| &gt; openType         | String           | Open type<br><code>fix_price</code>: fix price opening<br><code>pre_quote</code>: pre-quote<br><code>call_auction</code>: call auction<br>Only applicable to <code>SPOT</code>/<code>MARGIN</code>, return "" for all other business lines                                                                                                                    |
| &gt; expTime          | String           | Expiry time<br>Applicable to <code>SPOT</code>/<code>MARGIN</code>/<code>FUTURES</code>/<code>SWAP</code>/<code>OPTION</code>. For <code>FUTURES</code>/<code>OPTION</code>, it is the delivery/exercise time. It can also be the delisting time of the trading instrument. Update once change.                                                               |
| &gt; lever            | String           | Max Leverage<br>Not applicable to <code>SPOT</code>/<code>OPTION</code>, used to distinguish between <code>MARGIN</code> and <code>SPOT</code>.                                                                                                                                                                                                               |
| &gt; tickSz           | String           | Tick size, e.g. <code>0.0001</code><br>For Option, it is minimum tickSz among tick band.                                                                                                                                                                                                                                                                      |
| &gt; lotSz            | String           | Lot size<br>If it is a derivatives contract, the value is the number of contracts.<br>If it is <code>SPOT</code>/<code>MARGIN</code>, the value is the quantity in <code>base currency</code>                                                                                                                                                                 |
| &gt; minSz            | String           | Minimum order size<br>If it is a derivatives contract, the value is the number of contracts.<br>If it is <code>SPOT</code>/<code>MARGIN</code>, the value is the quantity in <code>base currency</code>                                                                                                                                                       |
| &gt; ctType           | String           | Contract type<br><code>linear</code>: linear contract<br><code>inverse</code>: inverse contract<br>Only applicable to <code>FUTURES</code>/<code>SWAP</code>                                                                                                                                                                                                  |
| &gt; alias            | String           | Alias<br><code>this_week</code><br><code>next_week</code><br><code>this_month</code><br><code>next_month</code><br><code>quarter</code><br><code>next_quarter</code><br>Only applicable to <code>FUTURES</code><br><strong>Not recommended for use, users are encouraged to rely on the expTime field to determine the delivery time of the contract</strong> |
| &gt; state            | String           | Instrument status<br><code>live</code><br><code>suspend</code><br><code>expired</code><br><code>preopen</code>. e.g. There will be preopen before the Futures and Options new contracts state is live.<br><code>test</code>: Test pairs, can't be traded                                                                                                      |
| &gt; state            | String           | Instrument status<br><code>live</code><br><code>suspend</code><br><code>expired</code><br><code>preopen</code> e.g. Futures and options contracts rollover from generation to trading start; certain symbols before they go live<br><code>test</code>: Test pairs, can't be traded                                                                            |
| &gt; ruleType         | String           | Trading rule types<br><code>normal</code>: normal trading<br><code>pre_market</code>: pre-market trading                                                                                                                                                                                                                                                      |
| &gt; maxLmtSz         | String           | The maximum order quantity of a single limit order.<br>If it is a derivatives contract, the value is the number of contracts.<br>If it is <code>SPOT</code>/<code>MARGIN</code>, the value is the quantity in <code>base currency</code>.                                                                                                                     |
| &gt; maxMktSz         | String           | The maximum order quantity of a single market order.<br>If it is a derivatives contract, the value is the number of contracts.<br>If it is <code>SPOT</code>/<code>MARGIN</code>, the value is the quantity in <code>USDT</code>.                                                                                                                             |
| &gt; maxTwapSz        | String           | The maximum order quantity of a single TWAP order.<br>If it is a derivatives contract, the value is the number of contracts.<br>If it is <code>SPOT</code>/<code>MARGIN</code>, the value is the quantity in <code>base currency</code>.                                                                                                                      |
| &gt; maxIcebergSz     | String           | The maximum order quantity of a single iceBerg order.<br>If it is a derivatives contract, the value is the number of contracts.<br>If it is <code>SPOT</code>/<code>MARGIN</code>, the value is the quantity in <code>base currency</code>.                                                                                                                   |
| &gt; maxTriggerSz     | String           | The maximum order quantity of a single trigger order.<br>If it is a derivatives contract, the value is the number of contracts.<br>If it is <code>SPOT</code>/<code>MARGIN</code>, the value is the quantity in <code>base currency</code>.                                                                                                                   |
| &gt; maxStopSz        | String           | The maximum order quantity of a single stop market order.<br>If it is a derivatives contract, the value is the number of contracts.<br>If it is <code>SPOT</code>/<code>MARGIN</code>, the value is the quantity in <code>USDT</code>.                                                                                                                        |
| &gt; futureSettlement | Boolean          | Whether daily settlement for expiry feature is enabled<br>Applicable to <code>FUTURES</code> <code>cross</code>                                                                                                                                                                                                                                               |

Instrument status will trigger pushing of incremental data from instruments
channel. When a new contract is going to be listed, the instrument data of the
new contract will be available with status preopen. When a product is going to
be delisted (e.g. when a FUTURES contract is settled or OPTION contract is
exercised), the instrument status will be changed to expired.

listTime and contTdSwTime  
For spot symbols listed through a call auction or pre-open, listTime represents
the start time of the auction or pre-open, and contTdSwTime indicates the end of
the auction or pre-open and the start of continuous trading. For other
scenarios, listTime will mark the beginning of continuous trading, and
contTdSwTime will return an empty value "".

state  
The state will always change from \`preopen\` to \`live\` when the listTime is
reached. Certain symbols will now have \`state:preopen\` before they go live.
Before going live, the instruments channel will push data for pre-listing
symbols with \`state:preopen\`. If the listing is cancelled, the channel will
send full data excluding the cancelled symbol, without additional notification.
When the symbol goes live (reaching listTime), the channel will push data with
\`state:live\`. Users can also query the corresponding data via the REST
endpoint.  
When a product is going to be delisted (e.g. when a FUTURES contract is settled
or OPTION contract is exercised), the instrument will not be available.

---

### Open interest channel

Retrieve the open interest. Data will be pushed every 3 seconds when there are
updates.

#### URL Path

/ws/v5/public

#### Request Parameters

| Parameter    | Type             | Required | Description                                                                                                                                                                                                                                      |
| ------------ | ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| id           | String           | No       | Unique identifier of the message<br>Provided by client. It will be returned in response message for identifying the corresponding request.<br>A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters. |
| op           | String           | Yes      | Operation<br><code>subscribe</code><br><code>unsubscribe</code><br>                                                                                                                                                                              |
| args         | Array of objects | Yes      | List of subscribed channels                                                                                                                                                                                                                      |
| &gt; channel | String           | Yes      | Channel name<br><code>open-interest</code>                                                                                                                                                                                                       |
| &gt; instId  | String           | Yes      | Instrument ID                                                                                                                                                                                                                                    |

#### Response parameters

| Parameter    | Type   | Required | Description                                                                       |
| ------------ | ------ | -------- | --------------------------------------------------------------------------------- |
| id           | String | No       | Unique identifier of the message                                                  |
| event        | String | Yes      | Event<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code> |
| arg          | Object | No       | Subscribed channel                                                                |
| &gt; channel | String | Yes      | Channel name                                                                      |
| &gt; instId  | String | Yes      | Instrument ID                                                                     |
| code         | String | No       | Error code                                                                        |
| msg          | String | No       | Error message                                                                     |
| connId       | String | Yes      | WebSocket connection ID                                                           |

#### Push data parameters

| **Parameter** | **Type**         | **Description**                                                                                            |
| ------------- | ---------------- | ---------------------------------------------------------------------------------------------------------- |
| arg           | Object           | Successfully subscribed channel                                                                            |
| &gt; channel  | String           | Channel name                                                                                               |
| &gt; instId   | String           | Instrument ID                                                                                              |
| data          | Array of objects | Subscribed data                                                                                            |
| &gt; instType | String           | Instrument type                                                                                            |
| &gt; instId   | String           | Instrument ID, e.g. <code>BTC-USDT-SWAP</code>                                                             |
| &gt; oi       | String           | Open interest, in units of contracts.                                                                      |
| &gt; oiCcy    | String           | Open interest, in currency units, like BTC.                                                                |
| &gt; oiUsd    | String           | Open interest in number of USD                                                                             |
| &gt; ts       | String           | The time when the data was updated, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code> |

---

### Funding rate channel

Retrieve funding rate. Data will be pushed in 30s to 90s.

#### URL Path

/ws/v5/public

#### Request Parameters

| Parameter    | Type             | Required | Description                                                                                                                                                                                                                                      |
| ------------ | ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| id           | String           | No       | Unique identifier of the message<br>Provided by client. It will be returned in response message for identifying the corresponding request.<br>A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters. |
| op           | String           | Yes      | Operation<br><code>subscribe</code><br><code>unsubscribe</code><br>                                                                                                                                                                              |
| args         | Array of objects | Yes      | List of subscribed channels                                                                                                                                                                                                                      |
| &gt; channel | String           | Yes      | Channel name<br><code>funding-rate</code>                                                                                                                                                                                                        |
| &gt; instId  | String           | Yes      | Instrument ID                                                                                                                                                                                                                                    |

#### Response parameters

| Parameter    | Type   | Required | Description                                                                       |
| ------------ | ------ | -------- | --------------------------------------------------------------------------------- |
| id           | String | No       | Unique identifier of the message                                                  |
| event        | String | Yes      | Event<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code> |
| arg          | Object | No       | Subscribed channel                                                                |
| &gt; channel | String | yes      | Channel name                                                                      |
| &gt; instId  | String | No       | Instrument ID                                                                     |
| code         | String | No       | Error code                                                                        |
| msg          | String | No       | Error message                                                                     |
| connId       | String | Yes      | WebSocket connection ID                                                           |

#### Push data parameters

| **Parameter**        | **Type**         | **Description**                                                                                                                                                                                                                 |
| -------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| arg                  | Object           | Successfully subscribed channel                                                                                                                                                                                                 |
| &gt; channel         | String           | Channel name                                                                                                                                                                                                                    |
| &gt; instId          | String           | Instrument ID                                                                                                                                                                                                                   |
| data                 | Array of objects | Subscribed data                                                                                                                                                                                                                 |
| &gt; instType        | String           | Instrument type, <code>SWAP</code>                                                                                                                                                                                              |
| &gt; instId          | String           | Instrument ID, e.g. <code>BTC-USD-SWAP</code>                                                                                                                                                                                   |
| &gt; method          | String           | Funding rate mechanism<br><code>current_period</code><del><br><code>next_period</code></del>(no longer supported)                                                                                                               |
| &gt; formulaType     | String           | Formula type<br><code>noRate</code>: old funding rate formula<br><code>withRate</code>: new funding rate formula                                                                                                                |
| &gt; fundingRate     | String           | Current funding rate                                                                                                                                                                                                            |
| &gt; nextFundingRate | String           | <del>Forecasted funding rate for the next period<br>The nextFundingRate will be "" if the method is <code>current_period</code></del>(no longer supported)                                                                      |
| &gt; fundingTime     | String           | Settlement time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>                                                                                                                                         |
| &gt; nextFundingTime | String           | Forecasted funding time for the next period, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>                                                                                                             |
| &gt; minFundingRate  | String           | The lower limit of the predicted funding rate of the next cycle                                                                                                                                                                 |
| &gt; maxFundingRate  | String           | The upper limit of the predicted funding rate of the next cycle                                                                                                                                                                 |
| &gt; interestRate    | String           | Interest rate                                                                                                                                                                                                                   |
| &gt; impactValue     | String           | Depth weighted amount (in the unit of quote currency)                                                                                                                                                                           |
| &gt; settState       | String           | Settlement state of funding rate<br><code>processing</code><br><code>settled</code>                                                                                                                                             |
| &gt; settFundingRate | String           | If settState = <code>processing</code>, it is the funding rate that is being used for current settlement cycle.<br>If settState = <code>settled</code>, it is the funding rate that is being used for previous settlement cycle |
| &gt; premium         | String           | Premium index<br>formula: [Max (0, Impact bid price – Index price) – Max (0, Index price – Impact ask price)] / Index price                                                                                                     |
| &gt; ts              | String           | Data return time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>                                                                                                                                        |

For some altcoins perpetual swaps with significant fluctuations in funding
rates, OKX will closely monitor market changes. When necessary, the funding rate
collection frequency, currently set at 8 hours, may be adjusted to higher
frequencies such as 6 hours, 4 hours, 2 hours, or 1 hour. Thus, users should
focus on the difference between \`fundingTime\` and \`nextFundingTime\` fields
to determine the funding fee interval of a contract.

---

### Price limit channel

Retrieve the maximum buy price and minimum sell price of instruments. Data will
be pushed every 200ms when there are changes in limits, and will not be pushed
when there is no changes on limit.

#### URL Path

/ws/v5/public

#### Request Parameters

| Parameter    | Type             | Required | Description                                                                                                                                                                                                                                      |
| ------------ | ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| id           | String           | No       | Unique identifier of the message<br>Provided by client. It will be returned in response message for identifying the corresponding request.<br>A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters. |
| op           | String           | Yes      | Operation<br><code>subscribe</code><br><code>unsubscribe</code><br>                                                                                                                                                                              |
| args         | Array of objects | Yes      | List of subscribed channels                                                                                                                                                                                                                      |
| &gt; channel | String           | Yes      | Channel name<br><code>price-limit</code>                                                                                                                                                                                                         |
| &gt; instId  | String           | Yes      | Instrument ID                                                                                                                                                                                                                                    |

#### Response parameters

| Parameter    | Type   | Required | Description                                                                       |
| ------------ | ------ | -------- | --------------------------------------------------------------------------------- |
| id           | String | No       | Unique identifier of the message                                                  |
| event        | String | Yes      | Event<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code> |
| arg          | Object | No       | Subscribed channel                                                                |
| &gt; channel | String | Yes      | Channel name                                                                      |
| &gt; instId  | String | Yes      | Instrument ID                                                                     |
| code         | String | No       | Error code                                                                        |
| msg          | String | No       | Error message                                                                     |
| connId       | String | Yes      | WebSocket connection ID                                                           |

#### Push data parameters

| **Parameter** | **Type**         | **Description**                                                                                                                             |
| ------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| arg           | Object           | Successfully subscribed channel                                                                                                             |
| &gt; channel  | String           | Channel name                                                                                                                                |
| &gt; instId   | String           | Instrument ID                                                                                                                               |
| data          | Array of objects | Subscribed data                                                                                                                             |
| &gt; instType | String           | Instrument type                                                                                                                             |
| &gt; instId   | String           | Instrument ID, e.g. <code>BTC-USDT</code>                                                                                                   |
| &gt; buyLmt   | String           | Maximum buy price<br>Return "" when enabled is false                                                                                        |
| &gt; sellLmt  | String           | Minimum sell price<br>Return "" when enabled is false                                                                                       |
| &gt; ts       | String           | Price update time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>                                                   |
| &gt; enabled  | Boolean          | Whether price limit is effective<br><code>true</code>: the price limit is effective<br><code>false</code>: the price limit is not effective |

---

### Option summary channel

Retrieve detailed pricing information of all OPTION contracts. Data will be
pushed at once.

#### URL Path

/ws/v5/public

#### Request Parameters

| Parameter       | Type             | Required | Description                                                                                                                                                                                                                                      |
| --------------- | ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| id              | String           | No       | Unique identifier of the message<br>Provided by client. It will be returned in response message for identifying the corresponding request.<br>A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters. |
| op              | String           | Yes      | Operation<br><code>subscribe</code><br><code>unsubscribe</code><br>                                                                                                                                                                              |
| args            | Array of objects | Yes      | List of subscribed channels                                                                                                                                                                                                                      |
| &gt; channel    | String           | Yes      | Channel name<br><code>opt-summary</code>                                                                                                                                                                                                         |
| &gt; instFamily | String           | Yes      | Instrument family                                                                                                                                                                                                                                |

#### Response parameters

| Parameter       | Type   | Required | Description                                                                       |
| --------------- | ------ | -------- | --------------------------------------------------------------------------------- |
| id              | String | No       | Unique identifier of the message                                                  |
| event           | String | Yes      | Event<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code> |
| arg             | Object | No       | Subscribed channel                                                                |
| &gt; channel    | String | Yes      | Channel name                                                                      |
| &gt; instFamily | String | Yes      | Instrument family                                                                 |
| code            | String | No       | Error code                                                                        |
| msg             | String | No       | Error message                                                                     |
| connId          | String | Yes      | WebSocket connection ID                                                           |

#### Push data parameters

| **Parameter**   | **Type**         | **Description**                                                                           |
| --------------- | ---------------- | ----------------------------------------------------------------------------------------- |
| arg             | Object           | Successfully subscribed channel                                                           |
| &gt; channel    | String           | Channel name                                                                              |
| &gt; instFamily | String           | Instrument family                                                                         |
| data            | Array of objects | Subscribed data                                                                           |
| &gt; instType   | String           | Instrument type, <code>OPTION</code>                                                      |
| &gt; instId     | String           | Instrument ID                                                                             |
| &gt; uly        | String           | Underlying                                                                                |
| &gt; delta      | String           | Sensitivity of option price to <code>uly</code> price                                     |
| &gt; gamma      | String           | The delta is sensitivity to <code>uly</code> price                                        |
| &gt; vega       | String           | Sensitivity of option price to implied volatility                                         |
| &gt; theta      | String           | Sensitivity of option priceo remaining maturity                                           |
| &gt; deltaBS    | String           | Sensitivity of option price to <code>uly</code> price in BS mode                          |
| &gt; gammaBS    | String           | The delta is sensitivity to <code>uly</code> price in BS mode                             |
| &gt; vegaBS     | String           | Sensitivity of option price to implied volatility in BS mode                              |
| &gt; thetaBS    | String           | Sensitivity of option price to remaining maturity in BS mode                              |
| &gt; lever      | String           | Leverage                                                                                  |
| &gt; markVol    | String           | Mark volatility                                                                           |
| &gt; bidVol     | String           | Bid volatility                                                                            |
| &gt; askVol     | String           | Ask Volatility                                                                            |
| &gt; realVol    | String           | Realized volatility (not currently used)                                                  |
| &gt; volLv      | String           | Implied volatility of at-the-money options                                                |
| &gt; fwdPx      | String           | Forward price                                                                             |
| &gt; ts         | String           | Price update time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code> |

---

### Estimated delivery/exercise/settlement price channel

Retrieve the estimated delivery/exercise/settlement price of `FUTURES` and
`OPTION` contracts.

Only the estimated price will be pushed in an hour before
delivery/exercise/settlement, and will be pushed if there is any price change.

#### URL Path

/ws/v5/public

#### Request Parameters

| Parameter       | Type             | Required    | Description                                                                                                                                                                                                                                      |
| --------------- | ---------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| id              | String           | No          | Unique identifier of the message<br>Provided by client. It will be returned in response message for identifying the corresponding request.<br>A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters. |
| op              | String           | Yes         | Operation<br><code>subscribe</code><br><code>unsubscribe</code><br>                                                                                                                                                                              |
| args            | Array of objects | Yes         | List of subscribed channels                                                                                                                                                                                                                      |
| &gt; channel    | String           | Yes         | Channel name<br><code>estimated-price</code>                                                                                                                                                                                                     |
| &gt; instType   | String           | Yes         | Instrument type<br><code>OPTION</code><br><code>FUTURES</code>                                                                                                                                                                                   |
| &gt; instFamily | String           | Conditional | Instrument family<br>Either <code>instFamily</code> or <code>instId</code> is required.                                                                                                                                                          |
| &gt; instId     | String           | Conditional | Instrument ID<br>Either <code>instFamily</code> or <code>instId</code> is required.                                                                                                                                                              |

#### Response parameters

| Parameter       | Type   | Required    | Description                                                                       |
| --------------- | ------ | ----------- | --------------------------------------------------------------------------------- |
| id              | String | No          | Unique identifier of the message                                                  |
| event           | String | Yes         | Event<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code> |
| arg             | Object | No          | Subscribed channel                                                                |
| &gt; channel    | String | Yes         | Channel name                                                                      |
| &gt; instType   | String | Yes         | Instrument type<br><code>OPTION</code><br><code>FUTURES</code>                    |
| &gt; instFamily | String | Conditional | Instrument family                                                                 |
| &gt; instId     | String | Conditional | Instrument ID                                                                     |
| code            | String | No          | Error code                                                                        |
| msg             | String | No          | Error message                                                                     |
| connId          | String | Yes         | WebSocket connection ID                                                           |

#### Push data parameters

| **Parameter**   | **Type**         | **Description**                                                                                                                          |
| --------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| arg             | Object           | Successfully subscribed channel                                                                                                          |
| &gt; channel    | String           | Channel name                                                                                                                             |
| &gt; instType   | String           | Instrument type<br><code>FUTURES</code><br><code>OPTION</code>                                                                           |
| &gt; instFamily | String           | Instrument family                                                                                                                        |
| &gt; instId     | String           | Instrument ID                                                                                                                            |
| data            | Array of objects | Subscribed data                                                                                                                          |
| &gt; instType   | String           | Instrument type                                                                                                                          |
| &gt; instId     | String           | Instrument ID, e.g. <code>BTC-USD-170310</code>                                                                                          |
| &gt; settleType | String           | Type<br><code>settlement</code>: Futures settlement<br><code>delivery</code>: Futures delivery<br><code>exercise</code>: Option exercise |
| &gt; settlePx   | String           | Estimated price                                                                                                                          |
| &gt; ts         | String           | Data update time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>                                                 |

---

### Mark price channel

Retrieve the mark price. Data will be pushed every 200 ms when the mark price
changes, and will be pushed every 10 seconds when the mark price does not
change.

#### URL Path

/ws/v5/public

#### Request Parameters

| Parameter    | Type             | Required | Description                                                                                                                                                                                                                                      |
| ------------ | ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| id           | String           | No       | Unique identifier of the message<br>Provided by client. It will be returned in response message for identifying the corresponding request.<br>A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters. |
| op           | String           | Yes      | Operation<br><code>subscribe</code><br><code>unsubscribe</code><br>                                                                                                                                                                              |
| args         | Array of objects | Yes      | List of subscribed channels                                                                                                                                                                                                                      |
| &gt; channel | String           | Yes      | Channel name<br><code>mark-price</code>                                                                                                                                                                                                          |
| &gt; instId  | String           | Yes      | Instrument ID                                                                                                                                                                                                                                    |

#### Response parameters

| Parameter    | Type   | Required | Description                                                                       |
| ------------ | ------ | -------- | --------------------------------------------------------------------------------- |
| id           | String | No       | Unique identifier of the message                                                  |
| event        | String | Yes      | Event<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code> |
| arg          | Object | No       | Subscribed channel                                                                |
| &gt; channel | String | Yes      | Channel name                                                                      |
| &gt; instId  | String | No       | Instrument ID                                                                     |
| code         | String | No       | Error code                                                                        |
| msg          | String | No       | Error message                                                                     |
| connId       | String | Yes      | WebSocket connection ID                                                           |

#### Push data parameters

| Parameter     | Type             | Description                                                                               |
| ------------- | ---------------- | ----------------------------------------------------------------------------------------- |
| arg           | Object           | Successfully subscribed channel                                                           |
| &gt; channel  | String           | Channel name                                                                              |
| &gt; instId   | String           | Instrument ID                                                                             |
| data          | Array of objects | Subscribed data                                                                           |
| &gt; instType | String           | Instrument type                                                                           |
| &gt; instId   | String           | Instrument ID                                                                             |
| &gt; markPx   | String           | Mark price                                                                                |
| &gt; ts       | String           | Price update time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code> |

---

### Index tickers channel

Retrieve index tickers data. Push data every 100ms if there are any changes,
otherwise push once a minute.

#### URL Path

/ws/v5/public

#### Request Parameters

| Parameter    | Type             | Required | Description                                                                                                                                                                                                                                      |
| ------------ | ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| id           | String           | No       | Unique identifier of the message<br>Provided by client. It will be returned in response message for identifying the corresponding request.<br>A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters. |
| op           | String           | Yes      | <code>subscribe</code> <code>unsubscribe</code>                                                                                                                                                                                                  |
| args         | Array of objects | Yes      | List of subscribed channels                                                                                                                                                                                                                      |
| &gt; channel | String           | Yes      | Channel name<br><code>index-tickers</code>                                                                                                                                                                                                       |
| &gt; instId  | String           | Yes      | Index with USD, USDT, BTC, USDC as the quote currency, e.g. <code>BTC-USDT</code>                                                                                                                                                                |

#### Response parameters

| Parameter    | Type   | Required | Description                                                                       |
| ------------ | ------ | -------- | --------------------------------------------------------------------------------- |
| id           | String | No       | Unique identifier of the message                                                  |
| event        | String | Yes      | <code>subscribe</code> <code>unsubscribe</code> <code>error</code>                |
| arg          | Object | No       | Subscribed channel                                                                |
| &gt; channel | String | Yes      | Channel name<br><code>index-tickers</code>                                        |
| &gt; instId  | String | Yes      | Index with USD, USDT, BTC, USDC as the quote currency, e.g. <code>BTC-USDT</code> |
| code         | String | No       | Error code                                                                        |
| msg          | String | No       | Error message                                                                     |
| connId       | String | Yes      | WebSocket connection ID                                                           |

#### Push data parameters

| Parameter    | Type             | Description                                                                                             |
| ------------ | ---------------- | ------------------------------------------------------------------------------------------------------- |
| arg          | Object           | Successfully subscribed channel                                                                         |
| &gt; channel | String           | Channel name                                                                                            |
| &gt; instId  | String           | Index with USD, USDT, or BTC as quote currency, e.g. <code>BTC-USDT</code>.                             |
| data         | Array of objects | Subscribed data                                                                                         |
| &gt; instId  | String           | Index                                                                                                   |
| &gt; idxPx   | String           | Latest Index Price                                                                                      |
| &gt; open24h | String           | Open price in the past 24 hours                                                                         |
| &gt; high24h | String           | Highest price in the past 24 hours                                                                      |
| &gt; low24h  | String           | Lowest price in the past 24 hours                                                                       |
| &gt; sodUtc0 | String           | Open price in the UTC 0                                                                                 |
| &gt; sodUtc8 | String           | Open price in the UTC 8                                                                                 |
| &gt; ts      | String           | Update time of the index ticker, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code> |

---

### Mark price candlesticks channel

Retrieve the candlesticks data of the mark price. The push frequency is the
fastest interval 1 second push the data.

#### URL Path

/ws/v5/business

#### Request Parameters

| Parameter    | Type             | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------------ | ---------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id           | String           | No       | Unique identifier of the message<br>Provided by client. It will be returned in response message for identifying the corresponding request.<br>A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| op           | String           | Yes      | Operation<br><code>subscribe</code> <code>unsubscribe</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| args         | Array of objects | Yes      | List of subscribed channels                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| &gt; channel | String           | Yes      | Channel name<br><code>mark-price-candle3M</code><br><code>mark-price-candle1M</code><br><code>mark-price-candle1W</code><br><code>mark-price-candle1D</code><br><code>mark-price-candle2D</code><br><code>mark-price-candle3D</code><br><code>mark-price-candle5D</code><br><code>mark-price-candle12H</code><br><code>mark-price-candle6H</code><br><code>mark-price-candle4H</code><br><code>mark-price-candle2H</code><br><code>mark-price-candle1H</code><br><code>mark-price-candle30m</code><br><code>mark-price-candle15m</code><br><code>mark-price-candle5m</code><br><code>mark-price-candle3m</code><br><code>mark-price-candle1m</code><br><code>mark-price-candle1Yutc</code><br><code>mark-price-candle3Mutc</code><br><code>mark-price-candle1Mutc</code><br><code>mark-price-candle1Wutc</code><br><code>mark-price-candle1Dutc</code><br><code>mark-price-candle2Dutc</code><br><code>mark-price-candle3Dutc</code><br><code>mark-price-candle5Dutc</code><br><code>mark-price-candle12Hutc</code><br><code>mark-price-candle6Hutc</code> |
| &gt; instId  | String           | Yes      | Instrument ID                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |

#### Response parameters

| Parameter    | Type   | Required | Description                                                                       |
| ------------ | ------ | -------- | --------------------------------------------------------------------------------- |
| id           | String | No       | Unique identifier of the message                                                  |
| event        | String | Yes      | Event<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code> |
| arg          | Object | No       | Subscribed channel                                                                |
| &gt; channel | String | Yes      | Channel name                                                                      |
| &gt; instId  | String | Yes      | Instrument ID                                                                     |
| code         | String | No       | Error code                                                                        |
| msg          | String | No       | Error message                                                                     |
| connId       | String | Yes      | WebSocket connection ID                                                           |

#### Push data parameters

| Parameter    | Type            | Description                                                                                                                     |
| ------------ | --------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| arg          | Object          | Successfully subscribed channel                                                                                                 |
| &gt; channel | String          | Channel name                                                                                                                    |
| &gt; instId  | String          | Instrument ID                                                                                                                   |
| data         | Array of Arrays | Subscribed data                                                                                                                 |
| &gt; ts      | String          | Opening time of the candlestick, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>                         |
| &gt; o       | String          | Open price                                                                                                                      |
| &gt; h       | String          | Highest price                                                                                                                   |
| &gt; l       | String          | Lowest price                                                                                                                    |
| &gt; c       | String          | Close price                                                                                                                     |
| &gt; confirm | String          | The state of candlesticks.<br><code>0</code> represents that it is uncompleted, <code>1</code> represents that it is completed. |

---

### Index candlesticks channel

Retrieve the candlesticks data of the index. The push frequency is the fastest
interval 1 second push the data. .

#### URL Path

/ws/v5/business

#### Request Parameters

| Parameter    | Type             | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------ | ---------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id           | String           | No       | Unique identifier of the message<br>Provided by client. It will be returned in response message for identifying the corresponding request.<br>A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| op           | String           | Yes      | Operation<br><code>subscribe</code><br><code>unsubscribe</code><br>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| args         | Array of objects | Yes      | List of subscribed channels                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| &gt; channel | String           | Yes      | Channel name<br><code>index-candle3M</code><br><code>index-candle1M</code><br><code>index-candle1W</code><br><code>index-candle1D</code><br><code>index-candle2D</code><br><code>index-candle3D</code><br><code>index-candle5D</code><br><code>index-candle12H</code><br><code>index-candle6H</code><br><code>index-candle4H</code><br><code>index -candle2H</code><br><code>index-candle1H</code><br><code>index-candle30m</code><br><code>index-candle15m</code><br><code>index-candle5m</code><br><code>index-candle3m</code><br><code>index-candle1m</code><br><code>index-candle3Mutc</code><br><code>index-candle1Mutc</code><br><code>index-candle1Wutc</code><br><code>index-candle1Dutc</code><br><code>index-candle2Dutc</code><br><code>index-candle3Dutc</code><br><code>index-candle5Dutc</code><br><code>index-candle12Hutc</code><br><code>index-candle6Hutc</code> |
| &gt; instId  | String           | Yes      | Index, e.g. <code>BTC-USD</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |

#### Response parameters

| Parameter    | Type   | Required | Description                                     |
| ------------ | ------ | -------- | ----------------------------------------------- |
| id           | String | No       | Unique identifier of the message                |
| event        | String | Yes      | <code>subscribe</code> <code>unsubscribe</code> |
| arg          | Object | No       | Subscribed channel                              |
| &gt; channel | String | Yes      | Channel name                                    |
| &gt; instId  | String | No       | Index, e.g. <code>BTC-USD</code>                |
| code         | String | No       | Error code                                      |
| msg          | String | No       | Error message                                   |
| connId       | String | Yes      | WebSocket connection ID                         |

#### Push data parameters

| Parameter    | Type            | Description                                                                                                                     |
| ------------ | --------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| arg          | Object          | Successfully subscribed channel                                                                                                 |
| &gt; channel | String          | Channel name                                                                                                                    |
| &gt; instId  | String          | Index                                                                                                                           |
| data         | Array of Arrays | Subscribed data                                                                                                                 |
| &gt; ts      | String          | Opening time of the candlestick, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>                         |
| &gt; o       | String          | Open price                                                                                                                      |
| &gt; h       | String          | Highest price                                                                                                                   |
| &gt; l       | String          | Lowest price                                                                                                                    |
| &gt; c       | String          | Close price                                                                                                                     |
| &gt; confirm | String          | The state of candlesticks.<br><code>0</code> represents that it is uncompleted, <code>1</code> represents that it is completed. |

The order of the returned values is: \[ts,o,h,l,c,confirm\]

---

### Liquidation orders channel

Retrieve the recent liquidation orders. For futures and swaps, each contract
will only show a maximum of one order per one-second period. This data doesn’t
represent the total number of liquidations on OKX.

#### URL Path

/ws/v5/public

#### Request Parameters

| Parameter     | Type             | Required | Description                                                                                                                                                                                                                                      |
| ------------- | ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| id            | String           | No       | Unique identifier of the message<br>Provided by client. It will be returned in response message for identifying the corresponding request.<br>A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters. |
| op            | String           | Yes      | Operation<br><code>subscribe</code><br><code>unsubscribe</code>                                                                                                                                                                                  |
| args          | Array of objects | Yes      | List of subscribed channels                                                                                                                                                                                                                      |
| &gt; channel  | String           | Yes      | Channel name<br><code>liquidation-orders</code>                                                                                                                                                                                                  |
| &gt; instType | String           | Yes      | Instrument type<br><code>SWAP</code><br><code>FUTURES</code><br><code>MARGIN</code><br><code>OPTION</code>                                                                                                                                       |

#### Response Parameters

| **Parameter**    | **Type**         | **Description**                                                                                                                                                                                                        |
| ---------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id               | String           | Unique identifier of the message                                                                                                                                                                                       |
| arg              | Object           | Successfully subscribed channel                                                                                                                                                                                        |
| &gt; channel     | String           | Channel name                                                                                                                                                                                                           |
| &gt; instId      | String           | Instrument ID                                                                                                                                                                                                          |
| data             | Array of objects | Subscribed data                                                                                                                                                                                                        |
| &gt; instType    | String           | Instrument type                                                                                                                                                                                                        |
| &gt; instId      | String           | Instrument ID, e.g. <code>BTC-USD-SWAP</code>                                                                                                                                                                          |
| &gt; uly         | String           | Underlying<br>Applicable to <code>FUTURES</code>/<code>SWAP</code>/<code>OPTION</code>                                                                                                                                 |
| &gt; details     | Array of objects | Liquidation details                                                                                                                                                                                                    |
| &gt;&gt; side    | String           | Order side<br><code>buy</code><br><code>sell</code><br>Applicable to <code>FUTURES</code>/<code>SWAP</code>                                                                                                            |
| &gt;&gt; posSide | String           | Position mode side<br><code>long</code>: Hedge mode long<br><code>short</code>: Hedge mode short<br><code>net</code>: Net mode                                                                                         |
| &gt;&gt; bkPx    | String           | Bankruptcy price. The price of the transaction with the system's liquidation account, only applicable to <code>FUTURES</code>/<code>SWAP</code>                                                                        |
| &gt;&gt; sz      | String           | Quantity of liquidation, only applicable to <code>MARGIN</code>/<code>FUTURES</code>/<code>SWAP</code>.<br>For <code>MARGIN</code>, the unit is base currency.<br>For <code>FUTURES/SWAP</code>, the unit is contract. |
| &gt;&gt; bkLoss  | String           | Bankruptcy loss                                                                                                                                                                                                        |
| &gt;&gt; ccy     | String           | Liquidation currency, only applicable to <code>MARGIN</code>                                                                                                                                                           |
| &gt;&gt; ts      | String           | Liquidation time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>                                                                                                                               |

---

### ADL warning channel

Auto-deleveraging warning channel.

In the `normal` state, data will be pushed once every minute to display the
balance of insurance fund and etc.

In the warning state or when there is ADL risk (`warning/adl`), data will be
pushed every second to display information such as the real-time decline rate of
insurance fund.

For more ADL details, please refer to
[Introduction to Auto-deleveraging](https://www.okx.com/help/iv-introduction-to-auto-deleveraging-adl)

#### URL Path

/ws/v5/public

#### Request Parameters

| Parameter       | Type             | Required | Description                                                                                                                                                                                                                                      |
| --------------- | ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| id              | String           | No       | Unique identifier of the message<br>Provided by client. It will be returned in response message for identifying the corresponding request.<br>A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters. |
| op              | String           | Yes      | Operation<br><code>subscribe</code><br><code>unsubscribe</code><br>                                                                                                                                                                              |
| args            | Array of objects | Yes      | List of subscribed channels                                                                                                                                                                                                                      |
| &gt; channel    | String           | Yes      | Channel name<br><code>adl-warning</code>                                                                                                                                                                                                         |
| &gt; instType   | String           | Yes      | Instrument type<br><code>SWAP</code><br><code>FUTURES</code><br><code>OPTION</code>                                                                                                                                                              |
| &gt; instFamily | String           | No       | Instrument family                                                                                                                                                                                                                                |

#### Response parameters

| Parameter       | Type   | Required | Description                                                                       |
| --------------- | ------ | -------- | --------------------------------------------------------------------------------- |
| id              | String | No       | Unique identifier of the message                                                  |
| event           | String | Yes      | Event<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code> |
| arg             | Object | No       | Subscribed channel                                                                |
| &gt; channel    | String | Yes      | Channel name<br><code>adl-warning</code>                                          |
| &gt; instType   | String | Yes      | Instrument type                                                                   |
| &gt; instFamily | String | No       | Instrument family                                                                 |
| code            | String | No       | Error code                                                                        |
| msg             | String | No       | Error message                                                                     |
| connId          | String | Yes      | WebSocket connection ID                                                           |

#### Push data parameters

| Parameter       | Type             | Description                                                                                                                                                                                                                                                                                                                                                               |
| --------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| arg             | Object           | Subscribed channel                                                                                                                                                                                                                                                                                                                                                        |
| &gt; channel    | String           | Channel name<br><code>adl-warning</code>                                                                                                                                                                                                                                                                                                                                  |
| &gt; instType   | String           | Instrument type                                                                                                                                                                                                                                                                                                                                                           |
| &gt; instFamily | String           | Instrument family                                                                                                                                                                                                                                                                                                                                                         |
| data            | Array of objects | Subscribed data                                                                                                                                                                                                                                                                                                                                                           |
| &gt; instType   | String           | Instrument type                                                                                                                                                                                                                                                                                                                                                           |
| &gt; instFamily | String           | Instrument family                                                                                                                                                                                                                                                                                                                                                         |
| &gt; state      | String           | state<br><code>normal</code><br><code>warning</code><br><code>adl</code>                                                                                                                                                                                                                                                                                                  |
| &gt; bal        | String           | Real-time insurance fund balance                                                                                                                                                                                                                                                                                                                                          |
| &gt; ccy        | String           | The corresponding currency of insurance fund balance                                                                                                                                                                                                                                                                                                                      |
| &gt; maxBal     | String           | Maximum insurance fund balance in the past eight hours<br><br>Applicable when state is <code>warning</code> or <code>adl</code>                                                                                                                                                                                                                                           |
| &gt; maxBalTs   | String           | Timestamp when insurance fund balance reached maximum in the past eight hours, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>                                                                                                                                                                                                                     |
| &gt; adlType    | String           | ADL related events<br><code>rate_adl_start</code>: ADL begins due to high insurance fund decline rate<br><code>bal_adl_start</code>: ADL begins due to insurance fund balance falling<br><code>pos_adl_start</code>：ADL begins due to the volume of liquidation orders falls to a certain level (only applicable to premarket symbols)<br><code>adl_end</code>: ADL ends |
| &gt; adlBal     | String           | Insurance fund balance that triggers ADL                                                                                                                                                                                                                                                                                                                                  |
| &gt; adlRecBal  | String           | Insurance fund balance that turns off ADL                                                                                                                                                                                                                                                                                                                                 |
| &gt; ts         | String           | Data push time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>                                                                                                                                                                                                                                                                                    |
| &gt; decRate    | String           | <del>Real-time insurance fund decline rate (compare bal and maxBal)<br><br>Applicable when state is <code>warning</code> or <code>adl</code></del>(Deprecated)                                                                                                                                                                                                            |
| &gt; adlRate    | String           | <del>Insurance fund decline rate that triggers ADL</del>(Deprecated)                                                                                                                                                                                                                                                                                                      |
| &gt; adlRecRate | String           | <del>Insurance fund decline rate that turns off ADL</del>(Deprecated)                                                                                                                                                                                                                                                                                                     |

---

### Economic calendar channel

This endpoint is only supported in production environment.

Retrieve the most up-to-date economic calendar data. This endpoint is only
applicable to VIP 1 and above users in the trading fee tier.

#### URL Path

/ws/v5/business (required login)

#### Request parameters

| Parameter    | Type             | Required | Description                                                                                                                                                                                                                                      |
| ------------ | ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| id           | String           | No       | Unique identifier of the message<br>Provided by client. It will be returned in response message for identifying the corresponding request.<br>A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters. |
| op           | String           | Yes      | Operation<br><code>subscribe</code><br><code>unsubscribe</code>                                                                                                                                                                                  |
| args         | Array of objects | Yes      | List of subscribed channels                                                                                                                                                                                                                      |
| &gt; channel | String           | Yes      | Channel name<br><code>economic-calendar</code>                                                                                                                                                                                                   |

#### Response parameters

| Parameter    | Type   | Required | Description                                                                       |
| ------------ | ------ | -------- | --------------------------------------------------------------------------------- |
| id           | String | No       | Unique identifier of the message                                                  |
| event        | String | Yes      | Event<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code> |
| arg          | Object | No       | Subscribed channel                                                                |
| &gt; channel | String | Yes      | Channel name                                                                      |
| code         | String | No       | Error code                                                                        |
| msg          | String | No       | Error message                                                                     |
| connId       | String | Yes      | WebSocket connection ID                                                           |

#### Push data parameters

| Parameter        | Type             | Description                                                                                                                |
| ---------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------- |
| arg              | Object           | Successfully subscribed channel                                                                                            |
| &gt; channel     | String           | Channel name<br><code>economic-calendar</code>                                                                             |
| data             | Array of objects | Subscribed data                                                                                                            |
| &gt; event       | string           | Event name                                                                                                                 |
| &gt; region      | string           | Country, region or entity                                                                                                  |
| &gt; category    | string           | Category name                                                                                                              |
| &gt; actual      | string           | The actual value of this event                                                                                             |
| &gt; previous    | string           | Latest actual value of the previous period<br>The value will be revised if revision is applicable                          |
| &gt; forecast    | string           | Average forecast among a representative group of economists                                                                |
| &gt; prevInitial | string           | The initial value of the previous period<br>Only applicable when revision happens                                          |
| &gt; date        | string           | Estimated release time of the value of actual field, millisecond format of Unix timestamp, e.g. <code>1597026383085</code> |
| &gt; refDate     | string           | Date for which the datapoint refers to                                                                                     |
| &gt; calendarId  | string           | Calendar ID                                                                                                                |
| &gt; unit        | string           | Unit of the data                                                                                                           |
| &gt; ccy         | string           | Currency of the data                                                                                                       |
| &gt; importance  | string           | Level of importance<br><code>1</code>: low<br><code>2</code>: medium<br><code>3</code>: high                               |
| &gt; ts          | string           | The time of the latest update                                                                                              |

---
