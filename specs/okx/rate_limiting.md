# Rate Limiting Implementation Specification for OKX API v5 Client Libraries

## REST API v5 Rate Limiting

Implement the following rate limit rules for all REST (HTTP) endpoints in an OKX
API v5 client library:

- **Public (Unauthenticated) Endpoints – IP-Based Limits:** All public REST
  endpoints (those that do not require API key authentication) are rate-limited
  per IP address. The client library should track requests to public endpoints
  by the caller’s IP and ensure they do not exceed the documented thresholds (as
  defined per endpoint). Each public endpoint may have its own specific limit
  (e.g. requests per second or per minute) and these apply on a per-IP basis.
  The library should aggregate all public calls by IP and throttle if necessary
  to avoid hitting these limits.

- **Private (Authenticated) Endpoints – Account/API Key-Based Limits:**
  Authenticated REST calls are rate-limited per user account. In practice, this
  means all API keys under the same OKX account (or sub-account) share the same
  bucket of allowed requests. The client library should group private requests
  by the user’s **User ID** (which corresponds to the account or sub-account
  associated with the API key) and enforce the limit for that user. Each
  endpoint defines its own allowed request rate, so the library must respect the
  limit _per endpoint_ per user. For example, placing orders, canceling orders,
  retrieving balances, etc., each have distinct limits as specified by OKX
  documentation (often given in requests per 2 seconds). Ensure that the
  implementation treats “account-based” and “API key-based” as equivalent for
  rate limiting purposes (since each API key maps to an account or sub-account).
  Sub-accounts have independent limits from the master account.

- **Per-Endpoint and Instrument-Level Throttling:** The library should enforce
  the specific rate limit of each REST endpoint as documented. OKX specifies a
  different limit for each API endpoint; for instance, a data retrieval endpoint
  might allow fewer calls than an order placement endpoint. Moreover, certain
  trading endpoints have **granular limits by instrument**: For order-related
  APIs (placing, canceling, amending orders), the limit is often defined per
  instrument or instrument family. For example, a single “Place Order” endpoint
  call might be limited to 60 requests per 2 seconds **per instrument ID**,
  whereas batch order placements might allow up to 300 orders per 2 seconds per
  instrument. The client library should maintain counters at the appropriate
  scope (e.g. a separate counter for each `{User ID, Instrument ID}` combination
  for order requests) to correctly throttle these categories. **Note:** Rate
  limits for placing orders, amending orders, and canceling orders are
  **independent** of each other (each category has its own counter).
  Additionally, the REST and WebSocket channels share the same underlying limits
  for trading actions – an order placed via WebSocket counts against the same
  limit as one via REST. Ensure the library’s rate limiter accounts for requests
  across both REST and WebSocket if trading functions are available in both.

- **Batch vs Single Request Handling:** Treat batch order endpoints separately
  from single-order endpoints in the rate limiting logic. OKX assigns
  independent limits for batch order requests (counted in “orders per seconds”)
  vs. single-order requests (counted in “requests per seconds”). For example, a
  batch placement endpoint might allow a higher throughput (e.g. 300 orders/2s)
  in aggregate, distinct from the single order endpoint limit. The library
  should count each individual order within a batch toward the user’s overall
  order count. Importantly, if a batch request contains only one order, OKX will
  count it under the single-order rate limit instead of the batch limit. The
  implementation should reflect this rule – i.e. do not assume you can send one
  order via the batch endpoint to bypass single-endpoint limits. In summary, use
  the documented rate limit rule for each endpoint: e.g. “User ID + Instrument
  ID” for order placement (single or batch) with each order in a batch counted
  individually.

