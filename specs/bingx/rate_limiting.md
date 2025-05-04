# Rate Limiting Implementation Specification for BingX API Client

## Overview and Scope

This specification outlines a programming-language-agnostic design for enforcing
rate limits in a BingX crypto exchange API client. It covers **all REST and
WebSocket API endpoints (public and private)**, ensuring compliance with BingX’s
official rate limiting rules. The implementation will enforce limits at multiple
levels (IP address, account/User ID, and API key) and handle both REST HTTP
calls and WebSocket message rates. By following this spec, the client library
will avoid exceeding BingX’s limits and gracefully handle the logic for
throttling requests, managing multiple API keys, and maintaining stable
WebSocket subscriptions.

**Key Rate Limit Categories:**

- **IP Address-Level Limits:** Caps on requests counted per source IP,
  regardless of account or API key. BingX applies separate IP-based buckets for
  public market data vs. private account endpoints.
- **Account/User-Level Limits (UID-Level):** Caps on requests per user account
  (UID), usually defined per endpoint or operation for private APIs. All API
  keys under the same account share these limits.
- **API Key-Level Considerations:** While BingX’s documented limits are
  primarily per account, the client should track usage per API key as well.
  Multiple keys from the **same account share the account’s limits**, whereas
  keys from **different accounts have separate user-level limits** (but still
  count toward IP limits).

Each of these categories is detailed below along with specific limit values and
implementation guidelines.

## REST API Rate Limits

BingX REST API endpoints are divided into **public (market data)** and **private
(trading/account)** endpoints. The client must enforce rate limits for both
types: public endpoints have a **shared IP limit**, and private endpoints have
both **per-endpoint user limits** and a **shared IP limit** for all account
actions. The following sections detail these limits.

### Public REST Endpoints (Market Data)

Public REST endpoints provide market data (ticker prices, order book depth,
recent trades, etc.) and do not require API key authentication. All such
**market data requests share a combined IP limit**:

- **IP Limit for Public Endpoints:** **100 requests per 10 seconds per IP**.
  This applies to all public market data endpoints across Spot and Futures. In
  other words, any single IP address can make up to 100 public data requests in
  a 10-second window (an average of 10 requests/sec, with bursts up to 100
  within any 10s period).

**Endpoints Covered:** This IP limit covers _all_ Spot and Futures market data
REST endpoints, including but not limited to:

- **Spot Market Data:** e.g.

  - `GET /openApi/spot/v1/common/symbols` (trading symbol list)
  - `GET /openApi/spot/v1/market/depth` (order book depth)
  - `GET /openApi/spot/v1/market/trades` (recent trades)
  - `GET /openApi/spot/v1/market/kline` (candlesticks)
  - `GET /openApi/spot/v1/ticker/24hr` (24h ticker)
  - `GET /openApi/spot/v1/ticker/price` (latest price)
  - `GET /openApi/spot/v1/ticker/bookTicker` (best bid/ask)
  - Historical market data endpoints (e.g. `/openApi/market/his/v1/kline`,
    `/openApi/market/his/v1/trade`).

- **Futures (Perpetual Swap) Market Data:** e.g.

  - `GET /openApi/swap/v2/quote/contracts` (contract information)
  - `GET /openApi/swap/v2/quote/depth` (order book depth)
  - `GET /openApi/swap/v2/quote/trades` (recent trades)
  - `GET /openApi/swap/v2/quote/ticker` (24h ticker)
  - `GET /openApi/swap/v2/quote/price` (last price)
  - `GET /openApi/swap/v2/quote/openInterest` (open interest)
  - `GET /openApi/swap/v2/quote/fundingRate` (funding rate history)
  - etc.

**Enforcement:** The client should maintain a counter for all public-data
requests made in the last 10 seconds for a given IP. If a new request would
exceed 100 calls within a 10s window, the client must delay that request until
the window resets (or use a token-bucket algorithm refilling at 10 req/sec) to
stay within **100/10s per IP**. These public endpoints do not have individual
endpoint limits or user-specific limits (since they are not tied to an account).
Only the aggregate IP rate matters for them.

### Private REST Endpoints (Account/Trading)

Private REST endpoints (those that require an API key, such as placing orders,
querying account balances, etc.) have stricter per-endpoint limits and also
count toward a separate IP limit. The client must enforce both **per-user (UID)
limits on each endpoint** and a **global IP threshold for all private
requests**.

