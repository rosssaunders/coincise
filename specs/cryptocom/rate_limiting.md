# Crypto.com API Rate Limiting Specification

## Overview

This specification defines **rate limiting rules** for a Crypto.com Exchange API
client library, covering **all product types** (Spot, Derivatives, Margin, etc.)
and both **public and private** API endpoints. The Crypto.com Exchange API v1 is
a unified API supporting Spot, Derivatives, and Margin trading, so the rate
limits below apply uniformly across these products. The rules are separated by
API type (REST vs. WebSocket) and API visibility (public vs. private) with
attention to the **throttling dimensions** (IP-based vs. API key/account-based
limits). The client library must enforce these limits internally (preventing
requests that would exceed the thresholds) rather than rely on retries or
backoff after hitting the limits. If the limits are violated, Crypto.com's
servers will respond with a **HTTP 429 Too Many Requests** error (error code
`TOO_MANY_REQUESTS`) – the goal of the client implementation is to avoid
reaching that state by proactive throttling.

## REST API Rate Limits

### Public REST Endpoints (IP-Based)

Public REST endpoints (unauthenticated market data APIs) are rate-limited on a
**per-IP address** basis. Each distinct public API method has its own rate
counter per IP. The client should track requests for each endpoint separately
per IP and ensure the following limits are not exceeded:

- **100 requests per second per endpoint (per IP)** for key market data
  endpoints, including:

  - `public/get-book` (order book data)
  - `public/get-ticker` (ticker price data)
  - `public/get-trades` (recent trades)
  - `public/get-valuations` (valuations data)
  - `public/get-candlestick` (OHLC candlestick data)
  - `public/get-insurance` (insurance fund data)

Each of the above endpoints allows up to **100 requests per second from a single
IP** independently. For example, a client may send 100 `get-book` requests and
100 `get-ticker` requests in the same second without issue, but 101 `get-book`
requests in one second from one IP would breach the limit. The client library
should enforce a maximum of 100 calls per second for each public endpoint per IP
(e.g. by queuing or delaying requests) to stay within these limits.

_(Note: “per second” in this context refers to a fixed 1-second time window. The
implementation can use a sliding window or token bucket mechanism to ensure no
more than 100 calls of a given public method are sent in any rolling one-second
period from a given client IP.)_

### Private REST Endpoints (API Key/Account-Based)

Private REST endpoints (authenticated user APIs) are rate-limited on a **per API
key** basis. Since each API key is associated with a user account, this
effectively means limits apply per account (assuming one key in use; multiple
keys would each have separate limits unless the exchange imposes a
behind-the-scenes account aggregate limit). The client should maintain counters
for each API key _and_ each method, and throttle requests to each private
endpoint according to the thresholds below:

- **Order Placement/Cancellation** – `private/create-order`,
  `private/cancel-order`, `private/cancel-all-orders`: **15 requests per 100ms
  each**. This is an extremely high burst rate (equivalent to 150
  requests/second) but enforced in 100ms intervals. The client must ensure no
  more than 15 of any of these order-related requests are sent within any 100ms
  window for a given API key.
- **Order Detail Lookup** – `private/get-order-detail`: **30 requests per
  100ms** (i.e. up to 300/sec). Again, throttle so that at most 30 order detail
  queries are made per 100ms for one API key.
- **Trade and Order History Queries** – `private/get-trades` and
  `private/get-order-history`: **1 request per second** each. These endpoints
  have a much lower rate limit. The client should allow only one call per second
  for each of these endpoints per API key. (Attempting a second request within
  the same second for `get-trades` or `get-order-history` should be delayed
  until the next second.)
- **All Other Private Endpoints** – **3 requests per 100ms** (i.e. 30 requests
  per second) for any other authenticated endpoints not listed above. This
  includes account balance queries, position queries, staking requests (see
  below), and any miscellaneous private calls. The 3/100ms rule should be
  applied per method per API key.

**Staking API:** Crypto.com’s Exchange API includes staking endpoints (prefixed
with `public/staking/` or `private/staking/`). All staking-related API calls are
limited to **50 requests per second** (per method). This applies equally to
public staking endpoints (e.g. fetching conversion rates) and private staking
endpoints (stake/unstake operations, staking history, etc.), each capped at 50
req/s. The client should ensure no more than 50 staking calls are made per
second per API key (for private) or per IP (for public staking). Staking limits
are separate from the general 100/sec or 30/sec limits above, since the staking
endpoints have their own fixed threshold of 50/sec.

**Enforcement Strategy:** For each private API method, the client must maintain
a timing mechanism to count requests in the defined interval. For
high-throughput limits given in “per 100ms”, use a moving 100ms window or
token-bucket (10ms tick granularity) to allow bursts up to the specified count.
For per-second limits, a simple counter reset every second (or a rolling window)
is sufficient. If multiple private endpoints are called in parallel, each should
be tracked independently according to its own limit. Under no circumstances
should the client send a request that would exceed these per-key method limits –
any such request should be queued or delayed until the appropriate time window
opens. (No automatic retry/backoff logic is needed beyond this preventive
throttling.) If the client does exceed a limit due to mis-timing, the server
will return HTTP 429 error and the request will fail, so it is critical to
implement these checks to prevent breaches.

