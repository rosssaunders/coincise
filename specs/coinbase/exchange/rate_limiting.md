Great, I’ll prepare a formal, language-agnostic specification for implementing
rate limiting rules in an API client library for the Coinbase Exchange API. This
will cover both REST and WebSocket APIs, addressing public and private
endpoints, with detailed handling for IP-based, account-based, and API-key-based
limits. It will also include examples of specific rate limits and logic for
dynamically adjusting based on server responses when available.

I’ll let you know once the spec is ready for your review.

# Coinbase Exchange API Rate Limits Specification

This specification covers rate-limiting for the Coinbase Exchange (Coinbase
Pro/Advanced Trade) REST and WebSocket APIs. Limits are enforced per IP,
account/profile, and API key as follows:

- **REST API – Public endpoints (unauthenticated)** are rate-limited by client
  IP. By default, each IP may make **10 requests/sec** (sustained) with short
  bursts up to **15 requests/sec**.
- **REST API – Private endpoints (authenticated)** are rate-limited by account
  (profile) ID. Each profile is allowed **15 requests/sec** (sustained) with
  bursts up to **30 requests/sec**. Note that multiple API keys under the same
  profile share this limit; do not assume separate buckets per key.
- **Custom endpoints**: Certain private endpoints override the above limits. For
  example, the `/fills` endpoint is limited to **10 requests/sec** (burst 20)
  per profile. Similarly, endpoints like `/loans` are limited (e.g. 10 req/sec
  per profile) while non-private endpoints (e.g. `/loans/assets`) may not count
  toward these limits.

Implementation must maintain separate token-bucket counters for each relevant
key (IP or profile). For public calls, the bucket is keyed by IP. For private
calls, the bucket is keyed by the profile ID returned in the authentication
credentials. Each bucket has a refill rate (e.g. 10 or 15 tokens/sec) and a
capacity equal to the burst limit. Before sending a request, the client should
**consume a token** (or otherwise check the counter); if insufficient, the
client must delay or queue the request. In practice, libraries often serialize
requests or sleep to match the rate.

On receiving a 429 (“Too Many Requests”) error or when the bucket is empty, the
client must back off. Coinbase returns HTTP 429 and typically includes a
`Retry-After` header with a wait time. Implement exponential backoff or fixed
delays per the `Retry-After` value. Always respect the headers: for example,
response headers may include a **`CB-Ratelimit-Remaining`** count (or similar)
to guide pacing.

_Example:_ If 20 requests have been sent in the last second on a public
endpoint, further calls should wait until tokens refill. Once a token is
available, the request proceeds. In bursts, up to 15 (public) or 30 (private)
requests may be sent almost instantaneously if tokens were previously stored.

## API Key and Account Limits

Coinbase enforces the above limits per account profile, not per API key. In
other words, all private requests using any keys under the same Coinbase account
count toward the **same** profile-level limit. As one Coinbase engineer
summarized, “the limit is linked to the API key,” so multiple apps using **the
same profile ID** must share the limit. If an application uses multiple API keys
(with different profiles), each profile’s bucket is independent.

Coinbase does _not_ publicly document tiered rate limits based on trading volume
or account status. There is no official higher-tier limit for large-volume
traders on the standard REST API. (Coinbase does offer special managed programs,
but general API rate limits remain the same.) If any tiered allowances exist,
they would likely be signaled dynamically (e.g. via headers) or handled
privately, so clients should adapt to the returned headers or server responses
rather than hard-coding tiers.

## WebSocket API Rate Limits

WebSocket feeds have their own limits for connections, subscriptions, and
message traffic:

- **Connections per IP:** New WebSocket connections are limited to **1
  connection per second per IP address**. Do not open connections faster than
  this rate. (In practice, space out reconnect attempts.)
- **Maximum subscriptions per connection:** Each WebSocket connection may
  subscribe to up to **20 channels/topics** concurrently. If more feeds are
  needed, the client must open additional connections (subject to the connection
  limits). For example, subscribing to 25 symbols requires at least 2
  connections.
- **Client message rate:** On an established WebSocket connection, the client
  should not send more than **100 messages per second per IP**. “Messages”
  include subscription or unsubscription requests and any other client-initiated
  messages. This is a safety limit to avoid flooding the server (it corresponds
  to the token bucket for WebSocket traffic).

Clients must track WebSocket message sends in real time. If the limit is
reached, the client should buffer or reject further messages until the next
second. Note that this message limit is distinct from REST requests; it applies
to WebSocket control messages on each connection.

## Enforcement and Adaptation

- **Token Bucket Model:** For both REST and WebSocket limits, use a token-bucket
  algorithm (or equivalent counters) per dimension (IP or profile). For example,
  for public REST, refill 10 tokens per second up to a capacity of 15; for
  private REST, refill 15/s up to 30. For WebSocket messages, refill 100 tokens
  per second up to 100. Each outgoing request/ message consumes one token from
  the appropriate bucket.

- **Burst Behavior:** The “burst” value indicates the bucket size. A brief burst
  (at most the burst count) is allowed if tokens have accumulated. After a
  burst, tokens may reach zero, and the refill rate governs the sustained pace.

- **Dynamic Limits:** Coinbase may communicate dynamic limits via HTTP headers
  or WebSocket control messages. Always inspect the response for headers like
  `Retry-After` or any `CB-RateLimit-*` fields. If a response indicates a new
  limit or a “slow down” (HTTP 429 with instructions), adjust the client rate
  accordingly (e.g. pause until the given reset time).

- **Error Handling:** If a 429 error occurs, the client should catch it, read
  the `Retry-After` header if present, and wait before retrying. Implement
  automatic retry logic with backoff for robustness. For WebSockets, a “rate
  limit exceeded” may manifest as connection closures; in that case, pause
  before reconnecting.

- **Best Practices:** Spread out requests rather than firing bursts exactly at
  the limit. For order book or trading data, use market data feeds and webhooks
  where possible instead of aggressive polling. Queue requests on the client
  side to ensure compliance. The goal is to **prevent** hitting the 429 limit.

## Example Limits

According to Coinbase’s documentation, the limits (requests per second with
burst) are:

- **REST (Public):** 10 rps per IP (burst 15).
- **REST (Private):** 15 rps per profile (burst 30).
- **REST (/fills):** 10 rps per profile (burst 20).
- **WebSocket connections:** 1 new connection/s per IP.
- **WebSocket subscriptions:** 20 topics per connection.
- **WebSocket messages:** 100 messages/s per connection (per IP).

These example values should be used to initialize the rate-limiter buckets.
(Always check the latest official docs in case limits change.)

**References:** Official Coinbase docs indicate public endpoints are
IP-throttled and private endpoints by profile ID. The documented rate values
(10/15 for REST) and custom limits (e.g. 10/20 on `/fills`) are given explicitly
in Coinbase’s REST API Rate Limits doc. The WebSocket limits (1 connection/s, 20
subscriptions, 100 messages/s) are noted in Coinbase’s API guidelines. Together,
these form the basis for any language-agnostic client rate-limiting logic.
