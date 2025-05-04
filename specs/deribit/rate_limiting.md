Great. I’ll prepare a language-agnostic specification for implementing rate
limiting in a reusable client library for the Deribit API. This will include
rules for both REST and WebSocket endpoints, considering public and private
APIs, and handle IP, account, and API key-based limits, as well as message send
and subscription limits for WebSocket. I'll get back to you shortly with the
detailed specification.

# Deribit API Client Rate Limiting Specification

## Introduction

This document specifies a language-agnostic design for a client-side library
that enforces Deribit API rate limits on both REST and WebSocket endpoints.
Deribit employs a **volume-tiered, credit-based rate limiting system** focused
on preserving the matching engine’s capacity. The goal of this specification is
to ensure the client library remains compliant with all Deribit rate limits –
IP-based, account (sub-account) based, and API key based – for both public and
private API calls. By adhering to these limits, the library will prevent
`HTTP 429 Too Many Requests` errors and WebSocket `"too_many_requests"` (10028)
errors, avoiding potential temporary bans on the client’s IP.

**Scope:** The library will handle rate limiting for:

- **REST API requests:** Enforce IP-level limits for public (unauthenticated)
  endpoints and account/API-key limits for private (authenticated) endpoints. It
  must distinguish between public vs. private endpoints and apply different
  limits accordingly.
- **WebSocket API usage:** Throttle outgoing messages (requests/subscriptions)
  per Deribit’s guidelines and enforce subscription limits per connection. It
  must account for differences between public market-data channels and private
  user-specific channels.

The specification is designed for reuse across any programming language or
runtime. It covers internal rate tracking mechanisms, backoff and retry
strategies, request queuing, and handling of server responses indicating rate
limit breaches. Pseudocode examples of core logic (e.g. token bucket
implementation) are included to illustrate intended behaviors.

## Rate Limiting Overview

Deribit’s rate limiting uses a **credit/token bucket system** to regulate API
usage. Each API request costs a certain number of “credits” from a fixed pool
that refills over time. If the pool is exhausted, Deribit will refuse further
requests until it has replenished (the client receives a `too_many_requests`
error code 10028). Key elements of the system include:

- **Credit Refill Rate:** Credits replenish continuously at a steady rate,
  enabling a sustained request rate.
- **Maximum Credit Pool:** A maximum credit capacity (burst limit) allows short
  bursts of traffic above the sustained rate.
- **Cost per Request:** Each endpoint call consumes a fixed credit cost from the
  pool.

Critically, Deribit differentiates between **matching engine requests** (order
placement/cancellation and other trade-related operations) and
**non-matching-engine requests** (market data queries, account info, etc.).
Matching-engine calls have stricter tier-based limits, while non-matching calls
have a general limit. All requests not explicitly classified as matching-engine
are treated as non-matching.

The client library must implement separate rate limit tracking for these
categories and enforce whichever limit applies to a given request. It should
also account for the context: whether the request is **unauthenticated
(public)** or **authenticated (private)**, since Deribit applies certain limits
per IP for public use vs. per account for authenticated use. The next sections
detail the specific limits and how the library should handle them.

## REST API Rate Limits

### IP-Based Limits (Unauthenticated Requests)

For **public REST endpoints** (unauthenticated calls), rate limiting is enforced
per client IP address. Deribit’s policy is stricter with unauthenticated
clients: _“Unauthenticated requests are more likely to result in an IP ban as we
cannot contact the client behind them”_. The library should therefore encourage
using an API key whenever possible even for public data, but it must still
enforce IP-based limits for any calls made without authentication.

By default, **non-matching-engine requests** (which covers most public data
endpoints) allow a sustained rate of \~20 requests per second with bursts up to
100 calls in a short span. In the internal credit system, this corresponds to
each request costing 500 credits, a refill of 10,000 credits per second
(allowing 20 req/s), and a max of 50,000 credits (100 requests) available for
bursts. These limits apply **per IP** when no authentication is used.

**Library Enforcement:** The client library should maintain a rate counter or
token bucket for **public-request usage per IP**. All calls to `/public/...`
endpoints should check against this bucket. If the client attempts to exceed
\~20 public requests per second (or a burst of 100 immediate calls), the library
must delay or queue those requests to keep within limits. Since Deribit’s policy
for unauthenticated users is particularly strict, the library may also implement
a slightly **lower threshold or safety margin** and utilize exponential backoff
on repeated hits to avoid triggering an IP ban. For example, after a first hit
of the limit, the library could temporarily reduce allowed rate or require a
cool-off period.

