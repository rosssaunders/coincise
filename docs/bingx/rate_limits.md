# Rate Limits

BingX API implements rate limiting across different products and endpoints.

## Overview

- Rate limits are enforced per UID (user ID) and per IP address
- Different API groups have different rate limits
- You can check rate limit usage via response headers:
  - `X-RateLimit-Requests-Remain`: Remaining requests in the current window
  - `X-RateLimit-Requests-Expire`: Window expiration time

## Rate Limit Groups

Different endpoints belong to different rate limit groups. Each group has its own limits:

- **Group 1**: 10 requests per second
- **Group 2**: 5 requests per second
- **Group 3**: 2 requests per second

## Handling Rate Limits

When you exceed the rate limit, you will receive a 429 (Too Many Requests) response with error code 100403.

To avoid rate limiting:

1. Implement exponential backoff
2. Cache frequently accessed data
3. Use WebSocket connections for real-time data
4. Monitor rate limit headers in responses
