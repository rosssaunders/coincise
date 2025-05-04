# MEXC API Client Rate Limiting Specification

## REST API Rate Limits

- **Rate limit units (IP vs Account)**: MEXC applies different rate-limiting
  units depending on the endpoint. Public REST endpoints (those that do not
  require an API key) are limited per **IP address**, whereas private endpoints
  (those requiring API key authentication) are limited per **user account
  (UID)**. These two categories are tracked independently – hitting a limit on
  an IP-limited endpoint does not count against account-limited endpoints, and
  vice versa.

- **Weight-based request limits**: Each REST API endpoint is assigned a
  **weight** value, and each has its own maximum call rate. By default, any
  given endpoint can be called up to **500 weight units per 10 seconds** (per IP
  or per account, as appropriate). For example, an endpoint with weight 1 (such
  as the spot `GET /api/v3/depth` order book query) can be called 500 times in a
  10-second window, whereas an endpoint with weight 5 (e.g. `GET /api/v3/trades`
  for recent trades) can only be called 100 times in 10 seconds since 100 calls
  × 5 weight = 500. The client library should sum the weights of requests to
  each endpoint and ensure the total does not exceed 500 in any rolling
  10-second window. If the limit is exceeded, the server will return HTTP **429
  Too Many Requests**.

- **Spot API order placement**: The spot trading API has a stricter limit on
  order creation. Official documentation indicates placing a new order carries
  weight 1 for both IP and UID counters. Previously, MEXC allowed **batch
  order** placement (up to 20 orders in one call) at a rate of 2 calls per
  second (meaning up to 40 orders/sec). However, as of March 25, 2025, MEXC has
  **reduced the order placement limit to 5 orders per second** per account. This
  5 orders/sec cap applies globally to all order requests, including those sent
  in batches. The client library should enforce this by counting individual
  orders: e.g. two batch requests of 3 orders each within one second would total
  6 orders and violate the limit. In practice, this means an account cannot
  place more than 5 new orders (across all symbols) in any one-second period
  without being throttled.

- **Futures API (contract) limits**: MEXC’s futures (contract) API has similar
  rate limiting, though documented in fixed terms per endpoint. Many futures API
  endpoints allow **20 requests per 2 seconds** (\~10 requests/sec). For
  instance, public market data endpoints like contract depth, trades, etc.,
  typically share this 20/2s limit. Some endpoints, especially those returning
  large datasets, have more restrictive limits – for example, querying all
  contract information is limited to **1 request per 5 seconds**. The futures
  API docs do not explicitly differentiate IP vs account limits, but it’s safe
  to assume public futures endpoints are IP-limited and private futures
  endpoints are account-limited in a similar fashion. The client should respect
  the published limit for each endpoint and not exceed the allowed call
  frequency. If the documentation does not specify a limit for a futures
  endpoint, assume the default (20 calls/2s) and err on the side of caution.

- **Enforcement mechanism**: The client library must throttle requests to obey
  these limits. A common enforcement strategy is using a token bucket or leaky
  bucket algorithm to pace the requests. For example, assign each endpoint its
  own bucket that refills at the allowed rate (e.g. 50 tokens per second for an
  endpoint with 500/10s limit) and deduct tokens equal to the request weight
  each time. If the bucket is empty, the request should wait. In simpler terms,
  the library can track the timestamp and count of recent requests for each
  endpoint and delay any request that would exceed the per-window maximum. This
  ensures that neither the IP-based nor account-based limits are violated. The
  implementation should also prevent accidental bursts – e.g. if 500 weight
  worth of requests are sent in the first second of the window, the library
  should pause subsequent requests until the 10-second window has elapsed or
  tokens regenerate, rather than allowing a burst that triggers a 429 error.

## WebSocket Rate Limits

