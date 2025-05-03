# Binance Spot API Rate Limiting Rules Specification

This specification outlines how to implement and adhere to Binance Spot API rate
limiting rules in a language-agnostic manner. It covers IP-based limits,
account-specific limits, differences between public and private endpoints,
WebSocket connection constraints, dynamic/weight-based limits, and examples to
illustrate proper usage. The goal is to inform the design of a rate limiter or
request governor so that an application (or LLM-based system) can respect
Binance’s latest rate limits.

## IP-Level Restrictions (Global per-IP Limits)

Global Request Weight Limit: Binance uses a request weight system. Every API
request carries a weight, and each IP address has a maximum total weight it can
consume in a given time window. For the Spot REST API (`/api/\*` endpoints), the
limit is 6,000 weight per minute per IP. In other words, the sum of weights
of all requests from a single IP must not exceed 6000 in any 1-minute window.
This is a hard limit – exceeding it triggers a rate limit error.

Weight Values: Each REST endpoint has an assigned weight (e.g., `weight=1` for
lightweight calls, higher for heavier calls). “Heavier endpoints and endpoints
that operate on multiple symbols have a heavier weight.” For example, a
simple request like ping or fetching a single symbol’s price might have
`weight=1`, whereas requesting all symbols’ data in one call or complex endpoints
might have higher weight (details in Dynamic Rate Limits below).

`HTTP 429` – Too Many Requests: If an IP exceeds the allowed request weight, the
API returns `HTTP 429` (Too Many Requests). The response headers will include
`Retry-After` indicating how many seconds to wait before making new requests.
The error payload typically contains Binance error code `-1003`
(TOO_MANY_REQUESTS) with a message like “Too much request weight used; current
limit is 6000 request weight per minute”. Upon receiving a `429`, the client
must back off and wait – continuing to send requests after a `429` is forbidden.

IP Bans (`HTTP 418`): If rate limits are violated repeatedly or egregiously (e.g.
ignoring `429` responses), Binance will automatically ban the offending IP. A
banned IP gets an `HTTP 418` status code on requests. The ban duration escalates
with repeated offenses (ranging from 2 minutes up to 3 days). The `418` response
also includes a `Retry-After` header indicating how long the ban will last. The
error code `-1003` is used in this case as well, with a message like “Way too much
request weight used; IP banned until .”

Per-IP Counting: Rate limiting is tracked by IP address, not by API key. Even
if using multiple API keys, requests from the same IP aggregate towards the IP’s
limit. The Binance API provides headers in each response to help track usage:
*   `X-MBX-USED-WEIGHT-<interval>` – Indicates the weight consumed by the IP so far in
    the interval (e.g. `X-MBX-USED-WEIGHT-1M` for the last 1 minute). Clients should
    read this header to monitor current usage and avoid hitting 6000/min.
*   (For certain endpoints in the specialized `/sapi` category that use IP limits, the
    header is `X-SAPI-USED-IP-WEIGHT-1M` – see Public vs Private Endpoints for
    context.)

Other IP-Level Rules: In addition to the weight system, Binance’s security
systems may impose additional limits:
*   A Web Application Firewall (WAF) may block an IP with `HTTP 403` if it detects excessive request bursts or patterns
    deemed malicious (exact WAF rules are not disclosed, but “excessive requests
    within 5 minutes” can trigger it). This is a separate mechanism beyond
    official weight limits.
*   Raw request count: Binance’s documentation also alludes to raw request rate limits (independent of weight). For instance,
    historically there was a limit of 1200 requests per minute (unweighted) for
    public endpoints. The current official limit is primarily expressed in weight,
    but clients should avoid sending an extremely high number of low-weight requests
    even if under the weight cap. If too many requests are queued or sent in bursts,
    a `429`/`-1003` can also occur (error message: “Too many requests queued.”).

