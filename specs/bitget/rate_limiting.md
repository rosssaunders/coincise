# Bitget API Rate Limiting Specification

## Overview of Rate Limits for Bitget REST API

Bitget’s REST API enforces both **per-endpoint rate limits** and a global cap
per IP address. Each REST endpoint has its own allowed request frequency
(usually defined as X requests per second), and these are tracked independently
for that endpoint. In parallel, there is an **overall rate limit of 6000
requests per minute per IP** (approximately 100 requests/sec) across all
endpoints. This means the client must ensure no single endpoint’s limit is
exceeded and also throttle aggregate traffic to avoid breaching the global
**6000/IP/minute** cap. Bitget’s HTTP responses include an
`x-mbx-used-remain-limit` header indicating the remaining request capacity in
the current second, which can be used to monitor usage.

**IP-Based vs Account-Based Limits:** Public (unauthenticated) endpoints are
typically limited on a per-IP basis, since they don’t require a user context.
Private (authenticated) endpoints are generally limited per user account (often
referred to by user ID or UID). All API keys under the same account share the
same user-level rate pool – creating multiple API keys does _not_ increase the
limit. Sub-accounts have their own UIDs and thus their own separate rate limits
equal to a main account’s limits. In other words, each account (UID) has its own
quota. The rate limits are **not** tiered by account level or trading volume –
Bitget applies the same baseline limits to all users, including VIP tiers. (If
higher limits are required for special cases, one must arrange this with
Bitget’s team on a case-by-case basis.) An exception is that certain
_copy-trading leader_ accounts (designated “traders” in Bitget’s copy trading
system) have more restrictive limits on order placement (detailed below).

## REST API Rate Limits by Endpoint Category

**Public Endpoints (Market Data & Other Public Info):** Public REST endpoints
(accessible without API key) are rate-limited per IP. Most market data endpoints
allow a fairly high rate, typically on the order of 20 requests per second per
IP. For example, fetching a single symbol’s ticker data is limited to **20
req/sec/IP**. Some heavier public endpoints (especially those returning large
lists of data) have lower limits – e.g. retrieving the list of all
coins/currencies has a limit of **3 requests per second per IP**. Each public
endpoint’s specific limit is documented; for instance, getting all trading pairs
(symbols) is 20/sec/IP, and other market queries like order book depth or recent
trades are often 20/sec/IP as well. These limits mean if the client sends more
than the allowed number of requests to a given public API within one second from
one IP, further requests will be rejected/throttled. The client should track
requests to each public endpoint and not exceed its posted rate.

**Private Endpoints (Account- or Trade-Related):** Authenticated endpoints
(requiring API key and secret) have rate limits that apply per user account
(UID). The limits are generally slightly lower than public endpoints to prevent
abuse of trading actions. Key private endpoint limits include:

- _Order Placement (Spot and Futures)_: **10 orders per second per user**. This
  applies to creating new orders (e.g. `/api/spot/v1/trade/orders` for spot, or
  `/api/v2/mix/order/place-order` for futures). If the same user tries to place
  more than 10 orders within one second, the 11th request will violate the
  limit. Notably, if the account is a **copy-trading leader (“Trader”
  account)**, a stricter rate applies: **1 order per second per user** for such
  accounts. (This special “Trader Rate Limit” is to protect copy-trade followers
  from rapid bursts of orders by lead traders.)

- _Batch Order Placement_: **5 batch orders per second per user** for endpoints
  that submit multiple orders in one call. (Copy-trade leader accounts again
  have a 1/sec limit here.) For example, the spot API
  `/api/spot/v1/trade/batch-orders` and the futures API
  `/api/v2/mix/order/batch-place-order` each allow up to 5 batch requests per
  second per account. Each batch request can contain multiple orders, but the
  API may also impose an internal cap on how many orders per batch (e.g. if
  documented elsewhere), which the client should respect.

- _Order Cancellation_: **10 cancel requests per second per user** for canceling
  orders. This covers single-order cancel endpoints (spot
  `/api/spot/v1/trade/cancel-order` and analogous futures endpoint) as well as
  batch-cancel endpoints. The limit means an account can send up to 10
  cancellation commands per second. (If using batch-cancel that affects multiple
  orders in one call, that still counts as one request toward this rate limit.)