- **Message send rate**: MEXC’s WebSocket API imposes a limit on the outbound
  message rate. A client may send up to **100 messages per second** on a single
  WebSocket connection. This includes all types of messages sent to the server –
  for example, subscription requests, unsubscription messages, pings, order
  placement commands (if using WebSocket for trading), etc. Exceeding this rate
  will result in the server **disconnecting the WebSocket connection**. If a
  connection is repeatedly disconnected for hitting the rate limit, the exchange
  may temporarily ban the IP for WebSocket access as well. The client should
  therefore throttle outgoing messages to avoid hitting 100 msg/s. In practice,
  100 msg/s is a high threshold, so this mainly becomes a concern if the client
  tries to subscribe to many streams or send a burst of orders all at once.

- **Subscription limits**: Each WebSocket connection supports a maximum of **30
  subscriptions (streams/topics)**. According to MEXC, any subscriptions beyond
  **30 channels per connection** will be ignored or refused. In other words,
  once 30 market data channels (or other topics) are subscribed on one socket,
  the client cannot add a 31st on that same connection. The recommended approach
  is to open multiple WebSocket connections if an application needs to monitor
  more than 30 streams concurrently. For example, if a user needs 60 different
  market data feeds, the client library could manage 2 connections with 30
  subscriptions each. The rate limit of 100 msg/s applies per connection, so
  distributing subscriptions across connections can also distribute the message
  load.

- **Throttling strategy**: The client library should implement a
  queuing/throttling mechanism for outbound WebSocket messages. For instance, if
  the application code rapidly sends 200 subscription requests at startup, the
  library could enqueue them and dispatch, say, 100 in the first second and 100
  in the next, rather than sending all 200 immediately. A simple leaky bucket
  that releases messages at a steady rate (e.g. 100 msgs/s or slightly below)
  can ensure the 100/sec limit is never exceeded. Similarly, ping messages (if
  the client sends its own heartbeats) should be at a reasonable interval (and
  they count toward the limit). In general, the library should never flood the
  WebSocket with messages faster than allowed – if the application tries to, the
  library must buffer or drop excess messages.

- **Automating channel management**: Because of the 30-channel per connection
  cap, the library might provide utilities to manage multiple connections
  transparently. For example, a high-level subscribe function could
  automatically allocate subscriptions to different connections under the hood
  once one connection has 30 subscriptions. If the library does not handle this
  automatically, it should at least clearly document the limitation and possibly
  throw an error or warning when a user attempts too many subscriptions on one
  socket. This prevents users from unknowingly exceeding the limit.

- **Keep-alive and idle timeouts**: (While not a rate limit, this is relevant to
  WebSocket usage.) MEXC will disconnect a WebSocket **if no subscription is
  made within 30 seconds** of connecting, or **if a subscribed connection sees
  no traffic for 60 seconds**. The server sends periodic `ping` frames to which
  the client must respond with `pong`. The client library should be prepared to
  handle these ping/pong messages to keep the connection alive. Ensuring a
  timely `PONG` response (or sending a heartbeat if needed) at least every 60
  seconds will prevent the connection from being dropped due to inactivity.
  These heartbeat messages are low-frequency and well within the 100 msg/s
  limit, but they are essential for maintaining the connection. If the
  connection is closed (whether due to idle timeout or rate-limit disconnect),
  the client should log the event and attempt to reconnect with appropriate
  backoff (discussed below).

## Rate Tiering

- **Uniform limits vs VIP tiers**: Based on the official documentation, MEXC
  does **not advertise any tier-based differences in API rate limits**. The
  limits appear to be the same for all API users, regardless of account VIP
  level or trading volume. Each account or IP is subject to the standard limits
  (as described above) by default. Unlike fee rates, which MEXC tiers based on
  VIP level, there is no indication that higher-tier accounts get higher request
  quotas. This means a regular user and a VIP user are both limited to, for
  example, 500 weight/10s and 5 orders/s on the spot API.

