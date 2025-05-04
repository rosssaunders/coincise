# Bybit API v5 Rate Limiting Specification

## Overview

Bybit’s v5 API enforces multiple layers of rate limiting on both REST and
WebSocket interfaces. These limits protect the platform and are applied at the
IP level, account (UID) level, and API key level. A client library must respect
all these constraints for **public (unauthenticated)** endpoints (e.g. market
data) and **private (authenticated)** endpoints (e.g. order placement, account
info). Exceeding any limit results in errors or temporary bans, so the client
should proactively throttle requests and subscriptions to remain within allowed
rates.

## Types of Rate Limits

Bybit uses the following types of rate limits:

- **IP-Based Limits:** Global caps on how many requests or connections an IP
  address can make in a given time frame (regardless of account or API key).
  These apply to both REST calls and WebSocket connections.
- **Account-Based (UID) Limits:** Per-user limits on request frequency, measured
  on a rolling per-second basis. These apply to all API requests associated with
  a given user account (UID). All API keys under the same account share this
  limit.
- **API Key–Based Limits:** In Bybit v5, API key limits are effectively the same
  as account limits, since each API key is tied to a user account (UID). If an
  account has multiple API keys, they collectively count toward the same per-UID
  rate limit. However, certain WebSocket connection limits are described per API
  key (e.g. number of simultaneous connections).

## REST API Rate Limiting

Bybit’s REST API imposes rate limits on both public and private endpoints. The
client library should enforce these by tracking request counts and timing. There
are three main aspects to consider for REST:

### 1. IP-Based REST Limits

- **Definition:** An IP address can send at most **600 HTTP requests in a
  5-second window** (this is the default for public endpoints). This applies to
  all REST traffic (e.g. calls to `api.bybit.com` or regional equivalents).
- **Detection:** If this limit is exceeded, the server will respond with **HTTP
  403 Forbidden** and an error message like _"403, access too frequent"_. This
  indicates the IP has been temporarily blacklisted for too many requests.
- **Enforcement:** The client should count all outgoing REST requests per IP. If
  600 requests/5s is approached, new requests should be delayed until the
  5-second window passes. It’s **not recommended to operate right at the
  limit**, as network jitter could cause unintentional bursts.
- **Back-off Management:** On receiving a 403 "access too frequent" response,
  the client **must stop sending requests from that IP and wait at least 10
  minutes** before retrying. The ban is lifted automatically after \~10 minutes
  of no requests.

### 2. Account/UID-Based REST Limits

- **Definition:** Authenticated requests are limited on a rolling per-second
  basis **per user account (UID)**. Bybit uses a “per-second per UID” rate limit
  model. Each REST endpoint has a specific allowed request rate (in requests per
  second or per minute) for a given account type or tier.
- **Limits by Endpoint:** Every REST **endpoint has an assigned rate limit**.
  For example, placing an order (`POST /v5/order/create`) is limited to **10
  requests per second** for a regular (Classic) account, while certain asset
  queries might allow e.g. **100 requests per minute**. The limits vary by
  endpoint and are listed in Bybit’s documentation.

  - Some endpoints use **per-second limits** (noted as `X/s`), especially
    trading and market data endpoints. Example: `GET /v5/market/tickers` might
    allow a certain number of calls per second (default likely around 50/s for
    broad market data, though not explicitly shown in the snippet).
  - Other endpoints (often account and asset management calls) have **per-minute
    limits** (noted as `Y req/min`). For instance,
    `GET /v5/asset/deposit/query-record` allows up to **100 requests per
    minute**.

- **Detection:** When an account exceeds its request rate for a given endpoint,
  the API returns an error code in the JSON response. Bybit uses a standard
  error: **`retCode: 10006` with message "Too many visits!"** to signal the
  account rate limit was hit. Unlike the IP ban, this is a softer error at the
  application layer (HTTP 200 with an error in the body).
- **Headers for Management:** Every REST response includes headers to help
  clients track usage:

  - `X-Bapi-Limit` – the maximum number of requests allowed for that endpoint
    per the current time window (for your account/tier).
  - `X-Bapi-Limit-Status` – the remaining number of calls left in the current
    time window for that endpoint.
  - `X-Bapi-Limit-Reset-Timestamp` – a timestamp indicating when the rate limit
    will reset if you have exceeded it. (If you haven’t exceeded the limit, this
    is just the current timestamp.)