- _Querying Orders and Trades_: Higher throughput is allowed for purely read
  requests on private data. For instance, querying open orders, order history,
  or trade fills can be up to **20 requests per second per user**. Endpoints
  like `/api/spot/v1/trade/open-orders`, `/api/spot/v1/trade/history` or their
  futures equivalents (`/api/v2/mix/order/history`, etc.) typically have 20/sec
  per UID limits. Similarly, retrieving account balance or account asset
  information is often around **10–20 req/sec per user** (e.g. spot account
  asset query is 10/sec). These read-only endpoints have generous rates but
  still must be throttled if an application is polling intensively.

- _Wallet Transfers_: For moving funds between accounts (internal transfer
  endpoints), the rate is lower. Bitget allows about **5 transfer requests per
  second per user** for main account transfers. For example, the
  `/api/spot/v1/wallet/transfer` (and its v2) endpoint is 5/sec per UID.
  Transfers involving sub-accounts (`/api/spot/v1/wallet/subTransfer`) are
  restricted to **2 per second per user**, since these are sensitive operations.
  The client should queue or delay any rapid series of transfer calls beyond
  these rates.

- _Withdrawals_: Withdrawal endpoints (to withdraw crypto to an external
  address) are also tightly limited and require additional security. While the
  **withdrawal history query** (e.g. `/api/spot/v1/wallet/withdrawal-list`) can
  be called up to **20 times/sec per user**, the action of submitting a
  withdrawal likely has a low rate limit (often a few per second or minute) to
  prevent abuse. Bitget’s documentation notes that API keys must have a
  whitelisted IP to perform withdrawals, and though an exact number is not given
  in the snippet, it’s safe to assume a **very low tolerance for withdrawal
  frequency** (e.g. 1-2 requests per second, or perhaps a small number per
  minute). The client should treat withdrawal requests cautiously: do not
  automate large bursts of withdrawals. After any withdrawal request, it may be
  prudent to pause briefly before the next. (The exact limit can be checked in
  official docs; if not stated, staying well under the global limit is advised.)

**Spot vs Futures Differences:** Bitget’s spot and futures APIs are distinct but
follow similar rate limiting patterns. The numeric limits for comparable actions
(placing orders, fetching market data, etc.) are generally the same between spot
and futures. Futures API endpoints use the same 10/sec per UID for orders and
20/sec per IP for most market data, etc. There may be slight differences on
certain endpoints (for example, futures market endpoints might all be 20/sec/IP
while spot had one case of 3/sec for currencies as noted). Always refer to the
official endpoint documentation for the exact figure. In implementing a client
library, it’s reasonable to use a common throttle configuration for both spot
and futures categories where the limits coincide, but keep the flexibility to
adjust if any endpoint deviates.

## WebSocket API Rate Limits and Rules

Bitget’s WebSocket APIs have their own set of limits to manage connection usage
and message throughput. A robust client library must enforce these to maintain
stable connections:

- **Connection Rate Limit:** Clients may attempt at most **300 WebSocket
  connection handshakes per IP per 5 minutes**. Additionally, an IP can have a
  maximum of **100 active WebSocket connections** open at any given time. These
  limits are IP-based. The client should avoid rapid reconnect loops or opening
  too many parallel sockets. If you run multiple client instances on the same
  IP, collectively they shouldn’t exceed 100 connections or the 300/5min
  reconnection rate. Implement backoff or pooling of connections if needed.

- **Subscription Limit:** Each WebSocket connection can handle a certain amount
  of channel subscriptions. Bitget allows up to **240 subscription requests per
  hour per connection**. This count includes both subscribing and unsubscribing
  actions. Moreover, a single connection can subscribe to a maximum of **1000
  channels** total (e.g. 1000 market feeds). The client should batch or pace
  subscription messages so as not to exceed 240 in an hour (which averages to 4
  per minute). If an application needs to subscribe to more than 1000 channels
  or at a higher rate, it should open multiple connections (staying within the
  connection limits above). It’s also wise to track how many subs have been sent
  in the past hour on a connection to avoid hitting the 240/hour cap. In
  practice, Bitget **recommends using no more than 50 subscriptions per
  connection for stability** – even though 1000 is allowed, keeping it lower can
  lead to more reliable data flow. A client may choose to enforce a conservative
  limit (e.g. 50 per socket) unless the user explicitly overrides.