Additionally, the library should enforce the limit of **32 concurrent
connections per IP** (this applies to WebSocket connections, but also any
persistent HTTP connections). While REST requests are typically short-lived HTTP
connections, if the library uses any long polling or multiple parallel
connections, it must not exceed 32 from one IP.

### Account-Based Limits (Authenticated Requests)

For **private REST endpoints** (authenticated calls), rate limiting is primarily
enforced per account (specifically, per sub-account in Deribit’s system). All
API keys associated with the same sub-account share the same rate limit pool.
The library should treat the sub-account as the identity for rate limiting
purposes. This means that if the client uses one API key, limits apply to that
key’s sub-account; if multiple API keys on the **same** sub-account are used,
their combined traffic must stay within that sub-account’s limits (the library
should ideally be aware of this and coordinate if it manages multiple keys).

Deribit’s account-based limits are **tiered by the user’s 7-day trading
volume**, impacting **matching engine requests**. The tiers define the allowed
**sustained requests per second** for order-related operations and the **burst**
capacity, for example:

- **Tier 4 (lowest)** – For regular traders (up to \$1M 7-day volume): **5
  requests/sec** sustained, up to **20 requests** burst.
- **Tier 3** – Over \$1M volume: **10 requests/sec** sustained, **30 burst**.
- **Tier 2** – Over \$5M volume: **20 requests/sec** sustained, **50 burst**.
- **Tier 1 (highest)** – Over \$25M volume: **30 requests/sec** sustained, **100
  burst**.

These limits apply to the sum of all matching-engine (order-related) requests on
that sub-account across all markets. They are updated hourly by Deribit
depending on the user’s volume tier. In addition, there are specialized
sub-limits for certain operations (e.g. quoting or mass order cancellations)
which advanced users or market makers might encounter – for example, maximum
quote submission rates – but the library can treat those as part of the
matching-engine category unless the API provides them explicitly (the `limits`
field includes entries like `maximum_quotes` and `cancel_all` which could be
read if needed).

For **non-matching-engine requests** on private endpoints (such as fetching
account balances, positions, market data via private calls, etc.), Deribit sets
a high default limit that is generally not the bottleneck. Officially this is
the same credit system (e.g. default \~20 req/s, 100 burst), but in practice
Deribit often configures a very generous allowance for non-matching requests for
authenticated users (the support docs show an example of 1000 req/s limit for
non-matching-engine calls for certain configs). Nonetheless, the library should
implement the **documented default** unless it retrieves a higher limit via the
API. By default, assume **20 req/s (burst 100)** for any private calls that are
not in the matching-engine list.

**Library Enforcement:** The client library should maintain two separate token
buckets (or counters) per authenticated session (per account): one for
**matching-engine requests** and one for **non-matching requests**. Before
sending a private API call, the library must determine which category the
endpoint falls under and then attempt to consume a “token” from the
corresponding bucket:

- _Matching-engine bucket:_ Use for endpoints such as placing or cancelling
  orders. (Deribit’s documentation enumerates these endpoints, e.g.
  `/private/buy`, `/private/sell`, edit order, cancel (by order, by label, or
  all), close position, block trade execution, mass quote, etc..) This bucket’s
  rate (tokens per second) and capacity (max tokens) are set according to the
  account’s tier. If the account’s precise tier is unknown, the library
  **SHOULD** default to the lowest tier (5 rps, 20 burst) for safety, or
  proactively query the account’s limits via `/private/get_account_summary` at
  startup to configure the correct values.
- _Non-matching-engine bucket:_ Use for all other endpoints (e.g.
  `/private/get_position`, `/private/get_account_summary`, or any `/public`
  calls that the client executes with an authenticated context). This can
  default to 20 rps, 100 burst (or a higher value if the API indicates one). In
  many cases, this limit will not be hit by typical usage, but the library
  should still enforce it to prevent abuse. When the client is unauthenticated,
  this same bucket logic applies but on an IP basis as described above.

When an authenticated request is made, the library finds the appropriate bucket
and checks if a request can be issued without exceeding the rate. If not, it
should queue or delay the request (see **Rate Limit Enforcement Algorithms**
below). All rate accounting for private calls is tied to the sub-account
identity; if the library allows multiple API keys, it must ensure that keys
sharing a sub-account draw from the same pool to avoid double-counting. If
multiple sub-accounts are used (multiple API keys for different accounts), the
library should maintain separate buckets per sub-account.

