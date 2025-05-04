## 1. Definitions and Buckets

- **ip_bucket**: tracks requests by originating IP address.
- **uid_bucket**: tracks requests by user UID (all API keys under same UID).
- **key_bucket**: tracks requests by a single API key (optional finer
  granularity).
- **ws_connection_bucket**: tracks active WebSocket connections (private order
  streams).
- **ws_req_bucket**: tracks “req” messages sent over any WS connection.
- **ws_sub_bucket**: tracks “sub” messages (topic subscriptions) sent over any
  WS connection.

Each bucket enforces its own limit; a single API call or WS message may consume
multiple buckets (e.g. a private REST order call consumes both uid_bucket and
key_bucket).

---

## 2. REST: Contract (Futures/Swaps/Options) APIs

_All contract families (coin-margined futures, coin/option swaps, USDT-margined
swaps) share these limits._ ([huobiapi.github.io][1])

| Endpoint Category         | Bucket     | Limit              | Interval |
| ------------------------- | ---------- | ------------------ | -------- |
| private (all trade+read)  | uid_bucket | 144 requests       | per 3 s  |
|   – trade vs read         | key_bucket | 72 trade + 72 read | per 3 s  |
| public (non-market)       | ip_bucket  | 240 requests       | per 3 s  |
| public (market-data REST) | ip_bucket  | 800 requests       | per 1 s  |

> Responses also include headers `ratelimit-limit`, `ratelimit-remaining`,
> `ratelimit-interval` (ms), `ratelimit-reset` (ms) ([huobiapi.github.io][1])

---

## 3. REST: Spot APIs

_Spot endpoints each carry explicit “Rate Limit (NEW)” values in the docs. Where
no header is provided, fall back to the legacy grouping:_ ([meshconnect.com][2])

| Legacy Group             | Bucket     | Limit       | Interval |
| ------------------------ | ---------- | ----------- | -------- |
| private (all)            | uid_bucket | 30 requests | per 3 s  |
| public (non-market data) | ip_bucket  | 60 requests | per 3 s  |

**Implementation**

1. **Per-endpoint overrides**: read each endpoint’s documented “Rate Limit
   (NEW)” and enforce that exact value.
2. **Header-driven**: when present, respect `X-HB-RateLimit-Requests-Remain` and
   expiry.
3. **Fallback**: if neither doc nor header exist, use the legacy limits above.

---

## 4. WebSocket APIs

### 4.1 Market Data (Public)

| Message Type    | Bucket        | Limit       | Interval |
| --------------- | ------------- | ----------- | -------- |
| req (request)   | ws_req_bucket | 50 messages | at once¹ |
| sub (subscribe) | ws_sub_bucket | unlimited   | –        |

¹ “at once” means up to 50 in a burst; no sustained per-second cap beyond that.
([huobiapi.github.io][1])

### 4.2 Account & Order (Private)

| Resource                     | Bucket               | Limit           | Interval |
| ---------------------------- | -------------------- | --------------- | -------- |
| WS connections per UID       | ws_connection_bucket | 30 simultaneous | –        |
| subscriptions per underlying | ws_sub_bucket        | 1 per contract  | –        |
| overall sub messages         | ws_sub_bucket        | 40 messages     | per 1 s² |

² to avoid flooding new subscriptions. ([huobiapi.github.io][1])

> Private WS streams are wholly separate from REST buckets.

---

## 5. Market-Maker/VIP Overrides

Huobi’s Market Maker Program (for USDT-swap) grants higher limits to approved
accounts. Since these values are applied per-account, the client should load any
per-UID overrides from a config or discovery endpoint, and apply them to the
same buckets above—e.g.:

```yaml
overrides:
  uid: 123456
  contract:
    uid_bucket: { limit: 288, interval_ms: 3000 }
    ws_connection_bucket: { max: 60 }
```

---

## 6. Enforcement Logic (LLM Spec)

1. **Initialization**

   - Load static config for all buckets (limits/intervals).
   - Fetch any per-UID/per-key overrides if available.

2. **On REST request**

   - Identify endpoint category (spot vs contract, public vs private, market vs
     non-market).
   - Decrement the relevant buckets atomically; if any bucket is exhausted,
     raise a rate-limit error.

3. **On WS message**

   - For each “req” or “sub”, decrement ws_req_bucket or ws_sub_bucket
     respectively.
   - On new private WS connect, increment ws_connection_bucket; on disconnect,
     decrement.
   - Reject or queue if bucket exhausted.

4. **Header Sync**

   - After each REST call, update local bucket counts using response headers
     where provided.

5. **Centralized Tracking**

   - If running multiple instances, sync bucket states via a shared store (e.g.
     Redis) keyed by IP, UID, API key, and WS connection ID.

6. **No Retry/Backoff**

   - Per requirement, do **not** include backoff logic in this spec; simply
     surface rate-limit breaches to the caller.

---

This spec equips your LLM-driven implementation with the concrete limits and
bucket-based rules needed to keep Huobi/HTX calls within official constraints.

[1]:
  https://huobiapi.github.io/docs/usdt_swap/v1/en/
  "Huobi USDT Margined Contracts API Reference"
[2]:
  https://www.meshconnect.com/blog/does-huobi-have-an-api?utm_source=chatgpt.com
  "Does Huobi have an API? - Mesh"