**IP Limit for Private Endpoints:** As of April 25, 2024, BingX increased the
total rate limit for _account (private) API calls_ to **1000 requests per 10
seconds per IP**. This means all private API calls from one IP combined should
not exceed 1000 calls in any 10-second window. (This was phased in from 150 →
300 → 600 → 1000 requests/10s during April 2024.) The client should enforce this
by tracking all authenticated requests made in the last 10 seconds on that IP
and throttling if the count approaches 1000.

**Per-Endpoint User Limits:** In addition to the IP cap, each private endpoint
or category of operation has its own **per-second limit per account (UID)**.
These define how many times a given account can call that specific endpoint (or
perform that action) in a 1-second interval. Some endpoints have different
limits depending on the user’s role (e.g. “Regular” users vs. “Trader” accounts
in BingX’s copy-trading system). The client must ensure that for each account,
no endpoint’s calls exceed the allowed rate. If multiple API keys belong to the
same account, their combined usage of an endpoint must respect that account’s
limit.

Below, we detail the rate limits for **all private REST endpoints** on BingX
Spot and Futures APIs, based on the latest official data:

#### Spot API – Private Endpoints Rate Limits

For Spot trading and account endpoints, BingX defines specific **requests per
second (per UID)** limits. The table below lists each major Spot private
endpoint and its allowed rate for a regular user versus a copy-trading “Trader”
account (if applicable). All limits are on a **per-account basis** (UID).

Additionally, remember that all these calls also count toward the overall
**1000/10s per IP** bucket for private calls.