### API Key-Based Considerations

Each API key is associated with a specific account (and sub-account). **API
key-based rate limiting** in Deribit’s context is effectively the same as
account-based limiting – i.e. an API key doesn’t get a higher quota on its own;
it’s constrained by the sub-account’s limits. However, the client library should
treat different API keys as separate _identities_ for tracking purposes, since
keys from different accounts have independent limits, and because the library
instance may only be aware of the key it is using.

If the library is designed to manage a single API key at a time (common case),
then account-based logic covers the key’s limits. If it supports multiple API
keys simultaneously (for example, a program managing multiple accounts), it
should isolate rate limit tracking per API key/account. In other words, maintain
distinct buckets for each API key _unless_ it is known that two keys belong to
the same sub-account (in which case they must share the buckets). The Deribit
API does not explicitly provide separate counters for each API key on the same
account – it is cumulative per account – so the onus is on the client
application to avoid using multiple keys from one account to bypass limits (the
library should document this caveat).

In summary, the library should ensure that **each API credential set** it
manages adheres to that credential’s own limits. Separate API keys should not
interfere with each other’s counters except when they are effectively the same
account.

### Public vs Private Endpoint Classification

The library must differentiate **public vs. private endpoints** and apply
appropriate rules:

- **Public endpoints** (those under `/api/v2/public/`): These do not require
  auth and should be counted against the IP-based/non-auth bucket. The sustained
  rate (\~5–20 req/s depending on endpoint complexity) and burst (up to 100)
  apply per IP. Typically, public data endpoints are non-matching-engine by
  definition (since they don’t affect the order book). Examples: getting order
  books, tickers, instrument lists, etc.
- **Private endpoints** (`/api/v2/private/`): These require authentication and
  count against the user’s account limits. **Further, determine if the endpoint
  is a matching-engine operation.** Deribit provides a list of which private
  endpoints count as matching-engine requests (essentially any order placement,
  cancellation, or trade execution call, plus mass quote and block trade
  operations). All other private endpoints (like querying account info, getting
  open orders, etc.) are non-matching. The library can maintain a set or pattern
  match (e.g. any endpoint starting with “private/buy”, “private/sell”,
  “private/edit”, “private/cancel”, etc.) to classify requests. As Deribit
  notes, any request not in the matching-engine list is treated as
  non-matching-engine.

By distinguishing in this way, the library can correctly deduct the right amount
of credits from the correct pool for each request. For example, a burst of 10
order placements should be evaluated against the account’s matching-engine
bucket (perhaps only 5 of those 10 can be sent immediately if the sustained rate
is 5/sec), whereas a burst of 10 price queries can be allowed as long as the IP
or non-matching pool has capacity. This separation prevents a flood of market
data requests from starving the ability to send orders, and vice versa, since
Deribit tracks them independently.

## WebSocket API Rate Limits

### Message Rate Limits (Traffic Throttling)

When using Deribit’s WebSocket API, clients can send requests (like subscribing
to feeds, placing orders via WebSocket, pings, etc.) over a persistent
connection. The library must throttle outgoing messages to avoid exceeding
Deribit’s recommended message rate. Deribit’s documentation indicates a maximum
of **200 client messages per second (with short bursts up to 300 messages/sec)**
over WebSocket. This is a very high ceiling intended for institutional users or
market makers; typical clients should stay well below this. However, the library
should implement a **safety throttle** such that outgoing messages (any kind of
WebSocket frames sent to Deribit) are limited, for example, to a default of 50
msg/sec or a user-defined rate, not exceeding the 200 msg/sec guideline.

Importantly, the same credit-based rate limits discussed for REST apply to
actions taken over WebSocket. The WebSocket is essentially an alternate
transport for the same API methods. For instance, if the client submits orders
via WebSocket API calls, those count against the matching-engine request limits
exactly as if they were REST calls. Thus, the library’s **token bucket counters
must also account for WebSocket API calls**. The implementation can be unified:
whether a request is sent via HTTP or WS, update the corresponding rate counter
before sending. This ensures the core limits (requests per second categories)
are respected regardless of protocol. The **message-rate throttle** on the
WebSocket is an additional layer to protect the connection from being closed due
to an excessive message flood (e.g., if a client tried to send hundreds of
subscription requests or ping too frequently).

