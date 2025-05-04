## 1. Introduction

This document specifies the rate‐limiting rules that a language‐agnostic KuCoin
API client library **must** enforce to avoid breaching KuCoin’s REST and
WebSocket quotas. It covers both Spot and Futures markets, Public and Private
endpoints, and includes tiered limits by VIP trading volume level.

---

## 2. REST API Rate Limits

### 2.1 Resource Pools & VIP Levels

KuCoin groups REST endpoints into five **resource pools**. Each pool has a quota
per 30 s window that depends on the user’s VIP level (0–12):

| pool       | vip 0      | vip 5       | vip 12      |
| ---------- | ---------- | ----------- | ----------- |
| spot       | 4 000/30 s | 16 000/30 s | 40 000/30 s |
| futures    | 2 000/30 s | 7 000/30 s  | 20 000/30 s |
| management | 2 000/30 s | 7 000/30 s  | 20 000/30 s |
| public     | 2 000/30 s | 2 000/30 s  | 2 000/30 s  |
| earn       | 2 000/30 s | 2 000/30 s  | 2 000/30 s  |

> _Source:_ rate limit table for REST 2.0 ([KuCoin][1])

### 2.2 Endpoint Weights

Each REST endpoint has an **api-rate-limit-weight** (w). When a client issues a
request, w units are deducted from the corresponding pool, and the pool resets
exactly 30 s after the **first** consumption in its current window.

> _Source:_ api-rate-limit-weight definition ([KuCoin][2])

### 2.3 Public (IP-based) Endpoints

- **Pool:** `public`
- **Quota:** 2 000 calls per 30 s, shared by all clients from the same IP.
- **Enforcement:** On exhaustion, HTTP 429/`429000` is returned; clients should
  retry only after the `gw-ratelimit-reset` timeout.

> _Source:_ public pool description ([KuCoin][1])

### 2.4 Private (UID-based) Endpoints

- **Pools:** `spot`, `futures`, `management`, `earn`
- **Quota:** per-UID and per-VIP level, see § 2.1.
- **Enforcement:** On exhaustion, HTTP 429/`429000`. These limits are returned
  in the headers but do **not** count against the global quota if triggered by
  server load.

> _Source:_ private pool description ([KuCoin][1], [KuCoin][3])

### 2.5 Rate-Limit Metadata

Every REST response carries three headers:

```text
gw-ratelimit-limit:    <pool capacity>
gw-ratelimit-remaining:<units left>
gw-ratelimit-reset:    <ms until reset>
```

Clients should read these to dynamically adjust throttling.

> _Source:_ header specification ([KuCoin][3])

### 2.6 Error Handling

On HTTP 429/`429000`, the client library **must**:

1. Abort further calls to that pool.
2. Wait for the number of milliseconds indicated by `gw-ratelimit-reset`.
3. Resume requests only after the reset interval elapses.

---

## 3. WebSocket API Rate Limits

### 3.1 Connection Limits

- **Max simultaneous connections per UID:** ≤ 800
- **Connection rate:** ≤ 30 new connections per minute

> _Sources:_ connection quotas ([KuCoin][3], [KuCoin][4])

### 3.2 Message Send (Uplink) Limits

- **Max messages sent to server:** 100 messages per 10 s window per connection.

> _Source:_ uplink message limit ([KuCoin][3])

### 3.3 Subscription Limits

- **Batch subscribe:** ≤ 100 topics per `subscribe` request.
- **Total topics per connection:**

  - Spot/Margin: ≤ 400 topics
  - Futures: **unlimited** topics

> _Source:_ subscription quotas ([KuCoin][3])

### 3.4 Token Management

- **Spot/Margin public token:** `POST /api/v1/bullet-public` (weight = 10, pool
  = public)
- **Spot/Margin private token:** `POST /api/v1/bullet-private` (weight = 10,
  pool = spot)
- **Futures public token:** `POST /api/v1/bullet-public` on futures base URL
  (weight = 10, pool = public)
- **Futures private token:** `POST /api/v1/bullet-private` on futures base URL
  (weight = 10, pool = futures)
- **Validity:** 24 h if connection remains open.

> _Sources:_ token endpoints ([KuCoin][5], [KuCoin][6])

### 3.5 Error Handling

- On exceeding any WebSocket limit, the server may close the connection or
  respond with an error.
- The client library **must** track its own counters (connections/minute,
  messages/10 s, topics) and refuse operations that would exceed quotas.

---

## 4. Spot vs. Futures Differences

| Feature                   | Spot/Margin    | Futures                |
| ------------------------- | -------------- | ---------------------- |
| REST pool name            | `spot`         | `futures`              |
| REST pool size (vip 0)    | 4 000/30 s     | 2 000/30 s             |
| WS topics per connection  | ≤ 400 topics   | **unlimited**          |
| WS private token endpoint | api.kucoin.com | api-futures.kucoin.com |

> _Sources:_ REST pools (§ 2.1) ([KuCoin][1]); WS topics (§ 3.3) ([KuCoin][3])

---

## 5. Implementation Guidelines

1. **Pool Abstraction:** Implement each resource pool as a fixed‐window or
   sliding‐window token bucket with capacity = pool quota and refill interval =
   30 s (REST) or 10 s (WS messages).
2. **Endpoint Mapping:** Maintain a registry that maps every endpoint to its
   pool and weight (either hardcoded from docs or read from the
   `api-rate-limit-weight` header).
3. **Throttle Before Send:** Before dispatching a request or WS message, check
   the relevant bucket; if insufficient tokens, delay or reject.
4. **Header Consumption:** For REST, update the bucket based on actual
   `gw-ratelimit-remaining` and reset values to stay in sync.
5. **Error Recovery:** On 429, schedule a wake‐up after the reported reset time,
   then resume.
6. **Metrics & Logging:** Expose counters (e.g. tokens left, window resets) for
   observability and troubleshooting.

---

## 6. References

- REST rate limit 2.0 overview and VIP tiers ([KuCoin][1])
- REST headers and public vs. private pools ([KuCoin][3])
- WebSocket limits (connections, messages, subscriptions) ([KuCoin][3],
  [KuCoin][4])
- API-rate-limit-weight definition ([KuCoin][2])
- WebSocket token endpoints ([KuCoin][5], [KuCoin][6])

[1]:
  https://www.kucoin.com/docs/basic-info/request-rate-limit/rest-api?utm_source=chatgpt.com
  "Basic Info | KuCoin API Documentation"
[2]:
  https://www.kucoin.com/docs-new/?utm_source=chatgpt.com
  "Introduction - KUCOIN API"
[3]:
  https://www.kucoin.com/docs-new/rate-limit?utm_source=chatgpt.com
  "Rate Limit - KUCOIN API"
[4]:
  https://www.kucoin.com/docs-new/doc-338150?utm_source=chatgpt.com
  "Change Log - KUCOIN API"
[5]:
  https://www.kucoin.com/docs-new/websocket-api/base-info/get-public-token-spot-margin?utm_source=chatgpt.com
  "Get Public Token - Spot/Margin - KUCOIN API"
[6]:
  https://www.kucoin.com/docs-new/websocket-api/base-info/get-private-token-futures?utm_source=chatgpt.com
  "Get Private Token - Futures - KUCOIN API"
