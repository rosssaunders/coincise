## rest api rate limiting

### spot trading

- **public endpoints** (order book, candlesticks, trading pairs, etc.): – 200
  requests per 10 s **per endpoint**, limited by IP ([CoinCarp][1])
- **private endpoints** (account info, trade history, etc.): – 200 requests per
  10 s **per endpoint**, limited by UID ([CoinCarp][1])
- **place orders** (spot/margin): – 10 requests per second **per UID per
  market** (no change) ([CoinCarp][1])
- **cancel orders**: – 200 requests per second **per UID** ([CoinCarp][1])

### perpetual swaps (futures)

- **public endpoints** (order book, funding rate, etc.): – 200 requests per 10 s
  **per endpoint**, limited by IP ([CoinCarp][1])
- **place orders**: – 100 requests per second **per UID**, across all perpetual
  markets ([CoinCarp][1])
- **private endpoints** (position, fee rate, etc.): – 200 requests per 10 s
  **per endpoint**, limited by UID ([CoinCarp][1])
- **cancel orders**: – 200 requests per second **per UID** ([CoinCarp][1])

### wallet endpoints

- **all wallet endpoints** (deposit/withdrawal history, transfers): – 200
  requests per 10 s **per endpoint**, limited by UID ([CoinCarp][1])
- **withdraw** (`POST /withdrawals`): – 10 requests per 10 s **per UID**
  ([CoinCarp][1])
- **intra-account transfers** (`POST /wallet/transfers`, sub-account transfers):
  – 80 requests per 10 s **per UID** ([CoinCarp][1])

### delivery & options

- **delivery private endpoints**: – order placement: 500 requests per 10 s **per
  UID** – order cancellation: 500 requests per 10 s **per UID** – other
  endpoints: 200 requests per 10 s **per endpoint**, per UID ([CoinCarp][1])
- **options private endpoints**: – order placement/cancellation: 200 requests
  per second **per UID** – other endpoints: 200 requests per 10 s **per
  endpoint**, per UID ([CoinCarp][1])

### subaccount & unified

- **sub-account management**: – 80 requests per 10 s **per endpoint**, per UID
  ([CoinCarp][1])
- **unified (borrow/repay)**: – 15 requests per 10 s **per UID** ([CoinCarp][1])
- **other private endpoints** (earning, collateral, etc.): – 150 requests per 10
  s **per endpoint**, per UID ([CoinCarp][1])

---

## dynamic fill-ratio based tiers for perpetuals

For high-volume traders (VIP ≥ 14), Gate.io applies a dynamic fill-ratio model
to set order placement rates.

1. **fill ratio** = (maker USDT vol ×1 + taker USDT vol ×0.9) ÷ (orders + mods
   ×symbol multiplier) over past 7 days
2. **tiers & caps** (updated daily at 08:00 UTC):

   | tier | ratio range (uid) | rate limit |                |
   | ---: | ----------------: | ---------: | -------------- |
   |    1 |           \[0, 1) |    100 r/s |                |
   |    2 |           \[1, 3) |    150 r/s |                |
   |    3 |           \[3, 5) |    200 r/s |                |
   |    4 |          \[5, 10) |    250 r/s |                |
   |    5 |         \[10, 20) |    300 r/s |                |
   |    6 |         \[20, 50) |    350 r/s |                |
   |    7 |              ≥ 50 |    400 r/s | ([Gate.io][2]) |

3. **abuse limits** (24 h window):

   - > 86 400 requests with no fills → 10 r/10 s cap next hour
   - > 86 400 requests with fill ratio < 1% → 20 r/10 s cap next hour
     > ([Gate.io][2])

4. Sub-accounts below USDT 1 000 000 in 7 d use main-account aggregated ratio
   ([Gate.io][2])

---

## websocket api rate limiting

- **outbound message rate**: 50 requests per second **per channel**, per
  connection ([Gate.io][3])
- **subscription management**:

  - track active topics by channel (e.g. `spot.ticker`, `spot.trades`,
    `futures.orders`)
  - although Gate.io doesn’t publish a hard cap on topics, the library should
    maintain a registry of active subscriptions and expose it via API
  - consider a configurable soft limit (e.g. 200 topics per connection) to avoid
    overloading the server

---

## cross-account & ip coordination

- **public REST** shares IP pool: all client instances on same IP must
  coordinate to stay under the IP-based caps
- **private REST** shares UID pool: multiple API keys for same account share the
  UID limits
- implement shared counters (e.g. in a singleton or external store) so that
  concurrent clients respect aggregate limits

---

## implementation guidelines

1. **rate-limiter primitives**

   - token-bucket or leaky-bucket for fixed r/s and r/10 s windows
   - sliding or fixed windows with atomic counters

2. **dynamic tier loader**

   - fetch 7 d fill ratio and VIP level daily at 08:00 UTC via the “fill ratio”
     endpoint
   - recalculate token bucket capacities for perpetual order placement

3. **abuse guard**

   - maintain a 24 h rolling count of order requests and fills
   - trigger temporary caps when thresholds are exceeded

4. **thread-safety & persistence**

   - ensure counters are concurrency-safe (e.g. mutexes)
   - persist counters if the library restarts to avoid bursts after a crash

5. **configuration**

   - allow overriding default limits (for testing or VIP escalation)
   - expose metrics and current rate limit status to consumers

With these rules, the LLM-generated client will automatically throttle both REST
and WebSocket interactions to match Gate.io’s published limits and dynamic
tiers.

[1]:
  https://www.coincarp.com/exchange/announcement/gate-io-33995/
  "Gate.io Latest Announcement on API Rate Limit Adjustments - gate.io | CoinCarp"
[2]:
  https://www.gate.io/docs/developers/apiv4/?utm_source=chatgpt.com
  "Gate API v4"
[3]:
  https://www.gate.io/docs/developers/websocket/
  "Gate WebSocketAPI Reference | Gate API v4"