In practice, the library can implement the WebSocket message limiter by
maintaining a simple counter for messages sent in the last second (reset each
second) or using a token-bucket with 200 tokens/second. This should include all
types of outgoing messages: authentication calls, subscription/unsubscription
commands, pings, order requests, etc. If the limit would be exceeded, the
library should queue the message to send a bit later or spread them out. The
provided guideline (200/sec) is quite high; thus the library default can be
conservative, but it should never exceed the documented maximum without explicit
configuration. Deribit notes that if a higher message rate is required, one must
contact support for arrangements – the library should not attempt to exceed the
official limit on its own.

### Subscription Limits per Connection

Deribit imposes a limit on how many market data or user feed **subscriptions**
can be active on a single WebSocket connection. Specifically, there is a maximum
of **500 channels per subscription (connection)**. A “channel” here refers to a
specific feed, e.g., an order book for a certain instrument, trades for an
instrument, or a user’s own order updates stream. The client library must ensure
it does not try to subscribe to more than 500 channels on one WebSocket
connection. If a user of the library requests subscriptions to, say, 600
different channels, the library **SHOULD** automatically distribute these across
multiple connections (e.g., 500 on one connection and the remaining 100 on a
second connection) or at least throw an error or warning indicating the limit.

In implementation, the library can track the number of active subscriptions on
each WebSocket it manages. When a new subscribe request comes in, if the target
connection is at capacity (500 channels), the library can either open a new
connection (if the design supports multiple WebSocket connections) or reject the
request. A robust approach is to support multiple connections transparently:
allocate subscriptions in a round-robin or balanced manner across connections,
up to 500 each. **Note:** The library should also respect the overall connection
limit of 32 per IP – there is no scenario where exceeding 32 connections is
allowed, so the library’s connection pooling must cap at 32 in total.

### Public vs Private Channel Considerations

Deribit’s WebSocket provides both public market data channels (which do not
require auth) and private user-specific channels (which require the connection
to be authenticated). The library should account for some differences in how
these are handled:

- **Authentication:** The library must handle authenticating a WebSocket
  connection with an API key when the user wants to receive private updates
  (like own orders, trades, portfolio). This can be done by sending an
  authentication message after connecting. Each authenticated connection
  consumes the account’s rate limit just like a REST auth call would, and
  Deribit offers two auth scopes: “connection” (tokens valid only on that single
  connection) and “session” (tokens that can be reused across reconnects). For
  simplicity, the library can use connection-scoped auth unless a user
  specifically wants session scope (session scope allows up to 16 sessions per
  user concurrently, whereas connection scope allows up to 32 connections but
  tokens aren’t reusable). These session limits are not rate limits per se, but
  the library should not exceed them when managing multiple private connections.
- **Public data streams:** If the client subscribes only to public data (e.g.,
  order books for various instruments), it can do so without authentication. The
  rate limiting for subscription actions (the subscribe requests themselves)
  falls under non-matching-engine requests (they are not modifying anything,
  just requests for data), so the token bucket for non-ME/IP will cover them.
  Once subscribed, receiving messages has no limit (the flow is controlled by
  Deribit). The library should, however, avoid unnecessary re-subscriptions or
  excessive pinging on these connections (as Deribit warns against overly
  frequent pings). A heartbeat ping every 30–60 seconds is sufficient to keep
  the connection alive, per Deribit’s guidance.
- **Private streams:** For user-specific channels (like `"user_orders"` updates,
  `"portfolio"` updates, etc.), the library needs an authenticated connection.
  Deribit does not explicitly document a different subscription limit for
  private channels – the same 500 channels per connection applies, though a user
  typically doesn’t have nearly that many private channels (they might have a
  handful: one for orders, one for trades, etc.). The main consideration is
  ensuring the connection stays authenticated and reconnects appropriately if
  dropped. If multiple private connections are open (e.g., to segregate
  different types of feeds), each must authenticate and each counts towards the
  user’s session limit. The library should manage refresh tokens if using
  session scope, or simply re-authenticate on reconnect for connection scope.
  Rate limit impact: the act of authenticating and subscribing on these private
  connections counts against the account’s non-matching engine limits (they’re
  just API calls like any other). The library should perhaps prioritize private
  channel subscriptions if there’s a risk of hitting the 200 msg/sec throughput
  – i.e., don’t let a flood of public subscriptions delay critical private
  subscriptions.

