## Rate Limiting Specification for Bitfinex API v2

This specification describes how an LLM–driven client library should implement
rate limiting rules to avoid breaching Bitfinex API v2 limits for both REST and
WebSocket calls, covering public and private endpoints and considering IP-based,
account-based, and API-key-based constraints.

---

### 1. REST API Rate Limits

#### 1.1 Global (IP-based) Limits

- **Range:** 10–90 requests per minute, depending on endpoint.
- **Behavior on Breach:** IP is blocked for 60 seconds; all requests return

  ```json
  { "error": "ERR_RATE_LIMIT" }
  ```

  citeturn1view0

#### 1.2 Endpoint-Specific Limits

| Limit (req/min) | Endpoint(s)                                  |
| --------------- | -------------------------------------------- |
| **90**          | `get /v2/ticker/:symbol` citeturn2search1 |

```
             `post /v2/auth/r/orders` citeturn0search6
             `post /v2/auth/r/wallets` citeturn4search0
             `post /v2/auth/r/trades` citeturn4search3
             `post /v2/auth/r/funding/credits/{symbol}` citeturn4search2
             `post /v2/auth/r/positions` citeturn4search5
             `post /v2/auth/r/ledgers/{currency}/hist` citeturn5search2
             `get|post /v2/auth/r/movements` citeturn5search0  |
```

\| **30** | `get /v2/tickers` citeturn2search2
`get /v2/candles/{candle}/{section}` citeturn2search5
`get /v2/platform/status` citeturn2search8 | \| **15** |
`get /v2/trades/:symbol/hist` citeturn2search4 | \| **10** |
`get /v2/auth/r/deposit/address` (deposit addresses) citeturn4search6 |

> **Note:** All private (`/v2/auth/…`) endpoints default to 90 req/min unless
> otherwise specified above.

#### 1.3 Account- and API-Key-Based Limits

- **Rationale:** While v2 docs specify IP-based limits, historical behavior
  indicates a per-account limit of 60 req/min applies across all keys on the
  same account citeturn3search4.
- **Implementation:**

  - Track request counts per API key and per account.
  - Enforce both IP-based and account-based limits using sliding-window or
    token-bucket algorithms.
  - On breach of either, block further requests for 60 seconds.

#### 1.4 Retry and Backoff

- Upon receiving `ERR_RATE_LIMIT`, delay retries for at least 60 seconds.
- Implement exponential backoff for subsequent attempts.

---

### 2. WebSocket API Rate Limits

#### 2.1 Connection Limits

- **Authenticated (`wss://api.bitfinex.com`):** max 5 new connections per 15
  seconds.
- **Public (`wss://api-pub.bitfinex.com`):** max 20 new connections per minute.
- **Block Duration:** 15 seconds (auth) or 60 seconds (public) when exceeded.
  citeturn1view0

#### 2.2 Subscription Limits

- **Per Connection:** max 25 channel subscriptions. citeturn1view0

#### 2.3 Message-Send Limits

- **Default Throttle:** 1 subscribe/unsubscribe message per second per
  connection (configurable).
- **Goal:** Prevent bursts that may trigger unseen server-side limits.

#### 2.4 Reconnection Strategy

- Implement jittered backoff when reconnecting after disconnects to avoid rapid
  repeated connection attempts.

---

### 3. Implementation Guidelines

1. **Rate Limiter Architecture**

   - Create separate limiters for:

     - REST per-endpoint groups (90/30/15/10 req/min)
     - REST per-account and per-IP
     - WS connection attempts
     - WS subscription/message sends

   - Use token-bucket or sliding-window algorithms.

2. **Configurability**

   - Expose parameters (e.g., refill rates, burst sizes, backoff timings) to
     allow tuning.

3. **Error Handling & Alerts**

   - Provide hooks/callbacks on rate-limit events.
   - Surface warnings/logs when nearing or hitting limits.

4. **Monitoring & Metrics**

   - Track usage statistics per limiter.
   - Expose metrics (e.g., via callbacks or a monitoring endpoint) for
     dashboards.

5. **Testing**

   - Simulate rate-limit scenarios (e.g., rapid bursts) in integration tests.
   - Validate behavior on receiving `ERR_RATE_LIMIT` responses and WS disconnect
     codes.

---

### 4. Trading-Volume Tiers

Bitfinex applies the same rate limits to all users regardless of trading volume;
there are **no** special higher-throughput tiers based on volume
citeturn1view0.
