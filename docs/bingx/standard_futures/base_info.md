# BingX Standard Futures API - Base Information

## General Info

### Service Address

https://open-api.bingx.com

Alternate domain name: open-api.bingx.io (total frequency limit: 60/min) Release
the frequency limit of the alternate domain name only when there is a problem
with the primary domain name open-api.bingx.com

HTTP 200 status code indicates a successful response. The response body might
contain a message which will be displayed accordingly.

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/standard/base-info.html#Service
> Address](https://bingx-api.github.io/docs/#/en-us/standard/base-info.html#Service
> Address)

### Common Error Codes

##### Types:

- 4XX error codes are used to indicate wrong request content, behavior, format.

- 5XX error codes are used to indicate problems with the Bingx service.

##### Common business error codes:

- 100001 - signature verification failed#

- 100202 - Insufficient balance

- 100204 - No data

- 100400 - Invalid parameter

- 100440 - Order price deviates greatly from the market price

- 100500 - We had a problem with our server

- 100503 - Server busy

100202

- Insufficient assets
- The current system is busy, please try again later

100421

- The current system is busy, please try again later

100400

- quantity/quoteOrderQty can't both be lte 0 in limit order
- The current system is busy, please try again later
- The same order can only be submitted once per second.
- invalid symbol, send symbol like BTC-USDT
- The minimum amount per order is \*
- miss arguments

100414

- The account is abnormal, please contact customer service.

100413

- Incorrect apiKey
- Null apiKey

##### Notes:

- If it fails, there will be an error description included in the response body.

- Errors may be thrown from every interface.

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/standard/base-info.html#Common Error
> Codes](https://bingx-api.github.io/docs/#/en-us/standard/base-info.html#Common
> Error Codes)

### Rate limit

If the request is too frequent, the system will automatically restrict the
request and recover after 5 minutes;

Based on account UID rate limit, each api has its own independent rate limit,
which does not affect each other

Users can check the current frequency limit usage and the expiration of the time
window according to "X-RateLimit-Requests-Remain" (remaining number of frequency
limits) and "X-RateLimit-Requests-Expire" (window expiration time) in the Http
Header. time, and dynamically adjust your request frequency based on this value.

##### REST API

The API requests are subject to different rate limits based on UID and IP.
Please refer to the respective API documentation for UID rate limits. IP rate
limits are based on the following grouping rules:

- Market API Group \[1\]: The total IP rate limit for all interfaces within the
  group is 100 requests per 10 seconds.

- Account API Group \[2\]: The total IP rate limit for all interfaces within the
  group is 1000 requests per 10 seconds, with an individual IP rate limit of 100
  requests per 10 seconds for each interface.

- Account API Group \[3\]: The total IP rate limit for all interfaces within the
  group is 1000 requests per 10 seconds, with an individual IP rate limit of 200
  requests per 10 seconds for each interface.

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/standard/base-info.html#Rate
> limit](https://bingx-api.github.io/docs/#/en-us/standard/base-info.html#Rate
> limit)

### Server time

https://open-api.bingx.com/openApi/spot/v1/server/time

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/standard/base-info.html#Server
> time](https://bingx-api.github.io/docs/#/en-us/standard/base-info.html#Server
> time)

---