- **Tier-Based Variations (Account Level Differences):** Incorporate logic to
  adjust rate limits based on the user’s account tier or trading volume, as OKX
  applies higher limits for high-tier users. By default, OKX enforces a
  **sub-account level cap** of 1,000 order requests per 2 seconds for all new
  order placements and amendments combined, across all instruments. If a client
  exceeds this aggregate threshold, the exchange will reject requests with an
  error (code 50061) indicating the sub-account rate limit was surpassed. For
  users with higher VIP levels, OKX provides an enhanced rate limit based on
  trading activity: accounts at VIP5 or above with a high order fill ratio may
  be assigned to higher tiers, increasing the sub-account 2-second limit (e.g.
  1,250, 1,500, up to 10,000 orders per 2 seconds for the highest tier). The
  library should not hard-code a single global limit if the account tier is
  known to allow more; instead, it should either detect the allowed limit or
  allow configuration of this value. Specifically, if available, use the OKX
  endpoint for querying account rate limits (e.g. the **Get Account Rate Limit**
  endpoint) to retrieve the current `accRateLimit` for the account. This value
  indicates the total allowed order requests per 2 seconds for that user at the
  moment (and `nextAccRateLimit` provides the next period’s expected limit for
  VIP5+ users). The client library should use this information to dynamically
  set the global order rate cap for the account. If such dynamic querying is not
  possible, document for the user of the library how to configure their
  tier-based limits manually. The key is to ensure that higher-tier users can
  utilize their higher throughput, while still preventing lower-tier accounts
  from exceeding their default 1000/2s cap. The implementation should also
  handle changes in tier – OKX updates the fill-ratio based tier daily (at 08:00
  UTC, with immediate increases or one-day grace on decreases) – meaning the
  library should be prepared to update the limit at runtime (for example, by
  calling the rate limit query periodically or by honoring server-provided
  metadata).

- **Identifying Rate Limit Errors (REST):** The client library must detect when
  the exchange has signaled a rate limit violation. For REST endpoints, OKX
  returns HTTP status **429 Too Many Requests** when the rate limit is exceeded.
  The response body typically contains an error code and message, where the code
  `50011` indicates a general rate limit hit (“Rate limit reached. Please refer
  to API documentation and throttle requests accordingly”). In the case of the
  sub-account 1000/2s cap being exceeded, the error code may be `50061`
  (specifically denoting the sub-account rate limit was hit). The library should
  inspect HTTP responses for status 429 or these error codes in the response
  JSON. Upon detection, it must trigger the appropriate backoff/retry logic (see
  **Error Handling & Resilience** below) instead of treating it as a regular API
  error. The client implementation should **not** continue sending requests on
  that endpoint (or generally for that user) until the rate limit window has
  reset.

- **Retry and Backoff for REST Requests:** As a best practice, integrate an
  exponential backoff strategy for retrying requests that fail due to rate
  limiting. When a 429/“rate limit reached” is encountered, the library should
  **wait** before retrying the request. A reasonable strategy is to use an
  exponential backoff with jitter (e.g. wait 1 second, then 2s, 4s, etc., up to
  a max wait) to avoid a thundering herd of retries. If the HTTP response
  includes a `Retry-After` header (indicating how many seconds to wait), the
  library should honor that duration for the backoff. Although OKX’s
  documentation does not explicitly mention `Retry-After`, the client should be
  designed to use it if present, as this is a standard HTTP 429 practice. Ensure
  that retried requests are safe to repeat (idempotent or not already processed)
  – for example, if a request to place an order was throttled before reaching
  the matching engine, it can be retried, but if it actually succeeded then the
  client must avoid duplicating it. It’s best to design the library to **raise a
  specific exception or error state when the rate limit is hit**, so that
  calling applications can decide whether to retry or drop the request. By
  default, however, the library itself should handle a reasonable number of
  automated retries with backoff to transparently recover from transient rate
  limit hits.

## WebSocket API v5 Rate Limiting

Implement corresponding rate limiting controls for the WebSocket interface of
OKX API v5. The WebSocket API has its own limits for connection and message
rates, which the client library must respect:

- **Connection Rate Limit (IP-Based):** Limit how frequently the client
  initiates new WebSocket connections. OKX allows at most **3 connection
  attempts per second per IP address**. The library should throttle the rate of
  establishing new WebSocket connections to ensure that if, for example, the
  application tries to open many sockets concurrently (for multiple channels or
  data feeds), it does not exceed \~3 handshakes per second from the same
  machine/IP. If the application requests more connections than allowed, the
  library should queue or delay them. Exceeding the connection rate could result
  in connection failures or refusal by the server, so the library must pace
  connection attempts (e.g. if 5 connections are needed, open a few, then wait
  at least 1 second before the next batch, etc.). Additionally, the
  implementation might monitor connection error responses for signs of rate
  limiting (though in practice the 3/sec rule is straightforward to obey
  proactively).

