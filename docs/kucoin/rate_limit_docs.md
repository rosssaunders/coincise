## Rest Rate Limit[#](#rest-rate-limit)

The specific rules of REST rate limit are as follows:

### 1\. Resource Pool:[#](#1-resource-pool)

Each API resource pool has a certain quota, the specific amount of which depends on the VIP level:

| Level | Spot (include Margin) | Futures | Management | Earn | CopyTrading | Public |
| --- | --- | --- | --- | --- | --- | --- |
| VIP0 | 4000/30s | 2000/30s | 2000/30s | 2000/30s | 2000/30s | 2000/30s |
| VIP1 | 6000/30s | 2000/30s | 2000/30s | 2000/30s | 2000/30s | 2000/30s |
| VIP2 | 8000/30s | 4000/30s | 4000/30s | 2000/30s | 2000/30s | 2000/30s |
| VIP3 | 10000/30s | 5000/30s | 5000/30s | 2000/30s | 2000/30s | 2000/30s |
| VIP4 | 13000/30s | 6000/30s | 6000/30s | 2000/30s | 2000/30s | 2000/30s |
| VIP5 | 16000/30s | 7000/30s | 7000/30s | 2000/30s | 2000/30s | 2000/30s |
| VIP6 | 20000/30s | 8000/30s | 8000/30s | 2000/30s | 2000/30s | 2000/30s |
| VIP7 | 23000/30s | 10000/30s | 10000/30s | 2000/30s | 2000/30s | 2000/30s |
| VIP8 | 26000/30s | 12000/30s | 12000/30s | 2000/30s | 2000/30s | 2000/30s |
| VIP9 | 30000/30s | 14000/30s | 14000/30s | 2000/30s | 2000/30s | 2000/30s |
| VIP10 | 33000/30s | 16000/30s | 16000/30s | 2000/30s | 2000/30s | 2000/30s |
| VIP11 | 36000/30s | 18000/30s | 18000/30s | 2000/30s | 2000/30s | 2000/30s |
| VIP12 | 40000/30s | 20000/30s | 20000/30s | 2000/30s | 2000/30s | 2000/30s |

### 2\. Weight:[#](#2-weight)

When a user requests any API, the weight of this interface will be deducted and updated every 30s (starting from the arrival time of the user's first request). For specific interfaces, please refer to the rate limit weight regulations under each interface.

If the quota of any resource pool is used up within 30s, that is, after the rate limit is exceeded, an error message of http code:429, error code:429000 will be returned, and the request can be re-requested after the length of time displayed in the request header. At this point, the user must stop access and wait until the resource quota is reset before continuing to access.

For example:

When the user's VIP is 5, s/he has a "total spot quota" of 16000/30s.

The quota consumption for each "add spot limit order" is 2. After placing the first order, the user's remaining spot quota is 15998, after placing the second order, the remaining quota is 15996, and so on.

If the quota is not used up within 30 seconds, when the next cycle comes, the spot resource pool quota will be reset and returned to the quota limit of 16000.

### 3\. Request Header:[#](#3-request-header)

The returned information of each request will carry the following information: Total resource pool quota, resource pool remaining quota, resource pool quota reset countdown (milliseconds).

"gw-ratelimit-limit": 500

"gw-ratelimit-remaining": 300

"gw-ratelimit-reset": 1489

### 4\. Public Endpoint Rate Limit:[#](#4-public-endpoint-rate-limit)

It is **based on IP** rate limitation. If there is a lot of demand for the use of public interfaces, it is recommended to use the Websocket interface instead of the REST interface (if the interface supports it). You can also use one server to bind multiple IP addresses (ipv4 or ipv6), or use different IPs to avoid IP rate limit issues.

### 5\. Private Endpoint Rate Limit[#](#5-private-endpoint-rate-limit)

With the exception of **Public** resource pool endpoints, all other resource pools are **based on UID**, and the request header will carry the rate limit information of the resource pool, such as the remaining rate limit times, rate limit cycle time, etc. The rate limits of the sub-account and the master account are independent of each other at the API request level; that is to say, if the demand for such interface access is relatively large, it can also be solved by using the sub-account.

In addition to the regular rate limit, server overload may also trigger the rate limit. After the rate limit, the error code is 429000, but the request header will not carry other personal rate limit information. This type of rate limit does not count toward the number of rate limits. It is recommended to try again later.

### 5\. Private Endpoint Rate Limit[#](#5-private-endpoint-rate-limit-1)

If you are a professional trader or market maker and need a higher limit, please send your KuCoin account, reason and approximate trading volume to [api@kucoin.com](mailto:api@kucoin.com).

## Websocket Rate Limit[#](#websocket-rate-limit)

### 1\. Number of Connections[#](#1-number-of-connections)

Number of connections per user ID: ≤ 800

### 2\. Connection Times[#](#2-connection-times)

Connection Limit: 30 per minute

### 3\. Number of Uplink Messages[#](#3-number-of-uplink-messages)

Message limit sent to the server: 100 per 10 seconds

### 4\. Topic Subscription Limit[#](#4-topic-subscription-limit)

Maximum number of batch subscriptions at a time: 100 topics

### 5\. Subscription limit for each connection[#](#5-subscription-limit-for-each-connection)

400 topics (there is no such restriction for Futures)