In general, **it may be wise to separate public and private subscriptions onto
different connections**. This is not strictly required by Deribit, but it can
help organize traffic. For example, the library could use one authenticated
WebSocket connection dedicated to all of the user’s private feeds, and one or
more separate connections for heavy public market data feeds. This way, heavy
public message volume (like many tickers) does not interfere with or risk the
throughput of the private channel delivering user’s own order updates. If using
such a design, remember the limits: up to 32 connections total and up to 500
channels each, which is plenty of headroom.

## Rate Limit Enforcement Algorithms

To enforce the above limits, the client library should implement a **token
bucket** or **leaky bucket** mechanism for each relevant limit category. The
token bucket approach is ideal given Deribit’s credit system, as it naturally
models a refillable pool of credits with a maximum capacity (burst) and a refill
rate.

**Token Bucket Mechanics:** Each rate limit (e.g. account matching-engine,
account non-matching, IP public) can be represented by a bucket that accumulates
tokens (credits) over time up to a set maximum. Each request requires a certain
number of tokens (e.g. 500 tokens for a non-matching request under default
settings, or 10,000 tokens per matching-engine request if the sustained rate is
5/sec, etc. – effectively the credit cost). Instead of micromanaging the credit
values, the library can use the request rate limits directly: e.g., allow X
requests per second with burst Y. The token bucket is refilled at X tokens per
second (sustained rate), with capacity Y (burst size in requests). Each request
“consumes” 1 token from the bucket (for simplicity, treat each request equally
within its category – Deribit’s system sometimes assigns different cost to
different calls, but this detail is not public for all endpoints, so assuming
uniform cost per request in a category is reasonable unless specified
otherwise).

**Data Structures:** For example, one might define:

- `bucket_matching = TokenBucket(rate=<tier_rps>, burst=<tier_burst>)`
- `bucket_non_matching = TokenBucket(rate=20, burst=100)` (or higher if known)
- `bucket_public_ip = TokenBucket(rate=20, burst=100)` (if separate from
  non-matching for auth calls; often this can be the same as non_matching when
  unauth, but if library handles both auth and unauth concurrently, keep
  distinct).
- Additionally, a `ws_message_bucket = TokenBucket(rate=200, burst=300)` for
  overall WS message throughput (optional if expecting high traffic).

**Token Bucket Pseudocode:**

```pseudo
class TokenBucket:
    def __init__(self, rate, burst):
        # rate: allowed requests per second, burst: max allowed in a burst
        self.rate = rate
        self.capacity = burst
        self.tokens = burst        # start full (burst capacity)
        self.last_fill = current_time()

    def consume(self, tokens_needed=1):
        # Refill tokens based on time elapsed
        now = current_time()
        elapsed = now - self.last_fill
        # add tokens based on refill rate (rate tokens per second)
        self.tokens += elapsed * self.rate
        if self.tokens > self.capacity:
            self.tokens = self.capacity
        self.last_fill = now
        if self.tokens >= tokens_needed:
            self.tokens -= tokens_needed
            return True
        else:
            return False
```

In this pseudocode, `consume()` should be called before executing a request. If
it returns `False`, the request would exceed the rate limit (bucket empty), so
the library must wait. The waiting time can be calculated by how many tokens are
needed. For example, if `tokens_needed` (usually 1 for one request) is greater
than available, the deficit is `d = tokens_needed - tokens`. The time to wait
for `d` tokens is `d / rate` seconds. The library can either sleep that duration
in a background loop or put the request in a queue to be handled after that
delay.

**Request Queuing and Scheduling:** The library design should include a
**request queue** for each bucket (or a unified queue with tagged request
types). When a request is made by the caller code, if the appropriate rate
bucket has a token available (i.e., `consume()` returns true), the library
proceeds to send the request immediately. If not, the request is placed into the
queue. A scheduler (which could simply be a looping task or a timer callback)
should regularly attempt to send queued requests when capacity frees up. Each
time a token becomes available (due to time refill), one or more queued requests
can be dequeued and sent. The library should send queued requests in **FIFO
order** unless certain requests are high priority (the spec can keep it FIFO for
simplicity).