- **Sub-accounts**: MEXC allows sub-accounts, but sub-accounts do not increase
  your overall rate capacity. According to MEXC, sub-accounts inherit the main
  account’s “rates”. This likely refers to fee rates, but in practice it also
  means sub-accounts don’t provide extra API call allowances. If you have
  multiple API keys (main and subs), the rate limits apply to each account
  separately. The client library should treat each API key independently in
  terms of account-level limits. (Note: IP limits would still apply across all
  requests coming from the same IP if they are for public endpoints.)

- **Custom arrangements**: If MEXC offers any special rate limit increases for
  institutional users or via arrangement (e.g. an API **whitelist** or higher
  limits for certain partners), this is not documented in the public API docs.
  In absence of explicit info, assume the **global default limits apply to
  everyone**. The specification here should be built for those defaults. If a
  user of the client library has negotiated higher limits with the exchange, the
  library should allow configuration of custom limits (see **Configurability**
  in Implementation Hints), but it should not rely on any such differences by
  default.

- **VIP-related caution**: Because no higher rate tiers are documented, any
  attempt to push the limits (e.g. thinking a high-volume account might have
  leniency) can result in the same 429 errors or bans as for any other user. The
  safest approach is to honor the documented constraints universally. If MEXC
  updates its policy in the future to introduce tier-based rate limits, the
  client library maintainers should update the configuration accordingly at that
  time.

## Retry and Backoff

- **HTTP 429 handling**: When the client hits a rate limit, MEXC will return an
  HTTP **429 Too Many Requests** error. The response will include a
  `Retry-After` header indicating how many seconds to wait before retrying. The
  client library should detect 429 responses and **halt further requests** to
  the affected scope until the retry-after duration has passed. This means if a
  single endpoint returns 429, it’s wise to stop calls to that endpoint (and
  possibly others in the same category) temporarily. The library should not
  simply immediately retry a 429’ed request – doing so will likely result in
  another 429 and could escalate to an IP ban.

- **Exponential backoff**: Implement an **exponential backoff** strategy for
  retries after a rate limit error. For example, if no `Retry-After` is provided
  (in some cases of 429 it should be, but if not), wait at least e.g. 1 second,
  then if another 429 occurs, wait 2 seconds, then 4, and so on. Incorporate a
  bit of **jitter** (randomized delay) to avoid synchronization if multiple
  clients are retrying at the same intervals. Because the documented window is
  10 seconds, a safe approach after a 429 is to wait a full 10 seconds before
  the next attempt to ensure the window has cleared. The library might even
  choose to back off the entire account’s activity briefly, since a 429 is a
  strong signal to slow down. Backoff and retry should be done transparently if
  possible – i.e. the library can catch the 429 and automatically retry after
  the delay, unless the user has disabled automatic retries.

- **Ban avoidance**: Repeatedly hitting the rate limits without backing off can
  trigger an **automated IP ban** on MEXC. The ban durations increase with
  repeated offenses (e.g. an IP might be banned for 2 minutes, and longer for
  subsequent violations, up to 3 days). If the client receives an HTTP **418**
  response, that likely indicates a temporary ban (similar to some exchanges
  using HTTP 418 as a “banned” code). In that case, the `Retry-After` header
  will tell how long the ban lasts, and the client should not make further
  requests until that time has elapsed. The library should surface this
  condition clearly (perhaps throwing a specific exception or error message
  indicating the IP or key is banned) so the user knows to stop API calls. In
  general, **any 429 or 418** must be taken seriously by the client – the
  correct response is to **stop or slow down requests**. The library should
  never spam retries on a 429/418, as that will only prolong the ban.