Summary of IP Limits: Implement a global rate limiter per IP such that in any
1-minute window the total request weight ≤ 6000. If the limit is reached, pause
requests until the window resets (as indicated by `Retry-After` or your own
calculations). Always handle `HTTP 429` by backing off, and never continue
hammering the API after a `429` – doing so risks an IP-level ban.

## Account-Level Restrictions (UID-Based Limits)

In addition to IP limits, Binance imposes certain limits on a per-account basis.
These apply to actions that are tied to your user ID (UID), such as order
placements, and some endpoint usage measured per account rather than per IP.

Order Rate Limits: Trading operations are constrained by an order rate limit per
account. As of the latest rules, an account can place a maximum of 100 orders
per 10 seconds and 200,000 orders per 24 hours. This is often referred to as
the “unfilled order count” limit for spot trading. Every successful new order
counts toward these limits. If you exceed these thresholds, the API will return
`HTTP 429` and an error code `-1015` (TOO_MANY_ORDERS). For example, a response
might say “Too many new orders; current limit is 100 orders per 10 seconds.”
There is no `Retry-After` header in this case – you must simply stop sending new
orders and wait until the 10-second or 24h window resets.
*   Order Count Tracking: The API responds with headers to help track your order usage. Each
    successful order response includes `X-MBX-ORDER-COUNT-<interval>` headers (e.g.
    `X-MBX-ORDER-COUNT-10s`, `X-MBX-ORDER-COUNT-1d`) showing how many orders you’ve
    placed in that interval so far. Clients should monitor these to know how close
    they are to the limit.
*   Filled vs Unfilled Orders: Binance’s rules emphasize unfilled orders. If your orders are consistently being filled (executed), you
    can effectively continue placing orders without hitting the limit. In
    practice, this means the counter for the 24h/10s limits only counts open or
    recently placed orders; fully filled orders might not count against the
    “unfilled order count” limit. Nonetheless, always assume new orders increment
    the counter and do not exceed 100 orders in any 10-second window to be safe.

Account Request Weight (UID) Limits: Most REST endpoints use IP-based limiting,
but some specific endpoints are marked as UID-limited – meaning their rate limit
is tracked per user account rather than per IP. In Binance’s Spot API
(particularly under the `/sapi/\*` endpoints, which are often for
account/sub-account management, asset transfers, etc.), each endpoint will
specify if it’s “IP” or “UID” limited:
*   If an endpoint is UID-limited, the account has its own pool, usually 180,000 weight per minute for that endpoint.
    This very high limit means an individual account could make heavy use of that
    endpoint (across any number of IPs) up to that weight. Importantly, UID-limited
    endpoints do not count against the IP’s 6000 weight quota – they have a separate
    counter tied to the user.
*   If an endpoint is IP-limited, it uses the standard per-IP rules (typically 12000 weight/min for that endpoint if it’s a `/sapi` call,
    as discussed below, or 6000/min if a core `/api` call).

Independent Limits per Endpoint (for `/sapi`): On the signed `/sapi/\*` endpoints
(often called the Signed API or Account API), each endpoint has its own rate
limit bucket if it’s IP-limited (12000/min each) or UID-limited (180000/min
each). This means, for example, calling one UID-limited endpoint won’t
affect the available capacity of another UID-limited endpoint. Similarly, each
IP-limited endpoint under `/sapi` has its own 12000/min budget per IP. This is
different from the core `/api/v3` endpoints which share a combined 6000/min pool
per IP.

Order Operations and Weight: Note that placing orders also consumes request
weight (usually a small amount, e.g. `weight=1` per order placement). However,
certain trade actions might count differently in order count. For instance,
placing a “New OCO” (One-Cancels-the-Other) order is essentially two orders in
one request – Binance counts it as 2 orders toward the order rate limit. Be
mindful that such multi-order operations will hit the order count limit faster
(100 OCO placements would count as 200 orders/10s which would exceed the limit).
Always consult the official documentation for how a given trading request counts
towards order limits.