- **Enforcement:** The client library should maintain counters for each endpoint
  (or grouped category of endpoints if applicable) per account. For example:

  - Track how many requests to order-related endpoints have been sent in the
    last second. If the next order request would exceed the allowed count (e.g.
    the 11th order in one second for a Classic account), the client should delay
    that request until the next second.
  - Similarly, for endpoints measured per minute, track usage in that minute and
    throttle accordingly. For instance, ensure no more than 100 calls to a
    deposit-record endpoint are made in any 60-second interval.

- **Graceful Handling:** If a `10006 - Too many visits` error is received, the
  client should pause further requests to that endpoint (and any in the same
  category sharing the limit) until the reset timestamp or a safe interval
  (usually the next second). The `X-Bapi-Limit-Reset-Timestamp` can be used to
  know when to resume. **Partial failures** can occur for batch requests: if a
  batch of operations exceeds the remaining quota, Bybit will process up to the
  allowed amount and reject the rest in that batch. The client should handle
  such responses by checking which items succeeded or failed.

### 3. API Key–Based REST Limits

- **Definition:** Bybit does not assign separate rate quotas to individual API
  keys beyond the account’s limit. All keys under the same account share the
  account’s per-second allowance. However, the client should still consider
  scenarios with multiple API keys:

  - **If multiple API keys belong to different accounts:** They do **not** share
    limits. Each account’s limits are tracked separately by UID.
  - **If multiple keys belong to the same user account:** treat them as a single
    pool for rate limiting purposes. The total requests from all keys under one
    UID should not exceed that account’s per-second or per-minute caps.

- **Enforcement:** The library could maintain a unified counter per account. If
  API keys are used interchangeably, ensure the sum of calls through any of that
  account’s keys stays under the limit. (Bybit’s headers and error codes will
  reflect the combined usage since they are per-UID.)
- **Key Rotation:** Rapidly switching API keys will not increase throughput for
  one account – the limits will still apply cumulatively. The client should not
  attempt to bypass limits by cycling keys.

## WebSocket API Rate Limiting

Bybit’s WebSocket API is subject to its own rate limiting rules, which cover
connection management, subscription counts, and message frequency. The client
library should enforce these rules to maintain stable WebSocket connections:

### 1. IP-Based WebSocket Limits

- **Connection Rate:** Do not establish more than **500 WebSocket connections
  within a 5-minute window per IP**. Opening connections too quickly can trigger
  an IP ban on WebSocket access.
- **Total Connections:** An IP address may have up to **1,000 concurrent
  WebSocket connections for market data** (streaming) at any given time.
  Connections to different Bybit markets (Spot, Linear/USDT Perpetual, Inverse,
  Options) are counted separately in this 1,000 limit. The library should refuse
  or queue any attempt to open additional connections beyond this limit for a
  single IP.
- **Connect/Disconnect Frequency:** Avoid rapidly connecting and disconnecting.
  Frequent churn of connections is discouraged. The client should reuse existing
  connections when possible and implement exponential backoff or a cool-down
  period before reconnecting if a connection was just closed, to prevent
  triggering automated blocks.

### 2. API Key / Account Connection Limits (WebSocket)

- **Private Connection Count:** Each API key (and thus each account) can open a
  limited number of **private WebSocket connections** (authenticated
  connections). Bybit allows up to **100 private WebSocket connections per API
  key/account**. This is typically more than enough; clients should normally use
  a few connections and multiplex subscriptions. If an application tries to open
  more than 100 simultaneous authenticated sockets with the same API key,
  additional connections should be prevented or will be refused by the server.
- **Public Streams:** Public WebSocket connections (unauthenticated market data
  streams) are generally only limited by the IP caps above (500 in 5min, 1000
  total). The client should still use a reasonable number of connections; it can
  subscribe to multiple topics on one connection to avoid needless socket
  proliferation.

### 3. Per-Message Rate Limits

- **Outgoing Message Frequency:** While receiving data via WebSocket is not
  rate-limited per se, sending messages (such as subscription requests or order
  placement commands via WebSocket) has rate considerations. Bybit’s
  documentation suggests that **WebSocket trading requests share the same
  account rate limit as REST**. This means any order commands sent over
  WebSocket count against the per-second request limit for that user. For
  example, if an account is allowed 10 order requests per second, it doesn’t
  matter whether those orders are sent via REST or WebSocket – the total
  combined should not exceed 10 per second.