- **WebSocket reconnect backoff**: In the WebSocket context, if the connection
  is dropped by the server (which could happen if the 100 msg/s limit was
  exceeded or due to other network issues), the client should also employ a
  reconnect backoff strategy. Immediately reconnecting after a rate-related
  disconnect might lead to another immediate disconnect if the cause hasn’t been
  resolved (for instance, if the client tries to resend all subscriptions
  instantly). The library should wait a short period (e.g. a few seconds) before
  reconnecting, and use exponential backoff for subsequent reconnect attempts if
  the disconnects persist. When reconnecting, it’s wise to re-subscribe in a
  throttled manner (not sending 30 subscriptions in one burst if that was what
  caused the initial issue). The library can stagger re-subscriptions to avoid a
  flood of messages upon reconnection.

- **Handling server hints**: The client should make use of any hints the server
  provides. For REST, this is the `Retry-After` header on 429/418. For
  WebSocket, the server might not provide explicit warnings before disconnecting
  (other than maybe a websocket closing reason code, if any). Therefore, the
  onus is on the client to monitor its message rates. Logging is useful here: if
  the library internally throttles or drops messages to stay within limits, it
  should log warnings so the developer knows their application tried to exceed a
  limit. Similarly, after a disconnect, logging the reason or an informative
  message (like “WebSocket connection closed by server, possibly due to rate
  limit”) can help with debugging and adjusting the strategy.

- **HTTP 403 (WAF limits)**: MEXC notes that an HTTP **403 Forbidden** may be
  returned if the request violates the Web Application Firewall rules. This can
  happen if requests are made in an unusual pattern or volume that the WAF deems
  suspicious (even if not strictly hitting the 429 rate limit). If the client
  gets a 403, it should treat it similarly to a rate limit error: slow down and
  review the request pattern. A 403 might require a longer cool-down or even
  manual intervention (since it’s not a typical response for just rate limit –
  it could indicate the IP is temporarily blocked by firewall). The client could
  pause further requests and alert the user to check their API usage or contact
  MEXC support if 403 persists. In summary, any 4XX response from the API
  related to rate or access should trigger the client to back off and not hammer
  the endpoint.

## Implementation Hints

- **General strategy – token buckets**: A robust way to implement rate limiting
  in a client-agnostic manner is to use a **token bucket** or **leaky bucket**
  algorithm for each constraint. For MEXC, you would configure one token bucket
  per endpoint (since each has its own limit). For example, for an endpoint that
  allows 500 weight units per 10 seconds, initialize a bucket with capacity 500
  tokens and a refill rate of 50 tokens per second. Each API call to that
  endpoint consumes a number of tokens equal to its weight. If tokens are
  available, the call proceeds; if not, the call must wait until enough tokens
  accumulate (or until the 10s window resets). This naturally spreads out
  requests and prevents overflow. Similarly, for WebSocket, you could have a
  token bucket of 100 tokens per second for sending messages on each connection.
  This approach smooths bursts while still allowing the maximum throughput over
  time.

- **Fixed-window counters**: Alternatively, a simpler (though slightly less
  precise) approach is to use fixed-window counters. For instance, the library
  can track the number of calls made to each endpoint in the current 10-second
  interval. If adding a new request would exceed 500, it can delay that request
  until the next interval. This is easier to implement but can lead to slight
  over-shoot at boundaries (e.g. if 500 calls are made at the very end of one
  window and 500 at the very start of the next, the exchange might interpret
  that as 1000 in one rolling window). A sliding window or token bucket avoids
  that edge case. In either case, the implementation should be thread-safe and
  atomic, so that concurrent requests don’t each think there is remaining quota
  and end up overshooting when combined.

- **Combined limits**: Be mindful of limits that span multiple endpoints or
  modes. MEXC mostly uses per-endpoint limits, but the **5 orders/sec** rule is
  an account-level limit across all order placement endpoints. In the client,
  you might have separate functions for placing single orders and batch orders –
  these both ultimately count toward the same 5 orders/sec budget. Implement a
  shared counter for “orders placed this second” and ensure it doesn’t exceed 5.
  This might involve combining the logic for different endpoints (e.g. both the
  single order endpoint and batch order endpoint should inform a common rate
  limiter about orders). Likewise, if MEXC had a global request limit across all
  endpoints (some exchanges do), the client would need a global bucket in
  addition to per-endpoint buckets. MEXC’s docs don’t specify a global
  request-per-second limit aside from the WebSocket message rate, so
  per-endpoint and the special order counter suffice. Just design the system
  such that defining a new global rule is possible if needed.