- **Concurrent Connection Limit (Account-Based):** Enforce the limit on how many
  WebSocket connections can be open simultaneously for certain private channels.
  OKX imposes a maximum of **30 concurrent WebSocket connections per specific
  channel per account (user or sub-account)**. This means for each category of
  private subscription (such as the orders channel, account info channel, etc.),
  a given user can have up to 30 active connections. The library should keep a
  count of active sockets per channel and reject or prevent the application from
  creating more if the limit is reached. For example, if the user already has 30
  connections to the “orders” channel, the library should not allow a 31st
  connection to that channel to be established (or should close an older one if
  a rotation strategy is used). OKX will generally reject the newest
  subscription when this limit is breached: the server sends a
  `channel-conn-count-error` event message indicating the channel and connection
  ID that exceeded the limit. The client library should listen for such an
  event. If received, it implies the latest subscription or connection was not
  accepted due to the limit. In response, the library can log a warning and
  should not continually retry to open more connections on that channel. (In
  exceptional cases, the server might also force-unsubscribe an existing
  connection to enforce fairness, so the client should handle an unexpected
  unsubscribe or disconnect as a signal that the limit was enforced.)

- **Message Rate Limit per Connection:** Throttle the rate of outgoing messages
  (subscriptions, unsubscriptions, and pings) on each WebSocket connection. OKX
  limits the total number of `subscribe`, `unsubscribe`, and `login` requests to
  **480 messages per hour per connection**. This averages to 8 messages per
  minute on a single connection. The client library should track the number of
  such control messages sent and ensure the application does not exceed this
  rate. For instance, if an application rapidly subscribes and unsubscribes to
  channels, the library might need to delay some subscription messages or
  combine multiple channel subscriptions into one request to stay within the
  allowance. It’s recommended to batch subscriptions when possible (OKX’s API
  allows subscribing to multiple instruments or channels in one message) so that
  fewer messages are used. If the 480/hour limit is reached on a connection, the
  server may start rejecting further subscribe/unsubscribe requests or may
  disconnect the socket. Therefore, the library might implement a cooldown
  mechanism: if a connection has approached its hourly message limit, either
  wait until the hour window resets or open a new connection to spread the load
  (while respecting the overall connection count limits). In any case, the
  library should log and surface if the application is calling
  subscribe/unsubscribe too often. **Public vs Private channels:** Note that
  this message rate limit applies per WebSocket connection, and it doesn’t
  differ between public and private – but typically, public market data
  subscriptions are done once and are fewer in number. The library should still
  guard against excessive subscribe calls even on public connections.

- **Order Rate Limits on WebSocket:** When sending trading requests (such as
  placing or canceling orders) via WebSocket, apply the same **account-level**
  rate limits as for REST. OKX’s documented trading rate limits (per instrument
  and per user as described in the REST section) are **shared across REST and
  WebSocket**. Thus, the client’s rate limiter for orders must be global with
  respect to both REST and WebSocket. For example, if the limit is 60 order
  placements per 2 seconds per instrument, that total includes orders sent
  through REST endpoints and those sent through the WebSocket _orders_ channel.
  The library should not double-count; it must coordinate that, for a given
  user, any order placement will check against the same counter regardless of
  transport. Implementation-wise, the simplest approach is to funnel all order
  requests (HTTP or WS) through a unified throttling module that knows the
  user’s limits. Also, WebSocket **login** messages (to authenticate the private
  connection) likely count toward the 480/hour message limit (since login is
  mentioned as included), so the library should include the initial login in the
  message count and not attempt more than one login per connection
  (re-authenticating repeatedly on the same socket would waste message quota).

