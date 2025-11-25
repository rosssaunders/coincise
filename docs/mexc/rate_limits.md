# Rate Limits

There is rate limit for API access frequency, upon exceed client will get code
429: Too many requests. The account is used as the basic unit of speed limit for
the endpoints that need to carry access keys. For endpoints that do not need to
carry access keys, IP addresses are used as the basic unit of rate limiting.

### Limits Description[​](#limits-description "Direct link to Limits Description")

- According to the two modes of IP and UID (account) limit, each are
  independent.
- Endpoints are marked according to IP or UID limit and their corresponding
  weight value.
- Each endpoint with IP limits has an independent 500 every 10 second limit.
- Each endpoint with UID limits has an independent 500 every 10 second limit.

### Limits Error[​](#limits-error "Direct link to Limits Error")

- When a 429 is received, it's your obligation as an API to back off and not
  spam the API.
- Repeatedly violating rate limits and/or failing to back off after receiving
  429s will result in an automated IP ban .
- IP bans are tracked and scale in duration for repeat offenders, from 2 minutes
  to 3 days.
- A Retry-After header is sent with a 418 or 429 responses and will give the
  number of seconds required to wait, in the case of a 429, to prevent a ban,
  or, in the case of a 418, until the ban is over.

### Websocket Limits[​](#websocket-limits "Direct link to Websocket Limits")

- The Websocket limits is: 100times/s.
- A connection that goes beyond the limit will be disconnected; IPs that are
  repeatedly disconnected may be banned.
- A single connection can listen to a maximum of 30 streams.