Account-Level Connection Limits: While not part of REST rate limiting, note that
some limits apply per account on other interfaces. For example, WebSocket
connection attempts are tracked per account as well as per IP (discussed in
WebSocket section). The main account-specific limits to implement in a Spot API
context, however, are the order rate limits and any UID-based request weight
limits for particular endpoints. Ensure your application enforces both the
IP-based weight cap and the account-based order cap.

## Public and Private Endpoints

Binance Spot API distinguishes public (no API key needed) and private (API key
and/or signature required) endpoints. While both types are subject to rate
limiting, the rules and limits can differ:
*   Public Endpoints (Market Data): These include endpoints such as order book snapshots (`GET /api/v3/depth`), recent
    trades, klines/candlesticks, ticker price info, etc. They have no authentication
    required and are typically used for market data. All public endpoints are
    rate-limited on a per-IP basis only, since there is no user context. The
    standard 6000 weight/min per IP applies collectively to all public calls.
    Public endpoints generally have relatively low weight values (often 1 or 2 per
    request) since they return limited data for a single symbol. However, some
    public endpoints allow broad queries (e.g. “all symbols ticker”) which carry
    higher weight (see Dynamic Rate Limits). Example: The 24hr ticker price endpoint
    is public. If you query it for a single symbol, `weight = 2`; if you query all
    symbols at once (no symbol param), `weight = 80`, which heavily consumes your
    6000/min budget. Public data requests should be distributed accordingly to avoid
    hitting the IP limit. No account-level limits apply to public endpoints, and
    Binance encourages using WebSockets for market data to reduce REST calls.
*   Private Endpoints (Account/Trading): These require API key (and often a
    signature), covering actions like placing orders (`POST /api/v3/order`), checking
    account info or trade history, managing withdrawals, etc. Private endpoints
    still consume IP rate limit (unless specified as UID-limited in the docs). In
    fact, most core trading endpoints (under `/api/v3`) share the same 6000/min IP
    pool as public ones. However, private endpoints come with additional
    account-level rules:
    *   Order placement endpoints are subject to the account’s order rate limits (100 orders/10s etc.) as described above. For instance,
        `/api/v3/order` (place order) might have `weight=1` but also increments your order
        counter.
    *   Some private user-data endpoints (especially under `/sapi`) are
        UID-limited instead of IP-limited, as noted. For example, an endpoint for
        querying deposit history might be labeled `Weight(UID): 5` in docs, meaning each
        account can use 180k/min for that call, independent of IP. This is done for
        certain user-account operations to allow high throughput without IP
        interference. When implementing, check Binance’s documentation for each private
        endpoint’s stated limit type (IP or UID) and weight. Example: Fetching account
        trade list (`GET /api/v3/myTrades`) is a private USER_DATA endpoint. Historically
        its weight was 10 or 20 if no filters, but providing specific parameters (like
        an `orderId`) can reduce the weight (to 5). This shows that even private
        endpoints can have dynamic weights based on request complexity. Always refer to
        Binance’s official API reference for the exact weight of each endpoint and any
        conditions affecting it.

Security Implications: Ensure the rate limiter differentiates between public and
private calls primarily for tracking account limits. The IP limiter logic can
treat them all together (except segregating any independent `/sapi` buckets). For
account-level tracking, only private endpoints that affect orders or have
UID-limits need special handling.

Summary: Public endpoints – only enforce the IP weight (6000/min) limit. Private
endpoints – enforce IP weight limit and account-specific limits (order counts,
or UID-based weight where applicable). The API response headers
(`X-MBX-USED-WEIGHT-*` for IP, `X-MBX-ORDER-COUNT-*` for orders,
`X-SAPI-USED-UID-WEIGHT-*` for UID-limited calls) will guide your limiter in
real-time.

## WebSocket Connections and Limits