| **Category**             | **Endpoint (HTTP Path)**                                                                                   | **Limit – Regular User** | **Limit – Trader Account** |
| ------------------------ | ---------------------------------------------------------------------------------------------------------- | ------------------------ | -------------------------- |
| **Orders**               | Place order – `/openApi/spot/v1/trade/order`                                                               | 5 requests / 1s          | 1 request / 1s             |
|                          | Place **batch** orders – `/openApi/spot/v1/trade/batchOrders`                                              | 2 requests / 1s          | 1 request / 1s             |
|                          | Cancel order – `/openApi/spot/v1/trade/cancel`                                                             | 5 requests / 1s          | 1 request / 1s             |
|                          | Cancel **multiple** orders – `/openApi/spot/v1/trade/cancelOrders`                                         | 2 requests / 1s          | 1 request / 1s             |
|                          | Cancel all orders by pair – `/openApi/spot/v1/trade/cancelOpenOrders`                                      | 2 requests / 1s          | 1 request / 1s             |
|                          | Cancel & replace order – `/openApi/spot/v1/trade/order/cancelReplace`                                      | 2 requests / 1s          | 1 request / 1s             |
| **Order Queries**        | Query order status – `/openApi/spot/v1/trade/query`                                                        | 10 requests / 1s         | 10 requests / 1s           |
|                          | Query open orders – `/openApi/spot/v1/trade/openOrders`                                                    | 10 requests / 1s         | 10 requests / 1s           |
|                          | Query order history – `/openApi/spot/v1/trade/historyOrders`                                               | 10 requests / 1s         | 10 requests / 1s           |
|                          | Query trade fills (user’s trades) – `/openApi/spot/v1/trade/myTrades`                                      | 5 requests / 1s          | 5 requests / 1s            |
| **Account Info**         | Query account balance – `/openApi/spot/v1/account/balance`                                                 | 5 requests / 1s          | 5 requests / 1s            |
|                          | Query trading fee rate – `/openApi/spot/v1/user/commissionRate`                                            | 2 requests / 1s          | 2 requests / 1s            |
|                          | Cancel all orders after time – `/openApi/spot/v1/trade/cancelAllAfter`                                     | 2 requests / 1s          | 2 requests / 1s            |
| **Internal Transfers**   | Transfer assets between user’s own accounts – `/openApi/api/v3/post/asset/transfer` (e.g. Spot to Futures) | 2 requests / 1s          | 2 requests / 1s            |
|                          | Query internal transfer history (own accounts) – `/openApi/api/v3/asset/transfer`                          | 10 requests / 1s         | 10 requests / 1s           |
|                          | Transfer to another user’s account – `/openApi/wallets/v1/capital/innerTransfer/apply`                     | 2 requests / 1s          | 2 requests / 1s            |
|                          | Query transfer records to other accounts – `/openApi/wallets/v1/capital/innerTransfer/records`             | 10 requests / 1s         | 10 requests / 1s           |
| **Deposits/Withdrawals** | Get all coin info (for deposits) – `/openApi/wallets/v1/capital/config/getall`                             | 2 requests / 1s          | 2 requests / 1s            |
|                          | Get deposit history – `/openApi/api/v3/capital/deposit/hisrec`                                             | 10 requests / 1s         | 10 requests / 1s           |
|                          | Withdraw (create withdrawal) – `/openApi/wallets/v1/capital/withdraw/apply`                                | 2 requests / 1s          | 2 requests / 1s            |
|                          | Get withdrawal history – `/openApi/api/v3/capital/withdraw/history`                                        | 10 requests / 1s         | 10 requests / 1s           |
|                          | Get deposit address (main account) – `/openApi/wallets/v1/capital/deposit/address`                         | 2 requests / 1s          | 2 requests / 1s            |
|                          | Query deposit risk records – `/openApi/wallets/v1/capital/deposit/riskRecords`                             | 2 requests / 1s          | 2 requests / 1s            |
| **Sub-Accounts**         | Create sub-account – `/openApi/subAccount/v1/create`                                                       | 1 request / 1s           | 1 request / 1s             |
|                          | Query account UID – `/openApi/account/v1/uid`                                                              | 10 requests / 1s         | 10 requests / 1s           |
|                          | List sub-accounts – `/openApi/subAccount/v1/list`                                                          | 1 request / 1s           | 1 request / 1s             |
|                          | Query sub-account spot assets – `/openApi/subAccount/v1/assets`                                            | 5 requests / 1s          | 5 requests / 1s            |
|                          | Create sub-account API key – `/openApi/subAccount/v1/apiKey/create`                                        | 5 requests / 1s          | 5 requests / 1s            |
|                          | Query sub-account API keys – `/openApi/sub-account/v1/apiKey/query`                                        | 5 requests / 1s          | 5 requests / 1s            |
|                          | Edit sub-account API key – `/openApi/subAccount/v1/apiKey/edit`                                            | 5 requests / 1s          | 5 requests / 1s            |
|                          | Delete sub-account API key – `/openApi/subAccount/v1/apiKey/del`                                           | 5 requests / 1s          | 5 requests / 1s            |
|                          | Freeze/Unfreeze sub-account – `/openApi/subAccount/v1/updateStatus`                                        | 1 request / 1s           | 1 request / 1s             |
|                          | Authorize sub-account transfer – `/openApi/account/v1/innerTransfer/authorizeSubAccount`                   | 10 requests / 1s         | 10 requests / 1s           |
|                          | Sub-account transfer (master to sub) – `/openApi/wallets/v1/capital/subAccountInnerTransfer/apply`         | 5 requests / 1s          | 5 requests / 1s            |
|                          | Create sub-account deposit address – `/openApi/wallets/v1/capital/deposit/createSubAddress`                | 5 requests / 1s          | 5 requests / 1s            |
|                          | Query sub-account deposit address – `/openApi/wallets/v1/capital/subAccount/deposit/address`               | 2 requests / 1s          | 2 requests / 1s            |
|                          | Query sub-account deposit records – `/openApi/wallets/v1/capital/deposit/subHisrec`                        | 5 requests / 1s          | 5 requests / 1s            |
|                          | Query sub-account transfer records – `/openApi/wallets/v1/capital/subAccount/innerTransfer/records`        | 10 requests / 1s         | 10 requests / 1s           |