- **Tiered Limits & Privileged Access (WebSocket):** If the user has higher tier
  allowances (VIP level) for order rate limits, those apply equally on the
  WebSocket. There are no separate “VIP tiers” for subscribe or connection
  counts explicitly – those seem fixed for all users – but a higher-tier user
  will benefit from the higher order-per-2s caps as described earlier. The
  library doesn’t need to alter subscription limits by tier, but it should
  ensure that the enhanced order throughput (if applicable) is utilized on
  WebSocket as well. For example, a VIP client with a 2,000 orders/2s allowance
  can place orders via WebSocket at that higher rate, and the library should
  permit it (whereas a normal user would be capped at 1,000/2s globally). In
  summary, treat the rate limit policies on WebSocket the same as REST for
  user-specific limits, and handle the connection/message limits as fixed
  constraints for all clients.

- **Detecting WebSocket Rate Limit Signals:** The library should handle
  scenarios where the WebSocket server indicates a rate limit or forcibly
  disconnects. Specifically, watch for special event messages like
  `channel-conn-count` (which the server sends upon each new subscription to
  tell you how many connections are currently active for that channel) and
  `channel-conn-count-error`. The `channel-conn-count` event can be used for
  monitoring – for example, when subscribing to a private channel, the server
  returns the current count of connections; if that count is at or near 30, the
  client might avoid opening more. The `channel-conn-count-error` event
  explicitly tells the client a new connection or subscription was rejected due
  to the limit. Upon receiving this, the client library should refrain from
  retrying the subscription on that channel immediately and perhaps close or
  reuse an existing connection instead. Additionally, if the WebSocket
  connection is closed by the server, the library should examine the WebSocket
  close code and reason. A close code in the 4000-4999 range or a standard code
  like 1008/1013 could indicate a rate limiting or policy enforcement closure
  (e.g. too many messages, unauthorized request rate). In such cases, treat it
  similar to a 429 error: log the event, back off from reconnecting too quickly,
  and do not overwhelm the server with immediate reconnections. The client
  library should attempt to reconnect after a delay if needed (since WebSocket
  connections may drop for transient reasons), but if a pattern of closures
  suggests a rate limit, increase the backoff interval. Also incorporate a
  heartbeat/keepalive mechanism as recommended by OKX to avoid unintended
  disconnects: the server will close the connection if no data is sent for 30
  seconds. The library should send periodic `ping` frames (e.g. every 20–25
  seconds of inactivity) and expect `pong` responses to keep the connection
  alive, as per OKX guidance. This keepalive is not exactly rate limiting, but
  it ensures the connection isn’t dropped for idleness, which improves overall
  resilience.

## General Rate Limit Policies

This section defines general (language-agnostic) policies and strategies the
client library should implement to manage rate limiting in a flexible and robust
way. These policies avoid hard-coding specific numeric limits in the core logic,
instead providing a framework that can adapt to updates or different
environments:

- **Configurable Rate Limit Parameters:** Design the library so that all rate
  limit constants (requests per second, per 2 seconds, etc.) are configurable or
  easily updatable. Avoid embedding magic numbers deep in code. For example,
  maintain a configuration object or data map of endpoints to their current rate
  limits (which can be loaded from a JSON or retrieved from OKX’s API
  documentation). OKX’s limits may evolve (as seen when the WebSocket connection
  limit increased from 20 to 30) – the library should be able to update these
  values without code changes. Consider providing default values based on the
  latest documentation, but allow overriding them. This could mean reading from
  a central config file, environment variables, or an update mechanism where the
  library queries the **Get Account Rate Limit** endpoint on startup to set the
  user’s order rate limits dynamically. By abstracting the limits into data, if
  OKX adds new endpoints or changes limits, the library maintainers (or even
  end-users) can adjust accordingly.