Binance strongly encourages using WebSockets for real-time data to avoid hitting
REST limits. WebSocket endpoints have their own rate limiting rules, primarily
around connection management and inbound message rate. When implementing a
client that uses Binance WebSocket streams, the following limits must be
respected:
*   Inbound Message Rate: Each WebSocket connection (stream) is limited
    to 5 incoming messages per second. “Incoming messages” here refers to messages
    sent by the client to Binance over the WebSocket. This includes
    subscribe/unsubscribe commands, pings/pongs, and any other requests sent via the
    socket. If the client sends more than 5 messages in a second on a single
    connection, the server will disconnect that connection. In practice, to stay
    safe, space out your subscription commands or heartbeats so that at most 5 occur
    in any 1000ms interval.
*   Connection Disconnects and Bans: If a connection is disconnected for exceeding the message rate, the client should wait before
    reconnecting. Binance notes that IPs which repeatedly hit the message rate and
    cause disconnections may be banned. This implies a temporary IP ban on opening
    new WebSocket connections if abuse is detected, similar in spirit to the REST
    ban. Always adhere to the 5 msg/sec rule to avoid this.
*   Maximum Streams per Connection: A single WebSocket connection can subscribe to up to 1024 streams
    (e.g., 1024 market ticker or trade channels on one socket). This is a very
    high limit allowing multiplexing of many data streams through one connection.
    Design your usage to consolidate subscriptions rather than opening too many
    separate connections.
*   Connection Rate Limit: There is a limit of 300 new connections per 5 minutes per IP. In other words, an IP address should not
    initiate more than 300 WebSocket connection handshakes within any 5-minute
    window. If you exceed this, further connection attempts may be refused or the IP
    could be temporarily blocked. This is to prevent abuse by rapid
    connect/disconnect loops. If your application needs many streams, use the
    1024-stream multiplexing feature to minimize the number of connections. Spread
    out connection attempts over time if you need to establish a large number.
*   Per-Account Connection Limits: Binance applies connection rate checks on both IP
    and user account. (As noted in a recent update, “these limits are checked
    independently for both the account and the IP address.”) This means an
    account cannot circumvent the 300/5min rule by using multiple IPs – the account
    itself should also respect similar limits. Additionally, for other interfaces
    like FIX, there are specific concurrent connection caps per account (not
    directly relevant to Spot WebSockets, but it underscores that an account
    shouldn’t have excessive parallel connections). For Spot WebSocket API usage,
    assume that the 300/5min connection limit applies per account as well, and the 5
    msg/sec is per connection (the account could have multiple connections each
    sending 5 msg/sec, which is allowed as long as each connection stays under its
    threshold).
*   No Weight for Market Data: Consuming market data via WebSocket
    (e.g., order book or trade streams) does not count against your REST request
    weight limits. Simply streaming data is free of the request weight system.
    However, using the WebSocket API (which allows sending trading requests over
    WebSocket instead of REST) does consume weight similarly to REST. For instance,
    establishing a new WebSocket API session might cost a small weight
    (documentation notes connecting to the WebSocket API costs 2 weight, counted
    under `REQUEST_WEIGHT`) – but this is accounted in the same limits we described
    for REST. In summary, pure market streams have no weight, but if you send
    requests on WebSocket (like placing orders via socket), the same weight rules
    apply.

Maintaining Connections: The server will send a ping every 20 seconds and
expects a pong response within 60 seconds. This is standard WebSocket
heartbeat; make sure to reply to pings to avoid involuntary disconnects (these
are separate from rate-limit disconnects). Also note that any given WebSocket
connection may be disconnected by the server after 24 hours of continuous uptime
, so your client should handle reconnections gracefully.

## Dynamic Rate Limits (Weight-Based Variations)

Not all requests are equal – Binance’s rate limiting uses a weighted model where
more complex operations “cost” more of your limit. When implementing a client,
it’s important to account for the dynamic nature of these weights:
*   Per-Endpoint Weight: Each API endpoint has a fixed base weight (documented in
    Binance API reference). Simple endpoints usually have `weight=1`, but many
    endpoints have higher weights. For example, fetching current average price (`GET
    /api/v3/avgPrice`) has `weight=2`. Most account info endpoints have `weight=5`
    or `weight=10`. Always check the official weight value for the endpoints you call; your
    rate limiter should deduct the correct weight from the budget for each request
    type.