- **Subscribe/Unsubscribe Limits:** Bybit doesn’t publish a strict numeric limit
  for how many subscription messages can be sent per second, but clients should
  avoid spamming subscription requests. In practice, sending a burst of dozens
  of `subscribe` messages at once could lead to a disconnect or
  non-responsiveness. It's good practice to space out subscription commands
  (e.g. a few per second) especially if subscribing to many topics.
- **Handling Rate Errors:** If too many WebSocket requests are sent too quickly,
  the server may respond with an error (similar to `retCode: 10006`) or even
  disconnect the client. The library should monitor responses for any rate-limit
  error codes in WebSocket frames. If encountered, pause sending further
  messages for a short interval (e.g. 1 second) before retrying. The
  `X-Bapi-Limit` headers are also present in WebSocket responses for private
  actions (like order placements), so the client can use those to gauge
  remaining capacity in real time.

### 4. Topic Subscription Limits

- **Subscriptions per Connection:** Each WebSocket connection can have a maximum
  of **60 subscriptions** to topics (e.g. trading pairs or channels). The client
  should enforce this by preventing more than 60 active subscriptions on one
  socket. If a user attempts to subscribe to a 61st topic on one connection, the
  library should either open a new connection for additional topics or reject
  the new subscription request with an explanation.
- **Total Subscriptions per Account:** There isn’t a fixed number given for
  total subscriptions per account, aside from the connection limits. In theory,
  an account could subscribe to 60 topics on each of up to 100 WebSocket
  connections (private) – far more than practical needs. The main constraint is
  60 per connection. The client should structure topic subscriptions efficiently
  (e.g. reuse subscriptions, unsubscribe when not needed) to stay within this
  limit.
- **Managing Subscriptions:** If the library supports automatic resubscription
  (after reconnects), it should remember the 60-topic cap. On reconnect, if the
  last session had, say, 55 subscriptions, those can all be resubscribed on the
  single connection. But if there were more than 60, they must be split into
  multiple connections on reconnect.

### 5. Public vs Private Channel Considerations

- **Public Channels:** Public market data feeds (order books, tickers, etc.) do
  not require auth and do not count toward the account’s request quotas. In
  fact, **using WebSockets for market data is recommended** since **those data
  updates don’t consume your REST rate limits**. The only limits to consider are
  the IP and subscription limits. The client can stream as much data as needed
  (within the 60 topics per connection and 1000 connections per IP rules)
  without worrying about the per-second REST call budget.
- **Private Channels:** Private feed channels (like order updates or position
  updates) require an API key and authentication via WebSocket. Subscribing to
  or receiving on these channels does not count as “requests” against the REST
  rate limit. However, **any active commands sent on the private channel (such
  as placing an order via a WebSocket op)** will count against the account’s
  rate limit the same way a REST call would. The library should authenticate
  once per connection and then subscribe to the desired private topics. Ensure
  that the number of private subscriptions also abides by the 60-per-connection
  rule (private topics count in the same limit).

## Tier-Based Rate Limit Variations (VIP Levels)

Bybit adjusts rate limits based on the user’s VIP level or account type.
Higher-tier users (typically determined by trading volume or account status) are
granted larger rate limits for many endpoints. The client library’s rate-limit
logic should be flexible to accommodate these variations:

- **Default vs VIP vs Institutional:** A regular account (non-VIP, sometimes
  called “Classic”) has the base rate limits (e.g. 10 requests/sec on most
  private trade endpoints). As a user’s VIP level increases, their allowed
  requests per second for certain endpoints increases. For example, a Classic
  account can place **10 orders per second** on futures or options, whereas a
  **VIP 1** user gets up to 20 orders/sec, and a **VIP 3** user up to 60
  orders/sec. Spot endpoints have slightly higher base limits (20/sec for
  default) but also scale with VIP level (e.g. 25/sec at VIP1, 40/sec at VIP3).
- **Pro (Enterprise) Levels:** Beyond VIP tiers 1–5 (and VIP Supreme), Bybit
  offers **Pro tiers (Pro 1 through Pro 6)** for institutional/high-volume
  traders. These have even higher limits. For instance, a Pro account might be
  allowed **100+ requests per second** by default. The highest tiers can reach
  **200–300 requests per second** on certain endpoints. (According to Bybit’s
  rate limit table, Pro 3 and above can place 200+ orders/sec on futures, and
  some unified account Pro tiers allow up to 300 req/sec on various endpoints.)