## WebSocket API Rate Limits

Crypto.com provides two WebSocket API endpoints: one for **User API**
(authenticated requests and user-specific subscriptions) and one for **Market
Data** (public market data subscriptions). Rate limiting for WebSockets pertains
to the **rate of messages** sent by the client and the number of subscription
channels, rather than HTTP requests. The client library should enforce the
following for WebSocket connections:

### Private WebSocket (User API) – Authenticated

**Message Rate Limit:** The private “User” WebSocket (used for placing orders
via WS, querying private data, and subscribing to user-specific channels) allows
up to **150 requests per second** per connection. This means the client can send
at most 150 messages (e.g. order placement commands, private queries, or
subscription commands) in any one-second interval on a single user WebSocket
connection. The client should throttle outbound WebSocket messages on this
connection such that the rate of messages does not exceed 150 per second. If the
client has bursts of many messages (e.g. placing many orders at once), it should
queue them and release up to 150 per second.

Additionally, two specific private endpoints (`private/get-trades` and
`private/get-order-history`) have a stricter rate limit when called over
WebSocket: **maximum 5 requests per second**. In other words, even though the
overall WS message rate is 150/sec, calls to retrieve trades or order history
must be further limited to 5 per sec. The client implementation should include a
special throttle for these methods on WebSocket: if the user tries to query
trade history repeatedly via WS, ensure only one such request every 200ms
(5/sec) at most. This aligns with the REST limit for these endpoints (1/sec on
REST), but WS allows up to 5x more throughput for these particular data queries.

**Subscription Limits:** On the user WebSocket, a client can subscribe to
private channels such as `user.order.{instrument_name}`,
`user.trade.{instrument_name}`, `user.balance`, etc. These subscriptions are
tied to the authenticated account. The documentation does not call out a
specific numeric limit to how many user channels can be subscribed concurrently
on one connection, likely because the number of relevant user channels is
naturally bounded by the number of instruments the user is active in. The client
should simply ensure to not send subscribe messages faster than the 150 msg/sec
limit. (Each `subscribe` request counts toward the message rate.) If a user has
a very large number of private subscriptions (for example, listening for order
updates on hundreds of instruments), and if any implicit limit exists, the
server would respond with an error (e.g., `EXCEED_MAX_SUBSCRIPTIONS`). In
practice, hitting a subscription count limit on the user socket is uncommon. The
client can treat the user WS subscription capacity as effectively large enough
for normal use, or handle an `EXCEED_MAX_SUBSCRIPTIONS` error by alerting the
user to reduce subscriptions if it occurs.

### Public WebSocket (Market Data) – Unauthenticated

**Message Rate Limit:** The public “Market Data” WebSocket connection supports
up to **100 requests per second** (messages) per connection. This includes
subscription requests, unsubscription requests, pings, or any other message sent
to the market data stream. The client must not exceed sending 100 messages in
any one-second interval on a given market data WebSocket. In practice, after the
initial burst of subscription messages, the ongoing message rate from client on
a market data socket is usually low (since market data is mostly one-way from
server to client), but this 100/sec limit prevents abuse. The client library
should enforce this by delaying any outbound subscription commands if the 100
msg/sec budget for that second is exhausted.

**Subscription Limits:** To prevent overload, Crypto.com imposes a limit on the
number of market data channels that can be subscribed on a single WebSocket
connection. A single market data WS connection is limited to a **maximum of 400
active subscriptions** (channels). If the client tries to subscribe to more than
400 topics on one connection, the server will reject the additional
subscriptions with an `EXCEED_MAX_SUBSCRIPTIONS` error code. The client library
should keep track of how many market data channels it has subscribed to on each
connection. If the user attempts to subscribe to a new topic and the connection
is already at 400 subscriptions, the client should **not** send the subscribe
request on that connection. Instead, the specification recommends opening a new
WebSocket connection to handle additional subscriptions beyond the 400-channel
cap. The client library can automate this: e.g., maintain an array of
connections and their subscription counts, and if a new subscription would
exceed 400 on the first connection, start a second connection (and so on). Each
connection then has its own separate 100 msg/sec send limit and up to 400
subscriptions.

All subscriptions should be handled in accordance with server responses. Upon
sending a `"method": "subscribe"` message with a list of channels, the client
will receive an initial confirmation response. The library should interpret an
error code in that response (such as `EXCEED_MAX_SUBSCRIPTIONS`) as a signal to
try a new connection or to refuse additional subscriptions. In normal operation,
the client should also be prepared to maintain the subscription (receiving
heartbeat and data messages) but that is outside the scope of rate limiting.