- **Message Rate Limit:** A WebSocket connection will accept a maximum of **10
  messages per second**. This includes all types of messages sent by the client:
  subscription commands, unsubscription commands, pings (heartbeat messages), or
  any other requests. If the client sends more than 10 messages in one second on
  a connection, the server will **disconnect the socket** for rate abuse.
  Therefore, the client library should pace outgoing messages. For example, if
  you need to subscribe to 30 channels, do not send 30 subscribe messages all at
  once; send them in batches or spaced such that no more than 10 messages are
  sent in any one-second interval. A simple token bucket of 10 messages/sec per
  connection is recommended. Also ensure any automated ping keep-alives are
  accounted for in this limit – e.g. if you send 1 ping every 30 seconds, that
  typically won’t interfere, but avoid sending pings too frequently.

- **Heartbeat and Disconnection Rules:** The server expects periodic pings to
  know the client is alive. Bitget will **disconnect a WebSocket if no ping is
  received for 2 minutes**. They suggest the client send a `"ping"` every 30
  seconds and expect a `"pong"` in response. The client library should implement
  a scheduler to send pings (and perhaps monitor the latency of the pong). If a
  pong is not received in a timely manner (e.g. within a few seconds), the
  client should assume the connection is stale and reconnect. Additionally,
  Bitget will **forcibly disconnect every WebSocket connection once every 24
  hours**. The client must handle this by automatically reconnecting and
  re-subscribing when a day-long connection is closed. This 24h reset is a
  standard maintenance behavior; the library can log it and proceed with
  reconnection logic (ensuring not to exceed the connection rate limits when
  doing so).

- **Subscription Strategies:** Given the above limits, a recommended practice is
  to spread subscriptions across multiple connections if a user needs a very
  large number of channels. For example, if 2000 channels are required, use at
  least 2 connections with \~1000 each (or better, 4 connections with 500 each,
  to stay well under the 1000 cap and closer to the recommended 50 per
  connection for stability). The client library could abstract this by providing
  a subscription manager that automatically opens new connections as needed when
  the channel count grows, and distributes the channels, all while keeping each
  connection within safe limits.

## Handling Burst Traffic vs Sustained Usage

A good rate-limiting implementation in the client should accommodate short
bursts of activity while maintaining the sustained request rate within Bitget’s
limits. Here are guidelines for the client library’s design:

- **Token Bucket Algorithm:** Implement a token bucket or leaky bucket mechanism
  for each relevant limit. For example, for an endpoint that allows 20 req/sec,
  you can replenish up to 20 tokens per second (per IP or per user as
  appropriate) and allow bursts up to that bucket size. This allows short bursts
  (e.g. 20 quick calls) but then empties the bucket, preventing more calls until
  it refills. Similarly, maintain a bucket for the global 6000/min (which is
  100/sec on average). A practical approach is a rolling window or bucket for
  100 requests per second (global) in addition to per-endpoint buckets. If the
  global bucket is exhausted, pause new requests even if individual endpoint
  buckets have capacity. This dual-throttling ensures no breach of either
  constraint.

- **Queued Scheduling:** If the client application issues a high volume of
  calls, the library should queue them and release them at a safe rate. For
  instance, if an application calls a certain REST method in a tight loop, the
  library intercepts and spaces out the requests. Ensure that the spacing logic
  covers both small-scale (per-second) and larger-scale (per-minute) bursts. If
  5000 requests are enqueued at once for a single IP, the library could execute
  them at \~100 per second so as to finish in about 50 seconds, respecting the
  6000/min limit continuously. It might even incorporate a short cool-off if
  nearing the minute boundary.

- **Cumulative Limit Monitoring:** For sustained usage, it’s important to avoid
  hitting the 6000/minute ceiling. The library can maintain a rolling count of
  requests over the last 60 seconds. If it approaches 6000 in less than a
  minute, the library should delay further requests until that window passes.
  For example, if 6000 requests were sent in the first 50 seconds of a minute,
  then for the remaining 10 seconds no further requests should be sent. However,
  given each endpoint’s own limits, it’s unlikely to hit 6000/min unless many
  endpoints are used in parallel at high rates – but the client should guard
  against that scenario if, say, a user subscribes to multiple data feeds and
  also runs high-frequency trading logic concurrently.

- **Backoff on Limit Errors:** If the API returns a rate-limit error (e.g. HTTP
  429 or a specific error code), the client should trigger an automatic backoff.
  This could mean pausing all requests for a brief period (perhaps 1-2 seconds)
  to allow counters to reset, and then resuming at a reduced rate. The client
  can also log a warning or notify the user that a rate limit was hit. Repeated
  hitting of limits is undesirable – if the library finds itself frequently
  backing off, it indicates the configuration might need adjusting (for example,
  the user might need to slow down certain polling frequency).