- **Dynamic Adjustment via Server Feedback:** Implement mechanisms to adjust
  rate limiting behavior in real-time based on feedback from the OKX server. One
  source of feedback is HTTP headers or response fields. If OKX provides any
  rate limit info in HTTP headers (such as `X-Ratelimit-Remaining` or
  `X-Ratelimit-Reset`), the library should parse those and use them to tune its
  internal counters. (While OKX’s current documentation doesn’t call out such
  headers, the client should be built to handle them if they appear.) Another
  source is the API response data: for instance, the output of the **Get Account
  Rate Limit** endpoint includes the current and next period’s order rate limit
  for the account. The library can call this at startup or at regular intervals
  (e.g. every hour or whenever a 429 is encountered) to update the allowed
  request rates for that account. On the WebSocket side, the
  `channel-conn-count` event message provides a real-time count of connections;
  the library can use this to inform the user or to decide if it’s nearing the
  cap. In general, treat any server-provided metadata about rate limits as
  authoritative: for example, if an HTTP 429 response comes with a
  `Retry-After: 2` header, temporarily override the normal backoff and wait 2
  seconds as instructed. These dynamic signals ensure the library remains
  aligned with the server’s expectations even if undocumented constraints arise.

- **Thread-Safe Rate Limiting:** Ensure that the internal rate limit counters
  and timers are synchronized across threads within the client application. A
  common pattern is to use a token bucket or leaky bucket algorithm to represent
  the available request slots over time. This should be protected by mutual
  exclusion (locks) or atomic operations if the library is used in
  multi-threaded scenarios. For example, if two threads simultaneously try to
  send requests, a thread-safe counter should serialize the check-and-decrement
  of the available request quota. The library might maintain separate buckets
  for different scopes (one for IP-based public calls, one per user for private
  calls, one per instrument for orders, etc.), all of which need concurrency
  protection. Use atomic increments or synchronized sections around the logic
  that counts requests and decides whether to allow or delay a request. By
  centralizing rate limit enforcement in one module of the library, it will be
  easier to manage this synchronization – all API calls should funnel through
  this module.

- **Cross-Process and Distributed Considerations:** Note that rate limits apply
  per user or IP globally, not just per process. If the client library could be
  used in multiple processes or machines (for example, a user runs two instances
  of an application with the same API key), coordinating rate limiting across
  them becomes complex. In general, the scope of this specification is a single
  client instance, but it’s worth documenting that running multiple clients for
  the same account or from the same IP can **collectively** break the limits. If
  needed, implement an option for external coordination – for instance, allowing
  the library to use an external store (like Redis) to share counters among
  processes. This could be an advanced feature where the library, when
  configured in a clustered mode, checks a shared rate limit counter before
  making requests. At minimum, advise users that they should partition their API
  usage or use separate API keys/sub-accounts if they intend to parallelize
  heavily. The library should allow the user to specify a custom rate limit in
  such cases (lower than the official limit) to intentionally divide the
  allowance among multiple clients. For example, if the limit is 60 requests/2s
  and two processes are used, the user might configure each to use 30/2s to be
  safe.

- **Clock Synchronization and Window Reset:** Implement the rate limiter using
  time windows or token refill intervals that align with OKX’s enforcement
  periods. Many of OKX’s limits are per 2 seconds. The library should use a
  high-precision timer (in milliseconds) to track these windows. Consider using
  a rolling window algorithm or fixed-window counter with sub-second granularity
  to avoid edge cases (e.g. sending a burst right at the boundary). It’s also
  important that the system clock is accurate; if the client’s clock is
  significantly skewed, it might mis-time the resets. Encourage users to run NTP
  or another sync service to keep the clock accurate, or use relative time since
  process start for rate limiting calculations. The library can also be
  conservative by leaving a small margin – e.g. if 60 requests/2s is allowed, it
  might enforce 60 per 2.1 seconds – to account for network or processing
  delays. This reduces the chance of accidental limit overshoot.

- **Unified Rate Limit Interface:** Provide a clear interface in the library for
  any module to check availability of a request slot. For example, before any
  API call is dispatched, it should call something like
  `RateLimiter.allowRequest(endpoint)` which returns true/false or blocks until
  allowed. This interface can encapsulate all the logic of counting, waiting,
  and updating counters. It should be abstract enough to handle any new rules
  (for instance, if OKX introduced a new category of limit). Internally, map
  each request to its relevant “bucket(s)” based on the rules: e.g. a public GET
  ticker request maps to the IP bucket; a private order placement maps to {User
  bucket, Instrument bucket, Sub-account global bucket}. When a request is
  completed or timed out, ensure the outcome doesn’t necessitate updating any
  counters (only successful dispatch increments the count, typically). By
  designing this as an adaptable component, future changes (like new endpoint
  limits or revised thresholds) can be handled by updating configuration rather
  than rewriting logic.