**Notes:** All above limits are **per second per account (UID)**. “Regular User”
refers to standard accounts, while “Trader” refers to accounts that are part of
BingX’s copy-trading program (designated traders that others can follow).
Certain endpoints (especially copy-trader specific ones) are restricted or have
lower limits for regular users (e.g. some copy-trading endpoints show "No
access" for regular users). In the Spot API above, most differences are in order
placement/cancellation rates (5/s vs 1/s). Query endpoints generally allow the
same rate for both user types.

#### Futures (Perpetual Swap) API – Private Endpoints Rate Limits

For Perpetual Futures (USDT-M swaps) API, rate limits are similarly defined.
Below are the major private endpoints for futures and their per-account
allowances:

| **Category**           | **Endpoint (HTTP Path)**                                                           | **Limit – Regular User** | **Limit – Trader Account** |
| ---------------------- | ---------------------------------------------------------------------------------- | ------------------------ | -------------------------- |
| **Account Info**       | Query futures account balance – `/openApi/swap/v2/user/balance`                    | 5 requests / 1s          | 5 requests / 1s            |
|                        | Query positions – `/openApi/swap/v2/user/positions`                                | 5 requests / 1s          | 5 requests / 1s            |
|                        | Query income (PnL history) – `/openApi/swap/v2/user/income`                        | 5 requests / 1s          | 5 requests / 1s            |
|                        | Export income history – `/openApi/swap/v2/user/income/export`                      | 5 requests / 1s          | 5 requests / 1s            |
|                        | Query trading fee rate – `/openApi/swap/v2/user/commissionRate`                    | 5 requests / 1s          | 5 requests / 1s            |
| **Order Placement**    | Place order – `/openApi/swap/v2/trade/order`                                       | 5 requests / 1s          | 1 request / 1s             |
|                        | Place **batch** orders – `/openApi/swap/v2/trade/batchOrders`                      | 5 requests / 1s          | 1 request / 1s             |
| **Order Cancellation** | Cancel order – `/openApi/swap/v2/trade/order` (DELETE)\*                           | 5 requests / 1s          | 1 request / 1s             |
|                        | Cancel **batch** orders – `/openApi/swap/v2/trade/batchOrders` (DELETE)\*          | 5 requests / 1s          | 1 request / 1s             |
|                        | Close all positions (one-click) – `/openApi/swap/v2/trade/closeAllPositions`       | 5 requests / 1s          | 5 requests / 1s            |
|                        | Cancel all orders – `/openApi/swap/v2/trade/allOpenOrders`                         | 5 requests / 1s          | 5 requests / 1s            |
| **Order Queries**      | Query open orders – `/openApi/swap/v2/trade/openOrders`                            | 5 requests / 1s          | 5 requests / 1s            |
|                        | Query specific order – `/openApi/swap/v2/trade/order` (GET)                        | 5 requests / 1s          | 5 requests / 1s            |
|                        | Query all order history – `/openApi/swap/v2/trade/allOrders`                       | 5 requests / 1s          | 5 requests / 1s            |
|                        | Query trade fills (user trade history) – `/openApi/swap/v2/trade/allFillOrders`    | 5 requests / 1s          | 5 requests / 1s            |
|                        | Query user’s liquidation orders – `/openApi/swap/v2/trade/forceOrders`             | 10 requests / 1s         | 10 requests / 1s           |
| **Position/Margin**    | Query margin mode – `/openApi/swap/v2/trade/marginType` (GET)                      | 2 requests / 1s          | 2 requests / 1s            |
|                        | Switch margin mode – `/openApi/swap/v2/trade/marginType` (POST)                    | 2 requests / 1s          | 2 requests / 1s            |
|                        | Query leverage – `/openApi/swap/v2/trade/leverage` (GET)                           | 5 requests / 1s          | 5 requests / 1s            |
|                        | Set leverage – `/openApi/swap/v2/trade/leverage` (POST)                            | 2 requests / 1s          | 2 requests / 1s            |
|                        | Adjust isolated margin – `/openApi/swap/v2/trade/positionMargin`                   | 2 requests / 1s          | 2 requests / 1s            |
|                        | Set position mode (One-way or Hedge) – `/openApi/swap/v1/positionSide/dual` (POST) | 2 requests / 1s          | 2 requests / 1s            |
|                        | Query position mode – `/openApi/swap/v1/positionSide/dual` (GET)                   | 2 requests / 1s          | 2 requests / 1s            |
|                        | Close position by ID – `/openApi/swap/v1/trade/closePosition`                      | 5 requests / 1s          | 5 requests / 1s            |
| **Advanced Orders**    | Cancel & replace order – `/openApi/swap/v1/trade/cancelReplace`                    | 5 requests / 1s          | 5 requests / 1s            |
|                        | Batch cancel & replace – `/openApi/swap/v1/trade/batchCancelReplace`               | 2 requests / 1s          | 2 requests / 1s            |
|                        | Cancel all orders after time – `/openApi/swap/v2/trade/cancelAllAfter`             | 2 requests / 1s          | 2 requests / 1s            |
|                        | **Test order** (validation only) – `/openApi/swap/v2/trade/order/test`             | 5 requests / 1s          | 5 requests / 1s            |

(\*Note: The Cancel order and Cancel batch endpoints in Futures use the same
paths as placing order(s); the rate limits apply similarly to those actions.)

**Notes:** Similar to Spot, these limits are per account. Regular users can
place/cancel up to 5 orders per second, whereas designated “Traders” (copy-trade
leaders) are restricted to 1 order per second on those endpoints. Query
endpoints and account info have higher or equal limits for both user types. All
calls count toward the 1000/10s IP pool for private calls as well.

#### Copy Trading API – Private Endpoints

BingX’s Copy Trading API includes endpoints for copy-trade masters (“Traders”)
to manage their positions. These have their own limits, and many are not
accessible to regular users. Key endpoints include:

- **Perpetual Copy Trading:**

  - Query trader’s current copy orders –
    `/openApi/copyTrading/v1/swap/trace/currentTrack`: **No access** for regular
    users, **5 requests/1s** for traders.
  - Close a copy position (by order) –
    `/openApi/copyTrading/v1/swap/trace/closeTrackOrder`: **5 requests/1s**
    (Trader only).
  - Set TP/SL for a copy order – `/openApi/copyTrading/v1/swap/trace/setTPSL`:
    **5 requests/1s** (Trader only).

- **Spot Copy Trading:**

  - Place spot copy trade order (sell) –
    `/openApi/copyTrading/v1/spot/trader/sellOrder`: **1 request/1s** (Trader
    only).

Regular users (followers) generally do not call these trader endpoints; their
copy trading actions (like following/unfollowing, which are not listed above)
would have their own limits if exposed via API (not given in the excerpt). The
client should ensure only authorized trader accounts use the trader-specific
endpoints, and enforce the above per-second limits. All these calls also fall
under the **private 1000/10s IP limit**.

**Up-to-date Reference:** The above REST limits have been verified against
official BingX documentation and announcements. If BingX updates their API (new
endpoints or changed limits), these values should be rechecked against the
latest docs or system messages.

### REST Rate Limit Enforcement Logic

To implement the above in a client library, use the following approach:

- **Request Classification:** Determine for each outgoing request which category
  it falls into:

  - Public (market data) vs Private (account/trade).
  - If private, identify the specific endpoint to apply the correct per-account
    limit.

- **Counters/Buckets:** Maintain counters or token buckets for:

  - Public-IP: track count of public requests per IP in the last 10 seconds.
  - Private-IP: track count of _all_ private requests per IP in last 10 seconds.
  - Private-Endpoint-UID: track count of requests per user for each endpoint (or
    endpoint category) in the last 1 second.

- **Throttling Mechanism:** If a counter is at its limit, the next request
  should wait:

  - Use a scheduling queue or sleep/delay to ensure the interval is respected.
    For example, if an account has already placed 5 Spot orders within one
    second, delay any new order request from that account until the next second.
  - The IP-based buckets (100/10s or 1000/10s) can be enforced with a sliding
    window or token bucket. For instance, the client can allow 100 tokens per 10
    seconds for the IP’s public requests; if exhausted, pause new public
    requests until tokens replenish.

- **Concurrent Keys:** If multiple API keys (possibly from different accounts)
  are used, the client must track each account’s usage separately (distinct UID
  counters), but still aggregate their calls for IP limits. This ensures one
  account’s activity doesn’t throttle another’s beyond what the shared IP cap
  necessitates.
- **Handling 429/Rate-Limit Errors:** In case the client underestimates a window
  or in a race condition a limit is hit, BingX may respond with an error (HTTP
  429 or an error code). The client should catch this and back off. (BingX’s
  error code for too many WebSocket subscriptions is 80403; for REST it might
  respond with an error message indicating rate limit exceeded. The client
  should treat any such response as a signal to slow down and adjust counters
  accordingly.)
- **Clock Sync:** Ensure the system clock is accurate, as BingX may use server
  time for windows. Using the timestamp from responses or NTP sync can help keep
  the timing of the 1s or 10s windows aligned.

By implementing the above, the client will systematically respect BingX’s REST
rate limits across all endpoints.

## WebSocket API Rate Limits

BingX provides WebSocket APIs for real-time data. There are **public WebSocket
channels** (e.g. market tickers, order book updates) and possibly **private
channels** (e.g. account order updates) available. Rate limiting for WebSockets
involves controlling:

- The number of simultaneous connections and subscriptions.
- The rate of outgoing messages (subscriptions, unsubscriptions, pings, or
  orders if trading via WS is supported).

Although WebSocket streaming doesn’t have “requests” in the same way as REST,
BingX imposes limits to ensure stability. The client library should implement
the following:

### Connection and Subscription Limits

- **Max WebSocket Connections per IP:** A single IP address can open up to **60
  WebSocket connections** to BingX’s API servers for Perpetual Futures.
  Exceeding this (attempting a 61st connection from the same IP) will fail to
  connect. The client should enforce this by tracking active connections and not
  exceeding 60. (It’s wise to assume the 60 connection limit applies across all
  BingX WS endpoints, including Spot, to avoid IP-based connection refusal.)
- **Max Subscriptions per Connection:** Each WebSocket connection can subscribe
  to a maximum of **200 topics** (streams) concurrently. A “topic” is typically
  one market data stream or channel (e.g., a specific trading pair’s ticker or
  depth, or a user’s order update channel). If the client tries to subscribe to
  more than 200 topics on one connection, BingX will return an error code
  **80403** indicating too many subscriptions. The client should therefore limit
  the number of subscribed streams per socket to 200. If an application needs to
  subscribe to more than 200 channels, it must spread them across multiple
  WebSocket connections (while staying under the 60 connections/IP limit).
- **Subscription Management:** The client should keep a count of active
  subscriptions on each connection. If an attempt to add a subscription would
  exceed 200, the library should either open a new connection (if available) or
  queue the subscription until a slot is free. Likewise, if many subscriptions
  are no longer needed, the client can unsubscribe to free up capacity. It’s
  recommended to not hover at exactly 200 topics; leave a little headroom if
  possible to account for spontaneous needed subscriptions (or BingX’s system
  messages).

### Message Rate Limits (WebSocket Outgoing Messages)

While the majority of WebSocket traffic is incoming data, the client also sends
messages (subscribe/unsubscribe requests, pings, and possibly orders or actions
if supported). **BingX’s official documentation does not explicitly specify a
numeric rate limit for outgoing messages**, but it’s crucial to throttle
outgoing messages to avoid flooding the server. The client should implement a
safe policy such as:

- **Throttle Outgoing Commands:** Limit the rate of send operations (subscribe,
  unsubscribe, ping, etc.) to a reasonable number, e.g., no more than **20-50
  messages per second per connection**. This is a conservative safeguard; if
  BingX has an internal limit (for example, some exchanges use \~50 msg/sec),
  this ensures we stay under it. If the user tries to send a large number of
  subscription commands at once, the client can batch or delay them slightly
  (e.g., spread out 200 subscription messages over a few seconds rather than all
  in one instant).
- **Concurrent Subscription Bursts:** When (un)subscribing to many topics,
  insert small delays (tens of milliseconds) between messages or use an async
  queue to send one message at a time. This prevents hitting any unseen burst
  limit and avoids congesting the socket.
- **Ping/Pong Heartbeats:** Ensure heartbeats (if required by BingX) are sent at
  the recommended interval and not more frequently. (For instance, if the server
  expects a ping every 30 seconds, don’t send them more often than necessary.)
- **Order via WebSocket (if applicable):** If the API supports placing orders
  through WebSocket (not explicitly documented in the provided info, but if it
  exists), those messages should be treated similar to REST order placement in
  terms of rate limiting (e.g., enforce the same 5 orders/sec per user limit on
  them). The client should integrate such actions into the same account-level
  rate counters to avoid bypassing REST limits via WS.

### WebSocket Private Channel Considerations

If BingX provides private WS channels (such as account balance updates or order
execution updates), subscribing to these would count against the 200-topic limit
per connection. Typically, an authenticated subscription (requiring an API key
signature) might be used for user-specific data. The client should:

- Handle authentication messages as per BingX specification (usually a login or
  auth message with API key, timestamp, signature).
- Count each user-specific subscription as part of the 200 topics.
- Possibly maintain separate connections for private vs public data for
  organizational clarity (not strictly required, but could be useful if
  different handling).
- Protect these subscription actions with the same message throttle. (Private
  subscriptions are usually few, so not an issue unless re-subscribing often.)

### WebSocket Rate Limit Enforcement Logic

- **Outgoing Message Counter:** Maintain a short-window counter for messages
  sent on each connection (e.g., per second). If the user code enqueues many
  messages, the client should pace them. For example, if allowing 30
  messages/sec, then sending 30 subscriptions should take at least 1 second.
  This can be implemented with a token bucket where each message requires a
  token and tokens refill at the set rate.
- **Connection Counter:** Track active WebSocket connections per IP; refuse or
  delay new connections if the limit (60) would be exceeded.
- **Subscription Counter:** Track subscriptions per connection; if at 200,
  either automatically open a new connection (if under IP limit) for additional
  topics or wait until some topics are unsubscribed before adding more.
- **Error Handling:** If the server returns an error for too many subscriptions
  or messages:

  - Error code `80403` for subscription overflow is explicitly documented. On
    receiving this, the client should log it, and not attempt further
    subscriptions on that connection. It could automatically fall back to
    opening another connection for the remaining topics.
  - If the server disconnects or sends a rate-limit notice due to message flood
    (not given, but e.g., a <code>{"error": ...}</code> message), the client
    should treat it like a 429 – back off and reconnect after a cool-down.

- **Reconnection logic:** In the event of a disconnect (which could happen if
  limits are exceeded or network issues), the client should support
  auto-reconnecting and re-subscribing to lost topics. This includes re-checking
  that it doesn’t immediately resubscribe to 200 topics in one burst on
  reconnect (throttle the re-subscriptions).

By implementing these measures, the WebSocket client will adhere to BingX’s
limits, ensuring stable real-time data flow without hitting subscription caps or
being disconnected for sending too many messages.

## Tiered Rate Limits and User Roles

BingX’s rate limits are mostly uniform, but they have distinctions based on
**user role** in certain contexts:

- The **“Regular User” vs “Trader”** limits shown above indicate that accounts
  classified as “Trader” (typically, copy-trading lead traders on BingX) have
  different limits on some endpoints. Notably, trader accounts are allowed
  **lower** request rates for order placement (likely to prevent excessive trade
  signals to followers), and they have access to copy-trading endpoints that
  regular users do not. Regular users have higher rate allowances for placing
  their own orders (5/s) than trader accounts do (1/s).
- Aside from the copy-trading role, **there are no public indications of tiered
  API rate limits based on trading volume or VIP level**. BingX’s announcement
  and documentation make no mention of higher tiers (e.g., VIP users) getting
  higher call rates – the limits appear to apply equally to all users (within
  the regular/trader role distinction). In other words, unlike some exchanges,
  BingX does not advertise dynamic rate limits that scale with your account’s
  trading volume or status; the limits are fixed as above for all.
- If BingX were to introduce volume-based tiers in the future (e.g., giving
  institutional users higher throughput), those would be documented in their API
  docs. As of the latest info, aside from the _role-based differences_, every
  account is subject to the same base limits.

**Client Handling:** The client library should have a configuration for each set
of API credentials indicating if the account is a “Trader” (copy trading master)
or normal. This way, it can apply the correct limit set. For example, when a
user initializes the API client with their key, they could specify their role if
known (or possibly the client could detect via an API call that returns account
type). By default, assume “Regular” user limits unless told otherwise. Ensure
that if a Trader account is used, the lower limits (e.g. 1 order/s) are applied
for relevant endpoints.

## Managing Multiple API Keys and Accounts

Advanced users might use multiple API keys or even multiple accounts to
distribute load or implement higher throughput. The client specification should
accommodate this while still respecting all limits:

- **Multiple Keys on One Account (UID):** If a user provides multiple API keys
  that belong to the same BingX account (same UID):

  - All those keys share the same account-level rate limits. The client should
    **not treat them separately** for user-level throttling. For example, if the
    account can place 5 orders/sec in total, using two keys from that account
    doesn’t allow 10 orders/sec; the limit remains 5 across both keys combined.
  - Implementation: The library can have a mapping from API key -> account UID
    (perhaps retrieve the UID on setup via a `/uid` endpoint which is available
    at 10 req/s). Use the UID to funnel all keys from that account into the same
    rate limiting bucket counters.
  - The only potential benefit of multiple keys on one account is for
    **organizing different IPs or services**, but not for increasing rate
    limits. If the client is also managing IP-based distribution (see next
    point), separate keys might be sent via separate proxies or servers to
    leverage IP limits, but within each IP+UID combination the limits hold.

- **Multiple Accounts:** If the user has keys from different accounts (different
  UIDs):

  - Each account has its own separate set of user-level limits. The client can
    execute up to the allowed rate for each account independently (since BingX
    enforces per-UID limits separately). For example, two different accounts
    could each place 5 orders/sec (regular user), effectively totaling 10
    orders/sec combined — as long as IP limits are not exceeded.
  - The client should maintain distinct rate counters for each account’s usage.
    A clean way is to encapsulate the rate limiter logic per account. E.g., an
    `AccountLimiter` object keyed by UID, each with its own state for private
    endpoint counts.
  - **Caution:** All accounts’ traffic might still go through one IP (or a few
    IPs). This means the **IP limit of 1000 requests/10s for private calls**
    applies across those accounts if they share an IP. The client must aggregate
    _all_ private calls when checking the IP bucket. If account A is making 800
    requests in 10s and account B 300 in the same 10s from one machine, combined
    1100 > 1000, which will hit the IP ceiling. The library should prevent this
    by coordinating between account limiters at the IP level.
  - To mitigate IP pooling issues, an advanced setup might allow assigning
    different accounts to different IPs (if the user has multiple servers or
    proxies). In that case, each IP+account pair can be treated independently.
    This is outside the scope of a single-library instance but worth noting in
    documentation: users should distribute high load across multiple IPs to
    avoid the shared IP bottleneck.

- **Round-Robin or Failover Strategy:** The client could optionally support
  using multiple keys in a round-robin fashion **for public endpoints**. Since
  public endpoints are only IP-limited (not key-limited), there’s no need to
  rotate keys for them – the bottleneck is IP. For private endpoints, rotating
  keys of the _same account_ gives no benefit (same UID limit applies). Rotating
  between different accounts can increase throughput, but as noted, watch IP
  limits.
- **Approaching Limits:** If one account is nearing its per-endpoint limit
  (e.g., heavy order placement), and another account is available, the
  application logic might decide to switch new requests to the other account.
  The client library can expose hooks or settings for the user to opt into such
  behavior. However, this is a complex scenario (it implies the user is
  coordinating trading across multiple accounts, which may not always be
  desirable or even allowed in certain contexts).
- **Avoiding Bans:** Using multiple accounts/keys to intentionally bypass limits
  could be against BingX’s terms if done aggressively. The spec’s purpose is to
  stay within allowed limits. Rotating between accounts should be done only if
  those accounts are legitimately separate and for operational reasons (for
  example, an exchange service provider managing sub-accounts for different
  customers). In all cases, do not exceed the documented limits for any single
  account or IP.

**Implementation Summary for Multiple Keys:** Design the rate limiter as a
hierarchical system:

1. **IP-Level supervisor:** tracks aggregate request counts for public and
   private categories.
2. **Account-level limiter:** for each account, tracks that account’s usage vs
   its endpoint limits.
3. **Key-level context:** map each API request to an account limiter via its API
   key. The key itself doesn’t impose a separate threshold, but it routes to the
   correct account bucket.

If an account is at risk of hitting a limit, the library can either queue
requests (preferred to maintain order and fairness) or if configured, route some
requests to a different account’s key (if appropriate). Always ensure any
re-routing logic does not violate the IP limit and that the functionality of the
request (e.g., placing an order on a specific account) isn’t altered – obviously
you wouldn’t place orders for Account A on Account B’s key. So cross-account
request routing is only relevant for requests that aren’t account-specific
(mainly market data, which doesn’t need a key at all, or perhaps if the user
intentionally distributes their trading across accounts).

## Conclusion and Additional Considerations

By adhering to this specification, the BingX API client will enforce all known
rate limits, covering REST and WebSocket usage comprehensively. The
implementation should be thoroughly tested under high load to ensure the
throttling logic correctly prevents limit exceedance without unnecessarily
hindering throughput. Keep the following in mind:

- **Maintain Configurability:** Allow adjusting rate limit parameters easily. If
  BingX updates their limits or if the user knows they have a special
  arrangement, it should be easy to update the values (perhaps load from a
  config or have them defined in one place).
- **Realtime Monitoring:** The client could provide hooks or logs for when it is
  throttling or when a limit threshold is near. This transparency helps users
  understand when the rate limiter is active.
- **Graceful Degradation:** In scenarios of bursting over limits, the library
  should queue and delay calls rather than drop them. If a queue becomes too
  large (calls delayed too much), the client can start rejecting new requests or
  warn the user.
- **Testing with Official Docs:** Whenever possible, verify against BingX’s
  official API documentation and announcements for any changes. For example,
  check the “Rate Limit” section of BingX’s API docs for updates and adjust the
  implementation accordingly.

Following this spec will ensure the client library remains **robust, efficient,
and compliant** with BingX’s rate limiting policies, providing a smooth
experience for developers and preventing unexpected bans or throttling from the
exchange.

**Sources:**

- BingX Official Announcement – _“BingX Upgrades API Rate Limit”_ (April 2024) –
  detailing new IP and UID rate limits.
- BingX Official Announcement – _“Adjustment of Websocket Subscription Limits
  for Spot Trading”_ (Aug 2024) – confirming 200 subscriptions per WebSocket
  connection limit.
- BingX API Change Log – noting WebSocket topic and connection limits (200
  topics per socket, 60 connections per IP, error code 80403).
- BingX API Documentation excerpts – listing specific endpoint rate limits for
  Spot and Futures REST APIs.