*   Multi-Symbol and Bulk Operations: Endpoints that return data for
    multiple symbols or a large dataset have weights that scale with the amount of
    data requested. *“The heavier the request (e.g. querying data from multiple
    symbols), the more weight the request will cost.”* For instance:
    *   The 24hr ticker endpoint (market data) illustrates dynamic weight: querying one symbol
        costs `weight=2`, but querying 100 symbols in one request costs `weight=40`, and
        asking for all symbols (~hundreds of symbols) costs `weight=80`. Your
        application should compute the expected weight – e.g., if a user intends to
        fetch many symbols at once – and ensure it’s within limits.
    *   Similarly, batch endpoints or those with a `limit` parameter may have varying weight. An example
        from a past update: the trade history endpoint `GET /api/v3/myTrades` was `weight=20`
        if no `orderId` or time filter is specified (meaning a broad query), but only
        `weight=5` if an `orderId` is provided (narrower query). In other words, providing
        filters can reduce the weight by limiting the scope of data.
    *   Another example: requesting order book depth with a larger `limit` (e.g., 1000 depth) could have
        higher weight than the default depth (although Binance’s docs now treat depth
        requests uniformly with `weight=50` for certain depths).
*   Adaptive or Algorithmic Limits: Binance employs automated systems (machine learning-based) to detect
    abusive patterns beyond static weights. If a user behaves far outside normal
    usage (even without hitting formal limits), they might be temporarily banned.
    This includes actions like extremely frequent order placements/cancellations
    (especially with no executions), or constantly “front-running” the order book.
    While these ML/WAF limits aren’t something you implement in a client, you should
    be aware that simply staying under documented limits doesn’t guarantee unlimited
    usage – very irregular or abusive behavior can result in bans. For a
    well-behaved application, these should never trigger, but they underscore the
    importance of pacing and not maxing out limits continuously.

Guidance for Implementation: Your rate limiter module should maintain a mapping
of endpoint (or request type) to weight. When a request is about to be made,
calculate its weight (taking into account parameters that affect it). Deduct
that from the IP’s available budget and the account’s budget (if UID-limited).
If the next request would exceed the allowed weight in the current window, the
client must delay that request until the window resets. For order placement,
similarly count against an “orders per 10s” sliding window and per-day counter,
and reject or queue orders that would overflow the limit.

## Illustrative Examples

Below are a few scenarios demonstrating rate limit calculations and how to avoid
violations:
*   Example 1: Weight Calculation for Public Requests – Suppose your
    app is fetching price data for 200 different symbols every minute using the 24hr
    ticker endpoint. Instead of making 200 separate requests (which would be 200 * 2 =
    400 weight, if `weight=2` each), you consider using the batch query. Binance
    allows querying up to 100 symbols per request via the `symbols` parameter. If you
    split into 2 requests of 100 symbols each, each request costs `weight=40` (for 100
    symbols). Two such requests total 80 weight, which is far more efficient than
    400 weight for individual calls. This is well under the 6000/min IP limit.
    However, note that requesting all symbols in one go (which might be ~1000
    symbols) costs `weight=80` per call; doing that 75 times in a minute would be 6000
    weight and hit the limit. Avoid bans: design your polling logic to stay
    comfortably below 6000 – for instance, even 50 full-market requests/min would be
    50 * 80 = 4000 weight, leaving headroom. Always check the `X-MBX-USED-WEIGHT-1M`
    header returned. If you see it approaching 6000, slow down request frequency.
