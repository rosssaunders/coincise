Public endpoints are throttled by IP and private endpoints by profile ID. Some
endpoints (like `/fills`) may have custom rate limits. When a REST API rate
limit is exceeded, a status of `429 Too Many Requests` is returned.

Private endpoints are authenticated.

###

[​

](#rest-api-rate-limits)

REST API Rate Limits

####

[​

](#public-endpoints)

Public Endpoints

- Requests per second per IP: 10
- Requests per second per IP in bursts: Up to 15

####

[​

](#private-endpoints)

Private Endpoints

- Requests per second per profile: 15
- Requests per second per profile in bursts: Up to 30

####

[​

](#private-%2Ffills-endpoint)

Private `/fills` Endpoint

- Requests per second per profile: 10
- Requests per second per profile in bursts: Up to 20

####

[​

](#private-%2Floans-endpoint)

Private `/loans` Endpoint

- Requests per second per profile: 10

Rate limits do not apply to
[List loan assets](/api-reference/exchange-api/rest-api/loan/list-loan-assets)
(`/loans/assets`) which is not private.

##

[​

](#how-rate-limits-work)

How Rate Limits Work

Rate-limiting for both the Exchange REST API and the FIX API use a **lazy-fill
token bucket** implementation. A TokenBucket stores a maximum amount of tokens,
which is the **burst size**, and fills at a given rate called the **refresh
rate**. The bucket starts full, and as requests are received, a token is removed
for each request. Tokens are continuously added to the bucket at the refresh
rate until full. When a user sends a request, the TokenBucket calculates whether
to rate limit the user as follows:

1.  Fill the user’s TokenBucket to a token size based on the following formula:
    `token_amount = min(burst, previous_token_amount + (current_time - previous_request_time) * refresh_rate)`
2.  Remove 1 token if possible, otherwise rate limit the request.
3.  Repeat Steps 1 and 2 for each subsequent request.

###

[​

](#tokenbucket-example)

TokenBucket Example

Let’s say you have a TokenBucket with burst = 3 and refresh_rate = 1. The table
below represents the state of your token bucket after a series of requests:

| Action        | Time | Tokens | Notes                                                                                                                                             |
| ------------- | ---- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Initial State | 0.0  | 3.0    | New TokenBucket is initialized to max capacity (burst)                                                                                            |
| Request 1     | 0.5  | 2.0    | Fill TokenBucket, then remove a token, because we are at max capacity, and subtract 1 token from 3                                                |
| Request 2     | 0.8  | 1.3    | Fill TokenBucket to 2.3 (`min(3, (2 + (.8 - .5) * 1.0)) = min(3, 2.3) = 2.3`), then subtract 1                                                    |
| Request 3     | 0.9  | 0.4    | Fill TokenBucket to 1.4 (`min(3, (1.3 + (.9 - .8) * 1.0)) = min(3, 1.4) = 1.4`), then subtract 1                                                  |
| Request 4     | 1.0  | 0.5    | Fill TokenBucket to 0.5 (`min(3, (.4 + (1.0 - .9) * 1.0)) = min(3, 0.5) = 0.5`). **Ratelimit** because we don’t have enough tokens available      |
| Request 5     | 1.4  | 0.9    | Fill TokenBucket to 0.9 (`min(3, (0.5 + (1.4 - 1.0) * 1.0)) = min(3, 0.9) = 0.9`). **Ratelimit** because we don’t have enough tokens available    |
| Request 6     | 1.8  | 0.3    | Fill TokenBucket to 1.3 (`min(3, (0.9 + (1.8 - 1.4) * 1.0)) = min(3, 1.3) = 1.3`), then remove 1                                                  |
| Request 7     | 5.0  | 2.0    | Fill TokenBucket to 3.0 (`min(3, (0.3 + (5.0 - 1.8) * 1.0)) = min(3, 3.5) = 3`), since we would “overflow” with our calculations, then subtract 1 |
