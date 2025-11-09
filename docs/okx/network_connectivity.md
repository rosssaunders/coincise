# Network Connectivity

## Production Trading Services

The Production Trading URL:

- REST: `https://www.okx.com`
- Public WebSocket: `wss://ws.okx.com:8443/ws/v5/public`
- Private WebSocket: `wss://ws.okx.com:8443/ws/v5/private`
- Business WebSocket: `wss://ws.okx.com:8443/ws/v5/business`

## Demo Trading Services

Currently, the API works for Demo Trading, but some functions are not supported,
such as `withdraw`,`deposit`,`purchase/redemption`, etc.

The Demo Trading URL:

- REST: `https://www.okx.com`
- Public WebSocket: `wss://wspap.okx.com:8443/ws/v5/public`
- Private WebSocket: `wss://wspap.okx.com:8443/ws/v5/private`
- Business WebSocket: `wss://wspap.okx.com:8443/ws/v5/business`

OKX account can be used for login on Demo Trading. If you already have an OKX
account, you can log in directly.

Start API Demo Trading by the following steps:  
Login OKX —> Trade —> Demo Trading —> Personal Center —> Demo Trading API ->
Create Demo Trading API Key —> Start your Demo Trading

Note: \`x-simulated-trading: 1\` needs to be added to the header of the Demo
Trading request.

### Demo Trading Explorer

You need to sign in to your OKX account before accessing the explorer. The
interface only allow access to the demo trading environment.

- Clicking `Try it out` button in Parameters Panel and editing request
  parameters.
- Clicking `Execute` button to send your request. You can check response in
  Responses panel.

Try [demo trading explorer](/demo-trading-explorer/v5/en)

## WebSocket

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

### Login

#### Request Parameters

| Parameter     | Type             | Required | Description                          |
| ------------- | ---------------- | -------- | ------------------------------------ |
| op            | String           | Yes      | Operation                            |
| `login`       |
| args          | Array of objects | Yes      | List of account to login             |
| \> apiKey     | String           | Yes      | API Key                              |
| \> passphrase | String           | Yes      | API Key password                     |
| \> timestamp  | String           | Yes      | Unix Epoch time, the unit is seconds |
| \> sign       | String           | Yes      | Signature string                     |

#### Response parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| event     | String | Yes      | Operation   |

`login`  
`error` | | code | String | No | Error code | | msg | String | No | Error
message | | connId | String | Yes | WebSocket connection ID |

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

| Parameter | Type   | Required | Description                      |
| --------- | ------ | -------- | -------------------------------- |
| id        | String | No       | Unique identifier of the message |

Provided by client. It will be returned in response message for identifying the
corresponding request.  
A combination of case-sensitive alphanumerics, all numbers, or all letters of up
to 32 characters. | | op | String | Yes | Operation  
`subscribe` | | args | Array of objects | Yes | List of subscribed channels | |
\> channel | String | Yes | Channel name | | \> instType | String | No |
Instrument type  
`SPOT`  
`MARGIN`  
`SWAP`  
`FUTURES`  
`OPTION`  
`ANY` | | \> instFamily | String | No | Instrument family  
Applicable to `FUTURES`/`SWAP`/`OPTION` | | \> instId | String | No | Instrument
ID |

**Return parameters**

| Parameter | Type   | Required | Description                      |
| --------- | ------ | -------- | -------------------------------- |
| id        | String | No       | Unique identifier of the message |
| event     | String | Yes      | Event                            |

`subscribe`  
`error` | | arg | Object | No | Subscribed channel | | \> channel | String | Yes
| Channel name | | \> instType | String | No | Instrument type  
`SPOT`  
`MARGIN`  
`SWAP`  
`FUTURES`  
`OPTION`  
`ANY` | | \> instFamily | String | No | Instrument family  
Applicable to `FUTURES`/`SWAP`/`OPTION` | | \> instId | String | No | Instrument
ID | | code | String | No | Error code | | msg | String | No | Error message | |
connId | String | Yes | WebSocket connection ID |

### Unsubscribe

Unsubscribe from one or more channels.

**Request parameters**

| Parameter     | Type             | Required | Description                          |
| ------------- | ---------------- | -------- | ------------------------------------ |
| op            | String           | Yes      | Operation                            |
| `unsubscribe` |
| args          | Array of objects | Yes      | List of channels to unsubscribe from |
| \> channel    | String           | Yes      | Channel name                         |
| \> instType   | String           | No       | Instrument type                      |

`SPOT`  
`MARGIN`  
`SWAP`  
`FUTURES`  
`OPTION`  
`ANY` | | \> instFamily | String | No | Instrument family  
Applicable to `FUTURES`/`SWAP`/`OPTION` | | \> instId | String | No | Instrument
ID |

**Response parameters**

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| event     | String | Yes      | Event       |

`unsubscribe`  
`error` | | arg | Object | No | Unsubscribed channel | | \> channel | String |
Yes | Channel name | | \> instType | String | No | Instrument type  
`SPOT`  
`MARGIN`  
`SWAP`  
`FUTURES`  
`OPTION` | | \> instFamily | String | No | Instrument family  
Applicable to `FUTURES`/`SWAP`/`OPTION` | | \> instId | String | No | Instrument
ID | | code | String | No | Error code | | msg | String | No | Error message |

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

## General Info

**The rules for placing orders at the exchange level are as follows:**

- The maximum number of pending orders (including post only orders, limit orders
  and taker orders that are being processed): 4,000
- The maximum number of pending orders per trading symbol is 500, the limit of
  500 pending orders applies to the following **order types**:
  - Limit
  - Market
  - Post only
  - Fill or Kill (FOK)
  - Immediate or Cancel (IOC)
  - Market order with Immediate-or-Cancel order (optimal limit IOC)
  - Take Profit / Stop Loss (TP/SL)
  - Limit and market orders triggered under the order types below:
    - Take Profit / Stop Loss (TP/SL)
    - Trigger
    - Trailing stop
    - Arbitrage
    - Iceberg
    - TWAP
    - Recurring buy

- The maximum number of pending spread orders: 500 across all spreads
- The maximum number of pending algo orders:
  - TP/SL order: 100 per instrument
  - Trigger order: 500
  - Trailing order: 50
  - Iceberg order: 100
  - TWAP order: 20

- The maximum number of grid trading
  - Spot grid: 100
  - Contract grid: 100

**The rules for trading are as follows:**

- When the number of maker orders matched with a taker order exceeds the maximum
  number limit of 1000, the taker order will be canceled.
  - The limit orders will only be executed with a portion corresponding to 1000
    maker orders and the remainder will be canceled.
  - Fill or Kill (FOK) orders will be canceled directly.

**The rules for the returning data are as follows:**

- `code` and `msg` represent the request result or error reason when the return
  data has `code`, and has not `sCode`;
- It is `sCode` and `sMsg` that represent the request result or error reason
  when the return data has `sCode` rather than `code` and `msg`.

**`instFamily` and `uly` parameter explanation:**

- The following explanation is based on the `BTC` contract, other contracts are
  similar.
- `uly` is the index, like "BTC-USD", and there is a one-to-many relationship
  with the settlement and margin currency (`settleCcy`).
- `instFamily` is the trading instrument family, like `BTC-USD_UM`, and there is
  a one-to-one relationship with the settlement and margin currency
  (`settleCcy`).
- The following table shows the corresponding relationship of `uly`,
  `instFamily`, `settleCcy` and `instId`.

| **Contract Type**      | **uly**  | **instFamily** | **settleCcy** | **Delivery contract instId** | **Swap contract instId** |
| ---------------------- | -------- | -------------- | ------------- | ---------------------------- | ------------------------ |
| USDT-margined contract | BTC-USDT | BTC-USDT       | USDT          | BTC-USDT-250808              | BTC-USDT-SWAP            |
| USDC-margined contract | BTC-USDC | BTC-USDC       | USDC          | BTC-USDC-250808              | BTC-USDC-SWAP            |
| USD-margined contract  | BTC-USD  | **BTC-USD_UM** | **USDⓈ**      | **BTC-USD_UM-250808**        | **BTC-USD_UM-SWAP**      |
| Coin-margined contract | BTC-USD  | **BTC-USD**    | **BTC**       | **BTC-USD-250808**           | **BTC-USD-SWAP**         |

Note:  
1\. USDⓈ represents USD and multiple USD stable coins, like USDC, USDG.  
2\. The settlement and margin currency refers to the `settleCcy` field returned
by the [Get instruments](/docs-v5/en/#trading-account-rest-api-get-instruments)
endpoint.

## Transaction Timeouts

Orders may not be processed in time due to network delay or busy OKX servers.
You can configure the expiry time of the request using `expTime` if you want the
order request to be discarded after a specific time.

If `expTime` is specified in the requests for Place (multiple) orders or Amend
(multiple) orders, the request will not be processed if the current system time
of the server is after the `expTime`.

### REST API

Set the following parameters in the request header

| Parameter | Type   | Required | Description                                                                             |
| --------- | ------ | -------- | --------------------------------------------------------------------------------------- |
| expTime   | String | No       | Request effective deadline. Unix timestamp format in milliseconds, e.g. `1597026383085` |

The following endpoints are supported:

- [Place order](/docs-v5/en/#order-book-trading-trade-post-place-order)
- [Place multiple orders](/docs-v5/en/#order-book-trading-trade-post-place-multiple-orders)
- [Amend order](/docs-v5/en/#order-book-trading-trade-post-amend-order)
- [Amend multiple orders](/docs-v5/en/#order-book-trading-trade-post-amend-multiple-orders)
- [POST / Place sub order](/docs-v5/en/#order-book-trading-signal-bot-trading-post-place-sub-order)
  under signal bot trading

### WebSocket

The following parameters are set in the request

| Parameter | Type   | Required | Description                                                                             |
| --------- | ------ | -------- | --------------------------------------------------------------------------------------- |
| expTime   | String | No       | Request effective deadline. Unix timestamp format in milliseconds, e.g. `1597026383085` |

The following endpoints are supported:

- [Place order](/docs-v5/en/#order-book-trading-trade-ws-place-order)
- [Place multiple orders](/docs-v5/en/#order-book-trading-trade-ws-place-multiple-orders)
- [Amend order](/docs-v5/en/#order-book-trading-trade-ws-amend-order)
- [Amend multiple orders](/docs-v5/en/#order-book-trading-trade-ws-amend-multiple-orders)