**Note on WebSocket Timing:** Crypto.com’s WebSocket rate limits are measured on
a **per-calendar-second** basis and are **pro-rated for partial seconds**
depending on when the connection was opened. For example, if a market data
connection is opened at 12:00:00.500 (halfway through a second), the allowable
message count for the first half-second might be reduced (since 100/sec
pro-rated to 50 messages for the remaining 0.5s). To avoid inadvertently hitting
a rate limit immediately upon connect, it is recommended to wait \~1 full second
after establishing a WebSocket connection before sending any requests. The
client library can implement a brief delay (1s) after the socket connect event
before sending the first subscribe batch, ensuring the rate counter starts fresh
at the top of the next second. This practice will minimize the chance of
receiving a `TOO_MANY_REQUESTS` error right after connecting due to the
pro-rated initial second.

## Tier-Based Rate Limits (VIP Users)

Crypto.com offers a VIP program for high-volume traders, which includes
**increased API rate limits** as one of the benefits. Higher VIP tiers
(determined by 30-day trading volume or other criteria) may be granted higher
request thresholds for REST and WebSocket APIs than the default limits listed
above. _For example, a VIP user might be allowed more than 100 requests/sec on
public endpoints or a higher burst of private calls, although Crypto.com’s
public documentation does not specify exact numbers._ The client library should
be designed to accommodate these tier-based differences:

- **Default vs VIP Limits:** By default, the library should enforce the standard
  limits for all users. However, if it is known that an API key belongs to a VIP
  tier that permits higher throughput, the library should allow configuration of
  the rate limit parameters accordingly. This could be as simple as a
  configuration flag or profile that sets higher caps (the exact values might be
  provided privately to the VIP user by Crypto.com). For instance, a VIP might
  be allowed 200 requests/sec on `public/get-book` instead of 100 – the client
  should make it easy to adjust the limit for that endpoint when initializing
  the API client for a VIP account.
- **Enforcement for VIP:** The enforcement mechanism remains the same (counters,
  delays, etc.), but with adjusted thresholds. The client should keep the logic
  flexible: e.g., store the limits in a configurable data structure keyed by
  endpoint name and user tier. This way, if a user is upgraded to a higher tier,
  the library can simply load a new set of limits. All other behaviors (per IP
  vs per key scoping, etc.) still apply for VIP – the difference is just the
  numeric threshold.
- **Discovering VIP Status:** The spec assumes the user of the client library
  will indicate their tier or use a provided configuration for VIP limits, since
  the API’s responses themselves do not announce “you are VIP X”. The client
  could expose an option like `client.setTierLevel(level)` or accept an explicit
  override of certain limits. Documentation for the client library should
  clarify that if the user has higher rate limits from Crypto.com, they should
  update the config to match, otherwise the library will throttle to the default
  rates.

It’s important to note that as of the latest official info, Crypto.com’s help
center indicated no custom limits per user by default and a hard cap (e.g. “10
calls per URL per second” in an older FAQ) for all. However, with the VIP
program revamp, the **expectation is that VIPs can surpass the normal limits**.
Because these higher limits are **“subject to change”** and not fully public,
the client should not hard-code them beyond what is documented. Instead, **make
them configurable**. In any case, the library must never exceed whatever limit
is in effect for the account. If a VIP user configures the library with higher
thresholds, the same preventative logic applies to those new thresholds.

## Summary by Category

For clarity, the following table summarizes the rate limit rules by API type and
scope:

- **Public REST (per IP):** 100 requests/sec for each market data endpoint
  (book, ticker, trades, etc.).
- **Private REST (per API key/account):**

  - Order-related: 15 requests/100ms each for create/cancel orders.
  - Order detail: 30 requests/100ms.
  - Trade history & Order history: 1 request/sec each.
  - Other private endpoints: 3 requests/100ms.
  - Staking endpoints: 50 requests/sec.

- **WebSocket User (private, per connection):** 150 messages/sec; plus max 5
  req/sec for trade/history queries on WS. (No fixed subscription count limit
  documented, but practical use is limited to relevant user channels.)
- **WebSocket Market (public, per connection):** 100 messages/sec; up to 400
  subscriptions per connection (additional subscriptions require new
  connection).

All limits are **non-cumulative across dimensions** – meaning the public
IP-based counts and private key-based counts are separate, and WebSocket limits
apply per connection independently of REST. The client library should implement
**independent counters/throttlers** for each category. For example, hitting 100
req/sec on a public REST endpoint does not affect the private API limit
counters, and sending 100 messages on a WebSocket does not count against REST
limits. Each set of limits must be enforced in its context.

Finally, the client should aim for **graceful compliance**: drop or delay
outgoing requests that would violate the limits, log or notify when throttling
occurs (for debugging), and ensure the user’s actions are queued rather than
lost. By following this specification, the API client will operate within
Crypto.com’s rate limits for all product types and avoid triggering
`TOO_MANY_REQUESTS` errors or being temporarily blacklisted for excess calls.
This ensures robust and efficient usage of the Crypto.com API while respecting
the platform’s constraints.

**Sources:** Crypto.com Exchange API official documentation (REST/WebSocket);
Crypto.com Help Center and VIP program information.
