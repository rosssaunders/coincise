# Rate Limits

## [Rate limit](#/en-us/spot/base-info.html#Rate limit)

If the request is too frequent, the system will automatically restrict the
request and recover after 5 minutes;

Based on account UID rate limit, each api has its own independent rate limit,
which does not affect each other

Users can check the current frequency limit usage and the expiration of the time
window according to "X-RateLimit-Requests-Remain" (remaining number of frequency
limits) and "X-RateLimit-Requests-Expire" (window expiration time) in the Http
Header. time, and dynamically adjust your request frequency based on this value.

#### REST API

The API requests are subject to different rate limits based on UID and IP.
Please refer to the respective API documentation for UID rate limits. IP rate
limits are based on the following grouping rules:

- Market API Group \[1\]: The total IP rate limit for all interfaces within the
  group is 500 requests per 10 seconds and 1000 requests per minute.

- Account API Group \[2\]: The total IP rate limit for all interfaces within the
  group is 2000 requests per 10 seconds, with an individual IP rate limit of 300
  requests per 10 seconds for each interface.

- Account API Group \[3\]: The total IP rate limit for all interfaces within the
  group is 2000 requests per 10 seconds, with an individual IP rate limit of 300
  requests per 10 seconds for each interface.
