# OKX API Documentation - Overview

## API Resources and Support [🔗](https://www.okx.com/docs-v5/en/#overview-api-resources-and-support "Direct link to: https://www.okx.com/docs-v5/en/#overview-api-resources-and-support")

---

### Tutorials [🔗](https://www.okx.com/docs-v5/en/#overview-api-resources-and-support-tutorials "Direct link to: https://www.okx.com/docs-v5/en/#overview-api-resources-and-support-tutorials")

- Learn how to trade with API:
  [Best practice to OKX’s API](/docs-v5/trick_en/#instrument-configuration)
- Learn python spot trading step by step:
  [Python Spot Trading Tutorial](/help/how-can-i-do-spot-trading-with-the-jupyter-notebook)
- Learn python derivatives trading step by step:
  [Python Derivatives Trading Tutorial](/help/how-can-i-do-derivatives-trading-with-the-jupyter-notebook)

---

### Python libraries [🔗](https://www.okx.com/docs-v5/en/#overview-api-resources-and-support-python-libraries "Direct link to: https://www.okx.com/docs-v5/en/#overview-api-resources-and-support-python-libraries")

- Use Python SDK for easier integration:
  [Python SDK](https://pypi.org/project/python-okx/)
- Get access to our market maker python sample code
  [Python market maker sample](https://github.com/okxapi/okx-sample-market-maker)

---

### Customer service [🔗](https://www.okx.com/docs-v5/en/#overview-api-resources-and-support-customer-service "Direct link to: https://www.okx.com/docs-v5/en/#overview-api-resources-and-support-customer-service")

- Please take 1 minute to help us improve:
  [API Satisfaction Survey](https://forms.gle/Ehou2xFv5GE1xUGr9)
- If you have any questions, please consult online customer service

---

## API key Creation [🔗](https://www.okx.com/docs-v5/en/#overview-api-key-creation "Direct link to: https://www.okx.com/docs-v5/en/#overview-api-key-creation")

Please refer to [my api page](/account/my-api) regarding API Key creation.

---

### Generating an API key [🔗](https://www.okx.com/docs-v5/en/#overview-api-key-creation-generating-an-api-key "Direct link to: https://www.okx.com/docs-v5/en/#overview-api-key-creation-generating-an-api-key")

Create an API key on the website before signing any requests. After creating an
API key, keep the following information safe:

- API key
- Secret key
- Passphrase

The system returns randomly-generated API keys and SecretKeys. You will need to
provide the Passphrase to access the API. We store the salted hash of your
Passphrase for authentication. We cannot recover the Passphrase if you have lost
it. You will need to create a new set of API key.

---

### API key permissions [🔗](https://www.okx.com/docs-v5/en/#overview-api-key-creation-api-key-permissions "Direct link to: https://www.okx.com/docs-v5/en/#overview-api-key-creation-api-key-permissions")

There are three permissions below that can be associated with an API key. One or
more permission can be assigned to any key.

- `Read` : Can request and view account info such as bills and order history
  which need read permission
- `Trade` : Can place and cancel orders, funding transfer, make settings which
  need write permission
- `Withdraw` : Can make withdrawals

---

### API key security [🔗](https://www.okx.com/docs-v5/en/#overview-api-key-creation-api-key-security "Direct link to: https://www.okx.com/docs-v5/en/#overview-api-key-creation-api-key-security")

To improve security, we strongly recommend clients linked the API key to IP
addresses

- Each API key can bind up to 20 IP addresses, which support IPv4/IPv6 and
  network segment formats.

API keys that are not linked to an IP address and have \`trade\` or \`withdraw\`
permissions will expire after 14 days of inactivity. (The API key of demo
trading will not expire)

- Only when the user calls an API that requires API key authentication will it
  be considered as the API key is used.
- Calling an API that does not require API key authentication will not be
  considered used even if API key information is passed in.
- For websocket, only operation of logging in will be considered to have used
  the API key. Any operation though the connection after logging in (such as
  subscribing/placing an order) will not be considered to have used the API key.
  Please pay attention.

Users can get the usage records of the API key with `trade` or `withdraw`
permissions but unlinked to any IP address though
[Security Center](/account/security).

---

## REST Authentication [🔗](https://www.okx.com/docs-v5/en/#overview-rest-authentication "Direct link to: https://www.okx.com/docs-v5/en/#overview-rest-authentication")

---

### Making Requests [🔗](https://www.okx.com/docs-v5/en/#overview-rest-authentication-making-requests "Direct link to: https://www.okx.com/docs-v5/en/#overview-rest-authentication-making-requests")

All private REST requests must contain the following headers:

- `OK-ACCESS-KEY` The API key as a String.
- `OK-ACCESS-SIGN` The Base64-encoded signature (see Signing Messages subsection
  for details).
- `OK-ACCESS-TIMESTAMP` The UTC timestamp of your request .e.g :
  2020-12-08T09:08:57.715Z
- `OK-ACCESS-PASSPHRASE` The passphrase you specified when creating the API key.

Request bodies should have content type `application/json` and be in valid JSON
format.

---

### Signature [🔗](https://www.okx.com/docs-v5/en/#overview-rest-authentication-signature "Direct link to: https://www.okx.com/docs-v5/en/#overview-rest-authentication-signature")

> Signing Messages

The `OK-ACCESS-SIGN` header is generated as follows:

- Create a pre-hash string of timestamp + method + requestPath + body (where +
  represents String concatenation).
- Prepare the SecretKey.
- Sign the pre-hash string with the SecretKey using the HMAC SHA256.
- Encode the signature in the Base64 format.

Example:
`sign=CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(timestamp + 'GET' + '/api/v5/account/balance?ccy=BTC', SecretKey))`

The `timestamp` value is the same as the `OK-ACCESS-TIMESTAMP` header with
millisecond ISO format, e.g. `2020-12-08T09:08:57.715Z`.

The request method should be in UPPERCASE: e.g. `GET` and `POST`.

The `requestPath` is the path of requesting an endpoint.

Example: `/api/v5/account/balance`

The `body` refers to the String of the request body. It can be omitted if there
is no request body (frequently the case for `GET` requests).

Example: `{"instId":"BTC-USDT","lever":"5","mgnMode":"isolated"}`

\`GET\` request parameters are counted as requestpath, not body

The SecretKey is generated when you create an API key.

Example: `22582BD0CFF14C41EDBF1AB98506286D`

---

## WebSocket [🔗](https://www.okx.com/docs-v5/en/#overview-websocket "Direct link to: https://www.okx.com/docs-v5/en/#overview-websocket")

---

### Overview [🔗](https://www.okx.com/docs-v5/en/#overview-websocket-overview "Direct link to: https://www.okx.com/docs-v5/en/#overview-websocket-overview")

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

### Connect [🔗](https://www.okx.com/docs-v5/en/#overview-websocket-connect "Direct link to: https://www.okx.com/docs-v5/en/#overview-websocket-connect")

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

### Connection count limit [🔗](https://www.okx.com/docs-v5/en/#overview-websocket-connection-count-limit "Direct link to: https://www.okx.com/docs-v5/en/#overview-websocket-connection-count-limit")

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

### Login [🔗](https://www.okx.com/docs-v5/en/#overview-websocket-login "Direct link to: https://www.okx.com/docs-v5/en/#overview-websocket-login")

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

### Subscribe [🔗](https://www.okx.com/docs-v5/en/#overview-websocket-subscribe "Direct link to: https://www.okx.com/docs-v5/en/#overview-websocket-subscribe")

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

| Parameter       | Type             | Required | Description                                                                                                                                                                                                                                      |
| --------------- | ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| id              | String           | No       | Unique identifier of the message<br>Provided by client. It will be returned in response message for identifying the corresponding request.<br>A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters. |
| op              | String           | Yes      | Operation<br><code>subscribe</code>                                                                                                                                                                                                              |
| args            | Array of objects | Yes      | List of subscribed channels                                                                                                                                                                                                                      |
| &gt; channel    | String           | Yes      | Channel name                                                                                                                                                                                                                                     |
| &gt; instType   | String           | No       | Instrument type<br><code>SPOT</code><br><code>MARGIN</code><br><code>SWAP</code><br><code>FUTURES</code><br><code>OPTION</code><br><code>ANY</code>                                                                                              |
| &gt; instFamily | String           | No       | Instrument family<br>Applicable to <code>FUTURES</code>/<code>SWAP</code>/<code>OPTION</code>                                                                                                                                                    |
| &gt; instId     | String           | No       | Instrument ID                                                                                                                                                                                                                                    |

**Return parameters**

| Parameter       | Type   | Required | Description                                                                                                                                         |
| --------------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| id              | String | No       | Unique identifier of the message                                                                                                                    |
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

### Unsubscribe [🔗](https://www.okx.com/docs-v5/en/#overview-websocket-unsubscribe "Direct link to: https://www.okx.com/docs-v5/en/#overview-websocket-unsubscribe")

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

### Notification [🔗](https://www.okx.com/docs-v5/en/#overview-websocket-notification "Direct link to: https://www.okx.com/docs-v5/en/#overview-websocket-notification")

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

## Account mode [🔗](https://www.okx.com/docs-v5/en/#overview-account-mode "Direct link to: https://www.okx.com/docs-v5/en/#overview-account-mode")

To facilitate your trading experience, please set the appropriate account mode
before starting trading.

In the trading account trading system, 4 account modes are supported:
`Spot mode`, `Futures mode`, `Multi-currency margin mode`, and
`Portfolio margin mode`.

You need to set on the Web/App for the first set of every account mode.

---

## Production Trading Services [🔗](https://www.okx.com/docs-v5/en/#overview-production-trading-services "Direct link to: https://www.okx.com/docs-v5/en/#overview-production-trading-services")

The Production Trading URL:

- REST: `https://www.okx.com`
- Public WebSocket: `wss://ws.okx.com:8443/ws/v5/public`
- Private WebSocket: `wss://ws.okx.com:8443/ws/v5/private`
- Business WebSocket: `wss://ws.okx.com:8443/ws/v5/business`

---

## Demo Trading Services [🔗](https://www.okx.com/docs-v5/en/#overview-demo-trading-services "Direct link to: https://www.okx.com/docs-v5/en/#overview-demo-trading-services")

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

---

### Demo Trading Explorer [🔗](https://www.okx.com/docs-v5/en/#overview-demo-trading-services-demo-trading-explorer "Direct link to: https://www.okx.com/docs-v5/en/#overview-demo-trading-services-demo-trading-explorer")

You need to sign in to your OKX account before accessing the explorer. The
interface only allow access to the demo trading environment.

- Clicking `Try it out` button in Parameters Panel and editing request
  parameters.
- Clicking `Execute` button to send your request. You can check response in
  Responses panel.

Try [demo trading explorer](/demo-trading-explorer/v5/en)

---

## General Info [🔗](https://www.okx.com/docs-v5/en/#overview-general-info "Direct link to: https://www.okx.com/docs-v5/en/#overview-general-info")

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

**The introduction of `instFamily`:**

- There are no difference between `uly` and `instFamily`:
  - For BTC-USD-SWAP, `uly` and `instFamily` are both BTC-USD. For
    BTC-USDC-SWAP, `uly` and `instFamily` are both BTC-USDC.
  - If you set the request parameter "uly" as BTC-USD, you will get the data for
    BTC-USD (coin-margined) contracts.
  - If you set the request parameter "instFamily" as BTC-USD, then you also will
    get data for BTC-USD (coin-margined) contracts.
- You can look up the corresponding instFamily of each instrument from the "Get
  instruments" endpoint.

---

## Transaction Timeouts [🔗](https://www.okx.com/docs-v5/en/#overview-transaction-timeouts "Direct link to: https://www.okx.com/docs-v5/en/#overview-transaction-timeouts")

Orders may not be processed in time due to network delay or busy OKX servers.
You can configure the expiry time of the request using `expTime` if you want the
order request to be discarded after a specific time.

If `expTime` is specified in the requests for Place (multiple) orders or Amend
(multiple) orders, the request will not be processed if the current system time
of the server is after the `expTime`.

---

### REST API [🔗](https://www.okx.com/docs-v5/en/#overview-transaction-timeouts-rest-api "Direct link to: https://www.okx.com/docs-v5/en/#overview-transaction-timeouts-rest-api")

Set the following parameters in the request header

| Parameter | Type   | Required | Description                                                                                        |
| --------- | ------ | -------- | -------------------------------------------------------------------------------------------------- |
| expTime   | String | No       | Request effective deadline. Unix timestamp format in milliseconds, e.g. <code>1597026383085</code> |

The following endpoints are supported:

- [Place order](/docs-v5/en/#order-book-trading-trade-post-place-order)
- [Place multiple orders](/docs-v5/en/#order-book-trading-trade-post-place-multiple-orders)
- [Amend order](/docs-v5/en/#order-book-trading-trade-post-amend-order)
- [Amend multiple orders](/docs-v5/en/#order-book-trading-trade-post-amend-multiple-orders)
- [POST / Place sub order](/docs-v5/en/#order-book-trading-signal-bot-trading-post-place-sub-order)
  under signal bot trading

---

### WebSocket [🔗](https://www.okx.com/docs-v5/en/#overview-transaction-timeouts-websocket "Direct link to: https://www.okx.com/docs-v5/en/#overview-transaction-timeouts-websocket")

The following parameters are set in the request

| Parameter | Type   | Required | Description                                                                                        |
| --------- | ------ | -------- | -------------------------------------------------------------------------------------------------- |
| expTime   | String | No       | Request effective deadline. Unix timestamp format in milliseconds, e.g. <code>1597026383085</code> |

The following endpoints are supported:

- [Place order](/docs-v5/en/#order-book-trading-trade-ws-place-order)
- [Place multiple orders](/docs-v5/en/#order-book-trading-trade-ws-place-multiple-orders)
- [Amend order](/docs-v5/en/#order-book-trading-trade-ws-amend-order)
- [Amend multiple orders](/docs-v5/en/#order-book-trading-trade-ws-amend-multiple-orders)

---

## Rate Limits [🔗](https://www.okx.com/docs-v5/en/#overview-rate-limits "Direct link to: https://www.okx.com/docs-v5/en/#overview-rate-limits")

Our REST and WebSocket APIs use rate limits to protect our APIs against
malicious usage so our trading platform can operate reliably and fairly.  
When a request is rejected by our system due to rate limits, the system returns
error code 50011 (Rate limit reached. Please refer to API documentation and
throttle requests accordingly).  
The rate limit is different for each endpoint. You can find the limit for each
endpoint from the endpoint details. Rate limit definitions are detailed below:

- WebSocket login and subscription rate limits are based on connection.
- Public unauthenticated REST rate limits are based on IP address.
- Private REST rate limits are based on User ID (sub-accounts have individual
  User IDs).
- WebSocket order management rate limits are based on User ID (sub-accounts have
  individual User IDs).

---

### Trading-related APIs [🔗](https://www.okx.com/docs-v5/en/#overview-rate-limits-trading-related-apis "Direct link to: https://www.okx.com/docs-v5/en/#overview-rate-limits-trading-related-apis")

For Trading-related APIs (place order, cancel order, and amend order) the
following conditions apply:

- Rate limits are shared across the REST and WebSocket channels.
- Rate limits for placing orders, amending orders, and cancelling orders are
  independent from each other.
- Rate limits are defined on the Instrument ID level (except Options)
- Rate limits for Options are defined based on the Instrument Family level.
  Refer to the
  [Get instruments](/docs-v5/en/#public-data-rest-api-get-instruments) endpoint
  to view Instrument Family information.
- Rate limits for a multiple order endpoint and a single order endpoint are also
  independent, with the exception being when there is only one order sent to a
  multiple order endpoint, the order will be counted as a single order and adopt
  the single order rate limit.

---

### Sub-account rate limit [🔗](https://www.okx.com/docs-v5/en/#overview-rate-limits-sub-account-rate-limit "Direct link to: https://www.okx.com/docs-v5/en/#overview-rate-limits-sub-account-rate-limit")

At the sub-account level, we allow a maximum of 1000 order requests per 2
seconds. Only new order requests and amendment order requests will be counted
towards this limit. The limit encompasses all requests from the endpoints below.
For batch order requests consisting of multiple orders, each order will be
counted individually. Error code 50061 is returned when the sub-account rate
limit is exceeded. The existing rate limit rule per instrument ID remains
unchanged and the existing rate limit and sub-account rate limit will operate in
parallel. If clients require a higher rate limit, clients can trade via multiple
sub-accounts.

- [POST / Place order](/docs-v5/en/#order-book-trading-trade-post-place-order)
- [POST / Place multiple orders](/docs-v5/en/#order-book-trading-trade-post-place-multiple-orders)
- [POST / Amend order](/docs-v5/en/#order-book-trading-trade-post-amend-order)
- [POST / Amend multiple orders](/docs-v5/en/#order-book-trading-trade-post-amend-multiple-orders)
- [WS / Place order](/docs-v5/en/#order-book-trading-trade-ws-place-order)
- [WS / Place multiple orders](/docs-v5/en/#order-book-trading-trade-ws-place-multiple-orders)
- [WS / Amend order](/docs-v5/en/#order-book-trading-trade-ws-amend-order)
- [WS / Amend multiple orders](/docs-v5/en/#order-book-trading-trade-ws-amend-multiple-orders)

---

### Fill ratio based sub-account rate limit [🔗](https://www.okx.com/docs-v5/en/#overview-rate-limits-fill-ratio-based-sub-account-rate-limit "Direct link to: https://www.okx.com/docs-v5/en/#overview-rate-limits-fill-ratio-based-sub-account-rate-limit")

This is only applicable to >= VIP5 customers.  
As an incentive for more efficient trading, the exchange will offer a higher
sub-account rate limit to clients with a high trade fill ratio.

The exchange calculates two ratios based on the transaction data from the past 7
days at 00:00 UTC.

1.  Sub-account fill ratio: This ratio is determined by dividing (the trade
    volume in USDT of the sub-account) by (sum of (new and amendment request
    count per symbol \* symbol multiplier) of the sub-account). Note that the
    master trading account itself is also considered as a sub-account in this
    context.
2.  Master account aggregated fill ratio: This ratio is calculated by dividing
    (the trade volume in USDT on the master account level) by (the sum (new and
    amendment count per symbol \* symbol multiplier\] of all sub-accounts).

The symbol multiplier allows for fine-tuning the weight of each symbol. A
smaller symbol multiplier (<1) is used for smaller pairs that require more
updates per trading volume. All instruments have a default symbol multiplier,
and some instruments will have overridden symbol multipliers.

| InstType          | Override rule         | Overridden symbol multiplier                                                                       | Default symbol multiplier |
| ----------------- | --------------------- | -------------------------------------------------------------------------------------------------- | ------------------------- |
| Perpetual Futures | Per instrument ID     | <code>1</code><br>Instrument ID:<br>BTC-USDT-SWAP<br>BTC-USD-SWAP<br>ETH-USDT-SWAP<br>ETH-USD-SWAP | <code>0.2</code>          |
| Expiry Futures    | Per instrument Family | <code>0.3</code><br>Instrument Family:<br>BTC-USDT<br>BTC-USD<br>ETH-USDT<br>ETH-USD               | <code>0.1</code>          |
| Spot              | Per instrument ID     | <code>0.5</code><br>Instrument ID:<br>BTC-USDT<br>ETH-USDT                                         | <code>0.1</code>          |
| Options           | Per instrument Family |                                                                                                    | <code>0.1</code>          |

The fill ratio computation excludes block trading, spread trading, MMP and fiat
orders for order count; and excludes block trading, spread trading for trade
volume. Only successful order requests (sCode=0) are considered.

At 08:00 UTC, the system will use the maximum value between the sub-account fill
ratio and the master account aggregated fill ratio based on the data snapshot at
00:00 UTC to determine the sub-account rate limit based on the table below. For
broker (non-disclosed) clients, the system considers the sub-account fill ratio
only.

|        | Fill ratio\[x<=ratio<y) | Sub-account rate limit per 2 seconds(new and amendment) |
| ------ | ----------------------- | ------------------------------------------------------- |
| Tier 1 | [0,1)                   | 1,000                                                   |
| Tier 2 | [1,2)                   | 1,250                                                   |
| Tier 3 | [2,3)                   | 1,500                                                   |
| Tier 4 | [3,5)                   | 1,750                                                   |
| Tier 5 | [5,10)                  | 2,000                                                   |
| Tier 6 | [10,20)                 | 2,500                                                   |
| Tier 7 | [20,50)                 | 3,000                                                   |
| Tier 8 | &gt;= 50                | 10,000                                                  |

If there is an improvement in the fill ratio and rate limit to be uplifted, the
uplift will take effect immediately at 08:00 UTC. However, if the fill ratio
decreases and the rate limit needs to be lowered, a one-day grace period will be
granted, and the lowered rate limit will only be implemented on T+1 at 08:00
UTC. On T+1, if the fill ratio improves, the higher rate limit will be applied
accordingly. In the event of client demotion to VIP4, their rate limit will be
downgraded to Tier 1, accompanied by a one-day grace period.

If the 7-day trading volume of a sub-account is less than 1,000,000 USDT, the
fill ratio of the master account will be applied to it.

For newly created sub-accounts, the Tier 1 rate limit will be applied at
creation until T+1 8am UTC, at which the normal rules will be applied.

Block trading, spread trading, MMP and spot/margin orders are exempted from the
sub-account rate limit.

The exchange offers
[GET / Account rate limit](/docs-v5/en/#order-book-trading-trade-get-account-rate-limit)
endpoint that provides ratio and rate limit data, which will be updated daily at
8am UTC. It will return the sub-account fill ratio, the master account
aggregated fill ratio, current sub-account rate limit and sub-account rate limit
on T+1 (applicable if the rate limit is going to be demoted).

The fill ratio and rate limit calculation example is shown below. Client has 3
accounts, symbol multiplier for BTC-USDT-SWAP = 1 and XRP-USDT = 0.1.

1.  Account A (master account):
    1.  BTC-USDT-SWAP trade volume = 100 USDT, order count = 10;
    2.  XRP-USDT trade volume = 20 USDT, order count = 15;
    3.  Sub-account ratio = (100+20) / (10 \* 1 + 15 \* 0.1) = 10.4
2.  Account B (sub-account):
    1.  BTC-USDT-SWAP trade volume = 200 USDT, order count = 100;
    2.  XRP-USDT trade volume = 20 USDT, order count = 30;
    3.  Sub-account ratio = (200+20) / (100 \* 1 + 30 \* 0.1) = 2.13
3.  Account C (sub-account):
    1.  BTC-USDT-SWAP trade volume = 300 USDT, order count = 1000;
    2.  XRP-USDT trade volume = 20 USDT, order count = 45;
    3.  Sub-account ratio = (300+20) / (100 \* 1 + 45 \* 0.1) = 3.06
4.  Master account aggregated fill ratio = (100+20+200+20+300+20) / (10 \* 1 +
    15 \* 0.1 + 100 \* 1 + 30 \* 0.1 + 100 \* 1 + 45 \* 0.1) = 3.01
5.  Rate limit of accounts
    1.  Account A = max(10.4, 3.01) = 10.4 -> 2500 order requests/2s
    2.  Account B = max(2.13, 3.01) = 3.01 -> 1750 order requests/2s
    3.  Account C = max(3.06, 3.01) = 3.06 -> 1750 order requests/2s

---

### Best practices [🔗](https://www.okx.com/docs-v5/en/#overview-rate-limits-best-practices "Direct link to: https://www.okx.com/docs-v5/en/#overview-rate-limits-best-practices")

If you require a higher request rate than our rate limit, you can set up
different sub-accounts to batch request rate limits. We recommend this method
for throttling or spacing out requests in order to maximize each accounts' rate
limit and avoid disconnections or rejections.

---

## Market Maker Program [🔗](https://www.okx.com/docs-v5/en/#overview-market-maker-program "Direct link to: https://www.okx.com/docs-v5/en/#overview-market-maker-program")

High-caliber trading teams are welcomed to work with OKX as market makers in
providing a liquid, fair, and orderly platform to all users. OKX market makers
could enjoy favourable fees in return for meeting the market making obligations.

Prerequisites (Satisfy any condition):

- VIP 2 or above on fee schedule
- Qualified Market Maker on other exchange

Interested parties can reach out to us using this form:
[https://okx.typeform.com/contact-sales](https://okx.typeform.com/contact-sales)

Remarks:

Market making obligations and trading fees will be shared to successful parties
only.

OKX reserves the right of final decision and interpretation for the content
hereinabove.

In fairness to all users, market makers will be ineligible for other VIP-related
and volume-related promotions or rebates.

---

## Broker Program [🔗](https://www.okx.com/docs-v5/en/#overview-broker-program "Direct link to: https://www.okx.com/docs-v5/en/#overview-broker-program")

If your business platform offers cryptocurrency services, you can apply to join
the OKX Broker Program, become our partner broker, enjoy exclusive broker
services, and earn high rebates through trading fees generated by OKX users.  
The Broker Program includes, and is not limited to, integrated trading
platforms, trading bots, copy trading platforms, trading bot providers,
quantitative strategy institutions, asset management platforms etc.

- [Click to apply](/broker/home)
- [Broker rules](/help/introduction-of-rules-on-okx-brokers)
- If you have any questions, feel free to contact our customer support.

Relevant information for specific Broker Program documentation and product
services will be provided following successful applications.

---