- **Upgradable Endpoints:** Not all endpoints’ limits increase with VIP level.
  Each endpoint is marked as _upgradable (Y)_ or not (N) in the documentation.
  **Upgradable = Yes** means higher-tier users get a higher limit; **No** means
  the limit stays the same for everyone. For example, order placement endpoints
  are upgradable (VIPs can do more), whereas certain info endpoints may remain
  fixed. The client should be aware that for non-upgradable endpoints, it should
  not exceed the base limit regardless of user tier.
- **Dynamic Detection:** The simplest way to handle tier-based differences is to
  rely on the `X-Bapi-Limit` header returned by each request, which already
  reflects the user’s current rate limit for that endpoint. The client can use
  this to adjust its internal counters on the fly. For instance, if a VIP user’s
  response shows `X-Bapi-Limit: 50` for an endpoint that is normally 10 for
  regular users, the client knows that user is allowed 50 requests/sec on that
  endpoint.
- **Configuration Option:** Alternatively, if the client is aware of the user’s
  tier (through an API call or configuration), it could load preset limits for
  that tier. Bybit’s published tiers and limits could be encoded in the library
  (e.g. a table of VIP level -> allowed requests). However, since these limits
  might change or new tiers added, using the response headers is more
  future-proof.
- **Adapting Logic:** When a user upgrades to a higher tier, the client should
  automatically permit the higher rate. This means if the library was throttling
  to 10/sec and it detects via responses that now 20/sec are allowed, it can
  increase the throttle. Similarly, if a user’s tier changes (or if they move to
  an environment with different limits), the client should adapt. Always **err
  on the side of caution** – if unsure of the tier, assume default limits to
  avoid accidental overload.

## Expected Behavior Summary

In practice, the client library should implement the following behaviors to
comply with Bybit v5 rate limits:

- **Throttle REST Requests:** Never exceed 600 requests per 5 seconds per IP.
  Also enforce the per-endpoint limits per second or minute for the user’s
  account tier. Use a token bucket or leaky bucket algorithm (conceptually) to
  release requests at the allowed rate. Queue or drop requests that would
  violate limits.
- **Monitor Responses:** Check REST responses for `retCode: 10006` errors and
  response headers. If near the limit (`X-Bapi-Limit-Status` low or 0),
  temporarily slow down. If an error occurs, wait until the reset timestamp
  before retrying. If a 403 IP block occurs, halt all requests on that IP for 10
  minutes.
- **Manage WebSocket Connections:** Limit new connection attempts to avoid
  breaching the 500/5min rule. Keep track of total open sockets per IP and per
  API key (not exceeding 1000 and 100 respectively). Implement reconnect backoff
  to avoid rapid cycling.
- **Throttle WebSocket Messages:** Regulate outgoing messages (subscriptions or
  commands). For private (authenticated) actions, ensure the combined REST+WS
  command rate stays under the user’s per-second allowance. Spread out
  subscription messages if a large number of topics are needed at once.
- **Limit Subscriptions:** Prevent more than 60 topic subscriptions on one
  connection. If additional subscriptions are requested, spawn another
  connection or wait until some topics are unsubscribed. Document this
  limitation for users of the library so they understand multiple connections
  may be used under the hood.
- **Adapt to Tier:** Use the provided limits from the API or known VIP tier
  settings to scale the throttle. Higher-tier users can utilize more throughput,
  while ensuring the library still respects whatever the current `X-Bapi-Limit`
  is. Always enforce non-upgradable endpoints at their fixed limit.
- **Fair Queuing:** If the application using the library sends both public and
  private requests, the library should isolate their limits. Public
  unauthenticated calls (if any) mostly rely on IP limit; private calls use
  account limits. Ensure one doesn’t starve the other – e.g., a flood of public
  market data REST calls could hit the IP ceiling and impact private calls. The
  client might implement separate tracking for public vs private request pools,
  while still observing the shared IP cap.

By following these specifications, an API client library will handle all
relevant rate limiting for Bybit v5. It will automatically wait or reject
requests that would exceed limits, use WebSocket efficiently to avoid
unnecessary REST calls, and adjust for the user’s privilege level. This ensures
reliable operation without encountering “Too many visits” errors or being
temporarily banned for excess traffic.

**Sources:** The above rules are based on Bybit’s official v5 API documentation
on rate limits and known guidelines for WebSocket usage. All limits and codes
apply to the most recent version of the Bybit v5 API.