It’s important to also impose some reasonable limits on the queue length or age
of requests in the queue. Since this is a client library, it’s expected users
will not intentionally overload the queue for long periods, but a safeguard
(like dropping or rejecting new requests if the queue grows beyond a certain
size to prevent memory bloat) can be considered an implementation detail.

**Concurrent Requests:** If the library is used in an asynchronous or
multithreaded context, ensure that the rate limiting checks and token updates
are done in a thread-safe way (atomic operations or locked section around
checking and consuming tokens). This prevents race conditions where two threads
both pass a check simultaneously when only one token was available. A
single-threaded event loop design naturally avoids this, but multi-threaded use
must guard the buckets.

### Backoff and Retry Strategies

Even with careful client-side throttling, it’s possible to hit a rate limit in
edge cases (for instance, if the program state was out of sync with the actual
limits, or multiple applications using the same account causing collective
overuse). Deribit signals rate limit breaches with HTTP 429 status codes for
REST or error messages on WebSocket (error code 10028). The library should
handle these responses gracefully:

- **HTTP 429 Too Many Requests:** When an HTTP 429 is received, the library
  should parse the response for any guidance. Deribit’s response may include a
  message or a `Retry-After` header indicating how many seconds to wait. If
  `Retry-After` is present, the library should suspend further requests to that
  endpoint or category for that duration. If not, a sensible default is to
  **back off exponentially**. For example, after a 429, wait say 0.5 seconds and
  try the next queued request, if it fails again immediately, wait 1 second,
  then 2 seconds, etc., up to a maximum interval (maybe 5 or 10 seconds). This
  exponential backoff prevents hammering the API when it’s already saying “slow
  down.” The library should also log or notify that a throttle occurred.
- **WebSocket Rate Errors:** If a WebSocket request (like an RPC call) returns
  an error with `"too_many_requests"` (10028), this similarly indicates the
  client’s last message was over the limit. The library should not immediately
  resend. It should apply a short delay (even a few tens of milliseconds might
  suffice, as Deribit’s example suggests waiting \~20ms after hitting the limit
  to regain some credits). After a brief wait, the library can attempt to resend
  the failed request (and any queued requests). If multiple WS errors of this
  kind occur in succession, use an exponential backoff here as well, backing off
  for progressively longer intervals.
- **Adaptive Slowing:** When any rate-limit error is encountered, the library
  could dynamically adjust its internal rate assumptions. For instance, if we
  assumed 10 rps allowed but got a 429, perhaps the account is actually Tier 4
  (5 rps). The library could adjust the bucket rate downward to prevent further
  errors. Conversely, if operating well below limits, it could remain as is.
  This adaptive behavior is an enhancement; at minimum, reacting to errors by
  slowing down is required.

**Avoiding Ban Triggers:** Deribit explicitly warns that repeatedly exceeding
limits and causing errors can lead to an IP ban. Therefore, the library should
take any `"too_many_requests"` response very seriously – after one occurs,
ensure a cool-off such that a flurry of further limit errors is not possible. It
might even stop processing new requests for a short window to allow credit
replenishment. The backoff strategy with exponential delays inherently helps
here. Additionally, the library should count consecutive or recent rate-limit
errors and if they exceed a threshold, escalate the backoff or halt requests
until a certain time has passed.

### Example Pseudocode for Sending Requests

Below is a simplified pseudo-algorithm demonstrating how the library might
handle an incoming request in terms of rate limiting and queueing:

```pseudo
function sendApiRequest(endpoint, params, authContext):
    # Determine which rate bucket to use
    if endpoint.isPrivate:
        if endpoint.isMatchingEngine:
            bucket = buckets[authContext.account].matching_engine
        else:
            bucket = buckets[authContext.account].non_matching
    else:
        bucket = buckets[PublicIP].non_matching  # IP-based bucket for public calls

    if bucket.consume(1):
        # We have capacity, send the request immediately
        response = executeHttpRequest(endpoint, params, authContext)
        if response.status == 429 or response.errorCode == 10028:
            # Hit rate limit unexpectedly, handle error
            handleRateLimitError(bucket, endpoint)
        else:
            return response  # success case
    else:
        # No capacity, enqueue the request to try later
        enqueue(endpoint, params, authContext)
        return Promise/Callback  # indicating will be handled later

# A background task runs periodically (e.g. every 50ms or so) to check buckets and dequeue:
function processQueue():
    for each queuedRequest in queue:
        bucket = determineBucket(queuedRequest)
        if bucket.consume(1):
            executeHttpRequest(queuedRequest.endpoint, queuedRequest.params, queuedRequest.auth)
            dequeue(queuedRequest)
        else:
            continue  # still no tokens, skip to next (which might be a different bucket)
```