*   Example 2: Order Placement Throttling – Your trading bot wants to place a
    large number of orders rapidly. The account is limited to 100 orders per 10
    seconds. If the bot tries to place 120 orders within 10 seconds, the 101st
    order will fail with a `429` error and a `-1015` error code indicating too many
    orders. To avoid this, implement a sliding window counter: at order submission
    time, count how many orders have been sent in the last 10 seconds. If it’s >=
    100, delay new orders until older ones drop out of the 10s window. Also monitor
    the `X-MBX-ORDER-COUNT-10s` header on responses – if it shows 100, you know
    you’ve hit the cap for that 10s interval and should wait. By spacing out order
    placements (e.g., 10 orders per second maximum), you can stay under the limit
    continuously. Keep an eye on the 24h count as well (200k per day): if your
    system is algorithmically placing thousands of orders per hour, you may need to
    slow down or risk hitting the daily cap.
*   Example 3: Handling `429`/`418` Responses – If your IP hits a weight limit, you get a `429`. For instance, a burst of calls
    causes the IP’s 1-minute weight to reach 6100, triggering a `429` with
    `Retry-After: 5` (seconds). Your client should immediately cease further requests,
    wait the indicated 5 seconds, and then continue (slowly). Failing to respect the
    `429` would result in another `429` or a ban. If you instead receive an `HTTP 418`,
    the ban is already in effect. The response might include `Retry-After: 120`
    meaning the IP is banned for 2 minutes. In this case, do not send any requests
    from that IP until the timer expires. If possible, have your application route
    through a different IP or pause user actions. Remember, ban durations increase
    with each offense (next ban could be longer). The safest strategy is to never
    hit `429` in the first place by pre-emptively limiting yourself to, say, 80% of
    the known limit.
*   Example 4: WebSocket Subscription – You have a WebSocket
    connection and want to subscribe to 10 streams (e.g., 10 different symbols’
    trade updates). If you send 10 separate subscription messages back-to-back,
    you’ll exceed the 5 messages/sec limit on that socket and get disconnected. To
    avoid this, you could send 5 subscribe messages, wait about one second, then
    send the next 5. Alternatively, if the API supports it, send one message that
    batches multiple subscriptions (some Binance WebSocket API methods allow an
    array of streams in one subscribe command, counting still as 1 message). This
    way, you stay under 5 messages in any second. If a disconnection does occur,
    your client should not immediately reconnect in a tight loop – that could hit
    the 300 connections/5min IP limit. Instead, implement a reconnect backoff (e.g.,
    wait a few seconds, then reconnect). Also, consider using fewer connections by
    subscribing to multiple streams on one socket (remember, up to 1024 streams are
    allowed per connection).
*   Example 5: UID-Limited Endpoint Usage – Suppose
    there’s a UID-limited endpoint for getting your account’s asset valuation,
    `weight=5` and limit 180k/min per account. If you have a use case where multiple
    services or IPs (maybe an LLM agent and a separate server) both call this
    endpoint for the same account, they share the 180k/min budget. In practice,
    180k/min is 3000 calls per second of that endpoint, which you’re unlikely to
    exceed. But if you did (maybe via a bug causing a tight loop), Binance would
    start rejecting calls for that account on that endpoint with `429` errors. To be
    safe, even on high-limit endpoints, implement reasonable delays (e.g., do not
    call a UID-limited endpoint in a rapid-fire loop even if it has a high ceiling).

Monitoring and Adaptation: It’s recommended to regularly call the `GET
/api/v3/exchangeInfo` endpoint, which returns the current rate limit rules
(`rateLimits` array) for weight, orders, etc. This allows your application to
automatically adjust if Binance changes the limits. Also pay attention to the
response fields or headers that show your current usage (some WebSocket API
responses include a `rateLimits` status field as shown in examples). By staying
informed in real-time, an LLM or any agent interacting with the API can
dynamically throttle itself before hitting the hard limits.

Conclusion: Adhering to these rules will ensure your application remains within
Binance’s allowed usage. Implement both IP-level and account-level rate
limiters, account for the weight of each request (especially multi-symbol
queries), and handle error responses gracefully. By following this
specification, an LLM-based system or any client will be equipped to use the
Binance Spot API effectively without interruptions or bans.

Sources: Official Binance API documentation and support articles were used to
compile these rules. This spec reflects the state of Binance Spot API
limits as of 2025 and should be updated if Binance’s policies change.