- **Utilize Response Headers:** As mentioned, Bitget provides a header
  `x-mbx-used-remain-limit` with each response that indicates the remaining
  number of requests allowed in the current second. The client library can use
  this as an additional signal. For instance, if the header shows only 2
  requests remaining, the library knows to hold off any further immediate calls
  until the next second. This dynamic feedback can complement the client’s own
  counters, especially in multi-threaded scenarios or if multiple client
  instances share an IP. It’s an optional enhancement, but leveraging it can
  make the rate limiter more adaptive.

- **WebSocket Burst Handling:** For WebSocket, similar burst handling applies to
  outgoing messages. The library should never dump a large batch of subscription
  messages in the same instant. If a user subscribes to 100 channels at once,
  loop through them and send, say, 5–10 subscribe messages per second (well
  under the 10 msg/sec cap) until all are sent, rather than sending all 100
  immediately. This ensures the 10 msg/sec limit is not violated. If the library
  provides a high-level method like `subscribeAll([...])`, it should internally
  chunk these. Also, if the user does need frequent subscribe/unsubscribe
  actions (perhaps dynamic channel management), keep track to not exceed 240 per
  hour on a connection – e.g. if 240 subs have already been sent in the last
  hour, queue any further until the hour window clears or reuse another
  connection if available.

## Variations by User Tier or Volume

Bitget’s published rate limits are **uniform across all standard users** – they
do not have different official rate tiers based on trading volume or account VIP
level. A user with high trading volume has the same base API limits as a new
user (the VIP level primarily affects fees, not API calls). The specification
above should be applied regardless of user tier. The only known user-based
variation is for **copy-trading roles**: if an account is acting as a
**copy-trade master (lead trader)**, the API will enforce the stricter order
rate (1 order/sec) on that account. The client could potentially detect this
(there is an API to get account info which includes a field indicating if the
user is a “trader” in the copy context) and adjust accordingly. However, it’s
also safe to simply honor the lowest common rate (1/sec for orders) if the
library cannot easily distinguish, since that will work for all users.

Aside from that case, **no automatic adjustment is needed for different tiers**,
since Bitget’s limits are the same for everyone by default. If Bitget introduces
tier-based limits or grants custom higher limits to specific API keys (e.g.
institutional customers), those would be exceptions not documented publicly. In
implementing the library, you can provide configuration hooks (for example,
allow the global 6000/min to be overridden if Bitget communicates a higher limit
for a particular API key). But by default, assume the documented limits apply
equally to all users. Always keep an eye on Bitget’s official announcements or
documentation updates for any changes in rate limiting policy.

## Summary of Key Rate Limit Values (for Reference)

- **Global REST limit:** 6000 requests per minute per IP (aggregate).
- **Public REST endpoints:** typically 20 req/sec/IP (e.g. tickers, trades);
  some endpoints lower (3 req/sec/IP for all-currencies list).
- **Private REST endpoints (per user):**

  - Order placement – 10 req/sec/UID (1 sec/UID for copy-trade leader).
  - Batch orders – 5 req/sec/UID (1 sec/UID for copy-trade leader).
  - Order cancel – \~10 req/sec/UID.
  - Fetch orders/trades – \~20 req/sec/UID.
  - Asset transfers – \~5 req/sec/UID (2/sec for sub-account transfers).
  - Withdraw requests – (Not explicitly given, but expect low, e.g. \~1-2/sec,
    with IP whitelist required).

- **WebSocket connections:** Max 300 connect attempts per 5min/IP; up to 100
  simultaneous connections/IP.
- **WebSocket subscriptions:** Max 240 subscribe/unsubscribe messages per hour
  per connection; up to 1000 subscriptions per connection.
- **WebSocket message rate:** 10 messages per second per connection (includes
  pings).
- **WebSocket heartbeat:** Send ping at least every 2min (recommended 30s) or
  connection will be closed; server will drop connection after 24h (plan
  reconnection).

By adhering to the above specification, an API client library will remain well
within Bitget’s limits for both REST and WebSocket interfaces. The library
should enforce these rules transparently, preventing the application from
accidentally overloading the API, and thereby avoiding bans or dropped
connections. All numeric limits provided are based on Bitget’s official
documentation and should be kept up to date by checking Bitget’s API docs for
any changes.
