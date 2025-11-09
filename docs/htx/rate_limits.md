- The new version rate limit is applied on UID basis, which means, the overall
  access rate, from all API keys under same UID, to single endpoint, shouldn’t
  exceed the rate limit applied on that endpoint.
- It is suggested to read HTTP Header `X-HB-RateLimit-Requests-Remain` and
  `X-HB-RateLimit-Requests-Expire` to get the remaining count of request and the
  expire time for current rate limit time window, then you can adjust the API
  access rate dynamically.