- **State sharing between REST and WebSocket**: If the client library supports
  both REST and WebSocket, consider any interactions. For example, an order
  placed via WebSocket should probably count against the same 5 orders/sec limit
  as an order placed via REST. If the library offers both methods, it should
  have a unified way to track “orders per second” regardless of transport. This
  could be achieved by having a single OrderRateLimiter that both the REST order
  call and the WS order-sending code use. On the other hand, most other limits
  are separate (REST request counts vs. WebSocket message counts are
  independent). The library can keep the REST rate limiting logic and WS rate
  limiting logic modular and separate, since they operate on different channels.
  Just ensure that where limits overlap in meaning (like order frequency), they
  are not double-counted or overlooked.

- **Pluggability and configuration**: It’s important to allow configuration of
  the rate limiter, since exchanges can change their limits or users might want
  to tweak behavior. The client library could expose settings or a config file
  where the user can adjust values like “maxRequestsPerSecond” or even switch
  the algorithm. At minimum, define the MEXC limits in a single place (for
  example, a data structure mapping endpoint -> limit info, and constants for
  the WS limits) so that if MEXC updates an endpoint’s weight or rate, it can be
  changed easily. A pluggable design might allow selecting a different rate
  limiting strategy (for example, a strict mode that never allows any 429, or a
  passive mode that only reacts when 429 occurs). For multi-exchange client
  libraries, you might have an interface for “ExchangeRateLimitPolicy” and
  provide an implementation for MEXC. This makes it easier to reuse and to adapt
  to future changes. MEXC’s API provides an endpoint
  (`GET /api/v3/exchangeInfo`) that includes a `rateLimits` array, which might
  enumerate some global limits (similar to Binance’s API). The client could
  parse this to adjust its behavior dynamically. However, not all limits (like
  WebSocket or futures) may be included there, so some values may remain
  hard-coded from documentation or announcements.

- **Testing and safety margins**: When implementing the rate limiter, test it
  under heavy load conditions to ensure it correctly throttles. It’s often
  useful to build in a small safety margin below the exact limit. For example,
  you might stop at 490 weight in 10s instead of 500, or at 90 messages/s
  instead of 100, to account for clock skew or minor calculation errors. This
  can be configurable as well (a “compliance margin”). Additionally, monitor the
  outcome: if the exchange never returns any 429s, the limiter is working; if
  429s are still seen, the logic might need adjustment (or the exchange has
  undocumented limits that need to be added). The library could provide debug
  logging that prints whenever it is delaying a request due to rate limiting, so
  developers can see that the limiter is active. This helps in tuning the
  performance – for example, if the application is consistently hitting the rate
  limit and queuing requests, the user might decide to slow down polling or
  reduce subscriptions to stay within bounds.

- **Graceful degradation**: In scenarios where the rate limit is exceeded
  despite the library’s best efforts (perhaps due to multiple instances of the
  client running, or an unforeseen limit), the library should handle the
  429/Disconnect gracefully. This means catching the exception or error and not
  crashing. It could notify the user through a callback or error code that their
  requests are being throttled. For WebSockets, if messages are dropped or
  delayed, the library might choose to drop non-critical messages first (for
  example, maybe drop some ping frequency if it’s over-aggressive, or coalesce
  multiple subscription requests if possible). The goal is to keep the
  application running and connected, albeit at a reduced rate, rather than to
  overwhelm the exchange. By building a comprehensive understanding of MEXC’s
  limits into the client, we ensure robust and compliant API usage, improving
  reliability for the end user.