## Error Handling & Resilience

This section outlines how the client library should handle rate limit events and
ensure robust operation under rate limiting conditions, for both REST and
WebSocket:

- **HTTP 429 / Rate Limit Errors (REST):** When the library receives an HTTP 429
  Too Many Requests response from any REST call, it must treat this as a signal
  to slow down. As noted, the response will include an error code 50011 in the
  JSON body for general rate limits (or 50061 for sub-account order limits). The
  library should **not** simply retry immediately on a 429. Instead, it should
  invoke the exponential backoff routine: e.g., log the occurrence, wait for a
  calculated delay, and then retry the request if appropriate. If a
  `Retry-After` header is present, use that value as the minimum wait time. If
  the header is absent, a typical strategy is to wait at least one full
  rate-limit window (for example, 2 seconds if that’s the bucket window) before
  retry. The backoff can increase if multiple 429s happen in succession. It’s
  also advisable to include some randomness (jitter) in the wait to avoid
  synchronization with other clients. The library should cap the number of
  retries to avoid infinite loops – e.g. give up after a certain number of
  consecutive 429 errors and surface an error to the caller application (at that
  point, the user might be consistently sending too many requests). Document
  this behavior clearly.

- **HTTP 5xx “Busy” Responses:** In some cases, OKX may return a 503 or an error
  code 50013 with message “Systems are busy. Please try again later.”. While not
  explicitly a rate limit, this often implies the server is throttling requests
  due to load. The client should handle this similarly to a 429 – i.e., back off
  and retry after a short delay, rather than treating it as a fatal error.
  Implement a check for error code 50013 or HTTP 503/504 and engage the same
  retry logic (with perhaps a shorter maximum retry count, as these might
  resolve quickly). This ensures resilience when the exchange is under heavy
  load.

- **WebSocket Rate Limit Errors and Disconnects:** On WebSocket connections, the
  client must interpret certain events as indications of rate limiting. If the
  server closes a connection unexpectedly, check the WebSocket close code. A
  normal closure (1000) or endpoint going away (1001) might not be rate-limit
  related, but codes like **1006 (abnormal closure)** or any custom code could
  indicate the server dropped the connection possibly due to overload or
  violation. Because WebSocket protocols don’t have a standardized 429
  equivalent, OKX relies on the event messages (`channel-conn-count-error`) and
  simply not responding to or dropping excessive requests. If the client
  experiences a disconnect without clear reason, it should attempt to reconnect
  **with backoff** – do not hammer the server with immediate reconnect attempts,
  as this could worsen the situation. For example, if a socket disconnects, wait
  a few seconds before reconnecting, and if it disconnects again quickly,
  increase the wait. This backoff should also be applied per channel if multiple
  channels are affected. Additionally, if a `channel-conn-count-error` is
  received on one connection, it means the subscription was refused – the client
  should **not** keep retrying that subscription on new connections in a tight
  loop. Instead, respect the limit: perhaps inform the application that the
  maximum number of connections for that channel is reached. The library can
  automatically retry that subscription later (after some interval) or simply
  leave it to the user to decide.

- **Handling Burst Traffic:** The client library should smooth out bursty
  request patterns to avoid intermittent throttling. Using a token bucket
  algorithm inherently handles bursts by allowing a short spike up to the bucket
  capacity, then refilling at a steady rate. The library can also explicitly
  implement **queuing** of requests. For example, if an application enqueues 100
  REST requests at once, the library should queue them internally and release
  them at a rate that complies with the limits (rather than sending all and
  getting rate-limited errors). This ensures that bursts are self-throttled and
  do not trigger error responses. Document that large bursts of requests may
  experience queued delays – this is expected behavior to stay within rate
  limits. For WebSockets, if the application sends a burst of many subscription
  requests, similarly throttle the sending (e.g., send a few, then pause). By
  smoothing bursts, the library improves reliability (fewer errors) and avoids
  hitting hard limits that might disconnect sockets or ban the IP.