In this pseudocode, `handleRateLimitError(bucket, endpoint)` would implement the
backoff logic described earlier (perhaps marking the bucket as saturated and
delaying future `consume` attempts for a while, etc.). The queue is checked
periodically to see if any request can now be sent (since tokens refill over
time). This can also be event-driven (e.g., wake up the scheduler when the next
token will be available).

For WebSocket messages, a similar pattern is used but instead of executing an
HTTP request, it would send a message over the WebSocket connection. The bucket
logic remains the same. For example:

```pseudo
function sendWebSocketMessage(message, connection):
    bucket = buckets[connection].ws_messages  # overall WS message throttle for this connection
    if bucket.consume(1):
        connection.send(message)
    else:
        queueWS[connection].enqueue(message)
```

And a corresponding loop to send queued WS messages when possible.

## Handling Server Responses to Rate Limit Breaches

The library should explicitly handle the server’s feedback for rate limiting:

- **HTTP 429 Responses:** These responses might include a header or body
  indicating the condition. The library should interpret this as “stop sending
  requests for now.” It should not simply retry immediately. Instead, it can:

  - Mark the relevant bucket as over-capacity.
  - If a `Retry-After` header is present, start a timer for that many seconds;
    pause all requests from that bucket until the timer expires (and perhaps
    reject new immediate calls by queuing them).
  - If no explicit wait time is given, use a default (e.g., 1 second for first
    occurrence, and apply exponential backoff for subsequent 429s on that
    bucket).
  - Optionally, call the `get_account_summary` endpoint when things calm down to
    fetch current rate limits, in case the account was upgraded or downgraded
    and the library was using outdated assumptions.

- **WebSocket Error Messages:** In the JSON-RPC over WebSocket, if a request is
  over limit, Deribit is expected to respond with an error object containing
  code 10028 and message "too_many_requests". The library’s WebSocket message
  handler should recognize this and not treat it as a mere call failure that can
  be re-tried immediately by the user’s code. Instead, similar to above, delay
  future sends: e.g., temporarily halt sending on that connection for, say,
  50–100 milliseconds to let the token bucket refill. Because WebSocket allows
  many messages in-flight, it’s possible multiple messages were already sent and
  one triggered an error – the library might need to adjust its internal
  counters if that happens (for instance, drop tokens back if it overshot).
  Usually, if the token bucket logic is correct, this situation should rarely
  occur.

- **Notification to User:** Although primarily internal, the library may provide
  hooks or logging for when it is throttling requests. For example, it could
  emit an event or warning when requests are delayed due to rate limits, or when
  a 429 error is encountered and a backoff is initiated. This transparency can
  help developers using the library to understand performance impacts.

- **Recovering from IP Ban Situations:** If, despite precautions, the client
  gets an IP ban (requests start failing consistently even after long waits, or
  explicit ban message from Deribit), the library can surface this as an error
  state. Automatic recovery from a ban is typically not possible (one must wait
  it out or contact Deribit), so the library’s role is mainly to avoid reaching
  this point. By implementing the conservative strategies above, an IP ban
  should never occur under normal operation.

## Conclusion

By following this specification, a client library will respect all known Deribit
rate limits across both REST and WebSocket APIs. It will handle **IP-based
limits** for public endpoints, **account and API-key limits** for private
endpoints, and apply proper **throttling for message rates and subscriptions**
on WebSocket connections. The use of token bucket algorithms and request queuing
ensures that the library can maximize throughput (using allowed bursts when
available) without violating limits. Built-in backoff and error handling logic
will gracefully manage scenarios where limits are hit, preventing escalations
like bans. This design is intended to be portable to any programming language –
only basic timing, data structure, and networking primitives are required.
Developers integrating with Deribit via this library can do so with confidence
that they will remain within Deribit’s published limits and guidelines, even as
those may evolve (the library can retrieve or update limit parameters as needed
via API).

**Sources:** This spec is based on the official Deribit API documentation and
support articles on rate limits, as well as the Deribit WebSocket guide and
usage policies. It reflects the state of Deribit’s limits as of 2025 and is
intended to be updated if Deribit’s policies change.