- **User-Defined Backoff and Retry Strategy:** While the library should provide
  sane default handling for rate limits, it should also allow some
  configurability in how retries/backoffs are done. For instance, allow the user
  to set the maximum retry attempts or a custom backoff function. Some users may
  prefer a linear backoff or have strict requirements on timing. The
  specification should permit the client application to override defaults –
  e.g., via callback or configuration settings – for how to respond when a rate
  limit is hit. The library might offer hooks like
  `onRateLimitError(endpoint, context)` that the user can plug into to log or
  change behavior. At minimum, provide settings for: initial wait duration,
  backoff multiplier, and maximum wait duration. This way, if the default
  exponential backoff is too slow or too aggressive for a particular use case,
  the user can tune it. However, always caution that disabling backoff or
  immediate retries can lead to bans or disconnections.

- **Logging and Alerting:** Incorporate comprehensive logging around rate
  limiting events. The library should log warnings when approaching the rate
  limit (if it can detect such, e.g., when only 1 request remains in the bucket)
  and errors when the limit is hit (429 received or WS error event). Logs should
  include details like which endpoint or channel was being used, and what the
  current usage vs limit was, if known. For example: “Rate limit reached for
  POST /trade/order – 60 requests in 2s exceeded” or “WebSocket order channel
  rate limit – too many orders per second.” This information aids in debugging
  and allows users to adjust their usage patterns. If the library supports
  callbacks or events, it could emit a `RateLimitExceededEvent` that user code
  can listen to in order to trigger custom monitoring or alerts (for instance,
  to notify devops that the trading bot is being throttled). Also log when the
  library is automatically delaying or retrying requests due to rate limits, so
  it’s transparent that a slowdown occurred intentionally. In a production
  setting, these logs/alerts help ensure the user is aware that they are hitting
  limits and might consider optimizations or upgrades (such as using multiple
  sub-accounts or moving to a higher API tier).

- **Graceful Degradation and Fail-safe:** Design the library such that even
  under heavy rate limiting, it continues to function (albeit at a limited
  throughput) rather than failing outright. That means, for example, the request
  queue should have a reasonable maximum size to avoid memory bloat if the
  application keeps sending requests while throttled. If that queue size is
  exceeded, the library might start dropping requests and logging errors instead
  of queuing infinitely. Document this behavior clearly (e.g. “if more than 1000
  requests are pending due to rate limiting, new requests will be rejected”).
  The goal is to avoid a scenario where the library gets backed up beyond
  recovery. Similarly for WebSocket, if the client is being constantly
  disconnected due to rate limits, it should eventually slow down reconnection
  attempts significantly to avoid looping. In the worst case, it may notify the
  user that the service is unavailable due to persistent rate limiting. By
  handling these cases gracefully, the library ensures that rate limit
  enforcement by OKX doesn’t lead to unpredictable crashes or uncontrolled
  resource usage on the client side.

- **Testing Under Limits:** As part of the specification, mandate that the
  implementation be tested against known OKX responses and scenarios. For
  instance, simulate a 429 response and verify the library backs off and retries
  correctly. Simulate rapid-fire subscription requests to a WebSocket and ensure
  the 480/hour logic kicks in (this could be done by instrumentation or a mock
  that starts refusing after N messages). These tests will ensure the rules
  above are correctly implemented. The library should also be tested for thread
  safety by sending concurrent requests in a multi-threaded environment and
  ensuring the rate counters remain consistent. This guarantees the resilience
  mechanisms perform as expected under real-world usage.

By adhering to the above rules and strategies, the client library will robustly
implement OKX’s rate limiting policies for API v5. This ensures fairness and
reliability: the library will prevent users from violating limits (avoiding bans
or errors), adapt to the user’s privilege level, and handle the exchange’s
feedback signals appropriately. The end result is a client that can maximize
throughput within the allowed bounds and degrade gracefully when those bounds
are reached, providing a safe and efficient integration with the OKX API.
